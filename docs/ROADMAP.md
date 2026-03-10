# Olsera Mitra Modal — Product Roadmap
> Epic-Based Delivery Timeline | Q1 – Q3 2026 | Phase 1: Prototype & Partner Acquisition

---

## Committed Partners

| Partner | Type | Rate | Tenor | Limit | Phase 1 Model | Phase 2 |
|---------|------|------|-------|-------|---------------|---------|
| **Adapundi** | P2P Fintech | 1.5% flat/mo | 3–12 bulan | Rp 5jt–500jt | Redirect → `https://h5-app.adapundi.com/?channel2=h5Olsera` | Full API (awaiting docs) |
| **OCBC — KTA Cashbiz** | Bank | 0.89%–1.59% flat/mo | 6–36 bulan | Rp 25jt–2M | Coming Soon (URL pending from OCBC) | Full API (URL + docs pending) |

> Both partners are live in `demo/management-prototype`. See `OMM-2026-Roadmap.xlsx` in this folder for the full visual timeline.

---

## Phase Overview

| Phase | Objective | Key Deliverables | Target Go Live | Risk Level | Owner |
|-------|-----------|------------------|----------------|------------|-------|
| **Phase 1 — Foundation** | Monorepo, Tooling & Design System | Monorepo, TypeScript, Docker, Design System, Auth | 1 Mar | P0 - Blocker | TIA |
| **Phase 2 — Merchant Flow** | Complete Merchant UX | 7 merchant pages, Scoring Engine, full Simulation flow | 31 Mar | P0 - Blocker | TIA |
| **Phase 3 — Partner Portal** | Partner Decision Layer | Partner dashboard, App review, Approve/Reject, SLA timers | 15 Apr | P0 - Critical | TIA |
| **Phase 4 — Admin & Data** | Operations & Analytics Layer | Admin portal, Data Intelligence, Executive Dashboard | 30 Apr | P1 - High | TIA |
| **Phase 5 — Backend APIs** | Real API Layer + QA | All endpoints, DB migrations, Seed data, Automated tests | 31 May | P1 - High | TIA |
| **Phase 6 — Partner Integration** | Live Partner Integration | Adapundi full API, OCBC integration, Production infrastructure | 30 Jun | P1 - High | BP |

---

## Epic Roadmap

### Q1 2026

| Epic ID | Epic Name | Phase | Deadline | Priority | Dependencies | Status |
|---------|-----------|-------|----------|----------|--------------|--------|
| **E1** | Project Foundation & Dev Environment | Phase 1 — Foundation | 28 Feb | P0 - Blocker | None (Foundation Epic) | ✅ Done |
| **E2** | Design System & Shared Components | Phase 1 — Foundation | 1 Mar | P0 - Blocker | E1 (Boilerplate Setup) | ✅ Done |
| **E3** | Authentication & RBAC | Phase 1 — Foundation | 10 Mar | P0 - Blocker | E2 (Design System) | 🔄 In Progress |
| **E7** | Scoring & Matching Engine | Phase 2 — Merchant Flow | 20 Mar | P0 - Blocker | E1 (DB Schema) | ⬜ **Start Here Next** |
| **E4** | Merchant Flow — Simulation & Application | Phase 2 — Merchant Flow | 31 Mar | P0 - Blocker | E3 (Auth), E7 (Scoring) | 🔄 Frontend ✅ · API ⬜ |

### Q2 2026

| Epic ID | Epic Name | Phase | Deadline | Priority | Dependencies | Status |
|---------|-----------|-------|----------|----------|--------------|--------|
| **E8** | SLA Management | Phase 3 — Partner Portal | 15 Apr | P0 - Critical | E4 (Merchant Submit) | 🔄 UI ✅ · Backend ⬜ |
| **E5** | Partner Portal — Review & Decision | Phase 3 — Partner Portal | 15 Apr | P0 - Critical | E4 (Merchant Flow), E7 (Score) | 🔄 Frontend ✅ · API ⬜ |
| **E6** | Admin Portal — Operations & Monitoring | Phase 4 — Admin & Data | 30 Apr | P0 - Critical | E5 (Partner), E8 (SLA) | 🔄 Frontend ✅ · API ⬜ |
| **E10** | Data Team & Management Views | Phase 4 — Admin & Data | 30 Apr | P1 - High | E4 (Merchant), E5 (Partner) | 🔄 Frontend ✅ · API ⬜ |
| **E9** | Database & Seed Data | Phase 5 — Backend APIs | 31 May | P0 - Critical | E1 (Migration runner) | 🔄 Partial |
| **E11** | Testing & QA | Phase 5 — Backend APIs | 31 May | P1 - High | All Epics | ⬜ Todo |

### Q2 – Q3 2026

| Epic ID | Epic Name | Phase | Deadline | Priority | Dependencies | Status |
|---------|-----------|-------|----------|----------|--------------|--------|
| **E12** | Partner API Integration (Real) | Phase 6 — Partner Integration | 30 Jun | P0 - Critical | E5 (Partner Portal), API docs from partners | 🔄 Phase 1 Redirect ✅ · Phase 2 API ⬜ |
| **E13** | Production Infrastructure & Security | Phase 6 — Partner Integration | 30 Jun | P0 - Critical | E11 (Tests), E12 (APIs) | 🔒 Phase 2 |

---

## Epic Timeline (Gantt Overview)

```
Epic                                    │ Mar          │ Apr          │ May          │ Jun
                                        │ W1  W2  W3  W4│ W1  W2  W3  W4│ W1  W2  W3  W4│ W1  W2  W3  W4
────────────────────────────────────────┼───────────────┼───────────────┼───────────────┼───────────────
E1  Foundation                          │ ██             │               │               │
E2  Design System                       │ ██             │               │               │
E3  Auth & RBAC              [▶ NOW]    │ ████           │               │               │
E7  Scoring Engine           [NEXT]     │    ████████    │               │               │
E4  Merchant Flow                       │ ████████████  │               │               │
E8  SLA Management                      │        ████████████            │               │
E5  Partner Portal                      │        ████████████            │               │
E6  Admin Portal                        │               │ ████████████  │               │
E10 Data & Management                   │               │ ████████████  │               │
E9  Database & Seeds                    │    ████████████████████████████│               │
E11 Testing & QA                        │               │               │ ████████████  │
E12 Partner API Integration             │               │               │ ████████████████████████
E13 Production Infrastructure           │               │               │               │ ████████████
```

**Legend:** `██` Done · `▶` In Progress · next = Todo/Start Next

---

## Priority Legend

| Label | Meaning | Color |
|-------|---------|-------|
| P0 - Blocker | Blocks everything else; must complete on time | 🔴 Red |
| P0 - Critical | Critical path; delays cause downstream impact | 🟠 Orange |
| P1 - High | Important but not blocking other epics | 🟡 Amber |

## Status Legend

| Status | Meaning |
|--------|---------|
| ✅ Done | All acceptance criteria met; In Review or merged |
| 🔄 In Progress | Actively being worked on; may be partial (frontend only) |
| ⬜ Todo | Not started; scheduled and ready to pick up |
| 🔒 Phase 2 | Blocked on external dependency (partner API docs / committed contract) |

---

## Recommended Build Order

Following epic dependency chain:

```
E3 (Auth backend) → E7 (Scoring) → E4 (Merchant API) → E8 (SLA backend)
    → E5 (Partner API) → E6 (Admin API) → E9 (DB Seeds) → E10 (Analytics API) → E11 (Tests)
    → E12 (Partner API Integration) → E13 (Production)
```

**Start now:** `E3` backend (JWT, refresh, logout, RBAC middleware) → then `E7` (scoring engine)

---

## Files

| File | Description |
|------|-------------|
| `docs/ROADMAP.md` | This file — high-level roadmap in Markdown |
| `docs/OMM-2026-Roadmap.xlsx` | Excel version with 2 sheets: Product Roadmap + Gantt Timeline |
| `docs/EPICS_TASKS.md` | Full epic breakdown with tasks, acceptance criteria, estimates |
| `docs/PRD.md` | Product requirements document |
| `docs/API_LIST.md` | All API endpoints with request/response schemas |
| `docs/SCREEN_LIST.md` | Every screen — route, components, UI states |
