import { prisma } from '@/lib/prisma';
import MultiReportCompare, { ComparisonRow } from '@/components/compare/MultiReportCompare';

export const dynamic = 'force-dynamic';

export default async function ComparePage() {
  const documents = await prisma.medicalDocument.findMany({
    where: { status: { in: ['READY_FOR_REVIEW', 'VERIFIED'] } },
    include: { labResults: true },
    orderBy: { uploadedAt: 'desc' },
    take: 2,
  });

  if (documents.length < 2) {
    return <MultiReportCompare comparisonData={[]} />;
  }

  const [docCurrent, docPrevious] = documents;

  const prevMap = new Map(
    docPrevious.labResults.map((r) => [r.testName.toLowerCase(), r])
  );

  const comparisonData: ComparisonRow[] = docCurrent.labResults.map((cur) => {
    const prev = prevMap.get(cur.testName.toLowerCase());
    return {
      testName: cur.testName,
      category: cur.category,
      previousValueText: prev ? prev.valueText : '—',
      previousValueNum: prev ? prev.valueNum : null,
      previousDate: docPrevious.uploadedAt.toISOString().split('T')[0],
      currentValueText: cur.valueText,
      currentValueNum: cur.valueNum,
      currentDate: docCurrent.uploadedAt.toISOString().split('T')[0],
      unit: cur.unit,
      previousStatus: (prev?.deterministicStatus || 'normal').toLowerCase(),
      currentStatus: (cur.deterministicStatus || 'normal').toLowerCase(),
    };
  });

  return (
    <MultiReportCompare
      reportA={{ name: docPrevious.originalName, date: docPrevious.uploadedAt.toISOString().split('T')[0] }}
      reportB={{ name: docCurrent.originalName, date: docCurrent.uploadedAt.toISOString().split('T')[0] }}
      comparisonData={comparisonData}
    />
  );
}
