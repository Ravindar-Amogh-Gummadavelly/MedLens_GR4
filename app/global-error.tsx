'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-center items-center p-6 text-center">
        <div className="max-w-md w-full space-y-6 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-2xl mx-auto font-bold">
            🚨
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Application Error</h1>
            <p className="text-xs text-slate-400">
              A critical boundary error was caught by MedLens Global Error Handler.
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-all"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
