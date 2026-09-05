import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-primary-400 text-2xl font-bold">
        🔍
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">404 — Page Not Found</h1>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          The requested medical workspace page or document route could not be found.
        </p>
      </div>
      <Link
        href="/dashboard"
        className="px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-primary-600/25"
      >
        Return to Clinical Dashboard →
      </Link>
    </div>
  );
}
