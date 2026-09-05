/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#0f172a',
        },
        clinical: {
          bg: '#0b0f19',
          surface: '#111827',
          border: '#1f2937',
          'border-strong': '#374151',
          muted: '#1e293b',
          subtle: '#172033',
        },
        text: {
          primary: '#111827',
          secondary: '#4b5563',
          tertiary: '#6b7280',
          muted: '#9ca3af',
        },
        status: {
          low: '#3b82f6',
          'low-bg': '#eff6ff',
          'low-border': '#bfdbfe',
          normal: '#10b981',
          'normal-bg': '#ecfdf5',
          'normal-border': '#a7f3d0',
          high: '#ef4444',
          'high-bg': '#fef2f2',
          'high-border': '#fecaca',
          warning: '#f59e0b',
          'warning-bg': '#fffbeb',
          'warning-border': '#fde68a',
          unknown: '#6b7280',
          'unknown-bg': '#f9fafb',
          'unknown-border': '#e5e7eb',
        },
        verified: {
          bg: '#ecfdf5',
          text: '#059669',
          border: '#a7f3d0',
        },
        review: {
          bg: '#fffbeb',
          text: '#d97706',
          border: '#fde68a',
        },
        rejected: {
          bg: '#fef2f2',
          text: '#dc2626',
          border: '#fecaca',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        'sidebar': '1px 0 3px 0 rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
