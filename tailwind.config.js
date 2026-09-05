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
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        clinical: {
          bg: '#f8f9fc',
          surface: '#ffffff',
          border: '#e5e7eb',
          'border-strong': '#d1d5db',
          muted: '#f3f4f6',
          subtle: '#f9fafb',
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
