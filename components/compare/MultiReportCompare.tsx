'use client';

import React from 'react';

export interface ComparisonRow {
  testName: string;
  category?: string | null;
  previousValueText: string;
  previousValueNum?: number | null;
  previousDate: string;
  currentValueText: string;
  currentValueNum?: number | null;
  currentDate: string;
  unit?: string | null;
  previousStatus: string;
  currentStatus: string;
}

interface MultiReportCompareProps {
  reportA?: { name: string; date: string };
  reportB?: { name: string; date: string };
  comparisonData?: ComparisonRow[];
}

export default function MultiReportCompare({
  reportA,
  reportB,
  comparisonData = [],
}: MultiReportCompareProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Report Comparison</h1>
          <p className="text-sm text-text-secondary mt-1">
            Side-by-side delta analysis between historical and baseline lab reports.
          </p>
        </div>
        {reportA && reportB && (
          <div className="flex items-center gap-3 text-xs bg-clinical-subtle border border-clinical-border px-3 py-2 rounded-lg font-mono">
            <div>
              <span className="text-text-muted text-2xs uppercase tracking-wider block">Baseline</span>
              <span className="font-medium text-text-primary">{reportA.name} ({reportA.date})</span>
            </div>
            <span className="text-text-muted">→</span>
            <div>
              <span className="text-text-muted text-2xs uppercase tracking-wider block">Current</span>
              <span className="font-semibold text-primary-700">{reportB.name} ({reportB.date})</span>
            </div>
          </div>
        )}
      </div>

      {comparisonData.length === 0 ? (
        <div className="card p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-clinical-muted flex items-center justify-center mx-auto text-clinical-navy text-xl font-bold">
            ⚖️
          </div>
          <h3 className="text-lg font-bold text-text-primary">No Comparison Reports Available</h3>
          <p className="text-sm text-text-secondary max-w-md mx-auto">
            Upload at least two medical lab reports to compare parameter deltas side-by-side.
          </p>
          <a
            href="/reports/upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-clinical-navy text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Upload Medical Report
          </a>
        </div>
      ) : (

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-clinical-subtle text-text-tertiary text-xs font-medium uppercase tracking-wider border-b border-clinical-border">
              <th className="text-left px-5 py-3">Parameter</th>
              <th className="text-right px-5 py-3">Previous ({reportA?.date || 'N/A'})</th>
              <th className="text-right px-5 py-3">Current ({reportB?.date || 'N/A'})</th>
              <th className="text-center px-5 py-3">Absolute Delta</th>
              <th className="text-center px-5 py-3">Current Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-clinical-border">
            {comparisonData.map((row, idx) => {
              let deltaNum: number | null = null;
              if (row.previousValueNum != null && row.currentValueNum != null) {
                deltaNum = +(row.currentValueNum - row.previousValueNum).toFixed(2);
              }

              return (
                <tr key={idx} className="hover:bg-clinical-subtle transition-colors">
                  <td className="px-5 py-3">
                    <span className="font-medium text-text-primary block">{row.testName}</span>
                    <span className="text-2xs text-text-muted">{row.category}</span>
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-text-secondary">
                    {row.previousValueText} <span className="data-unit">{row.unit}</span>
                  </td>
                  <td className="px-5 py-3 text-right font-mono font-bold text-text-primary">
                    {row.currentValueText} <span className="data-unit">{row.unit}</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    {deltaNum !== null ? (
                      <span className={`inline-flex items-center gap-1 font-mono font-semibold px-2 py-0.5 rounded text-2xs ${
                        deltaNum > 0
                          ? 'bg-status-high-bg text-status-high border border-status-high-border'
                          : deltaNum < 0
                          ? 'bg-status-low-bg text-status-low border border-status-low-border'
                          : 'bg-clinical-muted text-text-tertiary'
                      }`}>
                        {deltaNum > 0 ? `+${deltaNum}` : deltaNum} {row.unit}
                      </span>
                    ) : (
                      <span className="text-text-muted text-xs">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <StatusBadge status={row.currentStatus.toLowerCase()} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      )}
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
