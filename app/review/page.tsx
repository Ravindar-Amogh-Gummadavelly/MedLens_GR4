import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import VerificationCenterContainer from './VerificationCenterContainer';

export const dynamic = 'force-dynamic';

type LabResultWithDoc = Prisma.LabResultGetPayload<{
  include: { document: { select: { originalName: true } } };
}>;

export default async function ReviewPage() {
  const pendingResults = await prisma.labResult.findMany({
    where: { verificationStatus: 'NEEDS_REVIEW' },
    include: { document: { select: { originalName: true } } },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  const reviewItems = pendingResults.map((r: LabResultWithDoc) => ({
    id: r.id,
    testName: r.testName,
    category: r.category,
    valueText: r.valueText,
    unit: r.unit,
    rawReferenceRange: r.rawReferenceRange,
    deterministicStatus: (r.deterministicStatus || 'UNABLE_TO_DETERMINE') as any,
    origin: r.origin,
    confidence: Math.round(r.confidence || 95),
    verificationStatus: r.verificationStatus,
    sourceText: r.sourceText,
    documentName: r.document?.originalName || 'Medical Report',
    testDate: r.testDate,
  }));

  return <VerificationCenterContainer initialItems={reviewItems} />;
}
