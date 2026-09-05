import { prisma } from '@/lib/prisma';
import DoctorReadyPDF from '@/components/export/DoctorReadyPDF';

export const revalidate = 0;

export default async function PatientRecordPage() {
  const patient = await prisma.patient.findFirst({
    include: {
      labResults: { orderBy: { testDate: 'desc' } },
      summaries: { orderBy: { createdAt: 'desc' }, take: 1 },
    },
  });

  if (!patient) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">No Patient Record Selected</h2>
        <p className="text-sm text-slate-500">Create a patient profile to view printable clinical records and summaries.</p>
        <a
          href="/patients/new"
          className="inline-block px-4 py-2 bg-clinical-navy text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
        >
          + Create Patient Record
        </a>
      </div>
    );
  }

  const latestSummary = patient.summaries[0]?.summaryText || null;

  return (
    <DoctorReadyPDF
      patient={{
        name: patient.name,
        dob: patient.dob,
        sex: patient.sex,
        symptoms: patient.symptoms,
        existingConditions: patient.existingConditions,
        allergies: patient.allergies,
      }}
      labResults={patient.labResults.map((r) => ({
        testName: r.testName,
        category: r.category,
        valueText: r.valueText,
        unit: r.unit,
        rawReferenceRange: r.rawReferenceRange,
        deterministicStatus: r.deterministicStatus,
        origin: r.origin,
        verificationStatus: r.verificationStatus,
        sourcePage: r.sourcePage,
        testDate: r.testDate,
      }))}
      summaryText={latestSummary}
    />
  );
}
