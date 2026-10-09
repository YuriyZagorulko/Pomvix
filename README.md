# Pomvix

Premium corporate website and contact API for Pomvix, an independent software studio.

## Stack

- **Frontend:** Next.js App Router, React, TypeScript, Tailwind CSS, Lucide
- **Backend:** FastAPI, Pydantic, SQLAlchemy 2, PostgreSQL, SMTP
- **Operations:** Docker Compose, Nginx reverse proxy

## Project layout

```
├── backend/            # FastAPI application
│   ├── app/
│   │   ├── api/v1/     # API routes
│   │   ├── core/       # Settings, rate limiter
│   │   ├── db/         # Database engine/session
│   │   ├── models/     # SQLAlchemy models
│   │   ├── repositories/
│   │   ├── schemas/    # Pydantic schemas
│   │   └── services/   # Email service
│   └── Dockerfile      # Multi-stage production image
├── frontend/           # Next.js application
│   ├── app/            # App Router pages
│   ├── components/
│   ├── lib/site.ts     # Environment-driven site config
│   └── Dockerfile      # Multi-stage production image (standalone)
├── nginx/              # Reverse proxy configs
├── docker-compose.yml      # Local development
└── docker-compose.prod.yml # Production deployment
```

## Configuration

All configuration is environment-driven. No hosts, credentials, or environment-specific values are hardcoded in the application.

| Variable | Description |
| --- | --- |
| `ENVIRONMENT` | `development` or `production` |
| `DEBUG` | Enable debug mode (never in production) |
| `DATABASE_URL` | Async SQLAlchemy PostgreSQL URL |
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | PostgreSQL container credentials |
| `SECRET_KEY` | Long random secret (≥ 32 chars) |
| `NEXT_PUBLIC_SITE_URL` | Public site origin (inlined at frontend build time) |
| `NEXT_PUBLIC_API_URL` | Public API base URL (inlined at frontend build time) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email (inlined at frontend build time) |
| `FRONTEND_URL` | Backend CORS origin |
| `CORS_ORIGINS` | Optional comma-separated extra CORS origins |
| `COOKIE_SECURE` | Send cookies only over HTTPS |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USERNAME` / `SMTP_PASSWORD` / `SMTP_USE_TLS` | SMTP relay for contact notifications |
| `EMAIL_FROM` / `EMAIL_TO` | Sender / recipient for contact notifications |
| `DOCS_ENABLED` | Expose `/docs` and `/redoc` |
| `RATE_LIMIT` | Contact endpoint rate limit |

## Local development

### First-time Docker setup

```bash
cp .env.example .env
cp docker-compose.override.example.yml docker-compose.override.yml
docker compose up --build
```

The override file is gitignored. It is required for **live reload** in Docker (Next.js HMR and
Uvicorn `--reload`). Without it, Compose uses the production-style images from the base
`docker-compose.yml` (`next start` and multi-worker Uvicorn).

### URLs and ports

With the default override template:

| Service | URL |
| --- | --- |
| Frontend | `http://localhost:13471` |
| API health | `http://localhost:18471/health` |
| Swagger | `http://localhost:18471/docs` |

Containers still listen on **3000** (frontend) and **8000** (backend) internally. PostgreSQL is
not published to the host.

If ports **3000** / **8000** are free and you prefer them, adjust or omit the `ports: !override`
sections in your local `docker-compose.override.yml` and set matching `NEXT_PUBLIC_*` /
`FRONTEND_URL` values in `.env`.

### Live reload in Docker

When `docker-compose.override.yml` is present:

| Change | Expected behavior |
| --- | --- |
| Frontend source (components, routes, styles, Tailwind) | Next.js dev server hot refresh — save and check the browser |
| Backend Python under `backend/app/` | Uvicorn reload — save and retry the API |
| `.env` / Compose environment variables | Restart or recreate the affected service |
| `package.json`, lockfiles, `requirements.txt`, Dockerfiles | Rebuild the affected service: `docker compose up --build frontend` or `backend` |

**Bind mounts:** host `./frontend` → container `/app`, host `./backend/app` (and Alembic files) →
container `/app`. **Named volume** `pomvix_frontend_node_modules` keeps container-installed npm
packages so the frontend mount does not hide `node_modules`.

**File watching:** polling is enabled in the override (`WATCHPACK_POLLING`, `CHOKIDAR_USEPOLLING`)
so HMR works reliably with bind mounts on Linux and Docker Desktop.

**Development commands inside containers:**

- Frontend: `npm run dev -- -H 0.0.0.0 -p 3000` (via `frontend/Dockerfile.dev`)
- Backend: `uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload --reload-dir /app/app`
  (via `backend/Dockerfile.dev`, with Alembic still run by `entrypoint.sh` on start)

### Without Docker

```bash
cd frontend && npm install && npm run dev
cd backend && python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt && uvicorn app.main:app --reload
```

Contact submissions are validated, persisted in PostgreSQL, and emailed when SMTP is configured. SMTP failure does not lose the saved submission.

## Production deployment

### 1. Prepare the environment

```bash
cp .env.production.example .env.production
```

Edit `.env.production` and set real values:

- `POSTGRES_PASSWORD` — strong database password
- `SECRET_KEY` — generate with `python -c "import secrets; print(secrets.token_urlsafe(64))"`
- `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_API_URL` / `FRONTEND_URL` — your public domain
- `SMTP_*` — your SMTP relay credentials
- `EMAIL_FROM` / `EMAIL_TO` — notification addresses

`.env.production` is gitignored and must never be committed.

### 2. Deploy

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
```

This starts four services:

| Service | Purpose | Ports exposed |
| --- | --- | --- |
| `db` | PostgreSQL 16 with a named volume | none (internal only) |
| `backend` | FastAPI (2 uvicorn workers, non-root) | none (internal only) |
| `frontend` | Next.js standalone server (non-root) | none (internal only) |
| `nginx` | Reverse proxy, TLS-ready entry point | `80:80` |

All services restart automatically (`unless-stopped`), have health checks, and start in dependency order. The database is only reachable inside the Docker network.

### 3. Verify

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml ps
curl http://localhost/health          # nginx
curl http://localhost/api/v1/contact  # API (POST)
```

### Production notes

- Terminate TLS at your load balancer or cloud provider and forward traffic to port 80.
- `DOCS_ENABLED=false` hides `/docs`, `/redoc`, and `/openapi.json` in production.
- `DEBUG=false` and `COOKIE_SECURE=true` are enforced by the production compose file.
- The initial container startup creates the first table for convenience. As the schema grows, run migrations through Alembic:
  ```bash
  docker compose --env-file .env.production -f docker-compose.prod.yml exec backend alembic upgrade head
  ```
- Back up the `postgres_data` volume regularly.

## Architecture

The frontend is independent from the backend and communicates exclusively through `/api/v1`. Backend responsibilities are separated into API routes, schemas, repositories, services, and infrastructure configuration. This makes future authentication, an admin dashboard, blog/CMS, i18n, CRM, uploads, analytics, and payments additive rather than disruptive.