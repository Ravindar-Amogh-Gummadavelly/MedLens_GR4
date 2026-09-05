'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Patient {
  id: string;
  name: string;
  dob?: string;
  sex?: string;
  totalTests: number;
  totalDocs: number;
  flaggedTests: number;
}

export default function PatientSwitcher() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await fetch('/api/patients');
      const data = await res.json();
      if (data.patients && data.patients.length > 0) {
        setPatients(data.patients);
        const savedId = localStorage.getItem('medlens_active_patient');
        const defaultId = savedId && data.patients.some((p: Patient) => p.id === savedId) ? savedId : data.patients[0].id;
        setSelectedPatientId(defaultId);
      }
    } catch (err) {
      console.error('Failed to load patient records', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPatient = (id: string) => {
    setSelectedPatientId(id);
    localStorage.setItem('medlens_active_patient', id);
    window.dispatchEvent(new Event('patientChanged'));
    setIsOpen(false);
  };

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  const filteredPatients = patients.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
  });

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-clinical-border dark:border-slate-800 bg-clinical-surface dark:bg-slate-900 hover:bg-clinical-muted dark:hover:bg-slate-800 transition-all text-left shadow-xs"
      >
        <div className="w-7 h-7 rounded-full bg-clinical-navy text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
          {selectedPatient ? selectedPatient.name.charAt(0).toUpperCase() : 'P'}
        </div>
        <div className="min-w-0 pr-1">
          <span className="text-2xs uppercase tracking-wider text-text-tertiary dark:text-slate-400 block font-semibold leading-none">
            Active Patient
          </span>
          <span className="text-xs font-bold text-text-primary dark:text-white truncate block leading-tight">
            {loading ? 'Loading...' : selectedPatient ? selectedPatient.name : 'No Patient Selected'}
          </span>
        </div>
        <svg className="w-3.5 h-3.5 text-text-tertiary dark:text-slate-400 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-clinical-border dark:border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden divide-y divide-clinical-border dark:divide-slate-800">
          <div className="p-3 bg-clinical-subtle/60 dark:bg-slate-800/50 flex items-center justify-between">
            <span className="text-2xs font-bold uppercase tracking-wider text-text-tertiary dark:text-slate-400">
              Select Patient Record ({patients.length})
            </span>
            <Link
              href="/patients/new"
              onClick={() => setIsOpen(false)}
              className="text-2xs font-semibold px-2 py-0.5 rounded bg-primary-600 hover:bg-primary-700 text-white transition-colors flex items-center gap-1"
            >
              + New Patient
            </Link>
          </div>

          <div className="p-2 bg-clinical-subtle/30 dark:bg-slate-900">
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-clinical-border dark:border-slate-700 rounded-lg text-xs text-text-primary dark:text-white placeholder:text-text-muted focus:outline-none focus:border-primary-400"
            />
          </div>

          <div className="max-h-64 overflow-y-auto divide-y divide-clinical-border dark:divide-slate-800">
            {filteredPatients.length === 0 ? (
              <div className="p-4 text-center text-xs text-text-tertiary dark:text-slate-400">
                No matching patient found.
              </div>
            ) : (
              filteredPatients.map((p) => {
                const isSelected = p.id === selectedPatientId;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPatient(p.id)}
                    className={`w-full p-3 text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-primary-50/70 dark:bg-primary-950/60 border-l-4 border-primary-600'
                        : 'hover:bg-clinical-subtle dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-text-primary dark:text-white">
                          {p.name}
                        </span>
                        {p.sex && (
                          <span className="text-2xs text-text-tertiary dark:text-slate-400 bg-clinical-muted dark:bg-slate-800 px-1.5 py-0.5 rounded">
                            {p.sex}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-2xs text-text-tertiary dark:text-slate-400 mt-1">
                        <span>{p.totalTests} Tests</span>
                        <span>•</span>
                        <span>{p.totalDocs} Reports</span>
                        {p.flaggedTests > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-rose-600 dark:text-rose-400 font-semibold">
                              {p.flaggedTests} Flagged
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-primary-600" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          <div className="p-2 bg-clinical-subtle/40 dark:bg-slate-900 text-center">
            <Link
              href="/patients"
              onClick={() => setIsOpen(false)}
              className="text-2xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors"
            >
              View Full Patient Directory →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
