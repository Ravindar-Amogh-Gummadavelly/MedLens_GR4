export type LabStatus = 'LOW' | 'NORMAL' | 'HIGH' | 'UNABLE_TO_DETERMINE';

export interface LabValueInput {
  valueNum?: number | null;
  valueText: string;
  lowerBound?: number | null;
  upperBound?: number | null;
  rawReferenceRange?: string | null;
}

export interface LabEvaluationResult {
  status: LabStatus;
  reason: string;
}

/**
 * Deterministic Lab Status Evaluator
 * CRITICAL SAFETY RULE: Gemini is NEVER permitted to decide final lab status.
 * This pure TypeScript logic determines status strictly based on source report bounds.
 */
export function evaluateLabStatus(input: LabValueInput): LabEvaluationResult {
  const { valueNum, lowerBound, upperBound, rawReferenceRange, valueText } = input;

  // Case 1: Pure numerical evaluation when value, lowerBound, and upperBound are provided
  if (valueNum !== undefined && valueNum !== null && !isNaN(valueNum)) {
    if (lowerBound !== undefined && lowerBound !== null && upperBound !== undefined && upperBound !== null) {
      if (valueNum < lowerBound) {
        return {
          status: 'LOW',
          reason: `Value (${valueNum}) is below lower bound (${lowerBound}).`,
        };
      }
      if (valueNum > upperBound) {
        return {
          status: 'HIGH',
          reason: `Value (${valueNum}) is above upper bound (${upperBound}).`,
        };
      }
      return {
        status: 'NORMAL',
        reason: `Value (${valueNum}) is within reference range (${lowerBound} - ${upperBound}).`,
      };
    }

    // Case 2: Only upper bound provided (e.g., "< 5.0")
    if ((lowerBound === undefined || lowerBound === null) && upperBound !== undefined && upperBound !== null) {
      if (valueNum > upperBound) {
        return {
          status: 'HIGH',
          reason: `Value (${valueNum}) exceeds maximum threshold (${upperBound}).`,
        };
      }
      return {
        status: 'NORMAL',
        reason: `Value (${valueNum}) is below maximum threshold (${upperBound}).`,
      };
    }

    // Case 3: Only lower bound provided (e.g., "> 60")
    if (lowerBound !== undefined && lowerBound !== null && (upperBound === undefined || upperBound === null)) {
      if (valueNum < lowerBound) {
        return {
          status: 'LOW',
          reason: `Value (${valueNum}) is below minimum threshold (${lowerBound}).`,
        };
      }
      return {
        status: 'NORMAL',
        reason: `Value (${valueNum}) meets minimum threshold (${lowerBound}).`,
      };
    }
  }

  // Case 4: Text-based qualitative values matching reference string (e.g. Negative / Normal)
  if (rawReferenceRange && valueText) {
    const valClean = valueText.trim().toLowerCase();
    const refClean = rawReferenceRange.trim().toLowerCase();

    if (refClean.includes('negative') || refClean.includes('absent') || refClean.includes('non-reactive')) {
      if (valClean.includes('positive') || valClean.includes('reactive') || valClean.includes('detected')) {
        return {
          status: 'HIGH',
          reason: `Qualitative result '${valueText}' indicates positive finding against negative reference.`,
        };
      }
      if (valClean.includes('negative') || valClean.includes('non-reactive') || valClean.includes('not detected')) {
        return {
          status: 'NORMAL',
          reason: `Qualitative result '${valueText}' matches negative reference range.`,
        };
      }
    }
  }

  // Fallback: If no reliable source reference range is provided, MUST NOT invent ranges
  return {
    status: 'UNABLE_TO_DETERMINE',
    reason: rawReferenceRange
      ? `Reference range '${rawReferenceRange}' could not be deterministically evaluated.`
      : `No reference range was provided in the source report.`,
  };
}
