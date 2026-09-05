import { prisma } from '@/lib/prisma';
import SplitTraceabilityView from '@/components/provenance/SplitTraceabilityView';

export const dynamic = 'force-dynamic';

export default async function ProvenancePage() {
  const latestDoc = await prisma.medicalDocument.findFirst({
    where: { status: { in: ['READY_FOR_REVIEW', 'VERIFIED'] } },
    include: { labResults: true },
    orderBy: { uploadedAt: 'desc' },
  });

  if (!latestDoc) {
    return <SplitTraceabilityView labResults={[]} />;
  }

  return (
    <SplitTraceabilityView
      documentName={latestDoc.originalName}
      rawOcrText={latestDoc.rawOcrText || undefined}
      labResults={latestDoc.labResults.map((r) => ({
        id: r.id,
        testName: r.testName,
        category: r.category,
        valueText: r.valueText,
        unit: r.unit,
        rawReferenceRange: r.rawReferenceRange,
        deterministicStatus: r.deterministicStatus,
        origin: r.origin,
        confidence: Math.round(r.confidence || 95),
        verificationStatus: r.verificationStatus,
        sourcePage: r.sourcePage,
        sourceText: r.sourceText,
        testDate: r.testDate,
      }))}
    />
  );
}
