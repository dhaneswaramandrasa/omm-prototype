# Olsera Mitra Modal — Product Roadmap
> Epic-Based Delivery Timeline | Q1 – Q3 2026 | Phase 1: Prototype & Partner Acquisition

---

## Committed Partners

| Partner | Type | Rate | Tenor | Limit | Phase 1 Model | Phase 2 |
|---------|------|------|-------|-------|---------------|---------|
| **Adapundi** | P2P Fintech | 1.5% flat/mo | 3–12 bulan | Rp 5jt–500jt | Redirect → `https://h5-app.adapundi.com/?channel2=h5Olsera` | Full API (awaiting docs) |
| **OCBC — KTA Cashbiz** | Bank | 0.89%–1.59% flat/mo | 6–36 bulan | Rp 25jt–2M | Coming Soon (URL pending from OCBC) | Full API (URL + docs pending) |

> Both partners are live in `demo/management-prototype`. See `OMM-2026-Roadmap.xlsx` in this folder for the full visual timeline.

> **Note — Backoffice version:** A separate backoffice application (not this web app) targets Adapundi integration by **end of March 2026**, and OCBC integration by **end of April 2026**.

> **Note — Web app redirect:** For this web app, the Adapundi redirect and OCBC "Coming Soon" card are already live in the prototype. Production deployment of these two cards (Phase 1 redirect model only — not full API) targets **end of April** alongside the full merchant flow.

---

## Phase Overview

| Phase | Objective | Key Deliverables | Target Go Live | Risk Level | Owner |
|-------|-----------|------------------|----------------|------------|-------|
| **Phase 1 — Foundation** | Monorepo, Tooling & Design System | Monorepo, TypeScript, Docker, Design System, Auth | 1 Mar | P0 - Blocker | Product / Engineering |
| **Phase 2 — Merchant Flow** | Complete Merchant UX | 7 merchant pages, Scoring Engine, full Simulation flow + Adapundi redirect + OCBC card | 30 Apr | P0 - Blocker | Product / Engineering |
| **Phase 3 — Partner Portal** | Partner Decision Layer | Partner dashboard, App review, Approve/Reject, SLA timers | 31 May | P0 - Critical | Product / Engineering |
| **Phase 4 — Admin & Data** | Operations & Analytics Layer | Admin portal, Data Intelligence, Executive Dashboard | 31 May | P1 - High | Product / Engineering |
| **Phase 5 — Backend APIs** | Real API Layer + QA | All endpoints, DB migrations, Seed data, Automated tests | 31 May | P1 - High | Product / Engineering |
| **Phase 6 — Partner Integration** | Live Partner Integration | Adapundi full API, OCBC integration, Production infrastructure | 30 Jun | P1 - High | Product / Engineering |

---

## Epic Roadmap

### Q1 2026

| Epic ID | Epic Name | Phase | Deadline | Priority | Dependencies | Status |
|---------|-----------|-------|----------|----------|--------------|--------|
| **E1** | Project Foundation & Dev Environment | Phase 1 — Foundation | 28 Feb | P0 - Blocker | None (Foundation Epic) | ✅ Done |
| **E2** | Design System & Shared Components | Phase 1 — Foundation | 1 Mar | P0 - Blocker | E1 (Boilerplate Setup) | ✅ Done |
| **E3** | Authentication & RBAC | Phase 1 — Foundation | 10 Mar | P0 - Blocker | E2 (Design System) | 🔄 In Progress |
| **E7** | Scoring & Matching Engine | Phase 2 — Merchant Flow | 20 Mar | P0 - Blocker | E1 (DB Schema) | 🔄 In Progress |
| **E4** | Merchant Flow — Simulation & Application | Phase 2 — Merchant Flow | 30 Apr | P0 - Blocker | E3 (Auth), E7 (Scoring) | 🔄 Frontend ✅ · API ⬜ |
| **E12** *(Phase 1 only)* | Partner Redirect Integration — Adapundi + OCBC | Phase 2 — Merchant Flow | 30 Apr | P0 - Critical | E4 (Merchant Flow) | 🔄 Prototype ✅ · Production ⬜ |

> **E12 Phase 1 note:** Phase 1 is a simple URL redirect (Adapundi) + "Coming Soon" card (OCBC) — no API integration required. Already live in `demo/management-prototype`. Production deployment for web app targets end of April.

### Q2 2026

| Epic ID | Epic Name | Phase | Deadline | Priority | Dependencies | Status |
|---------|-----------|-------|----------|----------|--------------|--------|
| **E8** | SLA Management | Phase 3 — Partner Portal | 31 May | P0 - Critical | E4 (Merchant Submit), **Partner signed MOU** | 🔄 UI ✅ · Backend ⬜ |
| **E5** | Partner Portal — Review & Decision | Phase 3 — Partner Portal | 31 May | P0 - Critical | E4 (Merchant Flow), E7 (Score), **Partner willingness / signed MOU** ⚠️ | 🔄 Frontend ✅ · API ⬜ |
| **E6** | Admin Portal — Operations & Monitoring | Phase 4 — Admin & Data | 31 May | P0 - Critical | E5 (Partner), E8 (SLA), **Partner willingness / signed MOU** ⚠️ | 🔄 Frontend ✅ · API ⬜ |
| **E10** | Data Team & Management Views | Phase 4 — Admin & Data | 31 May | P1 - High | E4 (Merchant), E5 (Partner), **Partner data flowing** ⚠️ | 🔄 Frontend ✅ · API ⬜ |
| **E9** | Database & Seed Data | Phase 5 — Backend APIs | 31 May | P0 - Critical | E1 (Migration runner) | 🔄 Partial |
| **E11** | Testing & QA | Phase 5 — Backend APIs | 31 May | P1 - High | All Epics | ⬜ Todo |

> ⚠️ **Partner dependency:** E5, E6, E8, and E10 require at least one partner to formally commit to the Olsera Mitra Modal platform (signed MOU or equivalent). Without partner willingness to participate, the partner-facing portal and SLA mechanics serve no purpose and cannot be properly tested end-to-end.

### Q2 – Q3 2026

| Epic ID | Epic Name | Phase | Deadline | Priority | Dependencies | Status |
|---------|-----------|-------|----------|----------|--------------|--------|
| **E12** *(Phase 2 — Full API)* | Partner API Integration (Real) | Phase 6 — Partner Integration | 30 Jun | P0 - Critical | E5 (Partner Portal), **API docs + sandbox from Adapundi + OCBC** | 🔒 Blocked on API docs |
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
E7  Scoring Engine           [▶ NOW]    │    ████████    │               │               │
E4  Merchant Flow  (web akhir Apr)      │ ████████████████████████      │               │
E12 Adapundi+OCBC redirect (akhir Apr)  │         ██████████████████    │               │
E8  SLA Management           [⚠️ MOU]  │        ████████████████████████████████       │
E5  Partner Portal (akhir Mei)[⚠️ MOU] │        ████████████████████████████████       │
E6  Admin Portal   (akhir Mei)[⚠️ MOU] │               │ ████████████████████████████  │
E10 Data & Mgmt    (akhir Mei)[⚠️ MOU] │               │ ████████████████████████████  │
E9  Database & Seeds                    │    ████████████████████████████│               │
E11 Testing & QA                        │               │               │ ████████████  │
E12 Full API (Phase 2)       [🔒 docs] │               │               │ ████████████████████████
E13 Production Infrastructure           │               │               │               │ ████████████
```

**Backoffice (separate app):**
```
Backoffice Adapundi             akhir Maret ████████████
Backoffice OCBC                 akhir April              ████████████████████████
```

**Legend:** `██` Done · `▶` In Progress · `⚠️` Needs partner MOU · `🔒` Blocked on external

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
| 🔒 Phase 2 / Blocked | Blocked on external dependency (partner API docs / signed contract) |
| ⚠️ Partner MOU | Technically buildable but requires partner commitment to be meaningful |

---

## Recommended Build Order

Following epic dependency chain:

```
E3 (Auth backend) → E7 (Scoring) → E4 (Merchant API) → E12-Phase1 (redirect deploy)
    → E8 (SLA backend) → E5 (Partner API) → E6 (Admin API)
    → E9 (DB Seeds) → E10 (Analytics API) → E11 (Tests)
    → E12-Phase2 (full API, needs partner docs) → E13 (Production)
```

**Currently active:** `E3` (Auth backend) + `E7` (Scoring engine — start here)

---

## Files

| File | Description |
|------|-------------|
| `docs/ROADMAP.md` | This file — high-level roadmap in Markdown |
| `docs/OMM-2026-Roadmap.xlsx` | Excel version with 4 sheets: Product Roadmap, Epic Timeline, Master Timeline (Visual), Master Timeline (Table) |
| `docs/EPICS_TASKS.md` | Full epic breakdown with tasks, acceptance criteria, estimates |
| `docs/PRD.md` | Product requirements document |
| `docs/API_LIST.md` | All API endpoints with request/response schemas |
| `docs/SCREEN_LIST.md` | Every screen — route, components, UI states |
