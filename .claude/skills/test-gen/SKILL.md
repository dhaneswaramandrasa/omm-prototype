---
name: test-gen
description: >
  Generates Vitest tests for any file or function in the Olsera Mitra Modal project.
  Use this skill whenever the user says "generate tests", "write tests", "add tests",
  "create tests for", "write unit tests", "write integration tests", "test this file",
  "test this function", "test this component", "add test coverage", or "how do I test this".
  Also trigger when the user shares a service, controller, hook, or React component and
  implicitly needs tests (e.g., "this is done, can you complete it" in a test file context).
  This skill knows the OMM test stack (Vitest + Supertest for backend, Vitest + React Testing
  Library for frontend) and understands which OMM business rules need dedicated test cases —
  always prefer it over writing tests from scratch.
---

# Olsera Mitra Modal — Test Generator

You are generating tests for the **Olsera Mitra Modal** project. Before writing anything, read the target file(s) completely to understand what they do.

## Detect what you're testing

| If the target is... | Use this stack |
|--------------------|----------------|
| A file in `apps/api/` (service, controller, route) | Vitest + Supertest |
| A file in `apps/web/` (component, hook, page) | Vitest + React Testing Library |
| A file in `packages/shared/` (utility, type guard) | Vitest only (pure unit) |

Place the test file alongside the source with the same name + `.test.ts` or `.test.tsx`.

Example: `apps/api/services/applicationService.ts` → `apps/api/services/applicationService.test.ts`

---

## Test Structure

Always follow the **Arrange → Act → Assert** pattern inside each test. Group related tests with `describe` blocks.

```typescript
describe('functionName / ComponentName', () => {
  describe('happy path', () => {
    it('does X when given Y', async () => {
      // Arrange
      const input = ...
      // Act
      const result = await fn(input)
      // Assert
      expect(result).toEqual(...)
    })
  })

  describe('validation', () => { ... })
  describe('edge cases', () => { ... })
})
```

---

## Backend Tests (Vitest + Supertest)

### Mocking pattern

Mock at the boundary — mock the database and external HTTP calls, not internal service logic.

```typescript
import { vi, describe, it, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../app'

// Mock the DB layer
vi.mock('../db', () => ({
  db: {
    query: vi.fn(),
    // add other methods used by the service
  }
}))

// Factory for common test data — avoids repeating object literals
const makeApplication = (overrides = {}) => ({
  id: 'app-001',
  merchantId: 'merch-001',
  status: 'pending',
  amount: 50_000_000,
  ...overrides,
})
```

### What to test for every API endpoint

1. **Happy path** — valid input, correct status code and response envelope `{ success: true, data: {...} }`
2. **Zod validation errors** — missing required fields, wrong types, out-of-range values → expect `400` with `{ success: false, error: { code, message } }`
3. **Auth/RBAC** — requests without a JWT token → `401`; requests with a token but wrong role → `403`
4. **OMM business rules** — add these for any endpoint that touches applications or partner data:

```typescript
describe('OMM business rules', () => {
  it('rejects request if merchant has not consented', async () => {
    // Simulate missing consent record
    // Expect 403 or 422 with appropriate error code
  })

  it('calls deletePartnerAccessibleData when partner rejects application', async () => {
    // Set up: spy on deletePartnerAccessibleData
    // Act: call the reject endpoint
    // Assert: spy was called with the correct appId
  })

  it('never returns raw transaction records in partner-facing response', async () => {
    // Call a partner endpoint that returns application details
    // Assert: response.data does not contain a `transactions` array
  })
})
```

---

## Frontend Tests (Vitest + React Testing Library)

### Setup

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Wrap with providers the component actually needs
const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
}
```

### What to test for every data-fetching component

1. **Loading state** — while the query is in flight, a skeleton or spinner is visible
2. **Error state** — when the query fails, an error message is shown (not a blank screen)
3. **Empty state** — when the query returns an empty array/null, the empty state UI renders
4. **Primary interaction** — the main user action works (button click, form submit, navigation)

```typescript
describe('MitraScoreCard', () => {
  it('shows a loading skeleton while score is fetching', () => {
    // Mock API call as pending
    // Render and assert skeleton is in the document
  })

  it('shows error message when score fetch fails', async () => {
    // Mock API call as rejected
    // Assert error text visible
  })

  it('shows "Belum ada data" when score is null', async () => {
    // Mock API call returning null
    // Assert empty state visible
  })

  it('displays formatted Mitra Score when data loads', async () => {
    // Mock API returning { score: 82, tier: 'Gold' }
    // Assert score and tier badge visible
  })
})
```

---

## Formatting Assertions

When testing UI output of numbers and dates, assert on the **formatted** value that users actually see, not the raw number. This ensures the formatting helpers are being used.

```typescript
// ✅ Assert the formatted output
expect(screen.getByText('Rp 50.000.000')).toBeInTheDocument()
expect(screen.getByText('8 Maret 2026')).toBeInTheDocument()

// ❌ Don't assert on raw values
expect(screen.getByText('50000000')).toBeInTheDocument()
```

---

## Output

Write complete, runnable test files. Include all necessary imports. Don't truncate or use `// ... more tests` placeholders — write the actual test bodies.

After generating the test file, briefly note:
- How many test cases were generated
- Which OMM business rules are covered (if any)
- Any edge cases you couldn't test without more context (e.g., the actual Zod schema shape, or a specific error code from `API_LIST.md`)
