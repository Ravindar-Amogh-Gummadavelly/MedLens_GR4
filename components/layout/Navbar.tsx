'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, UserCheck, FileText, ChevronRight } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40 px-6 flex items-center justify-between">
      {/* Brand Logo & Core Principle */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-clinical-600 flex items-center justify-center text-white shadow-lg shadow-clinical-600/30">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg text-white tracking-tight">MedLens</span>
            <span className="text-xs text-clinical-400 font-medium block -mt-1">Clinical Intelligence</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2 ml-6 pl-6 border-l border-slate-800 text-xs text-slate-400">
          <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">AI Extracts</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">Software Validates</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="bg-clinical-950 border border-clinical-700 text-clinical-300 px-2 py-0.5 rounded font-mono font-semibold">
            Humans Verify
          </span>
        </div>
      </div>

      {/* Safety & Profile Status */}
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-full text-xs text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Deterministic Safety Rules Active</span>
        </div>

        <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-clinical-navy/80 border border-slate-700 flex items-center justify-center text-white font-bold text-xs">
            SJ
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-semibold text-white">Dr. Sarah Jenkins</div>
            <div className="text-[10px] text-slate-400">Clinician Workspace</div>
          </div>
          <button
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              window.location.href = '/login';
            }}
            className="ml-2 px-2.5 py-1 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
