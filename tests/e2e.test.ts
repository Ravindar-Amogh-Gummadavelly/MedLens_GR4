import { describe, it, expect } from 'vitest';
import { evaluateLabStatus } from '../lib/safety/lab-evaluator';
import { processDocumentOcr } from '../lib/ocr/processor';

describe('MedLens End-to-End Safety & Pipeline Test Suite', () => {
  it('E2E 1: Deterministically computes LOW status for Hemoglobin 12.1 against 13.5-17.5 range', () => {
    const res = evaluateLabStatus({
      valueNum: 12.1,
      valueText: '12.1',
      lowerBound: 13.5,
      upperBound: 17.5,
      rawReferenceRange: '13.5 - 17.5 g/dL',
    });
    expect(res.status).toBe('LOW');
  });

  it('E2E 2: Deterministically computes HIGH status for Glucose 108 against 70-99 range', () => {
    const res = evaluateLabStatus({
      valueNum: 108,
      valueText: '108',
      lowerBound: 70,
      upperBound: 99,
      rawReferenceRange: '70 - 99 mg/dL',
    });
    expect(res.status).toBe('HIGH');
  });

  it('E2E 3: Refuses to invent reference range when missing in source report', () => {
    const res = evaluateLabStatus({
      valueNum: 14.2,
      valueText: '14.2',
      lowerBound: null,
      upperBound: null,
      rawReferenceRange: null,
    });
    expect(res.status).toBe('UNABLE_TO_DETERMINE');
  });

  it('E2E 4: Runs document OCR text processor cleanly', async () => {
    const buffer = Buffer.from('Hemoglobin 12.1 g/dL Reference Range: 13.5 - 17.5 g/dL');
    const ocr = await processDocumentOcr(buffer, 'text/plain', 'sample.txt');
    expect(ocr.text).toContain('Hemoglobin 12.1');
  });
});
