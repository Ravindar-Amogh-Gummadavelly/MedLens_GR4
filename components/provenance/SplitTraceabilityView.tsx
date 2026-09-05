'use client';

import { useState } from 'react';

export interface SplitTraceabilityProps {
  documentName?: string;
  rawOcrText?: string;
  labResults?: Array<{
    id: string;
    testName: string;
    category?: string | null;
    valueText: string;
    unit?: string | null;
    rawReferenceRange?: string | null;
    deterministicStatus: string;
    origin: string;
    confidence: number;
    verificationStatus: string;
    sourcePage?: number;
    sourceText?: string | null;
    testDate?: string | null;
  }>;
}

/* ── Demo Data ─────────────────────────────────────────────────── */
const DEFAULT_ITEMS = [
  {
    id: '1',
    field: 'Hemoglobin',
    value: '11.2 g/dL',
    status: 'low',
    origin: 'ai-extracted',
    verification: 'needs-review',
    confidence: 92,
    sourceText: 'Hemoglobin: 11.2 g/dL',
    sourceRegion: { page: 1, top: 320, left: 45, width: 200, height: 18 },
    referenceRange: '13.0–17.0 g/dL',
    extractedAt: '2025-09-01 14:23:05',
    modelVersion: 'gemini-2.0-flash',
    reviewNote: '',
  },
  {
    id: '2',
    field: 'Fasting Glucose',
    value: '142 mg/dL',
    status: 'high',
    origin: 'ai-extracted',
    verification: 'needs-review',
    confidence: 97,
    sourceText: 'Glucose (Fasting): 142 mg/dL',
    sourceRegion: { page: 1, top: 352, left: 45, width: 220, height: 18 },
    referenceRange: '70–100 mg/dL',
    extractedAt: '2025-09-01 14:23:05',
    modelVersion: 'gemini-2.0-flash',
    reviewNote: '',
  },
  {
    id: '3',
    field: 'TSH',
    value: '2.8 mIU/L',
    status: 'normal',
    origin: 'ai-extracted',
    verification: 'verified',
    confidence: 99,
    sourceText: 'TSH (Thyroid Stimulating Hormone): 2.8 mIU/L',
    sourceRegion: { page: 2, top: 105, left: 40, width: 310, height: 18 },
    referenceRange: '0.4–4.0 mIU/L',
    extractedAt: '2025-08-28 09:45:12',
    modelVersion: 'gemini-2.0-flash',
    reviewNote: 'Confirmed by Dr. Mehta on 2025-08-29',
  },
  {
    id: '4',
    field: 'Creatinine',
    value: '1.1 mg/dL',
    status: 'normal',
    origin: 'ai-extracted',
    verification: 'verified',
    confidence: 95,
    sourceText: 'Serum Creatinine: 1.1 mg/dL',
    sourceRegion: { page: 2, top: 137, left: 40, width: 190, height: 18 },
    referenceRange: '0.7–1.3 mg/dL',
    extractedAt: '2025-08-28 09:45:12',
    modelVersion: 'gemini-2.0-flash',
    reviewNote: 'Confirmed by Dr. Mehta on 2025-08-29',
  },
  {
    id: '5',
    field: 'HbA1c',
    value: '7.8%',
    status: 'high',
    origin: 'ai-extracted',
    verification: 'rejected',
    confidence: 78,
    sourceText: 'HbA1c: 7.8%',
    sourceRegion: { page: 1, top: 384, left: 45, width: 120, height: 18 },
    referenceRange: '4.0–5.6%',
    extractedAt: '2025-08-25 16:10:33',
    modelVersion: 'gemini-2.0-flash',
    reviewNote: 'OCR misread decimal — confirmed value is 6.8%. Corrected manually.',
  },
];

export default function SplitTraceabilityView({
  documentName = 'CBC_Report_Sep2025.pdf',
  rawOcrText,
  labResults,
}: SplitTraceabilityProps) {
  const items = labResults && labResults.length > 0
    ? labResults.map((r) => ({
        id: r.id,
        field: r.testName,
        value: `${r.valueText} ${r.unit || ''}`.trim(),
        status: r.deterministicStatus.toLowerCase(),
        origin: r.origin.toLowerCase().includes('ai') ? 'ai-extracted' : 'user-provided',
        verification: r.verificationStatus.toLowerCase().replace('_', '-'),
        confidence: r.confidence || 90,
        sourceText: r.sourceText || `${r.testName}: ${r.valueText} ${r.unit || ''}`,
        sourceRegion: { page: r.sourcePage || 1, top: 200, left: 40, width: 200, height: 18 },
        referenceRange: r.rawReferenceRange || 'N/A',
        extractedAt: r.testDate || '2025-09-01',
        modelVersion: 'gemini-2.0-flash',
        reviewNote: '',
      }))
    : DEFAULT_ITEMS;

  const [selectedId, setSelectedId] = useState(items[0].id);
  const selected = items.find((i) => i.id === selectedId) || items[0];

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Source Traceability</h1>
        <p className="text-sm text-text-secondary mt-1">
          Viewing document <span className="font-mono text-primary-700 font-semibold">{documentName}</span> with source parameter mapping.
        </p>
      </div>

      {/* Split pane */}
      <div className="grid grid-cols-5 gap-0 card overflow-hidden" style={{ minHeight: '600px' }}>
        {/* Left panel — Item list */}
        <div className="col-span-2 border-r border-clinical-border flex flex-col">
          <div className="px-4 py-3 border-b border-clinical-border bg-clinical-subtle">
            <h2 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">Extracted Fields ({items.length})</h2>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-clinical-border">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left px-4 py-3.5 transition-colors ${
                  selectedId === item.id
                    ? 'bg-primary-50 border-l-[3px] border-l-primary-500'
                    : 'hover:bg-clinical-subtle border-l-[3px] border-l-transparent'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${selectedId === item.id ? 'text-primary-700' : 'text-text-primary'}`}>
                    {item.field}
                  </span>
                  <VerificationPill status={item.verification} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-semibold text-text-primary">{item.value}</span>
                  <StatusBadge status={item.status} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right panel — Detail view */}
        <div className="col-span-3 flex flex-col">
          <div className="px-5 py-3 border-b border-clinical-border bg-clinical-subtle flex items-center justify-between">
            <h2 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">Provenance Detail</h2>
            <span className="text-2xs text-text-muted font-mono">{selected.field}</span>
          </div>
          <div className="flex-1 p-5 space-y-5 overflow-y-auto">
            {/* Extracted value */}
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <span className="data-label">Extracted Value</span>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-2xl font-bold text-text-primary font-mono">{selected.value}</span>
                  <StatusBadge status={selected.status} />
                </div>
                <span className="text-xs text-text-muted mt-1 inline-block">
                  Reference: <span className="font-mono">{selected.referenceRange}</span>
                </span>
              </div>
              <div className="text-right">
                <span className="data-label">Confidence</span>
                <div className="mt-1.5">
                  <ConfidenceBar value={selected.confidence} />
                </div>
              </div>
            </div>

            {/* Source document location */}
            <div className="rounded-lg border border-clinical-border overflow-hidden">
              <div className="px-4 py-2.5 bg-clinical-subtle border-b border-clinical-border flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-text-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="text-xs font-medium text-text-secondary">Source Document — Page {selected.sourceRegion.page}</span>
              </div>
              <div className="p-4 bg-clinical-subtle/50">
                <div className="bg-white rounded border border-clinical-border-strong p-4 font-mono text-xs text-text-secondary space-y-2">
                  <div className="text-text-muted">Document: {documentName}</div>
                  <div className="border-t border-dashed border-clinical-border my-2" />
                  <div className="source-highlight font-semibold text-text-primary py-0.5">
                    {selected.sourceText}
                  </div>
                  {rawOcrText && (
                    <div className="mt-3 text-2xs text-text-muted border-t border-clinical-border pt-2 max-h-32 overflow-y-auto">
                      <span className="font-semibold block mb-1">Raw OCR Snippet:</span>
                      {rawOcrText.slice(0, 300)}...
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Extraction metadata */}
            <div className="grid grid-cols-2 gap-4">
              <MetadataField label="Origin" value={selected.origin === 'ai-extracted' ? '⚡ AI Extracted' : '✎ User Provided'} />
              <MetadataField label="Model" value={selected.modelVersion} mono />
              <MetadataField label="Extracted At" value={selected.extractedAt} mono />
              <MetadataField label="Verification">
                <VerificationPill status={selected.verification} />
              </MetadataField>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2 border-t border-clinical-border">
              <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-status-normal text-white text-xs font-semibold rounded-lg hover:bg-emerald-600 transition-colors">
                Verify Value
              </button>
              <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-clinical-surface border border-clinical-border-strong text-text-secondary text-xs font-semibold rounded-lg hover:bg-clinical-muted transition-colors">
                Edit
              </button>
              <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-clinical-surface border border-rejected-border text-rejected-text text-xs font-semibold rounded-lg hover:bg-rejected-bg transition-colors">
                Reject
              </button>
            </div>
          </div>
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

function VerificationPill({ status }: { status: string }) {
  if (status === 'verified') return <span className="verification-verified">✓ Verified</span>;
  if (status === 'rejected') return <span className="verification-rejected">✕ Rejected</span>;
  return <span className="verification-needs-review">⏳ Needs Review</span>;
}

function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 90 ? 'bg-status-normal' : value >= 70 ? 'bg-status-warning' : 'bg-status-high';
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-2 bg-clinical-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-sm font-semibold text-text-primary font-mono">{value}%</span>
    </div>
  );
}

function MetadataField({ label, value, mono, children }: { label: string; value?: string; mono?: boolean; children?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-clinical-border p-3 bg-clinical-subtle/50">
      <span className="data-label">{label}</span>
      <div className={`mt-1 text-sm font-medium text-text-primary ${mono ? 'font-mono' : ''}`}>
        {children || value}
      </div>
    </div>
  );
}
