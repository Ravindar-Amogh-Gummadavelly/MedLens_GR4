import { prisma } from '@/lib/prisma';
import LabTrendsChart, { TrendDataPoint } from '@/components/trends/LabTrendsChart';

export const dynamic = 'force-dynamic';

export default async function TrendsPage() {
  const labResults = await prisma.labResult.findMany({
    where: { valueNum: { not: null } },
    include: { document: { select: { originalName: true } } },
    orderBy: { testDate: 'asc' },
    take: 100,
  });

  const dataPoints: TrendDataPoint[] = labResults.map((r) => ({
    date: r.testDate || r.createdAt.toISOString().split('T')[0],
    value: r.valueNum!,
    unit: r.unit || '',
    status: (r.deterministicStatus || 'normal').toLowerCase(),
    lowerBound: r.lowerBound,
    upperBound: r.upperBound,
    documentName: r.document?.originalName || 'Medical Report',
  }));

  const paramName = labResults[0]?.testName || 'Hemoglobin';

  return <LabTrendsChart parameterName={paramName} dataPoints={dataPoints} />;
}
