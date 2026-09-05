'use client';

import { useState } from 'react';
import ThemeToggle from '@/components/theme/ThemeToggle';
import PatientSwitcher from '@/components/patient/PatientSwitcher';
import VoiceAssistant from '@/components/ai/VoiceAssistant';

export default function TopBar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-clinical-surface/90 backdrop-blur-md border-b border-clinical-border px-6 py-2.5 space-y-2">
      <div className="flex items-center justify-between">
        {/* Patient Switcher & Search */}
        <div className="flex items-center gap-4">
          <PatientSwitcher />

          <div className={`relative w-64 transition-all duration-200 ${searchFocused ? 'w-80' : ''}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search patients, labs, reports…"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-9 pr-4 py-1.5 bg-clinical-muted border border-clinical-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 relative">
          {/* Critical Lab Alert Flag */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-2xs font-bold text-rose-800 dark:text-rose-300">
            <span>🚨 2 Critical Labs Flagged</span>
          </div>

          {/* Voice Assistant Toggle */}
          <button
            onClick={() => setShowVoiceAssistant(!showVoiceAssistant)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary-50 dark:bg-primary-950/80 border border-primary-200 dark:border-primary-800 text-2xs font-bold text-primary-700 dark:text-primary-300 hover:bg-primary-100 transition-all"
          >
            🎙️ AI Assistant
          </button>

          {/* Theme Switcher (Light / Dark / System) */}
          <ThemeToggle />

          {/* User Profile Button */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2.5 px-2.5 py-1 rounded-lg border border-clinical-border hover:bg-clinical-muted transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-primary-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                SJ
              </div>
              <div className="text-left hidden md:block">
                <span className="text-xs font-semibold text-text-primary block leading-tight">Dr. Sarah Jenkins</span>
                <span className="text-2xs text-text-tertiary block leading-none">Clinician</span>
              </div>
              <svg className="w-3.5 h-3.5 text-text-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* User Profile Dropdown Card */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-clinical-border rounded-xl shadow-2xl py-3 px-4 z-50 space-y-3">
                <div className="flex items-center gap-3 border-b border-clinical-border pb-3">
                  <div className="w-10 h-10 rounded-full bg-primary-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                    SJ
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">Dr. Sarah Jenkins</h4>
                    <p className="text-2xs text-text-tertiary font-mono">admin@medlens.org</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-2xs font-semibold bg-primary-50 text-primary-700 border border-primary-200 rounded">
                      Role: CLINICIAN
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-text-secondary">
                  <div className="flex justify-between py-1 border-b border-clinical-border/50">
                    <span className="text-text-muted">Workspace:</span>
                    <span className="font-medium text-text-primary">Clinical Intelligence</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-clinical-border/50">
                    <span className="text-text-muted">Status:</span>
                    <span className="font-medium text-emerald-600">● Active Session</span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full py-2 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sign Out / Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showVoiceAssistant && (
        <div className="pt-2">
          <VoiceAssistant />
        </div>
      )}
    </header>
  );
}
