# Pomvix

Premium corporate website and contact API for Pomvix, an independent software studio.

## Stack

- **Frontend:** Next.js App Router, React, TypeScript, Tailwind CSS, Lucide
- **Backend:** FastAPI, Pydantic, SQLAlchemy 2, PostgreSQL, SMTP
- **Operations:** Docker Compose, optional Nginx reverse proxy

## Run with Docker

```bash
cp .env.example .env
docker compose up --build
```

Visit `http://localhost:3000`. The API health check is available at `http://localhost:8000/health`, and Swagger at `/docs`.

## Local development

```bash
cd frontend && npm install && npm run dev
cd backend && python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt && uvicorn app.main:app --reload
```

Set `DATABASE_URL`, SMTP credentials, and `NEXT_PUBLIC_API_URL` in `.env`. Contact submissions are validated, persisted in PostgreSQL, and emailed when SMTP is configured. SMTP failure does not lose the saved submission.

## Architecture

The frontend is independent from the backend and communicates exclusively through `/api/v1`. Backend responsibilities are separated into API routes, schemas, repositories, services, and infrastructure configuration. This makes future authentication, an admin dashboard, blog/CMS, i18n, CRM, uploads, analytics, and payments additive rather than disruptive.

## Production notes

Use a managed PostgreSQL instance, a long random `SECRET_KEY`, production CORS origins, TLS termination, and a real SMTP provider. Put Nginx or a cloud load balancer in front of the services. Run migrations through Alembic as the schema grows; the initial container startup creates the first table for convenience.