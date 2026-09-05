'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, ShieldCheck, AlertCircle } from 'lucide-react';

export default function NewPatientPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    sex: 'Female',
    symptoms: '',
    existingConditions: '',
    allergies: '',
    medications: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create patient');

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-clinical-400" />
          Initialize New Patient Profile
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Create a structured clinical profile. Uploaded medical reports will be linked directly to this patient.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        {error && (
          <div className="bg-rose-950/60 border border-rose-800 text-rose-300 p-3.5 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Full Name *</label>
          <input
            type="text"
            required
            placeholder="e.g. Eleanor Vance"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 text-white text-sm p-3 rounded-xl focus:outline-none focus:border-clinical-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Date of Birth</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 text-white text-sm p-3 rounded-xl focus:outline-none focus:border-clinical-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Biological Sex</label>
            <select
              value={formData.sex}
              onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 text-white text-sm p-3 rounded-xl focus:outline-none focus:border-clinical-500"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Current Symptoms</label>
          <input
            type="text"
            placeholder="e.g. Mild fatigue, dizziness"
            value={formData.symptoms}
            onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 text-white text-sm p-3 rounded-xl focus:outline-none focus:border-clinical-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Known Allergies</label>
          <input
            type="text"
            placeholder="e.g. Penicillin (Hives reported)"
            value={formData.allergies}
            onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 text-white text-sm p-3 rounded-xl focus:outline-none focus:border-clinical-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Current Medications</label>
          <input
            type="text"
            placeholder="e.g. Multivitamin daily, Iron supplement"
            value={formData.medications}
            onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 text-white text-sm p-3 rounded-xl focus:outline-none focus:border-clinical-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !formData.name}
          className="w-full bg-clinical-600 hover:bg-clinical-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-md shadow-clinical-600/30 mt-4"
        >
          {loading ? 'Creating Profile...' : 'Save & Initialize Patient Record'}
        </button>
      </form>
    </div>
  );
}
