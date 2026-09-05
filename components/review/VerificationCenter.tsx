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
const DEFAULT_REVIEW_ITEMS: VerificationReviewItem[] = [];

type Filter = 'all' | 'high' | 'medium' | 'low';

export default function VerificationCenter({
  reviewItems,
  onVerify,
  onReject,
}: VerificationCenterProps) {
  const items = reviewItems || [];

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

      {items.length === 0 ? (
        <div className="card p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-clinical-muted flex items-center justify-center mx-auto text-clinical-navy text-xl">
            ✓
          </div>
          <h3 className="text-lg font-bold text-text-primary">No Pending Verification Items</h3>
          <p className="text-sm text-text-secondary max-w-md mx-auto">
            All extracted laboratory values have been reviewed or no documents are currently queued for verification.
          </p>
          <a
            href="/reports/upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-clinical-navy text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Upload Medical Document
          </a>
        </div>
      ) : (
        <>
          {/* Progress bar */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">Verification Progress</span>
              <span className="text-sm font-bold text-text-primary">{items.length ? Math.round((reviewed.size / items.length) * 100) : 100}%</span>
            </div>
            <div className="w-full h-2.5 bg-clinical-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-status-normal rounded-full transition-all duration-500 ease-out"
                style={{ width: `${items.length ? (reviewed.size / items.length) * 100 : 100}%` }}
              />
            </div>
          </div>
        </>
      )}

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
