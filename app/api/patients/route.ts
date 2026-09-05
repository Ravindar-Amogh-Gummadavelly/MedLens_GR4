import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, dob, sex, symptoms, existingConditions, allergies, medications } = body;

    if (!name) {
      return NextResponse.json({ error: 'Patient name is required' }, { status: 400 });
    }

    const firstUser = await prisma.user.findFirst();
    let userId = firstUser ? firstUser.id : '';

    if (!userId) {
      const newUser = await prisma.user.create({
        data: {
          email: `clinician_${Date.now()}@medlens.org`,
          passwordHash: 'dummyhash',
          name: 'Primary Clinician',
        },
      });
      userId = newUser.id;
    }

    const patient = await prisma.patient.create({
      data: {
        userId,
        name,
        dob: dob || null,
        sex: sex || null,
        symptoms: symptoms || null,
        existingConditions: existingConditions || null,
        allergies: allergies || null,
        medications: medications || null,
      },
    });

    // Create Timeline Event
    await prisma.timelineEvent.create({
      data: {
        patientId: patient.id,
        eventType: 'RECORD_CREATED',
        title: `Patient Profile Initialized: ${patient.name}`,
        description: `New clinical record created for ${patient.name} (${patient.sex || 'N/A'}, DOB: ${patient.dob || 'N/A'}).`,
        eventDate: new Date(),
      },
    });

    return NextResponse.json({ success: true, patientId: patient.id });
  } catch (err: any) {
    console.error('Patient API error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
