import { prisma } from '@/lib/prisma';
import LabTrendsChart from '@/components/trends/LabTrendsChart';
import LabResultsSearchContainer from './LabResultsSearchContainer';
import { FlaskConical } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function LabResultsPage() {
  const labResults = await prisma.labResult.findMany({
    orderBy: { createdAt: 'desc' },
    include: { document: { select: { originalName: true } } },
    take: 100,
  });

  const hemoglobinPoints = labResults
    .filter((r) => r.testName.toLowerCase().includes('hemoglobin') && r.valueNum != null)
    .map((r) => ({
      date: r.testDate || r.createdAt.toISOString().split('T')[0],
      value: r.valueNum!,
      unit: r.unit || 'g/dL',
      status: r.deterministicStatus,
      lowerBound: r.lowerBound,
      upperBound: r.upperBound,
      documentName: r.document?.originalName || 'Medical Report',
    }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-slate-900 p-5 rounded-xl border border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-clinical-400" />
            Structured Laboratory Results & Search Inventory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete inventory of extracted lab parameters, deterministic status ratings, real-time search, and source document references.
          </p>
        </div>
      </div>

      {/* Hemoglobin Longitudinal Trend visualizer */}
      <LabTrendsChart parameterName="Hemoglobin (g/dL)" dataPoints={hemoglobinPoints} />

      {/* Interactive Search & Filter Container */}
      <LabResultsSearchContainer
        labResults={labResults.map((r) => ({
          id: r.id,
          testName: r.testName,
          category: r.category,
          valueText: r.valueText,
          unit: r.unit,
          rawReferenceRange: r.rawReferenceRange,
          deterministicStatus: r.deterministicStatus as any,
          origin: r.origin,
          confidence: r.confidence,
          verificationStatus: r.verificationStatus,
          documentId: r.documentId,
          documentName: r.document?.originalName || 'Medical Report',
          testDate: r.testDate,
        }))}
      />
    </div>
  );
}
