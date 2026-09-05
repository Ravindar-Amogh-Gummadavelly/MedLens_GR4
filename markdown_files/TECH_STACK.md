# MedLens — Technical Stack

## 1. Document Purpose

This document defines the recommended technical architecture and technology stack for **MedLens — AI-Powered Clinical Information Intelligence**.

The stack is optimized for:

* Fast hackathon development.
* Antigravity-based implementation.
* Real working functionality.
* AI/OCR medical document processing.
* Structured medical data.
* Strong provenance and traceability.
* Human verification.
* Secure patient data handling.
* Responsive web application experience.
* Easy deployment and demonstration.

---

# 2. Recommended Stack

| Layer            | Technology                                      | Purpose                                         |
| ---------------- | ----------------------------------------------- | ----------------------------------------------- |
| Frontend         | Next.js + React + TypeScript                    | Web application                                 |
| Styling          | Tailwind CSS                                    | Responsive UI                                   |
| UI Components    | shadcn/ui                                       | Accessible reusable components                  |
| Icons            | Lucide React                                    | Consistent interface icons                      |
| Charts           | Recharts                                        | Lab trends and comparisons                      |
| Backend          | Next.js API Routes / Server Actions             | Application APIs                                |
| Database         | PostgreSQL                                      | Structured patient data                         |
| ORM              | Prisma                                          | Database access and schema                      |
| Authentication   | Auth.js / NextAuth                              | Secure authentication                           |
| File Storage     | Supabase Storage / S3-compatible storage        | Medical document storage                        |
| OCR              | Google Cloud Vision / Document AI or equivalent | OCR and document understanding                  |
| AI               | Gemini API or configured LLM                    | Extraction, clarification, conflicts, summaries |
| Validation       | Zod                                             | Runtime schema validation                       |
| PDF              | React-PDF / server-side PDF generation          | Doctor-ready exports                            |
| Charts           | Recharts                                        | Trends and comparisons                          |
| Search           | PostgreSQL search                               | Patient/report/result search                    |
| Deployment       | Vercel                                          | Web application deployment                      |
| Database Hosting | Supabase / managed PostgreSQL                   | PostgreSQL hosting                              |
| Monitoring       | Sentry or equivalent                            | Error monitoring                                |
| Testing          | Vitest + Playwright                             | Unit and end-to-end testing                     |

---

# 3. Architecture Overview

```text
                         ┌──────────────────────┐
                         │      USER / WEB      │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Next.js Application  │
                         │ React + TypeScript   │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    │               │                │
                    ▼               ▼                ▼
              Authentication     Dashboard        Upload
                    │                                │
                    │                                ▼
                    │                        Object Storage
                    │                                │
                    │                                ▼
                    │                         OCR / Vision
                    │                                │
                    │                                ▼
                    │                          AI Extraction
                    │                                │
                    │                                ▼
                    │                         Schema Validation
                    │                                │
                    │                                ▼
                    │                       Deterministic Engine
                    │                                │
                    └────────────────┬───────────────┘
                                     │
                                     ▼
                              PostgreSQL Database
                                     │
                  ┌──────────────────┼──────────────────┐
                  ▼                  ▼                  ▼
              Dashboard           Trends           Timeline
                  │                  │                  │
                  └──────────────────┼──────────────────┘
                                     ▼
                              AI Summary Layer
                                     │
                                     ▼
                              PDF Export
```

---

# 4. Frontend

## Recommended

### Next.js

Use Next.js as the primary web application framework.

Benefits:

* React-based.
* TypeScript support.
* Server-side functionality.
* API routes.
* Server Actions.
* Easy deployment.
* Good hackathon development velocity.
* Strong ecosystem.

Suggested structure:

```text
app/
├── page.tsx
├── login/
├── dashboard/
├── patients/
│   ├── new/
│   └── [patientId]/
├── reports/
├── lab-results/
├── timeline/
├── compare/
├── review/
└── settings/
```

---

# 5. Programming Language

## TypeScript

Use TypeScript throughout the application.

Reasons:

* Type safety.
* Better AI response handling.
* Strong database typing.
* Safer API development.
* Easier refactoring.
* Better Antigravity code generation.
* Improved maintainability.

Avoid mixing JavaScript and TypeScript unless necessary.

---

# 6. UI Framework

## React

React should power the application interface.

Primary UI principles:

* Component-driven architecture.
* Reusable medical data components.
* Accessible controls.
* Responsive layouts.
* Clear information hierarchy.

---

# 7. Styling

## Tailwind CSS

Use Tailwind CSS for application styling.

Recommended design characteristics:

* Clean.
* Professional.
* Medical/clinical.
* Trustworthy.
* Minimal.
* Data-focused.
* High contrast.
* Accessible.

Avoid excessive:

* gradients
* animations
* decorative elements
* glassmorphism
* excessive shadows
* unnecessary cards

The product should feel like a **clinical information tool**, not a generic AI dashboard.

---

# 8. Component Library

## shadcn/ui

Use shadcn/ui for common interface components.

Recommended components:

```text
Button
Card
Dialog
Drawer
DropdownMenu
Input
Textarea
Select
Tabs
Badge
Table
Tooltip
Alert
Progress
Skeleton
Toast
Sheet
Command
```

Medical-specific components should be built on top of these primitives.

---

# 9. Medical UI Components

Create reusable components such as:

```text
PatientHeader
PatientProfileCard
MedicalResultCard
ReferenceRangeBar
ConfidenceBadge
VerificationBadge
ProvenanceBadge
SourceLink
ReportCard
ReportViewer
ExtractionReviewPanel
ConflictAlert
TimelineEvent
TrendChart
ComparisonTable
AISummaryCard
UploadDropzone
ProcessingStatus
EmptyState
```

---

# 10. Charts

## Recharts

Use Recharts for:

* Lab value trends.
* Historical comparison.
* Parameter timelines.
* Before/after visualization.

Example:

```text
Hemoglobin
│
│             ●
│       ●
│   ●
│
└────────────────────
   Jan   Mar   Jun
```

Charts must display:

* Test name.
* Value.
* Unit.
* Date.
* Source report where useful.

Do not imply clinical conclusions through chart styling.

---

# 11. Backend

## Next.js Backend

For the hackathon MVP, use Next.js API routes and/or Server Actions rather than introducing a separate backend service unless there is a clear need.

Example:

```text
/api
├── auth
├── patients
├── documents
├── extraction
├── lab-results
├── verification
├── conflicts
├── comparison
├── summaries
└── export
```

This keeps the architecture simple and fast to develop.

---

# 12. Database

## PostgreSQL

PostgreSQL should be the primary persistent database.

Reasons:

* Relational medical data fits naturally.
* Strong consistency.
* Excellent querying.
* Date-based historical queries.
* Relationships between patients, documents, results, and verification records.
* Full-text search capabilities.
* Mature ecosystem.

---

# 13. ORM

## Prisma

Use Prisma for database access.

Benefits:

* Type-safe queries.
* Schema-driven development.
* Easy migrations.
* Good TypeScript integration.
* Fast development.

---

# 14. Recommended Database Entities

The database should support at least:

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

---

# 15. Important Data Relationships

```text
User
 │
 └── Patient
      │
      ├── PatientProfile
      │
      ├── MedicalDocument
      │      │
      │      └── ExtractionJob
      │
      ├── LabResult
      │
      ├── Prescription
      │
      ├── TimelineEvent
      │
      ├── Conflict
      │
      └── Summary
```

Every extracted medical field should be traceable back to its source document whenever practical.

---

# 16. Medical Data Provenance

Provenance is a first-class architectural requirement.

Recommended origin values:

```text
USER_PROVIDED
AI_EXTRACTED
AI_GENERATED
HUMAN_VERIFIED
```

Recommended verification states:

```text
NEEDS_REVIEW
VERIFIED
REJECTED
```

Important fields:

```text
source_document_id
source_page
source_text
origin
confidence
verification_status
created_at
updated_at
```

---

# 17. File Storage

Medical documents should not be stored directly inside PostgreSQL as ordinary application records.

Use object storage.

Possible options:

* Supabase Storage.
* Amazon S3.
* Google Cloud Storage.
* Another S3-compatible provider.

Recommended hackathon choice:

> **Supabase Storage**

because it can provide storage and PostgreSQL within one platform.

---

# 18. Medical Document Handling

Supported file types:

```text
PDF
JPG
JPEG
PNG
WEBP
```

Potential future support:

```text
TIFF
DOCX
DICOM
```

The MVP should prioritize:

> PDF + JPG + PNG

---

# 19. OCR / Document Understanding

## Preferred Approach

Use a reliable document/OCR API rather than building OCR from scratch.

Possible technologies:

### Option A — Google Cloud Document AI / Vision

Useful for:

* OCR.
* Document structure.
* Tables.
* Text extraction.
* Scanned reports.

### Option B — Gemini Vision / multimodal model

Useful for:

* Document understanding.
* Layout understanding.
* Tables.
* Contextual extraction.

### Recommended architecture

```text
PDF/Image
   ↓
OCR / Vision
   ↓
Raw Extracted Text + Layout
   ↓
LLM Structured Extraction
```

Do not depend exclusively on plain OCR text when document layout contains important relationships.

---

# 20. AI Model Layer

## Recommended

Use a capable multimodal LLM such as **Gemini** where available.

AI responsibilities:

```text
Document understanding
Medical field extraction
Table extraction
Ambiguity detection
Conflict detection
Clarification questions
Patient-friendly summaries
```

AI should return structured JSON wherever possible.

---

# 21. AI Provider Abstraction

Do not hard-code the entire application around one model provider.

Create an abstraction:

```text
AIProvider
├── extractMedicalDocument()
├── extractLabResults()
├── extractPrescription()
├── detectConflicts()
├── generateClarificationQuestions()
└── generateSummary()
```

This allows the model provider to be changed later.

---

# 22. AI Output Validation

## Zod

Every AI response should pass through schema validation.

```text
LLM
 ↓
JSON Parser
 ↓
Zod Schema
 ↓
Valid?
 ├── YES → Continue
 └── NO  → Retry / Fail Safely
```

Never directly persist unvalidated LLM output.

---

# 23. Deterministic Medical Validation

Critical calculations must be performed in application code.

Example:

```typescript
if (!referenceRange) {
  status = "UNABLE_TO_DETERMINE";
} else if (value < lowerBound) {
  status = "LOW";
} else if (value <= upperBound) {
  status = "NORMAL";
} else {
  status = "HIGH";
}
```

The LLM must not determine this status.

---

# 24. Reference Range Architecture

The system should store:

```text
reference_range_lower
reference_range_upper
reference_range_text
reference_range_unit
reference_range_source
```

Reference range source:

```text
SOURCE_DOCUMENT
```

Only the reference range contained in the source report should be used.

If unavailable:

```text
status = UNABLE_TO_DETERMINE
```

Never silently use a generic laboratory range.

---

# 25. Authentication

## Auth.js / NextAuth

Use secure authentication.

Required capabilities:

* Login.
* Logout.
* Session management.
* Protected routes.
* Patient-specific authorization.

Example:

```text
User
 ↓
Authenticated Session
 ↓
Authorized Patient
 ↓
Medical Records
```

A user must never be able to access another patient's data through an altered URL or request.

---

# 26. Authorization

Every backend operation involving medical data must verify:

```text
Authenticated user
        +
Patient ownership / authorization
        +
Requested resource belongs to patient
```

Do not rely solely on frontend route protection.

---

# 27. API Security

Backend endpoints should validate:

* Authentication.
* Authorization.
* Input schema.
* File type.
* File size.
* Request body.
* Patient ownership.
* Resource ownership.

Never trust client-provided:

```text
user_id
patient_id
verification_status
origin
```

without server-side validation.

---

# 28. Document Processing Architecture

Recommended processing states:

```text
UPLOADED
   ↓
QUEUED
   ↓
PROCESSING
   ↓
OCR_COMPLETE
   ↓
EXTRACTION_COMPLETE
   ↓
VALIDATED
   ↓
NEEDS_REVIEW
   ↓
VERIFIED
```

Failure states:

```text
OCR_FAILED
EXTRACTION_FAILED
VALIDATION_FAILED
UNSUPPORTED_DOCUMENT
PROCESSING_FAILED
```

---

# 29. Background Processing

If processing becomes slow, use asynchronous jobs.

Possible technologies:

```text
Inngest
Trigger.dev
BullMQ
Cloud Tasks
```

For a hackathon MVP, synchronous or lightweight asynchronous processing is acceptable if the document processing time remains reasonable.

Do not create unnecessary infrastructure before it is needed.

---

# 30. Search

Start with PostgreSQL search.

Searchable fields:

```text
Patient name
Patient ID
Test name
Report type
Doctor
Laboratory
Medication
Report date
```

Filters:

```text
Date
Report type
Test
Status
Verification
Document
```

---

# 31. PDF Export

The system should generate a doctor-ready PDF containing:

```text
Patient Information
        ↓
Medical Record Summary
        ↓
Laboratory Results
        ↓
Historical Trends
        ↓
Report Comparison
        ↓
Relevant Prescriptions
        ↓
AI Summary
        ↓
Verification Status
        ↓
Source Information
```

The export must clearly distinguish:

```text
Source information
AI-extracted information
Human-verified information
AI-generated summary
```

---

# 32. Audit History

Important events should be recorded.

Examples:

```text
DOCUMENT_UPLOADED
DOCUMENT_PROCESSED
FIELD_EXTRACTED
FIELD_EDITED
FIELD_VERIFIED
FIELD_REJECTED
CONFLICT_DETECTED
SUMMARY_GENERATED
PDF_EXPORTED
```

Audit records should preserve meaningful changes.

---

# 33. Duplicate Detection

Use multiple signals:

```text
File hash
Patient ID
Report date
Report type
Provider/laboratory
Document content
```

The system should flag possible duplicates rather than automatically deleting them.

---

# 34. Application Folder Structure

Recommended project structure:

```text
medlens/
│
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── patients/
│   ├── reports/
│   ├── lab-results/
│   ├── timeline/
│   ├── compare/
│   ├── review/
│   ├── settings/
│   └── api/
│
├── components/
│   ├── ui/
│   ├── patient/
│   ├── reports/
│   ├── lab-results/
│   ├── verification/
│   ├── timeline/
│   ├── comparison/
│   └── dashboard/
│
├── lib/
│   ├── ai/
│   ├── ocr/
│   ├── database/
│   ├── validation/
│   ├── provenance/
│   ├── comparison/
│   ├── export/
│   ├── security/
│   └── utils/
│
├── prisma/
│   └── schema.prisma
│
├── prompts/
│   ├── extraction/
│   ├── validation/
│   ├── summary/
│   └── safety/
│
├── types/
│
├── tests/
│   ├── unit/
│   └── e2e/
│
├── public/
│
├── .env.example
├── package.json
└── README.md
```

---

# 35. Environment Variables

Secrets must never be committed to source control.

Example:

```text
DATABASE_URL=
DIRECT_URL=

AUTH_SECRET=

AI_API_KEY=
AI_MODEL=

STORAGE_URL=
STORAGE_BUCKET=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=

OCR_API_KEY=

SENTRY_DSN=
```

Use `.env.local` during local development.

Commit only:

```text
.env.example
```

Never commit:

```text
.env
.env.local
API keys
database passwords
service credentials
```

---

# 36. API Layer

Recommended internal API structure:

```text
POST /api/patients
GET  /api/patients/:id

POST /api/documents
GET  /api/documents/:id
DELETE /api/documents/:id

POST /api/documents/:id/process
GET  /api/documents/:id/extraction

GET  /api/patients/:id/lab-results
GET  /api/patients/:id/timeline

POST /api/lab-results/:id/verify
PATCH /api/lab-results/:id

GET  /api/patients/:id/conflicts

GET  /api/patients/:id/compare

POST /api/patients/:id/summary

POST /api/patients/:id/export
```

Exact routing can be adapted to the final Next.js architecture.

---

# 37. Error Handling

Errors must be categorized.

### User errors

```text
Invalid file type
File too large
Missing required information
Unauthorized access
```

### Processing errors

```text
OCR failure
AI failure
Schema validation failure
Timeout
```

### Data errors

```text
Invalid medical value
Ambiguous reference range
Conflicting information
```

Never expose raw stack traces or API secrets to users.

---

# 38. Reliability Strategy

The system should fail safely.

If AI extraction fails:

```text
Do not create fake data.
Do not partially fabricate a record.
Show processing failure.
Allow retry.
Preserve original document.
```

If reference-range extraction fails:

```text
Keep extracted value.
Set status = UNABLE_TO_DETERMINE.
Request human review if appropriate.
```

---

# 39. Security Requirements

Implement:

* HTTPS.
* Secure authentication.
* Server-side authorization.
* Input validation.
* File validation.
* Secure object storage.
* Environment-based secrets.
* Restricted database access.
* Safe error messages.
* Audit logging.
* Data deletion capability.
* No sensitive data in unnecessary logs.

---

# 40. Privacy

Medical information is sensitive.

The application should:

* Minimize stored data.
* Store only required information.
* Restrict access by patient/user.
* Avoid unnecessary third-party data sharing.
* Avoid sending unnecessary information to AI providers.
* Clearly communicate how uploaded documents are processed.
* Support deletion where feasible.

For the hackathon demo, use **synthetic/fake patient data**, not real patient records.

---

# 41. Accessibility

The UI should support:

* Keyboard navigation.
* Semantic HTML.
* Visible focus states.
* Accessible form labels.
* Sufficient contrast.
* Screen-reader-friendly status indicators.
* Non-color-only status communication.

Do not communicate:

```text
LOW = red only
NORMAL = green only
HIGH = orange only
```

Instead use:

```text
LOW
NORMAL
HIGH
```

with supporting visual indicators.

---

# 42. Performance

Optimize for:

* Fast initial dashboard load.
* Lazy-loaded reports.
* Paginated history.
* Optimized document previews.
* Compressed thumbnails.
* Efficient database queries.
* Background processing for large documents.

Avoid loading every historical report and laboratory result on the initial page.

---

# 43. Observability

Track:

```text
API errors
AI processing failures
OCR failures
Document processing duration
Database errors
Authentication errors
Export failures
```

Do not log:

```text
Passwords
API keys
Full medical documents
Unnecessary patient-identifying information
```

---

# 44. Testing Stack

## Unit Testing

Use:

```text
Vitest
```

Test:

* Reference range calculations.
* Parsing.
* Validation.
* Provenance.
* Conflict detection logic.
* Comparison calculations.

Example:

```text
value = 12
range = 13–17
→ LOW

value = 15
range = 13–17
→ NORMAL

value = 18
range = 13–17
→ HIGH

range = null
→ UNABLE_TO_DETERMINE
```

---

# 45. End-to-End Testing

Use:

```text
Playwright
```

Primary flow:

```text
Login
 ↓
Create Patient
 ↓
Upload Report
 ↓
Process Report
 ↓
Review Extraction
 ↓
Verify Result
 ↓
View Dashboard
 ↓
Compare Report
 ↓
Generate Summary
 ↓
Export PDF
```

---

# 46. AI Testing

Maintain synthetic test documents covering:

```text
Clear digital PDF
Scanned PDF
Photographed report
Low-quality image
Multiple tables
Missing reference range
Multiple reference ranges
Different units
Handwritten information
Conflicting patient information
Duplicate reports
Unreadable OCR
```

AI output should be evaluated against expected structured results.

---

# 47. Recommended Deployment

## Frontend + Backend

Use:

> **Vercel**

## Database

Use:

> **Supabase PostgreSQL**

## Storage

Use:

> **Supabase Storage**

## AI

Use:

> **Gemini API / configured AI provider**

## OCR

Use:

> **Google Cloud Vision / Document AI or equivalent**

Recommended hackathon architecture:

```text
                    VERCEL
                      │
             ┌────────┴────────┐
             │                 │
          Next.js           API Routes
             │                 │
             └────────┬────────┘
                      │
          ┌───────────┼────────────┐
          ▼           ▼            ▼
      Supabase      AI API       OCR API
      PostgreSQL
          │
          ▼
    Supabase Storage
```

---

# 48. Simplified Hackathon Stack

If development time is extremely limited, use:

```text
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
Supabase
Prisma
Gemini API
Google OCR / Gemini Vision
Zod
Recharts
React-PDF
Vercel
```

This is the preferred starting point.

---

# 49. Avoid Overengineering

Do not initially introduce:

```text
Microservices
Kubernetes
Kafka
Complex event buses
Multiple databases
Custom OCR infrastructure
Custom ML models
Complex vector databases
Separate backend deployment
```

unless a real requirement appears.

The hackathon goal is:

> **A reliable working product, not an unnecessarily complex architecture.**

---

# 50. AI/Medical Safety Boundary

The technical architecture must enforce:

```text
                 AI
                  │
        ┌─────────┴─────────┐
        │                   │
      ALLOWED            FORBIDDEN
        │                   │
        ▼                   ▼
   Extraction           Diagnosis
   Summaries            Treatment
   OCR                  Prescription
   Clarification        Dosage changes
   Conflict detection   Invented ranges
```

Application logic owns:

```text
Reference-range comparison
Data validation
Provenance
Verification
Audit history
Authorization
```

Humans own:

```text
Final verification
Corrections
Conflict resolution
Clinical judgment
```

---

# 51. Recommended Development Order

Build in this order:

### Phase 1 — Foundation

```text
Next.js
TypeScript
Tailwind
shadcn/ui
Authentication
Database
```

### Phase 2 — Patient Record

```text
Patient creation
Patient profile
Medical record
Dashboard
```

### Phase 3 — Documents

```text
Upload
Storage
Document viewer
Processing states
```

### Phase 4 — AI

```text
OCR
AI extraction
Structured JSON
Schema validation
```

### Phase 5 — Validation

```text
Reference ranges
Deterministic status
Provenance
Confidence
```

### Phase 6 — Human Verification

```text
Review
Correction
Verification
Source highlighting
```

### Phase 7 — Intelligence

```text
Trends
Comparison
Conflicts
Timeline
AI summary
```

### Phase 8 — Export

```text
Doctor-ready PDF
```

### Phase 9 — Demo Hardening

```text
Error states
Loading states
Empty states
Responsive design
Security checks
Demo data
End-to-end testing
```

---

# 52. Priority Matrix

| Technology / Feature   | Priority |
| ---------------------- | -------- |
| Next.js                | P0       |
| React                  | P0       |
| TypeScript             | P0       |
| Tailwind               | P0       |
| shadcn/ui              | P0       |
| PostgreSQL             | P0       |
| Authentication         | P0       |
| File storage           | P0       |
| OCR / Vision           | P0       |
| AI extraction          | P0       |
| Zod validation         | P0       |
| Reference-range engine | P0       |
| Provenance             | P0       |
| Human verification     | P0       |
| Recharts               | P1       |
| PDF export             | P1       |
| Conflict detection     | P1       |
| Timeline               | P1       |
| Advanced search        | P1       |
| Sentry                 | P1       |
| Background jobs        | P1/P2    |
| Vector database        | P2       |
| Advanced analytics     | P2       |
| Separate microservices | P2       |
| Custom ML models       | P2       |

---

# 53. Final Recommended Stack

For the MedLens hackathon implementation, use:

```text
┌──────────────────────────────────────────────┐
│                  FRONTEND                    │
│ Next.js + React + TypeScript                 │
│ Tailwind CSS + shadcn/ui + Lucide            │
├──────────────────────────────────────────────┤
│                  BACKEND                     │
│ Next.js API Routes / Server Actions          │
│ Zod Validation                               │
├──────────────────────────────────────────────┤
│                  AI LAYER                    │
│ Gemini / Multimodal LLM                     │
│ Structured JSON Extraction                   │
├──────────────────────────────────────────────┤
│                  OCR                         │
│ Google Vision / Document AI / Vision LLM     │
├──────────────────────────────────────────────┤
│                  DATA                        │
│ PostgreSQL + Prisma                          │
│ Supabase                                     │
├──────────────────────────────────────────────┤
│                  STORAGE                     │
│ Supabase Storage / S3-compatible             │
├──────────────────────────────────────────────┤
│                  VISUALIZATION               │
│ Recharts                                     │
├──────────────────────────────────────────────┤
│                  EXPORT                      │
│ React-PDF / server PDF generation            │
├──────────────────────────────────────────────┤
│                  TESTING                     │
│ Vitest + Playwright                          │
├──────────────────────────────────────────────┤
│                  DEPLOYMENT                  │
│ Vercel                                       │
└──────────────────────────────────────────────┘
```

---

# 54. Final Technical Principle

The MedLens architecture should be built around one core separation:

```text
AI
↓
UNDERSTANDS & EXTRACTS

APPLICATION
↓
VALIDATES & CALCULATES

DATABASE
↓
PRESERVES & TRACES

HUMAN
↓
VERIFIES & CORRECTS

AI
↓
EXPLAINS THE VERIFIED INFORMATION
```

The final system should therefore be:

> **AI-powered, software-validated, source-traceable, human-verified, and longitudinal.**

This architecture directly supports the MedLens product promise:

> **“MedLens turns fragmented medical documents into a structured, traceable, and human-verified patient record.”**

