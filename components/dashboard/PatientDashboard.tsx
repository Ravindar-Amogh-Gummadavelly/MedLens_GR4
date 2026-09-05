'use client';

import Link from 'next/link';

interface PatientDashboardProps {
  patient?: {
    id: string;
    name: string;
    dob?: string | null;
    sex?: string | null;
    allergies?: string | null;
    medications?: string | null;
  };
  labResults?: Array<{
    id: string;
    testName: string;
    category?: string | null;
    valueText: string;
    unit?: string | null;
    rawReferenceRange?: string | null;
    deterministicStatus: string;
    verificationStatus: string;
    testDate?: string | null;
  }>;
  recentDocuments?: Array<{
    id: string;
    originalName: string;
    status: string;
    uploadedAt: string;
  }>;
  conflicts?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  summary?: {
    summaryText: string;
    keyTakeaways?: string[];
    safeNotes?: string | null;
  } | null;
}

const DEFAULT_PATIENT = { name: 'Rajesh Kumar', id: 'PAT-20250904-001', age: 45, sex: 'Male' };

const SUMMARY_CARDS = [
  { label: 'Total Tests', value: '24', delta: '+3 this week', accent: 'primary' },
  { label: 'Flagged Results', value: '5', delta: '2 critical', accent: 'high' },
  { label: 'Needs Review', value: '8', delta: '3 pending >24h', accent: 'warning' },
  { label: 'Verified', value: '16', delta: '67% verified', accent: 'normal' },
];

const DEFAULT_RESULTS = [
  { test: 'Hemoglobin', value: '11.2', unit: 'g/dL', range: '13.0–17.0', status: 'low', source: 'AI Extracted', date: '2025-09-01' },
  { test: 'Fasting Glucose', value: '142', unit: 'mg/dL', range: '70–100', status: 'high', source: 'AI Extracted', date: '2025-09-01' },
  { test: 'TSH', value: '2.8', unit: 'mIU/L', range: '0.4–4.0', status: 'normal', source: 'Human Verified', date: '2025-08-28' },
  { test: 'Creatinine', value: '1.1', unit: 'mg/dL', range: '0.7–1.3', status: 'normal', source: 'Human Verified', date: '2025-08-28' },
  { test: 'HbA1c', value: '7.8', unit: '%', range: '4.0–5.6', status: 'high', source: 'AI Extracted', date: '2025-08-25' },
  { test: 'Total Cholesterol', value: '210', unit: 'mg/dL', range: '<200', status: 'high', source: 'AI Extracted', date: '2025-08-25' },
];

const DEFAULT_UPLOADS = [
  { name: 'CBC_Report_Sep2025.pdf', status: 'Processed', tests: 12, date: '2025-09-01' },
  { name: 'Thyroid_Panel_Aug2025.pdf', status: 'Processed', tests: 5, date: '2025-08-28' },
  { name: 'Lipid_Profile_Aug2025.pdf', status: 'Needs Review', tests: 7, date: '2025-08-25' },
];

export default function PatientDashboard({
  patient,
  labResults,
  recentDocuments,
  summary,
}: PatientDashboardProps) {
  const pName = patient?.name || DEFAULT_PATIENT.name;
  const pId = patient?.id ? `PAT-${patient.id.slice(0, 8)}` : DEFAULT_PATIENT.id;

  const displayResults = labResults && labResults.length > 0
    ? labResults.map((r) => ({
        test: r.testName,
        value: r.valueText,
        unit: r.unit || '',
        range: r.rawReferenceRange || 'N/A',
        status: r.deterministicStatus.toLowerCase(),
        source: r.verificationStatus === 'VERIFIED' ? 'Human Verified' : 'AI Extracted',
        date: r.testDate ? new Date(r.testDate).toLocaleDateString() : 'Recent',
      }))
    : DEFAULT_RESULTS;

  const displayUploads = recentDocuments && recentDocuments.length > 0
    ? recentDocuments.map((d) => ({
        name: d.originalName,
        status: d.status,
        tests: 8,
        date: new Date(d.uploadedAt).toLocaleDateString(),
      }))
    : DEFAULT_UPLOADS;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary dark:text-white tracking-tight">Patient Dashboard</h1>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-sm text-text-secondary font-medium">{pName}</span>
            <span className="text-xs text-text-muted bg-clinical-muted px-2 py-0.5 rounded-md font-mono">{pId}</span>
            <span className="text-xs text-text-tertiary dark:text-slate-400">{patient?.dob || 'N/A'} / {patient?.sex || 'N/A'}</span>
          </div>
        </div>
        <Link
          href="/reports/upload"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Upload Report
        </Link>
      </div>

      {/* Patient Overview + Attention Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Patient Profile Card (3 cols) */}
        <div className="col-span-12 lg:col-span-4 bg-primary-600 dark:bg-primary-950/90 border border-primary-500/30 rounded-2xl p-5 text-white space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 text-white font-bold text-lg flex items-center justify-center backdrop-blur-md">
              {pName.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">{pName}</h2>
              <p className="text-2xs text-primary-200 font-mono">MR-{pId}</p>
              <div className="flex items-center gap-2 text-2xs text-primary-100 mt-0.5">
                <span>DOB: {patient?.dob || 'N/A'}</span>
                <span>•</span>
                <span>{patient?.sex || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-0.5 rounded text-2xs font-semibold bg-white/10 text-white border border-white/20">Hypertension</span>
            <span className="px-2 py-0.5 rounded text-2xs font-semibold bg-rose-500/20 text-rose-200 border border-rose-400/30">Penicillin Allergy</span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
            <div className="bg-black/20 p-2 rounded-xl">
              <span className="text-2xs text-primary-200 block">Reports</span>
              <span className="text-base font-bold">8</span>
            </div>
            <div className="bg-black/20 p-2 rounded-xl">
              <span className="text-2xs text-primary-200 block">Lab Results</span>
              <span className="text-base font-bold">42</span>
            </div>
            <div className="bg-rose-500/30 border border-rose-400/30 p-2 rounded-xl">
              <span className="text-2xs text-rose-200 block">To Review</span>
              <span className="text-base font-bold text-rose-200">3</span>
            </div>
          </div>
        </div>

        {/* What Needs Your Attention Cards (8 cols) */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-3 gap-4">
          <div className="card p-4 border-l-4 border-l-amber-500 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500">
              <span>⚠️ Low Confidence</span>
            </div>
            <div className="text-3xl font-extrabold text-text-primary dark:text-white my-2">2</div>
            <span className="text-2xs text-text-tertiary dark:text-slate-400">Items needing review</span>
          </div>

          <div className="card p-4 border-l-4 border-l-rose-500 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-500">
              <span>⚠️ Conflicts Detected</span>
            </div>
            <div className="text-3xl font-extrabold text-text-primary dark:text-white my-2">1</div>
            <span className="text-2xs text-text-tertiary dark:text-slate-400">Needs clinician review</span>
          </div>

          <div className="card p-4 border-l-4 border-l-blue-500 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-500">
              <span>⚠️ Unverified Results</span>
            </div>
            <div className="text-3xl font-extrabold text-text-primary dark:text-white my-2">3</div>
            <span className="text-2xs text-text-tertiary dark:text-slate-400">Pending human verification</span>
          </div>
        </div>
      </div>

      {/* Factual Summary Card if available */}
      {summary && (
        <div className="card p-5 space-y-2">
          <h2 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">Clinical Factual Summary</h2>
          <p className="text-sm text-text-secondary leading-relaxed">{summary.summaryText}</p>
        </div>
      )}

      {/* Two-column layout: Recent Results + Uploads */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Lab Results — 2/3 */}
        <div className="col-span-2 card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-clinical-border">
            <h2 className="text-sm font-semibold text-text-primary">Recent Lab Results</h2>
            <Link href="/lab-results" className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 text-text-tertiary dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                  <th className="text-left px-5 py-2.5">Test</th>
                  <th className="text-right px-5 py-2.5">Value</th>
                  <th className="text-left px-5 py-2.5">Ref. Range</th>
                  <th className="text-center px-5 py-2.5">Status</th>
                  <th className="text-left px-5 py-2.5">Source</th>
                  <th className="text-right px-5 py-2.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-clinical-border">
                {displayResults.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3 font-medium text-text-primary">{r.test}</td>
                    <td className="px-5 py-3 text-right font-mono font-semibold text-text-primary">
                      {r.value}
                      <span className="data-unit">{r.unit}</span>
                    </td>
                    <td className="px-5 py-3 text-text-tertiary font-mono text-xs">{r.range}</td>
                    <td className="px-5 py-3 text-center">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-5 py-3">
                      <SourceBadge source={r.source} />
                    </td>
                    <td className="px-5 py-3 text-right text-text-muted text-xs">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Uploads — 1/3 */}
        <div className="col-span-1 card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-clinical-border">
            <h2 className="text-sm font-semibold text-text-primary">Recent Uploads</h2>
            <Link href="/reports/upload" className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors">
              Upload →
            </Link>
          </div>
          <div className="divide-y divide-clinical-border">
            {displayUploads.map((u, i) => (
              <div key={i} className="px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm font-medium text-text-primary truncate max-w-[180px]">{u.name}</span>
                  <span className={`text-2xs font-semibold px-1.5 py-0.5 rounded ${
                    u.status === 'Processed' || u.status === 'PROCESSED'
                      ? 'bg-verified-bg text-verified-text' 
                      : 'bg-review-bg text-review-text'
                  }`}>
                    {u.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <span>{u.tests} tests extracted</span>
                  <span>·</span>
                  <span>{u.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Disclosure */}
      <div className="flex items-start gap-3 px-4 py-3 bg-primary-50 dark:bg-primary-950/80 border border-primary-200 dark:border-primary-800 rounded-xl text-sm">
        <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
        <div>
          <p className="font-medium text-primary-800 dark:text-primary-300">Safety Notice</p>
          <p className="text-primary-700 dark:text-primary-400 mt-0.5 text-xs leading-relaxed">
            Lab statuses are computed using deterministic reference range logic. AI extracts data from documents — 
            it does <strong>not</strong> determine clinical significance. All AI-extracted values must be verified by a qualified professional.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { class: string; label: string }> = {
    low: { class: 'status-badge-low', label: '↓ Low' },
    normal: { class: 'status-badge-normal', label: '✓ Normal' },
    high: { class: 'status-badge-high', label: '↑ High' },
    unknown: { class: 'status-badge-unknown', label: '? Unknown' },
  };
  const s = map[status] || map.unknown;
  return <span className={s.class}>{s.label}</span>;
}

function SourceBadge({ source }: { source: string }) {
  if (source === 'Human Verified') {
    return <span className="origin-human-verified">✓ Verified</span>;
  }
  return <span className="origin-ai-extracted">⚡ AI Extracted</span>;
}
