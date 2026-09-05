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
const DEFAULT_ITEMS: any[] = [];

export default function SplitTraceabilityView({
  documentName = 'Medical Document',
  rawOcrText,
  labResults,
}: SplitTraceabilityProps) {
  const items = labResults && labResults.length > 0
    ? labResults.map((r) => ({
        id: r.id,
        field: r.testName,
        value: `${r.valueText} ${r.unit || ''}`.trim(),
        status: (r.deterministicStatus || 'UNABLE_TO_DETERMINE').toLowerCase(),
        origin: (r.origin || '').toLowerCase().includes('ai') ? 'ai-extracted' : 'user-provided',
        verification: (r.verificationStatus || '').toLowerCase().replace('_', '-'),
        confidence: r.confidence || 90,
        sourceText: r.sourceText || `${r.testName}: ${r.valueText} ${r.unit || ''}`,
        sourceRegion: { page: r.sourcePage || 1, top: 200, left: 40, width: 200, height: 18 },
        referenceRange: r.rawReferenceRange || 'N/A',
        extractedAt: r.testDate || 'Recent',
        modelVersion: 'gemini-1.5-flash',
        reviewNote: '',
      }))
    : [];

  const [selectedId, setSelectedId] = useState(items[0]?.id || '');
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

      {items.length === 0 ? (
        <div className="card p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-clinical-muted flex items-center justify-center mx-auto text-primary-600 text-xl font-bold">
            🔍
          </div>
          <h3 className="text-lg font-bold text-text-primary">No Document Traceability Data</h3>
          <p className="text-sm text-text-secondary max-w-md mx-auto">
            Upload a medical report to inspect source document text highlights and structured field mappings.
          </p>
          <a
            href="/reports/upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Upload Medical Report
          </a>
        </div>
      ) : (
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
      )}
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
