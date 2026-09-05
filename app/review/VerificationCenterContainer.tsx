'use client';

import React from 'react';
import VerificationCenter, { VerificationReviewItem } from '@/components/review/VerificationCenter';

interface ContainerProps {
  initialItems: VerificationReviewItem[];
}

export default function VerificationCenterContainer({ initialItems }: ContainerProps) {
  const handleVerify = async (id: string, correctedValue?: string, reason?: string) => {
    try {
      await fetch('/api/lab-results/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          labResultId: id,
          action: correctedValue ? 'EDITED' : 'VERIFIED',
          correctedValue: correctedValue || undefined,
          reason: reason || 'Human verification approved',
        }),
      });
    } catch (err) {
      console.error('Verification failed:', err);
    }
  };

  const handleReject = async (id: string, reason?: string) => {
    try {
      await fetch('/api/lab-results/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          labResultId: id,
          action: 'REJECTED',
          reason: reason || 'Inaccurate extraction rejected',
        }),
      });
    } catch (err) {
      console.error('Rejection failed:', err);
    }
  };

  return (
    <VerificationCenter
      reviewItems={initialItems}
      onVerify={handleVerify}
      onReject={handleReject}
    />
  );
}
