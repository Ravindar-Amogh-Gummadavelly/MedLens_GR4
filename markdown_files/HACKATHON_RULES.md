MedLens — Hackathon Rules & Google-Only Technology Constraints

Project: MedLens — AI-Powered Clinical Information Intelligence
Purpose: This document defines the mandatory hackathon rules, deployment requirements, technology constraints, and operational guidelines for building and submitting MedLens.

1. Purpose of This Document

This file is a strict project constraint document for the MedLens hackathon build.

All implementation decisions must follow:

The official hackathon instructions provided to participants.

The MedLens product requirements.

The safety and privacy requirements defined for MedLens.

The Google-only product/platform requirement defined in this document.

If another project document conflicts with this file regarding technology choices, the Google-only requirement takes precedence for the hackathon implementation.

2. Mandatory Technology Rule — USE ONLY GOOGLE PRODUCTS

🚨 HARD RULE

MedLens must use Google products and Google services only for its cloud, AI, deployment, storage, database, authentication, monitoring, and development-platform dependencies wherever a Google product/service provides the required capability.

Do not introduce third-party cloud platforms or competing AI/cloud infrastructure into the production architecture.

Google-first technology policy

The preferred architecture should use Google products such as:

Google Antigravity — primary AI-assisted development environment

GitHub — source-code repository, as explicitly required by the hackathon workflow

Google Cloud Platform (GCP) — cloud infrastructure

Google Cloud Run — mandatory live deployment platform

Google Cloud Build — build/deployment automation

Google Cloud Artifact Registry — container image storage when required

Google Cloud Storage — object/file storage

Cloud SQL for PostgreSQL — relational database when a managed SQL database is required

Firebase Authentication / Google Identity services — authentication where appropriate

Google Gemini API / Gemini on Google Cloud — AI capabilities

Google Cloud Vision API / Document AI — OCR and document processing

Google Secret Manager — secrets and API-key management

Google Cloud Logging / Monitoring — application observability

Google Cloud IAM — access control

Google Cloud Security services — security controls where appropriate

Do NOT add competing cloud services

Do not use the following types of services as production dependencies:

AWS

Microsoft Azure

Supabase

Vercel

Firebase alternatives

OpenAI API

Anthropic API

Hugging Face hosted inference

Cloudflare services

MongoDB Atlas

PlanetScale

Neon

Railway

Render

Heroku

Other third-party cloud infrastructure

Important: GitHub is allowed because the hackathon's official workflow explicitly instructs participants to use GitHub for source-code management and Cloud Run repository deployment.

3. Mandatory Pre-Hackathon Learning

Participants are instructed to review the official preparation videos before the hackathon.

GitHub Introduction

https://youtu.be/4Cgjw3a-FSw?si=jGlX98gW95dMHayS

Purpose:

Understand GitHub basics.

Understand repositories.

Understand commits and branches.

Understand how to manage project source code.

Understand how the hackathon project will be submitted/deployed from GitHub.

Antigravity

https://youtu.be/XPK6pU7eMCI?si=IB5Nd_16ZdDHjnaE

Purpose:

Understand the Antigravity development workflow.

Use Antigravity effectively during the hackathon.

Accelerate implementation while maintaining code quality and correctness.

Google Cloud Run Deployment

https://youtu.be/NWvHjjQC8Zk

Purpose:

Understand Cloud Run deployment.

Understand GitHub-to-Cloud-Run deployment.

Understand build configuration.

Understand environment variables and secrets.

Understand how to verify the final live website.

4. Mandatory Live Deployment

🚨 THE PROJECT MUST BE LIVE

MedLens must be deployed as a working live website.

The expected deployment platform is:

Google Cloud Run

A local-only application is not sufficient for final hackathon delivery.

Minimum deployment requirement

The final project must:

Build successfully.

Deploy successfully.

Start successfully on Cloud Run.

Be accessible through its Cloud Run URL.

Load the main application.

Allow the judges to use the core workflow.

Have all required production environment variables configured.

Not depend on the developer's local machine.

5. Google Cloud Project Setup

Use the Google Cloud Console to create or select the project used for MedLens.

Required process:

Open Google Cloud Console.

Sign in with the appropriate Google account.

Create a new Google Cloud project or select an existing project.

Ensure the required billing setup is completed if Google Cloud requests it.

Monitor cloud usage throughout the hackathon.

Billing warning

Google Cloud usage may generate charges depending on the services used.

Participants must:

Monitor usage.

Avoid unnecessary expensive API calls.

Avoid accidentally running unnecessary infrastructure.

Understand that paid AI APIs or other paid services may incur charges.

6. Cloud Run Deployment Workflow

The expected deployment workflow is:

GitHub Repository
       ↓
Google Cloud Run
       ↓
Cloud Build
       ↓
Build
       ↓
Container Image
       ↓
Deploy
       ↓
Live MedLens Website

Recommended deployment process

Open Google Cloud Console.

Open Cloud Run.

Select Services.

Select Connect Repository.

Connect the GitHub account.

Select the MedLens repository.

Select the correct branch.

Configure the build.

Use the project's Dockerfile if one is provided.

Select the appropriate Google Cloud region.

Configure authentication according to the desired website accessibility.

Configure environment variables/secrets.

Create/deploy the Cloud Run service.

Wait for:

Build

Push

Deploy

Open the generated Cloud Run URL.

Perform a complete smoke test.

7. Cloud Run Configuration Rules

Authentication

If the hackathon judges need to access the website publicly, Cloud Run may be configured to:

Allow unauthenticated invocations

However, application-level authentication must still protect user/patient data where required.

Cloud Run public accessibility does not mean medical records should be publicly accessible.

Important distinction

Cloud Run URL accessibility
        ≠
Patient data authorization

The application must still enforce authorization.

8. Environment Variables and Secrets

🚨 NEVER COMMIT SECRETS TO GITHUB

Do not upload:

.env

API keys

service-account private keys

access tokens

database passwords

private credentials

authentication secrets

to GitHub.

Use Google Cloud secrets/configuration

Production secrets should be managed through Google Cloud mechanisms such as:

Cloud Run environment variables

Google Secret Manager

Sensitive credentials must never be hardcoded in source code.

Example

Bad:

GEMINI_API_KEY="real-secret-key"

inside committed source code.

Good:

process.env.GEMINI_API_KEY

with the secret supplied securely through the deployment environment.

9. Google AI Requirement

Gemini is the preferred AI engine

MedLens should use Google's Gemini ecosystem for AI-powered functionality.

AI may be used for:

Medical document understanding

OCR-assisted interpretation

Structured information extraction

Patient information extraction

Laboratory result extraction

Prescription information extraction

Ambiguity detection

Conflict detection

Patient-friendly summaries

Historical comparison explanations

Clarification questions

Source-grounded explanations

AI safety rule

Gemini must not be treated as an unquestioned medical source of truth.

The application must preserve:

Source information

Extracted information

Confidence

Provenance

Verification state

Human corrections

10. Google OCR / Document Processing

For document processing, prefer Google's document-processing capabilities.

Recommended services include:

Google Cloud Vision API

Google Cloud Document AI

The system should support appropriate medical documents such as:

PDF reports

Scanned reports

JPG/PNG images

Laboratory reports

Prescriptions

Previous medical documents

The exact Google service should be selected based on the document-processing requirements and available hackathon configuration.

11. Medical Reference-Range Rule

🚨 CRITICAL SAFETY RULE

The application must never invent a laboratory reference range.

Reference ranges must come from the source report whenever possible.

Example:

Hemoglobin: 12.1 g/dL
Reference range: 13–17 g/dL

The system may determine:

12.1 < 13
→ LOW

using deterministic application logic.

Required processing model

Medical Report
      ↓
Google OCR / Document AI
      ↓
Gemini Extraction
      ↓
Reference Range Extraction
      ↓
Application Validation
      ↓
Deterministic Status
      ↓
Human Verification
      ↓
Stored Medical Record

Status rules

value < lower bound
→ LOW

lower bound <= value <= upper bound
→ NORMAL

value > upper bound
→ HIGH

If the source report does not provide a usable reference range:

Status: Unable to determine

Do not guess.

12. AI vs Application Logic

The following separation is mandatory.

AI responsibilities

Gemini may:

Understand document layouts.

Extract explicit medical information.

Identify test names.

Extract values.

Extract units.

Extract source reference ranges.

Identify observations.

Identify dates.

Detect ambiguity.

Detect possible conflicts.

Generate factual summaries grounded in available data.

Application responsibilities

Normal application code must handle:

Schema validation.

Data type validation.

Range validation.

LOW/NORMAL/HIGH calculation.

Provenance assignment.

Verification state.

Authorization.

Audit logging.

Duplicate detection.

Data persistence.

Source linking.

User corrections.

Human responsibilities

The user must be able to:

Review extracted information.

Correct incorrect extraction.

Verify information.

Flag questionable information.

Resolve conflicts.

Core principle

AI extracts. Software validates. Humans verify. MedLens organizes.

13. No Diagnosis or Treatment Recommendations

🚫 STRICTLY PROHIBITED

MedLens must not:

Diagnose diseases.

Predict a patient's diagnosis.

Prescribe medication.

Recommend medication changes.

Recommend dosage changes.

Tell users to start/stop medication.

Replace a clinician.

Present uncertain AI output as medical fact.

Generate invented clinical facts.

Automatically resolve conflicting medical records without user verification.

Allowed

The application may say:

"Hemoglobin is below the reference range shown on this report."

It should not say:

"You have anemia."

The first statement describes source data.

The second makes a diagnosis.

14. Provenance Is Mandatory

Every important medical data field should retain its origin.

Supported origin categories:

USER_PROVIDED
AI_EXTRACTED
AI_GENERATED
HUMAN_VERIFIED

Important fields should also retain:

Source document

Source page

Source text where possible

Extraction confidence

Verification status

Created timestamp

Updated timestamp

Example

Test: Hemoglobin
Value: 12.1
Unit: g/dL
Reference: 13–17 g/dL
Status: LOW

Origin: AI_EXTRACTED
Source: Blood_Report.pdf
Page: 1
Confidence: 96%
Verification: NEEDS_REVIEW

15. Human Verification Rule

AI-extracted medical information must be reviewable.

The application should support:

AI Extraction
     ↓
Review
     ↓
Edit if necessary
     ↓
Verify

Human corrections must not silently overwrite the original AI extraction.

The system should preserve:

Original AI Value
Human Corrected Value
Who Corrected It
When It Was Corrected
Verification Status

16. Source-to-Record Traceability

This is a major MedLens differentiator.

The UI should make it possible to move from:

Structured Medical Data
        ↓
Original Source

Example:

A user clicks:

Hemoglobin — 12.1 g/dL

and MedLens should show the corresponding source document/page/text.

Preferred demonstration:

┌───────────────────────┬─────────────────────────┐
│ Original Report       │ Structured Information  │
│                       │                         │
│ Hemoglobin 12.1 g/dL  │ Hemoglobin: 12.1 g/dL  │
│ Reference 13–17 g/dL  │ Reference: 13–17       │
│                       │ Status: LOW             │
│                       │ Source: Page 1          │
└───────────────────────┴─────────────────────────┘

17. Patient Data Privacy

Medical information is sensitive.

The application must:

Restrict access to authorized users.

Separate users/patients appropriately.

Avoid exposing one patient's records to another user.

Protect uploaded documents.

Protect API keys.

Avoid logging unnecessary sensitive medical content.

Provide reasonable deletion/access controls where implemented.

Avoid exposing private patient data in client-side code unnecessarily.

Demo data

Use synthetic/demo medical data for demonstrations whenever possible.

Do not use real patient information unnecessarily.

18. GitHub Rules

GitHub is the source-code management platform required by the provided hackathon workflow.

The repository should contain:

Source code

Configuration templates

Documentation

README

.env.example where appropriate

Dockerfile if used

Database/schema definitions

Test configuration

The repository must not contain:

.env with secrets

API keys

Private service-account credentials

Passwords

Tokens

Real patient medical documents unless explicitly permitted and appropriately protected

Recommended commit discipline

Use meaningful commits such as:

feat: add medical report upload
feat: add Gemini extraction pipeline
feat: add source provenance
feat: add verification workflow
feat: add Cloud Run deployment configuration
fix: correct reference range validation

19. Antigravity Development Rule

Antigravity should be used as the primary AI-assisted development environment for the project.

However:

AI-assisted development does not remove the responsibility to review, test, and verify generated code.

Before accepting generated implementation:

Inspect the code.

Verify the logic.

Run the application.

Test important flows.

Check security.

Check medical safety.

Check data integrity.

Do not blindly accept generated code.

20. Deployment Failure Procedure

If Cloud Run deployment fails:

Open the Cloud Run/Cloud Build deployment information.

Read the actual error.

Identify whether the problem is:

Build

Dependency

Docker

Environment variable

Secret

Runtime

Port

Database

API configuration

Fix the issue in the project.

Commit the fix.

Push to GitHub.

Deploy again.

Re-test the live website.

Do not

Randomly change Google Cloud settings.

Delete infrastructure without understanding the consequences.

Expose secrets to solve authentication problems.

Disable security controls unnecessarily.

If unsure, contact the technical team according to the hackathon instructions.

21. Cloud Run Application Requirements

The deployed application must:

Listen on the port supplied by Cloud Run.

Start reliably.

Handle production environment variables.

Avoid localhost-only dependencies.

Avoid local filesystem assumptions for persistent data.

Fail gracefully when external APIs are unavailable.

Provide useful error messages.

Remain usable after deployment.

22. No Fake Functionality

🚨 HACKATHON DEMO INTEGRITY RULE

Do not present static mock data as a completed AI feature when the feature is supposed to work.

For example:

Bad

Upload PDF
↓
Pretend processing
↓
Hardcoded result

Good

Upload PDF
↓
Google document processing/OCR
↓
Gemini extraction
↓
Schema validation
↓
Reference-range calculation
↓
Stored structured result
↓
Human verification

The hackathon demo should show real functionality wherever the feature is presented as implemented.

23. Core MedLens Demo Workflow

The primary demo should demonstrate:

1. Open MedLens
        ↓
2. Create/select patient
        ↓
3. Upload medical report
        ↓
4. Process document
        ↓
5. Extract structured information
        ↓
6. Show source reference range
        ↓
7. Calculate LOW/NORMAL/HIGH
        ↓
8. Show provenance and confidence
        ↓
9. Human reviews/corrects
        ↓
10. Verify record
        ↓
11. Show dashboard
        ↓
12. Compare historical report
        ↓
13. Show patient-friendly summary
        ↓
14. Export doctor-ready record

Main "wow" moment

The strongest demonstration should be:

Source → Structured → Verified

Show the judge that MedLens can connect a real medical document to structured information and then allow a human to verify it.

24. Required Product Priorities

P0 — Must Work

Authentication/access control

Patient information

Medical document upload

PDF/JPG/PNG processing

Google OCR/document processing

Gemini extraction

Structured medical record

Laboratory result extraction

Source-based reference ranges

Deterministic status calculation

Provenance

Human verification

Source-to-record traceability

Dashboard

Safe AI summary

P1 — Strongly Recommended

Historical trends

Multi-report comparison

Conflict detection

Confidence indicators

Medical timeline

Search/filter

PDF export

Audit history

Clarification questions

P2 — Optional

Only implement if P0/P1 functionality is stable:

Prescription extraction

Family profiles

General medical assistant

Advanced analytics

Additional convenience features

25. Features That Must Not Distract From the Core Product

Do not spend excessive hackathon time on:

Generic wellness features

Fitness tracking

Appointment booking

Pharmacy systems

Insurance systems

Social features

Unnecessary chatbot functionality

Complex recommendation engines

Over-engineered infrastructure

The product should remain focused on:

Turning fragmented medical information into a structured, traceable, human-verified record.

26. Error Handling

Every important external dependency must have failure handling.

Examples:

OCR_FAILED
EXTRACTION_FAILED
SCHEMA_VALIDATION_FAILED
REFERENCE_RANGE_PARSE_FAILED
DATABASE_ERROR
AI_TIMEOUT
UPLOAD_FAILED
EXPORT_FAILED
UNAUTHORIZED
DOCUMENT_UNSUPPORTED

The UI should communicate the problem clearly.

Never fabricate a successful medical extraction after an actual processing failure.

27. AI Failure Rules

If Gemini returns invalid or incomplete output:

Validate the response.

Reject invalid schema.

Retry safely when appropriate.

Do not store malformed medical data as trusted data.

If extraction remains unsuccessful, show a clear failure/review state.

Never

Fill missing values with guesses.

Invent reference ranges.

Guess a diagnosis.

Guess a medication.

Guess a patient identity.

Silently repair uncertain medical values.

28. Accessibility Rules

The deployed application should be usable by a broad audience.

Implement:

Keyboard navigation

Visible focus states

Accessible labels

Semantic HTML

Readable typography

Sufficient contrast

Status labels that do not rely only on color

Accessible tables

Accessible chart summaries

Clear error messages

Responsive layouts

29. Performance Rules

The hackathon application should feel responsive.

Optimize:

Image/document uploads

OCR requests

Gemini requests

Database queries

Dashboard rendering

Chart rendering

PDF generation

Avoid unnecessary AI calls.

Use deterministic application logic wherever AI is not required.

30. Cost-Control Rules

Because Google Cloud may involve paid usage:

Do not repeatedly send the same document to Gemini unnecessarily.

Avoid unnecessary OCR calls.

Avoid processing duplicate documents repeatedly.

Use caching where appropriate.

Keep demo documents small and controlled.

Avoid unnecessary high-frequency polling.

Monitor Cloud Run and API usage.

Delete unnecessary test resources when appropriate.

31. Google Cloud Service Selection Principle

Prefer the simplest Google service that solves the requirement.

Do not over-engineer.

Example:

Need OCR
→ Cloud Vision / Document AI

Need AI reasoning/extraction
→ Gemini

Need web hosting/backend runtime
→ Cloud Run

Need build
→ Cloud Build

Need object/file storage
→ Cloud Storage

Need relational database
→ Cloud SQL

Need secrets
→ Secret Manager

Need logs
→ Cloud Logging

Use additional Google services only when they provide a clear benefit.

32. Architecture Principle

The architecture should remain simple enough to build, debug, and deploy during a hackathon.

Recommended logical architecture:

                 USER
                   │
                   ▼
             MEDLENS WEB APP
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
   GOOGLE CLOUD RUN     GOOGLE CLOUD STORAGE
          │                 │
          ▼                 │
   PROCESSING PIPELINE      │
          │                 │
     ┌────┴────┐            │
     ▼         ▼            │
 Document     Gemini        │
 AI/OCR       Extraction    │
     │         │            │
     └────┬────┘            │
          ▼                 │
    VALIDATION ENGINE       │
          │                 │
          ▼                 │
   PROVENANCE + REVIEW      │
          │                 │
          ▼                 │
      CLOUD SQL             │
          │                 │
          ▼                 │
 DASHBOARD / TRENDS /       │
 COMPARE / EXPORT           │

33. Do Not Over-Engineer

Avoid unnecessary:

Microservices

Kubernetes

Kafka

Complex event buses

Multiple databases

Custom OCR models

Custom ML infrastructure

Vector databases unless a clearly justified feature requires one

Complex distributed architectures

For a hackathon MVP:

Simple + functional + reliable > complex + unfinished

34. Security Rules

At minimum:

Never commit secrets.

Validate uploaded files.

Restrict file types.

Restrict file sizes.

Protect API routes.

Enforce authorization.

Sanitize user-controlled input.

Validate AI output.

Avoid exposing internal errors to users.

Protect stored documents.

Use HTTPS through Cloud Run.

Use Google IAM appropriately.

Use Secret Manager for sensitive credentials where applicable.

35. Medical Data Integrity Rules

The system must preserve the difference between:

Source Data
AI Extraction
Human Correction
AI Summary

These must not be conflated.

Example

Source:
Hemoglobin = 12.1 g/dL

AI extraction:
12.1 g/dL
Confidence: 0.96

Human correction:
12.7 g/dL

Verified record:
12.7 g/dL
Verified by user

The original source and original AI extraction should remain auditable.

36. No Silent Data Changes

The application must never silently modify medical information.

If a value changes:

Show that it changed.

Preserve the original value.

Record the correction.

Record verification state.

Maintain audit history where implemented.

37. Conflict Detection Rules

If two sources disagree, MedLens should flag the conflict.

Example:

Patient profile:
Allergy = Penicillin

Previous report:
Allergy = None

The application should say:

Potential conflict detected

It should not automatically decide which source is correct.

The user must be able to review the conflict.

38. Confidence Rules

Confidence represents:

Confidence in extraction accuracy

It does not represent:

Medical certainty or diagnosis certainty.

Example:

Extraction confidence: 96%

means the AI is highly confident that it read the source value correctly.

It does not mean:

96% certain the patient has a medical condition

39. Final Submission Readiness Checklist

Before submission, confirm:

Code

Project builds successfully.

GitHub repository is up to date.

No secrets are committed.

.env is not committed.

README explains setup and usage.

Required Google services are documented.

Application

Authentication works.

Patient creation works.

Document upload works.

OCR/document processing works.

Gemini extraction works.

Structured record works.

Reference ranges are source-based.

LOW/NORMAL/HIGH is deterministic.

Missing ranges show "Unable to determine".

Provenance works.

Human verification works.

Source traceability works.

Dashboard works.

Summary is safe.

Historical comparison works if implemented.

Export works if implemented.

Deployment

Cloud Run deployment succeeds.

Cloud Build succeeds.

Production environment variables are configured.

Secrets are securely configured.

Live Cloud Run URL works.

The complete demo works from the live URL.

Safety

No diagnosis.

No treatment recommendation.

No dosage changes.

No invented reference ranges.

No fabricated medical values.

No silent conflict resolution.

AI output is validated.

Sensitive data is protected.

40. Final Hackathon Rules — Non-Negotiable

The following rules must never be violated:

🚨 RULE 1

Use Google products/services for the MedLens production technology stack wherever applicable.

🚨 RULE 2

Deploy the final working project on Google Cloud Run.

🚨 RULE 3

Use GitHub for source-code management according to the hackathon workflow.

🚨 RULE 4

Never commit API keys, credentials, .env files, or private secrets to GitHub.

🚨 RULE 5

Use Gemini/Google AI for the AI layer rather than competing AI APIs.

🚨 RULE 6

Never allow the AI to invent laboratory reference ranges.

🚨 RULE 7

Reference-range status must be calculated deterministically by application logic.

🚨 RULE 8

Every important extracted medical field must retain provenance and source information.

🚨 RULE 9

Human verification must remain part of the medical-data workflow.

🚨 RULE 10

MedLens must not diagnose, prescribe, recommend treatment, or change medication dosage.

🚨 RULE 11

Never present fake/mock functionality as working functionality.

🚨 RULE 12

The live deployment must be tested end-to-end before submission.

41. MedLens Hackathon Principle

The entire project should follow this architecture and product philosophy:

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

And the core product mantra is:

AI extracts. Software validates. Humans verify. MedLens organizes.

42. Final Product Definition

MedLens is an AI-powered clinical information intelligence platform that uses Google AI and Google Cloud technologies to convert fragmented medical documents and patient information into a structured, source-traceable, human-verified longitudinal medical record.

The goal is not to build another medical chatbot.

The goal is to build a trustworthy clinical information layer that helps users organize and understand their existing medical information while keeping the original source, provenance, validation, and human verification visible.