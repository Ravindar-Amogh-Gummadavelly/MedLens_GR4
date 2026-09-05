'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { Shield, Key, Mail, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden transition-colors duration-200">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/10 dark:bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between relative z-10 py-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary-600 text-white font-bold flex items-center justify-center shadow-md">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">MedLens</span>
        </div>

        <ThemeToggle />
      </header>

      {/* Main Login Center Card */}
      <div className="w-full max-w-md mx-auto space-y-6 relative z-10 my-auto py-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Clinician Workspace</h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            AI-powered medical information extraction & clinical intelligence workspace
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Sign In to Your Account</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Access patient lab records, provenance, and validation tools.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-semibold rounded-xl flex items-center gap-2">
              <span className="text-base">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Clinician Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@medlens.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary-500 dark:focus:border-primary-500 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary-500 dark:focus:border-primary-500 transition-all font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-slate-900 px-3 text-2xs font-semibold uppercase text-slate-400 tracking-wider absolute">
              Quick Demo Access
            </span>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-xl border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Use Demo Clinician Credentials
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto text-center text-xs text-slate-500 dark:text-slate-400 relative z-10 py-2">
        MedLens Clinical Intelligence System • Built for Healthcare Professionals
      </footer>
    </div>
  );
}
