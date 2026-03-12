# Setup Guide — Olsera Mitra Modal
**Environment:** Local Development
**Updated:** March 2026

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 18+ (LTS recommended) | https://nodejs.org |
| npm | 9+ (bundled with Node) | — |
| Docker Desktop | latest | https://docker.com/products/docker-desktop |
| Git | any | — |

Check versions:
```bash
node --version   # v18.x or higher
npm --version    # 9.x or higher
docker --version # Docker version 24.x or higher
```

---

## 1. Clone & Install

```bash
# Clone the repository
git clone <repo-url> omm
cd omm

# Install all workspace dependencies (root + apps/web + apps/api + packages/*)
npm install
```

This installs:
- `apps/web` dependencies (React, Vite, Tailwind, shadcn/ui, TanStack Query, Zustand, Recharts)
- `apps/api` dependencies (Express, mysql2, ioredis, jsonwebtoken, bcrypt, Zod, node-cron)
- `packages/shared` and `packages/ui` dependencies

---

## 2. Environment Variables

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` with your local config:

```env
# ─── Database (MySQL via Docker) ───────────────────────────────────────
DB_HOST=localhost
DB_PORT=3306
DB_NAME=omm_development
DB_USER=omm_user
DB_PASSWORD=omm_password_local

# ─── Redis (via Docker) ────────────────────────────────────────────────
REDIS_URL=redis://localhost:6379

# ─── JWT ───────────────────────────────────────────────────────────────
JWT_SECRET=local_dev_secret_change_in_production_min_32_chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# ─── API ───────────────────────────────────────────────────────────────
API_PORT=3001
INTERNAL_API_KEY=internal_dev_key_for_cron_jobs

# ─── Frontend ──────────────────────────────────────────────────────────
VITE_API_URL=http://localhost:3001/api/v1

# ─── App ───────────────────────────────────────────────────────────────
NODE_ENV=development
```

---

## 3. Start Infrastructure (Docker)

Start MySQL 8 and Redis:

```bash
docker-compose up -d
```

This starts:
- **MySQL 8** on `localhost:3306` with database `omm_development`
- **Redis** on `localhost:6379`

Verify they're running:
```bash
docker-compose ps
# NAME       STATUS    PORTS
# omm-mysql  running   0.0.0.0:3306->3306/tcp
# omm-redis  running   0.0.0.0:6379->6379/tcp
```

To stop:
```bash
docker-compose down
```

To stop and delete all data (wipe database):
```bash
docker-compose down -v
```

---

## 4. Database Setup

Run migrations to create all tables:
```bash
npm run db:migrate
```

Seed demo data for local development:
```bash
npm run db:seed
```

This creates:
- 5 demo user accounts (one per role)
- 10 demo merchants with stores and 12-month transaction history
- 8 demo partners with products and SLA config
- 15–20 demo loan applications in various statuses
- 4 partners in onboarding queue
- Merchant scores across all 4 tiers

**Reset everything (drop + migrate + seed):**
```bash
npm run db:reset
```
> ⚠️ Dev only — this script is blocked if `NODE_ENV=production`

---

## 5. Run the Application

### Option A — Run everything from root (recommended)

```bash
npm run dev
```

This starts concurrently:
- Frontend at **http://localhost:5173**
- API at **http://localhost:3001**

### Option B — Run separately

Frontend only:
```bash
npm run dev --workspace=apps/web
```

API only:
```bash
npm run dev --workspace=apps/api
```

---

## 6. Verify Setup

### API health check
```bash
curl http://localhost:3001/api/v1/health
# Expected: {"status":"ok","uptime":12345,"version":"1.0.0"}
```

### Frontend
Open http://localhost:5173 — you should see the login page.

### Test login
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"merchant@demo.com","password":"demo123"}'
# Expected: {"success":true,"data":{"accessToken":"eyJ...","user":{...}}}
```

---

## 7. Demo Accounts

Use these accounts to explore each portal:

| Email | Password | Role | Portal |
|-------|----------|------|--------|
| `merchant@demo.com` | `demo123` | merchant | `/merchant/dashboard` |
| `partner.mandiri@demo.com` | `demo123` | partner | `/partner/dashboard` |
| `admin@olsera.com` | `admin123` | admin | `/admin/dashboard` |
| `data@olsera.com` | `demo123` | data | `/data/intelligence` |
| `coo@olsera.com` | `demo123` | management | `/management/dashboard` |

---

## 8. Useful npm Scripts

Run from the **repo root** unless otherwise noted.

| Script | Description |
|--------|-------------|
| `npm run dev` | Start all apps in dev mode (concurrent) |
| `npm run build` | Build all apps for production |
| `npm run lint` | ESLint across all workspaces |
| `npm run typecheck` | TypeScript `tsc --noEmit` across all workspaces |
| `npm run test` | Jest tests across all workspaces |
| `npm run db:migrate` | Run pending SQL migrations |
| `npm run db:seed` | Insert demo seed data |
| `npm run db:reset` | Drop all tables + migrate + seed (dev only) |
| `npm run format` | Prettier format all files |

---

## 9. Project Structure Quick Reference

```
omm/
├── apps/
│   ├── web/          → React frontend (http://localhost:5173)
│   └── api/          → Express API   (http://localhost:3001)
├── packages/
│   ├── shared/       → Types + utils shared by both apps
│   └── ui/           → shadcn/ui overrides
├── docs/             → Project documentation (you are here)
├── docker-compose.yml
├── .env.example
└── package.json      → Root workspace
```

---

## 10. Common Issues

### MySQL connection refused
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Fix:** Docker containers not running. Run `docker-compose up -d` first.

---

### Port 5173 or 3001 already in use
```bash
# Find the process using the port
lsof -i :5173
lsof -i :3001

# Kill it
kill -9 <PID>
```

---

### Migration fails — "Table already exists"
The migration runner is idempotent (`CREATE TABLE IF NOT EXISTS`). If you see errors, it means a migration file changed after it was already run. Fix: `npm run db:reset` to wipe and start fresh.

---

### TypeScript errors after `npm install`
```bash
# Rebuild shared packages first
npm run build --workspace=packages/shared
npm run build --workspace=packages/ui

# Then check types
npm run typecheck
```

---

### Redis connection error
```
Error: connect ECONNREFUSED 127.0.0.1:6379
```
**Fix:** Same as MySQL — ensure Docker containers are running with `docker-compose up -d`.

---

### Frontend shows blank page / login redirect loop
1. Check API is running: `curl http://localhost:3001/api/v1/health`
2. Check `VITE_API_URL` in `.env` points to correct API URL
3. Check browser console for CORS errors — ensure `API_PORT` matches

---

## 11. Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Stable base — E1 merged |
| `ols-18/ui-components` | E2 Design System (In Review) |
| `demo/management-prototype` | Full clickable prototype — all 5 portals with mock data, no backend required |

**For development:**
```bash
# Branch off main for backend work
git checkout main
git checkout -b feature/ols-XX/description

# Branch off demo/management-prototype for frontend-only work
git checkout demo/management-prototype
git checkout -b feature/ols-XX/description
```

**Naming convention:** `feature/ols-{ticket-number}/{short-description}` (matches Linear ticket IDs, e.g. `feature/ols-36/scoring-service`)
