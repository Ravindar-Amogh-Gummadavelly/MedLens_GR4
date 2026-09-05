'use client';

import { useState } from 'react';

/* ── Demo Data ─────────────────────────────────────────────────── */
const LAB_DATA = [
  { id: 1, test: 'Hemoglobin', value: '11.2', unit: 'g/dL', range: '13.0–17.0', status: 'low', category: 'Hematology', source: 'ai-extracted', verification: 'needs-review', date: '2025-09-01', report: 'CBC_Report_Sep2025.pdf' },
  { id: 2, test: 'RBC Count', value: '4.2', unit: 'M/µL', range: '4.5–5.5', status: 'low', category: 'Hematology', source: 'ai-extracted', verification: 'needs-review', date: '2025-09-01', report: 'CBC_Report_Sep2025.pdf' },
  { id: 3, test: 'WBC Count', value: '7,200', unit: '/µL', range: '4,000–11,000', status: 'normal', category: 'Hematology', source: 'ai-extracted', verification: 'verified', date: '2025-09-01', report: 'CBC_Report_Sep2025.pdf' },
  { id: 4, test: 'Platelet Count', value: '245,000', unit: '/µL', range: '150K–400K', status: 'normal', category: 'Hematology', source: 'ai-extracted', verification: 'verified', date: '2025-09-01', report: 'CBC_Report_Sep2025.pdf' },
  { id: 5, test: 'Fasting Glucose', value: '142', unit: 'mg/dL', range: '70–100', status: 'high', category: 'Metabolic', source: 'ai-extracted', verification: 'needs-review', date: '2025-09-01', report: 'CBC_Report_Sep2025.pdf' },
  { id: 6, test: 'HbA1c', value: '7.8', unit: '%', range: '4.0–5.6', status: 'high', category: 'Metabolic', source: 'ai-extracted', verification: 'rejected', date: '2025-08-25', report: 'Lipid_Profile_Aug2025.pdf' },
  { id: 7, test: 'TSH', value: '2.8', unit: 'mIU/L', range: '0.4–4.0', status: 'normal', category: 'Thyroid', source: 'ai-extracted', verification: 'verified', date: '2025-08-28', report: 'Thyroid_Panel_Aug2025.pdf' },
  { id: 8, test: 'Free T4', value: '1.2', unit: 'ng/dL', range: '0.8–1.8', status: 'normal', category: 'Thyroid', source: 'ai-extracted', verification: 'verified', date: '2025-08-28', report: 'Thyroid_Panel_Aug2025.pdf' },
  { id: 9, test: 'Creatinine', value: '1.1', unit: 'mg/dL', range: '0.7–1.3', status: 'normal', category: 'Renal', source: 'ai-extracted', verification: 'verified', date: '2025-08-28', report: 'Thyroid_Panel_Aug2025.pdf' },
  { id: 10, test: 'Total Cholesterol', value: '210', unit: 'mg/dL', range: '<200', status: 'high', category: 'Lipid', source: 'ai-extracted', verification: 'needs-review', date: '2025-08-25', report: 'Lipid_Profile_Aug2025.pdf' },
  { id: 11, test: 'LDL Cholesterol', value: '135', unit: 'mg/dL', range: '<100', status: 'high', category: 'Lipid', source: 'ai-extracted', verification: 'needs-review', date: '2025-08-25', report: 'Lipid_Profile_Aug2025.pdf' },
  { id: 12, test: 'HDL Cholesterol', value: '42', unit: 'mg/dL', range: '>40', status: 'normal', category: 'Lipid', source: 'ai-extracted', verification: 'verified', date: '2025-08-25', report: 'Lipid_Profile_Aug2025.pdf' },
];

type StatusFilter = 'all' | 'low' | 'normal' | 'high';
type VerificationFilter = 'all' | 'needs-review' | 'verified' | 'rejected';

/* ── Component ─────────────────────────────────────────────────── */
export default function LabResultsSearch() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [verificationFilter, setVerificationFilter] = useState<VerificationFilter>('all');
  const [search, setSearch] = useState('');

  const filtered = LAB_DATA.filter((r) => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (verificationFilter !== 'all' && r.verification !== verificationFilter) return false;
    if (search && !r.test.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    flagged: LAB_DATA.filter(r => r.status !== 'normal').length,
    needsReview: LAB_DATA.filter(r => r.verification === 'needs-review').length,
    verified: LAB_DATA.filter(r => r.verification === 'verified').length,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Lab Results Inventory</h1>
          <p className="text-sm text-text-secondary mt-1">
            All extracted lab values across reports. Filter by status, verification state, or search by test name.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-text-muted">{LAB_DATA.length} total</span>
          <span className="text-status-high font-semibold">{counts.flagged} flagged</span>
          <span className="text-status-warning font-semibold">{counts.needsReview} needs review</span>
          <span className="text-status-normal font-semibold">{counts.verified} verified</span>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search tests…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-clinical-muted border border-clinical-border rounded-lg text-sm focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1 bg-clinical-muted p-1 rounded-lg">
            {(['all', 'low', 'normal', 'high'] as StatusFilter[]).map((f) => (
              <button key={f} onClick={() => setStatusFilter(f)}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors capitalize ${
                  statusFilter === f ? 'bg-clinical-surface text-text-primary shadow-sm' : 'text-text-tertiary hover:text-text-secondary'
                }`}
              >
                {f === 'all' ? 'All Status' : f}
              </button>
            ))}
          </div>

          {/* Verification filter */}
          <div className="flex items-center gap-1 bg-clinical-muted p-1 rounded-lg">
            {(['all', 'needs-review', 'verified', 'rejected'] as VerificationFilter[]).map((f) => (
              <button key={f} onClick={() => setVerificationFilter(f)}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors capitalize ${
                  verificationFilter === f ? 'bg-clinical-surface text-text-primary shadow-sm' : 'text-text-tertiary hover:text-text-secondary'
                }`}
              >
                {f === 'all' ? 'All Verification' : f.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results table */}
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-clinical-subtle text-text-tertiary text-xs font-medium uppercase tracking-wider border-b border-clinical-border">
              <th className="text-left px-5 py-3">Test Name</th>
              <th className="text-left px-5 py-3">Category</th>
              <th className="text-right px-5 py-3">Value</th>
              <th className="text-left px-5 py-3">Ref. Range</th>
              <th className="text-center px-5 py-3">Status</th>
              <th className="text-center px-5 py-3">Verification</th>
              <th className="text-left px-5 py-3">Report</th>
              <th className="text-right px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-clinical-border">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-clinical-subtle transition-colors">
                <td className="px-5 py-3 font-medium text-text-primary">{r.test}</td>
                <td className="px-5 py-3">
                  <span className="text-xs text-text-muted bg-clinical-muted px-2 py-0.5 rounded-md">{r.category}</span>
                </td>
                <td className="px-5 py-3 text-right font-mono font-semibold text-text-primary">
                  {r.value}<span className="data-unit">{r.unit}</span>
                </td>
                <td className="px-5 py-3 text-text-tertiary font-mono text-xs">{r.range}</td>
                <td className="px-5 py-3 text-center"><StatusBadge status={r.status} /></td>
                <td className="px-5 py-3 text-center"><VerificationPill status={r.verification} /></td>
                <td className="px-5 py-3 text-xs text-text-muted truncate max-w-[140px]">{r.report}</td>
                <td className="px-5 py-3 text-right text-text-muted text-xs">{r.date}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center text-text-muted text-sm">
                  No results match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { class: string; label: string }> = {
    low: { class: 'status-badge-low', label: '↓ Low' },
    normal: { class: 'status-badge-normal', label: '✓ Normal' },
    high: { class: 'status-badge-high', label: '↑ High' },
  };
  const s = map[status] || { class: 'status-badge-unknown', label: '?' };
  return <span className={s.class}>{s.label}</span>;
}

function VerificationPill({ status }: { status: string }) {
  if (status === 'verified') return <span className="verification-verified">✓ Verified</span>;
  if (status === 'rejected') return <span className="verification-rejected">✕ Rejected</span>;
  return <span className="verification-needs-review">⏳ Review</span>;
}
