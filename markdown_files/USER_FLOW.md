# MedLens — User Flow

## 1. Overview

MedLens converts fragmented patient information and medical documents into a **structured, source-traceable, human-verified longitudinal medical record**.

The primary user journey is:

```text
LOGIN
  ↓
PATIENT
  ↓
PATIENT INFORMATION
  ↓
UPLOAD DOCUMENT
  ↓
AI / OCR PROCESSING
  ↓
STRUCTURED EXTRACTION
  ↓
VALIDATION
  ↓
HUMAN REVIEW
  ↓
VERIFICATION
  ↓
MEDICAL DASHBOARD
  ↓
COMPARE / TREND / TIMELINE
  ↓
AI SUMMARY
  ↓
EXPORT
```

The user should always understand:

* What MedLens is doing.
* What information came from the source.
* What was extracted by AI.
* What still needs verification.
* What has been human verified.
* What MedLens can and cannot conclude.

---

# 2. Primary User Journey

## Step 1 — Landing Page

The user opens MedLens.

### Landing page should communicate

**Product name:**

> MedLens

**Primary message:**

> Turn medical documents into a structured, traceable health record.

**Supporting message:**

> Upload reports, extract medical information, verify the results, compare history, and understand your records in one place.

### Primary actions

```text
[Get Started]
[Sign In]
```

### Safety messaging

A short statement should clarify:

> MedLens organizes and explains medical information. It does not provide diagnosis or treatment decisions.

---

# 3. Step 2 — Authentication

The user selects **Get Started** or **Sign In**.

### New user

```text
Landing Page
     ↓
Sign Up
     ↓
Create Account
     ↓
Login
     ↓
Dashboard
```

### Existing user

```text
Landing Page
     ↓
Sign In
     ↓
Dashboard
```

### Requirements

* Email/password or supported authentication provider.
* Secure session.
* Protected routes.
* Invalid credentials handled clearly.
* Logout available from the application.

---

# 4. Step 3 — Dashboard

After authentication, the user reaches the main dashboard.

### Dashboard structure

```text
┌────────────────────────────────────────────────────┐
│ MedLens                              Profile       │
├──────────────┬─────────────────────────────────────┤
│ Dashboard    │                                     │
│ Medical      │ Patient Overview                    │
│ Record       │                                     │
│ Reports      │ Recent Results                      │
│ Lab Results  │                                     │
│ Timeline     │ Pending Reviews                     │
│ Compare      │ Recent Reports                     │
│ Review       │                                     │
│ Settings     │ Trends                              │
└──────────────┴─────────────────────────────────────┘
```

### If no patient exists

Display:

> Create your first patient record to get started.

```text
[Create Patient]
```

### If a patient already exists

Display:

* Patient overview.
* Recent reports.
* Pending reviews.
* Recent laboratory results.
* Trends.
* Timeline events.

---

# 5. Step 4 — Create Patient

The user selects:

```text
[Create Patient]
```

The application opens the patient information form.

## Required fields

* Name
* Age/date of birth
* Sex

## Optional fields

* Symptoms
* Existing conditions
* Allergies
* Current medications
* Medical history
* Additional notes

### Save flow

```text
Enter Information
       ↓
Validate Form
       ↓
Save Patient
       ↓
Patient Record Created
       ↓
Patient Dashboard
```

### Data origin

All manually entered information must be tagged:

```text
Origin: USER_PROVIDED
```

---

# 6. Step 5 — Patient Overview

Once the patient is created, the user enters the patient workspace.

### Patient workspace

```text
Patient Name
Age | Sex

────────────────────────────

Overview
Reports
Lab Results
Timeline
Compare
Review
```

The patient workspace is the central location for all information associated with that patient.

---

# 7. Step 6 — Upload Medical Report

The user selects:

```text
[Upload Report]
```

### Upload screen

Provide:

* Drag-and-drop zone.
* File picker.
* Supported format information.
* Upload instructions.

Example:

```text
┌────────────────────────────────────────┐
│                                        │
│       Drop medical report here         │
│                 or                     │
│          [Choose File]                 │
│                                        │
│   PDF, JPG, JPEG, PNG supported        │
│                                        │
└────────────────────────────────────────┘
```

### User selects file

```text
Select File
    ↓
Validate File
    ↓
Upload
```

If invalid:

```text
Upload Failed

This file type is not supported.

[Try Another File]
```

---

# 8. Step 7 — Document Processing

After successful upload, MedLens begins processing.

The user should see a real processing state.

### Processing flow

```text
Uploaded
   ↓
Reading Document
   ↓
OCR Processing
   ↓
AI Extraction
   ↓
Schema Validation
   ↓
Reference Range Processing
   ↓
Provenance Assignment
   ↓
Ready for Review
```

### Example UI

```text
Processing your report...

✓ Document uploaded
✓ Reading document
✓ Extracting medical information
✓ Validating extracted data
○ Preparing review

Please wait...
```

The application must not fabricate progress.

The UI state should correspond to actual processing operations.

---

# 9. Step 8 — AI / OCR Extraction

The extraction engine identifies available information.

### Example extracted information

```text
Patient:
John Doe

Report:
Complete Blood Count

Date:
05 Sep 2026

Laboratory Results:

Hemoglobin
12.1 g/dL
Reference: 13–17 g/dL

WBC
7,200 /µL
Reference: 4,000–11,000 /µL

Platelets
250,000 /µL
Reference: 150,000–450,000 /µL
```

Each extracted field should receive metadata.

Example:

```text
Origin: AI_EXTRACTED
Confidence: 96%
Verification: NEEDS_REVIEW
Source: Blood Report — Page 1
```

---

# 10. Step 9 — Structured Extraction Review

After processing, the user enters the review screen.

### Recommended layout

```text
┌─────────────────────────┬──────────────────────────┐
│ SOURCE DOCUMENT         │ EXTRACTED INFORMATION   │
│                         │                          │
│ Original report         │ Patient                  │
│                         │ Name: John Doe           │
│ Hemoglobin 12.1 g/dL    │                          │
│ Ref: 13–17 g/dL         │ Hemoglobin               │
│                         │ 12.1 g/dL                │
│                         │ LOW                      │
│                         │                          │
│                         │ [Edit] [Verify]          │
└─────────────────────────┴──────────────────────────┘
```

The user should be able to inspect the original source while reviewing extracted data.

---

# 11. Step 10 — Reference Range Evaluation

MedLens evaluates laboratory values using the reference range found in the source report.

### Example

```text
Value:
12.1 g/dL

Source Range:
13–17 g/dL

Deterministic Evaluation:

12.1 < 13

Result:
LOW
```

### Result display

```text
Hemoglobin

12.1 g/dL

LOW

Reference Range
13–17 g/dL

Source
Blood Report — Page 1
```

### If no reference range exists

```text
Hemoglobin

12.1 g/dL

Status:
Unable to determine

Reason:
No usable reference range was found in the source report.
```

The system must never substitute an invented or generic reference range.

---

# 12. Step 11 — Human Verification

The user reviews extracted fields.

For each field:

```text
[Edit]
[Verify]
[Reject]
```

### Example

```text
Hemoglobin
12.1 g/dL

AI Confidence: 96%
Source: Page 1
Status: Needs Review

[Edit] [Verify]
```

If correct:

```text
Verify
  ↓
VERIFIED
```

If incorrect:

```text
Edit
  ↓
Correct Value
  ↓
Save
  ↓
Verify
```

---

# 13. Step 12 — Correction Flow

If the AI extracted an incorrect value:

```text
Original AI Extraction
        ↓
User Identifies Error
        ↓
Edit Field
        ↓
Save Correction
        ↓
Original Extraction Preserved
        ↓
Corrected Value Stored
        ↓
Human Verification
```

### Example

```text
AI extracted:
Creatinine = 1.8 mg/dL

User sees source:
Creatinine = 1.3 mg/dL

User edits:

1.8 → 1.3

Record:
Original AI value: 1.8
Corrected value: 1.3
Verification: VERIFIED
```

The original AI extraction must remain available in the audit history.

---

# 14. Step 13 — Source Traceability

Every important extracted field should be traceable to its source.

When the user selects:

```text
Hemoglobin — 12.1 g/dL
```

MedLens should show:

```text
Source Document:
CBC_Report.pdf

Page:
1

Source Text:
Hemoglobin 12.1 g/dL

Origin:
AI_EXTRACTED

Confidence:
96%

Verification:
VERIFIED
```

Where technically feasible, the original source text should be highlighted.

---

# 15. Step 14 — Review Completion

After reviewing all important fields:

```text
[Complete Review]
```

MedLens displays a review summary.

Example:

```text
Review Complete

24 results extracted
22 verified
1 corrected
1 requires review

Potential conflicts:
2

[Save Record]
```

The user can either:

```text
[Save Verified Record]
```

or:

```text
[Continue Review]
```

---

# 16. Step 15 — Updated Medical Dashboard

Once the report is saved, the patient's dashboard updates automatically.

### Dashboard may show

```text
Latest Report
CBC — 05 Sep 2026

24 Results

LOW
3

NORMAL
18

HIGH
2

Unable to Determine
1

Needs Review
1
```

The dashboard should also show:

* Recent reports.
* Pending verification.
* Important trends.
* Recent timeline events.

---

# 17. Step 16 — Lab Results

The user selects:

```text
Lab Results
```

The application displays structured laboratory data.

### Example

| Test       |       Value |           Range | Status | Verification |
| ---------- | ----------: | --------------: | ------ | ------------ |
| Hemoglobin |   12.1 g/dL |           13–17 | LOW    | Verified     |
| WBC        |   7,200 /µL |    4,000–11,000 | NORMAL | Verified     |
| Platelets  | 250,000 /µL | 150,000–450,000 | NORMAL | Verified     |

Users can filter by:

* Test
* Date
* Status
* Verification
* Report

---

# 18. Step 17 — Historical Trends

When multiple reports contain the same test, MedLens can display historical values.

### User flow

```text
Lab Results
    ↓
Select Test
    ↓
View History
    ↓
Trend Chart
```

Example:

```text
Hemoglobin

13.0 ┤             ●
12.8 ┤          ●
12.6 ┤
12.4 ┤       ●
12.2 ┤
12.0 ┤    ●
     └────────────────
       Jun Jul Aug Sep
```

The chart should show:

* Date
* Value
* Unit
* Source report

The system should describe the trend without diagnosing its cause.

---

# 19. Step 18 — Compare Reports

The user selects:

```text
Compare
```

They choose:

```text
Previous Report
Current Report
```

MedLens displays a comparison.

### Example

```text
CBC

                  Previous       Current

Hemoglobin         11.8           12.1
WBC                7,100          7,200
Platelets          245,000        250,000
```

### Change

```text
Hemoglobin
11.8 → 12.1
Change: +0.3 g/dL
```

The comparison must retain the dates and source documents.

---

# 20. Step 19 — Conflict Detection

If MedLens identifies potentially conflicting information, the user should see a clear warning.

### Example

```text
⚠ Potential Conflict

Patient Profile:
Allergy — Penicillin

Medical Report:
Allergies — None reported

MedLens cannot determine which source is correct.

[View Sources]
[Review]
```

The system must not automatically select a "correct" source.

---

# 21. Step 20 — Medical Timeline

The user selects:

```text
Timeline
```

The system displays events chronologically.

### Example

```text
05 Sep 2026
│
├── CBC Report Uploaded
├── 24 Lab Results Extracted
├── 22 Results Verified
└── 2 Results Need Review
│
20 Aug 2026
│
└── Previous CBC Report
│
10 Aug 2026
│
└── Prescription Uploaded
```

Each event should link to its source.

---

# 22. Step 21 — AI Summary

The user selects:

```text
[Generate Summary]
```

MedLens generates a factual summary based on available structured data.

### Example

```text
Report Summary

Your latest report contains 24 laboratory results.

3 results are marked LOW according to the reference
ranges provided in the report.

2 results are marked HIGH.

1 result could not be classified because a usable
reference range was not available.

22 results have been verified.

2 results still require review.
```

The summary must not provide diagnosis or treatment recommendations.

---

# 23. Step 22 — Search and Filter

The user can search the medical record.

Example:

```text
Search:
"hemoglobin"
```

Results:

```text
Hemoglobin — 05 Sep 2026
Hemoglobin — 20 Aug 2026
Hemoglobin — 12 Jul 2026
```

Filters:

```text
Date
Report Type
Test
Status
Verification
```

---

# 24. Step 23 — Export

The user selects:

```text
[Export Medical Record]
```

Options may include:

```text
[Generate PDF]
```

The generated record should contain:

* Patient information.
* Relevant medical history.
* Laboratory results.
* Reference ranges.
* Status.
* Verification status.
* Trends.
* Comparisons.
* AI summary.
* Source information.

The export should clearly distinguish AI-generated content from verified medical information.

---

# 25. Step 24 — Settings

The user can manage:

* Account information.
* Security.
* Privacy.
* Data preferences.
* Application settings.
* Logout.

Where supported, provide controls for:

* Data deletion.
* Session management.
* Account deletion.

---

# 26. Error and Recovery Flows

## Upload Failure

```text
Upload
 ↓
Failure
 ↓
Explain Problem
 ↓
Retry
```

Example:

> We couldn't upload this file. Please check the file type and try again.

---

## OCR Failure

```text
Upload
 ↓
OCR Failure
 ↓
Show Error
 ↓
Allow Retry / Manual Review
```

Example:

> We couldn't reliably read this document. Try uploading a clearer image.

---

## AI Extraction Failure

```text
Document
 ↓
Extraction Failure
 ↓
Do Not Create Data
 ↓
Allow Retry
```

No fabricated data should be stored.

---

## Missing Reference Range

```text
Extract Result
      ↓
No Reference Range
      ↓
Status = Unable to Determine
```

Never invent a range.

---

## Ambiguous Extraction

```text
AI Extraction
      ↓
Low Confidence
      ↓
Needs Review
      ↓
Human Verification
```

---

# 27. Empty States

Every major page should have a useful empty state.

## No Patients

```text
No patient records yet.

Create a patient to start organizing medical information.

[Create Patient]
```

## No Reports

```text
No medical reports uploaded yet.

Upload your first report to start building the record.

[Upload Report]
```

## No Trends

```text
Not enough historical data yet.

Upload another report containing the same test
to see its trend.
```

## No Conflicts

```text
✓ No potential conflicts detected.
```

## No Pending Reviews

```text
✓ All extracted information has been reviewed.
```

---

# 28. Navigation Flow

Primary application navigation:

```text
Dashboard
   │
   ├── Medical Record
   │      ├── Patient Information
   │      ├── Conditions
   │      ├── Allergies
   │      └── Medications
   │
   ├── Reports
   │      ├── Upload
   │      ├── Report Details
   │      └── Source View
   │
   ├── Lab Results
   │      ├── All Results
   │      ├── Filters
   │      └── Trends
   │
   ├── Timeline
   │
   ├── Compare
   │
   ├── Review
   │
   └── Settings
```

---

# 29. Core Information Flow

The application should maintain this conceptual data flow:

```text
USER INPUT
    │
    ├───────────────┐
    │               │
    ▼               ▼
Patient Info    Medical Documents
    │               │
    │               ▼
    │          OCR / AI
    │               │
    │               ▼
    │       Structured Extraction
    │               │
    └───────┬───────┘
            ▼
      VALIDATION
            │
     ┌──────┴──────┐
     ▼             ▼
Provenance    Reference Range
     │             │
     │             ▼
     │       Deterministic Status
     │             │
     └──────┬──────┘
            ▼
      HUMAN REVIEW
            │
      ┌─────┴─────┐
      ▼           ▼
   Correct      Verify
      │           │
      └─────┬─────┘
            ▼
      VERIFIED RECORD
            │
      ┌─────┼───────────┐
      ▼     ▼           ▼
 Dashboard Trends     Compare
      │
      ▼
   AI Summary
      │
      ▼
    Export
```

---

# 30. Data Provenance Flow

Every important medical field should follow:

```text
SOURCE
  ↓
AI EXTRACTION
  ↓
CONFIDENCE
  ↓
VALIDATION
  ↓
HUMAN REVIEW
  ↓
VERIFICATION
  ↓
STRUCTURED RECORD
```

Example:

```text
Source PDF
   ↓
"Hemoglobin 12.1 g/dL"
   ↓
AI Extracted
   ↓
Confidence 96%
   ↓
Reference Range 13–17 g/dL
   ↓
Deterministic Status = LOW
   ↓
Human Verification
   ↓
Verified Record
```

---

# 31. User State Model

A user may be in one of the following states:

```text
UNAUTHENTICATED
      ↓
AUTHENTICATED
      ↓
NO_PATIENT
      ↓
PATIENT_CREATED
      ↓
DOCUMENT_UPLOADED
      ↓
DOCUMENT_PROCESSING
      ↓
DOCUMENT_READY_FOR_REVIEW
      ↓
REVIEW_IN_PROGRESS
      ↓
VERIFIED_RECORD
      ↓
LONGITUDINAL_RECORD
```

Users can return to the patient record at any time after authentication.

---

# 32. Document State Model

Every document should have a clear processing state:

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

Failure path:

```text
ANY PROCESSING STATE
        ↓
PROCESSING_FAILED
        ↓
RETRY / MANUAL REVIEW
```

---

# 33. Verification State Model

Each extracted field may follow:

```text
AI_EXTRACTED
      ↓
NEEDS_REVIEW
      │
 ┌────┴─────┐
 ▼          ▼
VERIFIED   REJECTED
```

Correction path:

```text
AI_EXTRACTED
      ↓
HUMAN_CORRECTED
      ↓
VERIFIED
```

The original AI extraction must remain auditable.

---

# 34. Ideal First-Time User Flow

The fastest successful first-time experience should be:

```text
Landing Page
     ↓
Sign Up
     ↓
Create Patient
     ↓
Enter Basic Information
     ↓
Upload Medical Report
     ↓
Wait for Processing
     ↓
Review Extracted Results
     ↓
Verify / Correct
     ↓
View Dashboard
     ↓
View Source Evidence
     ↓
Generate Summary
```

The user should be able to experience the core value of MedLens without navigating through unnecessary screens.

---

# 35. Ideal Returning User Flow

```text
Login
 ↓
Dashboard
 ↓
Select Patient
 ↓
View Latest Information
 ↓
Review Pending Items
 ↓
Upload New Report
 ↓
Compare With History
 ↓
View Trends
 ↓
Update Verified Record
 ↓
Export / Share Record
```

---

# 36. Recommended Hackathon Demo Flow

The live demonstration should prioritize the most impressive and defensible functionality.

### 3–5 Minute Demo

```text
1. Login
      ↓
2. Open/Create Patient
      ↓
3. Show patient information
      ↓
4. Upload sample medical report
      ↓
5. Show real processing
      ↓
6. Display extracted structured data
      ↓
7. Show LOW/NORMAL/HIGH based on source range
      ↓
8. Click a result
      ↓
9. Show exact source evidence
      ↓
10. Correct one intentionally incorrect extraction
      ↓
11. Verify it
      ↓
12. Show updated dashboard
      ↓
13. Open previous report
      ↓
14. Show comparison/trend
      ↓
15. Show AI summary
      ↓
16. Export doctor-ready PDF
```

---

# 37. Primary Demo "Wow" Moment

The most important interaction should demonstrate:

```text
SOURCE DOCUMENT
      ↓
EXTRACTED FIELD
      ↓
SOURCE REFERENCE RANGE
      ↓
DETERMINISTIC STATUS
      ↓
CONFIDENCE
      ↓
HUMAN VERIFICATION
      ↓
TRUSTED RECORD
```

For example:

```text
┌──────────────────────┐
│ Original Report      │
│                      │
│ Hemoglobin: 12.1     │
│ Reference: 13–17     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ MedLens Record       │
│                      │
│ Hemoglobin           │
│ 12.1 g/dL            │
│ LOW                  │
│                      │
│ Source: Page 1       │
│ AI Confidence: 96%   │
│ ✓ Human Verified     │
└──────────────────────┘
```

This should communicate the fundamental MedLens advantage:

> **MedLens does not merely summarize a report. It creates a traceable and verifiable structured record.**

---

# 38. Safety-Critical UX Rules

The interface must consistently reinforce the following principles:

### Rule 1 — Source Before Interpretation

Show source data before AI-generated explanations.

### Rule 2 — Verification Before Trust

Unverified extraction should visibly remain:

```text
Needs Review
```

### Rule 3 — No Hidden AI Changes

AI must not silently modify existing patient data.

### Rule 4 — No Invented Medical Information

Missing information should remain missing.

### Rule 5 — No Diagnostic Language

Use factual descriptions instead of diagnostic conclusions.

### Rule 6 — No Treatment Advice

The system must not recommend medications, treatments, or dosage changes.

---

# 39. Final UX Principle

The entire MedLens user experience should communicate:

```text
"I can see what was found."
        ↓
"I can see where it came from."
        ↓
"I can verify or correct it."
        ↓
"I can see how it relates to previous records."
        ↓
"I can understand the organized information."
```

The product should feel like a **trusted clinical information workspace**, not a generic AI chatbot.

---

# 40. Final User Flow Definition

The complete MedLens experience is:

> **Capture → Upload → Extract → Structure → Validate → Trace → Review → Verify → Compare → Understand → Export**

The user remains in control of the medical record at every important step, while AI assists with document understanding, organization, and summarization.

The core principle is:

> **AI extracts. Software validates. Humans verify. MedLens organizes.**
