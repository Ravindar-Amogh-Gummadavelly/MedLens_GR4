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
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Longitudinal Trends</h1>
          <p className="text-sm text-text-secondary mt-1">
            Track parameter progression over time against deterministic reference boundaries.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-clinical-muted p-1 rounded-lg">
          {['Hemoglobin', 'Fasting Glucose', 'HbA1c', 'Total Cholesterol'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedParam(p)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                selectedParam === p
                  ? 'bg-clinical-surface text-primary-700 shadow-sm'
                  : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {sortedPoints.length === 0 ? (
        <div className="card p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-clinical-muted flex items-center justify-center mx-auto text-clinical-navy text-xl font-bold">
            📈
          </div>
          <h3 className="text-lg font-bold text-text-primary">No Longitudinal Lab Trends</h3>
          <p className="text-sm text-text-secondary max-w-md mx-auto">
            Upload multiple laboratory documents over time to plot historical parameter trends and reference boundary comparisons.
          </p>
          <a
            href="/reports/upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-clinical-navy text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Upload Medical Report
          </a>
        </div>
      ) : (
        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-clinical-border pb-4">
            <div>
              <h3 className="font-semibold text-text-primary text-base">
                {selectedParam} Progression
              </h3>
              <span className="text-xs text-text-muted mt-0.5 inline-block">
                Historical timeline across {sortedPoints.length} sequential lab report(s)
              </span>
            </div>

            <div className="text-xs bg-status-normal-bg border border-status-normal-border px-3 py-1.5 rounded-lg text-status-normal font-mono font-medium">
              Normal Band: {lowerBound} – {upperBound} {unit}
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sortedPoints} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} domain={['auto', 'auto']} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px',
                    color: '#111827',
                  }}
                />
                <ReferenceArea
                  y1={lowerBound}
                  y2={upperBound}
                  fill="#10b981"
                  fillOpacity={0.06}
                  stroke="#a7f3d0"
                  strokeDasharray="2 2"
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  dot={{ fill: '#4f46e5', r: 5 }}
                  activeDot={{ r: 7, fill: '#6366f1' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
