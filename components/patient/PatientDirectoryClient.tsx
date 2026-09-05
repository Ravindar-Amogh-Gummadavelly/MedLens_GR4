'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, UserPlus, FileText, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

interface PatientCardData {
  id: string;
  name: string;
  dob?: string | null;
  sex?: string | null;
  symptoms?: string | null;
  allergies?: string | null;
  totalTests: number;
  totalDocs: number;
  flaggedCount: number;
}

interface PatientDirectoryClientProps {
  patients: PatientCardData[];
}

export default function PatientDirectoryClient({ patients }: PatientDirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const nameMatch = p.name.toLowerCase().includes(q);
    const idMatch = p.id.toLowerCase().includes(q);
    return nameMatch || idMatch;
  });

  return (
    <div className="space-y-6">
      {/* Directory Search Header Bar */}
      <div className="card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-text-tertiary dark:text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search by patient name or ID/number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-clinical-muted dark:bg-slate-800 border border-clinical-border dark:border-slate-700 rounded-xl text-sm text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-400 focus:outline-none focus:border-primary-400 dark:focus:border-primary-500 transition-all"
          />
        </div>

        <div className="text-xs text-text-tertiary dark:text-slate-400 font-medium">
          Showing <span className="font-bold text-text-primary dark:text-white">{filteredPatients.length}</span> of {patients.length} records
        </div>
      </div>

      {/* Directory Grid */}
      {filteredPatients.length === 0 ? (
        <div className="card p-12 text-center space-y-3">
          <Search className="w-8 h-8 text-text-muted dark:text-slate-500 mx-auto" />
          <h3 className="text-base font-semibold text-text-primary dark:text-white">No patient records found</h3>
          <p className="text-xs text-text-tertiary dark:text-slate-400">
            No patients match your search parameter "{searchQuery}".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((p) => (
            <div
              key={p.id}
              className="card p-5 space-y-4 hover:border-primary-300 dark:hover:border-primary-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-primary-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-text-primary dark:text-white">{p.name}</h3>
                      <span className="text-2xs text-text-tertiary dark:text-slate-400 font-mono">
                        ID: {p.id.slice(0, 8)} • DOB: {p.dob || 'N/A'} ({p.sex || 'N/A'})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-clinical-border dark:border-slate-800 text-xs">
                  <div className="bg-clinical-subtle dark:bg-slate-800/60 p-2 rounded-lg text-center">
                    <span className="text-2xs text-text-tertiary dark:text-slate-400 block">Total Labs</span>
                    <span className="font-bold text-text-primary dark:text-white">{p.totalTests}</span>
                  </div>
                  <div className="bg-clinical-subtle dark:bg-slate-800/60 p-2 rounded-lg text-center">
                    <span className="text-2xs text-text-tertiary dark:text-slate-400 block">Documents</span>
                    <span className="font-bold text-text-primary dark:text-white">{p.totalDocs}</span>
                  </div>
                </div>

                <div className="space-y-1 pt-1 text-2xs">
                  {p.symptoms && (
                    <p className="text-text-secondary dark:text-slate-300 truncate">
                      <span className="font-semibold text-text-tertiary dark:text-slate-400">Symptoms:</span> {p.symptoms}
                    </p>
                  )}
                  {p.allergies && (
                    <p className="text-rose-600 dark:text-rose-400 font-medium truncate">
                      <span className="font-semibold">Allergies:</span> {p.allergies}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-clinical-border dark:border-slate-800 flex items-center justify-between">
                <span className="text-2xs font-semibold px-2 py-0.5 rounded bg-primary-50 text-primary-700 border border-primary-200 dark:bg-primary-950/80 dark:text-primary-300 dark:border-primary-800">
                  {p.flaggedCount > 0 ? `⚠️ ${p.flaggedCount} Flagged Labs` : '✓ All Normal'}
                </span>
                <Link
                  href="/dashboard"
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors"
                >
                  Select Patient →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
