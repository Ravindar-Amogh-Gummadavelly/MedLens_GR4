import { prisma } from '@/lib/prisma';
import MedicalTimeline from '@/components/timeline/MedicalTimeline';

export const revalidate = 0;

export default async function TimelinePage() {
  const events = await prisma.timelineEvent.findMany({
    orderBy: { eventDate: 'desc' },
    include: { document: true },
  });

  return (
    <MedicalTimeline
      events={events.map((e) => ({
        id: e.id,
        eventType: e.eventType,
        title: e.title,
        description: e.description,
        eventDate: e.eventDate.toISOString(),
        documentName: e.document?.originalName,
      }))}
    />
  );
}
