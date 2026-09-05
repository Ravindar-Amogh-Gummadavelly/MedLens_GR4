import { prisma } from '@/lib/prisma';
import SplitTraceabilityView from '@/components/provenance/SplitTraceabilityView';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { reportId: string };
}

export default async function ReportDetailPage({ params }: PageProps) {
  const document = await prisma.medicalDocument.findUnique({
    where: { id: params.reportId },
    include: {
      labResults: true,
    },
  });

  if (!document) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <SplitTraceabilityView
        documentName={document.originalName}
        rawOcrText={document.rawOcrText || 'No OCR text available for this report.'}
        labResults={document.labResults.map((r) => ({
          id: r.id,
          testName: r.testName,
          category: r.category,
          valueText: r.valueText,
          unit: r.unit,
          rawReferenceRange: r.rawReferenceRange,
          deterministicStatus: r.deterministicStatus as any,
          origin: r.origin,
          confidence: r.confidence,
          verificationStatus: r.verificationStatus as any,
          sourcePage: r.sourcePage,
          sourceText: r.sourceText,
          testDate: r.testDate,
        }))}
      />
    </div>
  );
}
