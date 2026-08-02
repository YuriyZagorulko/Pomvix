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

```bash
cp .env.example .env
docker compose up --build
```

Visit `http://localhost:3000`. The API health check is available at `http://localhost:8000/health`, and Swagger at `/docs`.

Without Docker:

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