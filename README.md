# Olsera Mitra Modal

> **AI-driven multi-lender financial aggregator for Olsera merchants**  
> PT Olsera Indonesia Pratama · Phase 1: Prototype & Partner Acquisition

---

## What Is This?

Olsera Mitra Modal is a web platform that connects **30,000+ micro-merchants** (warungs/UMKM) using the Sewarung POS system with **multiple verified lending partners** (banks, P2P lenders, fintech). 

Merchants get: one application → multiple loan offers, compared side by side.  
Partners get: pre-screened applicants with AI-generated credit profiles from real POS data.  
Olsera gets: a new revenue stream (referral fees) + deeper ecosystem lock-in.

**Olsera is NOT a lender.** All credit decisions and disbursements are made by certified partner institutions.

---

## Quick Start

### Prerequisites
- Node.js 20+
- Docker + Docker Compose
- MySQL 8 (or use Docker)
- Redis (or use Docker)

### Setup

```bash
# Clone the repo
git clone https://github.com/olsera/mitra-modal.git
cd mitra-modal

# Install dependencies (monorepo)
npm install

# Copy env files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Start dev infrastructure (MySQL + Redis)
docker-compose up -d mysql redis

# Run migrations + seed data
cd apps/api
npm run db:migrate
npm run db:seed

# Start development servers
cd ../..
npm run dev
```

App runs at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- API Docs: http://localhost:3001/api/docs

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Merchant | merchant@demo.com | demo123 |
| Partner (Bank Mandiri) | partner.mandiri@demo.com | demo123 |
| Olsera Admin | admin@olsera.com | demo123 |
| Data Team | data@olsera.com | demo123 |
| Management | coo@olsera.com | demo123 |

---

## Project Structure

```
olsera-mitra-modal/
│
├── apps/
│   ├── web/                          # React 18 + Vite + Tailwind
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── merchant/         # Merchant portal pages
│   │   │   │   │   ├── LandingPage.tsx
│   │   │   │   │   ├── DashboardPage.tsx
│   │   │   │   │   ├── SimulationStep1.tsx
│   │   │   │   │   ├── SimulationStep2.tsx
│   │   │   │   │   ├── OfferConfirmation.tsx
│   │   │   │   │   ├── ConsentPage.tsx
│   │   │   │   │   ├── TrackingPage.tsx
│   │   │   │   │   └── SuccessPage.tsx
│   │   │   │   ├── partner/          # Lending partner portal
│   │   │   │   │   ├── DashboardPage.tsx
│   │   │   │   │   ├── ApplicationDetailPage.tsx
│   │   │   │   │   ├── RegistrationPage.tsx
│   │   │   │   │   └── ProductCatalogPage.tsx
│   │   │   │   ├── admin/            # Olsera admin portal
│   │   │   │   │   ├── DashboardPage.tsx
│   │   │   │   │   ├── ApplicationManagementPage.tsx
│   │   │   │   │   ├── ApplicationDetailPage.tsx
│   │   │   │   │   ├── PartnerQueuePage.tsx
│   │   │   │   │   └── PartnerHealthPage.tsx
│   │   │   │   ├── data/             # Data team views
│   │   │   │   └── management/       # Executive dashboard
│   │   │   ├── components/
│   │   │   │   ├── ui/               # Base components (shadcn/ui + custom)
│   │   │   │   ├── merchant/         # Merchant-specific components
│   │   │   │   ├── partner/          # Partner-specific components
│   │   │   │   ├── admin/            # Admin-specific components
│   │   │   │   └── shared/           # Cross-portal components
│   │   │   ├── hooks/                # Custom React hooks
│   │   │   ├── stores/               # Zustand stores
│   │   │   ├── lib/                  # API client, query client setup
│   │   │   └── router/               # React Router config + guards
│   │   ├── public/
│   │   └── index.html
│   │
│   └── api/                          # Node.js + Express backend
│       ├── src/
│       │   ├── routes/               # Express routers
│       │   │   ├── auth.ts
│       │   │   ├── merchant.ts
│       │   │   ├── partner.ts
│       │   │   └── admin.ts
│       │   ├── controllers/          # Request handlers (thin)
│       │   ├── services/             # Business logic
│       │   │   ├── scoringService.ts
│       │   │   ├── matchingService.ts
│       │   │   ├── applicationService.ts
│       │   │   └── slaService.ts
│       │   ├── middleware/           # Auth, RBAC, validation, error handling
│       │   ├── models/               # Database query functions
│       │   ├── jobs/                 # Background jobs (SLA checks)
│       │   └── config/               # App config, DB connection
│       └── tests/
│
├── packages/
│   ├── shared/                       # Types + utilities used by both apps
│   │   ├── types/
│   │   │   ├── Application.ts
│   │   │   ├── Merchant.ts
│   │   │   ├── Partner.ts
│   │   │   └── Score.ts
│   │   └── utils/
│   │       ├── format.ts             # formatRupiah, formatDate, etc.
│   │       └── constants.ts          # Score tiers, status enums
│   └── ui/                           # Shared Olsera UI components (future)
│
├── database/
│   ├── migrations/                   # Numbered SQL migrations
│   │   ├── 001_create_users.sql
│   │   ├── 002_create_merchants.sql
│   │   ├── 003_create_partners.sql
│   │   ├── 004_create_applications.sql
│   │   └── 005_create_sla_config.sql
│   └── seeds/
│       ├── 001_demo_users.sql
│       ├── 002_demo_merchants.sql
│       ├── 003_demo_partners.sql
│       └── 004_demo_applications.sql
│
├── docs/
│   ├── figma-screenshots/            # UI reference screenshots
│   ├── adr/                          # Architecture Decision Records
│   ├── api-contract.md               # API endpoint documentation
│   └── data-flow.md                  # Consent + data sharing flow
│
├── docker-compose.yml
├── package.json                      # Monorepo root (npm workspaces)
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── tsconfig.base.json
├── CLAUDE.md                         ← Read this if using Claude Code
└── README.md                         ← This file
```

---

## User Portals

### 🏪 Merchant Portal (`/merchant`)
Merchants can simulate loan options, compare partner offers, submit applications with consent, and track status.

**Flow:** Landing → Simulation (amount + tenor) → Partner Comparison → Consent → Submit → Track

### 🏦 Partner Portal (`/partner`)
Lending partners review incoming applications with AI-enriched merchant profiles, make credit decisions, and track their portfolio.

### 🛡 Admin Portal (`/admin`)
Olsera team manages the platform: monitors all applications, approves new partners, tracks SLA compliance, views system health.

### 📊 Data Team (`/data`)
Internal analytics: Mitra Score distribution, merchant cohort analysis, credit performance.

### 📈 Management (`/management`)
Executive KPIs: GMV, merchant count, partner performance, revenue.

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Mitra Score** | AI credit proxy (300–900) derived from POS transaction history |
| **Smart Matching** | Filter partners by eligibility for amount + tenor combination |
| **Partner Comparison** | Side-by-side rate, tenor, and requirement comparison |
| **Consent Management** | UU PDP-compliant explicit data sharing authorization |
| **SLA Monitoring** | Real-time countdown timers; auto-alert on breach |
| **Partner Approval Queue** | Multi-stage onboarding review for new lending partners |
| **Audit Trail** | Full history of application state changes |
| **Data Auto-deletion** | Merchant data removed from partner systems upon rejection |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui |
| State | Zustand (UI), TanStack Query (server) |
| Backend | Node.js 20, Express.js, TypeScript |
| Database | MySQL 8 (Aurora MySQL on AWS) |
| Cache | Redis (sessions, SLA timers) |
| Auth | JWT (access + httpOnly refresh cookie) |
| Storage | AWS S3 (documents) |
| Infra | AWS EC2 ap-southeast-1, Docker |
| Testing | Vitest, React Testing Library, Playwright |

---

## Phase Roadmap

### ✅ Phase 1 — Prototype & Partner Acquisition (6–8 weeks)
- Full UI with mock partner data
- Core merchant simulation + application flow
- Partner portal (review + decision)
- Admin dashboard + partner queue
- User testing with 20–30 merchants

### 🔜 Phase 2 — Integration & Production (12–16 weeks)
*Requires: 1+ committed partner with API documentation*
- Real partner API integrations
- Live offer fetching
- Production deployment
- Security audit
- Partner UAT signoff

---

## Compliance & Privacy

- **UU PDP** (Indonesia Personal Data Protection Law): Explicit consent required before sharing any merchant data with partners
- **OJK Compliance**: Platform operates as aggregator, not lender — no lending license required
- **Data Minimization**: Only aggregated metrics (not raw transactions) shared with partners
- **Right to Deletion**: Merchant data auto-deleted from partner-accessible tables upon rejection

---

## Contributing

1. Branch naming: `feature/`, `fix/`, `chore/`
2. PRs require passing lint + tests
3. API changes must update `docs/api-contract.md`
4. New DB tables require a migration file

---

## License

Internal / Proprietary — PT Olsera Indonesia Pratama  
© 2026 All rights reserved
