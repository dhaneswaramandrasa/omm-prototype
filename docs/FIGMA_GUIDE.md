# Figma Guide — Olsera Mitra Modal
**Location:** `docs/figma-screenshots/`
**Total Screenshots:** 26
**Updated:** March 2026

---

## Overview

All Figma screens are exported as PNG files in `docs/figma-screenshots/`. Each file is named with a Screen ID prefix that maps directly to the screen definitions in `SCREEN_LIST.md`.

**Naming convention:**
```
{SCREEN_ID}_{short-description}.png

Examples:
  SCR-MER-01_landing-page.png
  SCR-ADM-04_partner-approval-queue.png
```

---

## Screen Index

### Auth Screens
> ⚠️ No Figma screenshots exported yet for Auth screens (SCR-AUTH-01, SCR-AUTH-02).

---

### Merchant Portal (SCR-MER)

| File | Screen ID | Screen Name | Component File |
|------|-----------|-------------|----------------|
| `SCR-MER-01_landing-page.png` | SCR-MER-01 | Landing Page | `merchant/LandingPage.tsx` |
| `SCR-MER-02_merchant-dashboard.png` | SCR-MER-02 | Merchant Dashboard | `merchant/DashboardPage.tsx` |
| `SCR-MER-03_simulation-step1.png` | SCR-MER-03 | Simulation Step 1 — Loan Amount & Tenor | `merchant/SimulationStep1Page.tsx` |
| `SCR-MER-04_simulation-step2-partner-selection.png` | SCR-MER-04 | Simulation Step 2 — Partner Selection | `merchant/SimulationStep2Page.tsx` |
| `SCR-MER-05_offer-confirmation.png` | SCR-MER-05 | Offer Confirmation | `merchant/OfferConfirmationPage.tsx` |
| `SCR-MER-06_consent-page.png` | SCR-MER-06 | Data Consent (UU PDP) | `merchant/ConsentPage.tsx` |
| `SCR-MER-08_success-page.png` | SCR-MER-08 | Application Success | `merchant/SuccessPage.tsx` |
| `SCR-MER-09_tracking-page.png` | SCR-MER-09 | Application Tracking | `merchant/TrackingPage.tsx` |
| `SCR-MER-10_support-ticket.png` | SCR-MER-10 | Support Tickets | `merchant/SupportPage.tsx` |

> ⚠️ **SCR-MER-07** (External Verification) has no screenshot — this screen is a redirect bridge to partner's own KYC flow.

---

### Partner Portal (SCR-PAR)

| File | Screen ID | Screen Name | Component File |
|------|-----------|-------------|----------------|
| `SCR-PAR-01_partner-dashboard.png` | SCR-PAR-01 | Partner Dashboard | `partner/DashboardPage.tsx` |
| `SCR-PAR-02_application-detail-partner.png` | SCR-PAR-02 | Application Detail — Partner View | `partner/ApplicationDetailPage.tsx` |
| `SCR-PAR-03_registration.png` | SCR-PAR-03 | Partner Registration | `partner/RegistrationPage.tsx` |
| `SCR-PAR-04_onboardingr.png` | SCR-PAR-04 | Partner Onboarding Checklist | `partner/OnboardingPage.tsx` |
| `SCR-PAR-05_productcatalog.png` | SCR-PAR-05 | Loan Product Catalog | `partner/ProductCatalogPage.tsx` |
| `SCR-PAR-06_supportticket.png` | SCR-PAR-06 | Partner Application List | `partner/ApplicationListPage.tsx` |

> ⚠️ **SCR-PAR-07** (Partner Support) has no screenshot yet. Note: the file `SCR-PAR-06_supportticket.png` is named "supportticket" in Figma but maps to the Application List screen (SCR-PAR-06) per SCREEN_LIST.md.

---

### Admin Portal (SCR-ADM)

| File | Screen ID | Screen Name | Component File |
|------|-----------|-------------|----------------|
| `SCR-ADM-01_admin-dashboard.png` | SCR-ADM-01 | Admin Dashboard | `admin/DashboardPage.tsx` |
| `SCR-ADM-02_application-management.png` | SCR-ADM-02 | Application Management | `admin/ApplicationManagementPage.tsx` |
| `SCR-ADM-03_application-detail-admin.png` | SCR-ADM-03 | Application Detail — Admin View | `admin/ApplicationDetailPage.tsx` |
| `SCR-ADM-04_partner-approval-queue.png` | SCR-ADM-04 | Partner Approval Queue | `admin/PartnerQueuePage.tsx` |
| `SCR-ADM-05_partner-health.png` | SCR-ADM-05 | Partner Health Analytics | `admin/PartnerHealthPage.tsx` |
| `SCR-ADM-06_finance_dashboard.png` | SCR-ADM-06 | Finance Dashboard | `admin/FinanceDashboardPage.tsx` |
| `SCR-ADM-07_support_dahsboard.png` | SCR-ADM-07 | Support Dashboard | `admin/SupportDashboardPage.tsx` |

---

### Special Screens

| File | Screen ID | Screen Name | Maps To | Component File |
|------|-----------|-------------|---------|----------------|
| `SCR-EDB-01_executive_dashboard.png` | SCR-EDB-01 | Executive Dashboard | SCR-ADM-08 | `management/ExecutiveDashboardPage.tsx` |
| `SCR-DIT-01_data_intelligence.png` | SCR-DIT-01 | Data Intelligence | SCR-DAT-01 | `data/DataIntelligencePage.tsx` |
| `SCR-BLO-01_BOS_loop_alignment.png` | SCR-BLO-01 | BOS Loop Alignment | SCR-SYS-01 | `system/BOSLoopPage.tsx` |
| `SCR-VC-01_VAS_GROWTH.png` | SCR-VC-01 | VAS Growth Console | SCR-MER-11 | `vas/VASConsolePage.tsx` |

**Prefix mapping:**
- `SCR-EDB-` → Executive Dashboard (accessible to admin + management roles)
- `SCR-DIT-` → Data Intelligence Team portal
- `SCR-BLO-` → BOS Loop / System internal view
- `SCR-VC-` → Value-Added Services console

---

## Screen Count by Portal

| Portal | Screenshots | Total Screens in SCREEN_LIST.md |
|--------|------------|----------------------------------|
| Merchant | 9 | 11 (missing SCR-MER-07, SCR-MER-11) |
| Partner | 6 | 7 (missing SCR-PAR-07) |
| Admin | 7 | 8 (SCR-ADM-08 exported as SCR-EDB-01) |
| Data | 1 | 1 ✅ |
| Management | 1 | 1 ✅ (exported as SCR-EDB-01) |
| System | 1 | 1 ✅ |
| VAS | 1 | 1 ✅ |
| Auth | 0 | 2 |
| **Total** | **26** | **32** |

---

## How to Use These in Development

### Reference during implementation
When building a screen, open the corresponding screenshot alongside `SCREEN_LIST.md`:

1. Find the Screen ID in the table above
2. Open the PNG from `docs/figma-screenshots/`
3. Cross-reference the "Key UI Elements" section in `SCREEN_LIST.md`
4. Build the component at the file path listed in `SCREEN_LIST.md`

### Example — building SCR-ADM-04
```bash
# Open the screenshot
open docs/figma-screenshots/SCR-ADM-04_partner-approval-queue.png

# Reference the spec
# docs/SCREEN_LIST.md → SCR-ADM-04 section

# Build at
# apps/web/src/pages/admin/PartnerQueuePage.tsx
```

### Naming your Linear ticket
When creating a Linear ticket for a screen, use the Screen ID as a reference:
```
OMM-86 — Build Partner Approval Queue (SCR-ADM-04)
```

---

## Design System Reference

All screens use the OMM Design System. Colors, typography, and component library are defined in `PRD.md` Section 8.

Quick reference:

| Token | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#1E3A8A` | Headers, dark nav backgrounds, primary CTAs |
| Accent Blue | `#2563EB` | Links, interactive elements |
| Gold / Amber | `#D97706` | Mitra Score, tier badges, gold highlights |
| Success Green | `#16A34A` | Approved status, positive delta |
| Warning Yellow | `#CA8A04` | SLA warnings, pending states |
| Error Red | `#DC2626` | Rejected, SLA breach |
| Background | `#F8FAFC` | App background |
| Card | `#FFFFFF` | Card surface |
| Text Primary | `#0F172A` | Main body text |
| Text Secondary | `#64748B` | Labels, captions |
| Border | `#E2E8F0` | Card borders, dividers |

**Font:** Inter (Google Fonts)
**Components:** shadcn/ui + Tailwind CSS
**Charts:** Recharts
**Icons:** Lucide React

---

## Missing / Pending Screenshots

These screens exist in `SCREEN_LIST.md` but do not yet have Figma screenshots:

| Screen ID | Screen Name | Status |
|-----------|-------------|--------|
| SCR-AUTH-01 | Login Page | Missing |
| SCR-AUTH-02 | Forgot Password | Missing |
| SCR-MER-07 | External Verification | Missing — redirect-only screen, may not need Figma |
| SCR-MER-11 | VAS Console | Covered by SCR-VC-01 |
| SCR-PAR-07 | Partner Support | Missing |
| SCR-ADM-08 | Executive Dashboard | Covered by SCR-EDB-01 |
