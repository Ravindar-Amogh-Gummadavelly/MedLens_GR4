import { z } from 'zod';

export const LabResultExtractionSchema = z.object({
  test_name: z.string().describe('Exact name of the lab test'),
  category: z.string().nullable().optional().describe('Panel or category e.g., Hematology, Comprehensive Metabolic Panel'),
  value_num: z.number().nullable().optional().describe('Numeric value if test result is numeric'),
  value_text: z.string().describe('Exact string representation of result value'),
  unit: z.string().nullable().optional().describe('Measurement unit e.g. g/dL, mg/dL'),
  lower_bound: z.number().nullable().optional().describe('Lower limit of reference range if explicitly present in source'),
  upper_bound: z.number().nullable().optional().describe('Upper limit of reference range if explicitly present in source'),
  raw_reference_range: z.string().nullable().optional().describe('Exact text of reference range in document'),
  source_page: z.number().default(1).describe('Page number where this test appeared'),
  source_text: z.string().nullable().optional().describe('Exact text snippet from document matching this result'),
  confidence: z.number().min(0).max(100).default(90).describe('Extraction confidence percentage 0-100%'),
});

export const PrescriptionExtractionSchema = z.object({
  medication_name: z.string().describe('Name of prescribed drug'),
  dosage: z.string().nullable().optional().describe('Strength or dosage e.g. 500mg'),
  frequency: z.string().nullable().optional().describe('Frequency e.g. Twice daily'),
  route: z.string().nullable().optional().describe('Administration route e.g. Oral'),
  duration: z.string().nullable().optional().describe('Duration of prescription e.g. 10 days'),
  prescribing_doctor: z.string().nullable().optional().describe('Doctor name'),
});

export const ConflictItemSchema = z.object({
  category: z.enum(['DEMOGRAPHIC', 'LAB_VALUE', 'ALLERGY', 'MEDICATION']),
  title: z.string(),
  description: z.string(),
  sourceA: z.string(),
  sourceB: z.string(),
});

export const MedicalDocumentExtractionSchema = z.object({
  patient_name: z.string().nullable().optional(),
  dob: z.string().nullable().optional(),
  sex: z.string().nullable().optional(),
  report_date: z.string().nullable().optional(),
  facility_name: z.string().nullable().optional(),
  physician_name: z.string().nullable().optional(),
  lab_results: z.array(LabResultExtractionSchema).default([]),
  prescriptions: z.array(PrescriptionExtractionSchema).default([]),
  clinical_notes: z.string().nullable().optional(),
  ambiguous_fields: z.array(z.string()).default([]),
  detected_conflicts: z.array(ConflictItemSchema).default([]),
});

export const SummaryGenerationSchema = z.object({
  summary_text: z.string().describe('Patient friendly summary grounded strictly in available structured data'),
  key_takeaways: z.array(z.string()).describe('Key factual takeaways'),
  factual_points: z.array(z.string()).describe('Factual data points'),
  safe_notes: z.string().nullable().optional().describe('Standard disclaimers emphasizing consultation with physician'),
});

export type ExtractedLabResult = z.infer<typeof LabResultExtractionSchema>;
export type ExtractedPrescription = z.infer<typeof PrescriptionExtractionSchema>;
export type MedicalExtractionResult = z.infer<typeof MedicalDocumentExtractionSchema>;
export type SummaryResult = z.infer<typeof SummaryGenerationSchema>;
