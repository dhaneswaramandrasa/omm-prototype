# API List — Olsera Mitra Modal
**Base URL:** `/api/v1`  
**Auth:** Bearer JWT in `Authorization` header (except public endpoints)  
**Format:** All requests/responses `Content-Type: application/json`

---

## Response Envelope

All responses use this wrapper:
```json
{
  "success": true,
  "data": {},
  "meta": { "page": 1, "limit": 20, "total": 100 },
  "error": null
}
```

Error response:
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Amount must be between 1000000 and 500000000",
    "details": []
  }
}
```

**Amount fields:** Always integer (Rupiah, no decimals)  
**Dates:** ISO 8601 strings (`"2026-03-08T10:30:00Z"`)  
**IDs:** Strings (prefixed: `APP-`, `MER-`, `PTR-`, `CNS-`)

---

## AUTH

### POST `/auth/login`
Authenticate user, return tokens.

**Request:**
```json
{
  "email": "merchant@demo.com",
  "password": "demo123"
}
```

**Response:**
```json
{
  "data": {
    "accessToken": "eyJ...",
    "user": {
      "id": "USR-001",
      "email": "merchant@demo.com",
      "role": "merchant",
      "name": "Toko Sejahtera"
    }
  }
}
```
*Refresh token set as `httpOnly` cookie `refreshToken`.*  
**Errors:** `INVALID_CREDENTIALS` (401) · `ACCOUNT_SUSPENDED` (403)

---

### POST `/auth/refresh`
Exchange refresh token for new access token.

**Request:** No body (reads `refreshToken` cookie)  
**Response:** `{ "data": { "accessToken": "eyJ..." } }`  
**Errors:** `INVALID_REFRESH_TOKEN` (401) · `REFRESH_TOKEN_EXPIRED` (401)

---

### POST `/auth/logout`
Revoke refresh token.

**Request:** No body  
**Response:** `{ "data": { "message": "Logged out" } }`

---

## MERCHANT

### GET `/merchant/profile`
Get merchant's business profile.

**Auth:** `merchant`  
**Response:**
```json
{
  "data": {
    "merchantId": "MER-45821",
    "merchantCode": "MER-45821",
    "businessName": "Toko Sejahtera",
    "ownerName": "Budi Santoso",
    "phone": "08123456789",
    "category": "retail",
    "registeredAt": "2024-09-01T00:00:00Z",
    "stores": [
      {
        "id": "STR-001",
        "storeName": "Toko Sejahtera Pusat",
        "location": "Jakarta Pusat",
        "monthlyRevenue": 450000000,
        "status": "active"
      }
    ]
  }
}
```

---

### GET `/merchant/score`
Get merchant's current Mitra/ATRI score.

**Auth:** `merchant`  
**Response:**
```json
{
  "data": {
    "mitraScore": 850,
    "atriScore": 742,
    "tier": "excellent",
    "tierLabel": "Gold Tier",
    "percentile": 78,
    "maxScore": 900,
    "delta": 24,
    "calculatedAt": "2026-03-08T00:00:00Z",
    "factors": {
      "monthlyRevenue": { "score": 85, "weight": 0.30 },
      "growthRate": { "score": 90, "weight": 0.25 },
      "transactionConsistency": { "score": 78, "weight": 0.20 },
      "tenureOnPlatform": { "score": 70, "weight": 0.15 },
      "categoryRisk": { "score": 80, "weight": 0.10 }
    }
  }
}
```

---

### GET `/merchant/simulate`
Get list of eligible partners for given amount and tenor.

**Auth:** `merchant`  
**Query params:** `amount` (integer, required) · `tenor` (integer months, required)

**Response:**
```json
{
  "data": {
    "amount": 50000000,
    "tenor": 12,
    "merchantScore": 850,
    "eligible": [
      {
        "partnerId": "PTR-001",
        "partnerName": "Bank Mandiri",
        "partnerType": "bank",
        "interestRate": 0.125,
        "rateType": "effective",
        "minTenor": 6,
        "maxTenor": 36,
        "tags": ["verifikasi_app"],
        "estimatedMonthlyInstallment": 4712500,
        "minScore": 700
      }
    ],
    "ineligible": [
      {
        "partnerId": "PTR-005",
        "partnerName": "Kredivo",
        "partnerType": "fintech",
        "reason": "TENOR_OUT_OF_RANGE",
        "reasonLabel": "Tenor yang dipilih (12 bulan) tidak sesuai dengan range 3-6 bulan"
      }
    ]
  }
}
```

**Errors:** `INVALID_AMOUNT` · `INVALID_TENOR` · `SCORE_TOO_LOW`

---

### POST `/merchant/applications`
Submit a new loan application.

**Auth:** `merchant`  
**Request:**
```json
{
  "partnerId": "PTR-001",
  "amount": 50000000,
  "tenorMonths": 12,
  "consentId": "CNS-24681357"
}
```

**Response:**
```json
{
  "data": {
    "applicationId": "APP-94725183",
    "status": "pending",
    "submittedAt": "2026-03-08T10:30:00Z",
    "partnerName": "Bank Mandiri",
    "expectedResponseHours": 2
  }
}
```

**Errors:** `CONSENT_REQUIRED` · `PARTNER_NOT_FOUND` · `AMOUNT_EXCEEDS_LIMIT` · `DUPLICATE_APPLICATION`

---

### GET `/merchant/applications`
List merchant's applications.

**Auth:** `merchant`  
**Query params:** `status` (optional) · `page` · `limit`

**Response:**
```json
{
  "data": [
    {
      "applicationId": "APP-94725183",
      "partnerName": "Bank Mandiri",
      "amount": 50000000,
      "tenorMonths": 12,
      "status": "reviewing",
      "submittedAt": "2026-03-08T10:30:00Z",
      "lastUpdated": "2026-03-08T11:00:00Z"
    }
  ],
  "meta": { "page": 1, "limit": 20, "total": 3 }
}
```

---

### GET `/merchant/applications/:id`
Get application detail with timeline.

**Auth:** `merchant` (must own application)  
**Response:**
```json
{
  "data": {
    "applicationId": "APP-94725183",
    "partnerName": "Bank Mandiri",
    "amount": 50000000,
    "tenorMonths": 12,
    "mitraScoreAtApply": 850,
    "status": "reviewing",
    "submittedAt": "2026-03-08T10:30:00Z",
    "timeline": [
      { "stage": "submitted", "status": "done", "timestamp": "2026-03-08T10:30:00Z" },
      { "stage": "partner_review", "status": "done", "timestamp": "2026-03-08T10:45:00Z" },
      { "stage": "credit_assessment", "status": "in_progress", "timestamp": null },
      { "stage": "final_decision", "status": "pending", "timestamp": null }
    ],
    "decision": null
  }
}
```

---

### POST `/merchant/consent`
Record explicit data sharing consent (must be called before application submit).

**Auth:** `merchant`  
**Request:**
```json
{
  "partnerId": "PTR-001",
  "dataScope": ["transaction_history", "monthly_revenue", "business_category", "platform_tenure", "mitra_score"]
}
```

**Response:**
```json
{
  "data": {
    "consentId": "CNS-24681357",
    "partnerId": "PTR-001",
    "partnerName": "Bank Mandiri",
    "dataScope": ["transaction_history", "monthly_revenue", "business_category", "platform_tenure", "mitra_score"],
    "consentedAt": "2026-03-08T10:29:00Z",
    "ipAddress": "103.x.x.x",
    "expiresAt": "2026-04-08T10:29:00Z"
  }
}
```

---

## PARTNER

### GET `/partner/dashboard/stats`
Get partner's dashboard summary statistics.

**Auth:** `partner`  
**Response:**
```json
{
  "data": {
    "totalApplications": 2847,
    "totalApplicationsDelta": 12.5,
    "pendingReview": 43,
    "approvedRate": 0.68,
    "approvedRateDelta": 3.2,
    "totalDisbursed": 4200000000,
    "totalDisbursedDelta": 8.7
  }
}
```

---

### GET `/partner/applications`
Get paginated applications assigned to this partner.

**Auth:** `partner`  
**Query params:** `status` (pending|reviewing|approved|rejected|all) · `page` · `limit` · `sortBy` · `sortDir`

**Response:**
```json
{
  "data": [
    {
      "applicationId": "APP-94725183",
      "merchantName": "Toko Sejahtera",
      "merchantId": "MER-45821",
      "mitraScore": 850,
      "mitraTier": "excellent",
      "amount": 50000000,
      "tenorMonths": 12,
      "status": "pending",
      "slaRemainingSeconds": 5025,
      "submittedAt": "2026-03-08T10:30:00Z"
    }
  ],
  "meta": { "page": 1, "limit": 20, "total": 43 }
}
```

---

### GET `/partner/applications/:id`
Get full application detail including merchant data (only if consent exists).

**Auth:** `partner` (must be assigned partner)  
**Response:**
```json
{
  "data": {
    "applicationId": "APP-94725183",
    "merchantId": "MER-45821",
    "merchantName": "Toko Sejahtera",
    "amount": 50000000,
    "tenorMonths": 12,
    "mitraScore": 850,
    "mitraTier": "excellent",
    "status": "pending",
    "submittedAt": "2026-03-08T10:30:00Z",
    "merchantData": {
      "monthlyRevenue": 125000000,
      "growthRate": 0.185,
      "avgTransactionValue": 87500,
      "monthlyTransactionVolume": 1428,
      "platformTenureMonths": 18,
      "peakSalesDay": "friday",
      "topCategories": ["elektronik", "fashion", "makanan"]
    },
    "consentProof": {
      "consentId": "CNS-24681357",
      "consentedAt": "2026-03-08T10:29:00Z"
    },
    "slaRemainingSeconds": 5025,
    "decision": null
  }
}
```

**Errors:** `APPLICATION_NOT_FOUND` · `NO_CONSENT` (403 — cannot access without consent) · `NOT_ASSIGNED_PARTNER`

---

### POST `/partner/applications/:id/decision`
Submit approve or reject decision.

**Auth:** `partner`  
**Request:**
```json
{
  "decision": "approved",
  "notes": "Approved based on strong revenue trend and consistent transaction history."
}
```
*For rejection:*
```json
{
  "decision": "rejected",
  "notes": "Insufficient tenure on platform.",
  "rejectionReason": "INSUFFICIENT_TENURE"
}
```

**Response:**
```json
{
  "data": {
    "applicationId": "APP-94725183",
    "decision": "approved",
    "decidedAt": "2026-03-08T11:45:00Z",
    "notes": "Approved based on strong revenue trend..."
  }
}
```

*Side effect on rejection: triggers `deletePartnerAccessibleData(applicationId)` — removes merchant PII from partner-readable records.*

**Errors:** `ALREADY_DECIDED` · `APPLICATION_NOT_FOUND`

---

### GET `/partner/products`
List partner's loan products.

**Auth:** `partner`  
**Response:** Array of product objects with rates, limits, tenor ranges.

---

### POST `/partner/products`
Create a new loan product.

**Auth:** `partner`  
**Request:**
```json
{
  "productName": "KTA UMKM Express",
  "minAmount": 5000000,
  "maxAmount": 200000000,
  "minTenorMonths": 6,
  "maxTenorMonths": 36,
  "interestRate": 0.125,
  "rateType": "effective",
  "minScoreRequired": 650,
  "tags": ["verifikasi_app"],
  "requirements": {
    "minTenureMonths": 6,
    "requiresKTP": true,
    "requiresNPWP": false
  }
}
```

---

### PUT `/partner/products/:id`
Update existing loan product.

**Auth:** `partner`

---

### DELETE `/partner/products/:id`
Deactivate a loan product (soft delete).

**Auth:** `partner`

---

### POST `/partner/register`
Submit partner registration request.

**Auth:** Public  
**Request:** Company name, contact, type, business license number, PIC details.

---

## ADMIN

### GET `/admin/dashboard/stats`
Platform-wide statistics for admin dashboard.

**Auth:** `admin`  
**Response:**
```json
{
  "data": {
    "totalApplications": 12847,
    "totalApplicationsDelta": 15.3,
    "activePartners": 24,
    "activePartnersDelta": 2,
    "slaBreaches": 3,
    "slaBreachesDelta": -8,
    "totalVolume": 142000000000,
    "totalVolumeDelta": 22.1,
    "partnerPerformance": [
      {
        "partnerId": "PTR-001",
        "partnerName": "Bank Mandiri",
        "applicationCount": 3248,
        "approvalRate": 0.68,
        "avgSlaResponseHours": 2.1,
        "healthStatus": "excellent"
      }
    ],
    "slaAlerts": [
      {
        "partnerId": "PTR-005",
        "partnerName": "Kredivo",
        "alertType": "high_response_time",
        "avgResponseHours": 4.5,
        "targetHours": 2.0
      }
    ],
    "systemHealth": {
      "apiUptimePct": 99.98,
      "avgResponseMs": 124,
      "activeSessions": 1247
    }
  }
}
```

---

### GET `/admin/applications`
All applications across all partners.

**Auth:** `admin`  
**Query params:** `status` · `partnerId` · `merchantId` · `dateFrom` · `dateTo` · `page` · `limit` · `search` (searches APP ID + merchant name)

**Response:**
```json
{
  "data": [
    {
      "applicationId": "APP-94725183",
      "merchantId": "MER-45821",
      "merchantName": "Toko Sejahtera",
      "partnerName": "Bank Mandiri",
      "amount": 50000000,
      "status": "pending",
      "slaRemainingSeconds": 5025,
      "isSlaBreach": false,
      "submittedAt": "2026-03-08T10:30:00Z"
    }
  ],
  "meta": { "page": 1, "limit": 20, "total": 12847 }
}
```

---

### GET `/admin/applications/:id`
Full application detail for admin (includes all tabs data).

**Auth:** `admin`  
**Response:** Same as partner detail PLUS:
```json
{
  "consentLog": {
    "consentId": "CNS-24681357",
    "dataScope": ["..."],
    "consentedAt": "...",
    "ipAddress": "103.x.x.x"
  },
  "partnerResponse": {
    "decision": "approved",
    "notes": "...",
    "decidedBy": "Credit Officer — Bank Mandiri",
    "decidedAt": "..."
  },
  "auditTrail": [
    { "action": "APPLICATION_SUBMITTED", "actor": "merchant:MER-45821", "timestamp": "..." },
    { "action": "PARTNER_REVIEW_STARTED", "actor": "system", "timestamp": "..." },
    { "action": "DECISION_APPROVED", "actor": "partner:PTR-001", "timestamp": "..." }
  ]
}
```

---

### GET `/admin/partners/queue`
List partners in onboarding queue.

**Auth:** `admin`  
**Query params:** `stage` · `riskLevel` · `search` · `page` · `limit`

**Response:**
```json
{
  "data": [
    {
      "partnerId": "PTR-NEW-001",
      "companyName": "PT. Finansial Digital Nusantara",
      "pic": "Ahmad Rizki",
      "type": "fintech",
      "currentStage": "api_security_review",
      "progressPct": 45,
      "riskLevel": "clean",
      "slaRemainingHours": 16,
      "isSlaBreached": false,
      "submittedAt": "2026-01-10T00:00:00Z"
    }
  ]
}
```

---

### GET `/admin/partners/queue/:id`
Full detail of a partner application in queue.

**Auth:** `admin`

---

### PUT `/admin/partners/queue/:id/approve`
Approve partner to proceed to next onboarding stage (or fully activate).

**Auth:** `admin`  
**Request:** `{ "stage": "legal_docs", "notes": "Documents verified." }`

---

### PUT `/admin/partners/queue/:id/reject`
Reject partner application.

**Auth:** `admin`  
**Request:** `{ "reason": "COMPLIANCE_ISSUE", "notes": "OJK license not valid." }`

---

### GET `/admin/partners/health`
Detailed per-partner performance metrics.

**Auth:** `admin`  
**Query params:** `partnerId` (required) · `dateFrom` · `dateTo`

**Response:** Approval rate trend data, SLA compliance rate, avg decision time, breach history.

---

### GET `/admin/sla/alerts`
Current active SLA alerts (breach + warnings).

**Auth:** `admin`  
**Response:**
```json
{
  "data": {
    "breaches": [
      {
        "applicationId": "APP-94725178",
        "partnerName": "Amartha",
        "hoursOverdue": 5.2,
        "slaTargetHours": 24
      }
    ],
    "warnings": [
      {
        "partnerId": "PTR-005",
        "partnerName": "Kredivo",
        "avgResponseHours": 4.5,
        "targetHours": 2.0,
        "affectedApplications": 12
      }
    ]
  }
}
```

---

### GET `/admin/finance/summary`
Financial summary for admin/management.

**Auth:** `admin`, `management`  
**Response:** Monthly disbursement volumes, referral fee calculations, revenue by partner.

---

## DATA TEAM

### GET `/data/intelligence/score-distribution`
Mitra Score distribution across all active merchants.

**Auth:** `admin`, `data`  
**Response:** Histogram bins (score range → count), tier breakdown.

---

### GET `/data/intelligence/cohorts`
Merchant cohort analysis.

**Auth:** `admin`, `data`  
**Query params:** `cohortMonth` (YYYY-MM)  
**Response:** Score progression at T, T+3, T+6, T+12 months.

---

### GET `/data/intelligence/credit-performance`
Application outcome analysis by score tier and business category.

**Auth:** `admin`, `data`  
**Response:** Approval rate by score tier, by partner, by category.

---

## MANAGEMENT

### GET `/management/dashboard`
Executive KPI summary.

**Auth:** `admin`, `management`  
**Response:**
```json
{
  "data": {
    "gmvTotal": 142000000000,
    "gmvDeltaPct": 22.1,
    "activeMerchants": 12847,
    "activeMerchantsDelta": 15.3,
    "activePartners": 24,
    "overallApprovalRate": 0.64,
    "revenueMTD": 284000000,
    "topPartners": [],
    "weeklyTrend": []
  }
}
```

---

## INTERNAL / SYSTEM

### POST `/internal/scores/recalculate`
Trigger nightly score recalculation (cron job endpoint).

**Auth:** Internal API key (not JWT)  
**Request:** `{ "batchSize": 100, "dryRun": false }`

---

### GET `/internal/sla/check`
Trigger SLA check (cron job, every 5 min).

**Auth:** Internal API key

---

### GET `/health`
System health check.

**Auth:** Public  
**Response:** `{ "status": "ok", "uptime": 12345, "version": "1.0.0" }`

---

## HTTP Status Codes Used

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (no/invalid token) |
| 403 | Forbidden (wrong role or consent missing) |
| 404 | Not Found |
| 409 | Conflict (e.g. duplicate application) |
| 422 | Unprocessable Entity (business rule violation) |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

---

## Error Codes Reference

| Code | HTTP | Description |
|------|------|-------------|
| `INVALID_CREDENTIALS` | 401 | Wrong email or password |
| `TOKEN_EXPIRED` | 401 | Access token expired |
| `INSUFFICIENT_ROLE` | 403 | User role not authorized for this endpoint |
| `NO_CONSENT` | 403 | Partner attempted to access merchant data without valid consent |
| `NOT_ASSIGNED_PARTNER` | 403 | Partner tried to view application not routed to them |
| `CONSENT_REQUIRED` | 422 | Application submitted without prior consent |
| `DUPLICATE_APPLICATION` | 409 | Merchant already has active application with same partner |
| `AMOUNT_OUT_OF_RANGE` | 400 | Amount below/above product limits |
| `TENOR_OUT_OF_RANGE` | 400 | Tenor not within product range |
| `SCORE_TOO_LOW` | 422 | Merchant score below partner's minimum |
| `ALREADY_DECIDED` | 409 | Partner tried to decide on already-decided application |
| `PARTNER_NOT_ACTIVE` | 422 | Partner not yet fully onboarded |
