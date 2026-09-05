'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setError('');
    setStatusMessage('Uploading medical report to secure Google Cloud Storage...');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setStatusMessage('OCR & Gemini structured extraction complete! Redirecting to review...');
      setTimeout(() => {
        router.push(`/reports/${data.documentId}`);
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Upload processing error');
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Upload Medical Report</h1>
        <p className="text-sm text-text-secondary mt-1">
          Upload PDF, PNG, or JPG laboratory reports. MedLens extracts structured parameters, maps source provenance, and computes safety bounds.
        </p>
      </div>

      <form onSubmit={handleUpload} className="space-y-6">
        <div className="border-2 border-dashed border-clinical-border bg-clinical-surface hover:border-primary-400 hover:bg-primary-50/30 rounded-xl p-10 text-center transition-all">
          <input
            type="file"
            id="file-upload"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="file-upload" className="cursor-pointer block space-y-3">
            <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary-600 border border-primary-200 mx-auto flex items-center justify-center">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>

            <div>
              <span className="font-semibold text-text-primary text-sm block">
                {file ? file.name : 'Click to browse or drag & drop medical report file here'}
              </span>
              <span className="text-xs text-text-muted block mt-1">
                Supported formats: PDF, PNG, JPG (Max size 15MB)
              </span>
            </div>
          </label>
        </div>

        {error && (
          <div className="bg-rejected-bg border border-rejected-border text-rejected-text p-4 rounded-xl text-xs flex items-center gap-2">
            <svg className="w-4 h-4 text-status-high flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {isUploading && (
          <div className="bg-primary-50 border border-primary-200 text-primary-800 p-4 rounded-xl text-xs flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!file || isUploading}
          className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl shadow-sm transition-all text-sm"
        >
          {isUploading ? 'Processing Document...' : 'Start Extraction & Verification Pipeline'}
        </button>
      </form>
    </div>
  );
}
