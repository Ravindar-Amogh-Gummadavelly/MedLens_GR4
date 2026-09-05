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
      <div className="max-w-4xl mx-auto py-12 px-6 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800 flex items-center justify-center mx-auto text-primary-600 text-2xl font-bold">
          🛡️
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Clinical Information Intelligence Workspace</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            No patient profile currently active. Initialize a new patient record or upload a medical document to analyze structured lab parameters and provenance.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 pt-2">
          <a
            href="/patients/new"
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
          >
            + Create New Patient Profile
          </a>
          <a
            href="/reports/upload"
            className="px-5 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            📄 Upload Medical Report
          </a>
        </div>
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
