'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
} from 'recharts';

export interface TrendDataPoint {
  date: string;
  value: number;
  unit: string;
  status: string;
  lowerBound?: number | null;
  upperBound?: number | null;
  documentName: string;
}

interface LabTrendsProps {
  parameterName?: string;
  dataPoints?: TrendDataPoint[];
}

export default function LabTrendsChart({
  parameterName = 'Hemoglobin',
  dataPoints = [],
}: LabTrendsProps) {
  const [selectedParam, setSelectedParam] = useState(parameterName);
  const [secondaryParam, setSecondaryParam] = useState<string>('Fasting Glucose');
  const [enableDualAxis, setEnableDualAxis] = useState(true);

  const mockDualPoints = [
    { date: 'Apr 25', primary: 11.2, secondary: 142, unit1: 'g/dL', unit2: 'mg/dL' },
    { date: 'May 10', primary: 11.5, secondary: 138, unit1: 'g/dL', unit2: 'mg/dL' },
    { date: 'May 25', primary: 11.8, secondary: 130, unit1: 'g/dL', unit2: 'mg/dL' },
    { date: 'Jun 10', primary: 11.6, secondary: 135, unit1: 'g/dL', unit2: 'mg/dL' },
    { date: 'Jun 25', primary: 12.0, secondary: 125, unit1: 'g/dL', unit2: 'mg/dL' },
    { date: 'Jul 10', primary: 12.1, secondary: 120, unit1: 'g/dL', unit2: 'mg/dL' },
  ];

  const sortedPoints = [...dataPoints].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const lowerBound = sortedPoints[0]?.lowerBound ?? 13.0;
  const upperBound = sortedPoints[0]?.upperBound ?? 17.0;
  const unit = sortedPoints[0]?.unit ?? 'g/dL';

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary dark:text-white tracking-tight">Longitudinal Trends & Multi-Parameter Correlation</h1>
          <p className="text-sm text-text-secondary dark:text-slate-400 mt-1">
            Compare lab parameters side-by-side or on a dual-axis chart to identify clinical correlations (e.g., HbA1c vs. Fasting Glucose).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setEnableDualAxis(!enableDualAxis)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
              enableDualAxis
                ? 'bg-primary-600 text-white border-primary-500 shadow-sm'
                : 'bg-clinical-surface dark:bg-slate-800 text-text-secondary dark:text-slate-300 border-clinical-border dark:border-slate-700'
            }`}
          >
            📊 {enableDualAxis ? 'Dual-Axis Mode Active' : 'Single Parameter Mode'}
          </button>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-clinical-border dark:border-slate-800 pb-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="text-2xs uppercase tracking-wider text-text-tertiary dark:text-slate-400 font-bold block mb-1">
                Primary Parameter (Left Axis)
              </label>
              <select
                value={selectedParam}
                onChange={(e) => setSelectedParam(e.target.value)}
                className="bg-clinical-muted dark:bg-slate-800 border border-clinical-border dark:border-slate-700 text-text-primary dark:text-white text-xs font-semibold px-3 py-1.5 rounded-lg focus:outline-none"
              >
                <option value="Hemoglobin">Hemoglobin (g/dL)</option>
                <option value="Fasting Glucose">Fasting Glucose (mg/dL)</option>
                <option value="HbA1c">HbA1c (%)</option>
                <option value="Total Cholesterol">Total Cholesterol (mg/dL)</option>
              </select>
            </div>

            {enableDualAxis && (
              <div>
                <label className="text-2xs uppercase tracking-wider text-text-tertiary dark:text-slate-400 font-bold block mb-1">
                  Secondary Parameter (Right Axis)
                </label>
                <select
                  value={secondaryParam}
                  onChange={(e) => setSecondaryParam(e.target.value)}
                  className="bg-clinical-muted dark:bg-slate-800 border border-clinical-border dark:border-slate-700 text-text-primary dark:text-white text-xs font-semibold px-3 py-1.5 rounded-lg focus:outline-none"
                >
                  <option value="Fasting Glucose">Fasting Glucose (mg/dL)</option>
                  <option value="HbA1c">HbA1c (%)</option>
                  <option value="Hemoglobin">Hemoglobin (g/dL)</option>
                  <option value="Total Cholesterol">Total Cholesterol (mg/dL)</option>
                </select>
              </div>
            )}
          </div>

          <div className="text-xs bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-lg text-emerald-800 dark:text-emerald-300 font-mono font-semibold">
            {selectedParam} Normal Band: {lowerBound} – {upperBound} {unit}
          </div>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockDualPoints} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} />
              <YAxis yAxisId="left" stroke="#3b82f6" fontSize={12} tickLine={false} />
              {enableDualAxis && (
                <YAxis yAxisId="right" orientation="right" stroke="#ec4899" fontSize={12} tickLine={false} />
              )}
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Line yAxisId="left" type="monotone" dataKey="primary" name={selectedParam} stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
              {enableDualAxis && (
                <Line yAxisId="right" type="monotone" dataKey="secondary" name={secondaryParam} stroke="#ec4899" strokeWidth={3} dot={{ r: 5 }} />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
