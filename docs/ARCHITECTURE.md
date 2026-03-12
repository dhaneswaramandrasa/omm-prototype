# Architecture — Olsera Mitra Modal
**Version:** 1.0
**Updated:** March 2026

---

## 1. Overview

Olsera Mitra Modal (OMM) is a **monorepo web application** built with a React frontend and an Express API backend. It operates as a neutral aggregator — it never holds funds, never makes credit decisions, and never disburses loans. All financial actions are delegated to certified partner institutions.

**Architecture pattern:** Traditional client-server (SPA + REST API), not microservices. Chosen for Phase 1 speed; can be decomposed in Phase 3+.

---

## 2. Repository Structure

```
omm/
├── apps/
│   ├── web/                        # React 18 + Vite frontend (port :5173)
│   │   ├── src/
│   │   │   ├── pages/              # Route-level page components
│   │   │   │   ├── auth/           # Login, ForgotPassword
│   │   │   │   ├── merchant/       # All merchant portal pages
│   │   │   │   ├── partner/        # All partner portal pages
│   │   │   │   ├── admin/          # All admin portal pages
│   │   │   │   ├── management/     # Executive dashboard
│   │   │   │   ├── data/           # Data intelligence
│   │   │   │   ├── vas/            # VAS console (stub)
│   │   │   │   └── system/         # BOS loop (stub)
│   │   │   ├── components/
│   │   │   │   ├── shared/         # StatCard, StatusBadge, SLATimer, etc.
│   │   │   │   ├── merchant/       # PartnerCard, ConsentModal, RupiahSlider
│   │   │   │   └── layouts/        # MerchantLayout, PartnerLayout, AdminLayout
│   │   │   ├── hooks/              # React Query hooks per domain
│   │   │   ├── stores/             # Zustand: authStore, simulationStore
│   │   │   ├── lib/                # API client (Axios), utils
│   │   │   ├── router.tsx          # React Router v6 routes + guards
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   └── vite.config.ts
│   │
│   └── api/                        # Express.js API (port :3001)
│       ├── src/
│       │   ├── routes/             # Route definitions per domain
│       │   │   ├── auth.routes.ts
│       │   │   ├── merchant.routes.ts
│       │   │   ├── partner.routes.ts
│       │   │   ├── admin.routes.ts
│       │   │   ├── data.routes.ts
│       │   │   ├── management.routes.ts
│       │   │   └── internal.routes.ts
│       │   ├── controllers/        # Request handlers (thin layer)
│       │   ├── services/           # Business logic
│       │   │   ├── authService.ts
│       │   │   ├── scoringService.ts   # ← E7, most critical
│       │   │   ├── matchingService.ts  # ← E7
│       │   │   ├── applicationService.ts
│       │   │   ├── slaService.ts
│       │   │   └── consentService.ts
│       │   ├── middleware/
│       │   │   ├── authenticate.ts     # JWT verification, attach req.user
│       │   │   ├── requireRole.ts      # RBAC guard
│       │   │   └── validate.ts         # Zod schema validation
│       │   ├── db/
│       │   │   ├── client.ts           # MySQL connection pool
│       │   │   ├── migrations/         # 001_create_users.sql ... 010_sla.sql
│       │   │   └── seeds/              # users.sql, merchants.sql, etc.
│       │   ├── redis/
│       │   │   └── client.ts           # Redis client + SLA timer helpers
│       │   ├── jobs/                   # Background cron jobs
│       │   │   ├── slaChecker.ts       # Every 5 min — breach detection
│       │   │   └── scoreRecalc.ts      # Nightly — bulk score update
│       │   └── app.ts                  # Express app setup
│       └── tsconfig.json
│
├── packages/
│   ├── shared/                     # Types + utilities shared between apps
│   │   ├── src/
│   │   │   ├── types/              # Application, Merchant, Partner, etc.
│   │   │   └── utils/              # formatRupiah, formatDate, formatPercent
│   │   └── package.json
│   │
│   └── ui/                         # shadcn/ui component overrides (if any)
│       └── package.json
│
├── docs/                           # This folder — all project documentation
├── docker-compose.yml              # MySQL 8 + Redis for local dev
├── .env.example
├── package.json                    # Root workspace (npm workspaces)
└── tsconfig.base.json              # Strict TypeScript base config
```

---

## 3. Tech Stack

### Frontend (`apps/web`)

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| Framework | React | 18 | Ecosystem, team familiarity |
| Build | Vite | 5.x | Fast HMR, native ESM |
| Routing | React Router | v6 | File-based-like, nested routes |
| State — server | TanStack Query | v5 | Cache, refetch, loading states |
| State — client | Zustand | 4.x | Minimal boilerplate, no provider hell |
| Styling | Tailwind CSS | 3.x | Utility-first, consistent with tokens |
| Components | shadcn/ui | latest | Radix primitives, accessible, unstyled |
| Charts | Recharts | 2.x | React-native chart API |
| HTTP | Axios | 1.x | Interceptors for auth + refresh |
| Validation | Zod | 3.x | Shared schemas with backend |
| Language | TypeScript | 5.x (strict) | Type safety throughout |

### Backend (`apps/api`)

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| Framework | Express.js | 4.x | Mature, minimal, flexible |
| Language | TypeScript | 5.x (strict) | Type safety |
| Validation | Zod | 3.x | Request body validation |
| Auth | jsonwebtoken | 9.x | JWT sign/verify |
| Password | bcrypt | 5.x | Secure password hashing |
| ORM | Raw SQL (mysql2) | 3.x | Full control, no magic, Phase 1 simplicity |
| Redis client | ioredis | 5.x | SLA timers + token revocation |
| Scheduler | node-cron | 3.x | SLA checker + score recalc jobs |

### Infrastructure

| Component | Local (Phase 1) | Production (Phase 2) |
|-----------|-----------------|---------------------|
| Database | MySQL 8 via Docker | Aurora MySQL (Multi-AZ, ap-southeast-1) |
| Cache / SLA | Redis via Docker | ElastiCache Redis |
| File Storage | Local filesystem | S3 + IAM |
| Reverse Proxy | Direct (Vite proxy) | Nginx |
| Hosting | Developer machine | AWS EC2 (ap-southeast-1) |
| CI/CD | Manual | GitHub Actions |
| Monitoring | Console logs | Datadog APM |

---

## 4. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           BROWSER (SPA)                             │
│                                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────┐  ┌──────────┐ │
│  │ Merchant │  │ Partner  │  │  Admin   │  │ Data │  │  Mgmt    │ │
│  │  Portal  │  │  Portal  │  │  Portal  │  │      │  │          │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──┬───┘  └────┬─────┘ │
│       └─────────────┴─────────────┴────────────┴───────────┘       │
│                               │                                     │
│           React Router v6 + TanStack Query + Zustand                │
└───────────────────────────────┼─────────────────────────────────────┘
                                │ HTTPS
                                │ Bearer JWT (15 min)
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     EXPRESS API  (:3001)                            │
│                                                                     │
│  authenticate.ts → requireRole.ts → validate.ts (Zod) → controller │
│                                                                     │
│  ┌────────────┐  ┌──────────────┐  ┌────────────┐  ┌────────────┐  │
│  │ authService│  │ scoringService│  │matchingServ│  │  slaService│  │
│  └────────────┘  └──────────────┘  └────────────┘  └────────────┘  │
│  ┌─────────────────────┐  ┌───────────────────────────────────────┐ │
│  │ applicationService  │  │          consentService               │ │
│  └─────────────────────┘  └───────────────────────────────────────┘ │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                  Background Jobs (node-cron)                  │   │
│  │  slaChecker (every 5 min)  │  scoreRecalc (nightly 02:00 WIB)│   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────────┬──────────────────────────────┬───────────────────────┘
               │                              │
               ▼                              ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│      MySQL 8             │    │         Redis             │
│                          │    │                          │
│  • users                 │    │  • sla:app:{id}  (TTL)   │
│  • merchants / stores    │    │  • revoked:{token}        │
│  • merchant_scores       │    │  • session:{userId}       │
│  • partners / products   │    │                          │
│  • partner_onboarding    │    └──────────────────────────┘
│  • loan_applications     │
│  • application_consents  │
│  • application_timeline  │
│  • partner_decisions     │
│  • sla_config/breaches   │
│  • support_tickets       │
└──────────────────────────┘
```

---

## 5. Authentication & Security

### Token Flow

```
1. POST /auth/login
   → Response body:  { accessToken }        (15 min JWT)
   → httpOnly cookie: refreshToken           (7 days, Secure, SameSite=Strict)

2. All API calls:
   Authorization: Bearer <accessToken>

3. On 401 (expired):
   → Axios interceptor fires automatically
   → POST /auth/refresh (sends refreshToken cookie)
   → New accessToken stored in Zustand
   → Original request retried

4. POST /auth/logout:
   → Redis: SET revoked:{jti} 1 EX <ttl>
   → Cookie cleared
```

### RBAC

| Route Prefix | Required Role | Notes |
|---|---|---|
| `/merchant/*` | `merchant` | Merchant can only see own data |
| `/partner/*` | `partner` | Partner sees only assigned applications |
| `/admin/*` | `admin` | Full read on all data |
| `/data/*` | `admin`, `data` | No PII — aggregated only |
| `/management/*` | `admin`, `management` | Read-only KPIs |
| `/internal/*` | Internal API key | Not JWT — cron job authentication |

### Security Measures
- Zod validation on all request bodies (rejects unknown fields)
- SQL parameterized queries via `mysql2` (no raw string interpolation)
- Rate limiting: 100 req/min per IP on auth endpoints
- CORS restricted to known origins
- Helmet.js for HTTP security headers

---

## 6. Data Flow — Merchant Loan Application

```
1. Merchant logs in → JWT issued

2. GET /merchant/score
   → scoringService reads merchant_stores + merchant_scores
   → Returns Mitra Score (300–900) + tier

3. GET /merchant/simulate?amount=X&tenor=Y
   → matchingService fetches all active partner_products
   → Filters by: amount range, tenor range, min_score_required ≤ merchant score
   → Returns eligible[] + ineligible[] with reason codes

4. Merchant selects partner → POST /merchant/consent
   → consentService creates application_consents record
   → Returns consent_id (CNS-XXXXX)

5. POST /merchant/applications { partnerId, amount, tenor, consentId }
   → applicationService validates consent exists + not expired
   → Creates loan_applications record (status: pending)
   → Creates application_timeline entry (submitted)
   → slaService: SET Redis key sla:app:{id} EX <sla_hours * 3600>
   → Returns applicationId (APP-XXXXX)

6. Partner sees application in dashboard
   → GET /partner/applications (reads sla:app:{id} TTL from Redis for remaining seconds)

7. Partner reviews → POST /partner/applications/:id/decision
   → Validates consent exists (403 if not)
   → Creates partner_decisions record
   → Updates loan_applications.status
   → Appends application_timeline entry
   → If rejected: deletePartnerAccessibleData(appId) → hard-deletes merchant PII
   → Redis: DEL sla:app:{id}

8. Merchant checks status → GET /merchant/applications/:id
   → Returns full timeline array
```

---

## 7. SLA Management

```
Per partner: sla_config table stores review_hours + decision_hours

On application submit:
  Redis: SET sla:app:{appId} "" EX (decision_hours × 3600)

Every 5 minutes (slaChecker cron job):
  - Queries all loan_applications WHERE status IN ('pending','reviewing')
  - For each: GET sla:app:{id} from Redis
  - If key missing (expired): INSERT sla_breaches; UPDATE application status
  - Admin dashboard reads sla_breaches for alerts panel

On partner decision:
  Redis: DEL sla:app:{appId}
  (Clears timer immediately — no false breach)
```

---

## 8. Scoring Engine

Mitra Score is calculated nightly by `scoreRecalc` job (02:00 WIB) and on-demand via `POST /internal/scores/recalculate`.

```
calculateMitraScore(merchantId):
  1. Fetch last 12 months of transactions from merchant_stores
  2. Calculate 5 weighted factors:
     factor_monthly_revenue    × 0.30  → score 0-100
     factor_growth_rate        × 0.25  → MoM revenue growth
     factor_tx_consistency     × 0.20  → std dev of monthly tx count
     factor_platform_tenure    × 0.15  → months since registered_at
     factor_category_risk      × 0.10  → risk tier of business category

  3. Final score = Σ(factor_score × weight) × 9 + 300
     → Range: 300 (worst) → 900 (best)

  4. Tier assignment:
     750+ → excellent (Gold Tier)
     600–749 → good (Silver Tier)
     450–599 → fair (Bronze Tier)
     <450 → poor (Starter)

  5. INSERT/UPDATE merchant_scores with all factor breakdowns
```

---

## 9. Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Monorepo vs separate repos | Monorepo (npm workspaces) | Shared types, atomic PRs, simpler CI for Phase 1 |
| ORM vs raw SQL | Raw SQL (mysql2) | Full control, no migration magic, easier debugging for small team |
| JWT vs sessions | JWT + httpOnly refresh cookie | Stateless access tokens, revocation via Redis for logout/security |
| TanStack Query vs SWR | TanStack Query v5 | More powerful (mutation, invalidation, prefetch); team prefers it |
| shadcn/ui vs MUI | shadcn/ui | Unstyled Radix primitives + Tailwind; no style conflicts; accessible |
| MySQL vs PostgreSQL | MySQL 8 | AWS Aurora MySQL available; team familiarity; JSON column support |
| Amounts as integers | INTEGER (Rupiah, no decimals) | No floating point errors; Indonesian currency has no sub-unit |
| Soft delete | `deleted_at TIMESTAMP NULL` | Audit trail; except partner rejection → hard delete of merchant PII (UU PDP) |
| Phase 1 mock data | No real partner API | Phase 2 gate: real API only after partner commitment + signed agreement |

---

## 10. Phase 2 Extensions (Not in Phase 1)

- **Partner API Connectors** — `IPartnerConnector` adapter pattern per partner
- **Webhook receiver** — `POST /webhooks/partner/:id/decision` for async decisions
- **Document Storage** — S3 + presigned URLs for KYC document uploads
- **Email/SMS notifications** — SES for status updates (application submitted, decision made)
- **Production infrastructure** — Aurora Multi-AZ, ElastiCache, Nginx, CI/CD, Datadog
- **Advanced credit scoring** — ML model replacing rule-based scoring engine (Phase 3)
