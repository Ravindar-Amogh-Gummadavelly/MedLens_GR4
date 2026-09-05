'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/login') {
    return <main className="min-h-screen bg-slate-950">{children}</main>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-60 flex-1 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 p-6 overflow-y-auto bg-clinical-bg">{children}</main>
      </div>
    </div>
  );
}
