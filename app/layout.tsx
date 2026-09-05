import type { Metadata } from 'next';
import './globals.css';
import LayoutShell from '@/components/layout/LayoutShell';

export const metadata: Metadata = {
  title: 'MedLens — AI-Powered Clinical Information Intelligence',
  description: 'MedLens turns fragmented medical documents into a structured, traceable, and human-verified patient record.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-clinical-bg antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
