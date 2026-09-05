import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadMedicalDocument } from '@/lib/storage/gcs';
import { runDocumentProcessingPipeline } from '@/lib/pipeline/document-processor';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const patient = await prisma.patient.findFirst();
    if (!patient) {
      return NextResponse.json({ error: 'No patient record initialized' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload file to Google Cloud Storage (or local fallback)
    const storageResult = await uploadMedicalDocument(buffer, file.name, file.type || 'application/pdf');

    // Create database MedicalDocument record in UPLOADING status
    const doc = await prisma.medicalDocument.create({
      data: {
        patientId: patient.id,
        filename: storageResult.filename,
        originalName: file.name,
        fileUrl: storageResult.fileUrl,
        mimeType: file.type || 'application/pdf',
        fileSize: file.size,
        status: 'UPLOADED',
      },
    });

    // Run processing state machine
    const processedDoc = await runDocumentProcessingPipeline(doc.id, buffer);

    return NextResponse.json({
      success: true,
      documentId: processedDoc.id,
      status: processedDoc.status,
    });
  } catch (err: any) {
    console.error('Upload API error:', err);
    return NextResponse.json({ error: err.message || 'Internal upload error' }, { status: 500 });
  }
}
