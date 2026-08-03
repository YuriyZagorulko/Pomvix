# Production deployment

Pomvix deploys automatically to an Ubuntu server with Docker Compose. A push to `main` starts GitHub Actions, which connects over SSH and runs the versioned `scripts/deploy-production.sh` script in `/home/yuri/pomvix`.

The deployment is serialized by GitHub Actions and a host-side `flock`. It is safe to repeat: Compose reconciles existing containers, PostgreSQL keeps its named volume, and Alembic upgrades an already-current database without doing anything.

## Services and ownership

The production Compose project contains:

- `db` — PostgreSQL 16 with a persistent `postgres_data` volume.
- `backend` — FastAPI, exposed only on `127.0.0.1:8000`.
- `frontend` — Next.js, exposed only on `127.0.0.1:3000`.

Nginx is a host-level service and is not restarted by this deployment. It proxies public HTTPS traffic to the local backend and frontend ports.

## First deployment

1. Install Docker Engine and the Docker Compose plugin on the server.
2. Clone the repository to `/home/yuri/pomvix` and ensure the deployment user can pull `origin/main` and run Docker without `sudo` or a password prompt.
3. Create `/home/yuri/pomvix/.env.production` from `.env.production.example` and replace every `CHANGE_ME` value.
4. Configure the SSH secrets listed below in GitHub.
5. Push `main`, or run the deployment script manually:

   ```bash
   cd /home/yuri/pomvix
   ./scripts/deploy-production.sh
   ```

The first run creates PostgreSQL and the schema. The initial migration uses `CREATE TABLE IF NOT EXISTS` and `CREATE INDEX IF NOT EXISTS`; therefore a database created by the former startup `create_all()` path is adopted by the normal `alembic upgrade head` command. No manual `alembic stamp` or SQL is required.

There is exactly one migration source today: `20260803_0001_initial.py`, with
no parent revision. It was verified against an isolated PostgreSQL 16
container in all of these states:

| Scenario | Result |
| --- | --- |
| Empty database, first `alembic upgrade head` | Passed; table and index created |
| Empty database, second upgrade | Passed; no-op |
| Legacy `contact_submissions` table with no Alembic version | Passed; existing table preserved and revision recorded |
| Database already at `20260803_0001 (head)` | Passed; no-op |
| Repeated upgrade after legacy adoption | Passed; no duplicate-table error |

Future schema changes must add a new child revision; they must not add another
root migration or modify an applied revision.

## Normal updates

```text
git push origin main
        ↓
GitHub Actions / SSH
        ↓
git pull origin main
        ↓
validate .env.production and Compose configuration
        ↓
build backend and frontend images
        ↓
start PostgreSQL and wait for its health check
        ↓
alembic upgrade head
        ↓
start backend and wait for /health (including SELECT 1)
        ↓
start frontend and wait for its HTTP health check
        ↓
verify db, backend, and frontend
```

All major steps are logged with `==>` and failures include Compose status and the last 100 lines from all services. Configuration validation happens before Compose starts or updates any service. Re-running the script does not fail on existing containers, tables, indexes, or applied migrations.

## Required GitHub secrets

| Secret | Description |
| --- | --- |
| `HOST` | Production server hostname or IP address |
| `PORT` | SSH port |
| `USERNAME` | Deployment user |
| `SSH_PRIVATE_KEY` | Private key authorized for that user |

The private key is loaded into the runner's SSH agent and is not written to
logs or committed. `.env.production` stays on the server.

## Configuration validation

The validator checks, without printing secret values:

- production mode, disabled debug mode, and secure cookies;
- required database, frontend, API, email, and secret settings;
- HTTPS for public URLs;
- PostgreSQL async URL targeting the Compose `db` service;
- SMTP credentials when SMTP is enabled; and
- basic email address format;
- duplicate variable names;
- production localhost, loopback, or IP-based public URLs; and
- backup policy and retention settings.

Run it without deploying:

```bash
./scripts/validate-production-env.sh .env.production
```

## Migrations

Schema changes belong in `backend/alembic/versions/`. The backend does not run `Base.metadata.create_all()` during startup; Alembic is the sole schema owner. Every migration must be safe to run once and leave `alembic_version` at a known revision. `upgrade head` runs on every deployment.

For a migration failure, the deployment exits before intentionally replacing backend or frontend containers. Inspect the migration and database logs, fix the migration in a new commit, and deploy again. Do not edit production tables manually.

## Health checks and recovery

Compose health checks cover PostgreSQL, backend, and frontend. The backend health endpoint performs a database query, so a process that is listening but cannot reach PostgreSQL is not healthy. The deployment also checks the local endpoints directly:

```bash
cd /home/yuri/pomvix
docker compose --env-file .env.production -f docker-compose.prod.yml ps
curl --fail http://127.0.0.1:8000/health
curl --fail http://127.0.0.1:3000/
```

On failure, the script leaves the stack running and prints diagnostics; it does not execute `docker compose down`. This keeps old containers running whenever Compose has not yet replaced them. If a replacement container was created but is unhealthy, inspect logs and use the rollback procedure.

After the service health checks, `scripts/smoke-test-production.sh` verifies
the backend health route, the database-backed API, CORS/contact route
availability, the frontend home page, and both logo/icon assets. Any failed
status aborts the deployment.

## Rollback

The preferred rollback is a normal Git revert, preserving history and using the tested deployment path:

```bash
git checkout main
git pull origin main
git revert <bad-commit>
git push origin main
```

For an urgent server-only code rollback, fetch and deploy a known-good commit:

```bash
cd /home/yuri/pomvix
git fetch origin
git checkout --detach <known-good-commit>
./scripts/deploy-production.sh
```

Code rollback does not automatically undo database migrations. Migrations should be backward-compatible with the previous application where possible. Never run `alembic downgrade` automatically in production; assess data loss, take a backup, and perform a reviewed downgrade only when safe.

## Database backup recommendation

The named volume provides persistence, not backup. Configure scheduled PostgreSQL backups on the server and verify restoration separately. A backup is required before any destructive schema operation or planned downgrade.

The deployment creates custom-format backups in `backups/` before every
migration and retains `BACKUP_RETENTION_DAYS` of them. Restore a backup only
after stopping writes and confirming the target database, for example:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml stop backend
cat backups/pomvix-20260803T000000Z.dump | \
  docker compose --env-file .env.production -f docker-compose.prod.yml exec -T db \
  sh -c 'pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists'
docker compose --env-file .env.production -f docker-compose.prod.yml up -d
```

Set `ALLOW_MIGRATION_WITHOUT_BACKUP=true` only for an explicitly approved
exception. The validator accepts the setting, and the deploy log records the
exception before migration begins.

## Security and permissions

- Backend and frontend images run as non-root users.
- Backend and frontend ports bind to loopback only; public access is through
  host Nginx.
- The deployment SSH key is loaded through an ephemeral GitHub runner agent.
- GitHub Actions has `contents: read` permission and serializes deployments.
- The server deployment user needs only repository read/pull access and Docker
  access; it should not be a general-purpose administrator.
- `.env.production`, database backups, and deployment logs are ignored by Git.
- Do not print `docker compose config` output or environment contents because
  Compose can render secrets into that output.

## Verification scenarios

The repository-level checks performed for this hardening pass were:

1. Shell syntax, Python compilation, and whitespace checks — passed.
2. Production Compose configuration parsing with an ephemeral environment file
   — passed.
3. Configuration validator with the untouched template — rejected as expected.
4. Configuration validator with a synthetic valid production configuration —
   passed.
5. Isolated PostgreSQL migration scenarios listed above — all passed.
6. Live deployment smoke tests — run automatically by the production script;
   they cannot be executed from this repository workspace without the real
   production environment and credentials.

The local `pytest` command was unavailable on the verification host, so the
repository test suite was not run there.

## Troubleshooting

```bash
cd /home/yuri/pomvix
docker compose --env-file .env.production -f docker-compose.prod.yml ps
docker compose --env-file .env.production -f docker-compose.prod.yml logs --tail=200 db backend frontend
docker compose --env-file .env.production -f docker-compose.prod.yml run --rm --no-deps backend alembic current
docker compose --env-file .env.production -f docker-compose.prod.yml run --rm --no-deps backend alembic history
```

Check disk space with `df -h` and Docker capacity with `docker system df`. Nginx remains separate; check it with `sudo nginx -t` and `sudo systemctl status nginx`.

Common failures:

- **Configuration rejected:** fix the reported variable before retrying; no
  service is touched.
- **Backup rejected:** inspect PostgreSQL health, disk space, and the backup
  directory. Migration is intentionally not started.
- **Migration rejected:** inspect the backup and Alembic logs; deploy a fixed
  migration commit. Do not manually create tables.
- **Backend unhealthy:** check backend logs and `/health`; the endpoint proves
  database connectivity, not merely that Uvicorn is listening.
- **Frontend unhealthy:** inspect the frontend build/runtime logs and confirm
  the public build-time URL variables.
- **SSH failure:** verify the host, port, authorized key, and Docker access.
  GitHub uploads the captured deployment log as an artifact when the SSH
  deployment step fails.
