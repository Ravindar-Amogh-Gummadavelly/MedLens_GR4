'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Router Boundary Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 text-2xl font-bold">
        ⚠️
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Clinical Workspace Error</h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          An unexpected error occurred while rendering this clinical section.
        </p>
        {error?.message && (
          <code className="inline-block text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg font-mono max-w-xl truncate">
            {error.message}
          </code>
        )}
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-clinical-navy text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-slate-800 transition-all"
        >
          🔄 Try Again
        </button>
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-white text-slate-700 border border-slate-300 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-all"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
