# MedLens — Master Build Instructions

> **Project:** MedLens — AI-Powered Clinical Information Intelligence
> **Purpose:** Hackathon MVP
> **Primary Development Environment:** Antigravity
> **Build Philosophy:** Build a polished, functional, demo-ready product — not a collection of mock screens.

---

# 1. PRODUCT VISION

MedLens is an AI-powered clinical information intelligence application that transforms fragmented medical information into a:

* Structured patient record
* Traceable medical dataset
* Human-verified record
* Easy-to-understand health summary
* Historical medical timeline
* Comparable set of medical reports

### Core Product Promise

> **MedLens turns fragmented medical documents into a structured, traceable, and human-verified patient record.**

### Core Product Loop

```text
📄 Upload
    ↓
🤖 Extract
    ↓
📊 Structure
    ↓
🔍 Validate
    ↓
✏️ Verify
    ↓
🔗 Trace
    ↓
📈 Compare
    ↓
🧠 Summarize
```

---

# 2. IMPORTANT IMPLEMENTATION PRINCIPLE

Do NOT build MedLens as a generic healthcare app.

The problem statement is primarily about:

1. Collecting patient information
2. Processing medical reports
3. Structuring medical information
4. Preserving source/provenance
5. Detecting inconsistencies
6. Supporting human verification
7. Comparing medical information over time
8. Generating a safe, patient-friendly summary

Every feature must support this central workflow.

Avoid spending significant development time on unrelated healthcare features such as:

* Appointment booking
* Medicine reminders
* Vaccination management
* General symptom diagnosis
* Treatment recommendations
* Medical marketplace
* Insurance
* Fitness tracking
* Generic wellness content
* Full clinical decision support

These are outside the core MVP.

---

# 3. PRIMARY USER

The primary user is a patient or authorized person who wants to organize and understand their medical information.

Secondary user:

* Doctor/clinician reviewing a patient-provided summary

MedLens is NOT intended to replace a doctor.

---

# 4. SAFETY REQUIREMENTS

These requirements are NON-NEGOTIABLE.

## 4.1 No Diagnosis

MedLens must never claim:

* "You have diabetes."
* "This indicates cancer."
* "You have anemia."
* "You are suffering from..."

Instead use neutral language such as:

* "This value is below the reference range shown in the report."
* "The report contains an abnormal result."
* "Please discuss this finding with a qualified healthcare professional."

---

## 4.2 No Treatment Recommendations

Never recommend:

* medications
* dosage changes
* stopping medications
* starting medications
* treatment plans
* medical procedures
* specific clinical interventions

---

## 4.3 No Invented Reference Ranges

This is one of the most important architectural rules.

The AI must NOT invent reference ranges.

Correct workflow:

```text
Medical Report
      ↓
Extract Test
      ↓
Extract Result
      ↓
Extract Unit
      ↓
Extract Reference Range
      ↓
Deterministic Comparison
      ↓
LOW / NORMAL / HIGH
```

If the report does not contain a reference range:

```text
Status: Unable to determine
```

Do NOT use a generic medical reference range unless explicitly supported by the source.

---

# 5. CORE FEATURES

The MVP MUST prioritize these features.

## 5.1 Multi-Format Medical Report Upload

Support:

* PDF
* JPG
* JPEG
* PNG
* Scanned documents

The UI should make uploading extremely simple.

Example:

```text
┌──────────────────────────────────────┐
│       Upload Medical Report          │
│                                      │
│     📄 Drag & Drop                  │
│                                      │
│     or                               │
│                                      │
│     [ Choose File ]                  │
│                                      │
│ PDF • JPG • PNG                      │
└──────────────────────────────────────┘
```

---

# 6. AI / OCR MEDICAL INFORMATION EXTRACTION

Extract structured information from uploaded documents.

Possible extracted fields:

### Patient Information

* Name
* Age
* Sex
* Patient ID if present
* Report date

### Laboratory Information

* Test name
* Result
* Unit
* Reference range
* Status
* Observation/comment
* Test date
* Report/source ID

### Report Information

* Report type
* Laboratory/hospital name
* Doctor name when present
* Report date
* Collection date when present
* Page number
* Source document

### Prescription Information

When prescriptions are uploaded, extract:

* Doctor
* Date
* Medicine name
* Strength
* Frequency
* Duration
* Instructions

Extraction only.

Do NOT generate treatment advice.

---

# 7. STRUCTURED PATIENT RECORD

Never display the AI response as the final medical record.

The application must convert extracted information into structured entities.

Suggested structure:

```text
Patient
 ├── Demographics
 ├── Symptoms
 ├── Conditions
 ├── Allergies
 ├── Medications
 ├── Reports
 │    ├── Lab Results
 │    ├── Prescriptions
 │    └── Medical Documents
 ├── Timeline
 └── Summaries
```

---

# 8. PATIENT INFORMATION INTAKE

Provide a structured form for manually entering information.

Fields should include:

* Age
* Sex
* Symptoms
* Existing conditions
* Allergies
* Current medications
* Relevant medical history
* Optional notes

Clearly distinguish manually entered information from AI-extracted information.

---

# 9. BIOMARKER / MEDICAL RESULT DASHBOARD

Medical results should be presented as clean cards or rows.

Example:

```text
Hemoglobin

12.1 g/dL

Reference:
13.0 – 17.0 g/dL

Status:
LOW

Source:
Blood Report — 05 Sep 2026

Confidence:
96%

Verification:
Needs Review
```

The dashboard should allow users to quickly understand:

* What was tested
* What value was found
* Unit
* Reference range
* Status
* Date
* Source
* Confidence
* Verification state

---

# 10. REFERENCE RANGE ENGINE

Reference-range processing must be deterministic.

Do NOT ask the LLM to decide whether something is low/normal/high.

Use application logic.

Example:

```text
value < lower_bound
    → LOW

lower_bound <= value <= upper_bound
    → NORMAL

value > upper_bound
    → HIGH
```

Handle ranges carefully:

```text
13 - 17
13–17
13 to 17
13.0 - 17.0
```

Also handle:

```text
< 5
> 10
<= 5
>= 10
```

If parsing is ambiguous:

```text
Status: Unable to determine
```

Never guess.

---

# 11. SOURCE & PROVENANCE

Provenance is a FIRST-CLASS FEATURE.

Every important piece of information should have an origin.

Possible origins:

```text
USER_PROVIDED
AI_EXTRACTED
AI_GENERATED
HUMAN_VERIFIED
```

Example:

```text
Hemoglobin
12.1 g/dL

Origin:
AI Extracted

Source:
blood_report_05_sep.pdf
Page 2

Confidence:
96%

Verification:
Not Verified
```

If the user edits the value:

```text
Original AI value:
12.7

Human corrected value:
12.1

Verification:
Human Verified
```

Never silently overwrite the original extraction.

---

# 12. SOURCE LINKING

Whenever possible, extracted fields should link back to their source.

Ideal UX:

```text
┌─────────────────────┬──────────────────────────┐
│ Original Report     │ Structured Information   │
│                     │                          │
│ Hb: 12.1 g/dL       │ Hemoglobin              │
│                     │ 12.1 g/dL               │
│                     │ LOW                      │
│                     │                          │
│                     │ Source: Page 2           │
└─────────────────────┴──────────────────────────┘
```

Clicking an extracted field should reveal/highlight the corresponding source text when technically possible.

This is a major MedLens differentiator.

---

# 13. HUMAN VERIFICATION

AI extraction must never automatically become trusted clinical data without an opportunity for review.

Every extracted field should support:

* Edit
* Verify
* Reject
* Review

Suggested states:

```text
NEEDS_REVIEW
VERIFIED
REJECTED
```

Low-confidence values should be visually emphasized.

Example:

```text
⚠ Needs Verification

Platelet Count
148,000 /µL

Confidence: 61%
Source: Page 3
[ Edit ] [ Verify ]
```

---

# 14. AI CONFIDENCE

Display confidence where meaningful.

Example:

```text
Confidence: 96%
```

or:

```text
High confidence
Medium confidence
Low confidence
```

Low confidence should trigger human review.

Do not represent AI confidence as medical certainty.

It represents extraction confidence only.

---

# 15. INCONSISTENCY / CONFLICT DETECTION

Detect conflicting information without deciding which value is correct.

Examples:

```text
⚠ Possible Conflict

Patient profile:
Age = 42

Report:
Age = 44

Please verify the correct value.
```

Another example:

```text
⚠ Allergy Conflict

Patient profile:
Penicillin allergy

Uploaded report:
No known allergies

Please review the source information.
```

The system should surface the conflict.

It must NOT automatically choose one value.

---

# 16. HISTORICAL TREND TRACKING

Store reports over time.

Allow users to view changes in medical measurements.

Example:

```text
Hemoglobin

Jan 2026    11.8
Mar 2026    12.0
Jun 2026    12.1
Sep 2026    12.4
```

Provide a simple chart when sufficient historical data exists.

The chart should clearly show dates and values.

---

# 17. MULTI-REPORT COMPARISON

Allow users to compare:

```text
Previous Report vs Current Report
```

Example:

| Parameter  | Previous | Current | Change |
| ---------- | -------: | ------: | -----: |
| Hemoglobin |     11.8 |    12.1 |   +0.3 |
| Glucose    |       98 |     105 |     +7 |
| Platelets  |     155k |    148k |    -7k |

The comparison should describe numerical changes without making a diagnosis.

Example:

> "Hemoglobin increased from 11.8 g/dL to 12.1 g/dL."

Avoid:

> "Your condition has improved."

unless such a statement is explicitly supported and clinically appropriate. Prefer factual descriptions.

---

# 18. MEDICAL TIMELINE

Create a chronological timeline.

Example:

```text
September 2026
│
├── Blood Test
│
├── Prescription
│
└── Doctor Visit

June 2026
│
└── Blood Test

March 2026
│
└── Lab Report
```

Each event should link to its source.

---

# 19. AI-PATIENT-FRIENDLY SUMMARY

Generate concise summaries from structured data.

The summary should:

* Explain what information is present
* Mention notable report values
* Mention values outside source-provided reference ranges
* Mention changes over time
* Mention missing or uncertain information
* Clearly distinguish facts from AI-generated explanations

Example:

> "The latest uploaded report contains 18 laboratory measurements. Hemoglobin is listed as 12.1 g/dL, which is below the reference range shown on the report. Two values require verification because the extracted source text had low confidence."

Do NOT diagnose.

Do NOT prescribe.

Do NOT recommend treatment.

---

# 20. SEARCH & FILTER

Provide search/filter functionality for larger records.

Filters may include:

* Date
* Report type
* Test name
* Status
* Verified/unverified
* Source

Example:

```text
Search medical records...

[ All ] [ Reports ] [ Lab Results ] [ Prescriptions ]

Status:
☐ Low
☐ Normal
☐ High
☐ Needs Review

Date:
[ From ] [ To ]
```

---

# 21. DOCTOR-READY EXPORT

Allow export of a concise structured patient summary.

Export should contain:

* Patient information
* Medical history
* Allergies
* Medications
* Reports
* Lab results
* Trends
* Comparisons
* AI summary
* Verification state
* Source references

The export should be factual and traceable.

Do not include unsupported diagnoses.

---

# 22. AUTHENTICATION & PRIVACY

Implement appropriate authentication for the MVP.

Users should only access their own patient records.

Basic requirements:

* Login/signup
* Protected routes
* User-specific data
* Secure storage
* Logout
* Delete data capability where practical

Never expose one user's medical information to another user.

---

# 23. DATA MODEL

Use a normalized structure where practical.

Suggested entities:

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

Each medical data object should maintain:

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

---

# 24. AUDIT HISTORY

Important changes should be traceable.

Example:

```text
05 Sep 2026 — AI extracted Hemoglobin = 12.7
05 Sep 2026 — User changed Hemoglobin to 12.1
05 Sep 2026 — User verified Hemoglobin
```

Do not silently destroy historical information.

---

# 25. UI / UX DIRECTION

The application should look like a modern health intelligence dashboard.

Design principles:

* Clean
* Professional
* Trustworthy
* Minimal
* Accessible
* Responsive
* Easy to scan
* Data-focused

Avoid an overly flashy "AI startup" appearance.

The product should feel reliable enough for medical information review.

---

# 26. PRIMARY NAVIGATION

Recommended navigation:

```text
Dashboard
Patients / My Record
Reports
Lab Results
Timeline
Compare
Review
Settings
```

For a single-patient MVP, simplify to:

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

---

# 27. DASHBOARD

The dashboard should immediately communicate:

### Patient Overview

```text
Patient
Age: 42
Sex: Male
```

### Medical Information

```text
Reports
12

Lab Results
86

Needs Review
5

Conflicts
2
```

### Recent Activity

```text
Latest Report
Blood Test
05 Sep 2026

Latest Upload
Prescription
02 Sep 2026
```

### Quick Actions

```text
[ Upload Report ]
[ Add Patient Information ]
[ Compare Reports ]
[ Review Findings ]
```

---

# 28. REPORT PROCESSING UX

After upload:

```text
Uploading
   ↓
Reading Document
   ↓
Extracting Information
   ↓
Validating Data
   ↓
Linking Sources
   ↓
Ready for Review
```

Do not show a fake loading animation while nothing happens.

Processing states should correspond to actual application states.

---

# 29. ERROR HANDLING

The application must gracefully handle:

* Unsupported file type
* Corrupted file
* Empty document
* Poor OCR
* Missing reference range
* Unreadable result
* Ambiguous extraction
* AI/API failure
* Network failure
* Duplicate upload

Example:

```text
We couldn't confidently read this report.

You can:
[ Try Again ]
[ Upload a clearer copy ]
[ Enter information manually ]
```

Never fabricate missing information.

---

# 30. AI ARCHITECTURE

Use AI where it provides value.

Recommended responsibilities for the LLM:

### AI SHOULD:

* Extract structured information
* Interpret document layout
* Identify candidate fields
* Generate patient-friendly summaries
* Generate clarification questions
* Detect possible semantic inconsistencies

### AI SHOULD NOT:

* Determine medical diagnoses
* Prescribe treatment
* Invent reference ranges
* Change patient data without user approval
* Present uncertain extraction as fact

---

# 31. STRUCTURED AI OUTPUT

AI extraction should return strict structured JSON.

Conceptual example:

```json
{
  "patient": {
    "name": null,
    "age": null,
    "sex": null
  },
  "report": {
    "type": "lab_report",
    "date": null
  },
  "lab_results": [
    {
      "test_name": "Hemoglobin",
      "value": 12.1,
      "unit": "g/dL",
      "reference_range": {
        "raw": "13.0 - 17.0",
        "lower": 13.0,
        "upper": 17.0
      },
      "observation": null,
      "source": {
        "page": 2,
        "text": "Hemoglobin 12.1 g/dL"
      },
      "confidence": 0.96
    }
  ]
}
```

The exact schema may evolve during implementation, but structured output is mandatory.

---

# 32. EXTRACTION VALIDATION

After AI extraction:

```text
AI Extraction
      ↓
Schema Validation
      ↓
Data Type Validation
      ↓
Source Validation
      ↓
Reference Range Parsing
      ↓
Deterministic Status Calculation
      ↓
Confidence Evaluation
      ↓
Human Review
```

Reject malformed AI output.

Never blindly insert arbitrary LLM output into the database.

---

# 33. DUPLICATE DETECTION

If the same document is uploaded multiple times, detect possible duplicates.

Use:

* File hash
* File metadata
* Report date
* Report type
* Patient association

Show:

```text
Possible Duplicate

This report appears similar to a document already uploaded.

[ View Existing ]
[ Upload Anyway ]
```

---

# 34. CLARIFICATION QUESTIONS

When extraction is ambiguous, ask the user.

Example:

```text
We found two possible values for Hemoglobin.

A: 12.1 g/dL
B: 12.7 g/dL

Which value appears in the report?
```

Do not silently guess.

---

# 35. ACCESSIBILITY

The application should support:

* Keyboard navigation
* Readable typography
* Clear labels
* Sufficient contrast
* Meaningful error messages
* Screen-reader-friendly controls
* Status indicators that do not rely only on color

For example, do not communicate status only through red/green colors.

Use:

```text
LOW
NORMAL
HIGH
NEEDS REVIEW
```

---

# 36. RESPONSIVE DESIGN

Support:

* Desktop
* Tablet
* Mobile

The main dashboard should remain usable on smaller screens.

Tables should become cards or horizontally scrollable containers when necessary.

---

# 37. PERFORMANCE

Optimize for hackathon demo reliability.

Prioritize:

1. Fast initial load
2. Reliable uploads
3. Clear processing states
4. Predictable AI responses
5. Minimal unnecessary API calls
6. Efficient database queries

Do not prematurely optimize complex infrastructure.

---

# 38. DEMO MODE / SAMPLE DATA

Include sample medical data if needed for demonstrating the product without requiring a live upload.

Sample data must be clearly marked:

```text
DEMO DATA
```

Never mix demo data with real patient data.

A demo dataset should demonstrate:

* Multiple reports
* Different dates
* Normal results
* Low/high results
* Reference ranges
* Confidence differences
* Verification
* A conflict
* Historical trend
* Comparison

---

# 39. SECURITY

At minimum:

* Protect authenticated routes
* Validate uploaded files
* Limit file sizes
* Validate MIME types/extensions
* Avoid exposing API keys in frontend
* Store secrets in environment variables
* Sanitize user-generated content
* Validate API inputs
* Use server-side authorization
* Never trust patient IDs supplied directly by the client
* Prevent unauthorized record access

---

# 40. API KEY MANAGEMENT

Never hardcode secrets.

Use environment variables.

Example:

```text
AI_API_KEY=
DATABASE_URL=
AUTH_SECRET=
STORAGE_BUCKET=
```

Never commit secrets into source control.

Provide a safe `.env.example`.

---

# 41. CODE QUALITY

Generate maintainable code.

Requirements:

* Modular components
* Reusable UI components
* Clear naming
* Type safety where supported
* Centralized API utilities
* Centralized validation
* Error handling
* Environment configuration
* Minimal duplication

Avoid building the entire application in one giant component.

---

# 42. TESTING

At minimum test:

### Upload

* Valid PDF
* Valid image
* Invalid file
* Large file
* Empty file

### Extraction

* Correct test name
* Correct value
* Correct unit
* Correct reference range
* Missing reference range
* Ambiguous value

### Status

Test:

```text
Below range → LOW
Within range → NORMAL
Above range → HIGH
Missing range → UNABLE TO DETERMINE
```

### Verification

Test:

```text
AI extracted
↓
User edits
↓
User verifies
↓
Original extraction remains auditable
```

### Authorization

Verify that User A cannot access User B's records.

---

# 43. PRIORITY SYSTEM

When implementation time is limited, use this priority order.

## P0 — MUST WORK

1. Authentication
2. Patient information intake
3. Report upload
4. OCR/document processing
5. Structured extraction
6. Lab results
7. Reference range extraction
8. Deterministic LOW/NORMAL/HIGH
9. Provenance
10. Human verification
11. Dashboard
12. AI summary

## P1 — STRONGLY RECOMMENDED

13. Historical trends
14. Multi-report comparison
15. Conflict detection
16. Confidence indicators
17. Timeline
18. Search/filter
19. PDF export

## P2 — OPTIONAL

20. Prescription extraction
21. Family profiles
22. Advanced audit visualization
23. Advanced source highlighting
24. General AI assistant
25. Advanced analytics

Do NOT sacrifice P0 functionality to build P2 features.

---

# 44. WHAT NOT TO BUILD

Unless all core functionality is stable, do NOT spend time on:

* Appointment booking
* Online pharmacy
* Medicine reminders
* Vaccination tracking
* Fitness tracking
* Diet plans
* Symptom diagnosis
* Disease prediction
* Treatment recommendations
* Drug interaction recommendations
* Insurance management
* Social/community features

---

# 45. RECOMMENDED TECHNICAL ARCHITECTURE

Use a modern full-stack architecture.

Conceptual structure:

```text
Frontend
   │
   ▼
Backend/API
   │
   ├── Authentication
   ├── Patient Management
   ├── Document Management
   ├── AI Extraction
   ├── Validation
   ├── Provenance
   ├── Comparison
   └── Export
   │
   ▼
Database
   │
   ├── Users
   ├── Patients
   ├── Documents
   ├── Lab Results
   ├── Prescriptions
   ├── Verification
   ├── Conflicts
   └── Audit Events
```

The exact framework can be selected based on the Antigravity environment and available integrations.

Prefer technologies that maximize:

* Development speed
* Reliability
* Type safety
* Deployment simplicity
* AI integration
* Database simplicity

---

# 46. FOLDER STRUCTURE

Maintain a clean structure similar to:

```text
src/
├── app/
├── components/
│   ├── ui/
│   ├── dashboard/
│   ├── reports/
│   ├── lab-results/
│   ├── timeline/
│   └── review/
├── features/
│   ├── auth/
│   ├── patients/
│   ├── documents/
│   ├── extraction/
│   ├── verification/
│   ├── comparison/
│   └── summaries/
├── lib/
│   ├── ai/
│   ├── validation/
│   ├── provenance/
│   └── utilities/
├── types/
└── styles/
```

Adapt this to the chosen framework.

---

# 47. BUILD ORDER

Antigravity should implement in this order:

## Phase 1 — Foundation

* Project initialization
* UI system
* Routing
* Authentication
* Database
* Environment configuration

## Phase 2 — Patient Record

* Patient creation
* Patient information form
* Patient dashboard

## Phase 3 — Document Upload

* File uploader
* Storage
* Document list
* Document viewer

## Phase 4 — AI Extraction

* OCR
* AI extraction
* Structured JSON
* Schema validation
* Database persistence

## Phase 5 — Validation

* Reference range extraction
* Deterministic status calculation
* Confidence
* Conflict detection

## Phase 6 — Human Verification

* Review interface
* Edit fields
* Verify/reject
* Audit history

## Phase 7 — Intelligence

* Trends
* Comparison
* Timeline
* AI summary

## Phase 8 — Export & Polish

* PDF export
* Search
* Filters
* Responsive UI
* Accessibility
* Loading/error states

## Phase 9 — Demo Hardening

* Seed demo data
* Test complete workflow
* Fix critical bugs
* Improve UX
* Verify safety constraints

---

# 48. END-TO-END ACCEPTANCE TEST

The application should pass this complete scenario.

### Step 1

User signs in.

### Step 2

User creates/selects a patient.

### Step 3

User enters:

```text
Age
Sex
Symptoms
Conditions
Allergies
Medications
```

### Step 4

User uploads a medical report.

### Step 5

MedLens processes the document.

### Step 6

The system extracts:

```text
Test
Value
Unit
Reference Range
Date
Observation
Source
Confidence
```

### Step 7

The system calculates:

```text
LOW / NORMAL / HIGH
```

using ONLY the reference range extracted from the report.

### Step 8

The extracted data appears in a structured dashboard.

### Step 9

Each field shows provenance.

### Step 10

The user reviews low-confidence fields.

### Step 11

The user edits one incorrect extraction.

### Step 12

The corrected field becomes human verified.

### Step 13

The original extraction remains available in audit history.

### Step 14

The user uploads an older report.

### Step 15

MedLens compares the two reports.

### Step 16

A historical trend is displayed.

### Step 17

MedLens detects any conflicting information.

### Step 18

MedLens generates a patient-friendly factual summary.

### Step 19

The user exports a doctor-ready PDF.

This is the target MVP demonstration.

---

# 49. IDEAL HACKATHON DEMO

The demo should take approximately 3–5 minutes.

Recommended flow:

```text
1. Login
      ↓
2. Show patient dashboard
      ↓
3. Upload medical report
      ↓
4. Show AI extraction
      ↓
5. Show source-linked structured data
      ↓
6. Show reference-range status
      ↓
7. Show confidence indicators
      ↓
8. Correct one AI extraction
      ↓
9. Verify the field
      ↓
10. Upload previous report
      ↓
11. Show comparison/trend
      ↓
12. Show conflict detection
      ↓
13. Generate AI summary
      ↓
14. Export doctor-ready record
```

---

# 50. THE "WOW" MOMENT

The strongest demonstration should be:

## Source → Structured → Verified

Show the original medical report beside the structured record.

Example:

```text
┌────────────────────────┬────────────────────────────┐
│ ORIGINAL REPORT        │ MEDLENS RECORD             │
│                        │                            │
│ Hemoglobin 12.1 g/dL  │ Hemoglobin                 │
│ Ref: 13–17 g/dL       │ 12.1 g/dL                  │
│                        │ LOW                        │
│                        │                            │
│                        │ Source: Page 2             │
│                        │ Confidence: 96%            │
│                        │ Status: VERIFIED            │
└────────────────────────┴────────────────────────────┘
```

This demonstrates that MedLens is not simply a chatbot.

It is an information intelligence and verification system.

---

# 51. PRODUCT DIFFERENTIATION

MedLens should differentiate itself through:

### 1. Traceability

Every extracted fact can be traced to a source.

### 2. Human Verification

Users can correct AI output before trusting the structured record.

### 3. Source-Aware Reference Ranges

Reference ranges come from the uploaded report.

### 4. Historical Intelligence

Multiple reports become a longitudinal record.

### 5. Conflict Detection

The system surfaces inconsistent information.

### 6. Structured Record

The output is a usable medical record, not just AI-generated text.

---

# 52. AI PROMPTING RULES

All AI prompts should emphasize:

```text
You are extracting and organizing medical information.

Do not diagnose.
Do not prescribe.
Do not recommend treatment.
Do not invent values.
Do not invent reference ranges.
Do not infer missing information as fact.

If information is unavailable:
return null.

If information is ambiguous:
flag it for verification.

Always preserve source information.
```

---

# 53. UNKNOWN / MISSING DATA POLICY

Use explicit states.

Never replace missing information with guesses.

Examples:

```text
Not available
Not provided
Unable to determine
Needs verification
```

Avoid:

```text
Probably normal
Likely 42
Estimated reference range
Probably diabetes
```

---

# 54. SOURCE PRIORITY

When information appears in multiple places, preserve all sources.

Do not automatically assume one source is correct.

Example:

```text
Source A:
Age = 42

Source B:
Age = 44

Result:
⚠ Conflict detected
```

Allow human verification.

---

# 55. GENERAL AI CHAT

A general medical chatbot is NOT a core feature.

If implemented, it must be constrained to the patient's available structured information.

It should answer questions such as:

> "What was my latest hemoglobin value?"

or:

> "Which reports contain glucose results?"

It should NOT answer:

> "What disease do I have?"

or:

> "What medicine should I take?"

---

# 56. DESIGN LANGUAGE

Use a restrained professional visual language.

Recommended characteristics:

* Light interface
* White/card surfaces
* Neutral backgrounds
* Strong typography hierarchy
* Subtle borders
* Moderate corner radius
* Clear status badges
* Consistent spacing
* Minimal animation

Use color carefully.

Never rely solely on red/green.

---

# 57. EMPTY STATES

Every major section needs a useful empty state.

Example:

```text
No medical reports yet.

Upload your first report to begin building your structured medical record.

[ Upload Report ]
```

Avoid blank screens.

---

# 58. LOADING STATES

Use meaningful states.

Instead of:

```text
Loading...
```

show:

```text
Reading document...
Extracting medical information...
Validating extracted values...
Preparing your record...
```

Only display states that correspond to actual processing.

---

# 59. FAILURE PHILOSOPHY

When AI fails, fail safely.

Bad:

```text
We couldn't read this value, so we estimated it.
```

Good:

```text
This value could not be confidently extracted.

[ Review Source ]
[ Enter Manually ]
[ Retry ]
```

---

# 60. FINAL QUALITY BAR

Before considering the application complete, verify:

### Functional

* [ ] User can authenticate
* [ ] User can create/access patient record
* [ ] User can enter patient information
* [ ] User can upload medical documents
* [ ] Documents are stored securely
* [ ] AI/OCR extraction works
* [ ] Structured records are generated
* [ ] Reference ranges are extracted
* [ ] LOW/NORMAL/HIGH is deterministic
* [ ] Missing ranges remain undetermined
* [ ] Provenance is visible
* [ ] Confidence is visible
* [ ] Human verification works
* [ ] Conflicts are detected
* [ ] Historical comparison works
* [ ] Trends work
* [ ] AI summary works safely
* [ ] PDF export works

### Safety

* [ ] No diagnosis generation
* [ ] No treatment recommendations
* [ ] No medication prescribing
* [ ] No invented medical values
* [ ] No invented reference ranges
* [ ] Uncertainty is clearly represented
* [ ] AI extraction can be corrected

### Security

* [ ] Secrets are not hardcoded
* [ ] API keys remain server-side
* [ ] Authentication protects data
* [ ] Authorization prevents cross-user access
* [ ] Uploaded files are validated

### UX

* [ ] Responsive
* [ ] Accessible
* [ ] Clear loading states
* [ ] Clear errors
* [ ] Useful empty states
* [ ] Consistent visual language
* [ ] Easy-to-understand terminology

---

# 61. FINAL INSTRUCTION TO ANTIGRAVITY

Build MedLens as a **real, working, end-to-end application**.

Do not create a static prototype disguised as a functional application.

Prioritize:

```text
FUNCTIONALITY
    >
DATA INTEGRITY
    >
SAFETY
    >
TRACEABILITY
    >
USABILITY
    >
VISUAL POLISH
```

When forced to choose between adding another feature and making an existing feature reliable, make the existing feature reliable.

When AI is uncertain, expose uncertainty.

When data is missing, do not guess.

When data conflicts, surface the conflict.

When a value comes from a document, preserve its source.

When a human corrects AI output, preserve the original extraction and record the correction.

When generating medical summaries, remain factual and non-diagnostic.

The goal is not to build the largest healthcare application.

The goal is to build the **most convincing implementation of the MedLens problem statement**.

---

# 62. ONE-LINE PRODUCT DEFINITION

> **MedLens is an AI-powered clinical information intelligence platform that converts fragmented medical documents and patient information into a structured, source-traceable, human-verified longitudinal medical record.**

---

# 63. CORE SYSTEM PRINCIPLE

```text
                    MEDLENS
                       │
                       ▼
              ┌─────────────────┐
              │ Medical Sources │
              └────────┬────────┘
                       │
                       ▼
                OCR / AI Extract
                       │
                       ▼
              ┌─────────────────┐
              │ Structured Data │
              └───────┬─────────┘
                      │
          ┌───────────┼────────────┐
          ▼           ▼            ▼
     Provenance   Validation   Confidence
          │           │            │
          └───────────┼────────────┘
                      ▼
               Human Verification
                      │
          ┌───────────┼────────────┐
          ▼           ▼            ▼
      Dashboard     Trends      Compare
          │           │            │
          └───────────┼────────────┘
                      ▼
                Patient Summary
                      │
                      ▼
                Doctor-Ready Export
```

**Build this system around trust, traceability, structure, and verification — not around AI novelty alone.**

