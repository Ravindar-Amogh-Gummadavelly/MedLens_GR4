import { prisma } from '@/lib/prisma';
import PatientDashboard from '@/components/dashboard/PatientDashboard';

export const revalidate = 0;

export default async function DashboardPage() {
  const patient = await prisma.patient.findFirst({
    include: {
      labResults: {
        orderBy: { createdAt: 'desc' },
      },
      documents: {
        orderBy: { uploadedAt: 'desc' },
        take: 5,
      },
      conflicts: {
        where: { status: 'UNRESOLVED' },
      },
      summaries: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  if (!patient) {
    return (
      <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <h2 className="text-xl font-bold text-white">No Active Patient Record</h2>
        <p className="text-xs text-slate-400">Please seed database or create a new patient profile.</p>
      </div>
    );
  }

  const latestSummary = patient.summaries[0]
    ? {
        summaryText: patient.summaries[0].summaryText,
        keyTakeaways: JSON.parse(patient.summaries[0].keyTakeaways || '[]'),
        safeNotes: patient.summaries[0].safeNotes,
      }
    : null;

  return (
    <PatientDashboard
      patient={{
        id: patient.id,
        name: patient.name,
        dob: patient.dob,
        sex: patient.sex,
        allergies: patient.allergies,
        medications: patient.medications,
      }}
      labResults={patient.labResults.map((r) => ({
        id: r.id,
        testName: r.testName,
        category: r.category,
        valueText: r.valueText,
        unit: r.unit,
        rawReferenceRange: r.rawReferenceRange,
        deterministicStatus: r.deterministicStatus as any,
        verificationStatus: r.verificationStatus,
        testDate: r.testDate,
      }))}
      recentDocuments={patient.documents.map((d) => ({
        id: d.id,
        originalName: d.originalName,
        status: d.status,
        uploadedAt: d.uploadedAt.toISOString(),
      }))}
      conflicts={patient.conflicts.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description,
      }))}
      summary={latestSummary}
    />
  );
}
