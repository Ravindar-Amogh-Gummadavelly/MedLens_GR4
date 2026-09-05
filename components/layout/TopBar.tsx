'use client';

import { useState } from 'react';

export default function TopBar() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-14 bg-clinical-surface/80 backdrop-blur-md border-b border-clinical-border flex items-center justify-between px-6">
      {/* Search */}
      <div className={`relative w-80 transition-all duration-200 ${searchFocused ? 'w-96' : ''}`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search patients, labs, reports…"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="w-full pl-9 pr-4 py-1.5 bg-clinical-muted border border-clinical-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center px-1.5 py-0.5 text-2xs font-mono text-text-muted bg-clinical-surface border border-clinical-border rounded">
          ⌘K
        </kbd>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Safety indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-verified-bg border border-verified-border text-2xs font-semibold text-verified-text">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Safety Active
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-clinical-muted transition-colors">
          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-high rounded-full border-2 border-clinical-surface" />
        </button>

        {/* User avatar */}
        <button className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-semibold text-xs flex items-center justify-center hover:bg-primary-200 transition-colors">
          DR
        </button>
      </div>
    </header>
  );
}
