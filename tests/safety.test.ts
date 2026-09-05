import { describe, it, expect } from 'vitest';
import { evaluateLabStatus } from '../lib/safety/lab-evaluator';

describe('Deterministic Lab Status Safety Evaluator', () => {
  it('correctly evaluates LOW value', () => {
    const res = evaluateLabStatus({
      valueNum: 11.2,
      valueText: '11.2',
      lowerBound: 13.5,
      upperBound: 17.5,
      rawReferenceRange: '13.5 - 17.5 g/dL',
    });
    expect(res.status).toBe('LOW');
  });

  it('correctly evaluates NORMAL value', () => {
    const res = evaluateLabStatus({
      valueNum: 14.8,
      valueText: '14.8',
      lowerBound: 13.5,
      upperBound: 17.5,
      rawReferenceRange: '13.5 - 17.5 g/dL',
    });
    expect(res.status).toBe('NORMAL');
  });

  it('correctly evaluates HIGH value', () => {
    const res = evaluateLabStatus({
      valueNum: 19.1,
      valueText: '19.1',
      lowerBound: 13.5,
      upperBound: 17.5,
      rawReferenceRange: '13.5 - 17.5 g/dL',
    });
    expect(res.status).toBe('HIGH');
  });

  it('returns UNABLE_TO_DETERMINE when source reference range is missing (NEVER invents ranges)', () => {
    const res = evaluateLabStatus({
      valueNum: 14.8,
      valueText: '14.8',
      lowerBound: null,
      upperBound: null,
      rawReferenceRange: null,
    });
    expect(res.status).toBe('UNABLE_TO_DETERMINE');
    expect(res.reason).toContain('No reference range was provided');
  });

  it('evaluates qualitative Negative reference range correctly', () => {
    const res = evaluateLabStatus({
      valueText: 'Positive',
      rawReferenceRange: 'Negative',
    });
    expect(res.status).toBe('HIGH');
  });
});
