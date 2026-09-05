import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning fake/demo data from database...');

  // Delete all child data in proper foreign key order
  await prisma.verification.deleteMany();
  await prisma.auditEvent.deleteMany();
  await prisma.summary.deleteMany();
  await prisma.timelineEvent.deleteMany();
  await prisma.conflict.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.labResult.deleteMany();
  await prisma.extractionJob.deleteMany();
  await prisma.medicalDocument.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();

  console.log('All synthetic patient records and fake lab results removed!');

  // Create default clinician account
  const passwordHash = bcrypt.hashSync('password123', 10);
  const clinician = await prisma.user.create({
    data: {
      email: 'admin@medlens.org',
      passwordHash,
      name: 'Dr. Sarah Jenkins',
      role: 'CLINICIAN',
    },
  });

  console.log(`Created clean clinician account: ${clinician.email} (Password: password123)`);
}

main()
  .catch((e) => {
    console.error('Clear error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
