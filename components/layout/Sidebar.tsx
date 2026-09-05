'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { name: 'Dashboard', href: '/', icon: DashboardIcon },
    ],
  },
  {
    label: 'Clinical Data',
    items: [
      { name: 'Lab Results', href: '/lab-results', icon: LabIcon },
      { name: 'Timeline', href: '/timeline', icon: TimelineIcon },
      { name: 'Trends', href: '/trends', icon: TrendsIcon },
      { name: 'Compare', href: '/compare', icon: CompareIcon },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { name: 'Upload Report', href: '/reports/upload', icon: UploadIcon },
      { name: 'Traceability', href: '/provenance', icon: ProvenanceIcon },
      { name: 'Review Center', href: '/review', icon: ReviewIcon },
    ],
  },
  {
    label: 'Export',
    items: [
      { name: 'Doctor-Ready PDF', href: '/export', icon: ExportIcon },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-60 bg-clinical-surface border-r border-clinical-border shadow-sidebar flex flex-col">
      {/* Logo / Brand */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-clinical-border">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div>
          <span className="text-base font-bold text-text-primary tracking-tight">MedLens</span>
          <span className="block text-2xs text-text-tertiary font-medium -mt-0.5">Clinical Intelligence</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-4">
            <span className="px-2 text-2xs font-semibold text-text-muted uppercase tracking-widest">
              {section.label}
            </span>
            <ul className="mt-1.5 space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-100 group ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 shadow-sm'
                          : 'text-text-secondary hover:text-text-primary hover:bg-clinical-muted'
                      }`}
                    >
                      <item.icon active={isActive} />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-clinical-border">
        <div className="flex items-center gap-2 text-2xs text-text-muted">
          <div className="w-2 h-2 rounded-full bg-status-normal animate-pulse" />
          <span>AI Engine: Gemini 2.0 Flash</span>
        </div>
      </div>
    </aside>
  );
}

/* ── Icon Components ───────────────────────────────────────────────── */

function DashboardIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 flex-shrink-0 ${active ? 'text-primary-600' : 'text-text-tertiary group-hover:text-text-secondary'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function LabIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 flex-shrink-0 ${active ? 'text-primary-600' : 'text-text-tertiary group-hover:text-text-secondary'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6v7.5L20 20H4L9 10.5V3z" />
      <path d="M9 3h6" />
    </svg>
  );
}

function TimelineIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 flex-shrink-0 ${active ? 'text-primary-600' : 'text-text-tertiary group-hover:text-text-secondary'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="18" r="2" />
      <line x1="14" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="10" y2="12" />
      <line x1="14" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function TrendsIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 flex-shrink-0 ${active ? 'text-primary-600' : 'text-text-tertiary group-hover:text-text-secondary'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function CompareIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 flex-shrink-0 ${active ? 'text-primary-600' : 'text-text-tertiary group-hover:text-text-secondary'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="8" height="16" rx="1" />
      <rect x="14" y="4" width="8" height="16" rx="1" />
      <path d="M10 12h4" />
    </svg>
  );
}

function UploadIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 flex-shrink-0 ${active ? 'text-primary-600' : 'text-text-tertiary group-hover:text-text-secondary'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function ProvenanceIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 flex-shrink-0 ${active ? 'text-primary-600' : 'text-text-tertiary group-hover:text-text-secondary'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function ReviewIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 flex-shrink-0 ${active ? 'text-primary-600' : 'text-text-tertiary group-hover:text-text-secondary'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
  );
}

function ExportIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 flex-shrink-0 ${active ? 'text-primary-600' : 'text-text-tertiary group-hover:text-text-secondary'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M12 18v-6" />
      <path d="M9 15l3-3 3 3" />
    </svg>
  );
}
