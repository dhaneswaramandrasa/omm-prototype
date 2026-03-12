---
name: code-review
description: >
  Reviews staged or recently changed code in the Olsera Mitra Modal project for correctness,
  security, and adherence to project standards. Use this skill whenever the user says things
  like "review this", "check my code", "review my changes", "can you review", "is this correct",
  "does this look right", "check this file", "review before I commit", or "give me feedback on
  this code". Also trigger when the user asks about code quality, asks if something follows
  patterns, or shares a file and asks for thoughts. This skill understands OMM-specific rules
  that a generic review would miss — always prefer it over a generic code review.
---

# Olsera Mitra Modal — Code Review

You are reviewing code for **Olsera Mitra Modal**, a multi-lender financial aggregator. The review should be thorough but practical — flag real issues, not nitpicks.

## What to review

If the user hasn't specified files, run `git diff --staged` or `git diff HEAD` to find what's changed. If nothing is staged, ask the user which file(s) to review.

Read every changed file before writing any feedback.

---

## Review Checklist

Work through these categories. Only report items that actually apply — don't list "N/A" entries.

### 1. Critical Business Rules ❗

These are non-negotiable. A violation here is an immediate ❌.

- **No credit decisions in Olsera code.** Any approve/reject logic for loan applications must live in partner institution code, never in `apps/api/`. Flag any function that sets `status = 'approved'` or `status = 'rejected'` based on merchant data unless it's explicitly delegating to a partner endpoint.
- **Consent gate before partner data share.** Any code that sends merchant data to a partner must first check `application_consents` table. Look for calls to partner endpoints or services — if there's no consent check upstream, flag it.
- **Hard delete PII on partner rejection.** When a partner rejects an application, `deletePartnerAccessibleData(appId)` in `services/applicationService.ts` must be called. If rejection logic exists without this call, flag it.
- **No raw transaction records to partners.** Partners must only receive aggregated metrics (averages, totals, counts), never individual transaction rows. Look for queries or serializers that include transaction-level data in partner-facing responses.

### 2. TypeScript & Type Safety

- No `any` type — if a type is genuinely unknown, use `unknown` and narrow it properly
- Use `interface` for object shapes; `type` for unions, intersections, and aliases
- All API response types should live in `packages/shared/types/` — flag inline type definitions that belong there
- Strict null handling — no unchecked property access on potentially undefined values

### 3. API Response Format

Every API response must use the envelope: `{ success: boolean, data?: T, meta?: object, error?: { code: string, message: string } }`

Flag responses that:
- Return raw objects at the top level (e.g., `res.json(user)`)
- Return errors without a `code` field
- Mix `data` and `error` in the same response body

### 4. Controller / Service Separation

- Controllers should only: parse and validate request → call service → return response. No business logic.
- Services should contain all business logic and must not import `req`, `res`, or `next` from Express.
- If a controller contains conditional logic beyond routing concerns, or a service imports request/response types, flag it.

### 5. Input Validation

- Zod schemas must be defined and called **before** any business logic in API handlers.
- Validation errors should be caught and returned as `400` with the envelope error format.
- Flag handlers that read `req.body` fields without a Zod parse step.

### 6. React Component Completeness

Every React component that fetches data or can be in a loading/empty/error state must handle all three:
- **Loading** — skeleton or spinner shown while data is fetching
- **Empty** — meaningful empty state (not just `undefined` rendered silently)
- **Error** — error message or retry option shown when the request fails

Flag components using React Query that don't destructure `isLoading`, `isError`, or handle the `data === undefined` case.

### 7. Indonesian Formatting

When displaying currency, dates, percentages, or countdown timers to users, the helpers from `packages/shared/utils/format.ts` must be used:
- Currency → `formatRupiah()` or `formatRupiahShort()`
- Date → `formatDate()`
- Percent → `formatPercent()`
- Timer → `formatTimer()`

Flag raw calls to `Intl`, `toLocaleString`, or manual string concatenation for these values.

### 8. Security

- No unsanitised user input passed to SQL queries (parameterized queries only)
- No PII (names, phone numbers, KTP numbers, addresses) logged to console or included in error responses
- JWT payload must only contain `{ userId, role, merchantId?, partnerId? }` — no sensitive fields
- No hardcoded credentials or API keys in source files (check for obvious patterns like `= "sk-"`, `= "Bearer "` with a literal token)
- For partner-facing endpoints, verify the request's JWT `role` is `'partner'` before returning any data

### 9. File Naming

| Location | Expected convention | Example |
|----------|-------------------|---------|
| `pages/` | PascalCase | `DashboardPage.tsx` |
| `components/` | PascalCase | `MitraScoreCard.tsx` |
| `hooks/` | camelCase, prefix `use` | `useApplicationStatus.ts` |
| `services/` | camelCase | `applicationService.ts` |
| `routes/` | kebab-case | `partner-applications.ts` |
| `utils/` | camelCase | `formatRupiah.ts` |
| `types/` | PascalCase | `Application.ts` |

Flag files that don't follow the convention for their directory.

---

## Output Format

Structure your review exactly like this:

```
## Code Review — [filename(s) or "Staged Changes"]

### ✅ Good
- [What's done well — specific, not generic praise]

### ⚠️ Warnings
- [Things to improve that won't break anything today but will cause problems later]
- [Deviations from convention that make the codebase harder to maintain]

### ❌ Issues
- [Bugs, security holes, or business rule violations that need fixing before merge]
- For each issue: state the file + line, what the problem is, and a concrete fix]

### Summary
[One or two sentences. Is this ready to merge, or what's the most important thing to fix first?]
```

If everything looks good across all categories, say so directly — don't pad the review with imaginary concerns. A clean file deserves a short review.
