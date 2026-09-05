import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { conflictId, resolution } = await request.json();

    if (!conflictId || !resolution) {
      return NextResponse.json({ error: 'Missing conflictId or resolution text' }, { status: 400 });
    }

    const updated = await prisma.conflict.update({
      where: { id: conflictId },
      data: {
        status: 'RESOLVED',
        resolution,
      },
    });

    // Record timeline event
    await prisma.timelineEvent.create({
      data: {
        patientId: updated.patientId,
        eventType: 'CONFLICT_RESOLVED',
        title: `Medical Record Conflict Resolved: ${updated.title}`,
        description: `Human user resolved conflict: "${resolution}".`,
        eventDate: new Date(),
      },
    });

    return NextResponse.json({ success: true, conflict: updated });
  } catch (err: any) {
    console.error('Conflict resolution error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
