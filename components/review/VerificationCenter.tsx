'use client';

import { useState } from 'react';

export interface VerificationReviewItem {
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
  sourceText?: string | null;
  documentName: string;
  testDate?: string | null;
}

interface VerificationCenterProps {
  reviewItems?: VerificationReviewItem[];
  onVerify?: (id: string, correctedValue?: string, reason?: string) => Promise<void> | void;
  onReject?: (id: string, reason?: string) => Promise<void> | void;
}

/* ── Demo Data ─────────────────────────────────────────────────── */
const DEFAULT_REVIEW_ITEMS: VerificationReviewItem[] = [
  {
    id: '1',
    testName: 'Hemoglobin',
    category: 'Hematology',
    valueText: '11.2',
    unit: 'g/dL',
    rawReferenceRange: '13.0–17.0 g/dL',
    deterministicStatus: 'LOW',
    origin: 'AI Extracted',
    confidence: 92,
    verificationStatus: 'NEEDS_REVIEW',
    sourceText: 'Hemoglobin: 11.2 g/dL',
    documentName: 'CBC_Report_Sep2025.pdf',
    testDate: '2025-09-01',
  },
  {
    id: '2',
    testName: 'Fasting Glucose',
    category: 'Metabolic',
    valueText: '142',
    unit: 'mg/dL',
    rawReferenceRange: '70–100 mg/dL',
    deterministicStatus: 'HIGH',
    origin: 'AI Extracted',
    confidence: 97,
    verificationStatus: 'NEEDS_REVIEW',
    sourceText: 'Glucose (Fasting): 142 mg/dL',
    documentName: 'CBC_Report_Sep2025.pdf',
    testDate: '2025-09-01',
  },
  {
    id: '3',
    testName: 'Platelet Count',
    category: 'Hematology',
    valueText: '245,000',
    unit: '/µL',
    rawReferenceRange: '150,000–400,000 /µL',
    deterministicStatus: 'NORMAL',
    origin: 'AI Extracted',
    confidence: 88,
    verificationStatus: 'NEEDS_REVIEW',
    sourceText: 'Platelets: 245,000 /µL',
    documentName: 'CBC_Report_Sep2025.pdf',
    testDate: '2025-09-01',
  },
  {
    id: '4',
    testName: 'Total Cholesterol',
    category: 'Lipid',
    valueText: '210',
    unit: 'mg/dL',
    rawReferenceRange: '<200 mg/dL',
    deterministicStatus: 'HIGH',
    origin: 'AI Extracted',
    confidence: 95,
    verificationStatus: 'NEEDS_REVIEW',
    sourceText: 'Total Cholesterol: 210 mg/dL',
    documentName: 'Lipid_Profile_Aug2025.pdf',
    testDate: '2025-08-25',
  },
  {
    id: '5',
    testName: 'LDL Cholesterol',
    category: 'Lipid',
    valueText: '135',
    unit: 'mg/dL',
    rawReferenceRange: '<100 mg/dL',
    deterministicStatus: 'HIGH',
    origin: 'AI Extracted',
    confidence: 72,
    verificationStatus: 'NEEDS_REVIEW',
    sourceText: 'LDL-C: 135 mg/dL',
    documentName: 'Lipid_Profile_Aug2025.pdf',
    testDate: '2025-08-25',
  },
];

type Filter = 'all' | 'high' | 'medium' | 'low';

export default function VerificationCenter({
  reviewItems,
  onVerify,
  onReject,
}: VerificationCenterProps) {
  const items = reviewItems && reviewItems.length > 0 ? reviewItems : DEFAULT_REVIEW_ITEMS;

  const [filter, setFilter] = useState<Filter>('all');
  const [reviewed, setReviewed] = useState<Set<string>>(new Set());

  const pendingCount = items.length - reviewed.size;

  const markVerified = async (id: string) => {
    setReviewed((prev) => new Set(prev).add(id));
    if (onVerify) await onVerify(id);
  };

  const markRejected = async (id: string) => {
    setReviewed((prev) => new Set(prev).add(id));
    if (onReject) await onReject(id);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Human Review Center</h1>
          <p className="text-sm text-text-secondary mt-1">
            AI-extracted values awaiting human verification. Review, correct, or reject each field.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-text-secondary">
            <span className="text-xl font-bold text-text-primary">{pendingCount}</span> pending
          </span>
          <span className="text-sm font-medium text-status-normal">
            <span className="text-xl font-bold">{reviewed.size}</span> verified
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">Verification Progress</span>
          <span className="text-sm font-bold text-text-primary">{Math.round((reviewed.size / items.length) * 100)}%</span>
        </div>
        <div className="w-full h-2.5 bg-clinical-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-status-normal rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(reviewed.size / items.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Review cards */}
      <div className="space-y-3">
        {items.map((item) => {
          const isReviewed = reviewed.has(item.id);
          return (
            <div
              key={item.id}
              className={`card transition-all duration-200 ${isReviewed ? 'opacity-60' : ''}`}
            >
              <div className="flex items-stretch">
                <div className={`w-1 rounded-l-xl flex-shrink-0 ${
                  item.deterministicStatus === 'HIGH' || item.deterministicStatus === 'LOW' ? 'bg-status-high' : 'bg-status-normal'
                }`} />

                <div className="flex-1 px-5 py-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-text-primary">{item.testName}</span>
                        <StatusBadge status={item.deterministicStatus.toLowerCase()} />
                        {isReviewed && <span className="verification-verified">✓ Verified</span>}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-lg font-bold font-mono text-text-primary">{item.valueText} {item.unit || ''}</span>
                        <span className="text-xs text-text-muted font-mono">ref: {item.rawReferenceRange || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right space-y-1">
                        <div className="text-xs text-text-muted">{item.documentName}</div>
                        <div className="text-2xs text-text-muted font-mono">{item.testDate || 'Recent'}</div>
                      </div>

                      <div className="flex flex-col items-center gap-0.5 min-w-[60px]">
                        <span className={`text-sm font-bold font-mono ${
                          item.confidence >= 90 ? 'text-status-normal' :
                          item.confidence >= 70 ? 'text-status-warning' :
                          'text-status-high'
                        }`}>{item.confidence}%</span>
                        <span className="text-2xs text-text-muted">confidence</span>
                      </div>

                      {!isReviewed && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => markVerified(item.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-status-normal text-white text-xs font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
                          >
                            Verify
                          </button>
                          <button
                            onClick={() => markRejected(item.id)}
                            className="p-1.5 text-text-muted hover:text-status-high rounded-lg hover:bg-rejected-bg transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {item.sourceText && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-2xs font-semibold text-text-muted uppercase tracking-wider">Source:</span>
                      <code className="text-xs text-text-secondary bg-clinical-muted px-2 py-0.5 rounded font-mono">
                        {item.sourceText}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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
