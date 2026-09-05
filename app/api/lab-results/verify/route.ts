import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { evaluateLabStatus } from '@/lib/safety/lab-evaluator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { labResultId, action, correctedValue, reason } = body;

    if (!labResultId || !action) {
      return NextResponse.json({ error: 'Missing labResultId or action' }, { status: 400 });
    }

    const lab = await prisma.labResult.findUnique({
      where: { id: labResultId },
    });

    if (!lab) {
      return NextResponse.json({ error: 'Lab result not found' }, { status: 404 });
    }

    // Preserve audit record of original extraction
    const firstUser = await prisma.user.findFirst();
    const userId = firstUser ? firstUser.id : 'system-user';

    await prisma.verification.create({
      data: {
        labResultId: lab.id,
        verifiedByUserId: userId,
        originalValue: lab.valueText,
        correctedValue: correctedValue || lab.valueText,
        action: action, // VERIFIED, EDITED, REJECTED
        reason: reason || 'Human verification action',
      },
    });

    if (action === 'REJECTED') {
      const updated = await prisma.labResult.update({
        where: { id: labResultId },
        data: {
          verificationStatus: 'REJECTED',
        },
      });
      return NextResponse.json({ success: true, result: updated });
    }

    // Action is VERIFIED or EDITED
    const newValueText = correctedValue || lab.valueText;
    const numericVal = parseFloat(newValueText);
    const hasNum = !isNaN(numericVal);

    // Re-run deterministic lab evaluation if edited!
    const newEval = evaluateLabStatus({
      valueNum: hasNum ? numericVal : lab.valueNum,
      valueText: newValueText,
      lowerBound: lab.lowerBound,
      upperBound: lab.upperBound,
      rawReferenceRange: lab.rawReferenceRange,
    });

    const updated = await prisma.labResult.update({
      where: { id: labResultId },
      data: {
        valueText: newValueText,
        valueNum: hasNum ? numericVal : lab.valueNum,
        deterministicStatus: newEval.status,
        origin: 'HUMAN_VERIFIED',
        verificationStatus: 'VERIFIED',
      },
    });

    // Record timeline event
    await prisma.timelineEvent.create({
      data: {
        patientId: lab.patientId,
        documentId: lab.documentId,
        eventType: 'VERIFICATION_ACTION',
        title: `Verification Action: ${lab.testName}`,
        description: `Verified by user. Status set to ${newEval.status}.`,
        eventDate: new Date(),
      },
    });

    return NextResponse.json({ success: true, result: updated });
  } catch (err: any) {
    console.error('Verify API error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
