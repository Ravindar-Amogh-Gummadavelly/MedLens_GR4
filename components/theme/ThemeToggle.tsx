'use client';

import React from 'react';
import { useTheme, ThemeMode } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const modes: Array<{ id: ThemeMode; label: string; icon: string }> = [
    { id: 'light', label: 'Light', icon: '☀️' },
    { id: 'dark', label: 'Dark', icon: '🌙' },
    { id: 'system', label: 'System', icon: '💻' },
  ];

  return (
    <div className="inline-flex items-center p-1 rounded-lg bg-clinical-muted dark:bg-slate-800 border border-clinical-border dark:border-slate-700">
      {modes.map((m) => {
        const isActive = theme === m.id;
        return (
          <button
            key={m.id}
            onClick={() => setTheme(m.id)}
            title={`Switch to ${m.label} Mode`}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
              isActive
                ? 'bg-white dark:bg-slate-900 text-primary-700 dark:text-primary-400 shadow-sm border border-clinical-border dark:border-slate-700'
                : 'text-text-tertiary dark:text-slate-400 hover:text-text-primary dark:hover:text-slate-200'
            }`}
          >
            <span className="text-xs">{m.icon}</span>
            <span className="hidden sm:inline">{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}
