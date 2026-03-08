# CLAUDE.md — Olsera Mitra Modal

This file is the primary instruction set for Claude Code. **Read this before touching any code.**

---

## Project in One Line

**Olsera Mitra Modal** — multi-lender financial aggregator connecting Olsera micro-merchants with banking/fintech lending partners. Olsera is the orchestrator, never the lender.

---

## Critical Business Rules (Never Break)

1. **Olsera does NOT make credit decisions.** All approve/reject logic belongs to partner institutions.
2. **Merchant data requires explicit consent before sharing with any partner.** Always check `application_consents` before exposing merchant data to a partner endpoint.
3. **On partner rejection → hard delete merchant PII** from partner-accessible records. Call `deletePartnerAccessibleData(appId)` in `services/applicationService.ts`.
4. **Never expose raw transaction records to partners.** Only share aggregated metrics.

---

## Documentation Index

| What you need | Read |
|--------------|------|
| Product context, goals, requirements | `docs/PRD.md` |
| Every screen — route, components, UI, states | `docs/SCREEN_LIST.md` |
| Every API endpoint — request/response, errors | `docs/API_LIST.md` |
| Epics, tasks, acceptance criteria, sprint plan | `docs/EPICS_TASKS.md` |
| Figma reference screenshots | `docs/figma-screenshots/` |

---

## Linear Workflow

### Before starting any ticket

1. Pull the ticket from Linear:
   ```
   mcp__linear-server__get_issue  { issueId: "OLS-XX" }
   ```
2. Read comments on the immediately preceding ticket for handoff notes:
   ```
   mcp__linear-server__list_comments  { issueId: "OLS-XX" }
   ```
3. Read the full description, acceptance criteria, and any API test cases in the ticket body.
4. Set status to **In Progress**:
   ```
   mcp__linear-server__save_issue  { issueId: "OLS-XX", status: "In Progress" }
   ```

### Branch naming

Always create a new branch before any implementation.

Format: `{ticket-id}/{short-description}`
Examples:
- `omm-15/monorepo-setup`
- `omm-22/merchant-simulation-step1`
- `omm-38/partner-decision-endpoint`

If the ticket is **blocked by** a previous ticket not yet merged, branch off that ticket's branch instead of `main`. Check the "Blocked by" field in Linear to determine the parent branch. Otherwise always branch from `main`.

### While working

Add implementation notes as comments on the ticket:
```
mcp__linear-server__save_comment  { issueId: "OLS-XX", body: "..." }
```

If a blocker is discovered, comment with blocker details and leave status as **In Progress**.

### API testing requirement

For every ticket that introduces an API endpoint, run ALL curl test cases specified in the ticket's "API Tests" section against the running dev server (`npm run dev`). Do not skip tests. Post results (pass/fail per case) as a comment on the ticket before marking Done.

### After completing a ticket

1. Run all API tests and post results.
2. Post a completion comment in this exact structure:

```
## What was built
- {feature / endpoint / page implemented}

## Key files changed
- `{file path}` — {what changed}

## API test results
✅ {test case}: passed — {actual response summary}
❌ {test case}: failed — {error}

## Handoff notes
- {Context the next ticket needs: schema fields added, helpers introduced, patterns to follow}
- {Any deviations from spec and why}
```

3. Set status to **In Review** (needs human review) or **Done** (self-contained + tests pass).
4. Create atomic commits (see Committing section).
5. Push branch and open a GitHub PR to `main` (see GitHub Workflow section).
6. Post the PR URL as a follow-up comment on the Linear ticket.

### Finding your next ticket

Work in epic dependency order matching `docs/EPICS_TASKS.md`:
```
E1 → E2 → E3 → E7 → E4 → E8 → E5 → E6 → E9 → E10 → E11
```

Within an epic, work tickets in numeric order unless a specific one is unblocked earlier.

Find next available ticket:
```
mcp__linear-server__list_issues  { projectId: "OMM", status: "Todo" }
```

Pull the full ticket before starting — **never work from memory alone**.

### Status meanings

| Status | Meaning |
|--------|---------|
| Backlog | Not yet scheduled |
| Todo | Scheduled, ready to pick up |
| In Progress | Actively being worked on |
| In Review | Built, awaiting human review/testing |
| Done | Verified complete — all AC checked, API tests passed |
| Canceled | Descoped or not needed |

---

## Committing

After implementation is verified (build passes, tests pass):

Use **atomic commits** — group logically related files into one commit. Do not commit file-by-file, but do not dump all changes in a single commit if they span unrelated concerns.

Follow **Conventional Commits** format:
```
feat(scope): description     — new feature or endpoint
fix(scope): description      — bug fix
refactor(scope): description — restructure without behavior change
chore(scope): description    — tooling, deps, config
docs(scope): description     — documentation only
test(scope): description     — tests only
```

Scope = the module/area (e.g. `auth`, `merchant`, `partner`, `admin`, `scoring`, `sla`, `shared`).

Example groupings for a DB + API + UI ticket:
```
feat(schema): add loan_applications and application_consents tables
feat(merchant): add POST /merchant/consent endpoint with Zod validation
feat(ui): build ConsentPage with data scope checklist and UU PDP disclaimer
```

---

## GitHub Workflow

### Creating a PR

Title format: `[{TICKET-ID}] {ticket title}`
Example: `[OLS-22] Merchant Simulation Step 1 — Amount & Tenor Selector`

PR description format:
```markdown
## Overview
{1–2 sentences: what this PR does and why}

- {Key detail, decision, or scope point}
- {Another notable aspect}

## Changes
- `{file or area}` — {what changed}

## Testing
- {Step-by-step to verify the changes work}
- {Any seed data, env vars, or setup needed}

## Notes
{Deviations from spec, caveats, reviewer callouts. Omit if nothing notable.}

## Linear
{Linear ticket URL}
```

After creating the PR, post its URL as a comment on the Linear ticket.

---

## Repository Layout

```
olsera-mitra-modal/
├── apps/
│   ├── web/          ← React 18 + Vite frontend
│   └── api/          ← Node.js + Express backend
├── packages/
│   ├── shared/       ← Types + utilities (used by both apps)
│   └── ui/           ← Shared component library (future)
├── database/
│   ├── migrations/   ← Numbered SQL files (001_, 002_, ...)
│   └── seeds/        ← Dev seed data
├── docs/
│   ├── PRD.md
│   ├── SCREEN_LIST.md
│   ├── API_LIST.md
│   ├── EPICS_TASKS.md
│   └── figma-screenshots/
├── docker-compose.yml
├── .env.example
├── CLAUDE.md
└── README.md
```

---

## Commands

```bash
# Start everything
docker-compose up

# Frontend (port 5173)
cd apps/web && npm run dev

# Backend (port 3001)
cd apps/api && npm run dev

# DB migrations
cd apps/api && npm run db:migrate

# Seed dev data
cd apps/api && npm run db:seed

# Reset DB (dev only)
cd apps/api && npm run db:reset

# Run all tests
npm run test

# Lint + typecheck
npm run lint && npm run typecheck
```

---

## Architecture Decisions

### State Management
- **React Query** — all server state (API calls, caching, refetch)
- **Zustand** — client UI state: `useAuthStore` (user, token, role), `useSimulationStore` (amount, tenor, selected partner)
- No Redux

### Auth
- JWT access token (15 min) stored in Zustand (in-memory)
- Refresh token in `httpOnly` cookie (7 days)
- On 401 → auto-refresh via Axios interceptor → retry original request
- Role in JWT payload: `{ userId, role, merchantId?, partnerId? }`

### API Response Envelope
All responses: `{ success, data, meta?, error }`. Never return raw objects at top level.
Errors: `{ success: false, error: { code, message } }`. Full error codes in `docs/API_LIST.md`.

### Database
- Amounts stored as integers (Rupiah, no decimals)
- Soft-delete via `deleted_at` timestamp
- **Exception:** Partner rejection triggers hard delete of merchant PII (business rule #3 above)
- All application state changes logged to `application_timeline`

---

## Code Style

### TypeScript
- Strict mode everywhere — no `any`
- All API response types in `packages/shared/types/`
- `interface` for object shapes, `type` for unions/intersections

### React
- Functional components only
- Always handle: loading skeleton · empty state · error state

### Backend
- Controllers are thin (parse req → call service → return response)
- Services contain all business logic; no `req`/`res` inside services
- Zod validation before any business logic

### File naming
```
pages/       → PascalCase   (DashboardPage.tsx)
components/  → PascalCase   (MitraScoreCard.tsx)
hooks/       → camelCase    (useApplicationStatus.ts)
services/    → camelCase    (applicationService.ts)
routes/      → kebab-case   (partner-applications.ts)
utils/       → camelCase    (formatRupiah.ts)
types/       → PascalCase   (Application.ts)
```

Formatting rule: wrap all code references in backticks — enum values, field names, model names, function names, status constants, file paths, CLI commands.

---

## Design System

```
Primary Blue:  #1E3A8A   (headers, CTAs, dark nav)
Accent Blue:   #2563EB   (interactive, links)
Gold/Amber:    #D97706   (Mitra Score, tier badges)
Green:         #16A34A   (success, approved)
Yellow:        #CA8A04   (warning, pending)
Red:           #DC2626   (error, SLA breach, rejected)
Background:    #F8FAFC
Card:          #FFFFFF
Text primary:  #0F172A
Text secondary:#64748B
```

Top nav always shows: `Olsera Mitra Modal` + `× Trustera` sub-label.

---

## Indonesian Formatting

Use helpers from `packages/shared/utils/format.ts`:
```typescript
formatRupiah(50000000)      // → "Rp 50.000.000"
formatRupiahShort(4200000)  // → "Rp 4.2M"
formatDate(date)            // → "8 Maret 2026"
formatPercent(0.125)        // → "12,5%"
formatTimer(5025)           // → "1:23:45"
```

---

## Demo Accounts (seeded)

| Role | Email | Password |
|------|-------|----------|
| Merchant | merchant@demo.com | demo123 |
| Partner | partner.mandiri@demo.com | demo123 |
| Admin | admin@olsera.com | demo123 |
| Data | data@olsera.com | demo123 |
| Management | coo@olsera.com | demo123 |

---

## Out of Scope — Do NOT Build

- Native mobile app
- Loan disbursement or collection logic
- Credit decision algorithms (partner's responsibility)
- Marketing email/SMS automation
- Integration with uncommitted partners (no API docs = no integration)
- Revenue sharing P&L calculations
- Advanced ML credit scoring models
