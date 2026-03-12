# Data Model — Olsera Mitra Modal
**Database:** MySQL 8
**Migration runner:** `npm run db:migrate` (executes `/apps/api/src/db/migrations/` in order)
**Updated:** March 2026

---

## Global Rules

| Rule | Detail |
|------|--------|
| **Amount fields** | Always stored as `BIGINT` (integer Rupiah, no decimals). No `DECIMAL` for money. |
| **Timestamps** | All timestamps are `TIMESTAMP` columns stored in UTC. Display in WIB (UTC+7) on frontend. |
| **Soft delete** | All entities use `deleted_at TIMESTAMP NULL` — set on delete, never hard-deleted. **Exception:** merchant PII is hard-deleted on partner rejection (UU PDP). |
| **ID format** | Primary IDs are prefixed strings: `USR-`, `MER-`, `STR-`, `PTR-`, `APP-`, `CNS-`. Numeric PKs use `INT AUTO_INCREMENT`. |
| **Audit trail** | All application state changes are appended to `application_timeline` (never updated). |

---

## Entity Relationship Overview

```
users ─────────────── merchants ──── merchant_stores
  │                       │
  │ (partner user)         └────── merchant_scores
  ├── partners ─────── partner_products
  │       │              │
  │       │         sla_config
  │       │
  └───────┴──────────────────────────────────┐
                                             ▼
                                    loan_applications
                                     │    │    │
                          ┌──────────┘    │    └──────────┐
                          ▼               ▼               ▼
                 application_consents  application_timeline  partner_decisions

                 sla_breaches (linked to loan_applications + partners)
                 support_tickets (linked to users + loan_applications)
                 partner_onboarding (linked to partners)
```

---

## Tables

### 001 — `users`
Authentication credentials and role assignment.

```sql
CREATE TABLE users (
  id              VARCHAR(20)  PRIMARY KEY,              -- USR-XXXXX
  email           VARCHAR(255) UNIQUE NOT NULL,
  password_hash   VARCHAR(255) NOT NULL,                 -- bcrypt 12 rounds
  name            VARCHAR(255) NOT NULL,
  role            ENUM('merchant','partner','admin','data','management') NOT NULL,
  is_active       BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at      TIMESTAMP    NULL
);

CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_role  ON users (role);
```

**Notes:**
- One user → one role only. If a person needs multiple roles, create separate accounts.
- `deleted_at` set on user deactivation; login blocked if `is_active = FALSE` or `deleted_at IS NOT NULL`.

**Seed demo users (migration 001_seed_users.sql):**
| email | role | password |
|-------|------|----------|
| merchant@demo.com | merchant | demo123 |
| partner.mandiri@demo.com | partner | demo123 |
| admin@olsera.com | admin | admin123 |
| data@olsera.com | data | demo123 |
| coo@olsera.com | management | demo123 |

---

### 002 — `merchants`
Business profile for each merchant (UMKM/warung owner).

```sql
CREATE TABLE merchants (
  id              VARCHAR(20)  PRIMARY KEY,              -- MER-XXXXX
  user_id         VARCHAR(20)  NOT NULL UNIQUE,
  business_name   VARCHAR(255) NOT NULL,
  owner_name      VARCHAR(255),
  phone           VARCHAR(20),
  category        VARCHAR(100),                          -- retail, food, fashion, etc.
  registered_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at      TIMESTAMP    NULL,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_merchants_user_id ON merchants (user_id);
```

---

### 003 — `merchant_stores`
Individual outlet data linked to a merchant. One merchant can have 1–10 stores.

```sql
CREATE TABLE merchant_stores (
  id                 VARCHAR(20)  PRIMARY KEY,           -- STR-XXXXX
  merchant_id        VARCHAR(20)  NOT NULL,
  store_name         VARCHAR(255) NOT NULL,
  location           VARCHAR(255),
  monthly_revenue    BIGINT       NOT NULL DEFAULT 0,    -- Rupiah, integer
  status             ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at         TIMESTAMP    NULL,

  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);

CREATE INDEX idx_stores_merchant_id ON merchant_stores (merchant_id);
CREATE INDEX idx_stores_status      ON merchant_stores (status);
```

**Notes:**
- `monthly_revenue` is updated by the nightly score recalculation job from Sewarung POS data.
- Aggregated (not per-transaction) — OMM only stores summary data, not individual transactions.

---

### 004 — `merchant_scores`
Snapshot of a merchant's Mitra Score at a point in time. New row inserted nightly.

```sql
CREATE TABLE merchant_scores (
  id                      INT          PRIMARY KEY AUTO_INCREMENT,
  merchant_id             VARCHAR(20)  NOT NULL,
  mitra_score             INT          NOT NULL,         -- 300–900
  atri_score              INT,                           -- alternative model (optional)
  tier                    ENUM('excellent','good','fair','poor') NOT NULL,
  percentile              INT,                           -- 0–100, % of merchants below this score
  factor_monthly_revenue  INT          NOT NULL,         -- 0–100 raw factor score
  factor_growth_rate      INT          NOT NULL,
  factor_tx_consistency   INT          NOT NULL,
  factor_platform_tenure  INT          NOT NULL,
  factor_category_risk    INT          NOT NULL,
  calculated_at           TIMESTAMP    NOT NULL,
  created_at              TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);

CREATE INDEX idx_scores_merchant_id     ON merchant_scores (merchant_id);
CREATE INDEX idx_scores_calculated_at   ON merchant_scores (calculated_at);
```

**Score formula:**
```
mitra_score = (
  factor_monthly_revenue × 0.30 +
  factor_growth_rate     × 0.25 +
  factor_tx_consistency  × 0.20 +
  factor_platform_tenure × 0.15 +
  factor_category_risk   × 0.10
) × 9 + 300
```

**Tier thresholds:**
| Score | Tier | Label |
|-------|------|-------|
| 750–900 | excellent | Gold Tier |
| 600–749 | good | Silver Tier |
| 450–599 | fair | Bronze Tier |
| 300–449 | poor | Starter |

---

### 005 — `partners`
Lending institution profile (bank, P2P, fintech).

```sql
CREATE TABLE partners (
  id                   VARCHAR(20)  PRIMARY KEY,         -- PTR-XXXXX
  user_id              VARCHAR(20)  NOT NULL UNIQUE,
  company_name         VARCHAR(255) NOT NULL,
  partner_type         ENUM('bank','p2p','fintech','koperasi') NOT NULL,
  pic_name             VARCHAR(255),                     -- Point of Contact name
  pic_email            VARCHAR(255),
  business_license_no  VARCHAR(100),                     -- Nomor Izin OJK
  status               ENUM('pending','active','suspended','rejected') NOT NULL DEFAULT 'pending',
  is_active            BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at           TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at           TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at           TIMESTAMP    NULL,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_partners_status ON partners (status);
```

**Status lifecycle:**
```
pending (onboarding) → active (approved by admin) → suspended (SLA breach / compliance)
                     ↘ rejected (admin rejected)
```

---

### 006 — `partner_products`
Loan products configured per partner. Used by `matchingService` to determine eligibility.

```sql
CREATE TABLE partner_products (
  id                 INT          PRIMARY KEY AUTO_INCREMENT,
  partner_id         VARCHAR(20)  NOT NULL,
  product_name       VARCHAR(255) NOT NULL,
  min_amount         BIGINT       NOT NULL,              -- Rupiah, integer
  max_amount         BIGINT       NOT NULL,
  min_tenor_months   INT          NOT NULL,
  max_tenor_months   INT          NOT NULL,
  interest_rate      DECIMAL(6,4) NOT NULL,              -- e.g. 0.1250 = 12.50% p.a.
  rate_type          ENUM('flat','effective') NOT NULL,
  min_score_required INT          NOT NULL DEFAULT 300,  -- Minimum Mitra Score
  tags               JSON,                               -- ["verifikasi_app", "tanpa_agunan"]
  requirements       JSON,                               -- { minTenureMonths, requiresKTP, requiresNPWP }
  is_active          BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at         TIMESTAMP    NULL,

  FOREIGN KEY (partner_id) REFERENCES partners(id)
);

CREATE INDEX idx_products_partner_id ON partner_products (partner_id);
CREATE INDEX idx_products_is_active  ON partner_products (is_active);
```

**Matching logic fields:**
- `min_amount` ≤ requested amount ≤ `max_amount`
- `min_tenor_months` ≤ requested tenor ≤ `max_tenor_months`
- `min_score_required` ≤ merchant's current Mitra Score

---

### 007 — `partner_onboarding`
Tracks partner through the multi-stage approval pipeline (admin-managed).

```sql
CREATE TABLE partner_onboarding (
  id               INT          PRIMARY KEY AUTO_INCREMENT,
  partner_id       VARCHAR(20)  NOT NULL UNIQUE,
  current_stage    VARCHAR(100) NOT NULL,                -- 'document_submission', 'legal_review', 'api_security_review', 'final_approval'
  progress_pct     INT          NOT NULL DEFAULT 0,      -- 0–100
  risk_level       ENUM('clean','low','medium','high') NOT NULL DEFAULT 'clean',
  sla_deadline_at  TIMESTAMP    NULL,
  is_sla_breached  BOOLEAN      NOT NULL DEFAULT FALSE,
  notes            TEXT,
  reviewed_by      VARCHAR(20)  NULL,                    -- admin user id
  created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (partner_id)   REFERENCES partners(id),
  FOREIGN KEY (reviewed_by)  REFERENCES users(id)
);
```

**Onboarding stages (in order):**
1. `document_submission` — company docs, OJK license
2. `legal_review` — legal team review
3. `api_security_review` — tech security assessment
4. `commercial_agreement` — contract signing
5. `final_approval` — admin activates partner

---

### 008 — `loan_applications`
Central record linking merchant → partner for each loan request.

```sql
CREATE TABLE loan_applications (
  id                    VARCHAR(20)  PRIMARY KEY,        -- APP-XXXXX
  merchant_id           VARCHAR(20)  NOT NULL,
  partner_id            VARCHAR(20)  NOT NULL,
  partner_product_id    INT          NULL,               -- NULL if product matched by engine, not selected by merchant
  amount                BIGINT       NOT NULL,           -- Rupiah, integer
  tenor_months          INT          NOT NULL,
  mitra_score_at_apply  INT          NOT NULL,           -- snapshot at time of application
  status                ENUM(
                          'pending',
                          'reviewing',
                          'approved',
                          'rejected',
                          'sla_breach'
                        ) NOT NULL DEFAULT 'pending',
  submitted_at          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at            TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at            TIMESTAMP    NULL,

  FOREIGN KEY (merchant_id)        REFERENCES merchants(id),
  FOREIGN KEY (partner_id)         REFERENCES partners(id),
  FOREIGN KEY (partner_product_id) REFERENCES partner_products(id)
);

CREATE INDEX idx_applications_merchant_id ON loan_applications (merchant_id);
CREATE INDEX idx_applications_partner_id  ON loan_applications (partner_id);
CREATE INDEX idx_applications_status      ON loan_applications (status);
CREATE INDEX idx_applications_submitted   ON loan_applications (submitted_at);
```

**Status lifecycle:**
```
pending → reviewing → approved
       ↘             ↘ rejected  (triggers PII deletion)
        sla_breach    (set by cron job if Redis TTL expires)
```

**Duplicate prevention:**
- Unique constraint not enforced at DB level (allow reapplication after rejection)
- Business rule: `DUPLICATE_APPLICATION` error if merchant has `status IN ('pending','reviewing')` with the same partner

---

### 009 — `application_consents`
UU PDP compliance record. Explicit consent proof for every data-sharing event.

```sql
CREATE TABLE application_consents (
  id              VARCHAR(20)  PRIMARY KEY,              -- CNS-XXXXX
  merchant_id     VARCHAR(20)  NOT NULL,
  partner_id      VARCHAR(20)  NOT NULL,
  application_id  VARCHAR(20)  NULL,                     -- set after application is created
  data_scope      JSON         NOT NULL,                 -- ["transaction_history", "monthly_revenue", "business_category", "platform_tenure", "mitra_score"]
  consented_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ip_address      VARCHAR(45),                           -- IPv4 or IPv6
  expires_at      TIMESTAMP    NOT NULL,                 -- default: consented_at + 30 days
  is_revoked      BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (merchant_id)    REFERENCES merchants(id),
  FOREIGN KEY (partner_id)     REFERENCES partners(id),
  FOREIGN KEY (application_id) REFERENCES loan_applications(id)
);

CREATE INDEX idx_consents_merchant_id    ON application_consents (merchant_id);
CREATE INDEX idx_consents_application_id ON application_consents (application_id);
```

**Rules:**
- Consent must be created BEFORE application submission (`consentId` passed to `POST /merchant/applications`)
- Expired or revoked consent → 403 on partner data access
- On partner rejection: `is_revoked = TRUE` + merchant PII deleted from partner-visible views

---

### 010 — `application_timeline`
Append-only event log. Never updated — only INSERT.

```sql
CREATE TABLE application_timeline (
  id              INT          PRIMARY KEY AUTO_INCREMENT,
  application_id  VARCHAR(20)  NOT NULL,
  stage           VARCHAR(100) NOT NULL,                 -- 'submitted', 'partner_review', 'credit_assessment', 'final_decision'
  status          ENUM('pending','in_progress','done') NOT NULL,
  notes           TEXT         NULL,
  actor           VARCHAR(100) NOT NULL,                 -- 'merchant:MER-XXX', 'partner:PTR-XXX', 'system'
  timestamp       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (application_id) REFERENCES loan_applications(id)
);

CREATE INDEX idx_timeline_application_id ON application_timeline (application_id);
CREATE INDEX idx_timeline_timestamp      ON application_timeline (timestamp);
```

**Standard stage sequence:**
| Stage | Actor | Triggered by |
|-------|-------|-------------|
| `submitted` | `merchant:MER-XXX` | POST /merchant/applications |
| `partner_review` | `system` | SLA timer start |
| `credit_assessment` | `partner:PTR-XXX` | Partner views application |
| `final_decision` | `partner:PTR-XXX` | POST /partner/applications/:id/decision |

---

### 011 — `partner_decisions`
One decision record per application (enforced by UNIQUE on `application_id`).

```sql
CREATE TABLE partner_decisions (
  id                INT          PRIMARY KEY AUTO_INCREMENT,
  application_id    VARCHAR(20)  NOT NULL UNIQUE,
  partner_id        VARCHAR(20)  NOT NULL,
  decision          ENUM('approved','rejected') NOT NULL,
  notes             TEXT,
  rejection_reason  VARCHAR(100) NULL,                   -- 'INSUFFICIENT_TENURE', 'SCORE_TOO_LOW', 'BUSINESS_RISK', etc.
  decided_by        VARCHAR(255) NOT NULL,               -- free text: "Credit Officer — Bank Mandiri"
  decided_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (application_id) REFERENCES loan_applications(id),
  FOREIGN KEY (partner_id)     REFERENCES partners(id)
);
```

**On rejection — UU PDP data deletion:**
```sql
-- Hard delete of merchant PII from partner-accessible views
-- Triggered in partnerDecisionService after INSERT to partner_decisions

UPDATE application_consents
SET is_revoked = TRUE
WHERE application_id = ?;

-- Null out merchant-identifying fields in the application record
-- (implementation detail: may use a separate merchant_data_deletions log)
```

---

### 012 — `sla_config`
Per-partner SLA configuration. One row per partner.

```sql
CREATE TABLE sla_config (
  id                      INT          PRIMARY KEY AUTO_INCREMENT,
  partner_id              VARCHAR(20)  NOT NULL UNIQUE,
  review_hours            INT          NOT NULL DEFAULT 2,    -- hours to first review
  decision_hours          INT          NOT NULL DEFAULT 24,   -- total hours to final decision
  warning_threshold_pct   INT          NOT NULL DEFAULT 80,   -- warn at 80% of SLA consumed
  created_at              TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at              TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (partner_id) REFERENCES partners(id)
);
```

**Redis key pattern:**
```
sla:app:{applicationId}
TTL = decision_hours × 3600 seconds
Value = "" (empty, only TTL matters)
```

---

### 013 — `sla_breaches`
Recorded when Redis TTL expires before partner decision. Queried for admin alerts.

```sql
CREATE TABLE sla_breaches (
  id                INT          PRIMARY KEY AUTO_INCREMENT,
  application_id    VARCHAR(20)  NOT NULL,
  partner_id        VARCHAR(20)  NOT NULL,
  breach_type       ENUM('review','decision') NOT NULL DEFAULT 'decision',
  hours_overdue     DECIMAL(5,2) NOT NULL,               -- how many hours past SLA
  sla_target_hours  INT          NOT NULL,               -- what the SLA was set to
  breached_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  resolved_at       TIMESTAMP    NULL,
  is_resolved       BOOLEAN      NOT NULL DEFAULT FALSE,

  FOREIGN KEY (application_id) REFERENCES loan_applications(id),
  FOREIGN KEY (partner_id)     REFERENCES partners(id)
);

CREATE INDEX idx_breaches_partner_id   ON sla_breaches (partner_id);
CREATE INDEX idx_breaches_is_resolved  ON sla_breaches (is_resolved);
CREATE INDEX idx_breaches_breached_at  ON sla_breaches (breached_at);
```

---

### 014 — `support_tickets`
CS ticket system for merchant and partner issues.

```sql
CREATE TABLE support_tickets (
  id              INT          PRIMARY KEY AUTO_INCREMENT,
  ticket_ref      VARCHAR(20)  NOT NULL UNIQUE,          -- TKT-XXXXX
  created_by      VARCHAR(20)  NOT NULL,                 -- user id (merchant or partner user)
  creator_role    ENUM('merchant','partner') NOT NULL,
  application_id  VARCHAR(20)  NULL,                     -- linked application if relevant
  subject         VARCHAR(500) NOT NULL,
  description     TEXT         NOT NULL,
  status          ENUM('open','in_progress','resolved','closed') NOT NULL DEFAULT 'open',
  assigned_to     VARCHAR(20)  NULL,                     -- admin user id
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  resolved_at     TIMESTAMP    NULL,

  FOREIGN KEY (created_by)     REFERENCES users(id),
  FOREIGN KEY (assigned_to)    REFERENCES users(id),
  FOREIGN KEY (application_id) REFERENCES loan_applications(id)
);

CREATE INDEX idx_tickets_created_by ON support_tickets (created_by);
CREATE INDEX idx_tickets_status     ON support_tickets (status);
```

---

## Migration File Order

Run in this exact order via `npm run db:migrate`:

| File | Creates |
|------|---------|
| `001_create_users.sql` | `users` |
| `002_create_merchants.sql` | `merchants`, `merchant_stores`, `merchant_scores` |
| `003_create_partners.sql` | `partners`, `partner_products`, `partner_onboarding` |
| `004_create_applications.sql` | `loan_applications`, `application_consents`, `application_timeline`, `partner_decisions` |
| `005_create_sla.sql` | `sla_config`, `sla_breaches` |
| `006_create_support.sql` | `support_tickets` |

---

## Seed Data Summary

| Seed file | Contents |
|-----------|----------|
| `001_seed_users.sql` | 5 demo accounts (one per role) |
| `002_seed_merchants.sql` | 10 merchants, 2–3 stores each, 12-month simulated revenue |
| `003_seed_partners.sql` | Bank Mandiri, BCA Finance, Modalku, Amartha, Kredivo, GoTyme, Adapundi, OCBC KTA Cashbiz |
| `004_seed_products.sql` | 1–2 products per partner with varying rates/limits |
| `005_seed_sla_config.sql` | SLA config per demo partner |
| `006_seed_scores.sql` | Scores for all 10 merchants (representing all 4 tiers) |
| `007_seed_applications.sql` | 15–20 applications in mixed statuses |
| `008_seed_onboarding.sql` | 4 partners in onboarding queue at different stages |
