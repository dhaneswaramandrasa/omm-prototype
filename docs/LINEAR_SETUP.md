# Linear Setup Guide — Olsera Mitra Modal

This guide walks you through creating the Linear project and structuring it so Claude Code can use it.

---

## 1. Create the Project in Linear

1. Open Linear → your workspace
2. **Projects** → "New Project"
3. Name: `Olsera Mitra Modal`
4. Identifier: `OMM` (used as ticket prefix, e.g. `OMM-01`)
5. Description: "Multi-lender financial aggregator — PT Olsera Indonesia Pratama"
6. Status: Active

---

## 2. Create Teams / Members

Create or assign a team (e.g. "Product Engineering"). Add:
- Product Director / PM (you)
- Frontend Dev
- Backend Dev
- UI/UX Designer (part-time)
- QA Engineer (part-time)

---

## 3. Configure Statuses

In Project settings → Workflow, set these statuses in order:

| Status | Type | Color |
|--------|------|-------|
| Backlog | Backlog | Grey |
| Todo | Unstarted | Blue |
| In Progress | Started | Yellow |
| In Review | Started | Orange |
| Done | Completed | Green |
| Canceled | Canceled | Red |

---

## 4. Create Epics

Create one Epic per E-code. Linear calls these "Milestones" or you can use "Projects" as sub-groupings, but the simplest approach is to use **Labels** as epics.

Create these labels (color-coded):

| Label | Color | Phase |
|-------|-------|-------|
| E1 · Foundation | #6366F1 | 1 |
| E2 · Design System | #8B5CF6 | 1 |
| E3 · Auth & RBAC | #EC4899 | 1 |
| E4 · Merchant Flow | #3B82F6 | 1 |
| E5 · Partner Portal | #10B981 | 1 |
| E6 · Admin Portal | #F59E0B | 1 |
| E7 · Scoring Engine | #EF4444 | 1 |
| E8 · SLA Management | #14B8A6 | 1 |
| E9 · Database & Seeds | #6B7280 | 1 |
| E10 · Analytics Views | #84CC16 | 1 |
| E11 · Testing & QA | #F97316 | 1 |
| E12 · Partner API (Phase 2) | #0EA5E9 | 2 |
| E13 · Production Infra (Phase 2) | #7C3AED | 2 |

---

## 5. Ticket Template

Every ticket should follow this structure in the description:

```markdown
## Context
{Why this task exists — link to PRD section or screen if relevant}

## Acceptance Criteria
- [ ] {Specific, testable criterion}
- [ ] {Another criterion}

## Technical Notes
{Architecture decisions, file paths to touch, patterns to follow, links to API_LIST.md or SCREEN_LIST.md}

## Dependencies
Blocked by: {OMM-XX} (if any)

## API Tests
{For backend tickets only — curl commands to test after implementation}
\```bash
curl -X POST http://localhost:3001/api/v1/... \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
# Expected: { "success": true, "data": { ... } }
\```

## Estimate
{hours from EPICS_TASKS.md}
```

---

## 6. Create All Tickets

Below is the complete ticket list imported from `docs/EPICS_TASKS.md`. Create these in Linear with the matching label, status (Todo for Phase 1, Backlog for Phase 2), and "Blocked by" relationships.

---

### E1 · Foundation

| Ticket ID | Title | Blocked By | Est |
|-----------|-------|------------|-----|
| OMM-01 | Initialize monorepo (npm workspaces) | — | 2h |
| OMM-02 | Configure TypeScript strict mode | OMM-01 | 1h |
| OMM-03 | Configure ESLint + Prettier | OMM-01 | 1h |
| OMM-04 | Set up Vite + React 18 in apps/web | OMM-01 | 2h |
| OMM-05 | Set up Express app in apps/api | OMM-01 | 2h |
| OMM-06 | Docker Compose for MySQL 8 + Redis | OMM-04 OMM-05 | 3h |
| OMM-07 | Database connection + migration runner | OMM-06 | 2h |
| OMM-08 | Environment variables + .env.example | OMM-05 | 1h |
| OMM-09 | React Router v6 with role-based guards | OMM-04 | 3h |
| OMM-10 | TanStack Query + Axios API client | OMM-04 | 2h |
| OMM-11 | Zustand auth store | OMM-04 | 1h |

### E2 · Design System

| Ticket ID | Title | Blocked By | Est |
|-----------|-------|------------|-----|
| OMM-12 | Configure Tailwind CSS with Olsera tokens | OMM-04 | 2h |
| OMM-13 | Install + configure shadcn/ui | OMM-12 | 2h |
| OMM-14 | Build StatCard component | OMM-13 | 3h |
| OMM-15 | Build StatusBadge component | OMM-13 | 2h |
| OMM-16 | Build SLATimer component | OMM-13 | 3h |
| OMM-17 | Build MitraScoreCard component | OMM-13 | 3h |
| OMM-18 | Build PartnerCard component | OMM-13 | 3h |
| OMM-19 | Build StepperBar component | OMM-13 | 2h |
| OMM-20 | Build ApplicationTable component | OMM-13 | 4h |
| OMM-21 | Build ProgressBar component | OMM-13 | 1h |
| OMM-22 | Build RupiahInput / RupiahSlider component | OMM-13 | 3h |
| OMM-23 | Build AuditTrail component | OMM-13 | 2h |
| OMM-24 | Build portal layout shells (Merchant/Partner/Admin/Auth) | OMM-12 | 4h |
| OMM-25 | Add format utilities to packages/shared | OMM-01 | 2h |
| OMM-26 | Add TypeScript types to packages/shared | OMM-02 | 2h |

### E3 · Auth & RBAC

| Ticket ID | Title | Blocked By | Est |
|-----------|-------|------------|-----|
| OMM-27 | Create users table migration | OMM-07 | 1h |
| OMM-28 | Implement POST /auth/login | OMM-27 | 3h |
| OMM-29 | Implement POST /auth/refresh | OMM-28 | 2h |
| OMM-30 | Implement POST /auth/logout | OMM-29 | 1h |
| OMM-31 | Build RBAC middleware | OMM-28 | 2h |
| OMM-32 | Build LoginPage (SCR-AUTH-01) | OMM-24 | 3h |
| OMM-33 | Wire frontend auth to API | OMM-28 OMM-10 | 3h |
| OMM-34 | Seed demo user accounts (5 roles) | OMM-27 | 1h |
| OMM-35 | Implement forgot password flow (SCR-AUTH-02) | OMM-32 | 4h |

### E7 · Scoring Engine *(build before E4)*

| Ticket ID | Title | Blocked By | Est |
|-----------|-------|------------|-----|
| OMM-36 | Implement scoringService.ts with unit tests | OMM-07 | 4h |
| OMM-37 | Score tier assignment function | OMM-36 | 1h |
| OMM-38 | Implement matchingService.ts with unit tests | OMM-36 | 3h |
| OMM-39 | Monthly installment estimator (flat + effective) | OMM-38 | 2h |
| OMM-40 | Nightly score recalculation job | OMM-36 | 3h |

### E4 · Merchant Flow

| Ticket ID | Title | Blocked By | Est |
|-----------|-------|------------|-----|
| OMM-41 | Create merchant DB tables (merchants, stores, scores) | OMM-07 | 2h |
| OMM-42 | Implement GET /merchant/profile | OMM-41 OMM-31 | 2h |
| OMM-43 | Implement GET /merchant/score | OMM-41 OMM-36 | 2h |
| OMM-44 | Implement GET /merchant/simulate | OMM-41 OMM-38 | 3h |
| OMM-45 | Implement POST /merchant/consent | OMM-41 | 2h |
| OMM-46 | Implement POST /merchant/applications | OMM-41 OMM-45 | 3h |
| OMM-47 | Implement GET /merchant/applications (list) | OMM-41 | 2h |
| OMM-48 | Implement GET /merchant/applications/:id | OMM-41 | 2h |
| OMM-49 | Build Landing Page (SCR-MER-01) | OMM-24 | 5h |
| OMM-50 | Build Merchant Dashboard (SCR-MER-02) | OMM-24 OMM-43 | 5h |
| OMM-51 | Build Simulation Step 1 (SCR-MER-03) | OMM-22 OMM-19 | 4h |
| OMM-52 | Build Simulation Step 2 — Partner Selection (SCR-MER-04) | OMM-18 OMM-44 | 4h |
| OMM-53 | Build Offer Confirmation (SCR-MER-05) | OMM-52 | 3h |
| OMM-54 | Build Consent Page (SCR-MER-06) | OMM-45 | 4h |
| OMM-55 | Build Application Success Page (SCR-MER-08) | OMM-46 | 2h |
| OMM-56 | Build Application Tracking (SCR-MER-09) | OMM-19 OMM-48 | 4h |
| OMM-57 | Connect full merchant flow end-to-end | OMM-51 to OMM-56 | 3h |
| OMM-58 | Build Support Tickets page (SCR-MER-10) | OMM-24 | 3h |

### E8 · SLA Management

| Ticket ID | Title | Blocked By | Est |
|-----------|-------|------------|-----|
| OMM-59 | Create sla_config + sla_breaches tables | OMM-07 | 2h |
| OMM-60 | Set SLA timer in Redis on application submit | OMM-46 OMM-59 | 2h |
| OMM-61 | Implement SLA check cron job (every 5 min) | OMM-60 | 3h |
| OMM-62 | Implement GET /admin/sla/alerts | OMM-61 | 1h |
| OMM-63 | Clear SLA timer on partner decision | OMM-60 | 1h |
| OMM-64 | Return slaRemainingSeconds in all application list APIs | OMM-60 | 2h |

### E5 · Partner Portal

| Ticket ID | Title | Blocked By | Est |
|-----------|-------|------------|-----|
| OMM-65 | Create partner DB tables (partners, products, onboarding) | OMM-07 | 2h |
| OMM-66 | Implement GET /partner/dashboard/stats | OMM-65 | 2h |
| OMM-67 | Implement GET /partner/applications (list + SLA) | OMM-65 OMM-64 | 3h |
| OMM-68 | Implement GET /partner/applications/:id (with consent check) | OMM-65 OMM-45 | 3h |
| OMM-69 | Implement POST /partner/applications/:id/decision | OMM-65 | 3h |
| OMM-70 | Implement data deletion on rejection | OMM-69 | 2h |
| OMM-71 | Implement GET + POST /partner/products | OMM-65 | 3h |
| OMM-72 | Build Partner Dashboard (SCR-PAR-01) | OMM-24 OMM-66 OMM-67 | 5h |
| OMM-73 | Build Application Detail — Partner (SCR-PAR-02) | OMM-17 OMM-68 | 5h |
| OMM-74 | Wire approve/reject with confirmation modal | OMM-73 OMM-69 | 3h |
| OMM-75 | Build Product Catalog (SCR-PAR-05) | OMM-71 | 3h |
| OMM-76 | Build Partner Registration (SCR-PAR-03) | OMM-24 | 4h |
| OMM-77 | Build Partner Application List (SCR-PAR-06) | OMM-20 OMM-67 | 3h |

### E6 · Admin Portal

| Ticket ID | Title | Blocked By | Est |
|-----------|-------|------------|-----|
| OMM-78 | Implement GET /admin/dashboard/stats | OMM-65 OMM-61 | 3h |
| OMM-79 | Implement GET /admin/applications | OMM-41 | 3h |
| OMM-80 | Implement GET /admin/applications/:id (all tabs) | OMM-41 OMM-69 | 3h |
| OMM-81 | Implement GET /admin/partners/queue | OMM-65 | 3h |
| OMM-82 | Implement PUT /admin/partners/queue/:id approve + reject | OMM-81 | 2h |
| OMM-83 | Build Admin Dashboard (SCR-ADM-01) | OMM-24 OMM-78 | 5h |
| OMM-84 | Build Application Management (SCR-ADM-02) | OMM-20 OMM-79 | 5h |
| OMM-85 | Build Application Detail — Admin (SCR-ADM-03) | OMM-23 OMM-80 | 4h |
| OMM-86 | Build Partner Approval Queue (SCR-ADM-04) | OMM-20 OMM-81 | 5h |
| OMM-87 | Build Partner Review modal | OMM-86 OMM-82 | 3h |
| OMM-88 | Build Partner Health page (SCR-ADM-05) | OMM-24 | 4h |
| OMM-89 | Build Executive Dashboard (SCR-ADM-08) | OMM-24 | 4h |

### E9 · Database & Seeds

| Ticket ID | Title | Blocked By | Est |
|-----------|-------|------------|-----|
| OMM-90 | Write all DB migrations (001–010) | OMM-07 | 4h |
| OMM-91 | Seed demo users (5 roles) | OMM-90 | 1h |
| OMM-92 | Seed demo merchants (10 + stores + 12mo tx history) | OMM-90 | 3h |
| OMM-93 | Seed demo partners + products + SLA config | OMM-90 | 2h |
| OMM-94 | Seed demo applications (15–20, mixed statuses) | OMM-92 OMM-93 | 2h |
| OMM-95 | Seed partner onboarding queue (4 entries) | OMM-90 | 1h |
| OMM-96 | Add db:reset script (dev only, blocked in prod) | OMM-90 | 1h |
| OMM-97 | Seed merchant scores (all tiers represented) | OMM-92 OMM-36 | 1h |

### E10 · Analytics Views

| Ticket ID | Title | Blocked By | Est |
|-----------|-------|------------|-----|
| OMM-98 | Implement GET /data/intelligence/score-distribution | OMM-36 | 2h |
| OMM-99 | Implement GET /data/intelligence/cohorts | OMM-41 | 3h |
| OMM-100 | Implement GET /data/intelligence/credit-performance | OMM-41 | 2h |
| OMM-101 | Build Data Intelligence page (SCR-DAT-01) | OMM-98 to OMM-100 | 6h |
| OMM-102 | Implement GET /management/dashboard | OMM-41 OMM-65 | 2h |
| OMM-103 | Build Executive Dashboard (SCR-ADM-08) | OMM-102 | 4h |

### E11 · Testing & QA

| Ticket ID | Title | Blocked By | Est |
|-----------|-------|------------|-----|
| OMM-104 | Unit tests — scoringService (≥90% coverage) | OMM-36 | 3h |
| OMM-105 | Unit tests — matchingService (≥90% coverage) | OMM-38 | 2h |
| OMM-106 | Unit tests — format utilities | OMM-25 | 1h |
| OMM-107 | Integration tests — auth endpoints | OMM-28 | 3h |
| OMM-108 | Integration tests — merchant application flow | OMM-46 | 4h |
| OMM-109 | Integration tests — partner decision + data deletion | OMM-69 | 3h |
| OMM-110 | Integration tests — SLA cron job | OMM-61 | 2h |
| OMM-111 | Component tests — SLATimer | OMM-16 | 1h |
| OMM-112 | Component tests — merchant simulation flow | OMM-51 OMM-52 | 2h |
| OMM-113 | E2E test — merchant applies for loan (Playwright) | OMM-57 | 4h |
| OMM-114 | E2E test — partner reviews and approves (Playwright) | OMM-74 | 3h |
| OMM-115 | E2E test — admin monitors SLA breach (Playwright) | OMM-83 OMM-61 | 3h |
| OMM-116 | Cross-browser + mobile responsive testing | OMM-57 OMM-72 OMM-83 | 4h |
| OMM-117 | User testing preparation (script + scoring sheet) | — | 2h |

### E12 · Partner API Integration (Phase 2 — Backlog)

| Ticket ID | Title | Blocked By | Est |
|-----------|-------|------------|-----|
| OMM-118 | IPartnerConnector interface | OMM-65 | 3h |
| OMM-119 | Implement connector — Partner A | OMM-118 | 8h |
| OMM-120 | Implement connector — Partner B | OMM-118 | 8h |
| OMM-121 | Replace mock simulation with live partner products | OMM-119 | 4h |
| OMM-122 | Real offer submission to partner API | OMM-119 | 4h |
| OMM-123 | Webhook receiver for async partner decisions | OMM-119 | 5h |
| OMM-124 | Partner sandbox UAT + signoff | OMM-122 | 8h |

### E13 · Production Infrastructure (Phase 2 — Backlog)

| Ticket ID | Title | Blocked By | Est |
|-----------|-------|------------|-----|
| OMM-125 | AWS EC2 setup (ap-southeast-1) + Nginx + SSL | — | 4h |
| OMM-126 | Aurora MySQL production cluster | OMM-125 | 3h |
| OMM-127 | ElastiCache Redis production | OMM-125 | 2h |
| OMM-128 | S3 bucket + IAM for document storage | OMM-125 | 2h |
| OMM-129 | CI/CD pipeline (GitHub Actions → staging/prod) | — | 6h |
| OMM-130 | Security audit (OWASP Top 10 + JWT hardening) | OMM-125 | 8h |
| OMM-131 | Load testing with k6 (1000 concurrent users) | OMM-125 | 4h |
| OMM-132 | Datadog monitoring + alerts setup | OMM-125 | 4h |
| OMM-133 | Rollback procedure documentation + test | OMM-126 | 2h |

---

## 7. Set "Blocked By" Relationships

In Linear, open each ticket and use the **"Relations"** field to set:
- `Blocked by: OMM-XX` for each dependency listed in the table above

This allows Claude Code to check `get_issue` and see the correct parent branch to branch from.

---

## 8. Assign Phase 1 Tickets to "Todo"

Set all E1–E11 tickets to status **Todo**.  
Set all E12–E13 tickets to status **Backlog** (Phase 2, contingent on partner commitment).

---

## 9. Connect Claude Code to Linear MCP

In your Claude Code config (`.claude/settings.json` or equivalent), ensure the Linear MCP server is enabled:

```json
{
  "mcpServers": {
    "linear-server": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": {
        "LINEAR_API_KEY": "your_linear_api_key_here"
      }
    }
  }
}
```

Get your API key: Linear → Settings → API → Personal API Keys → Create key.

---

## 10. Verify the Setup

Once connected, test in Claude Code:
```
List all Todo tickets in the OMM project
```

Claude Code should return the full list of Phase 1 tickets. If it does, Linear is wired correctly and you're ready to start.

---

## Ticket Count Summary

| Epic | Phase | Tickets | Total Est |
|------|-------|---------|-----------|
| E1 · Foundation | 1 | 11 | ~20h |
| E2 · Design System | 1 | 15 | ~33h |
| E3 · Auth & RBAC | 1 | 9 | ~20h |
| E4 · Merchant Flow | 1 | 18 | ~52h |
| E5 · Partner Portal | 1 | 13 | ~39h |
| E6 · Admin Portal | 1 | 12 | ~41h |
| E7 · Scoring Engine | 1 | 5 | ~13h |
| E8 · SLA Management | 1 | 6 | ~11h |
| E9 · Database & Seeds | 1 | 8 | ~15h |
| E10 · Analytics | 1 | 6 | ~19h |
| E11 · Testing & QA | 1 | 14 | ~32h |
| E12 · Partner API | 2 | 7 | ~40h |
| E13 · Production Infra | 2 | 9 | ~43h |
| **Total Phase 1** | | **117** | **~295h** |
| **Total Phase 2** | | **16** | **~83h** |
