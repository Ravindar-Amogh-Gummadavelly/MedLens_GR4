MedLens — Living Project Context & Build State

Purpose: This is the living source-of-context file for the MedLens hackathon project.

It tells Antigravity and any developer/AI agent what the project currently is, which rules are active, what has already been decided, and how future implementation decisions must be made.

Last updated: 2026-09-05
Project status: Hackathon MVP — Build Ready / Implementation Phase
Primary development environment: Google Antigravity
Required deployment: Google Cloud Run

1. HOW TO USE THIS FILE

This file is a living project context log, not a replacement for the detailed project documents.

Before making a significant implementation decision, the developer/AI agent should:

Read this file.

Read the relevant detailed .md specification.

Follow the highest-priority rule when documents overlap.

Preserve existing project decisions unless a newer explicit decision changes them.

Update this file whenever an important project decision, implementation milestone, constraint, or architecture change occurs.

Core rule

Do not build from memory, assumptions, or generic best practices when a MedLens .md specification already defines the behavior.

The project must be constructed according to the provided .md files.

2. PROJECT IDENTITY

Product Name

MedLens

Full Name

MedLens — AI-Powered Clinical Information Intelligence

Product Definition

MedLens is an AI-powered clinical information intelligence platform that converts fragmented medical documents and patient-provided information into a structured, source-traceable, human-verified longitudinal medical record.

Product Tagline

AI extracts. Software validates. Humans verify. MedLens organizes.

Core Product Promise

Medical information is often scattered across:

Patient history

Laboratory reports

Prescriptions

Previous medical records

User-provided health information

MedLens turns these fragmented sources into one structured and reviewable record while preserving:

Source

Provenance

Confidence

Verification

History

Comparisons

MedLens is not a diagnosis engine and must not behave like one.

3. CURRENT PROJECT STATE

Current Phase

Implementation / Hackathon MVP construction

The project is no longer in the ideation-only stage.

The next work should focus on:

Building the actual application.

Connecting the required Google services.

Implementing the real medical-document processing pipeline.

Implementing validation and provenance.

Implementing human verification.

Deploying to Google Cloud Run.

Testing the live application.

Hardening the hackathon demo.

4. CURRENT AUTHORITATIVE DOCUMENT SET

The following documents collectively define the project.

1. MASTER_BUILD_INSTRUCTIONS.md

Role: Primary master build specification.

Defines:

Overall product direction

Architecture

Functional requirements

AI boundaries

Data model

Development priorities

Build order

Demo strategy

Quality bar

Authority

Use this as the primary implementation reference unless a newer explicit project rule overrides it.

2. PROJECT_BRIEF.md

Role: Product brief.

Defines:

Problem

Solution

Scope

Target users

Core value proposition

Feature priorities

Differentiators

Demo story

Use it to preserve product focus.

3. REQUIREMENTS.md

Role: Formal requirements contract.

Defines:

Functional requirements

Non-functional requirements

Data integrity

Safety

Security

Accessibility

Processing

Error handling

AI output

Validation

Acceptance criteria

Priority matrix

Authority

When implementing a feature, check this document for its exact requirement and priority.

4. USER_FLOW.md

Role: End-to-end UX and system journey.

Defines:

Capture
→ Upload
→ Extract
→ Structure
→ Validate
→ Trace
→ Review
→ Verify
→ Compare
→ Understand
→ Export

Use this to ensure screens and workflows correspond to real product behavior.

5. AI_PROMPTS.md

Role: AI behavior and prompt contract.

Defines:

Gemini system behavior

Extraction prompts

Lab extraction

Reference-range extraction

Prescription extraction

Ambiguity detection

Conflict detection

Duplicate detection

Clarification questions

Summary generation

Source grounding

Safe Q&A

Structured JSON output

AI failure behavior

Critical principle

The AI may help understand the document, but it must never become the unquestioned source of truth.

6. TECH_STACK.md

Role: Technical architecture and technology selection.

The stack must be interpreted together with HACKATHON_RULES.md.

The hackathon-specific Google-only rule takes precedence over conflicting third-party service choices.

7. UI_DESIGN.md

Role: UI/UX specification.

Defines:

Visual language

Navigation

Dashboard

Upload experience

Processing states

Report viewer

Source-to-record traceability

Lab dashboard

Review center

Timeline

Trends

Comparison

Summary

Accessibility

Safety UX

8. TEST_CASES.md

Role: QA and acceptance specification.

Defines:

Functional tests

AI tests

OCR tests

Reference-range tests

Provenance tests

Verification tests

Security tests

Data-integrity tests

E2E tests

Demo tests

Final quality gate

9. HACKATHON_RULES.md

Role: Mandatory hackathon constraints.

This document is especially important for:

Google-only technology requirements

Cloud Run deployment

GitHub workflow

Antigravity

Gemini

Google OCR/document processing

Secrets

Security

Medical safety

Submission readiness

Hard rule

Do not introduce competing cloud/AI infrastructure when a required capability is available through Google.

GitHub remains allowed because it is explicitly part of the hackathon workflow.

5. DOCUMENT PRECEDENCE

When multiple documents discuss the same topic, use this decision order:

HACKATHON RULES
       ↓
MASTER BUILD INSTRUCTIONS
       ↓
REQUIREMENTS
       ↓
USER FLOW / AI PROMPTS / TECH STACK / UI DESIGN / TEST CASES
       ↓
Implementation details

However, this does not mean lower-level documents should be ignored.

Instead:

Hackathon rules define mandatory external constraints.

Master instructions define the product.

Requirements define exact behavior.

User flow defines user experience.

AI prompts define AI behavior.

Tech stack defines implementation direction.

UI design defines presentation.

Test cases define correctness.

If a conflict is discovered:

Do not silently choose one.

Identify the conflict.

Prefer the higher-priority rule.

Update affected documentation if the decision is permanent.

Record the decision in this file.

6. MANDATORY GOOGLE-ONLY TECHNOLOGY POLICY

🚨 NON-NEGOTIABLE

The production implementation must use Google products/services wherever applicable.

Preferred ecosystem

Development
→ Google Antigravity

AI
→ Gemini / Google AI

OCR / Document Processing
→ Google Cloud Vision API / Document AI

Application Runtime
→ Google Cloud Run

Build
→ Google Cloud Build

Container Registry
→ Google Artifact Registry

File Storage
→ Google Cloud Storage

Relational Database
→ Cloud SQL for PostgreSQL

Secrets
→ Google Secret Manager

Authentication / Identity
→ Google Identity / Firebase Authentication where appropriate

Observability
→ Google Cloud Logging / Monitoring

Access Control
→ Google Cloud IAM

Source Control
→ GitHub

Explicitly avoid competing production infrastructure

Do not add:

AWS

Azure

Supabase

Vercel

OpenAI API

Anthropic API

Cloudflare

MongoDB Atlas

Neon

PlanetScale

Railway

Render

Heroku

Other competing cloud infrastructure

7. CURRENT RECOMMENDED TECHNICAL ARCHITECTURE

                         USER
                           │
                           ▼
                    MEDLENS WEB APP
                           │
                    GOOGLE CLOUD RUN
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼
      GOOGLE CLOUD STORAGE          APPLICATION API
                                         │
                           ┌─────────────┼─────────────┐
                           │             │             │
                           ▼             ▼             ▼
                    Document AI/     Gemini AI     Cloud SQL
                    Cloud Vision     Extraction    PostgreSQL
                           │             │             │
                           └──────┬──────┘             │
                                  ▼                    │
                           VALIDATION ENGINE           │
                                  │                    │
                           ┌──────┴──────┐             │
                           ▼             ▼             │
                       Provenance    Verification      │
                           │             │             │
                           └──────┬──────┘             │
                                  ▼                    │
                           STRUCTURED RECORD ◄─────────┘
                                  │
                 ┌────────────────┼─────────────────┐
                 ▼                ▼                 ▼
             Dashboard          Trends           Compare
                 │                │                 │
                 └────────────────┼─────────────────┘
                                  ▼
                              AI Summary
                                  │
                                  ▼
                             PDF Export

8. CORE MEDLENS PROCESSING PIPELINE

Every medical document should conceptually follow:

UPLOAD
  ↓
STORE SOURCE
  ↓
OCR / DOCUMENT PROCESSING
  ↓
GEMINI EXTRACTION
  ↓
SCHEMA VALIDATION
  ↓
REFERENCE RANGE EXTRACTION
  ↓
DETERMINISTIC VALIDATION
  ↓
PROVENANCE ATTACHMENT
  ↓
HUMAN REVIEW
  ↓
VERIFICATION
  ↓
PERSIST RECORD
  ↓
DASHBOARD / HISTORY / COMPARISON
  ↓
SAFE SUMMARY

Do not collapse these responsibilities into one uncontrolled AI call.

9. CORE PRODUCT FEATURES

P0 — MUST WORK

The following are mandatory priorities:

Authentication/access control

Patient information

Patient profile

Medical report upload

PDF/JPG/PNG support

Google OCR/document processing

Gemini extraction

Structured medical record

Laboratory result extraction

Source-based reference ranges

Deterministic LOW/NORMAL/HIGH calculation

Provenance

Human verification

Source-to-record traceability

Dashboard

Safe AI summary

P1 — STRONGLY RECOMMENDED

Historical trends

Multi-report comparison

Conflict detection

Confidence indicators

Medical timeline

Search/filter

PDF export

Audit history

Clarification questions

P2 — OPTIONAL

Only implement after P0/P1 is stable:

Prescription extraction

Family profiles

General AI assistant

Advanced analytics

Additional convenience features

10. FEATURES THAT MUST NOT DISTRACT THE BUILD

Do not prioritize:

Generic wellness features

Fitness tracking

Appointment booking

Pharmacy systems

Insurance workflows

Social features

Unnecessary chatbot functionality

Complex recommendation systems

Over-engineered infrastructure

The product must remain centered on:

Structured, traceable, human-verified medical information.

11. MEDICAL SAFETY STATE

🚨 PERMANENT SAFETY RULES

MedLens must never:

Diagnose a disease.

Predict a diagnosis.

Prescribe medication.

Recommend treatment.

Recommend medication changes.

Recommend dosage changes.

Tell users to start/stop medication.

Present uncertain AI output as medical fact.

Invent medical values.

Invent reference ranges.

Silently resolve source conflicts.

Safe example

Hemoglobin is below the reference range shown on this report.

Unsafe example

You have anemia.

The application should describe source data rather than make unsupported clinical diagnoses.

12. REFERENCE-RANGE ENGINE

🚨 CRITICAL IMPLEMENTATION RULE

The LLM must not determine LOW/NORMAL/HIGH.

The source report must provide the reference range.

Required logic

value < lower
→ LOW

lower <= value <= upper
→ NORMAL

value > upper
→ HIGH

If the source range is:

Missing

Ambiguous

Unparseable

Not applicable

then:

Status: Unable to determine

Never guess.

13. PROVENANCE MODEL

Every important medical field must preserve origin.

Supported origins:

USER_PROVIDED
AI_EXTRACTED
AI_GENERATED
HUMAN_VERIFIED

Important metadata:

source_document_id
source_page
source_text
origin
confidence
verification_status
created_at
updated_at

Example

Test: Hemoglobin
Value: 12.1
Unit: g/dL
Reference: 13–17 g/dL
Status: LOW

Origin: AI_EXTRACTED
Source: Blood_Report.pdf
Page: 1
Confidence: 0.96
Verification: NEEDS_REVIEW

14. HUMAN VERIFICATION MODEL

The workflow must be:

AI Extraction
      ↓
Review
      ↓
Edit if necessary
      ↓
Verify

Human corrections must preserve the original AI extraction.

Required conceptual history

Original Source
      ↓
Original AI Extraction
      ↓
Human Correction
      ↓
Verified Record

Never silently overwrite historical medical information.

15. SOURCE-TO-RECORD TRACEABILITY

This is one of the strongest MedLens differentiators.

The application should allow:

Structured field
      ↓
Source document
      ↓
Source page
      ↓
Source text / highlighted evidence

Preferred UI:

┌──────────────────────┬────────────────────────┐
│ ORIGINAL REPORT      │ STRUCTURED RECORD      │
│                      │                        │
│ Hemoglobin 12.1 g/dL │ Hemoglobin: 12.1 g/dL│
│ Reference: 13–17     │ Reference: 13–17      │
│                      │ Status: LOW            │
│                      │ Source: Page 1         │
└──────────────────────┴────────────────────────┘

This should be prioritized for the hackathon demo.

16. CONFLICT DETECTION

When two sources disagree:

Source A
Allergy = Penicillin

Source B
Allergy = None

MedLens should display:

Potential conflict detected

It must not automatically decide which source is correct.

The user should review the conflict.

17. CONFIDENCE MODEL

Confidence means:

Confidence in extraction accuracy.

It does not mean:

Medical certainty.

For example:

Extraction confidence: 96%

means the system is confident it correctly extracted the source value.

It does not mean:

96% certainty of a diagnosis.

18. AI RESPONSIBILITIES

Gemini may perform:

Document understanding

Layout understanding

OCR-assisted interpretation

Medical information extraction

Lab extraction

Reference-range extraction from source

Prescription extraction

Ambiguity detection

Conflict detection

Duplicate reasoning

Clarification question generation

Patient-friendly factual summaries

Historical comparison explanation

Source-grounded explanation

19. APPLICATION RESPONSIBILITIES

Normal application code must handle:

Schema validation

Data types

Reference-range validation

LOW/NORMAL/HIGH calculation

Provenance

Verification states

Authorization

Audit history

Duplicate detection

Persistence

Source linking

Human corrections

Error handling

Core separation

AI
→ Understands and extracts

Software
→ Validates and calculates

Human
→ Reviews and verifies

20. NO FAKE FUNCTIONALITY

Do not implement:

Upload
↓
Fake loading animation
↓
Hardcoded medical results

when the feature is presented as AI processing.

The intended flow is:

Upload
↓
Google OCR / Document AI
↓
Gemini extraction
↓
Schema validation
↓
Reference-range calculation
↓
Provenance
↓
Human verification
↓
Stored result

If a feature is not actually implemented, do not present it as fully functional.

21. DEPLOYMENT STATE

Mandatory production target

Google Cloud Run

Expected workflow:

GitHub
  ↓
Cloud Run
  ↓
Cloud Build
  ↓
Build
  ↓
Artifact Registry
  ↓
Deploy
  ↓
Live MedLens URL

The final live URL must be tested before submission.

22. SECRETS STATE

Never commit:

.env

API keys

Tokens

Passwords

Service-account private keys

Database passwords

Authentication secrets

Use Google Cloud mechanisms such as:

Cloud Run environment variables

Google Secret Manager

Source code

Use environment references:

process.env.GEMINI_API_KEY

Never hardcode a real secret.

23. GITHUB STATE

GitHub is allowed and required as part of the hackathon workflow.

Repository should contain:

Application source

Documentation

README

.env.example

Dockerfile where applicable

Database/schema definitions

Tests

Configuration templates

Repository must not contain production secrets.

24. ANTIGRAVITY STATE

Google Antigravity is the primary AI-assisted development environment.

Generated code must still be:

Reviewed

Tested

Validated

Security checked

Medical-safety checked

Integrated with the existing architecture

Rule

Never blindly accept AI-generated implementation.

25. DATA MODEL STATE

Recommended core entities:

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

Important medical entities should include:

id
patient_id
source_document_id
source_page
source_text
origin
confidence
verification_status
created_at
updated_at

26. PROCESSING STATES

Document processing should use real states.

Recommended:

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

Failure states should communicate the actual problem.

27. ERROR STATES

Important failure categories include:

UPLOAD_FAILED
DOCUMENT_UNSUPPORTED
OCR_FAILED
EXTRACTION_FAILED
SCHEMA_VALIDATION_FAILED
REFERENCE_RANGE_PARSE_FAILED
AI_TIMEOUT
DATABASE_ERROR
EXPORT_FAILED
UNAUTHORIZED

Never fabricate successful processing after a real failure.

28. UI/UX CURRENT DIRECTION

The UI must feel like:

A trusted clinical information workspace

Not:

A generic healthcare landing page

A medical chatbot

A flashy AI experiment

A wellness tracker

Visual character

Professional

Calm

Trustworthy

Modern

Minimal

Data-focused

Accessible

Main navigation

Dashboard
Medical Record
Reports
Lab Results
Timeline
Compare
Review
Settings

29. PRIMARY HACKATHON DEMO

The preferred 3–5 minute demonstration is:

1. Open MedLens
        ↓
2. Select/create patient
        ↓
3. Upload medical report
        ↓
4. Process report
        ↓
5. Show extracted structured data
        ↓
6. Show source reference range
        ↓
7. Show deterministic status
        ↓
8. Show provenance + confidence
        ↓
9. Human reviews/corrects
        ↓
10. Verify
        ↓
11. Show dashboard
        ↓
12. Compare previous report
        ↓
13. Show safe patient-friendly summary
        ↓
14. Export doctor-ready record

Main wow moment

SOURCE → STRUCTURED → VERIFIED

30. DEMO QUALITY PRIORITY

When time is limited, prioritize in this order:

1. Functionality
2. Data Integrity
3. Medical Safety
4. Traceability
5. Human Verification
6. Usability
7. Visual Polish

Do not sacrifice core correctness for animations or decorative UI.

31. DEVELOPMENT ORDER

Follow this sequence unless a documented reason requires a change:

Phase 1 — Foundation

Next.js/React/TypeScript application

Google Cloud-compatible deployment structure

Environment configuration

Authentication

Base layout/navigation

Phase 2 — Patient Record

Patient creation

Patient profile

Patient dashboard

Phase 3 — Documents

Upload

File validation

Cloud Storage

Processing states

Phase 4 — AI

Google OCR / Document AI

Gemini extraction

Structured JSON

Schema validation

Phase 5 — Validation

Reference-range extraction

Deterministic status

Provenance

Confidence

Phase 6 — Human Verification

Review queue

Edit

Verify

Correction history

Source traceability

Phase 7 — Intelligence

Trends

Comparison

Conflicts

Timeline

Safe summaries

Phase 8 — Export

Doctor-ready PDF

Audit information

Phase 9 — Demo Hardening

End-to-end testing

Cloud Run deployment

Performance checks

Error handling

Final polish

32. CURRENT IMPLEMENTATION STRATEGY

The project should be built as a real functional MVP, not as a collection of static screens.

Every important feature should have:

UI
↓
API / Server Logic
↓
Validation
↓
Data Persistence
↓
Real Result

Where AI is required:

UI
↓
Server
↓
Google service
↓
Validation
↓
Persistence
↓
UI

33. COST CONTROL

Google Cloud usage must be controlled.

Avoid:

Repeated Gemini calls for the same document

Repeated OCR processing

Duplicate document processing

Excessive polling

Unnecessary infrastructure

Large uncontrolled demo documents

Prefer:

Hash-based duplicate detection

Cached processing where safe

Small synthetic demo documents

Deterministic application logic

Minimal infrastructure

34. SECURITY STATE

Required:

Secure authentication

Authorization checks

File-type validation

File-size validation

Input sanitization

AI output validation

Protected documents

Secret management

Safe error handling

HTTPS

Google IAM where applicable

No unnecessary sensitive logging

35. ACCESSIBILITY STATE

Required direction:

Keyboard navigation

Visible focus

Accessible labels

Semantic HTML

Readable typography

Sufficient contrast

Status not communicated by color alone

Accessible tables

Accessible chart alternatives/summaries

Clear errors

Responsive layout

36. TESTING STATE

The implementation must eventually pass:

Functional

Authentication

Patient creation

Upload

Processing

Extraction

Validation

Verification

Dashboard

Comparison

Export

Safety

No diagnosis

No treatment recommendation

No dosage changes

No invented ranges

No fabricated values

No silent conflict resolution

AI

Structured JSON

Schema validation

Missing information handling

Ambiguity handling

Confidence

Provenance

Security

Unauthorized access

Secret protection

File validation

API authorization

E2E

Login
→ Patient
→ Upload
→ Process
→ Extract
→ Validate
→ Review
→ Verify
→ Dashboard
→ Compare
→ Summary
→ Export

37. SYNTHETIC DEMO DATA

Prefer synthetic medical documents and patient information for hackathon demonstrations.

Do not unnecessarily use real patient data.

The demo dataset should be designed to demonstrate:

Normal result

Low result

High result

Reference range

Missing/ambiguous reference range

Provenance

Confidence

Human correction

Historical comparison

Potential conflict

38. IMPORTANT PRODUCT DIFFERENTIATORS

The strongest MedLens differentiators are:

1. Source Traceability

Structured information can be traced back to its source.

2. Human Verification

AI extraction does not become unquestioned truth.

3. Source-Based Reference Ranges

The application uses the reference range actually provided by the report.

4. Deterministic Validation

Software calculates LOW/NORMAL/HIGH instead of asking an LLM to decide.

5. Longitudinal Record

Multiple reports become one historical patient record.

6. Conflict Detection

Conflicting information is surfaced instead of silently resolved.

39. PROJECT MANTRA

Always preserve this:

AI extracts. Software validates. Humans verify. MedLens organizes.

And:

SOURCE
  ↓
EXTRACT
  ↓
VALIDATE
  ↓
TRACE
  ↓
VERIFY
  ↓
STORE
  ↓
COMPARE
  ↓
EXPLAIN

40. CURRENT DECISION LOG

Decision 001 — Google-only production ecosystem

Date: 2026-09-05

Decision:

Use Google products/services for the production stack wherever applicable.

Reason:

The hackathon instructions explicitly require Google Cloud deployment and the project has been constrained to Google products.

Impact:

Previous generic stack recommendations involving Supabase/Vercel/other third-party cloud services must not be used for the final production implementation.

Decision 002 — Cloud Run is mandatory

Date: 2026-09-05

Decision:

The final MedLens application must be deployed on Google Cloud Run.

Impact:

Architecture and Docker/runtime configuration must support Cloud Run.

Decision 003 — Gemini is the AI layer

Date: 2026-09-05

Decision:

Use Google's Gemini ecosystem for AI-powered extraction and explanation.

Impact:

Do not integrate OpenAI, Anthropic, or another competing AI API into the production application.

Decision 004 — Google document processing

Date: 2026-09-05

Decision:

Use Google Cloud Vision API and/or Google Cloud Document AI for OCR/document processing according to implementation needs.

Decision 005 — Deterministic reference-range status

Date: 2026-09-05

Decision:

Gemini extracts the source reference range, but application code determines LOW/NORMAL/HIGH.

Impact:

The LLM must never be responsible for the final range classification.

Decision 006 — Provenance is first-class data

Date: 2026-09-05

Decision:

Source and provenance must be preserved throughout the system.

Impact:

Important medical fields require source, origin, confidence, and verification metadata.

Decision 007 — Human verification is mandatory

Date: 2026-09-05

Decision:

AI-extracted medical data must be reviewable and verifiable by a human.

Decision 008 — No diagnosis or treatment

Date: 2026-09-05

Decision:

MedLens organizes and explains available information but does not diagnose, prescribe, or recommend treatment.

Decision 009 — Source → Structured → Verified is the demo centerpiece

Date: 2026-09-05

Decision:

The strongest hackathon demonstration should visibly connect the original report to extracted structured data and then to human verification.

41. IMPLEMENTATION CHANGE LOG

This section must be updated as actual development happens.

Use the format:

## YYYY-MM-DD — Change Title

Status:
Implemented / In Progress / Blocked / Reverted

Changed:
- ...

Reason:
- ...

Files affected:
- ...

Google services affected:
- ...

Testing:
- ...

Next action:
- ...

Current entries

2026-09-05 — Project specification consolidated

Status: Implemented

Changed:

Consolidated MedLens product definition.

Established Google-only production technology policy.

Established Cloud Run deployment requirement.

Established Gemini as AI layer.

Established Google OCR/document-processing direction.

Established provenance-first architecture.

Established human verification workflow.

Established deterministic reference-range validation.

Established hackathon demo flow.

Next action:

Begin implementation according to the P0 build order.

42. ACTIVE WORK QUEUE

The next implementation tasks should be selected in this order.

Immediate

Initialize/verify project structure.

Establish Google Cloud-compatible application runtime.

Configure GitHub repository.

Configure environment-variable strategy.

Build authentication.

Build patient creation/profile.

Build dashboard shell.

Build medical document upload.

Connect Google Cloud Storage.

Build document-processing state machine.

Then

Connect Google OCR/Document AI.

Connect Gemini.

Implement strict extraction schema.

Implement Zod/schema validation.

Implement reference-range parser/validator.

Implement deterministic LOW/NORMAL/HIGH engine.

Implement provenance.

Implement confidence display.

Implement human verification.

Implement source traceability.

Then

Historical trends.

Multi-report comparison.

Conflict detection.

Timeline.

Safe AI summary.

PDF export.

Audit history.

Search/filter.

Final

Full TEST_CASES.md execution.

Cloud Run deployment.

Live smoke test.

End-to-end demo rehearsal.

Security review.

Safety review.

Final GitHub cleanup.

Submission readiness check.

43. BLOCKER LOG

Use this section for unresolved blockers.

Current blockers:

None recorded.

When a blocker appears, record:

## BLOCKER — YYYY-MM-DD

Problem:
...

Affected feature:
...

Impact:
...

Attempted solution:
...

Current state:
...

Required decision:
...

Do not silently work around a blocker if the workaround changes the architecture or violates a project rule.

44. ARCHITECTURE CHANGE RULE

Any change to one of the following must be recorded in this file:

Technology stack

Google service selection

AI model

Database

Authentication

Storage

Processing pipeline

Medical safety behavior

Provenance model

Data model

Major UX flow

Deployment model

Core feature priority

Small implementation details do not require a log entry unless they materially affect behavior.

45. "LATEST STATE" RULE

This file should always answer:

What are we building?

MedLens — AI-powered clinical information intelligence platform.

Why are we building it?

To transform fragmented medical information into a structured, traceable, human-verified longitudinal record.

How is it built?

Using the approved Google-first technology ecosystem and the architecture defined by the project .md specifications.

What is the core pipeline?

Source
→ Extract
→ Validate
→ Trace
→ Verify
→ Store
→ Compare
→ Explain

What is the core AI rule?

AI extracts and explains; it does not become the unquestioned medical source of truth.

What is the core medical safety rule?

No diagnosis, prescribing, treatment recommendation, dosage changes, or invented medical facts/reference ranges.

What is the deployment target?

Google Cloud Run.

What is the strongest demo?

Source → Structured → Verified.

46. AGENT / ANTIGRAVITY OPERATING INSTRUCTIONS

When an AI coding agent starts or resumes work on MedLens:

Step 1 — Read context

Read:

CONTEXT_LOG.md
MASTER_BUILD_INSTRUCTIONS.md
HACKATHON_RULES.md

Then read the relevant feature-specific .md file.

Step 2 — Determine current state

Check:

Existing source code

Existing routes

Existing components

Existing database schema

Existing environment configuration

Existing Google Cloud configuration

Existing tests

This file's active work queue

Do not assume that a planned feature is already implemented.

Step 3 — Respect existing implementation

Before changing something:

Inspect it.

Understand it.

Reuse it where appropriate.

Avoid unnecessary rewrites.

Step 4 — Implement against specifications

Use the .md files as the product contract.

Do not substitute:

Generic healthcare patterns

Generic chatbot patterns

Generic AI dashboards

Unapproved third-party services

for the specified MedLens architecture.

Step 5 — Validate

After implementation:

Run tests.

Check build.

Check safety.

Check data integrity.

Check provenance.

Check authorization.

Check error states.

Step 6 — Update context

After a meaningful project change:

Update the implementation change log.

Update the active work queue.

Update blockers if necessary.

Update architecture decisions if necessary.

Update the current state if the phase changed.

47. DO NOT DO THIS

An agent must not:

Replace Google services with third-party alternatives.

Add an unapproved AI provider.

Commit secrets.

Invent medical data.

Invent reference ranges.

Let Gemini determine final lab status.

Add diagnosis functionality.

Add treatment recommendations.

Silently resolve conflicting medical data.

Remove provenance.

Remove human verification.

Replace real processing with fake hardcoded results.

Break existing functionality without checking tests.

Over-engineer the architecture.

Ignore the .md specifications.

Assume an unfinished feature is complete.

48. FINAL QUALITY GATE

Before considering MedLens "complete", confirm:

FUNCTIONALITY
    ↓
DATA INTEGRITY
    ↓
MEDICAL SAFETY
    ↓
TRACEABILITY
    ↓
HUMAN VERIFICATION
    ↓
USABILITY
    ↓
VISUAL POLISH

All critical P0 requirements must work.

The live Cloud Run application must be tested.

The final demo must demonstrate the real workflow.

49. FINAL CONTEXT SNAPSHOT

PROJECT
MedLens

TYPE
AI-Powered Clinical Information Intelligence

CURRENT PHASE
Hackathon MVP implementation

DEVELOPMENT
Google Antigravity

SOURCE CONTROL
GitHub

AI
Google Gemini

OCR / DOCUMENT PROCESSING
Google Cloud Vision / Document AI

RUNTIME
Google Cloud Run

BUILD
Google Cloud Build

STORAGE
Google Cloud Storage

DATABASE
Cloud SQL for PostgreSQL

SECRETS
Google Secret Manager / Cloud Run environment variables

CORE WORKFLOW
Upload → Extract → Structure → Validate → Trace → Verify → Compare → Explain

AI PRINCIPLE
AI extracts. Software validates. Humans verify.

MEDICAL SAFETY
No diagnosis. No treatment recommendation. No dosage changes. No invented ranges.

DEMO USP
Source → Structured → Verified

PRODUCTION RULE
Google products/services only wherever applicable.

CURRENT NEXT STEP
Implement the P0 foundation and real document-processing pipeline.

50. FINAL INSTRUCTION

This file must remain current.

Whenever the project changes materially, update CONTEXT_LOG.md.

The purpose of this file is to prevent:

Context loss

Conflicting implementation decisions

Repeated architectural mistakes

Accidental violation of hackathon rules

AI agents forgetting previous decisions

Building features inconsistent with the established product

The project should always be constructed from the combined project specifications, with this file providing the latest known project state.

Read the context. Follow the specifications. Build the real product. Update the context.