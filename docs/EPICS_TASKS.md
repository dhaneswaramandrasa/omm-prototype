# Epics & Tasks — Olsera Mitra Modal
**Phase 1 Duration:** 8 weeks
**Team:** 1 Frontend Dev, 1 Backend Dev, 0.5 UI/UX, 0.5 QA, 0.5 DevOps
**Task format:** ID · Title · Acceptance Criteria · Dependencies · Estimate

---

## Build Status (as of 9 Mar 2026)

| Epic | Status | Notes |
|------|--------|-------|
| E1 — Foundation | ✅ Done | All tasks complete and In Review on Linear |
| E2 — Design System | ✅ Done | 9 components + 5 layouts built; In Review on Linear |
| E3 — Auth & RBAC | 🔄 Frontend ✅ · Backend ⬜ | LoginPage + role routing done (mock); API endpoints pending |
| E4 — Merchant Flow | 🔄 Frontend ✅ · Backend ⬜ | All 7 pages built with mock data; API + DB pending |
| E5 — Partner Portal | 🔄 Partial · Backend ⬜ | Dashboard + AppDetail built; Product Catalog, Registration pending; API pending |
| E6 — Admin Portal | 🔄 Frontend ✅ · Backend ⬜ | Dashboard + AppMgmt + PartnerQueue built; API pending |
| E7 — Scoring Engine | ⬜ Next | Not started — **start here next** |
| E8 — SLA Management | 🔄 UI ✅ · Backend ⬜ | SLATimer component built; Redis + cron job pending |
| E9 — DB & Seeds | 🔄 Partial | Migrations scaffolded (E1); full seed SQL files pending |
| E10 — Data/Mgmt Views | 🔄 Frontend ✅ · Backend ⬜ | DataIntelligencePage + ExecutiveDashboard built (mock); API pending |
| E11 — Testing & QA | ⬜ Todo | Not started |
| E12 — Partner API | 🔄 Phase 1 Redirect ✅ · Phase 2 API ⬜ | 2 committed partners integrated in prototype (redirect model); real API = Phase 2 |
| E13 — Production Infra | 🔒 Phase 2 | Not started |

**Active branches:**
- `main` — stable base (E1 merged)
- `ols-18/ui-components` — E2 components (In Review, not yet merged to main)
- `demo/management-prototype` — full clickable prototype, all 5 portals, no backend required

**Recommended next epic order:** E3 backend → E7 → E4 backend → E8 backend → E5 backend → E6 backend → E9 seeds → E10 backend → E11

---

## Epic Map

| # | Epic | Phase | Priority | Status |
|---|------|-------|----------|--------|
| E1 | Project Foundation & Dev Environment | 1 | P0 | ✅ Done |
| E2 | Design System & Shared Components | 1 | P0 | ✅ Done |
| E3 | Authentication & RBAC | 1 | P0 | 🔄 In Progress |
| E4 | Merchant Flow — Simulation & Application | 1 | P0 | 🔄 In Progress |
| E5 | Partner Portal — Review & Decision | 1 | P0 | 🔄 In Progress |
| E6 | Admin Portal — Operations & Monitoring | 1 | P0 | 🔄 In Progress |
| E7 | Scoring & Matching Engine | 1 | P0 | ⬜ Todo |
| E8 | SLA Management | 1 | P0 | 🔄 In Progress |
| E9 | Database & Seed Data | 1 | P0 | 🔄 In Progress |
| E10 | Data Team & Management Views | 1 | P1 | 🔄 In Progress |
| E11 | Testing & QA | 1 | P1 | ⬜ Todo |
| E12 | Partner API Integration (Real) | 1→2 | P0 | 🔄 Phase 1 Redirect ✅ · Phase 2 API ⬜ |
| E13 | Production Infrastructure & Security | 2 | P0 | 🔒 Phase 2 |

---

## E1 — Project Foundation & Dev Environment ✅ Done

**Goal:** Monorepo structure, tooling, Docker, CI skeleton ready for team to start building.

| Task ID | Title | Acceptance Criteria | Deps | Est |
|---------|-------|---------------------|------|-----|
| E1-T01 | Initialize monorepo (npm workspaces) | `apps/web`, `apps/api`, `packages/shared`, `packages/ui` created; `npm install` works from root | — | 2h |
| E1-T02 | Configure TypeScript (strict mode) | `tsconfig.base.json` at root; each app extends it; `npm run typecheck` passes | E1-T01 | 1h |
| E1-T03 | Configure ESLint + Prettier | `.eslintrc.js` + `.prettierrc` at root; `npm run lint` passes on empty project | E1-T01 | 1h |
| E1-T04 | Set up Vite + React 18 in `apps/web` | `npm run dev` starts frontend at :5173; HMR working | E1-T01 | 2h |
| E1-T05 | Set up Express app in `apps/api` | `npm run dev` starts API at :3001; `GET /health` returns `{ status: "ok" }` | E1-T01 | 2h |
| E1-T06 | Docker Compose for local dev | `docker-compose up` starts MySQL 8 + Redis; apps connect successfully | E1-T04 E1-T05 | 3h |
| E1-T07 | Set up database connection + migration runner | `npm run db:migrate` runs SQL files in order; idempotent | E1-T06 | 2h |
| E1-T08 | Configure environment variables + `.env.example` | All required vars documented; app fails clearly if missing required var | E1-T05 | 1h |
| E1-T09 | Set up React Router v6 with role-based guards | Route guard redirects to `/login` if no token; redirects to role home if wrong role | E1-T04 | 3h |
| E1-T10 | Set up TanStack Query + Axios API client | API client reads `VITE_API_URL`; auth header auto-injected; 401 triggers token refresh | E1-T04 | 2h |
| E1-T11 | Set up Zustand auth store | Stores `{ user, accessToken, role }`; persisted to sessionStorage | E1-T04 | 1h |

---

## E2 — Design System & Shared Components ✅ Done

**Goal:** All reusable UI components built and documented before portals are built.

| Task ID | Title | Acceptance Criteria | Deps | Est |
|---------|-------|---------------------|------|-----|
| E2-T01 | Configure Tailwind CSS with Olsera design tokens | Custom colors (`primary-blue`, `gold`, etc.) in `tailwind.config.js`; matches PRD color values | E1-T04 | 2h |
| E2-T02 | Install + configure shadcn/ui | `npx shadcn-ui init`; Button, Card, Input, Badge, Dialog, Tabs, Table components available | E2-T01 | 2h |
| E2-T03 | Build `StatCard` component | Props: `title`, `value`, `delta?`, `deltaType?`; renders trend arrow + color; loading skeleton state | E2-T02 | 3h |
| E2-T04 | Build `StatusBadge` component | Variants: `pending`(yellow) · `reviewing`(blue) · `approved`(green) · `rejected`(grey) · `sla_breach`(red) | E2-T02 | 2h |
| E2-T05 | Build `SLATimer` component | Accepts `remainingSeconds`; displays `HH:MM:SS`; counts down live; turns red at < 1800s (30 min) | E2-T02 | 3h |
| E2-T06 | Build `MitraScoreCard` component | Shows score number, tier badge (Excellent/Good/Fair/Poor), explanation text, gold color for score | E2-T02 | 3h |
| E2-T07 | Build `PartnerCard` component | Shows partner name, type badge, rate, rate type, tenor range, feature tag chips, arrow; selected state | E2-T02 | 3h |
| E2-T08 | Build `StepperBar` component | Accepts `steps[]` + `currentStep`; shows completed (✓), active (numbered circle), pending states | E2-T02 | 2h |
| E2-T09 | Build `ApplicationTable` component | Configurable columns; renders `StatusBadge`, `SLATimer` per row; loading skeleton; empty state | E2-T02 | 4h |
| E2-T10 | Build `ProgressBar` component | Shows fill %, optional label, optional value display | E2-T02 | 1h |
| E2-T11 | Build `RupiahInput` / `RupiahSlider` component | Slider + chip-select; formats live display as "Rp X.XXX.XXX"; emits integer value | E2-T02 | 3h |
| E2-T12 | Build `AuditTrail` component | Chronological list of events; each: action label, actor, timestamp | E2-T02 | 2h |
| E2-T13 | Build portal layout shells | `MerchantLayout`, `PartnerLayout`, `AdminLayout`, `AuthLayout`; top nav with Olsera logo + "× Trustera"; responsive sidebar | E2-T01 | 4h |
| E2-T14 | Add utility functions to `packages/shared` | `formatRupiah()`, `formatRupiahShort()`, `formatDate()`, `formatPercent()`, `formatTimer()`; unit-tested | E1-T01 | 2h |
| E2-T15 | Add TypeScript types to `packages/shared` | `Application`, `Merchant`, `Partner`, `MitraScore`, `SLAConfig` types defined and exported | E1-T02 | 2h |

---

## E3 — Authentication & RBAC 🔄 In Progress

> **Done:** `LoginPage.tsx` (mock auth), role-based route guards, Zustand auth store, 5 demo account credentials
> **Pending:** `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout` backend; RBAC middleware; real DB users; forgot password; wire frontend to real API

**Goal:** Secure login, token management, and role-based routing working end-to-end.

| Task ID | Title | Acceptance Criteria | Deps | Est |
|---------|-------|---------------------|------|-----|
| E3-T01 | Create `users` table migration | Schema matches PRD: id, email, password_hash, role, created_at | E1-T07 | 1h |
| E3-T02 | Implement `POST /auth/login` | Returns `accessToken` in body; sets `refreshToken` httpOnly cookie; validates with Zod | E3-T01 | 3h |
| E3-T03 | Implement `POST /auth/refresh` | Reads cookie; returns new accessToken; revokes old refresh token | E3-T02 | 2h |
| E3-T04 | Implement `POST /auth/logout` | Revokes refresh token in Redis; clears cookie | E3-T03 | 1h |
| E3-T05 | Build RBAC middleware | `requireRole(['merchant'])` middleware; attaches `req.user` from JWT; returns 403 if wrong role | E3-T02 | 2h |
| E3-T06 | Build login page (SCR-AUTH-01) | Form validates email format; shows error on bad credentials; redirects to role-appropriate home | E2-T13 | 3h |
| E3-T07 | Wire frontend auth to API | `POST /auth/login` call; stores token in Zustand; auto-refresh on 401 | E3-T02 E1-T10 | 3h |
| E3-T08 | Seed demo user accounts | 5 demo accounts (one per role) with hashed passwords in seed file | E3-T01 | 1h |
| E3-T09 | Implement forgot password flow (SCR-AUTH-02) | Step 1: email input → mock OTP; Step 2: OTP verify; Step 3: new password set | E3-T06 | 4h |

---

## E4 — Merchant Flow 🔄 In Progress

> **Done (mock data):** Dashboard, SimulationStep1, SimulationStep2, OfferConfirmation, ConsentPage, SuccessPage, TrackingPage — all on `demo/management-prototype`
> **Pending:** DB tables, all API endpoints, wire frontend to real API, LandingPage (SCR-MER-01), SupportTickets page

**Goal:** Complete merchant journey from landing → simulation → consent → application → tracking.

| Task ID | Title | Acceptance Criteria | Deps | Est |
|---------|-------|---------------------|------|-----|
| E4-T01 | Create merchant DB tables | `merchants`, `merchant_stores`, `merchant_scores` migrations | E1-T07 | 2h |
| E4-T02 | Implement `GET /merchant/profile` | Returns merchant + stores; 401 if not authenticated; 403 if wrong role | E3-T05 E4-T01 | 2h |
| E4-T03 | Implement `GET /merchant/score` | Returns mitra_score, atri_score, tier, percentile, factors breakdown | E4-T01 E7-T01 | 2h |
| E4-T04 | Implement `GET /merchant/simulate` | Filters partners by amount/tenor/score; returns eligible + ineligible with reasons | E4-T01 E7-T03 | 3h |
| E4-T05 | Implement `POST /merchant/consent` | Creates consent record; returns consent_id; validates data_scope | E4-T01 | 2h |
| E4-T06 | Implement `POST /merchant/applications` | Validates consentId exists; creates application; prevents duplicates; returns APP-ID | E4-T01 E4-T05 | 3h |
| E4-T07 | Implement `GET /merchant/applications` | Paginated list; filter by status | E4-T01 | 2h |
| E4-T08 | Implement `GET /merchant/applications/:id` | Full detail + timeline array | E4-T01 | 2h |
| E4-T09 | Build Landing Page (SCR-MER-01) | Hero, 3 feature cards, infrastructure section; fully responsive; matches Figma | E2-T13 | 5h |
| E4-T10 | Build Merchant Dashboard (SCR-MER-02) | Header with ATRI score, progress bar, 4 stat cards, stores panel, achievements panel | E2-T03 E2-T13 E4-T03 | 5h |
| E4-T11 | Build Simulation Step 1 (SCR-MER-03) | Slider + chips for amount and tenor; state saved to Zustand; back/next navigation | E2-T11 E2-T08 | 4h |
| E4-T12 | Build Simulation Step 2 (SCR-MER-04) | Calls `GET /merchant/simulate`; renders eligible/ineligible `PartnerCard`s; select partner | E2-T07 E4-T04 | 4h |
| E4-T13 | Build Offer Confirmation (SCR-MER-05) | Shows selected partner terms; calculates monthly installment; next → consent | E4-T12 | 3h |
| E4-T14 | Build Consent Page (SCR-MER-06) | Data scope checklist; calls `POST /merchant/consent`; CTA disabled until checked | E4-T05 | 4h |
| E4-T15 | Build Success Page (SCR-MER-08) | Shows APP-ID, partner name, expected response time; links to tracking | E4-T06 | 2h |
| E4-T16 | Build Application Tracking (SCR-MER-09) | Timeline stepper with live status; approved/rejected state variants | E2-T08 E4-T08 | 4h |
| E4-T17 | Connect full merchant flow end-to-end | Step1 → Step2 → Confirm → Consent → Submit → Success → Track; all API calls wired | E4-T11 to E4-T16 | 3h |
| E4-T18 | Build Support Tickets page (SCR-MER-10) | List view + new ticket modal + detail view | E2-T13 | 3h |

---

## E5 — Partner Portal 🔄 In Progress

> **Done (mock data):** Dashboard, ApplicationDetailPage (with approve/reject modal + data deletion warning)
> **Pending:** DB tables, all API endpoints, ProductCatalog page, Registration page, full Applications list page, wire frontend to real API

**Goal:** Partner can log in, see pending applications, review merchant data, and make decisions.

| Task ID | Title | Acceptance Criteria | Deps | Est |
|---------|-------|---------------------|------|-----|
| E5-T01 | Create partner DB tables | `partners`, `partner_products`, `partner_onboarding` migrations | E1-T07 | 2h |
| E5-T02 | Implement `GET /partner/dashboard/stats` | Returns 4 KPIs + pending count | E5-T01 | 2h |
| E5-T03 | Implement `GET /partner/applications` | Paginated, filterable; includes SLA remaining in seconds | E5-T01 E8-T01 | 3h |
| E5-T04 | Implement `GET /partner/applications/:id` | Full merchant data; enforces consent check; 403 if no consent | E5-T01 E4-T05 | 3h |
| E5-T05 | Implement `POST /partner/applications/:id/decision` | Approve/reject; logs to timeline; on reject triggers data deletion | E5-T01 | 3h |
| E5-T06 | Implement data deletion on rejection | `deletePartnerAccessibleData(appId)` removes merchant PII from partner-accessible views | E5-T05 | 2h |
| E5-T07 | Implement `GET /partner/products` + `POST /partner/products` | CRUD for loan products; validates required fields with Zod | E5-T01 | 3h |
| E5-T08 | Build Partner Dashboard (SCR-PAR-01) | 4 stat cards + disclaimer box + pending table with SLA timers | E2-T03 E2-T09 E5-T02 E5-T03 | 5h |
| E5-T09 | Build Application Detail — Partner View (SCR-PAR-02) | Two-column layout; score card; merchant data grid; consent proof; approve/reject buttons | E2-T06 E5-T04 | 5h |
| E5-T10 | Wire approve/reject with confirmation modal | Modal asks "Yakin?" before submit; shows data deletion warning on reject | E5-T09 E5-T05 | 3h |
| E5-T11 | Build Product Catalog (SCR-PAR-05) | List + add/edit modal; validates rate + tenor ranges | E5-T07 | 3h |
| E5-T12 | Build Partner Registration (SCR-PAR-03) | 5-step form; submit to `POST /partner/register` | E2-T13 | 4h |
| E5-T13 | Build Partner Application List (SCR-PAR-06) | Full paginated table with filters | E2-T09 E5-T03 | 3h |

---

## E6 — Admin Portal 🔄 In Progress

> **Done (mock data):** Dashboard (KPIs + partner perf + SLA alerts + system health), ApplicationManagementPage (search/filter/table), PartnerQueuePage (onboarding pipeline)
> **Pending:** All API endpoints, Application Detail admin view (SCR-ADM-03), Partner Review modal, Partner Health page (SCR-ADM-05)

**Goal:** Olsera team can monitor all applications, manage partner onboarding, see SLA status.

| Task ID | Title | Acceptance Criteria | Deps | Est |
|---------|-------|---------------------|------|-----|
| E6-T01 | Implement `GET /admin/dashboard/stats` | Returns all 4 KPIs + partner performance + SLA alerts + system health | E5-T01 E8-T03 | 3h |
| E6-T02 | Implement `GET /admin/applications` | All apps; search by ID/name; filter by status/partner/date | E4-T01 | 3h |
| E6-T03 | Implement `GET /admin/applications/:id` | Full detail with consent log, partner response, audit trail | E4-T01 E5-T05 | 3h |
| E6-T04 | Implement `GET /admin/partners/queue` | Lists onboarding partners; filter by stage/risk; includes SLA | E5-T01 | 3h |
| E6-T05 | Implement `PUT /admin/partners/queue/:id/approve` + `/reject` | Advances stage or rejects with reason; logs to audit | E6-T04 | 2h |
| E6-T06 | Implement `GET /admin/sla/alerts` | Reads from Redis; returns active breaches + warnings | E8-T03 | 2h |
| E6-T07 | Build Admin Dashboard (SCR-ADM-01) | Header + 4 stats + partner performance list + SLA alerts + system health | E2-T03 E6-T01 | 5h |
| E6-T08 | Build Application Management (SCR-ADM-02) | Search + filter + summary cards + full table with BREACH state | E2-T09 E6-T02 | 5h |
| E6-T09 | Build Application Detail — Admin View (SCR-ADM-03) | 4 tabs: Overview / Consent Log / Partner Response / Audit Trail | E2-T12 E6-T03 | 4h |
| E6-T10 | Build Partner Approval Queue (SCR-ADM-04) | 4 stats + search/filter + table with type badges, risk badges, SLA, Review button | E2-T09 E6-T04 | 5h |
| E6-T11 | Build Partner Review modal | Full onboarding detail; approve/reject with notes | E6-T10 E6-T05 | 3h |
| E6-T12 | Build Partner Health page (SCR-ADM-05) | Per-partner metrics; approval rate trend chart (Recharts LineChart) | E2-T13 | 4h |
| E6-T13 | Build Executive Dashboard (SCR-ADM-08) | KPI cards + trend charts; accessible to management role too | E2-T03 | 4h |

---

## E7 — Scoring & Matching Engine ⬜ Todo — Start Here Next

**Goal:** Mitra Score calculation and partner matching logic working with real data.

| Task ID | Title | Acceptance Criteria | Deps | Est |
|---------|-------|---------------------|------|-----|
| E7-T01 | Implement `scoringService.ts` | `calculateMitraScore(merchantId)` returns score 300–900 from weighted factors; unit-tested | E4-T01 | 4h |
| E7-T02 | Score tier assignment | `getTier(score)` returns `excellent|good|fair|poor`; thresholds match PRD | E7-T01 | 1h |
| E7-T03 | Implement `matchingService.ts` | `matchPartners(amount, tenor, score)` returns eligible + ineligible with reasons; unit-tested | E5-T01 | 3h |
| E7-T04 | Monthly installment estimator | `estimateInstallment(amount, rate, tenor, rateType)` correct for both flat and effective rate | E7-T03 | 2h |
| E7-T05 | Nightly score recalculation job | `POST /internal/scores/recalculate`; processes all active merchants in batches; logs results | E7-T01 | 3h |
| E7-T06 | Seed merchant scores in dev data | 10 merchants with realistic score data across all tiers | E9-T03 | 1h |

---

## E8 — SLA Management 🔄 In Progress

> **Done:** `SLATimer` UI component (counts down live, turns red < 30 min)
> **Pending:** `sla_config` + `sla_breaches` DB tables, Redis TTL on submit, cron breach detector, `GET /admin/sla/alerts`, SLA remaining in all list APIs

**Goal:** Per-partner SLA timers running in Redis, breach detection, and alert surfacing.

| Task ID | Title | Acceptance Criteria | Deps | Est |
|---------|-------|---------------------|------|-----|
| E8-T01 | Create `sla_config` + `sla_breaches` tables | Migrations complete; seed default SLA configs per demo partner | E1-T07 | 2h |
| E8-T02 | Set SLA timer on application submit | On `POST /merchant/applications` → write `sla:app:{id}` key to Redis with TTL = SLA hours | E4-T06 E8-T01 | 2h |
| E8-T03 | Implement SLA check cron job | Every 5 min: check all active apps; if Redis key expired → insert breach, alert admin | E8-T02 | 3h |
| E8-T04 | `GET /admin/sla/alerts` reads from breach log | Returns active (un-resolved) breaches + partner-level warnings | E8-T03 | 1h |
| E8-T05 | Clear SLA timer on partner decision | On `POST /partner/applications/:id/decision` → delete Redis SLA key | E5-T05 E8-T02 | 1h |
| E8-T06 | SLA remaining returned in all application list APIs | Computed from Redis TTL or calculated from submitted_at + config; returned as `slaRemainingSeconds` | E8-T02 | 2h |

---

## E9 — Database & Seed Data 🔄 In Progress

> **Done:** Migration runner set up (E1); basic table stubs
> **Pending:** Complete migrations 001–010 for all tables; all 7 seed SQL files (users, merchants, partners, products, applications, scores, onboarding queue)

**Goal:** All tables created, migrations ordered, and rich dev seed data for demo.

| Task ID | Title | Acceptance Criteria | Deps | Est |
|---------|-------|---------------------|------|-----|
| E9-T01 | Write all DB migrations | 001–010 covering all tables in PRD data model; run cleanly with `npm run db:migrate` | E1-T07 | 4h |
| E9-T02 | Seed demo users (5 roles) | merchant@demo.com, partner.mandiri@demo.com, admin@olsera.com, data@olsera.com, coo@olsera.com | E9-T01 | 1h |
| E9-T03 | Seed demo merchants | 10 merchants with varying profiles, 2-3 stores each, 12mo transaction history simulation | E9-T01 | 3h |
| E9-T04 | Seed demo partners + products | Bank Mandiri, BCA Finance, Modalku, Amartha, Kredivo, GoTyme + **Adapundi** (redirect) + **OCBC KTA Cashbiz** (coming soon) — each with 1-2 products, SLA config | E9-T01 | 2h |
| E9-T05 | Seed demo applications | 15–20 applications in various statuses (pending, reviewing, approved, rejected, sla_breach) | E9-T03 E9-T04 | 2h |
| E9-T06 | Seed partner onboarding queue | 4 partners in queue at different stages and risk levels (matches SCR-ADM-04 Figma) | E9-T01 | 1h |
| E9-T07 | Add `npm run db:reset` script | Drops all tables, re-runs migrations, re-seeds; for dev only; blocked in production | E9-T01 | 1h |

---

## E10 — Data Team & Management Views 🔄 In Progress

> **Done (mock data):** `DataIntelligencePage` (score factors, tier distribution, sample score card, UU PDP audit log), `ExecutiveDashboardPage` (KPI header, ecosystem flow, partner yield, growth bar chart, strategic metrics)
> **Pending:** All 4 API endpoints (`/data/intelligence/*`, `/management/dashboard`), wire pages to real data

**Goal:** Internal analytics views for data team and executive dashboard.

| Task ID | Title | Acceptance Criteria | Deps | Est |
|---------|-------|---------------------|------|-----|
| E10-T01 | Implement `GET /data/intelligence/score-distribution` | Returns histogram bins + tier breakdown | E7-T01 | 2h |
| E10-T02 | Implement `GET /data/intelligence/cohorts` | Score progression by cohort month | E4-T01 | 3h |
| E10-T03 | Implement `GET /data/intelligence/credit-performance` | Approval rate by score tier + category | E4-T01 | 2h |
| E10-T04 | Build Data Intelligence page (SCR-DAT-01) | Score distribution histogram + tier pie chart + cohort table + credit performance chart | E10-T01 to E10-T03 | 6h |
| E10-T05 | Implement `GET /management/dashboard` | Aggregated KPIs; accessible to both admin + management role | E4-T01 E5-T01 | 2h |
| E10-T06 | Build Executive Dashboard (SCR-ADM-08) | KPI cards, weekly trend line chart, top partners table | E10-T05 | 4h |

---

## E11 — Testing & QA ⬜ Todo

**Goal:** Critical paths tested; demo-ready quality.

| Task ID | Title | Acceptance Criteria | Deps | Est |
|---------|-------|---------------------|------|-----|
| E11-T01 | Unit tests for `scoringService` | All score factor functions tested; edge cases (0 revenue, new merchant); ≥90% coverage | E7-T01 | 3h |
| E11-T02 | Unit tests for `matchingService` | Eligible/ineligible split tested; all reason codes tested; ≥90% coverage | E7-T03 | 2h |
| E11-T03 | Unit tests for `formatRupiah` and other utils | All formatting functions tested with edge cases | E2-T14 | 1h |
| E11-T04 | Integration tests for auth endpoints | Login, refresh, logout; invalid token; wrong role; ≥80% coverage | E3-T02 | 3h |
| E11-T05 | Integration tests for merchant application flow | simulate → consent → submit → get status; happy path + error paths | E4-T06 | 4h |
| E11-T06 | Integration tests for partner decision endpoint | Approve → check timeline update; Reject → check data deletion; duplicate decision blocked | E5-T05 | 3h |
| E11-T07 | Integration tests for SLA check job | Manually expire Redis key → assert breach created → assert alert returned | E8-T03 | 2h |
| E11-T08 | Component tests for `SLATimer` | Countdown renders correctly; turns red at < 30 min; stops at 0 | E2-T05 | 1h |
| E11-T09 | Component tests for merchant simulation flow | Step1 values persist to Step2; back button restores state | E4-T11 E4-T12 | 2h |
| E11-T10 | E2E test: merchant applies for loan | Playwright: login → simulate → select partner → consent → submit → see APP-ID | E4-T17 | 4h |
| E11-T11 | E2E test: partner reviews and approves | Playwright: login as partner → view app → see merchant data → approve → status updates | E5-T10 | 3h |
| E11-T12 | E2E test: admin monitors SLA breach | Playwright: trigger breach → admin sees alert → view breach in app table | E6-T07 E8-T03 | 3h |
| E11-T13 | Cross-browser testing | Chrome, Firefox, Safari, Edge; no layout breaks on mobile (375px) | All E4–E6 | 4h |
| E11-T14 | User testing prep | Create test script for 20-30 merchants; happiness scoring sheet | — | 2h |

---

## E12 — Partner API Integration 🔄 Phase 1 Redirect ✅ · Phase 2 API ⬜

### Committed Partners (as of 9 Mar 2026)

| Partner | Type | Rate | Tenor | Limit | Phase 1 Model | Phase 2 |
|---------|------|------|-------|-------|---------------|---------|
| **Adapundi** | P2P Fintech | 1.5% flat/mo | 3–12 bulan | Rp 5jt–500jt | Redirect → `https://h5-app.adapundi.com/?channel2=h5Olsera` | Full API (awaiting docs) |
| **OCBC — KTA Cashbiz** | Bank | 0.89%–1.59% flat/mo (0.99% in simulator) | 6–36 bulan | Rp 25jt–2M | Coming Soon (URL pending from OCBC) | Full API (URL + docs pending) |

> **Phase 1 (done):** Both partners are live in `demo/management-prototype`. `PartnerCard` renders Adapundi as an external redirect card (opens partner URL in new tab) and OCBC as a "Segera Hadir" card. Neither goes through Olsera's application flow yet. `SimulationStep2` groups them under "Mitra Resmi Olsera" section, separate from simulation/demo partners.

> **Phase 2 (blocked on API docs):** Once partner provides sandbox credentials + API spec, build the `IPartnerConnector` adapter and wire into `matchingService` / `applicationService`.

### Phase 2 Tasks (blocked on API documentation)

| Task ID | Title | Acceptance Criteria | Deps | Est |
|---------|-------|---------------------|------|-----|
| E12-T01 | Partner API connector interface | `IPartnerConnector` interface: `fetchProducts()`, `submitApplication()`, `getDecision()` | E5-T01 | 3h |
| E12-T02 | Implement Adapundi connector | Real API calls to Adapundi sandbox; merchant redirect replaced by full API submission | E12-T01 | 8h |
| E12-T03 | Implement OCBC connector | Real API calls to OCBC KTA Cashbiz sandbox; URL provided by OCBC | E12-T01 | 8h |
| E12-T04 | Replace mock simulation with live partner products | `matchingService` fetches live products from connectors | E12-T02 | 4h |
| E12-T05 | Real offer submission to partner | `POST /merchant/applications` routes to partner API in real-time | E12-T02 | 4h |
| E12-T06 | Webhook receiver for partner decisions | `POST /webhooks/partner/:partnerId/decision` — receives async decisions | E12-T02 | 5h |
| E12-T07 | Partner sandbox UAT | All flows tested in partner sandbox env; signoff from Adapundi + OCBC | E12-T05 | 8h |

---

## E13 — Production Infrastructure (Phase 2 Only)

| Task ID | Title | Acceptance Criteria | Deps | Est |
|---------|-------|---------------------|------|-----|
| E13-T01 | AWS EC2 production setup (ap-southeast-1) | EC2 instance with Docker, Nginx reverse proxy, SSL cert | — | 4h |
| E13-T02 | Aurora MySQL production setup | Multi-AZ Aurora cluster; connection from API verified | E13-T01 | 3h |
| E13-T03 | Redis production (ElastiCache) | ElastiCache Redis cluster; SLA timers working in prod | E13-T01 | 2h |
| E13-T04 | S3 bucket for documents | Bucket with IAM roles; document upload/download API working | E13-T01 | 2h |
| E13-T05 | CI/CD pipeline (GitHub Actions) | Push to `main` → lint → test → deploy to staging; push tag → deploy to prod | — | 6h |
| E13-T06 | Security audit | OWASP Top 10 checklist; JWT hardening; SQL injection tests; rate limiting | All APIs | 8h |
| E13-T07 | Load testing | k6 test: 1000 concurrent users; all endpoints < 500ms p95 | E13-T01 | 4h |
| E13-T08 | Monitoring setup (Datadog) | APM + logs + alerts for error rate spikes, latency, SLA events | E13-T01 | 4h |
| E13-T09 | Rollback procedure documentation | Tested rollback for both app + database migrations | E13-T02 | 2h |

---

## Sprint Plan (Phase 1 — 8 Weeks)

| Week | Focus | Epics | Key Deliverables |
|------|-------|-------|-----------------|
| 1 | Foundation | E1, E9-T01 | Monorepo, Docker, DB schema, tooling |
| 2 | Design + Auth | E2, E3 | Full design system, login/RBAC, seed data |
| 3 | Merchant Core | E7, E4-T01~T09 | Scoring engine, Landing page, Dashboard |
| 4 | Merchant Flow | E4-T10~T18, E8 | Full simulation → apply flow, SLA setup |
| 5 | Partner Portal | E5 | Dashboard, application detail, decisions |
| 6 | Admin Portal | E6, E9 | Full admin portal, complete seed data |
| 7 | Data/Management + QA | E10, E11-T01~T09 | Analytics views, unit/integration tests |
| 8 | E2E + User Testing | E11-T10~T14 | E2E tests, cross-browser, demo polish |

---

## Definition of Done

A task is **done** when:
1. Code passes `npm run lint` and `npm run typecheck`
2. Unit/integration tests written (where applicable per E11 tasks)
3. Component renders correctly on mobile (375px) and desktop (1440px)
4. All Indonesian text properly formatted (Rupiah, dates)
5. Loading, empty, and error states handled
6. PR reviewed and merged to `main`
7. Feature accessible end-to-end with seeded demo data
