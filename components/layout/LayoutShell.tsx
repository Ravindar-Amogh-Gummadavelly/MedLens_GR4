'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';

import { ThemeProvider } from '@/components/theme/ThemeProvider';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/login') {
    return (
      <ThemeProvider>
        <main className="min-h-screen bg-slate-950">{children}</main>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="ml-60 flex-1 flex flex-col min-h-screen">
          <TopBar />
          <main className="flex-1 p-6 overflow-y-auto bg-clinical-bg dark:bg-slate-950 text-text-primary dark:text-slate-100 transition-colors duration-200">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
