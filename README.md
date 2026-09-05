# MedLens — AI-Powered Clinical Information Intelligence

MedLens turns fragmented medical documents into a structured, traceable, and human-verified patient record.

## Features

- **AI Document Extraction** — Upload medical reports (PDF) and automatically extract lab results, prescriptions, and clinical data using Gemini AI
- **Patient Dashboard** — Real-time clinical overview with flagged results, verification status, and conflict detection
- **Lab Results Management** — Structured lab results with deterministic status evaluation (Low/Normal/High)
- **Multi-Patient Records** — Patient directory with search, patient switching, and individual clinical profiles
- **Provenance Traceability** — Full audit trail showing AI-extracted vs. human-verified data origins
- **Review Center** — Clinician verification workflow for AI-extracted data with approve/edit/reject actions
- **Medical Timeline** — Chronological event history for each patient record
- **Trend Analysis** — Multi-parameter correlation charts (e.g., HbA1c vs. Fasting Glucose over time)
- **Report Comparison** — Side-by-side comparison of multiple lab reports
- **Conflict Detection** — AI-powered identification of discrepancies between lab reports
- **Doctor-Ready PDF Export** — One-click patient summary PDF generation
- **Dark/Light/System Theme** — Full theme support with persistent preferences
- **Authentication** — JWT-based session management with clinician roles

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite via Prisma ORM
- **AI**: Google Gemini 1.5/2.0 Flash
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Auth**: JWT + bcryptjs

## Getting Started

```bash
# Install dependencies
npm install

# Generate Prisma client and push schema
npx prisma generate
npx prisma db push

# Seed demo data
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — use demo credentials: `admin@medlens.org` / `password123`

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
GEMINI_API_KEY="your-gemini-api-key"
GCP_PROJECT_ID="your-gcp-project"
GCS_BUCKET_NAME="your-bucket-name"
```

## Project Structure

```
app/
├── api/          # API routes (auth, upload, patients, lab-results, conflicts)
├── dashboard/    # Patient dashboard page
├── lab-results/  # Lab results listing & search
├── login/        # Authentication page
├── patients/     # Patient directory & creation
├── compare/      # Multi-report comparison
├── timeline/     # Medical event timeline
├── trends/       # Lab parameter trend analysis
├── review/       # Clinician verification center
├── provenance/   # Data traceability view
├── export/       # PDF export page
└── reports/      # Report upload & detail pages

components/
├── ai/           # Voice assistant, AI features
├── compare/      # Report comparison components
├── dashboard/    # Patient dashboard components
├── export/       # PDF generation components
├── lab-results/  # Lab result display components
├── layout/       # Sidebar, TopBar, LayoutShell
├── patient/      # Patient switcher & directory
├── provenance/   # Traceability view components
├── review/       # Verification center components
├── theme/        # ThemeProvider & ThemeToggle
├── timeline/     # Medical timeline components
└── trends/       # Trend chart components

lib/
├── ai/           # Gemini AI integration
├── auth.ts       # JWT authentication helpers
├── ocr/          # Document OCR processing
├── pipeline/     # Document processing pipeline
├── prisma.ts     # Prisma client singleton
├── safety/       # Lab result safety evaluator
└── storage/      # File storage (GCS/local)
```

## License

Private — Built for Healthcare Professionals.