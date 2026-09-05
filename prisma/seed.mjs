import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding synthetic MedLens patient records...');

  // 1. Create Demo User
  const passwordHash = bcrypt.hashSync('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'demo@medlens.org' },
    update: {},
    create: {
      email: 'demo@medlens.org',
      passwordHash,
      name: 'Dr. Sarah Jenkins',
      role: 'CLINICIAN',
    },
  });

  // 2. Create Patient Profile
  const patient = await prisma.patient.create({
    data: {
      userId: user.id,
      name: 'Eleanor Vance',
      dob: '1988-04-12',
      sex: 'Female',
      symptoms: 'Mild fatigue, occasional lightheadedness',
      existingConditions: 'Mild iron deficiency anemia (historical)',
      allergies: 'Penicillin (Hives reported in 2022)',
      medications: 'Multivitamin daily',
    },
  });

  // 3. Create Sample Medical Documents
  const docCurrent = await prisma.medicalDocument.create({
    data: {
      patientId: patient.id,
      filename: 'Comprehensive_Blood_Panel_Aug2026.pdf',
      originalName: 'Comprehensive_Blood_Panel_Aug2026.pdf',
      fileUrl: '/sample-reports/Comprehensive_Blood_Panel_Aug2026.pdf',
      mimeType: 'application/pdf',
      fileSize: 458920,
      status: 'READY_FOR_REVIEW',
      rawOcrText: `METRO CLINICAL DIAGNOSTICS
Patient Name: Eleanor Vance
DOB: 04/12/1988 | Sex: Female
Date of Collection: 08/15/2026
Ordering Physician: Dr. Marcus Vance, MD

COMPLETE BLOOD COUNT (CBC) WITH DIFFERENTIAL
Test Name                     Result      Units         Reference Range       Status
--------------------------------------------------------------------------------------
Hemoglobin                    12.1        g/dL          13.5 - 17.5           LOW
White Blood Cell Count (WBC)   6.8         x10^3/uL      4.5 - 11.0            NORMAL
Platelet Count                245         x10^3/uL      150 - 450             NORMAL

COMPREHENSIVE METABOLIC PANEL
Fasting Glucose               108         mg/dL         70 - 99               HIGH
Serum Sodium                  139         mmol/L        135 - 145             NORMAL
Serum Potassium               4.2         mmol/L        3.5 - 5.1             NORMAL

ENDOCRINOLOGY
Thyroid Stimulating Hormone   2.4         mIU/L         0.4 - 4.0             NORMAL
`,
      pageCount: 2,
    },
  });

  const docPrevious = await prisma.medicalDocument.create({
    data: {
      patientId: patient.id,
      filename: 'Routine_Metabolic_Panel_Jan2026.pdf',
      originalName: 'Routine_Metabolic_Panel_Jan2026.pdf',
      fileUrl: '/sample-reports/Routine_Metabolic_Panel_Jan2026.pdf',
      mimeType: 'application/pdf',
      fileSize: 312000,
      status: 'VERIFIED',
      rawOcrText: `METRO CLINICAL DIAGNOSTICS
Patient Name: Eleanor Vance
Date of Collection: 01/10/2026

Test Name                     Result      Units         Reference Range
Hemoglobin                    11.8        g/dL          13.5 - 17.5
Fasting Glucose               102         mg/dL         70 - 99
`,
      pageCount: 1,
    },
  });

  // 4. Create Lab Results with Provenance & Deterministic Status
  await prisma.labResult.createMany({
    data: [
      {
        patientId: patient.id,
        documentId: docCurrent.id,
        testName: 'Hemoglobin',
        category: 'Complete Blood Count',
        valueNum: 12.1,
        valueText: '12.1',
        unit: 'g/dL',
        lowerBound: 13.5,
        upperBound: 17.5,
        rawReferenceRange: '13.5 - 17.5 g/dL',
        deterministicStatus: 'LOW',
        origin: 'AI_EXTRACTED',
        confidence: 96.0,
        verificationStatus: 'NEEDS_REVIEW',
        sourcePage: 1,
        sourceText: 'Hemoglobin 12.1 g/dL (Reference Range: 13.5 - 17.5 g/dL)',
        testDate: '2026-08-15',
      },
      {
        patientId: patient.id,
        documentId: docCurrent.id,
        testName: 'Fasting Glucose',
        category: 'Comprehensive Metabolic Panel',
        valueNum: 108.0,
        valueText: '108',
        unit: 'mg/dL',
        lowerBound: 70.0,
        upperBound: 99.0,
        rawReferenceRange: '70 - 99 mg/dL',
        deterministicStatus: 'HIGH',
        origin: 'AI_EXTRACTED',
        confidence: 92.0,
        verificationStatus: 'NEEDS_REVIEW',
        sourcePage: 1,
        sourceText: 'Fasting Glucose 108 mg/dL (Reference Range: 70 - 99 mg/dL)',
        testDate: '2026-08-15',
      },
      {
        patientId: patient.id,
        documentId: docCurrent.id,
        testName: 'White Blood Cell Count (WBC)',
        category: 'Complete Blood Count',
        valueNum: 6.8,
        valueText: '6.8',
        unit: 'x10^3/uL',
        lowerBound: 4.5,
        upperBound: 11.0,
        rawReferenceRange: '4.5 - 11.0 x10^3/uL',
        deterministicStatus: 'NORMAL',
        origin: 'HUMAN_VERIFIED',
        confidence: 98.0,
        verificationStatus: 'VERIFIED',
        sourcePage: 1,
        sourceText: 'White Blood Cell Count 6.8 x10^3/uL (Reference Range: 4.5 - 11.0)',
        testDate: '2026-08-15',
      },
      {
        patientId: patient.id,
        documentId: docCurrent.id,
        testName: 'Thyroid Stimulating Hormone (TSH)',
        category: 'Endocrinology',
        valueNum: 2.4,
        valueText: '2.4',
        unit: 'mIU/L',
        lowerBound: 0.4,
        upperBound: 4.0,
        rawReferenceRange: '0.4 - 4.0 mIU/L',
        deterministicStatus: 'NORMAL',
        origin: 'HUMAN_VERIFIED',
        confidence: 95.0,
        verificationStatus: 'VERIFIED',
        sourcePage: 2,
        sourceText: 'Thyroid Stimulating Hormone 2.4 mIU/L (Reference Range: 0.4 - 4.0)',
        testDate: '2026-08-15',
      },
      {
        patientId: patient.id,
        documentId: docPrevious.id,
        testName: 'Hemoglobin',
        category: 'Complete Blood Count',
        valueNum: 11.8,
        valueText: '11.8',
        unit: 'g/dL',
        lowerBound: 13.5,
        upperBound: 17.5,
        rawReferenceRange: '13.5 - 17.5 g/dL',
        deterministicStatus: 'LOW',
        origin: 'HUMAN_VERIFIED',
        confidence: 97.0,
        verificationStatus: 'VERIFIED',
        sourcePage: 1,
        sourceText: 'Hemoglobin 11.8 g/dL (Reference Range: 13.5 - 17.5 g/dL)',
        testDate: '2026-01-10',
      },
      {
        patientId: patient.id,
        documentId: docPrevious.id,
        testName: 'Fasting Glucose',
        category: 'Comprehensive Metabolic Panel',
        valueNum: 102.0,
        valueText: '102',
        unit: 'mg/dL',
        lowerBound: 70.0,
        upperBound: 99.0,
        rawReferenceRange: '70 - 99 mg/dL',
        deterministicStatus: 'HIGH',
        origin: 'HUMAN_VERIFIED',
        confidence: 94.0,
        verificationStatus: 'VERIFIED',
        sourcePage: 1,
        sourceText: 'Fasting Glucose 102 mg/dL (Reference Range: 70 - 99 mg/dL)',
        testDate: '2026-01-10',
      },
    ],
  });

  // 5. Create Conflict Alerts
  await prisma.conflict.create({
    data: {
      patientId: patient.id,
      category: 'ALLERGY',
      title: 'Discrepancy in Reported Drug Allergy',
      description: 'Recent clinical Intake record lists Penicillin Allergy (Hives), whereas 2025 Urgent Care notes state No Known Drug Allergies (NKDA).',
      sourceA: 'Intake Form Aug 2026: Penicillin (Hives)',
      sourceB: 'Urgent Care Note May 2025: NKDA',
      status: 'UNRESOLVED',
    },
  });

  // 6. Create Timeline Events
  await prisma.timelineEvent.createMany({
    data: [
      {
        patientId: patient.id,
        eventType: 'RECORD_CREATED',
        title: 'Patient Record Created',
        description: 'Eleanor Vance clinical record initialized.',
        eventDate: new Date('2026-01-05'),
      },
      {
        patientId: patient.id,
        documentId: docPrevious.id,
        eventType: 'DOCUMENT_UPLOADED',
        title: 'Report Uploaded: Routine Metabolic Panel Jan 2026',
        description: 'Historical lab document processed and verified.',
        eventDate: new Date('2026-01-10'),
      },
      {
        patientId: patient.id,
        documentId: docCurrent.id,
        eventType: 'LAB_REPORT_PROCESSED',
        title: 'Report Uploaded: Comprehensive Blood Panel Aug 2026',
        description: '6 lab parameters extracted; 2 items flagged for human review.',
        eventDate: new Date('2026-08-15'),
      },
      {
        patientId: patient.id,
        eventType: 'CONFLICT_DETECTED',
        title: 'Allergy Conflict Flagged',
        description: 'Unresolved allergy discrepancy detected between Intake form and Urgent Care notes.',
        eventDate: new Date('2026-08-16'),
      },
    ],
  });

  // 7. Create Safe AI Summary
  await prisma.summary.create({
    data: {
      patientId: patient.id,
      documentId: docCurrent.id,
      summaryText:
        'Patient Eleanor Vance (38 y/o F) latest lab report (Aug 15, 2026) displays a Hemoglobin level of 12.1 g/dL (classified as LOW against source reference range 13.5-17.5 g/dL), representing an increase from 11.8 g/dL recorded in Jan 2026. Fasting Glucose is 108 mg/dL (classified as HIGH against source range 70-99 mg/dL). White blood cell and platelet counts are within normal bounds.',
      keyTakeaways: JSON.stringify([
        'Hemoglobin 12.1 g/dL is below report reference range (13.5 - 17.5 g/dL).',
        'Fasting Glucose 108 mg/dL is slightly elevated above report upper bound (99 mg/dL).',
        'WBC, Platelets, and TSH levels remain stable within normal reference bounds.',
      ]),
      factualPoints: JSON.stringify([
        'Hemoglobin improved +0.3 g/dL since Jan 2026.',
        'Deterministic bounds applied strictly from Metro Clinical Diagnostics report.',
      ]),
      safeNotes:
        'MedLens structures and validates source laboratory reports. This summary does not constitute medical diagnosis or treatment advice.',
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
