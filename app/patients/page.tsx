import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Users, UserPlus } from 'lucide-react';
import PatientDirectoryClient from '@/components/patient/PatientDirectoryClient';

export const revalidate = 0;

export default async function PatientDirectoryPage() {
  const patients = await prisma.patient.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: {
          labResults: true,
          documents: true,
        },
      },
      labResults: {
        select: { deterministicStatus: true, verificationStatus: true },
      },
    },
  });

  const formattedPatients = patients.map((p) => ({
    id: p.id,
    name: p.name,
    dob: p.dob,
    sex: p.sex,
    symptoms: p.symptoms,
    allergies: p.allergies,
    totalTests: p._count.labResults,
    totalDocs: p._count.documents,
    flaggedCount: p.labResults.filter(
      (r) => r.deterministicStatus === 'HIGH' || r.deterministicStatus === 'LOW'
    ).length,
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-clinical-surface dark:bg-slate-900 p-6 rounded-2xl border border-clinical-border dark:border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-text-primary dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-primary-600" />
            Patient Directory & Clinical Records
          </h1>
          <p className="text-xs text-text-tertiary dark:text-slate-400 mt-1">
            Search and manage patient records by name or medical identification number.
          </p>
        </div>
        <Link
          href="/patients/new"
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
        >
          <UserPlus className="w-4 h-4" />
          + Create New Patient
        </Link>
      </div>

      {/* Directory Grid with Search */}
      <PatientDirectoryClient patients={formattedPatients} />
    </div>
  );
}
