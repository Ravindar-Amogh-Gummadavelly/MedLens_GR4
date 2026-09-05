'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface LabResultRow {
  id: string;
  testName: string;
  category?: string | null;
  valueText: string;
  unit?: string | null;
  rawReferenceRange?: string | null;
  deterministicStatus: 'LOW' | 'NORMAL' | 'HIGH' | 'UNABLE_TO_DETERMINE';
  origin: string;
  confidence: number;
  verificationStatus: string;
  documentId: string;
  documentName: string;
  testDate?: string | null;
}

interface SearchContainerProps {
  labResults: LabResultRow[];
}

export default function LabResultsSearchContainer({ labResults }: SearchContainerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [verificationFilter, setVerificationFilter] = useState<string>('ALL');

  const filteredResults = labResults.filter((r) => {
    const matchesSearch =
      r.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.category && r.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      r.documentName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || r.deterministicStatus === statusFilter;
    const matchesVerification = verificationFilter === 'ALL' || r.verificationStatus === verificationFilter;

    return matchesSearch && matchesStatus && matchesVerification;
  });

  return (
    <div className="card overflow-hidden space-y-4 p-5">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-clinical-subtle p-4 rounded-xl border border-clinical-border">
        <div className="relative flex-1 w-full">
          <svg className="w-4 h-4 text-text-muted absolute left-3 top-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search test name, category, or report name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-clinical-surface border border-clinical-border text-text-primary text-xs pl-9 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-primary-400"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto text-xs">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-clinical-surface border border-clinical-border text-text-primary text-xs px-3 py-2 rounded-lg focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="LOW">LOW</option>
            <option value="NORMAL">NORMAL</option>
            <option value="HIGH">HIGH</option>
            <option value="UNABLE_TO_DETERMINE">NO BOUNDS</option>
          </select>

          <select
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            className="bg-clinical-surface border border-clinical-border text-text-primary text-xs px-3 py-2 rounded-lg focus:outline-none"
          >
            <option value="ALL">All Verification</option>
            <option value="NEEDS_REVIEW">Needs Review</option>
            <option value="VERIFIED">Verified</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-clinical-subtle border-b border-clinical-border text-text-tertiary font-medium uppercase tracking-wider">
              <th className="p-3">Test Name</th>
              <th className="p-3 text-right">Value</th>
              <th className="p-3">Reference Range</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3">Provenance</th>
              <th className="p-3 text-center">Verification</th>
              <th className="p-3 text-right">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-clinical-border">
            {filteredResults.map((r) => (
              <tr key={r.id} className="hover:bg-clinical-subtle transition-colors">
                <td className="p-3 font-medium text-text-primary">
                  {r.testName}
                  <span className="block text-2xs text-text-muted">{r.category}</span>
                </td>
                <td className="p-3 text-right font-mono font-bold text-text-primary">
                  {r.valueText} <span className="data-unit">{r.unit}</span>
                </td>
                <td className="p-3 font-mono text-text-tertiary">
                  {r.rawReferenceRange || 'None'}
                </td>
                <td className="p-3 text-center">
                  <StatusBadge status={r.deterministicStatus.toLowerCase()} />
                </td>
                <td className="p-3 font-mono text-2xs text-text-muted">
                  {r.origin} ({r.confidence}%)
                </td>
                <td className="p-3 text-center">
                  <VerificationPill status={r.verificationStatus.toLowerCase().replace('_', '-')} />
                </td>
                <td className="p-3 text-right">
                  <Link
                    href={`/reports/${r.documentId}`}
                    className="text-primary-600 hover:text-primary-700 font-mono text-2xs inline-flex items-center gap-1"
                  >
                    Source Document →
                  </Link>
                </td>
              </tr>
            ))}
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
