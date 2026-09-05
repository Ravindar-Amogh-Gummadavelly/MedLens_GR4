import { prisma } from '../prisma';
import { processDocumentOcr } from '../ocr/processor';
import { extractMedicalDataFromText, generateSafeMedicalSummary } from '../ai/gemini';
import { evaluateLabStatus } from '../safety/lab-evaluator';

export async function runDocumentProcessingPipeline(documentId: string, fileBuffer: Buffer) {
  try {
    // Phase 1: Update status to OCR_PROCESSING
    const doc = await prisma.medicalDocument.update({
      where: { id: documentId },
      data: { status: 'OCR_PROCESSING' },
      include: { patient: true },
    });

    // Phase 2: OCR Text Extraction
    const ocrResult = await processDocumentOcr(fileBuffer, doc.mimeType, doc.originalName);
    await prisma.medicalDocument.update({
      where: { id: documentId },
      data: {
        rawOcrText: ocrResult.text,
        pageCount: ocrResult.pageCount,
        status: 'EXTRACTION_PROCESSING',
      },
    });

    // Phase 3: AI Structured Extraction (Gemini)
    const extractedData = await extractMedicalDataFromText(ocrResult.text);

    // Update patient profile if demographic info present
    if (extractedData.sex || extractedData.dob) {
      await prisma.patient.update({
        where: { id: doc.patientId },
        data: {
          sex: doc.patient.sex || extractedData.sex || undefined,
          dob: doc.patient.dob || extractedData.dob || undefined,
        },
      });
    }

    // Phase 4: Medical Validation & Deterministic Lab Evaluation
    await prisma.medicalDocument.update({
      where: { id: documentId },
      data: { status: 'VALIDATING' },
    });

    const labResultPromises = extractedData.lab_results.map((lab) => {
      const evaluation = evaluateLabStatus({
        valueNum: lab.value_num,
        valueText: lab.value_text,
        lowerBound: lab.lower_bound,
        upperBound: lab.upper_bound,
        rawReferenceRange: lab.raw_reference_range,
      });

      return prisma.labResult.create({
        data: {
          patientId: doc.patientId,
          documentId: doc.id,
          testName: lab.test_name,
          category: lab.category || 'General',
          valueNum: lab.value_num ?? null,
          valueText: lab.value_text,
          unit: lab.unit || null,
          lowerBound: lab.lower_bound ?? null,
          upperBound: lab.upper_bound ?? null,
          rawReferenceRange: lab.raw_reference_range || null,
          deterministicStatus: evaluation.status,
          origin: 'AI_EXTRACTED',
          confidence: lab.confidence || 95.0,
          verificationStatus: 'NEEDS_REVIEW',
          sourcePage: lab.source_page || 1,
          sourceText: lab.source_text || null,
          testDate: extractedData.report_date || doc.uploadedAt.toISOString().split('T')[0],
        },
      });
    });

    await Promise.all(labResultPromises);

    // Phase 5: Prescriptions Extraction (if any)
    if (extractedData.prescriptions && extractedData.prescriptions.length > 0) {
      const rxPromises = extractedData.prescriptions.map((rx) =>
        prisma.prescription.create({
          data: {
            patientId: doc.patientId,
            documentId: doc.id,
            medicationName: rx.medication_name,
            dosage: rx.dosage || null,
            frequency: rx.frequency || null,
            route: rx.route || null,
            duration: rx.duration || null,
            prescribingDoctor: rx.prescribing_doctor || extractedData.physician_name || null,
            origin: 'AI_EXTRACTED',
            verificationStatus: 'NEEDS_REVIEW',
          },
        })
      );
      await Promise.all(rxPromises);
    }

    // Phase 6: Conflict Detection
    if (extractedData.detected_conflicts && extractedData.detected_conflicts.length > 0) {
      const conflictPromises = extractedData.detected_conflicts.map((c) =>
        prisma.conflict.create({
          data: {
            patientId: doc.patientId,
            category: c.category,
            title: c.title,
            description: c.description,
            sourceA: c.sourceA,
            sourceB: c.sourceB,
            status: 'UNRESOLVED',
          },
        })
      );
      await Promise.all(conflictPromises);
    }

    // Phase 7: Safe AI Summary Generation
    const summaryData = await generateSafeMedicalSummary(JSON.stringify(extractedData));
    await prisma.summary.create({
      data: {
        patientId: doc.patientId,
        documentId: doc.id,
        summaryText: summaryData.summary_text,
        keyTakeaways: JSON.stringify(summaryData.key_takeaways),
        factualPoints: JSON.stringify(summaryData.factual_points),
        safeNotes: summaryData.safe_notes || null,
      },
    });

    // Phase 8: Create Timeline Event
    await prisma.timelineEvent.create({
      data: {
        patientId: doc.patientId,
        documentId: doc.id,
        eventType: 'LAB_REPORT_PROCESSED',
        title: `Report Processed: ${doc.originalName}`,
        description: `Extracted ${extractedData.lab_results.length} lab result(s) and structured clinical findings.`,
        eventDate: new Date(),
      },
    });

    // Phase 9: Mark READY_FOR_REVIEW
    return await prisma.medicalDocument.update({
      where: { id: documentId },
      data: { status: 'READY_FOR_REVIEW' },
    });
  } catch (err: any) {
    console.error(`[MedLens Pipeline Error] Document ${documentId}:`, err);
    return await prisma.medicalDocument.update({
      where: { id: documentId },
      data: { status: 'FAILED' },
    });
  }
}
