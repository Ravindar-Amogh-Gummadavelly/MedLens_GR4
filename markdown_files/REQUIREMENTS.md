# MedLens — Requirements Specification

## 1. Document Overview

**Project:** MedLens — AI-Powered Clinical Information Intelligence
**Document:** Requirements Specification
**Target:** Hackathon MVP
**Primary Development Environment:** Antigravity

MedLens is an AI-powered application that converts fragmented patient information and medical documents into a **structured, source-traceable, human-verified longitudinal medical record**.

The application is intended to organize and explain medical information. It is **not a diagnostic, prescribing, or treatment-decision system**.

---

# 2. Product Objective

MedLens must enable a user to:

1. Enter patient information.
2. Upload medical reports and related documents.
3. Extract useful medical information using OCR/AI.
4. Convert extracted information into structured records.
5. Preserve the source of every important piece of information.
6. Compare laboratory values against reference ranges provided in the source report.
7. Detect potential inconsistencies or conflicting information.
8. Allow humans to verify and correct extracted information.
9. Maintain a longitudinal patient history.
10. Compare current and previous medical reports.
11. Generate concise, patient-friendly summaries.
12. Export a doctor-ready medical record.

### Core Product Loop

```text
📄 Upload
   ↓
🤖 Extract
   ↓
📊 Structure
   ↓
🔍 Verify
   ↓
🔗 Trace
   ↓
📈 Compare
   ↓
🧠 Summarize
```

---

# 3. Functional Requirements

## FR-001 — User Authentication

The system shall provide secure authentication.

### Requirements

* User registration.
* User login.
* Logout.
* Session management.
* Protected application routes.
* Patient data must only be accessible to authorized users.
* Authentication state must persist appropriately.
* Unauthorized users must not access protected patient records.

### Priority

**P0 — Must Have**

---

# 4. Patient Information Intake

## FR-002 — Patient Profile

The system shall allow users to create and maintain a patient profile.

### Required Information

* Patient name
* Age/date of birth
* Sex
* Symptoms
* Existing conditions
* Allergies
* Current medications
* Relevant medical history
* Additional notes

### Requirements

* Fields must be editable.
* User-provided information must be clearly identified as `USER_PROVIDED`.
* The system must not overwrite manually entered information without user approval.
* Patient information must be associated with a specific patient record.

### Priority

**P0 — Must Have**

---

# 5. Medical Document Upload

## FR-003 — Multi-Format Document Upload

The system shall allow users to upload medical documents.

### Supported Formats

* PDF
* JPG
* JPEG
* PNG
* Scanned documents
* Medical report images
* Prescription images

### Supported Document Types

* Laboratory reports
* Blood test reports
* Imaging reports
* Health checkup reports
* Prescriptions
* Medical summaries
* Other medical documents

### Requirements

* Drag-and-drop upload.
* File picker upload.
* Upload progress indicator.
* File validation.
* File size validation.
* Unsupported-format handling.
* Upload cancellation where technically feasible.
* Duplicate document detection.
* Processing status display.

### Processing States

```text
UPLOADED
   ↓
PROCESSING
   ↓
EXTRACTING
   ↓
VALIDATING
   ↓
READY_FOR_REVIEW
   ↓
VERIFIED
```

Errors must produce an explicit:

```text
PROCESSING_FAILED
```

state with a useful error message.

### Priority

**P0 — Must Have**

---

# 6. OCR and AI Medical Information Extraction

## FR-004 — Document Processing

The system shall process uploaded documents using OCR and AI-based document understanding.

### The extraction engine should identify, where available:

* Patient name
* Patient ID
* Report type
* Laboratory/clinic/hospital
* Doctor
* Report date
* Collection date
* Test names
* Test values
* Units
* Reference ranges
* Observations
* Comments
* Prescription medicines
* Medicine strength
* Frequency
* Duration
* Instructions
* Follow-up information

The system must preserve uncertainty when information cannot be confidently extracted.

### Example

```json
{
  "test_name": "Hemoglobin",
  "value": 12.1,
  "unit": "g/dL",
  "reference_range": {
    "low": 13,
    "high": 17
  },
  "origin": "AI_EXTRACTED",
  "confidence": 0.96,
  "verification_status": "NEEDS_REVIEW"
}
```

### Priority

**P0 — Must Have**

---

# 7. Structured Medical Record

## FR-005 — Structured Patient Record

The system shall transform extracted and user-provided information into structured medical data.

The record should contain:

### Patient Information

* Demographics
* Symptoms
* Conditions
* Allergies
* Medications
* Medical history

### Medical Documents

* Document metadata
* Document type
* Date
* Source
* Processing status

### Laboratory Results

* Test
* Value
* Unit
* Reference range
* Status
* Source
* Confidence
* Verification status

### Prescriptions

* Doctor
* Date
* Medicine
* Strength
* Frequency
* Duration
* Instructions

### Timeline

* Reports
* Visits
* Prescriptions
* Important patient events

### Priority

**P0 — Must Have**

---

# 8. Reference-Range Awareness

## FR-006 — Source-Based Reference Range Analysis

MedLens shall determine whether a laboratory result is low, normal, or high **only using the reference range available in the source report**.

### Deterministic Logic

For a numeric value:

```text
value < lower_bound
        → LOW

lower_bound ≤ value ≤ upper_bound
        → NORMAL

value > upper_bound
        → HIGH
```

### Example

```text
Result:
Hemoglobin = 12.1 g/dL

Source reference range:
13–17 g/dL

Result:
LOW
```

### Critical Requirements

* Reference ranges must be extracted from the source document.
* The LLM must not invent reference ranges.
* The system must not silently substitute generic medical ranges.
* Different reports may have different reference ranges.
* The source report's range takes precedence for that result.
* If no valid reference range exists:

```text
Status: Unable to determine
```

* If the range is ambiguous or cannot be parsed reliably:

```text
Status: Unable to determine
```

### Priority

**P0 — Must Have**

---

# 9. Source and Provenance Tracking

## FR-007 — Data Provenance

Every important medical data field must retain its origin.

### Supported Origins

```text
USER_PROVIDED
AI_EXTRACTED
AI_GENERATED
HUMAN_VERIFIED
```

### Example

```text
Test: Hemoglobin
Value: 12.1 g/dL
Source: Blood Report — 05 Sep 2026
Origin: AI_EXTRACTED
Confidence: 96%
Verification: NEEDS_REVIEW
Reference Range: 13–17 g/dL
Status: LOW
```

### Provenance should include where applicable:

* Source document
* Source page
* Source date
* Extraction method
* Origin
* Confidence
* Verification status
* Timestamp
* Human correction history

### Priority

**P0 — Must Have**

---

# 10. Human Verification

## FR-008 — Review and Verification

The system shall provide a human-in-the-loop verification workflow.

Users must be able to:

* Review extracted information.
* Edit incorrect values.
* Approve extracted values.
* Reject incorrect values.
* Correct OCR errors.
* Add missing information.
* View the original source.
* Compare extracted information against the source.

### Verification States

```text
NEEDS_REVIEW
VERIFIED
REJECTED
```

### Critical Requirement

Human corrections must **not destroy the original AI extraction**.

The system should preserve:

```text
Original AI Extraction
        ↓
Human Correction
        ↓
Verified Record
```

### Priority

**P0 — Must Have**

---

# 11. Source-to-Record Traceability

## FR-009 — Source Linking

Users must be able to understand where structured information came from.

### Recommended Interface

```text
┌─────────────────────────┬──────────────────────────┐
│ Original Medical Report │ Structured Information   │
│                         │                          │
│ Hemoglobin 12.1 g/dL    │ Hemoglobin               │
│ Reference: 13–17        │ 12.1 g/dL                │
│                         │ LOW                      │
│                         │ Source: Page 1           │
└─────────────────────────┴──────────────────────────┘
```

Selecting a structured field should highlight or locate the corresponding source information where technically feasible.

This is a major product differentiator.

### Priority

**P0 — Must Have**

---

# 12. Confidence Indicators

## FR-010 — Extraction Confidence

The system should provide confidence indicators for AI-extracted fields.

### Example

```text
Hemoglobin
12.1 g/dL

Extraction confidence: 96%
✓ Verified
```

or:

```text
Creatinine
1.4 mg/dL

Extraction confidence: 62%
⚠ Needs Review
```

### Important Safety Rule

Confidence represents **extraction confidence**, not medical certainty.

A high confidence score must never be presented as:

* Diagnostic certainty
* Clinical certainty
* Medical recommendation

### Priority

**P1 — Strongly Recommended**

---

# 13. Inconsistency and Conflict Detection

## FR-011 — Conflict Detection

The system should identify potentially conflicting information.

### Examples

* Different patient ages across documents.
* Different patient names.
* Different allergy information.
* Conflicting medication lists.
* Different report dates.
* Duplicate reports.
* Different values for apparently identical tests.

### Example

```text
⚠ Potential Conflict

Patient profile:
Allergy → Penicillin

Uploaded report:
Allergies → None reported

MedLens does not determine which source is correct.

[Review Sources]
```

### Critical Requirement

The system must **flag conflicts but not decide which source is medically correct**.

### Priority

**P1 — Strongly Recommended**

---

# 14. Medical Dashboard

## FR-012 — Dashboard

The system shall provide a clear dashboard summarizing the patient's available information.

### Dashboard should display

* Patient overview
* Recent reports
* Key laboratory results
* Abnormal/flagged results
* Verification status
* Recent timeline events
* Trends
* Pending reviews
* Latest AI-generated summary

### Result Cards

Example:

```text
Hemoglobin

12.1 g/dL
LOW

Reference: 13–17 g/dL
Report: 05 Sep 2026

AI Extracted
⚠ Needs Review
```

### Priority

**P0 — Must Have**

---

# 15. Historical Medical Record

## FR-013 — Persistent Patient History

The system shall maintain a longitudinal history for each patient.

History should include:

* Medical reports
* Laboratory results
* Prescriptions
* Patient information changes
* Verification actions
* Important timeline events

Users should be able to navigate between historical records.

### Priority

**P0 — Must Have**

---

# 16. Trend Tracking

## FR-014 — Laboratory Trends

The system should display trends for repeated laboratory measurements.

### Example

```text
Hemoglobin

12.1 → 12.4 → 12.8 → 13.0 g/dL
```

Users should be able to:

* Select a parameter.
* View historical values.
* View dates.
* Identify direction of change.
* See source reports.

### Important

Trend visualization is descriptive only.

The system must not automatically claim:

* Improvement in a disease.
* Disease progression.
* Diagnosis.
* Treatment effectiveness.

### Priority

**P1 — Strongly Recommended**

---

# 17. Multi-Report Comparison

## FR-015 — Report Comparison

The system shall allow comparison of current and previous medical reports.

### Example

| Test       | Previous | Current | Change |
| ---------- | -------: | ------: | -----: |
| Hemoglobin |     11.8 |    12.1 |   +0.3 |
| Glucose    |      105 |     110 |     +5 |
| Creatinine |      1.1 |     1.2 |   +0.1 |

The comparison must preserve the original report dates and sources.

### Priority

**P1 — Strongly Recommended**

---

# 18. AI-Powered Summary

## FR-016 — Patient-Friendly Summary

The system shall generate concise summaries of available medical information.

The summary may describe:

* What reports were uploaded.
* Which tests were included.
* Which values were marked low/normal/high according to the source report.
* Changes across reports.
* Missing information.
* Items awaiting verification.
* Detected inconsistencies.

### Example

```text
Your latest report contains 24 laboratory results.

3 results are marked LOW based on the reference ranges
provided in the report.

5 results are marked HIGH.

2 results could not be classified because a valid
reference range was not available.

Some extracted values still need verification.
```

### Safety Requirements

The AI must not:

* Diagnose conditions.
* Prescribe medication.
* Recommend treatment.
* Recommend dosage changes.
* Claim uncertain information as fact.
* Invent reference ranges.
* Override human-verified information.

### Priority

**P0 — Must Have**

---

# 19. Clarification Questions

## FR-017 — Context-Aware Clarification

The system should ask clarification questions when extracted information is ambiguous.

### Examples

```text
The report contains two possible collection dates.

Which date should be associated with this report?
```

```text
The test name appears unclear in the uploaded image.

Please verify the extracted test name.
```

Clarification must never silently modify medical information.

### Priority

**P1 — Recommended**

---

# 20. Prescription Extraction

## FR-018 — Prescription Processing

The system should support extraction from prescriptions.

Possible fields:

* Doctor
* Date
* Medicine
* Strength
* Frequency
* Duration
* Instructions
* Follow-up information

### Safety Requirement

Prescription extraction is informational only.

MedLens must not:

* Recommend medicines.
* Change dosages.
* Suggest stopping medication.
* Generate new prescriptions.
* Make treatment decisions.

### Priority

**P2 — Optional for MVP**

---

# 21. Medical Timeline

## FR-019 — Timeline

The system should present medical information chronologically.

Example:

```text
05 Sep 2026
│
├── Blood Report Uploaded
│
├── 24 Results Extracted
│
├── 3 Low
│
└── Verification Pending
│
20 Aug 2026
│
└── Previous Blood Report
```

Timeline events should link back to their source documents.

### Priority

**P1 — Strongly Recommended**

---

# 22. Search and Filtering

## FR-020 — Medical Record Search

Users should be able to search their medical record.

### Searchable information

* Test names
* Report names
* Dates
* Doctors
* Hospitals/labs
* Medications
* Conditions
* Timeline events

### Filters

* Date
* Report type
* Test
* LOW
* NORMAL
* HIGH
* Unable to determine
* Verified
* Needs Review

### Priority

**P1 — Recommended**

---

# 23. PDF Export

## FR-021 — Doctor-Ready Medical Summary

The system should provide a professional PDF export.

### PDF may contain

* Patient information
* Medical history
* Uploaded reports
* Structured laboratory results
* Reference ranges
* Status
* Trends
* Report comparison
* AI summary
* Verification status
* Source information

The export must clearly distinguish:

* Patient-provided information
* AI-extracted information
* Human-verified information
* AI-generated summaries

### Priority

**P1 — Strongly Recommended**

---

# 24. Audit History

## FR-022 — Audit Trail

The system should maintain an audit history for important record changes.

Audit events may include:

* Document uploaded
* Data extracted
* Data edited
* Data verified
* Data rejected
* Conflict detected
* Patient information updated
* Summary generated

The audit trail should preserve historical changes rather than silently replacing them.

### Priority

**P1 — Recommended**

---

# 25. Duplicate Detection

## FR-023 — Duplicate Medical Document Detection

The system should identify potentially duplicated documents.

Detection may use:

* File hash
* Document metadata
* Patient information
* Report date
* Report type
* Source facility
* Extracted content similarity

The system should flag potential duplicates rather than automatically deleting them.

### Priority

**P1 — Recommended**

---

# 26. Data Model Requirements

The backend should support entities similar to:

```text
User
Patient
PatientProfile
MedicalDocument
ExtractionJob
LabResult
Prescription
Medication
TimelineEvent
Verification
Conflict
Summary
AuditEvent
```

## Medical Data Fields

Important medical records should support:

```text
id
patient_id
source_document_id
source_page
origin
confidence
verification_status
created_at
updated_at
```

Additional fields may include:

```text
source_text
source_location
extraction_timestamp
verified_by
verified_at
original_value
corrected_value
```

---

# 27. Data Integrity Requirements

## FR-024 — Data Preservation

The system must preserve the distinction between:

```text
Original Source
      ↓
AI Extraction
      ↓
Human Correction
      ↓
Verified Record
```

The application must never silently overwrite source information.

### Requirements

* Original uploaded document remains unchanged.
* Original extraction is retained.
* Human corrections are tracked.
* Verification status is retained.
* Source links remain available.

### Priority

**P0 — Must Have**

---

# 28. Safety Requirements

## SR-001 — No Diagnosis

MedLens must not provide medical diagnoses.

Forbidden behavior:

```text
"These results indicate diabetes."
```

Preferred behavior:

```text
"Glucose is marked HIGH according to the reference
range provided in the report."
```

---

## SR-002 — No Treatment Recommendations

MedLens must not recommend treatment.

Forbidden:

```text
"You should start medication X."
```

---

## SR-003 — No Dosage Changes

MedLens must not recommend:

* Increasing medication dosage.
* Decreasing medication dosage.
* Stopping medication.
* Starting medication.

---

## SR-004 — No Invented Reference Ranges

The system must never invent, infer, or silently substitute a reference range.

If the source does not provide a usable range:

```text
Status: Unable to determine
```

---

## SR-005 — Uncertainty Preservation

If information cannot be reliably extracted, the system must communicate uncertainty.

Example:

```text
⚠ Test name requires verification.
Extraction confidence: 58%
```

The system must not convert uncertain extraction into a definitive fact.

---

## SR-006 — Human Oversight

Medical information that is uncertain or ambiguous must be reviewable by a human.

---

## SR-007 — Responsible AI

AI must be used for:

* Document understanding.
* OCR assistance.
* Information extraction.
* Structuring information.
* Summarization.
* Conflict identification.
* Clarification questions.

AI must not be used to:

* Diagnose.
* Prescribe.
* Make treatment decisions.
* Invent medical facts.
* Override human verification.

---

# 29. Privacy and Security Requirements

## SR-008 — Patient Data Protection

Medical information must be treated as sensitive data.

The application should implement:

* Authentication.
* Authorization.
* Secure data storage.
* Secure API communication.
* Protected routes.
* Environment-based secrets.
* No hardcoded API keys.
* Controlled access to patient records.
* Secure file handling.
* Safe error messages.
* Data deletion capability where supported.

---

# 30. Accessibility Requirements

## AR-001 — Accessible Interface

The application should support:

* Keyboard navigation.
* Clear focus states.
* Accessible form labels.
* Sufficient text contrast.
* Semantic HTML.
* Responsive layouts.
* Readable typography.
* Clear status indicators.
* Icons accompanied by meaningful text where required.

Color must not be the only indication of:

```text
LOW
NORMAL
HIGH
```

For example:

```text
🔴 LOW
🟢 NORMAL
🟠 HIGH
```

with text labels always present.

---

# 31. User Experience Requirements

## UX-001 — Trustworthy Healthcare Interface

The UI should feel:

* Professional
* Calm
* Clean
* Data-focused
* Trustworthy
* Accessible
* Minimal
* Modern

Avoid:

* Excessive animations.
* Gamification.
* Overly colorful dashboards.
* Decorative medical graphics that distract from data.
* Dense unexplained AI output.

---

# 32. Navigation Requirements

Recommended primary navigation:

```text
Dashboard
Medical Record
Reports
Lab Results
Timeline
Compare
Review
Settings
```

The navigation should make the patient's complete history accessible without requiring users to repeatedly upload or re-enter information.

---

# 33. Processing Requirements

Medical report processing should provide visible status updates.

Example:

```text
Uploading...
      ↓
Reading document...
      ↓
Extracting medical information...
      ↓
Validating extracted values...
      ↓
Preparing structured record...
      ↓
Ready for review
```

The UI must not display fake processing states that do not correspond to actual backend operations.

---

# 34. Error Handling Requirements

The system must safely handle:

* Invalid files.
* Corrupted PDFs.
* Unsupported image formats.
* OCR failure.
* AI extraction failure.
* Missing reference ranges.
* Ambiguous test names.
* Missing dates.
* Duplicate documents.
* Network failures.
* API failures.
* Authentication failures.

Errors should be understandable to users.

Example:

```text
We couldn't reliably extract information from this document.

You can:
• Try uploading a clearer image
• Review the source manually
• Retry processing
```

---

# 35. AI Output Requirements

AI extraction must use structured output rather than uncontrolled free-form text.

Recommended conceptual structure:

```json
{
  "patient": {},
  "report": {},
  "lab_results": [],
  "prescription": {},
  "observations": [],
  "uncertainties": []
}
```

Every extracted medical value should support metadata such as:

```json
{
  "value": "...",
  "unit": "...",
  "reference_range": "...",
  "source_document_id": "...",
  "source_page": 1,
  "origin": "AI_EXTRACTED",
  "confidence": 0.95,
  "verification_status": "NEEDS_REVIEW"
}
```

The backend must validate AI output against the expected schema before saving it.

---

# 36. Deterministic Validation Requirements

Critical medical data logic must not rely entirely on an LLM.

The application should separate:

```text
AI
↓
Extraction
```

from:

```text
Application Logic
↓
Validation
↓
Reference Range Comparison
↓
Status
```

For example:

```text
AI extracts:

Value = 12.1
Range = 13–17

Application calculates:

12.1 < 13

Therefore:

LOW
```

The LLM should not make the final LOW/NORMAL/HIGH decision.

---

# 37. Performance Requirements

The application should:

* Provide immediate upload feedback.
* Avoid unnecessary full-page reloads.
* Show processing states.
* Handle large documents gracefully.
* Avoid blocking the UI during long AI processing.
* Use asynchronous/background processing where appropriate.
* Cache appropriate non-sensitive data where useful.

Hackathon MVP priority is functional reliability over premature optimization.

---

# 38. Reliability Requirements

The application must fail safely.

If extraction fails:

```text
Do not create fabricated medical data.
```

If reference range extraction fails:

```text
Do not guess the range.
```

If AI output is invalid:

```text
Reject or request correction.
```

If information conflicts:

```text
Flag the conflict.
Do not silently choose a source.
```

---

# 39. Scope Requirements

## Included

### P0

* Authentication
* Patient information
* Medical document upload
* OCR/AI extraction
* Structured medical records
* Laboratory results
* Source-based reference ranges
* Deterministic result status
* Provenance
* Human verification
* Dashboard
* AI summary

### P1

* Historical trends
* Multi-report comparison
* Conflict detection
* Confidence indicators
* Timeline
* Search/filter
* PDF export
* Audit history

### P2

* Prescription extraction
* Family profiles
* Advanced audit visualization
* General AI assistant
* Advanced analytics

---

# 40. Explicitly Out of Scope

The following should not be implemented as core MedLens functionality:

* Medical diagnosis.
* Disease prediction.
* Treatment recommendations.
* Medication recommendations.
* Dosage recommendations.
* Prescription generation.
* Medication changes.
* Pharmacy ordering.
* Doctor appointment booking.
* Insurance processing.
* Fitness tracking.
* Generic wellness coaching.
* Autonomous clinical decision-making.

Optional features must not distract from the core clinical information intelligence workflow.

---

# 41. Priority Matrix

| Requirement                      | Priority |
| -------------------------------- | -------- |
| Authentication                   | P0       |
| Patient information intake       | P0       |
| Medical document upload          | P0       |
| OCR/AI extraction                | P0       |
| Structured medical record        | P0       |
| Reference-range extraction       | P0       |
| Deterministic status calculation | P0       |
| Provenance tracking              | P0       |
| Human verification               | P0       |
| Source-to-record traceability    | P0       |
| Dashboard                        | P0       |
| AI summary                       | P0       |
| Confidence indicators            | P1       |
| Conflict detection               | P1       |
| Historical trends                | P1       |
| Report comparison                | P1       |
| Timeline                         | P1       |
| Search/filter                    | P1       |
| PDF export                       | P1       |
| Audit history                    | P1       |
| Duplicate detection              | P1       |
| Clarification questions          | P1       |
| Prescription extraction          | P2       |
| Family profiles                  | P2       |
| General AI assistant             | P2       |
| Advanced analytics               | P2       |

---

# 42. End-to-End Functional Flow

The complete MVP should support the following flow:

```text
1. User logs in
       ↓
2. Creates/selects patient
       ↓
3. Enters patient information
       ↓
4. Uploads medical report
       ↓
5. System validates file
       ↓
6. OCR reads document
       ↓
7. AI extracts medical information
       ↓
8. Structured schema validation
       ↓
9. Reference ranges extracted
       ↓
10. Deterministic status calculation
       ↓
11. Provenance attached
       ↓
12. Confidence calculated/stored
       ↓
13. User reviews extraction
       ↓
14. User corrects/approves information
       ↓
15. Verified record created
       ↓
16. Dashboard updated
       ↓
17. Historical trends updated
       ↓
18. Previous/current reports compared
       ↓
19. AI generates factual summary
       ↓
20. User can export doctor-ready record
```

---

# 43. Acceptance Criteria

The MVP is considered functionally successful when:

### Patient Information

* [ ] User can create a patient.
* [ ] User can enter required patient information.
* [ ] User-provided information is clearly identified.

### Document Processing

* [ ] User can upload PDF/image medical reports.
* [ ] System processes uploaded documents.
* [ ] OCR/AI extracts relevant medical information.
* [ ] Failed processing is handled safely.

### Structured Record

* [ ] Extracted data appears in structured form.
* [ ] Test name, value, unit, date, and range are preserved where available.
* [ ] Source information is attached.

### Reference Ranges

* [ ] Source reference range is extracted.
* [ ] LOW/NORMAL/HIGH is calculated deterministically.
* [ ] Missing/ambiguous ranges produce "Unable to determine".
* [ ] No generic range is invented.

### Provenance

* [ ] Each important value identifies its origin.
* [ ] Source document is accessible.
* [ ] Source page/location is retained where possible.
* [ ] Confidence is visible where available.

### Verification

* [ ] User can edit extracted values.
* [ ] User can verify values.
* [ ] Original extraction is preserved.
* [ ] Verification state is stored.

### Intelligence

* [ ] Dashboard displays structured medical information.
* [ ] Historical values can be viewed.
* [ ] Current and previous reports can be compared.
* [ ] Conflicts can be flagged.
* [ ] AI summary is generated safely.

### Export

* [ ] User can generate a professional medical summary.
* [ ] Export includes sources and verification status.

### Safety

* [ ] No diagnosis is generated.
* [ ] No treatment recommendation is generated.
* [ ] No dosage recommendation is generated.
* [ ] No reference range is fabricated.
* [ ] Uncertain information remains clearly uncertain.

---

# 44. Hackathon Demo Acceptance Scenario

The ideal demonstration should show one complete patient journey.

### Demo

```text
Login
 ↓
Create Patient
 ↓
Enter Patient Details
 ↓
Upload Blood Report
 ↓
AI/OCR Extraction
 ↓
Structured Results
 ↓
LOW/NORMAL/HIGH Status
 ↓
Click Result
 ↓
View Source Evidence
 ↓
Correct One Extraction
 ↓
Verify
 ↓
Dashboard Updates
 ↓
Open Previous Report
 ↓
Compare Results
 ↓
View Trend
 ↓
Generate AI Summary
 ↓
Export Medical Record
```

### Primary "Wow" Moment

The strongest demonstration should be:

```text
SOURCE DOCUMENT
      ↓
EXTRACTED DATA
      ↓
REFERENCE-RANGE VALIDATION
      ↓
PROVENANCE
      ↓
HUMAN VERIFICATION
      ↓
TRUSTED STRUCTURED RECORD
```

This demonstrates that MedLens is more than an AI chatbot or PDF summarizer.

---

# 45. Non-Functional Quality Bar

The final application should prioritize:

```text
1. Functionality
2. Data integrity
3. Safety
4. Traceability
5. Usability
6. Accessibility
7. Performance
8. Visual polish
```

The system should prefer a smaller number of reliable features over a large number of incomplete features.

---

# 46. Final Requirement Statement

MedLens must deliver a working AI-powered clinical information intelligence workflow that transforms fragmented patient information and medical documents into a:

> **Structured, source-traceable, human-verified, longitudinal medical record.**

The application should make medical information easier to **organize, review, compare, verify, and understand** while maintaining strict boundaries against diagnosis and treatment decision-making.
