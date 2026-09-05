# MedLens — UI Design Specification

## AI-Powered Clinical Information Intelligence

**Project:** MedLens
**Document:** UI Design Specification
**Target:** Hackathon MVP
**Primary Development Environment:** Antigravity
**Frontend:** Next.js + React + TypeScript
**UI Framework:** Tailwind CSS + shadcn/ui
**Icons:** Lucide React
**Charts:** Recharts

---

# 1. Design Vision

MedLens should feel like a **trusted clinical information workspace**, not a generic healthcare or chatbot application.

The interface must make complex medical information:

* Structured
* Traceable
* Understandable
* Reviewable
* Visually calm
* Easy to compare
* Safe to interpret

The central design principle is:

> **AI extracts. Software validates. Humans verify. MedLens organizes.**

The visual experience should communicate confidence and professionalism without pretending that MedLens is a diagnostic system.

---

# 2. Core UX Promise

The primary product experience is:

```text
📄 Upload
   ↓
🤖 Extract
   ↓
📊 Structure
   ↓
🔍 Validate
   ↓
🔗 Trace
   ↓
✏️ Verify
   ↓
📈 Compare
   ↓
🧠 Understand
   ↓
📄 Export
```

The UI should make this workflow obvious.

A user should always understand:

1. What information MedLens found
2. Where the information came from
3. Whether it has been verified
4. How confident the extraction is
5. What changed between reports
6. What requires user attention

---

# 3. Design Character

## 3.1 Desired Personality

The application should feel:

* Professional
* Calm
* Trustworthy
* Modern
* Intelligent
* Minimal
* Data-focused
* Human-centered

Avoid making it feel:

* Futuristic for the sake of appearance
* Like a social media application
* Like a generic AI chatbot
* Like a hospital billing portal
* Overly clinical or intimidating
* Filled with unnecessary animations

---

# 4. Visual Design System

## 4.1 Color Philosophy

Use a restrained healthcare-oriented palette.

### Primary

Use a cool blue/indigo family for:

* Primary actions
* Navigation highlights
* Links
* Interactive elements
* Selected states

### Neutral

Use neutral gray/slate tones for:

* Backgrounds
* Borders
* Secondary text
* Cards
* Metadata

### Semantic Colors

Use semantic colors carefully.

**Green**

Used for:

* Normal
* Verified
* Successfully processed

**Amber**

Used for:

* Needs review
* Low confidence
* Ambiguous information
* Warnings

**Red**

Used for:

* High/Low result status
* Conflicts
* Processing failures
* Critical attention states

Important:

> Semantic colors represent data states, not medical diagnoses.

---

# 5. Typography

Use a modern sans-serif typeface.

Recommended:

* Inter
* Geist
* System sans-serif fallback

Typography hierarchy:

```text
Page Title       28–32px / bold
Section Heading  20–24px / semibold
Card Heading     16–18px / semibold
Body             14–16px / regular
Metadata         12–13px / regular
Caption          11–12px / regular
```

Medical values should use strong visual hierarchy.

Example:

```text
Hemoglobin

12.1 g/dL
LOW

Reference: 13–17 g/dL
```

---

# 6. Spacing and Layout

Use a consistent spacing scale based around 4px/8px increments.

Recommended:

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
```

Cards should generally use:

```text
Padding: 20–24px
Border radius: 12–16px
Gap between cards: 16–24px
```

Avoid excessive rounded cards.

The application should feel structured rather than playful.

---

# 7. Application Shell

The main authenticated application should use a persistent desktop layout.

```text
┌──────────────────────────────────────────────────────────────┐
│ MedLens                              Search    🔔   Profile  │
├──────────────┬───────────────────────────────────────────────┤
│              │                                               │
│ Dashboard    │                                               │
│ Patients     │              MAIN CONTENT                     │
│ Reports      │                                               │
│ Lab Results  │                                               │
│ Timeline     │                                               │
│ Compare      │                                               │
│ Review       │                                               │
│              │                                               │
│              │                                               │
│ Settings     │                                               │
└──────────────┴───────────────────────────────────────────────┘
```

---

# 8. Sidebar Navigation

Primary navigation:

1. Dashboard
2. Medical Record
3. Reports
4. Lab Results
5. Timeline
6. Compare
7. Review
8. Settings

The sidebar should display:

* MedLens logo
* Product name
* Navigation items
* Review count badge when applicable
* User profile
* Settings
* Privacy/security indicator if appropriate

Example:

```text
┌──────────────────┐
│  ◉ MedLens       │
│  Clinical Intel. │
├──────────────────┤
│                  │
│  ⌂ Dashboard     │
│  ♙ Medical Record│
│  ▣ Reports       │
│  ◫ Lab Results   │
│  ◷ Timeline      │
│  ⇄ Compare       │
│  ✓ Review     3  │
│                  │
│                  │
│  ⚙ Settings      │
│                  │
│  ─────────────── │
│  User Profile    │
└──────────────────┘
```

---

# 9. Top Navigation

The top bar should contain:

* Current patient/context
* Global search
* Notifications
* Help
* User profile

Example:

```text
MedLens / John Doe

Search medical records...                🔔   A
```

For privacy, patient information should not unnecessarily appear in global navigation.

---

# 10. Dashboard Design

The dashboard is the user's primary overview.

## 10.1 Dashboard Goals

The dashboard should immediately answer:

* Who is the current patient?
* What reports exist?
* What was recently uploaded?
* What needs verification?
* What lab results are available?
* Are there historical trends?
* Are there conflicts?
* When was the record last updated?

---

## 10.2 Dashboard Layout

Recommended:

```text
┌─────────────────────────────────────────────────────────────┐
│ Good morning                                                │
│ Patient overview                                            │
│                                                             │
│ [ + Upload Report ] [ + Add Information ]                  │
├─────────────────────────────────────────────────────────────┤
│ Patient Card                                                │
│                                                             │
│ Name | Age | Sex | Last Updated                             │
├──────────────────────┬──────────────────────────────────────┤
│ Reports              │ Lab Results                          │
│ 8 documents          │ 42 results                           │
│ +2 this month        │ 5 need review                        │
├──────────────────────┼──────────────────────────────────────┤
│ Verification         │ Conflicts                            │
│ 37 verified          │ 2 require attention                  │
├──────────────────────┴──────────────────────────────────────┤
│ Recent Medical Activity                                     │
│                                                             │
│ Timeline / recent reports                                   │
├─────────────────────────────────────────────────────────────┤
│ Biomarker Trends                                            │
│                                                             │
│      ╱╲                                                     │
│  ───╱──╲────                                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

# 11. Patient Profile Card

The patient card should display only relevant information.

Example:

```text
John Doe
Male · 42 years

Known conditions
Hypertension

Allergies
Penicillin

Current medications
3 recorded

Last updated
05 Sep 2026
```

Each field should have provenance where useful.

Example:

```text
Age
42
AI Extracted · Needs Review
```

or:

```text
Age
42
User Provided · Verified
```

---

# 12. Patient Information Intake

The patient creation flow should be a clean form.

Fields:

### Demographics

* Name
* Date of birth / Age
* Sex
* Contact information if required

### Clinical Context

* Symptoms
* Existing conditions
* Allergies
* Medications
* Relevant notes

Do not make the form feel like a giant medical questionnaire.

Use sections:

```text
Patient Information

Basic Information
────────────────────────
Name
Age
Sex

Clinical Context
────────────────────────
Symptoms
Existing Conditions
Allergies
Medications

Additional Information
────────────────────────
Notes
```

---

# 13. Report Upload UI

The upload interface is one of the most important screens.

It should be immediately understandable.

## 13.1 Upload Area

Use a large drag-and-drop area.

```text
┌──────────────────────────────────────────────────────┐
│                                                      │
│                     ↑                                │
│                                                      │
│             Upload medical reports                  │
│                                                      │
│       Drag & drop files here or browse              │
│                                                      │
│       PDF · JPG · PNG                                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

Primary CTA:

**Upload Report**

Secondary:

**Browse Files**

---

# 14. Upload Queue

After selecting files:

```text
Selected Reports

┌─────────────────────────────────────────────┐
│ 📄 blood_test_march.pdf                     │
│ 2.4 MB                                      │
│ ████████████████░░░░  Processing...         │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ 📄 prescription_april.jpg                   │
│ 1.2 MB                                      │
│ ✓ Ready                                     │
└─────────────────────────────────────────────┘
```

Multiple reports should be supported.

---

# 15. Document Processing UI

Do not fake processing.

Display actual processing states.

```text
Processing report

✓ File uploaded
✓ Document validated
✓ OCR completed
● Extracting medical information
○ Validating structured data
○ Preparing review
```

Possible states:

```text
UPLOADING
UPLOADED
OCR_PROCESSING
OCR_COMPLETED
EXTRACTION_PROCESSING
EXTRACTION_COMPLETED
VALIDATING
READY_FOR_REVIEW
VERIFIED
FAILED
```

---

# 16. Processing Failure UI

Failures must be understandable.

Example:

```text
Unable to process this report

The document was uploaded successfully, but the medical
information could not be extracted reliably.

Reason:
The report image is too blurry.

[Upload Another File]
[Try Again]
```

Never display technical stack traces to normal users.

---

# 17. Report Viewer

The report viewer is a major MedLens differentiator.

Recommended layout:

```text
┌──────────────────────┬──────────────────────────────────────┐
│                      │                                      │
│ Original Report      │ Extracted Information                │
│                      │                                      │
│ ┌──────────────────┐ │ ┌──────────────────────────────────┐ │
│ │                  │ │ │ Hemoglobin                       │ │
│ │   PDF / Image    │ │ │ 12.1 g/dL                        │ │
│ │                  │ │ │ LOW                              │ │
│ │                  │ │ │ Reference: 13–17 g/dL           │ │
│ │                  │ │ │                                  │ │
│ │                  │ │ │ Source: Page 1                   │ │
│ │                  │ │ │ Confidence: 96%                  │ │
│ │                  │ │ │ Status: Needs Review             │ │
│ │                  │ │ └──────────────────────────────────┘ │
│ │                  │ │                                      │
│ └──────────────────┘ │                                      │
└──────────────────────┴──────────────────────────────────────┘
```

This should be one of the strongest screens in the application.

---

# 18. Source-to-Record Traceability

When a user selects an extracted field:

```text
Hemoglobin → Page 1 → "Hemoglobin 12.1 g/dL"
```

The source viewer should highlight the corresponding text or region.

Display:

```text
Source Evidence

Document:
CBC_Report_05Sep.pdf

Page:
1

Extracted text:
Hemoglobin 12.1 g/dL

Origin:
AI Extracted

Confidence:
96%

Verification:
Needs Review
```

This creates the central trust experience:

> **Every important value can be traced back to its source.**

---

# 19. Lab Results Dashboard

The lab result page should use structured cards/table views.

Recommended table:

| Test       | Result | Unit   | Reference    | Status | Confidence | Verification |
| ---------- | -----: | ------ | ------------ | ------ | ---------- | ------------ |
| Hemoglobin |   12.1 | g/dL   | 13–17        | LOW    | 96%        | Review       |
| WBC        |    7.2 | ×10⁹/L | Source range | NORMAL | 98%        | Verified     |
| Platelets  |    245 | ×10⁹/L | Source range | NORMAL | 97%        | Verified     |

Important:

The UI must clearly distinguish:

* Result value
* Source reference range
* Calculated status
* AI confidence
* Human verification

---

# 20. Biomarker Result Card

For dashboard presentation:

```text
┌──────────────────────────────┐
│ Hemoglobin                   │
│                              │
│ 12.1 g/dL                    │
│                              │
│ LOW                          │
│                              │
│ Reference                    │
│ 13–17 g/dL                   │
│                              │
│ ↓ 0.7 from previous report  │
│                              │
│ AI Extracted · 96%           │
│ Needs Review                 │
└──────────────────────────────┘
```

The status should be generated by deterministic application logic.

The UI should never imply that the status itself is an AI diagnosis.

---

# 21. Reference Range Presentation

Reference ranges should always indicate their source.

Example:

```text
Reference range
13–17 g/dL

Source:
CBC_Report_05Sep.pdf · Page 1
```

If no reference range exists:

```text
Reference range
Not available in source

Status
Unable to determine
```

Never display a generic medical reference range as though it came from the patient's report.

---

# 22. Verification UI

Verification is a first-class workflow.

Each extracted item should support:

```text
[✓ Verify]
[✎ Edit]
[⚠ Flag]
```

Example:

```text
Hemoglobin
12.1 g/dL

AI Extracted
96% confidence

Reference: 13–17 g/dL
Status: LOW

[✓ Verify]   [✎ Edit]
```

---

# 23. Human Correction Flow

If the AI extracted an incorrect value:

```text
Edit Result

Test Name
Hemoglobin

Extracted Value
12.1

Correct Value
12.7

Unit
g/dL

Reason for correction
OCR misread

[Cancel] [Save Correction]
```

After saving:

```text
Corrected by Human

Original AI extraction:
12.1 g/dL

Verified value:
12.7 g/dL

Correction:
OCR misread

Status:
Human Verified
```

Never overwrite the original AI extraction.

---

# 24. Verification States

Use clear visual states.

### Needs Review

```text
● Needs Review
```

### Verified

```text
✓ Verified
```

### Rejected

```text
× Rejected
```

### Low Confidence

```text
⚠ Low Confidence
```

These states should be understandable without relying only on color.

---

# 25. Confidence Indicators

Confidence should describe **extraction confidence**, not medical certainty.

Example:

```text
Extraction confidence

96% High
```

Tooltip:

> Confidence indicates how reliably MedLens extracted this information from the document. It does not indicate medical certainty or health risk.

Suggested ranges:

```text
90–100%  High
70–89%   Medium
<70%     Low
```

These thresholds are product UX categories and should not be presented as medically meaningful.

---

# 26. Conflict Detection

Conflicts should be displayed separately from abnormal lab results.

Example:

```text
⚠ Information Conflict

Allergy information differs between sources.

Patient profile:
Penicillin

Medical report:
No known drug allergies

MedLens cannot determine which information is correct.

[View Sources]
[Resolve Manually]
```

Important:

> MedLens should flag conflicts, not automatically decide which source is correct.

---

# 27. Review Center

The Review page should act as the user's work queue.

```text
Review Center

12 items need attention

┌────────────────────────────────────────────┐
│ ⚠ Hemoglobin                              │
│ Report: CBC_05Sep.pdf                     │
│ Low confidence extraction                 │
│ [Review]                                  │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│ ⚠ Allergy information                     │
│ Conflicting sources                       │
│ [Review]                                  │
└────────────────────────────────────────────┘
```

Filters:

* All
* Low confidence
* Conflicts
* Missing data
* Needs verification

---

# 28. Medical Timeline

Timeline should provide longitudinal context.

Example:

```text
Medical Timeline

Sep 05, 2026
│
├── 📄 CBC Report
│   12 laboratory results
│   4 need review
│
│
Aug 20, 2026
│
├── 💊 Prescription
│   3 medications extracted
│
│
Jul 10, 2026
│
├── 📄 Lipid Panel
│   8 laboratory results
│
│
Jun 02, 2026
│
└── 👤 Patient information updated
```

Each timeline event should link back to its source.

---

# 29. Trend Visualization

Use Recharts for historical values.

Example:

```text
Hemoglobin

13.5 ┤       ●
13.0 ┤   ●       ●
12.5 ┤
12.0 ┤             ●
     └──────────────────
       Jan  Mar  Jun  Sep
```

Charts should include:

* Date
* Value
* Unit
* Source report
* Reference range when available

Do not visually imply a medical diagnosis from a trend.

---

# 30. Comparison Screen

The comparison page should allow users to select two reports.

```text
Compare Reports

Current
CBC — 05 Sep 2026

Previous
CBC — 12 Jun 2026

[Compare]
```

Then:

```text
Test           Previous     Current      Change
-------------------------------------------------
Hemoglobin     13.2 g/dL    12.1 g/dL    -1.1
WBC            6.8          7.2          +0.4
Platelets      230          245          +15
```

The system should distinguish:

* Increased
* Decreased
* Unchanged
* Newly available
* No longer available

Avoid statements such as:

> "This means you have..."

Instead use:

> "The reported value decreased from 13.2 to 12.1 g/dL."

---

# 31. AI Summary UI

The summary should be factual and patient-friendly.

Example:

```text
AI Summary

Your latest report contains 24 extracted results.

5 results are outside the reference ranges provided
in the report.

3 results could not be classified because the source
did not provide a reference range.

2 items require verification because the extraction
confidence is low.

Compared with the previous report:
• Hemoglobin decreased from 13.2 to 12.1 g/dL.
• Platelets increased from 230 to 245 ×10⁹/L.

This summary describes information found in your reports
and is not a medical diagnosis or treatment recommendation.
```

---

# 32. Summary Safety Notice

The safety disclaimer should not dominate the screen.

Use a subtle but readable information panel:

```text
ⓘ Information only

MedLens organizes and explains information found in your
records. It does not diagnose conditions or recommend
treatment. Consult a qualified healthcare professional for
medical decisions.
```

---

# 33. Search and Filtering

Global search should support:

* Test names
* Report names
* Dates
* Medications
* Conditions
* Patient fields

Example:

```text
Search records...

"hemoglobin"
```

Results:

```text
Lab Results
• Hemoglobin — 05 Sep 2026
• Hemoglobin — 12 Jun 2026
• Hemoglobin — 10 Mar 2026

Reports
• CBC_05Sep.pdf
• CBC_12Jun.pdf
```

Filters:

```text
Date
Report Type
Test
Status
Verification
Source
```

---

# 34. Reports Page

Display all uploaded documents.

Recommended table:

| Report           | Type         | Date        | Pages | Status    | Verification |
| ---------------- | ------------ | ----------- | ----: | --------- | ------------ |
| CBC_05Sep.pdf    | Lab          | 05 Sep 2026 |     2 | Processed | 8/12         |
| Prescription.jpg | Prescription | 20 Aug 2026 |     1 | Processed | Verified     |
| LipidPanel.pdf   | Lab          | 10 Jul 2026 |     1 | Processed | Verified     |

Actions:

* Open
* Review
* Compare
* Download
* Delete

---

# 35. Document Detail Page

Header:

```text
CBC Report

05 Sep 2026
Laboratory Report

✓ Processed
8 / 12 fields verified

[Review]
[Compare]
[Export]
```

Sections:

1. Document information
2. Source preview
3. Extracted data
4. Verification status
5. AI summary
6. Audit history

---

# 36. Prescription UI

Prescription extraction should use a structured layout.

```text
Prescription

Doctor
Dr. Example

Date
20 Aug 2026

Medications

Medicine A
Strength: 500 mg
Frequency: As extracted
Duration: 5 days

Medicine B
Strength: 10 mg
Frequency: As extracted
Duration: Not available
```

Important:

The interface must communicate that these values were **extracted from the prescription**, not prescribed by MedLens.

Do not generate medication recommendations.

---

# 37. Medication Provenance

Every extracted prescription field should support:

```text
Source:
Prescription_20Aug.jpg

Page:
1

Origin:
AI Extracted

Confidence:
94%

Verification:
Needs Review
```

---

# 38. Settings Page

Settings should contain:

### Account

* Name
* Email
* Password/security

### Privacy

* Data storage information
* Delete account
* Delete patient record
* Export data

### AI & Processing

* AI processing explanation
* Summary preferences if implemented

### Accessibility

* Font size
* Reduced motion
* Contrast preferences

### Security

* Active sessions
* Authentication settings

---

# 39. Authentication UI

Keep authentication simple.

Login:

```text
┌─────────────────────────────────┐
│            MedLens              │
│                                 │
│ Welcome back                    │
│                                 │
│ Email                           │
│ [___________________________]   │
│                                 │
│ Password                        │
│ [___________________________]   │
│                                 │
│ [        Sign In        ]       │
│                                 │
│ Forgot password?                │
│                                 │
│ Don't have an account? Sign up  │
└─────────────────────────────────┘
```

Avoid unnecessary onboarding friction.

---

# 40. Empty States

Empty states should guide users toward the next useful action.

Example:

```text
No medical reports yet

Upload a medical report to automatically extract
laboratory results, observations, and patient information.

[Upload First Report]
```

For trends:

```text
Not enough historical data

Upload another report containing the same test to
see how the value changes over time.
```

---

# 41. Loading States

Use skeletons instead of blank screens.

Example:

```text
┌─────────────────────────────┐
│ █████████████████           │
│                             │
│ ██████████                  │
│ ███████████████             │
└─────────────────────────────┘
```

For AI processing, use meaningful progress states instead of indefinite spinners.

---

# 42. Toast Notifications

Use concise feedback.

Examples:

```text
✓ Report uploaded successfully.

✓ Extraction completed. 24 results found.

✓ Changes saved.

✓ Result verified.

⚠ 3 items still need review.

× Unable to process report.
```

Avoid exposing sensitive medical information in notifications where possible.

---

# 43. Accessibility

The application should support:

* Keyboard navigation
* Visible focus states
* Screen-reader-friendly labels
* Sufficient contrast
* Semantic HTML
* Accessible forms
* Accessible tables
* Accessible charts
* Non-color status indicators

Never communicate status through color alone.

For example:

```text
✓ NORMAL
⚠ NEEDS REVIEW
↓ LOW
↑ HIGH
```

rather than relying only on green/yellow/red.

---

# 44. Responsive Design

Desktop is the primary hackathon presentation environment, but the application should remain usable on tablets and mobile devices.

### Desktop

```text
Sidebar + Content
```

### Tablet

```text
Collapsible Sidebar
Content
```

### Mobile

```text
Top Header
Content
Bottom/Drawer Navigation
```

The report viewer should switch from:

```text
Source | Structured Data
```

to:

```text
Source
↓
Extracted Data
```

on narrow screens.

---

# 45. Important Reusable Components

Create reusable UI components rather than page-specific duplicates.

Recommended components:

```text
components/
├── ui/
│   ├── Button
│   ├── Card
│   ├── Badge
│   ├── Dialog
│   ├── Tabs
│   ├── Table
│   ├── Tooltip
│   └── Progress
│
├── patient/
│   ├── PatientCard
│   ├── PatientHeader
│   └── PatientInformation
│
├── reports/
│   ├── UploadZone
│   ├── UploadQueue
│   ├── ReportCard
│   ├── ReportViewer
│   └── ProcessingStatus
│
├── lab-results/
│   ├── LabResultCard
│   ├── LabResultTable
│   ├── StatusBadge
│   ├── ReferenceRange
│   └── TrendChart
│
├── verification/
│   ├── VerificationBadge
│   ├── ReviewQueue
│   ├── CorrectionDialog
│   └── ConfidenceIndicator
│
├── provenance/
│   ├── SourceBadge
│   ├── SourceEvidence
│   └── ProvenancePanel
│
├── comparison/
│   ├── ReportSelector
│   ├── ComparisonTable
│   └── ChangeIndicator
│
├── timeline/
│   └── MedicalTimeline
│
└── dashboard/
    ├── MetricCard
    ├── RecentReports
    └── RecentActivity
```

---

# 46. Status Badge System

Use consistent badges throughout the application.

```text
✓ Verified
● Needs Review
⚠ Low Confidence
⚠ Conflict
✓ Processed
● Processing
× Failed
```

Status components should be reusable.

---

# 47. Provenance Badge System

Every important medical field should optionally expose its origin.

Examples:

```text
USER PROVIDED
AI EXTRACTED
AI GENERATED
HUMAN VERIFIED
```

UI example:

```text
Hemoglobin
12.1 g/dL

AI Extracted · 96%
Needs Review
```

After verification:

```text
Hemoglobin
12.1 g/dL

AI Extracted · 96%
✓ Human Verified
```

---

# 48. AI-Generated Content Styling

AI-generated summaries should be visually distinguishable from source data.

Example:

```text
┌────────────────────────────────────────────┐
│ ✦ AI Summary                              │
│                                            │
│ Your report contains 24 extracted results │
│ ...                                        │
│                                            │
│ Based only on information available in    │
│ your uploaded records.                    │
└────────────────────────────────────────────┘
```

Never style AI-generated text as if it were a primary source.

---

# 49. Source Data Styling

Source-derived information should have stronger provenance cues.

Example:

```text
Source Value

Hemoglobin
12.1 g/dL

Source:
CBC_Report.pdf · Page 1

Origin:
AI Extracted

Confidence:
96%
```

---

# 50. Interaction Principles

## Principle 1 — Make important information scannable

Users should understand a result in seconds.

## Principle 2 — Reveal detail progressively

Show:

```text
Result
↓
Status
↓
Reference
↓
Source
↓
Confidence
↓
Verification
```

rather than overwhelming the user immediately.

## Principle 3 — Never hide provenance

Users should always be able to find where a value came from.

## Principle 4 — Separate AI from application logic

The UI should make it clear when information was:

* Extracted
* Calculated
* Generated
* Verified

## Principle 5 — Make review actionable

Every uncertain item should have an obvious next step.

---

# 51. Microinteractions

Use subtle animations for:

* Upload completion
* Processing transitions
* Verification
* Tab changes
* Modal opening
* Chart rendering

Avoid:

* Excessive motion
* Animated medical symbols
* Decorative particle effects
* Distracting transitions

Recommended animation duration:

```text
150–250ms
```

Provide reduced-motion support.

---

# 52. Dashboard Information Hierarchy

Priority should be:

```text
1. Current Patient
2. Important Record State
3. Review Required
4. Recent Reports
5. Lab Results
6. Trends
7. Timeline
8. Secondary Information
```

Do not make decorative analytics more prominent than verification tasks.

---

# 53. Primary Call-to-Action Strategy

The main CTA should depend on context.

New user:

> **Upload Report**

Existing user with pending reviews:

> **Review 5 Items**

Existing user with no pending work:

> **Upload New Report**

This keeps the interface task-oriented.

---

# 54. Demo-Optimized UI

The hackathon demo should emphasize the strongest MedLens capability:

> **Source → Structured → Verified**

The ideal demo screen:

```text
┌──────────────────────┬──────────────────────────────────────┐
│ ORIGINAL REPORT      │ STRUCTURED MEDICAL RECORD            │
│                      │                                      │
│ CBC REPORT           │ Hemoglobin                           │
│                      │ 12.1 g/dL                            │
│ Hemoglobin 12.1 g/dL │ LOW                                  │
│                      │ Reference: 13–17 g/dL               │
│ ← highlighted        │                                      │
│                      │ Source: Page 1                       │
│                      │ Confidence: 96%                      │
│                      │                                      │
│                      │ [✓ Verify] [✎ Edit]                 │
└──────────────────────┴──────────────────────────────────────┘
```

This should be visually impressive without unnecessary visual effects.

---

# 55. Recommended Demo Flow

The UI should support a smooth 3–5 minute demonstration.

### Step 1

Login.

### Step 2

Open patient dashboard.

### Step 3

Upload medical report.

### Step 4

Show real processing state.

### Step 5

Show extracted structured data.

### Step 6

Click a lab value.

### Step 7

Show source highlighting.

### Step 8

Show source-based reference range.

### Step 9

Show deterministic LOW/NORMAL/HIGH status.

### Step 10

Show confidence and provenance.

### Step 11

Correct one extraction.

### Step 12

Verify it.

### Step 13

Open historical comparison.

### Step 14

Show trend.

### Step 15

Generate patient-friendly summary.

### Step 16

Export doctor-ready record.

---

# 56. Critical Safety UX Rules

The interface must never:

* Present MedLens as a doctor
* Present AI-generated content as confirmed medical fact
* Invent reference ranges
* Hide missing reference ranges
* Automatically resolve conflicting information
* Recommend treatment
* Recommend medication
* Change dosage
* Diagnose diseases
* Present extraction confidence as medical certainty

Instead:

```text
AI finds information.
Software validates structure.
Human verifies information.
MedLens presents the record.
```

---

# 57. Data State Visibility

The UI should make the lifecycle of information visible.

```text
Source Document
      ↓
AI Extraction
      ↓
Validation
      ↓
Needs Review
      ↓
Human Correction
      ↓
Human Verification
      ↓
Structured Record
```

A user should never wonder:

> "Where did this value come from?"

---

# 58. Error Prevention

Before destructive actions:

```text
Delete Report?

This will remove the report and its extracted information
from the patient record.

[Cancel] [Delete Report]
```

For human corrections:

```text
Save correction?

The original AI extraction will be preserved in the audit
history.

[Cancel] [Save Correction]
```

---

# 59. Privacy UX

Medical information is sensitive.

The UI should:

* Avoid exposing patient data unnecessarily
* Clearly indicate authenticated state
* Provide logout
* Protect patient switching
* Avoid medical data in URLs where possible
* Provide deletion controls
* Explain data processing
* Show secure storage messaging where applicable

Example:

```text
🔒 Your medical information is protected

MedLens uses authenticated access and secure storage
to protect your records.
```

Do not make unsupported security claims.

---

# 60. Visual Density

Medical information can become table-heavy.

Use a balance:

```text
Dashboard
→ Cards + summaries

Lab Results
→ Tables + cards

Reports
→ Document list

Review
→ Action queue

Timeline
→ Chronological cards

Compare
→ Comparison table + chart

Source Viewer
→ Split-pane interface
```

Do not force every piece of information into cards.

---

# 61. Tables vs Cards

Use **cards** for:

* Overview
* Key metrics
* Patient summary
* AI summaries
* Review items

Use **tables** for:

* Lab results
* Comparisons
* Reports
* Audit history

Use **timeline components** for:

* Medical events
* Document history

Use **split panes** for:

* Source vs extracted information

---

# 62. Mobile Priority

On mobile, prioritize:

1. Patient
2. Review
3. Reports
4. Lab results
5. Timeline
6. Compare
7. Settings

Source traceability must remain available even on small screens.

---

# 63. Final Navigation Map

```text
AUTH
│
├── Login
└── Register
      │
      ▼
DASHBOARD
│
├── Patient Overview
│
├── Medical Record
│   ├── Patient Information
│   ├── Conditions
│   ├── Allergies
│   ├── Medications
│   └── Notes
│
├── Reports
│   ├── Upload
│   ├── Processing
│   ├── Report Viewer
│   └── Report Details
│
├── Lab Results
│   ├── All Results
│   ├── Status
│   └── Trends
│
├── Timeline
│
├── Compare
│
├── Review
│   ├── Needs Verification
│   ├── Low Confidence
│   └── Conflicts
│
└── Settings
    ├── Account
    ├── Privacy
    ├── Security
    └── Accessibility
```

---

# 64. Final UI Quality Checklist

Before considering the UI complete:

## Visual

* [ ] Consistent typography
* [ ] Consistent spacing
* [ ] Consistent card styles
* [ ] Consistent buttons
* [ ] Consistent status badges
* [ ] Professional healthcare visual language
* [ ] No unnecessary decorative elements

## Functional

* [ ] Upload flow is obvious
* [ ] Processing states are visible
* [ ] Extracted data is structured
* [ ] Source can be opened
* [ ] Source evidence can be traced
* [ ] Reference ranges are visible
* [ ] Status is visible
* [ ] Confidence is visible
* [ ] Verification is actionable
* [ ] Corrections preserve original data
* [ ] Trends are understandable
* [ ] Comparisons are clear
* [ ] Conflicts are visible
* [ ] Summary is distinguishable from source data
* [ ] Export is accessible

## Safety

* [ ] No diagnosis language
* [ ] No treatment recommendations
* [ ] No dosage recommendations
* [ ] No invented reference ranges
* [ ] No automatic conflict resolution
* [ ] AI confidence is not presented as medical certainty
* [ ] Missing information is explicitly represented

## Accessibility

* [ ] Keyboard navigation works
* [ ] Focus states are visible
* [ ] Labels are accessible
* [ ] Color is not the only status indicator
* [ ] Tables are accessible
* [ ] Charts have text alternatives
* [ ] Reduced motion is supported
* [ ] Responsive layout works

---

# 65. Final Design Principle

MedLens should not win attention by looking like a futuristic AI product.

It should win trust by making medical information **clear, structured, traceable, and reviewable**.

The most important visual relationship in the entire application is:

```text
┌────────────────────┐
│ ORIGINAL SOURCE    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ AI EXTRACTION      │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ SOFTWARE VALIDATION│
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ HUMAN VERIFICATION │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ STRUCTURED RECORD  │
└────────────────────┘
```

The UI should make this chain visible throughout the product.

> **MedLens is not an AI that tells users what is wrong with them.**
>
> **MedLens is an intelligence layer that turns fragmented medical information into a structured, source-traceable, human-verified record.**
