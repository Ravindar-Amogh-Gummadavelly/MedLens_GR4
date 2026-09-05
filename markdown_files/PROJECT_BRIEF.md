# MedLens — Project Brief

> **Project Name:** MedLens
> **Tagline:** AI-Powered Clinical Information Intelligence
> **Project Type:** Healthcare Information Management / AI Application
> **Target:** Hackathon MVP
> **Development Environment:** Antigravity

---

# 1. EXECUTIVE SUMMARY

Medical information is often scattered across:

* Patient history
* Laboratory reports
* Prescriptions
* Diagnostic documents
* Previous medical records
* Manually provided patient information

This makes it difficult for patients and healthcare professionals to quickly understand what information exists, where it came from, how it has changed over time, and which information may require verification.

**MedLens** solves this problem by using AI and OCR to transform fragmented medical documents and patient-provided information into a structured, traceable, human-verified medical record.

MedLens does not attempt to diagnose patients or replace healthcare professionals.

Instead, it acts as an **information intelligence layer** between raw medical documents and a usable patient record.

---

# 2. THE PROBLEM

Medical information is frequently stored in disconnected formats.

For example, a patient may have:

```text
Blood Test PDF
Prescription Image
Old Lab Report
Doctor Notes
Patient's Own Medical History
```

Each document may contain different pieces of information.

The user is forced to manually:

* Read documents
* Find relevant values
* Understand units
* Locate reference ranges
* Compare old and new reports
* Remember previous medical information
* Identify conflicting information
* Prepare information for a doctor

This process is time-consuming and error-prone.

---

# 3. THE SOLUTION

MedLens provides a single structured environment where users can:

1. Enter patient information
2. Upload medical documents
3. Extract relevant information using AI/OCR
4. Convert extracted information into structured records
5. Preserve source and provenance
6. Detect possible conflicts
7. Review and correct AI extraction
8. Track medical information over time
9. Compare reports
10. Generate a concise patient-friendly summary
11. Export a doctor-ready record

---

# 4. CORE VALUE PROPOSITION

> **MedLens turns fragmented medical documents into a structured, traceable, and human-verified patient record.**

The key value is not simply "AI reads a medical report."

The real value is:

```text
RAW DOCUMENTS
      ↓
STRUCTURED INFORMATION
      ↓
SOURCE TRACEABILITY
      ↓
HUMAN VERIFICATION
      ↓
LONGITUDINAL RECORD
```

---

# 5. TARGET USERS

## Primary User

Patients or authorized users who want to organize their medical information.

Typical use cases:

* Uploading lab reports
* Maintaining medical history
* Reviewing previous results
* Understanding report information
* Preparing for a doctor consultation

## Secondary User

Healthcare professionals reviewing information shared by a patient.

MedLens should make the information easier to review without pretending to provide clinical decision-making.

---

# 6. PRODUCT SCOPE

MedLens focuses on **clinical information organization and understanding**.

### In Scope

* Patient information
* Medical reports
* Laboratory results
* Prescriptions
* Medical history
* Source tracking
* Reference ranges
* Extraction confidence
* Verification
* Conflicts
* Trends
* Report comparison
* Timeline
* AI summaries
* PDF export

### Out of Scope

* Diagnosis
* Treatment recommendations
* Medication prescribing
* Medication dosage changes
* Clinical decision-making
* Appointment booking
* Pharmacy
* Insurance
* Fitness tracking
* General wellness platform functionality

---

# 7. CORE FEATURES

## 7.1 Patient Information Intake

Users can manually enter:

* Age
* Sex
* Symptoms
* Existing conditions
* Allergies
* Medications
* Relevant medical history
* Additional notes

Manually entered information must be labeled as:

```text
USER PROVIDED
```

---

## 7.2 Medical Document Upload

Users can upload:

* PDF reports
* JPG/JPEG images
* PNG images
* Scanned medical documents
* Lab reports
* Prescriptions

The upload experience should be simple and clear.

---

## 7.3 AI/OCR Extraction

MedLens extracts structured information such as:

```text
Test Name
Result
Unit
Reference Range
Date
Observation
Patient Information
Doctor
Laboratory/Hospital
```

For prescriptions:

```text
Medicine
Strength
Frequency
Duration
Instructions
Doctor
Date
```

Extraction must preserve uncertainty.

---

# 8. STRUCTURED MEDICAL RECORD

Raw AI responses must never be treated as the medical record.

Extracted information must be converted into structured entities.

Example:

```text
Patient
│
├── Demographics
├── Symptoms
├── Conditions
├── Allergies
├── Medications
│
├── Medical Documents
│
├── Laboratory Results
│
├── Prescriptions
│
├── Timeline
│
└── Summaries
```

---

# 9. REFERENCE-RANGE AWARENESS

Reference ranges are important for laboratory results.

MedLens must use the reference range shown in the uploaded source report.

Example:

```text
Hemoglobin
Result: 12.1 g/dL
Reference Range: 13.0–17.0 g/dL

Status: LOW
```

The LOW/NORMAL/HIGH status must be calculated by application logic.

The AI must not invent or independently select reference ranges.

If no reference range is present:

```text
Status: Unable to determine
```

---

# 10. SOURCE & PROVENANCE

Every important medical fact should answer:

> "Where did this information come from?"

Possible origins:

```text
USER_PROVIDED
AI_EXTRACTED
AI_GENERATED
HUMAN_VERIFIED
```

Example:

```text
Hemoglobin: 12.1 g/dL

Source:
Blood_Report.pdf — Page 2

Origin:
AI Extracted

Confidence:
96%

Verification:
Verified
```

This creates trust and transparency.

---

# 11. HUMAN-IN-THE-LOOP VERIFICATION

AI extraction can contain errors.

Therefore, MedLens must provide a review workflow.

```text
AI Extraction
      ↓
User Review
      ↓
Edit if necessary
      ↓
Verify
      ↓
Trusted Structured Record
```

The original AI extraction should remain auditable.

Example:

```text
Original:
12.7 g/dL

Corrected:
12.1 g/dL

Status:
Human Verified
```

---

# 12. CONFIDENCE INDICATORS

Each extracted field may include an extraction confidence score.

Example:

```text
Hemoglobin
12.1 g/dL
Confidence: 96%
```

Low-confidence information should be clearly marked:

```text
⚠ Needs Verification
```

Confidence represents **AI extraction confidence**, not medical certainty.

---

# 13. INCONSISTENCY DETECTION

MedLens should detect possible conflicts across sources.

Example:

```text
Patient Profile
Age: 42

Uploaded Report
Age: 44

⚠ Possible Conflict
```

The system must surface the conflict but should not decide which value is correct.

The user should be able to review and resolve it.

---

# 14. LONGITUDINAL MEDICAL HISTORY

MedLens should preserve information across multiple reports.

Example:

```text
January
Blood Report

March
Blood Report

June
Prescription

September
Blood Report
```

This creates a chronological medical timeline.

---

# 15. TREND ANALYSIS

For repeated laboratory measurements, MedLens should visualize changes over time.

Example:

```text
Hemoglobin

Jan → 11.8
Mar → 12.0
Jun → 12.1
Sep → 12.4
```

The system should present factual trends without making unsupported clinical conclusions.

---

# 16. REPORT COMPARISON

Users should be able to compare two reports.

Example:

| Test       | Previous | Current | Change |
| ---------- | -------: | ------: | -----: |
| Hemoglobin |     11.8 |    12.1 |   +0.3 |
| Glucose    |       98 |     105 |     +7 |
| Platelets  |     155k |    148k |    -7k |

The system should describe the numerical difference rather than provide a diagnosis.

---

# 17. AI SUMMARY

MedLens should generate concise, patient-friendly summaries based on structured information.

The summary may mention:

* Number of results
* Results outside source-provided ranges
* Changes between reports
* Missing information
* Low-confidence fields
* Conflicting information

Example:

> "The latest report contains 18 laboratory measurements. Two results are outside the reference ranges shown in the report, and one extracted value requires verification."

The summary must remain factual.

---

# 18. MEDICAL TIMELINE

The timeline should organize:

* Reports
* Lab results
* Prescriptions
* Patient updates
* Verification events

Example:

```text
05 Sep 2026
│
├── Blood Report Uploaded
├── 18 Results Extracted
└── 3 Fields Verified

02 Sep 2026
└── Prescription Uploaded

15 Jun 2026
└── Previous Blood Report
```

---

# 19. DOCTOR-READY RECORD

Users should be able to export a concise summary containing:

```text
Patient Information
Medical History
Allergies
Medications
Reports
Lab Results
Trends
Comparisons
AI Summary
Verification Status
Source Information
```

The export should prioritize clarity and factual accuracy.

---

# 20. USER EXPERIENCE

The primary workflow should be obvious.

```text
Dashboard
   ↓
Upload Report
   ↓
Processing
   ↓
Extracted Results
   ↓
Review
   ↓
Verify
   ↓
Patient Record
   ↓
Compare / Track
   ↓
Summary / Export
```

The user should never have to understand how the AI works internally.

---

# 21. DESIGN CHARACTER

MedLens should feel:

* Professional
* Trustworthy
* Modern
* Clean
* Calm
* Data-oriented
* Accessible

Avoid making it look like a generic chatbot.

Avoid excessive animations or decorative AI effects.

Medical information should remain the visual priority.

---

# 22. KEY DIFFERENTIATORS

MedLens should stand out through five major capabilities.

### 1. Traceability

Information can be traced back to the source document.

### 2. Human Verification

Users can correct AI extraction.

### 3. Source-Based Reference Ranges

Reference ranges come from the actual uploaded report.

### 4. Longitudinal Record

Multiple reports become one continuous patient history.

### 5. Conflict Detection

The system surfaces inconsistent information.

---

# 23. WHY MEDLENS IS MORE THAN AN OCR TOOL

A basic OCR application might produce:

```text
Hemoglobin 12.1 g/dL
Glucose 105 mg/dL
Platelets 148000
```

MedLens should produce:

```text
Hemoglobin
12.1 g/dL
LOW
Reference: 13–17 g/dL
Source: Blood_Report.pdf, Page 2
Confidence: 96%
Verification: Verified

Glucose
105 mg/dL
...
```

And connect that information to:

```text
Patient
   ↓
Report
   ↓
Lab Result
   ↓
Source
   ↓
Verification
   ↓
Historical Results
```

That structured intelligence is the core product.

---

# 24. SAFETY PRINCIPLE

MedLens is an **information intelligence tool**, not a medical decision-making system.

The application must never:

```text
Diagnose
Prescribe
Recommend treatment
Change medication
Invent medical values
Invent reference ranges
Present uncertain information as fact
```

Instead:

```text
Extract
Structure
Validate
Compare
Explain
Flag
Trace
Verify
```

---

# 25. MVP PRIORITY

If development time becomes limited, prioritize:

### P0

* Authentication
* Patient information
* Report upload
* OCR/AI extraction
* Structured records
* Reference range processing
* Deterministic status
* Provenance
* Human verification
* Dashboard
* AI summary

### P1

* Historical trends
* Report comparison
* Conflict detection
* Confidence indicators
* Timeline
* Search/filter
* PDF export

### P2

* Prescription extraction
* Family profiles
* Advanced audit visualization
* General medical information assistant
* Advanced analytics

P2 features must never delay core P0 functionality.

---

# 26. SUCCESS CRITERIA

MedLens is successful when a user can take several fragmented medical documents and turn them into a single structured record.

The complete workflow should be:

```text
Upload
  ↓
Extract
  ↓
Structure
  ↓
Validate
  ↓
Verify
  ↓
Trace
  ↓
Compare
  ↓
Summarize
  ↓
Export
```

The result should be significantly easier to review than the original collection of documents.

---

# 27. HACKATHON DEMO STORY

The ideal demonstration starts with a messy medical information problem.

### Before MedLens

```text
📄 Blood Report.pdf
📷 Prescription.jpg
📄 Old Lab Report.pdf
📝 Manually remembered medical history
```

Information is fragmented.

### After MedLens

```text
             MEDLENS
                │
       ┌────────┴────────┐
       ▼                 ▼
 Structured Record    Source Evidence
       │                 │
       ▼                 ▼
 Trends & Compare    Verification
       │                 │
       └────────┬────────┘
                ▼
        Patient-Friendly
             Summary
```

The user can now review the information from one place.

---

# 28. THE "WOW" MOMENT

The most important demonstration should be the relationship between:

```text
SOURCE DOCUMENT
       ↕
STRUCTURED RECORD
       ↕
VERIFICATION
```

For example:

```text
Original Report
────────────────────────
Hemoglobin 12.1 g/dL
Ref: 13–17 g/dL


MedLens
────────────────────────
Hemoglobin
12.1 g/dL

LOW

Source:
Blood Report — Page 2

Confidence:
96%

Verification:
✓ Human Verified
```

This communicates the core MedLens value immediately.

---

# 29. TECHNICAL PRINCIPLE

The architecture should separate:

```text
DOCUMENT PROCESSING
        ↓
AI EXTRACTION
        ↓
STRUCTURED DATA
        ↓
VALIDATION
        ↓
PROVENANCE
        ↓
HUMAN VERIFICATION
        ↓
PRESENTATION
```

AI should not directly control the final state of the medical record.

---

# 30. FINAL PRODUCT STATEMENT

> **MedLens is an AI-powered clinical information intelligence platform that transforms fragmented patient information and medical documents into a structured, source-traceable, human-verified longitudinal medical record.**

---

# 31. FINAL BUILD GOAL

Build something that makes a judge immediately understand:

> **"This takes scattered medical documents, extracts the important information, shows exactly where it came from, lets the human verify it, and turns multiple reports into one understandable medical record."**

That is MedLens.

Do not optimize for the number of features.

Optimize for:

**Trust + Structure + Traceability + Verification + Longitudinal Understanding.**
