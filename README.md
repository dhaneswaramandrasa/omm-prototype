# Olsera Mitra Modal

> **Multi-lender financial aggregator for Olsera micro-merchants**
> PT Olsera Indonesia Pratama · Phase 1: Prototype & Partner Acquisition

---

## What Is This?

Olsera Mitra Modal connects **30,000+ micro-merchants** (warungs/UMKM) on the Sewarung POS with **multiple verified lending partners** (banks, P2P lenders, fintech).

- **Merchants get:** one application → multiple offers, compared side by side
- **Partners get:** pre-screened applicants with AI-generated credit profiles from real POS data
- **Olsera gets:** referral fee revenue + deeper ecosystem lock-in

**Olsera is NOT a lender.** All credit decisions and disbursements are made by certified partner institutions.

---

## Committed Partners

| Partner | Type | Integration Model | Status |
|---------|------|-------------------|--------|
| **Adapundi** | P2P Fintech | Redirect — merchant sent to Adapundi via `https://h5-app.adapundi.com/?channel2=h5Olsera` | 🟢 **Live in prototype** |
| **OCBC — KTA Cashbiz** | Bank | Direct URL (pending from OCBC); product live in simulator (0.99% flat, Rp 25jt–2M, 6–36 bulan) | 🟡 **Coming Soon** |

> Both partners are live in the `demo/management-prototype` branch. Adapundi opens the redirect URL directly from the PartnerCard. OCBC shows as "Segera Hadir" (URL pending from partner). Real API integration is E12 (Phase 2).

---

## Current Build Status

| Epic | Description | Status |
|------|-------------|--------|
| E1 — Foundation | Monorepo, TypeScript, Docker, DB, React Router, Zustand | ✅ In Review |
| E2 — Design System | Tailwind tokens, shadcn/ui, 9 shared components, 5 layout shells | ✅ In Review |
| E3 — Auth & RBAC | Mock login + role routing (frontend); backend endpoints pending | 🔄 Frontend ✅ · API ⬜ |
| E4 — Merchant Flow | All 7 pages built (mock data); backend API pending | 🔄 Frontend ✅ · API ⬜ |
| E5 — Partner Portal | Dashboard + Application Detail built (mock); remaining pages + API pending | 🔄 Partial · API ⬜ |
| E6 — Admin Portal | Dashboard + App Management + Partner Queue built (mock); API pending | 🔄 Frontend ✅ · API ⬜ |
| E7 — Scoring Engine | Not started | ⬜ Todo |
| E8 — SLA Management | SLA Timer UI component built; Redis + cron backend pending | 🔄 UI ✅ · Backend ⬜ |
| E9 — DB & Seeds | Migrations scaffolded; full seed data pending | 🔄 Partial |
| E10 — Data/Mgmt Views | Executive + Data Intelligence pages built (mock); API pending | 🔄 Frontend ✅ · API ⬜ |
| E11 — Testing & QA | Not started | ⬜ Todo |
| E12 — Partner API | Adapundi (redirect) + OCBC (coming soon) integrated in prototype; real API integration is Phase 2 | 🔄 Phase 1 Redirect ✅ · Phase 2 API ⬜ |
| E13 — Production Infra (Phase 2) | Not started | 🔒 Phase 2 |

### Active branches

| Branch | Purpose |
|--------|---------|
| `main` | Stable base — E1 + E2 merged |
| `ols-18/ui-components` | E2 components (In Review, not merged) |
| `demo/management-prototype` | **Full clickable prototype** — all 5 portals, mock data, no backend |

> **Demo branch** (`demo/management-prototype`) contains a complete frontend prototype with mock data for all roles. Use this for management presentations. It does NOT require Docker or a running API.

---

## Quick Start

### Option A — Demo prototype (no backend needed)

```bash
git checkout demo/management-prototype
cd apps/web
npm install
npm run dev
```

Open http://localhost:5173 — log in with any demo account below.

### Option B — Full dev environment

#### Prerequisites
- Node.js 22+
- Docker + Docker Compose

```bash
# Install dependencies (monorepo root)
npm install

# Copy env files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Start MySQL + Redis
docker-compose up -d mysql redis

# Run DB migrations + seed data
cd apps/api && npm run db:migrate && npm run db:seed

# Start both servers
cd ../.. && npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3001 |
| API Docs | http://localhost:3001/api/docs |

### Demo Accounts

| Role | Email | Password | Portal |
|------|-------|----------|--------|
| Merchant | merchant@demo.com | demo123 | `/merchant` |
| Partner (Bank Mandiri) | partner.mandiri@demo.com | demo123 | `/partner` |
| Olsera Admin | admin@olsera.com | demo123 | `/admin` |
| Data Team | data@olsera.com | demo123 | `/data` |
| COO / Management | coo@olsera.com | demo123 | `/management` |

---

## Project Structure

```
olsera-mitra-modal/
│
├── apps/
│   ├── web/                          # React 18 + Vite + Tailwind (frontend)
│   │   └── src/
│   │       ├── pages/
│   │       │   ├── auth/
│   │       │   │   └── LoginPage.tsx              # Mock auth + demo account switcher
│   │       │   ├── merchant/
│   │       │   │   ├── DashboardPage.tsx           # ATRI score, stats, stores, achievements
│   │       │   │   ├── SimulationStep1Page.tsx     # Amount + tenor selection
│   │       │   │   ├── SimulationStep2Page.tsx     # Partner comparison cards
│   │       │   │   ├── OfferConfirmationPage.tsx   # Installment breakdown
│   │       │   │   ├── ConsentPage.tsx             # UU PDP data scope consent
│   │       │   │   ├── SuccessPage.tsx             # APP-ID confirmation
│   │       │   │   └── TrackingPage.tsx            # Live timeline + SLA countdown
│   │       │   ├── partner/
│   │       │   │   ├── DashboardPage.tsx           # KPIs + pending applications table
│   │       │   │   └── ApplicationDetailPage.tsx   # Score card + approve/reject
│   │       │   ├── admin/
│   │       │   │   ├── DashboardPage.tsx           # KPIs, partner perf, SLA alerts
│   │       │   │   ├── ApplicationManagementPage.tsx # Search/filter + full table
│   │       │   │   └── PartnerQueuePage.tsx        # Onboarding queue + stage progress
│   │       │   ├── data/
│   │       │   │   └── DataIntelligencePage.tsx    # Score factors, tier dist, audit log
│   │       │   └── management/
│   │       │       └── ExecutiveDashboardPage.tsx  # KPIs, ecosystem flow, growth chart
│   │       ├── components/
│   │       │   ├── layouts/
│   │       │   │   ├── AuthLayout.tsx
│   │       │   │   ├── MerchantLayout.tsx
│   │       │   │   ├── PartnerLayout.tsx
│   │       │   │   ├── AdminLayout.tsx
│   │       │   │   ├── DataLayout.tsx
│   │       │   │   └── ManagementLayout.tsx
│   │       │   ├── nav/
│   │       │   │   └── TopNav.tsx                  # Logo + user name + sign out
│   │       │   ├── StatCard.tsx
│   │       │   ├── StatusBadge.tsx
│   │       │   ├── SLATimer.tsx
│   │       │   ├── MitraScoreCard.tsx
│   │       │   ├── PartnerCard.tsx
│   │       │   ├── StepperBar.tsx
│   │       │   ├── ApplicationTable.tsx
│   │       │   ├── ProgressBar.tsx
│   │       │   └── RupiahInput.tsx
│   │       ├── stores/
│   │       │   ├── authStore.ts                    # user, token, role (sessionStorage)
│   │       │   └── simulationStore.ts              # amount, tenor, selectedPartnerId
│   │       ├── lib/
│   │       │   ├── mockData.ts                     # All mock data for prototype
│   │       │   └── utils.ts
│   │       └── router/
│   │           └── index.tsx                       # Role-based guards + all routes
│   │
│   └── api/                          # Node.js + Express backend (⬜ most endpoints pending)
│       └── src/
│           ├── routes/               # auth.ts, merchant.ts, partner.ts, admin.ts
│           ├── controllers/          # Thin request handlers
│           ├── services/             # scoringService.ts, matchingService.ts, applicationService.ts, slaService.ts
│           ├── middleware/           # Auth JWT, RBAC, Zod validation, error handling
│           ├── models/               # DB query functions
│           ├── jobs/                 # SLA check cron
│           └── config/               # DB connection, app config
│
├── packages/
│   ├── shared/                       # Types + utilities (used by web + api)
│   │   ├── types/                    # Application, Merchant, Partner, MitraScore, etc.
│   │   └── utils/
│   │       └── format.ts             # formatRupiah, formatRupiahShort, formatDate, formatPercent, formatTimer
│   └── ui/                           # Shared Olsera component library (future)
│
├── database/
│   ├── migrations/                   # Numbered SQL files (001_ … )
│   └── seeds/                        # Dev seed data SQL files
│
├── docs/
│   ├── PRD.md
│   ├── SCREEN_LIST.md
│   ├── API_LIST.md
│   ├── EPICS_TASKS.md
│   └── figma-screenshots/            # UI reference per screen ID
│
├── docker-compose.yml
├── package.json                      # Monorepo root (npm workspaces)
├── .env.example
├── tsconfig.base.json
├── CLAUDE.md                         ← Read this before touching any code
└── README.md                         ← This file
```

---

## User Portals

### 🏪 Merchant Portal (`/merchant`)
Merchants simulate loan options, compare partner offers, submit applications with UU PDP-compliant consent, and track their application status in real time.

**Flow:** Dashboard → Simulation Step 1 (amount + tenor) → Step 2 (partner comparison) → Offer Confirmation → Consent → Submit → Track

### 🏦 Partner Portal (`/partner`)
Lending partners review incoming applications enriched with Mitra Score and aggregated merchant data, then approve or reject within SLA.

### 🛡 Admin Portal (`/admin`)
Olsera ops team monitors all applications, manages partner onboarding pipeline, and tracks SLA compliance across all partners.

### 📊 Data Team (`/data`)
Internal analytics: Mitra Score factor weights, merchant tier distribution, score model performance, and UU PDP data access audit logs.

### 📈 Management (`/management`)
Executive KPIs: total volume, approval rate, conversion rate, ecosystem flow, partner yield breakdown, merchant growth trend.

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Mitra Score** | AI credit proxy (300–850) derived from real POS transaction history |
| **Smart Matching** | Filters partners by score threshold, amount, and tenor eligibility |
| **Partner Comparison** | Side-by-side rate, tenor, installment, and tag comparison |
| **Consent Management** | UU PDP-compliant explicit data scope authorization before any sharing |
| **SLA Monitoring** | Live countdown timers; auto-alert on breach; red indicator at <30 min |
| **Partner Onboarding Queue** | Multi-stage review pipeline with risk badges and progress tracking |
| **Data Audit Log** | Full record of every partner data access event |
| **Data Auto-deletion** | Merchant PII removed from partner-accessible records on rejection |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TypeScript (strict), Tailwind CSS, shadcn/ui |
| State | Zustand (UI/auth), TanStack Query (server state) |
| Backend | Node.js 22, Express.js, TypeScript (strict) |
| Validation | Zod (all API inputs) |
| Database | MySQL 8 (Aurora MySQL on AWS in prod) |
| Cache / SLA | Redis (session store + SLA countdown timers) |
| Auth | JWT access token (15 min) + httpOnly refresh cookie (7 days) |
| Storage | AWS S3 (documents) |
| Infra | AWS EC2 ap-southeast-1, Docker Compose |
| Testing | Vitest, React Testing Library, Playwright |

---

## API Response Format

All endpoints return the same envelope:
```json
{ "success": true, "data": { ... }, "meta": { ... } }
{ "success": false, "error": { "code": "CONSENT_REQUIRED", "message": "..." } }
```

See `docs/API_LIST.md` for all endpoints, request/response schemas, and error codes.

---

## Phase Roadmap

### 🔄 Phase 1 — Prototype & Partner Acquisition (current)
- [x] Full monorepo + dev tooling
- [x] Complete design system (9 components + 5 layouts)
- [x] Clickable frontend prototype — all 5 portals, mock data
- [ ] Backend API endpoints (E3 → E4 → E5 → E6 → E7 → E8 → E9 → E10)
- [ ] Real database with seed data
- [ ] Automated test suite (E11)
- [ ] User testing with 20–30 merchants

### 🔄 Phase 2 — Integration & Production
*Partners committed: **Adapundi** (redirect live) + **OCBC KTA Cashbiz** (URL pending). Real API integration blocked on API documentation from partners.*
- [ ] Adapundi full API integration — submit via API instead of redirect (E12-T02)
- [ ] OCBC KTA Cashbiz API integration — URL + sandbox credentials pending (E12-T03)
- [ ] Production infrastructure on AWS (E13)
- [ ] Security audit + load testing
- [ ] Partner UAT signoff

---

## Compliance & Privacy

- **UU PDP** (UU No. 27/2022): Explicit consent required before sharing any merchant data with partners
- **OJK**: Platform operates as aggregator, not lender — no lending license required
- **Data Minimization**: Only aggregated metrics shared with partners, never raw transactions
- **Right to Deletion**: Merchant PII auto-deleted from partner-accessible records upon rejection

---

## Development Notes

### Commands

```bash
npm run dev          # Start both web + api concurrently (from root)
npm run typecheck    # TypeScript check across all workspaces
npm run lint         # ESLint across all workspaces
npm run test         # Vitest unit tests

# API workspace
cd apps/api
npm run db:migrate   # Run pending migrations
npm run db:seed      # Seed dev data
npm run db:reset     # Drop all + re-migrate + re-seed (dev only)
```

### Branch naming
```
{ticket-id}/{short-description}
# e.g. ols-35/scoring-service, ols-38/partner-decision-endpoint
```

### Next epic to work on
Following dependency order: **E3 (Auth backend)** → E7 (Scoring) → E4 (Merchant API) → E8 (SLA) → E5 (Partner API) → E6 (Admin API) → E9 (Seeds) → E10 (Analytics API) → E11 (Tests)

---

## License

Internal / Proprietary — PT Olsera Indonesia Pratama
© 2026 All rights reserved
