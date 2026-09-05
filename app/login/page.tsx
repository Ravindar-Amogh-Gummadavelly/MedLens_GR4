'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('admin@medlens.org');
    setPassword('password123');
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@medlens.org', password: 'password123' }),
      });

      if (!res.ok) throw new Error('Demo login failed');

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl text-primary-400 text-2xl font-bold">
            🛡️
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">MedLens</h1>
          <p className="text-sm text-slate-400 font-medium max-w-xs mx-auto">
            AI-Powered Clinical Information Intelligence Workspace
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-slate-100">Clinician Sign In</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Access patient records, document provenance, and human-in-the-loop validation tools.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold rounded-xl flex items-center gap-2">
              <span className="text-base">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Clinician Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@medlens.org"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-primary-600/25 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Sign In to Workspace →'
              )}
            </button>
          </form>

          <div className="relative flex items-center justify-center my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <span className="relative px-3 bg-slate-900 text-2xs font-semibold text-slate-500 uppercase tracking-wider">
              Quick Test Access
            </span>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 hover:text-white"
          >
            <span>⚡ Quick Clinician Login (admin@medlens.org)</span>
          </button>
        </div>

        {/* Safety Footer */}
        <div className="text-center space-y-1">
          <p className="text-2xs text-slate-500">
            MedLens is a Clinical Information Workspace designed for healthcare professionals.
          </p>
          <p className="text-2xs text-slate-600 font-mono">
            AI extracts. Software validates. Humans verify. MedLens organizes.
          </p>
        </div>
      </div>
    </div>
  );
}
