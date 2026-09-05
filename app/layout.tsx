import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';

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
      <body>
        <Sidebar />
        <div className="ml-60 min-h-screen flex flex-col">
          <TopBar />
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
