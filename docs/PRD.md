# PRD — Olsera Mitra Modal
**Version:** 1.0  
**Status:** Approved (Phase 1)  
**Date:** March 2026  
**Author:** Product — PT Olsera Indonesia Pratama  
**Signed:** Dhaneswara Mandrasa (Head of Product), Eka Perwira Pratama Citra (CCO), Ali Tjin (CTO)

---

## 1. Executive Summary

Olsera Mitra Modal is a **multi-lender financial aggregator** embedded within the Olsera merchant ecosystem. It connects 30,000+ micro-merchants (warungs/UMKM) on the Sewarung POS platform with multiple verified lending partners (banks, P2P lenders, fintech companies) through a single web application.

**Core value proposition:**
- **For merchants:** One application, multiple loan offers — compared side-by-side using real POS data as credit evidence
- **For lending partners:** Pre-screened applicants with AI-generated credit profiles, higher approval confidence, lower CAC
- **For Olsera:** New revenue stream (referral/commission fees), deeper ecosystem lock-in, data monetization foundation

**Critical constraint:** Olsera is a **neutral orchestrator, never a lender.** All credit decisions, loan disbursements, collections, and repayment management are the exclusive responsibility of certified partner institutions.

---

## 2. Problem Statement

Olsera merchants face 5 structural barriers to business financing:

| # | Problem | Impact |
|---|---------|--------|
| 1 | **Capital Access Gap** — Banks require complex documentation; informal lenders are predatory | Merchants can't grow inventory or expand |
| 2 | **Information Asymmetry** — Merchants don't know which partner offers the best rate for their profile | Sub-optimal financing choices |
| 3 | **Application Friction** — Must apply to each lender separately with repeated documentation | High abandonment rate |
| 4 | **Decision Paralysis** — Difficult to compare bunga, tenor, limit, and approval timeline across lenders | Delayed or no decision |
| 5 | **Trust Issues** — Fear of predatory lending, hidden fees | Avoidance of formal credit |

**Existing state:** Olsera has a single-lender integration with GoTyme Bank. This is insufficient because:
- Merchants have no competitive comparison
- GoTyme has no incentive to cooperate with a multi-lender aggregator (competitive conflict)

---

## 3. Goals & Success Metrics

### Phase 1 Goals (Weeks 1–8: Prototype & Partner Acquisition)
- Build working prototype to validate UX with real merchants
- Create compelling demo for partner acquisition conversations
- Secure 1–2 committed banking/fintech partners with signed agreements

### Phase 2 Goals (Weeks 9–24: Integration & Production)
*Only begins after Phase 1 criteria are met.*
- Launch production platform with real partner API integrations
- Process first live loan applications

### Success Metrics (12 months post-launch)

| Category | Metric | Target |
|----------|--------|--------|
| Reach | Landing page visitors | 11,500–13,000/mo |
| Conversion | Visitor → Application submission | 3–5% |
| Volume | Total applications | 1,000+ |
| Quality | Approval rate | >40% |
| Delivery | Phase 1 completion | Week 6–8 |
| Delivery | Partner acquisition | 1–2 committed partners |
| Delivery | Phase 2 production launch | Week 20–24 |

---

## 4. Scope

### 4.1 In Scope (Phase 1 & 2)

- Frontend UI — web-based, mobile-responsive
- Loan calculator + partner comparison interface
- Transaction data integration from Sewarung POS (aggregated only)
- Partner API integration (for committed partners only, Phase 2)
- Application submission and status tracking
- Merchant eligibility checking
- KYC data management and document upload
- Consent management (UU PDP compliant)
- Admin dashboard for monitoring
- Partner portal (review, decision, SLA)
- Partner onboarding + approval queue (Admin)
- Basic analytics and reporting
- AWS infrastructure setup
- Security implementation
- Testing (unit, integration, UAT with partners)
- Technical documentation

### 4.2 Out of Scope

- Actual lending operations (partner responsibility)
- Credit decision making (partner responsibility)
- Loan disbursement (partner responsibility)
- Collection and repayment management (partner responsibility)
- Advanced credit scoring ML models (Phase 3)
- Marketing automation and email/SMS campaigns
- Native mobile app (web-responsive first)
- Integration with uncommitted partners (no speculative API work)
- Customer acquisition marketing campaigns
- Extended support beyond 3 months post-launch
- Revenue sharing / referral fee P&L management

---

## 5. User Roles & Personas

### 5.1 Merchant (Primary)
**Who:** Warung/UMKM owner using Sewarung POS  
**Goal:** Access business capital quickly with minimum friction  
**Pain:** Complex documentation, no way to compare lenders, distrust of formal credit  
**Tech comfort:** Mobile-first, moderate digital literacy  
**Key permissions:** View own score, simulate loans, apply, track, manage consent

### 5.2 Lending Partner
**Who:** Credit officer or operations manager at a bank/P2P/fintech  
**Goal:** Review pre-screened applicants, make credit decisions efficiently, monitor their portfolio  
**Pain:** High CAC, unreliable merchant data, time-consuming verification  
**Key permissions:** View assigned applications + merchant data (with consent), approve/reject, view own dashboard

### 5.3 Olsera Admin
**Who:** Olsera internal team (operations, platform management)  
**Goal:** Monitor platform health, manage partners, enforce SLA, resolve issues  
**Key permissions:** Full read on all applications, manage partner onboarding/offboarding, view SLA alerts, access system health

### 5.4 Data Team
**Who:** Olsera data scientist / analyst  
**Goal:** Monitor merchant score quality, analyze cohorts, support credit model improvement  
**Key permissions:** Read-only analytics on merchant scores, application outcomes, partner performance (no PII)

### 5.5 Management
**Who:** CCO, CTO, CFO — executive level  
**Goal:** Business KPIs at a glance — GMV, partner count, revenue, approval rates  
**Key permissions:** Read-only executive dashboard

---

## 6. Functional Requirements

### 6.1 Authentication & Authorization

| ID | Requirement | Priority |
|----|-------------|----------|
| AUTH-01 | Users log in via email + password | P0 |
| AUTH-02 | JWT access token (15 min) + refresh token (7 days, httpOnly cookie) | P0 |
| AUTH-03 | Role-based route protection — merchant/partner/admin/data/management | P0 |
| AUTH-04 | Session invalidated on logout (Redis revocation) | P1 |
| AUTH-05 | Password reset via email OTP | P2 |

### 6.2 Merchant — Simulation & Application

| ID | Requirement | Priority |
|----|-------------|----------|
| MERC-01 | Merchant can input desired loan amount (Rp 1jt – Rp 500jt) via slider + quick chips | P0 |
| MERC-02 | Merchant can input desired tenor (3–36 months) via slider + quick chips | P0 |
| MERC-03 | System returns list of eligible partners filtered by amount/tenor/score | P0 |
| MERC-04 | Each partner card shows: rate, rate type (flat/efektif), tenor range, feature tags | P0 |
| MERC-05 | Ineligible partners shown in greyed section with reason | P0 |
| MERC-06 | Merchant selects one partner to proceed | P0 |
| MERC-07 | Offer confirmation screen shows estimated monthly installment | P0 |
| MERC-08 | Merchant must explicitly consent before data is shared with partner (UU PDP) | P0 |
| MERC-09 | Consent record stores: consent_id, data_scope, timestamp, IP address | P0 |
| MERC-10 | Application submitted → Application ID generated → Success screen | P0 |
| MERC-11 | Merchant can track application status with timeline | P0 |
| MERC-12 | Merchant dashboard shows Mitra/ATRI score, tier, progress bar | P1 |
| MERC-13 | Merchant can view connected stores and monthly revenue | P1 |
| MERC-14 | Achievement/reward badges displayed | P2 |
| MERC-15 | Improvement Guide tab (how to improve score) | P2 |

### 6.3 Partner Portal

| ID | Requirement | Priority |
|----|-------------|----------|
| PART-01 | Partner dashboard shows: total applications, pending count, approval rate, total disbursed | P0 |
| PART-02 | Pending applications table with SLA countdown timer per row | P0 |
| PART-03 | Application detail shows AI-generated credit score + explanation | P0 |
| PART-04 | Application detail shows aggregated merchant data (revenue, growth, volume, tenure, peak day, categories) | P0 |
| PART-05 | Application detail shows Consent Proof (consent_id + timestamp) | P0 |
| PART-06 | Partner can Approve or Reject with one click | P0 |
| PART-07 | On rejection: trigger deletion of merchant PII from partner-accessible data | P0 |
| PART-08 | Partner sees disclaimer: "Keputusan penolakan akan otomatis menghapus semua data merchant" | P0 |
| PART-09 | Partner can register and self-onboard (multi-step) | P1 |
| PART-10 | Partner can configure loan products (rate, tenor, limit, requirements) | P1 |
| PART-11 | SLA warning shown when approaching breach threshold | P1 |

### 6.4 Admin Portal

| ID | Requirement | Priority |
|----|-------------|----------|
| ADMIN-01 | Admin dashboard: total applications, active partners, SLA breaches, total volume | P0 |
| ADMIN-02 | Partner performance list: approval rate, avg SLA response, health badge | P0 |
| ADMIN-03 | SLA Alerts panel: real-time warnings for partners approaching/breaching | P0 |
| ADMIN-04 | System Health panel: API uptime, avg response time, active sessions | P0 |
| ADMIN-05 | Application Management: searchable/filterable table of all applications | P0 |
| ADMIN-06 | Admin application detail: overview + consent log + partner response + audit trail tabs | P0 |
| ADMIN-07 | Partner Approval Queue: review new partners before go-live | P0 |
| ADMIN-08 | Queue shows: partner name, type, onboarding stage, progress %, risk level, SLA | P0 |
| ADMIN-09 | Admin can approve/reject partner onboarding | P0 |
| ADMIN-10 | Partner Health page: deeper per-partner analytics | P1 |
| ADMIN-11 | Finance dashboard: disbursement volumes, referral fee calculations | P2 |

### 6.5 Scoring & Matching Engine

| ID | Requirement | Priority |
|----|-------------|----------|
| SCORE-01 | Mitra Score calculated from: monthly revenue (30%), growth rate (25%), transaction consistency (20%), platform tenure (15%), category risk (10%) | P0 |
| SCORE-02 | Score range: 300–900. Tiers: Excellent (750+), Good (600–749), Fair (450–599), Poor (<450) | P0 |
| SCORE-03 | Partner matching filters: amount range, tenor range, minimum score threshold | P0 |
| SCORE-04 | Matching result segregates eligible vs ineligible partners with reason | P0 |
| SCORE-05 | Score recalculated nightly from latest POS data | P1 |

### 6.6 SLA Management

| ID | Requirement | Priority |
|----|-------------|----------|
| SLA-01 | Each partner has configurable SLA (review hours, decision hours) | P0 |
| SLA-02 | SLA timer stored in Redis, starts on application submission | P0 |
| SLA-03 | Background job checks SLA every 5 minutes | P0 |
| SLA-04 | On breach: flag application, alert admin, warn partner | P0 |
| SLA-05 | SLA timer displayed as HH:MM:SS countdown in partner + admin tables | P0 |

---

## 7. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Performance** | Page load < 3s on 3G mobile; API response < 500ms (p95) |
| **Availability** | 99.5% uptime (Phase 1 dev target), 99.9% (Phase 2 production) |
| **Concurrency** | Handle 1,000 concurrent users (Phase 2 production) |
| **Security** | OWASP Top 10 compliance; JWT + httpOnly cookies; input sanitization via Zod |
| **Privacy** | UU PDP compliant — explicit consent, data minimization, right to deletion |
| **Compliance** | OJK — platform operates as aggregator, not lender; no lending license required |
| **Accessibility** | WCAG 2.1 Level AA (minimum) |
| **Mobile** | Fully responsive (320px breakpoint minimum) |
| **Browser Support** | Chrome 90+, Firefox 90+, Safari 14+, Edge 90+ |

---

## 8. Design System

### Colors
```
Primary Blue:    #1E3A8A  (headers, CTAs, dark backgrounds)
Accent Blue:     #2563EB  (interactive elements, links)
Gold/Amber:      #D97706  (Mitra Score, tier badges, highlights)
Success Green:   #16A34A
Warning Yellow:  #CA8A04
Error Red:       #DC2626
Background:      #F8FAFC
Card:            #FFFFFF
Text Primary:    #0F172A
Text Secondary:  #64748B
Border:          #E2E8F0
```

### Typography
- Font: Inter (Google Fonts)
- Heading scale: 2xl/xl/lg/base
- Body: 14px / 16px
- Monospace: for IDs, codes (JetBrains Mono)

### Component Library
- Base: shadcn/ui (Radix primitives)
- Styling: Tailwind CSS utility classes
- Charts: Recharts
- Icons: Lucide React

### Branding
- Top nav always shows: "Olsera Mitra Modal" + "× Trustera" sub-label
- Olsera logo top-left
- Disclaimer always visible on pages showing merchant data: "Olsera bukan pemberi pinjaman. Keputusan & pencairan oleh mitra."

---

## 9. Data Model Summary

### Core Entities
- **users** — auth credentials + role
- **merchants** — business profile linked to user
- **merchant_stores** — individual outlet data
- **merchant_scores** — Mitra/ATRI score snapshots
- **partners** — lending institution profile
- **partner_products** — loan product configurations per partner
- **partner_onboarding** — multi-stage approval workflow
- **loan_applications** — application record (merchant ↔ partner)
- **application_consents** — UU PDP consent audit record
- **application_timeline** — status change history
- **partner_decisions** — approve/reject with notes
- **sla_config** — per-partner SLA settings
- **sla_breaches** — breach log
- **support_tickets** — CS tickets

### Key Rules
- Amounts stored as integers (Rupiah, no decimals)
- Soft-delete via `deleted_at` (exception: partner rejection triggers hard delete of merchant PII per UU PDP)
- All state changes logged to `application_timeline`

---

## 10. Phase Gate Criteria

### Phase 1 → Phase 2 Gate (CRITICAL)
Phase 2 **cannot start** without ALL of the following:
1. Working prototype with mockup data from 4+ partner templates ✓
2. User testing completed with 20–30 merchants, >70% positive feedback ✓
3. Demo materials ready for partner presentations ✓
4. Technical requirements document completed ✓
5. **At least 1–2 banking partners committed with signed agreement** ← BLOCKING
6. **Partner API documentation received or clear timeline commitment** ← BLOCKING
7. Technical feasibility assessment completed ✓

---

## 11. Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Partner Acquisition Failure | CRITICAL | C-level involvement early; compelling demo; multiple parallel conversations |
| Partner API Documentation Delays | HIGH | Set clear SLA; parallel development with mocks; escalate delays |
| Partner API Complexity | MEDIUM | Technical assessment; buffer time; modular connector design |
| GoTyme Non-Cooperation | LOW-MEDIUM | Already validated; focus energy on alternative partners (Bank INA, Adapundi, OCBC) |
| Low Merchant Adoption | MEDIUM | Pre-launch education; incentives; seamless Sewarung integration |
| Regulatory Compliance Issues | HIGH | Early Legal consultation; OJK compliance checks; explicit non-lender positioning |
| Integration Testing Issues | MEDIUM | Extensive sandbox testing; early UAT; clear acceptance criteria |

---

## 12. Budget Summary

| Phase | Budget |
|-------|--------|
| Phase 1 (Prototype) | Rp 66,073,292 |
| Phase 2 (Integration & Production) | Rp 352,702,804 |
| **Subtotal** | **Rp 418,776,096** |
| Contingency (15%) | Rp 62,816,414 |
| **Total Project Budget** | **Rp 481,592,510** |

Post-launch recurring: **Rp 50,000,000/month** (infrastructure + monitoring + third-party services)

*Note: Phase 2 budget only allocated after Phase 1 successful completion and partner commitment secured.*
