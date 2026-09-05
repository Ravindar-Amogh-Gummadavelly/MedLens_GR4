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

const DEFAULT_REPORT_A = { name: 'CBC_Jul2025.pdf', date: '2025-07-20' };
const DEFAULT_REPORT_B = { name: 'CBC_Report_Sep2025.pdf', date: '2025-09-01' };

const DEFAULT_DATA: ComparisonRow[] = [
  { testName: 'Hemoglobin', category: 'Hematology', previousValueText: '12.4', previousValueNum: 12.4, previousDate: '2025-07-20', currentValueText: '11.2', currentValueNum: 11.2, currentDate: '2025-09-01', unit: 'g/dL', previousStatus: 'low', currentStatus: 'low' },
  { testName: 'Fasting Glucose', category: 'Metabolic', previousValueText: '110', previousValueNum: 110, previousDate: '2025-07-20', currentValueText: '142', currentValueNum: 142, currentDate: '2025-09-01', unit: 'mg/dL', previousStatus: 'high', currentStatus: 'high' },
  { testName: 'WBC Count', category: 'Hematology', previousValueText: '6,800', previousValueNum: 6800, previousDate: '2025-07-20', currentValueText: '7,200', currentValueNum: 7200, currentDate: '2025-09-01', unit: '/µL', previousStatus: 'normal', currentStatus: 'normal' },
  { testName: 'Platelet Count', category: 'Hematology', previousValueText: '250,000', previousValueNum: 250000, previousDate: '2025-07-20', currentValueText: '245,000', currentValueNum: 245000, currentDate: '2025-09-01', unit: '/µL', previousStatus: 'normal', currentStatus: 'normal' },
  { testName: 'Serum Creatinine', category: 'Renal', previousValueText: '1.0', previousValueNum: 1.0, previousDate: '2025-07-20', currentValueText: '1.1', currentValueNum: 1.1, currentDate: '2025-09-01', unit: 'mg/dL', previousStatus: 'normal', currentStatus: 'normal' },
];

export default function MultiReportCompare({
  reportA = DEFAULT_REPORT_A,
  reportB = DEFAULT_REPORT_B,
  comparisonData = DEFAULT_DATA,
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
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-clinical-subtle text-text-tertiary text-xs font-medium uppercase tracking-wider border-b border-clinical-border">
              <th className="text-left px-5 py-3">Parameter</th>
              <th className="text-right px-5 py-3">Previous ({reportA.date})</th>
              <th className="text-right px-5 py-3">Current ({reportB.date})</th>
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
