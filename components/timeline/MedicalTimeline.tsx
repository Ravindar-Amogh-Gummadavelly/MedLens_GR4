'use client';

import React from 'react';

export interface TimelineEventItem {
  id: string;
  eventType: string;
  title: string;
  description: string;
  eventDate: string;
  documentName?: string | null;
}

interface MedicalTimelineProps {
  events?: TimelineEventItem[];
}

const DEFAULT_EVENTS: TimelineEventItem[] = [
  {
    id: '1',
    eventType: 'LAB_REPORT_PROCESSED',
    title: 'CBC Report Uploaded & Analyzed',
    description: 'Extracted 12 parameters (Hemoglobin 11.2 g/dL - Low, Fasting Glucose 142 mg/dL - High). Initial deterministic status computed.',
    eventDate: '2025-09-01T14:23:00Z',
    documentName: 'CBC_Report_Sep2025.pdf',
  },
  {
    id: '2',
    eventType: 'VERIFICATION_ACTION',
    title: 'Thyroid Panel Human Verification',
    description: 'Dr. Mehta verified TSH (2.8 mIU/L) and Free T4 (1.2 ng/dL) extracted from report.',
    eventDate: '2025-08-28T09:45:00Z',
    documentName: 'Thyroid_Panel_Aug2025.pdf',
  },
  {
    id: '3',
    eventType: 'CONFLICT_DETECTED',
    title: 'Discrepancy Flagged in HbA1c',
    description: 'AI model extraction flagged lower confidence (78%) on HbA1c value. Sent to Review Queue.',
    eventDate: '2025-08-25T16:10:00Z',
    documentName: 'Lipid_Profile_Aug2025.pdf',
  },
  {
    id: '4',
    eventType: 'RECORD_CREATED',
    title: 'Patient Intelligence Profile Initialized',
    description: 'Patient record created for Rajesh Kumar (PAT-20250904-001).',
    eventDate: '2025-08-01T10:00:00Z',
    documentName: null,
  },
];

export default function MedicalTimeline({ events = [] }: MedicalTimelineProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Patient Timeline</h1>
        <p className="text-sm text-text-secondary mt-1">
          Chronological record of document processing, AI extraction, safety checks, and clinician verifications.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="card p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-clinical-muted flex items-center justify-center mx-auto text-primary-600 text-xl font-bold">
            📜
          </div>
          <h3 className="text-lg font-bold text-text-primary">No Event Activity Logged</h3>
          <p className="text-sm text-text-secondary max-w-md mx-auto">
            Uploaded reports, verification actions, and conflict alerts will automatically appear here chronologically.
          </p>
          <a
            href="/reports/upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Upload Medical Report
          </a>
        </div>
      ) : (
        <div className="card p-6">
          <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-clinical-border">
            {events.map((event) => {
            const isUpload = event.eventType === 'DOCUMENT_UPLOADED' || event.eventType === 'LAB_REPORT_PROCESSED';
            const isVerification = event.eventType === 'VERIFICATION_ACTION';
            const isConflict = event.eventType === 'CONFLICT_DETECTED';

            const badgeBg = isVerification
              ? 'bg-status-normal-bg text-status-normal border-status-normal-border'
              : isConflict
              ? 'bg-status-warning-bg text-status-warning border-status-warning-border'
              : isUpload
              ? 'bg-primary-50 text-primary-600 border-primary-200'
              : 'bg-clinical-muted text-text-tertiary border-clinical-border';

            return (
              <div key={event.id} className="relative group">
                <div className={`absolute -left-[35px] top-1 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${badgeBg}`}>
                  {isVerification ? '✓' : isConflict ? '!' : isUpload ? '↑' : '•'}
                </div>

                <div className="card p-4 hover:border-clinical-border-strong transition-all">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-text-primary text-sm">{event.title}</h4>
                    <span className="text-xs text-text-muted font-mono">
                      {new Date(event.eventDate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">{event.description}</p>

                  {event.documentName && (
                    <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-clinical-subtle border border-clinical-border text-2xs font-mono text-text-tertiary">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      {event.documentName}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      )}
    </div>
  );
}
