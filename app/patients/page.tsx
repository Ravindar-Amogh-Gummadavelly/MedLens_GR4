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
    return <div className="p-8 text-center text-slate-400">No active patient record.</div>;
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
