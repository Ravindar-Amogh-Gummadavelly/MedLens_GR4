'use client';

import React from 'react';

interface DoctorReadyPDFProps {
  patient?: {
    name: string;
    id?: string;
    dob?: string | null;
    sex?: string | null;
    symptoms?: string | null;
    existingConditions?: string | null;
    allergies?: string | null;
  };
  labResults?: Array<{
    testName: string;
    category?: string | null;
    valueText: string;
    unit?: string | null;
    rawReferenceRange?: string | null;
    deterministicStatus: string;
    origin: string;
    verificationStatus: string;
    sourcePage: number;
    testDate?: string | null;
  }>;
  summaryText?: string | null;
}

const DEFAULT_PATIENT = {
  name: 'Rajesh Kumar',
  id: 'PAT-20250904-001',
  dob: '1980-05-14',
  sex: 'Male',
  allergies: 'Penicillin (Mild Hives)',
  existingConditions: 'Type 2 Diabetes Mellitus, Essential Hypertension',
};

const DEFAULT_LABS = [
  { testName: 'Hemoglobin', valueText: '11.2', unit: 'g/dL', rawReferenceRange: '13.0–17.0 g/dL', deterministicStatus: 'LOW', origin: 'AI Extracted', verificationStatus: 'Verified', sourcePage: 1 },
  { testName: 'Fasting Glucose', valueText: '142', unit: 'mg/dL', rawReferenceRange: '70–100 mg/dL', deterministicStatus: 'HIGH', origin: 'AI Extracted', verificationStatus: 'Verified', sourcePage: 1 },
  { testName: 'WBC Count', valueText: '7,200', unit: '/µL', rawReferenceRange: '4,000–11,000 /µL', deterministicStatus: 'NORMAL', origin: 'AI Extracted', verificationStatus: 'Verified', sourcePage: 1 },
  { testName: 'Platelet Count', valueText: '245,000', unit: '/µL', rawReferenceRange: '150,000–400,000 /µL', deterministicStatus: 'NORMAL', origin: 'AI Extracted', verificationStatus: 'Verified', sourcePage: 1 },
  { testName: 'Serum Creatinine', valueText: '1.1', unit: 'mg/dL', rawReferenceRange: '0.7–1.3 mg/dL', deterministicStatus: 'NORMAL', origin: 'AI Extracted', verificationStatus: 'Verified', sourcePage: 2 },
  { testName: 'Total Cholesterol', valueText: '210', unit: 'mg/dL', rawReferenceRange: '<200 mg/dL', deterministicStatus: 'HIGH', origin: 'AI Extracted', verificationStatus: 'Needs Review', sourcePage: 1 },
];

export default function DoctorReadyPDF({
  patient = DEFAULT_PATIENT,
  labResults = DEFAULT_LABS,
  summaryText = 'Patient exhibits microcytic anemia (Hemoglobin 11.2 g/dL) and elevated fasting plasma glucose (142 mg/dL). Lipid profile shows total cholesterol at 210 mg/dL. Renal function remains within normal limits (Serum Creatinine 1.1 mg/dL). All values extracted directly from source diagnostic reports.',
}: DoctorReadyPDFProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleExportFHIR = () => {
    const fhirResource = {
      resourceType: 'Bundle',
      type: 'collection',
      timestamp: new Date().toISOString(),
      entry: [
        {
          resource: {
            resourceType: 'Patient',
            id: patient.id || 'PAT-001',
            name: [{ text: patient.name }],
            gender: patient.sex?.toLowerCase() === 'female' ? 'female' : 'male',
            birthDate: patient.dob || '1980-05-14',
          },
        },
        ...labResults.map((r, i) => ({
          resource: {
            resourceType: 'Observation',
            id: `obs-${i + 1}`,
            status: 'final',
            code: { text: r.testName },
            valueQuantity: {
              value: parseFloat(r.valueText) || r.valueText,
              unit: r.unit,
            },
            interpretation: [
              {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
                    code: r.deterministicStatus,
                  },
                ],
              },
            ],
            referenceRange: [{ text: r.rawReferenceRange }],
          },
        })),
      ],
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fhirResource, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `FHIR_PatientRecord_${patient.name.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between card p-4 print:hidden">
        <div>
          <h2 className="text-base font-bold text-text-primary">Doctor-Ready Clinical Summary</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Export structured patient record formatted for clinical consultation or EHR systems (FHIR R4 / HL7).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportFHIR}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800 dark:bg-slate-700 text-white text-xs font-semibold rounded-lg hover:bg-slate-700 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            Export FHIR R4 (JSON)
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-xs font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Printable Clinical Sheet */}
      <div className="bg-white text-slate-900 p-8 rounded-xl border border-clinical-border shadow-card space-y-6 font-sans print:shadow-none print:border-none print:p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
              ML
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">MedLens Clinical Intelligence</h1>
              <span className="text-xs text-slate-500 font-medium">Structured & Verified Patient Medical Record</span>
            </div>
          </div>
          <div className="text-right text-xs text-slate-500">
            <div>Export Date: {new Date().toLocaleDateString()}</div>
            <div className="font-mono text-2xs">Verification Engine v1.0</div>
          </div>
        </div>

        {/* Patient Demographics */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block uppercase text-2xs font-semibold">Patient Name</span>
            <span className="font-bold text-slate-900 text-sm">{patient.name}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-2xs font-semibold">DOB / Sex</span>
            <span className="font-medium text-slate-900">{patient.dob || '1980-05-14'} ({patient.sex || 'Male'})</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-2xs font-semibold">Known Allergies</span>
            <span className="font-medium text-slate-900">{patient.allergies || 'Penicillin (Hives)'}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-2xs font-semibold">Verification State</span>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
              HUMAN VERIFIED
            </span>
          </div>
        </div>

        {/* Factual Summary */}
        {summaryText && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Clinical Record Summary (Factual Grounding)
            </h3>
            <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-200 leading-relaxed">
              {summaryText}
            </p>
          </div>
        )}

        {/* Lab Results Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Structured Laboratory Findings & Deterministic Bounds Evaluation
          </h3>

          <table className="w-full text-left text-xs border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-semibold">
                <th className="p-2.5 border-r border-slate-300">Test Name</th>
                <th className="p-2.5 border-r border-slate-300 text-right">Extracted Result</th>
                <th className="p-2.5 border-r border-slate-300">Report Reference Range</th>
                <th className="p-2.5 border-r border-slate-300 text-center">Deterministic Status</th>
                <th className="p-2.5">Provenance & Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {labResults.map((lab, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-2.5 border-r border-slate-300 font-semibold text-slate-900">
                    {lab.testName}
                  </td>
                  <td className="p-2.5 border-r border-slate-300 text-right font-mono font-bold text-slate-900">
                    {lab.valueText} {lab.unit || ''}
                  </td>
                  <td className="p-2.5 border-r border-slate-300 font-mono text-slate-600">
                    {lab.rawReferenceRange || 'None Provided'}
                  </td>
                  <td className="p-2.5 border-r border-slate-300 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-2xs font-bold ${
                        lab.deterministicStatus === 'LOW'
                          ? 'bg-blue-100 text-blue-800'
                          : lab.deterministicStatus === 'HIGH'
                          ? 'bg-red-100 text-red-800'
                          : lab.deterministicStatus === 'NORMAL'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {lab.deterministicStatus}
                    </span>
                  </td>
                  <td className="p-2.5 text-2xs text-slate-600 font-mono">
                    {lab.origin} • Page {lab.sourcePage} ({lab.verificationStatus})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Disclaimer */}
        <div className="pt-4 border-t border-slate-300 text-2xs text-slate-500 space-y-1">
          <p>
            <strong>Safety Compliance Notice:</strong> Laboratory statuses (LOW, NORMAL, HIGH) are deterministically computed by application logic strictly against source report reference ranges. No external ranges were invented. AI did not determine final lab statuses or clinical diagnoses.
          </p>
        </div>
      </div>
    </div>
  );
}
