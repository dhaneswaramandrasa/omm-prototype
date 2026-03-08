# Screen List — Olsera Mitra Modal
**Total Screens:** 28  
**Portals:** Merchant (11) · Partner (7) · Admin (8) · Data (1) · Management (1) · Auth (2) · System (1) · VAS (1)

---

## Conventions

Each screen entry includes:
- **Route** — React Router path
- **Component** — file path in `apps/web/src/pages/`
- **Auth** — required role(s)
- **Layout** — which shell layout is used
- **Key UI Elements** — what to build
- **States** — loading / empty / error / variants

---

## AUTH SCREENS

### SCR-AUTH-01 — Login
- **Route:** `/login`
- **Component:** `auth/LoginPage.tsx`
- **Auth:** Public (redirect to role home if already logged in)
- **Layout:** `AuthLayout` (centered card, Olsera logo top)
- **Key UI:**
  - Email + password fields
  - "Masuk" primary button
  - "Lupa Password?" link
  - Role-based redirect after login (merchant → `/merchant/dashboard`, partner → `/partner/dashboard`, admin → `/admin/dashboard`, etc.)
- **States:** Default · Loading (button spinner) · Error (invalid credentials) · Success (redirect)

### SCR-AUTH-02 — Forgot Password
- **Route:** `/forgot-password`
- **Component:** `auth/ForgotPasswordPage.tsx`
- **Auth:** Public
- **Layout:** `AuthLayout`
- **Key UI:** Email input, OTP input (step 2), new password (step 3). 3-step wizard.
- **States:** Step 1/2/3 · Loading · Error · Success

---

## MERCHANT PORTAL

### SCR-MER-01 — Landing Page
- **Route:** `/merchant/landing`
- **Component:** `merchant/LandingPage.tsx`
- **Auth:** Public (or logged-in merchant)
- **Layout:** `PublicLayout` (full-width, no sidebar)
- **Key UI:**
  - **Hero section** — dark navy gradient bg
    - Badge: "AI-Driven Financial Aggregator"
    - H1: "From Data to **Opportunity**" (Opportunity = `text-amber-600`)
    - Subtitle: "AI-driven financial aggregator for verified merchants"
    - CTA row: `<Button variant="gold">Get Smart Capital →</Button>` + `<Button variant="outline-white">Partner with Us</Button>`
    - Floating score card: circular ring, "850 MITRA SCORE"
  - **Section 2** — "Platform Powered by **Intelligence**"
    - 3 feature cards: 01 Data Aggregation · 02 Smart Matching · 03 Direct Access
    - Each card: numbered label, icon, title, 2-line description
  - **Section 3** — "Trusted Financial **Infrastructure**"
    - 3 bullet points (shield icons)
    - Partner type grid: Bank Partner · P2P Lender · Fintech · Investment (2×2 circles)
  - Footer disclaimer: "Olsera bukan pemberi pinjaman. Keputusan & pencairan oleh mitra."
- **States:** Default only (static marketing page)

### SCR-MER-02 — Merchant Dashboard
- **Route:** `/merchant/dashboard`
- **Component:** `merchant/DashboardPage.tsx`
- **Auth:** `['merchant']`
- **Layout:** `MerchantLayout` (top nav + sidebar)
- **Key UI:**
  - **Header card** (dark navy) — merchant name, ATRI Score (large number, gold), +delta pts
  - ATRI Scoring progress bar — Gold Tier badge, `742/850`, "Top 78% merchants"
  - **Tab bar:** Overview · Improvement Guide · My Applications · Wealth Summary · Learning & Certification
  - **Overview tab content:**
    - 4 stat cards: Connected Stores · Business Valuation (+% delta) · Certificates Earned · Learning Points
    - "Connected Stores & Business" panel — store list (name, location, status badge, monthly revenue)
    - "Achievements & Rewards" panel — badge grid 2×2, each badge: icon, title, "✓ Earned" or locked state
    - "Next Challenge" CTA box
- **States:** Loading skeleton · Populated · Empty (no stores linked)

### SCR-MER-03 — Simulation Step 1
- **Route:** `/merchant/simulation/step1`
- **Component:** `merchant/SimulationStep1Page.tsx`
- **Auth:** `['merchant']`
- **Layout:** `MerchantLayout` (slim, centered content, no sidebar nav)
- **Key UI:**
  - **Stepper** — `① Simulasi` (active) `———` `② Pilih Mitra`
  - Title: "Cari Modal yang **Tepat**"
  - **Card 1 — Nominal Modal:**
    - Amount display (large, `text-blue-600`): "Rp 50.000.000"
    - Range slider (1,000,000 – 500,000,000, step 1,000,000)
    - Quick-select chips: Rp 10 Juta · Rp 25 Juta · Rp 50 Juta · Rp 100 Juta · Rp 250 Juta
  - **Card 2 — Jangka Waktu:**
    - Tenor display (large, `text-amber-600`): "12 Bulan"
    - Range slider (3–36 months, step 3)
    - Quick-select chips: 3 Bulan · 6 Bulan · 12 Bulan · 24 Bulan · 36 Bulan
  - **Tip box** (light blue bg): 💡 "Pilihan mitra akan muncul setelah Anda melanjutkan..."
  - **CTA:** "Lanjut ke Pilih Mitra →" (full-width, dark navy)
- **States:** Default (Rp 50jt, 12 bulan) · Slider interaction · Loading (on proceed)

### SCR-MER-04 — Simulation Step 2 (Partner Selection)
- **Route:** `/merchant/simulation/step2`
- **Component:** `merchant/SimulationStep2Page.tsx`
- **Auth:** `['merchant']`
- **Layout:** `MerchantLayout` (slim, centered)
- **Key UI:**
  - **Stepper** — `✓ Simulasi` `———` `② Pilih Mitra` (active, filled circle)
  - Title: "Pilih **Mitra Terbaik**"
  - Subtitle row: `Modal: Rp 50.000.000 • Tenor: 12 Bulan` (from previous step state)
  - **Info banner** (light blue, shield icon): data accuracy disclaimer
  - **Section: "Mitra yang Tersedia (N)"** — 2-column grid of `PartnerCard` components
    - Each card: logo placeholder · partner name · type badge (Bank/P2P/Fintech) · interest rate (large, bold) · "per tahun" · Rate type + tenor range · feature tag chips · `→` arrow
  - **Section: "Tidak Memenuhi Kriteria"** (grey, below divider)
    - Greyed out partner cards with ineligibility reason text
  - **Back button:** "← Ubah Nominal & Tenor"
- **States:** Loading (skeleton cards) · Populated (eligible + ineligible) · Empty (no partners match at all)

### SCR-MER-05 — Offer Confirmation
- **Route:** `/merchant/offer-confirmation`
- **Component:** `merchant/OfferConfirmationPage.tsx`
- **Auth:** `['merchant']`
- **Layout:** `MerchantLayout`
- **Key UI:**
  - Selected partner name + type
  - Loan summary: amount, tenor, interest rate, rate type
  - Estimated monthly installment calculation
  - Key terms (in simple language)
  - "Lanjut ke Persetujuan Data →" CTA
  - "← Pilih Mitra Lain" back
- **States:** Default · Loading

### SCR-MER-06 — Consent
- **Route:** `/merchant/consent`
- **Component:** `merchant/ConsentPage.tsx`
- **Auth:** `['merchant']`
- **Layout:** `MerchantLayout`
- **Key UI:**
  - **Header:** "Persetujuan Data" with shield icon
  - **Partner name** displayed prominently
  - **Data scope list** — explicitly what will be shared:
    - [ ] Data transaksi historis (12 bulan terakhir)
    - [ ] Rata-rata pendapatan bulanan
    - [ ] Kategori bisnis
    - [ ] Durasi aktif di Olsera
    - [ ] Skor kredit Olsera (Mitra Score)
  - Legal text block (UU PDP reference)
  - Checkbox: "Saya menyetujui berbagi data di atas dengan [Partner Name]"
  - **CTA:** "Setuju & Ajukan Pinjaman" (disabled until checkbox checked)
  - Small print: Consent can be revoked per UU PDP
- **States:** Default (unchecked) · Checked (CTA enabled) · Loading (submitting) · Error

### SCR-MER-07 — External Verification
- **Route:** `/merchant/external-verification`
- **Component:** `merchant/ExternalVerificationPage.tsx`
- **Auth:** `['merchant']`
- **Layout:** `MerchantLayout`
- **Key UI:**
  - Partner logo + name
  - Instructions for partner's KYC/verification process
  - "Continue to Partner →" button (opens partner URL / redirect)
  - Note: "Verifikasi dilakukan langsung oleh [Partner]. Olsera tidak menyimpan data tambahan."
- **States:** Pending redirect · Verification complete (return)

### SCR-MER-08 — Application Success
- **Route:** `/merchant/success`
- **Component:** `merchant/SuccessPage.tsx`
- **Auth:** `['merchant']`
- **Layout:** `MerchantLayout`
- **Key UI:**
  - Success illustration / checkmark animation
  - "Aplikasi Berhasil Diajukan!"
  - Application ID (large, monospace)
  - Partner name + expected response time (from SLA config)
  - Two CTAs: "Lacak Aplikasi →" · "Kembali ke Dashboard"
- **States:** Default only

### SCR-MER-09 — Application Tracking
- **Route:** `/merchant/tracking`
- **Component:** `merchant/TrackingPage.tsx`
- **Auth:** `['merchant']`
- **Layout:** `MerchantLayout`
- **Key UI:**
  - Application selector (if merchant has multiple)
  - **Status Timeline** (vertical stepper):
    - Submitted ✓ + timestamp
    - Partner Review (pending / active / done)
    - Credit Assessment (pending / active / done)
    - Final Decision (pending / Approved ✓ / Rejected ✗)
  - Application summary sidebar: amount, tenor, partner, submitted date
  - If approved: "Pencairan akan diproses oleh [Partner]" info box
  - If rejected: reason (if provided) + "Coba Mitra Lain →" CTA
- **States:** Loading · Active (in-progress) · Approved · Rejected

### SCR-MER-10 — Support Tickets
- **Route:** `/merchant/support`
- **Component:** `merchant/SupportPage.tsx`
- **Auth:** `['merchant']`
- **Layout:** `MerchantLayout`
- **Key UI:**
  - Open tickets list (ticket ID, subject, status badge, last updated)
  - "Buat Tiket Baru" button → modal with subject + description + linked application selector
  - Ticket detail view (chat-style thread)
- **States:** Empty (no tickets) · List view · Detail view · New ticket modal

### SCR-MER-11 — VAS Console
- **Route:** `/vas/console`
- **Component:** `vas/VASConsolePage.tsx`
- **Auth:** `['merchant', 'admin']`
- **Layout:** `MerchantLayout`
- **Key UI:** Value-added services catalog (future — stub screen for Phase 1)
- **States:** Coming soon / placeholder

---

## PARTNER PORTAL

### SCR-PAR-01 — Partner Dashboard
- **Route:** `/partner/dashboard`
- **Component:** `partner/DashboardPage.tsx`
- **Auth:** `['partner']`
- **Layout:** `PartnerLayout` (top nav, sidebar)
- **Key UI:**
  - **Header** (dark navy): "Partner Dashboard" · "[Partner Name] — Lending Portal" · Partner ID badge (PTR-XXX)
  - **4 stat cards** (dark navy bg):
    - Total Aplikasi (number + % trend up)
    - Pending Review (number, warning if >0)
    - Approved Rate (%, trend)
    - Total Disbursed (Rp, trend)
  - **Credit Responsibility disclaimer** (yellow box)
  - **"Aplikasi Pending" table:**
    - Columns: APPLICATION ID · MERCHANT · MITRA SCORE · AMOUNT · TENOR · SLA · STATUS · ACTION
    - Mitra Score: number in gold + tier label (Excellent/Good/Fair)
    - SLA: countdown `HH:MM:SS` (turns red when < 30 min)
    - Status badges: Pending Review (yellow) · Reviewing (blue) · Approved (green) · Rejected (red)
    - ACTION: "View Detail" link
- **States:** Loading · Populated · Empty (no pending apps)

### SCR-PAR-02 — Application Detail (Partner View)
- **Route:** `/partner/applications/:id`
- **Component:** `partner/ApplicationDetailPage.tsx`
- **Auth:** `['partner']`
- **Layout:** `PartnerLayout`
- **Key UI:**
  - Back: "← Kembali ke Dashboard"
  - Title: "Application Detail" · Application ID (APP-XXXXXXX)
  - **Two-column layout:**
    - **Left column:**
      - Blue card: "AI-Generated Credit Score" → large score number + tier badge (Excellent/Good/Fair/Poor) + explanation text
      - "Data Agregat Merchant" — 6 metric cards in 2×3 grid:
        Revenue Bulanan · Growth Rate (green if positive) · Rata-rata Transaksi · Volume Transaksi · Durasi di Olsera · Peak Sales Day
      - "Top Categories" chip row
      - "Consent Proof" section: green icon · Consent ID · Timestamp
    - **Right column:**
      - "Application Summary" card: Merchant name · MER-ID · Amount Requested (blue) · Tenor · Submitted date
      - "✓ Approve Application" button (green, full-width)
      - "⊗ Reject Application" button (red outline, full-width)
      - Data deletion warning note (yellow box)
- **States:** Loading · Ready for review · Approved (show result) · Rejected (show result)

### SCR-PAR-03 — Partner Registration
- **Route:** `/partner/register`
- **Component:** `partner/RegistrationPage.tsx`
- **Auth:** Public
- **Layout:** `AuthLayout`
- **Key UI:** Multi-step form — Company Info → Contact → Business License → Product Config → Submit
- **States:** Step 1–5 · Submitting · Success (awaiting review)

### SCR-PAR-04 — Partner Onboarding
- **Route:** `/partner/onboarding`
- **Component:** `partner/OnboardingPage.tsx`
- **Auth:** `['partner']`
- **Layout:** `PartnerLayout`
- **Key UI:** Checklist of onboarding steps with progress. Current stage highlighted. Document upload per step.
- **States:** In progress · Awaiting review · Approved · Rejected with notes

### SCR-PAR-05 — Product Catalog
- **Route:** `/partner/products`
- **Component:** `partner/ProductCatalogPage.tsx`
- **Auth:** `['partner']`
- **Layout:** `PartnerLayout`
- **Key UI:**
  - List of active loan products (each shows: product name, rate, min/max amount, tenor range, status)
  - "Tambah Produk" button → form modal
  - Edit / Deactivate per product
- **States:** Empty · List · Add/Edit modal

### SCR-PAR-06 — Partner Application List
- **Route:** `/partner/applications`
- **Component:** `partner/ApplicationListPage.tsx`
- **Auth:** `['partner']`
- **Layout:** `PartnerLayout`
- **Key UI:** Full paginated table of all applications (not just pending). Filter by status, date, score range.
- **States:** Loading · Populated · Filtered · Empty

### SCR-PAR-07 — Partner Support
- **Route:** `/partner/support`
- **Component:** `partner/SupportPage.tsx`
- **Auth:** `['partner']`
- **Layout:** `PartnerLayout`
- **Key UI:** Same pattern as merchant support but partner-scoped
- **States:** Empty · List · Detail

---

## ADMIN PORTAL

### SCR-ADM-01 — Admin Dashboard
- **Route:** `/admin/dashboard`
- **Component:** `admin/DashboardPage.tsx`
- **Auth:** `['admin']`
- **Layout:** `AdminLayout`
- **Key UI:**
  - **Header** (dark navy): "Olsera Admin Dashboard" · "Platform Operations & Partner Management"
  - **4 stat cards** (dark navy): Total Applications · Active Partners · SLA Breaches (red accent if >0) · Total Volume
  - **Left panel — "Partner Performance":**
    - Per-partner row: logo initial · name · app count · performance badge (excellent/good/warning) · approval rate bar · avg SLA response
  - **Right panel split:**
    - Quick Actions: "View All Applications →" · "Partner Management" · "System Health"
    - SLA Alerts (amber): list of active warnings/breaches
    - System Health (dark blue): API Uptime · Avg Response Time · Active Sessions
- **States:** Loading · Live data · Alert state (SLA breaches highlighted)

### SCR-ADM-02 — Application Management
- **Route:** `/admin/applications`
- **Component:** `admin/ApplicationManagementPage.tsx`
- **Auth:** `['admin']`
- **Layout:** `AdminLayout`
- **Key UI:**
  - Title + subtitle
  - Search bar (by Application ID, Merchant Name, Partner)
  - Filter button → filter panel (status, partner, date range)
  - **4 summary stat cards:** Total · Pending · Approved · SLA Breach (red)
  - **Full data table:**
    - Columns: APPLICATION ID · MERCHANT ID · MERCHANT NAME · PARTNER · AMOUNT · STATUS · SLA TIMER · ACTION
    - Status badges: pending (yellow) · reviewing (blue) · approved (green) · rejected (grey) · sla breach (red)
    - SLA Timer: "HH:MM:SS" or "BREACH" (red bold)
    - ACTION: "View Detail"
  - Pagination (showing X to Y of Z)
- **States:** Loading · Populated · Filtered · Empty

### SCR-ADM-03 — Application Detail (Admin View)
- **Route:** `/admin/applications/:id`
- **Component:** `admin/ApplicationDetailPage.tsx`
- **Auth:** `['admin']`
- **Layout:** `AdminLayout`
- **Key UI:**
  - Back: "← Back to Application List"
  - Title: "Application Detail" · "Full application view with audit trail" · Application ID
  - **Tab bar:** Overview · Consent Log · Partner Response · Audit Trail
  - **Overview tab:**
    - Application Information grid (2-col): Merchant Name · Merchant ID · Partner · Amount (blue) · Tenor · Mitra Score (gold)
    - Status Timeline: Submitted → Partner Review → Credit Assessment → Final Decision
  - **Consent Log tab:** Consent ID, timestamp, IP, data scope
  - **Partner Response tab:** Decision, notes, decided_by, timestamp
  - **Audit Trail tab:** Full chronological change log
- **States:** Loading · Tab switching

### SCR-ADM-04 — Partner Approval Queue
- **Route:** `/admin/partners/queue`
- **Component:** `admin/PartnerQueuePage.tsx`
- **Auth:** `['admin']`
- **Layout:** `AdminLayout`
- **Key UI:**
  - Title: "Partner Approval Queue"
  - **4 stat cards:** Pending Review · SLA Warning · Approved This Month · High Risk Flags
  - Search + filter dropdowns (All Stages · All Risk Levels)
  - **Table:**
    - Columns: PARTNER · TYPE · CURRENT STAGE · PROGRESS · RISK · SLA · ACTIONS
    - TYPE badge: Fintech (purple) · Bank (blue) · Koperasi (green) · P2P (orange)
    - PROGRESS: inline progress bar + %
    - RISK: Clean (green) · Low Risk · Medium Risk · High Risk (red with ⚠)
    - SLA: hours, color-coded (green=ok, amber=warning, red=overdue)
    - ACTIONS: "Review" button (dark blue)
- **States:** Loading · Populated · Filtered · Empty

### SCR-ADM-05 — Partner Health
- **Route:** `/admin/partners/health`
- **Component:** `admin/PartnerHealthPage.tsx`
- **Auth:** `['admin']`
- **Layout:** `AdminLayout`
- **Key UI:**
  - Partner selector (tabs or dropdown)
  - Per-partner metrics: approval rate trend (line chart) · SLA compliance rate · avg decision time · breach history
  - Partner status controls: activate / suspend
- **States:** Loading · Selected partner · No data

### SCR-ADM-06 — Finance Dashboard
- **Route:** `/admin/finance`
- **Component:** `admin/FinanceDashboardPage.tsx`
- **Auth:** `['admin']`
- **Layout:** `AdminLayout`
- **Key UI:**
  - Total disbursement volume (bar chart by month)
  - Referral fee breakdown by partner
  - Revenue table
- **States:** Loading · Populated (Phase 2 feature, stub in Phase 1)

### SCR-ADM-07 — Support Dashboard
- **Route:** `/admin/support`
- **Component:** `admin/SupportDashboardPage.tsx`
- **Auth:** `['admin']`
- **Layout:** `AdminLayout`
- **Key UI:** All tickets queue (merchant + partner). Filter by type/status. Assign to agent.
- **States:** Empty · Queue · Detail

### SCR-ADM-08 — Executive Dashboard (Management)
- **Route:** `/management/dashboard`
- **Component:** `management/ExecutiveDashboardPage.tsx`
- **Auth:** `['admin', 'management']`
- **Layout:** `ManagementLayout`
- **Key UI:**
  - KPI cards: GMV · Active Merchants · Active Partners · Approval Rate · Revenue MTD
  - Trend charts (weekly/monthly toggle)
  - Top performing partners table
- **States:** Loading · Populated

---

## DATA TEAM

### SCR-DAT-01 — Data Intelligence
- **Route:** `/data/intelligence`
- **Component:** `data/DataIntelligencePage.tsx`
- **Auth:** `['admin', 'data']`
- **Layout:** `DataLayout`
- **Key UI:**
  - Mitra Score distribution histogram
  - Score tier breakdown (pie chart): Excellent/Good/Fair/Poor counts
  - Merchant cohort analysis (table: cohort by registration month, score at T, T+3, T+6)
  - Application outcome by score tier (approval rate vs score range)
  - Credit performance by business category
- **States:** Loading · Populated · Date filter applied

---

## SYSTEM

### SCR-SYS-01 — BOS Loop
- **Route:** `/system/bos-loop`
- **Component:** `system/BOSLoopPage.tsx`
- **Auth:** `['admin']`
- **Layout:** `AdminLayout`
- **Key UI:** Internal system health and event loop view. Stub screen for Phase 1.
- **States:** Placeholder

---

## SHARED COMPONENTS (Not Pages)

| Component | File | Used In |
|-----------|------|---------|
| `MitraScoreCard` | `components/shared/MitraScoreCard.tsx` | Partner app detail, Merchant dashboard |
| `PartnerCard` | `components/merchant/PartnerCard.tsx` | SCR-MER-04 |
| `ApplicationTable` | `components/shared/ApplicationTable.tsx` | Partner dashboard, Admin app mgmt |
| `SLATimer` | `components/shared/SLATimer.tsx` | Any table row with SLA |
| `StatusBadge` | `components/shared/StatusBadge.tsx` | All application tables |
| `StepperBar` | `components/shared/StepperBar.tsx` | SCR-MER-03, SCR-MER-04 |
| `StatCard` | `components/shared/StatCard.tsx` | All dashboards |
| `ProgressBar` | `components/shared/ProgressBar.tsx` | Partner queue, merchant score |
| `RupiahInput` | `components/shared/RupiahInput.tsx` | Simulation step 1 |
| `ConsentModal` | `components/merchant/ConsentModal.tsx` | SCR-MER-06 |
| `AuditTrail` | `components/shared/AuditTrail.tsx` | Admin app detail |
| `PortalLayout` | `components/layouts/` | All portals |
