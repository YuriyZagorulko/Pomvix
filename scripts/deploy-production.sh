#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"
ENV_FILE=".env.production"
COMPOSE=(docker compose --env-file "$ENV_FILE" -f docker-compose.prod.yml)
BACKUP_DIR="${BACKUP_DIR:-backups}"

step() { printf '\n==> %s\n' "$1"; }
fail() {
  code=$?
  printf '\n[FAIL] deployment stopped (exit %s)\n' "$code" >&2
  "${COMPOSE[@]} ps" || true
  "${COMPOSE[@]} logs --no-color --tail=100 db backend frontend" || true
  printf '[INFO] existing containers were not intentionally removed; inspect logs before recovery.\n' >&2
  exit "$code"
}
trap fail ERR

exec 9>/tmp/pomvix-production-deploy.lock
flock -n 9 || { echo '[FAIL] another production deployment is already running' >&2; exit 1; }

step 'Validate production configuration before touching services'
bash ./scripts/validate-production-env.sh "$ENV_FILE"
"${COMPOSE[@]}" config --quiet

step 'Build immutable application images'
"${COMPOSE[@]}" build --pull backend frontend

step 'Start or update PostgreSQL and wait for health'
"${COMPOSE[@]}" up -d db
"${COMPOSE[@]}" up -d --wait db

step 'Create a pre-migration PostgreSQL backup'
allow_without_backup="$(awk -F= '$1 == "ALLOW_MIGRATION_WITHOUT_BACKUP" {sub(/^[^=]*=/, ""); print; exit}' "$ENV_FILE" | tr '[:upper:]' '[:lower:]')"
retention_days="$(awk -F= '$1 == "BACKUP_RETENTION_DAYS" {sub(/^[^=]*=/, ""); print; exit}' "$ENV_FILE")"
retention_days="${retention_days:-14}"
mkdir -p "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR"
backup_file="${BACKUP_DIR}/pomvix-$(date -u +%Y%m%dT%H%M%SZ).dump"
if [[ "$allow_without_backup" == "true" ]]; then
  printf '[WARN] ALLOW_MIGRATION_WITHOUT_BACKUP=true; migration backup is explicitly skipped\n'
else
  "${COMPOSE[@]}" exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --format=custom' > "$backup_file"
  [[ -s "$backup_file" ]] || { echo '[FAIL] PostgreSQL backup is empty' >&2; exit 1; }
  chmod 600 "$backup_file"
  find "$BACKUP_DIR" -type f -name 'pomvix-*.dump' -mtime "+$((retention_days - 1))" -delete
  printf '[OK] PostgreSQL backup created: %s (retention: %s days)\n' "$backup_file" "$retention_days"
fi

step 'Apply database migrations (safe for new, legacy, and repeat deployments)'
"${COMPOSE[@]}" run --rm --no-deps backend alembic upgrade head

step 'Start backend and wait for API/database health'
"${COMPOSE[@]}" up -d --no-deps backend
"${COMPOSE[@]}" up -d --wait backend

step 'Start frontend and wait for HTTP health'
"${COMPOSE[@]}" up -d --no-deps frontend
"${COMPOSE[@]}" up -d --wait frontend

step 'Verify all production services'
"${COMPOSE[@]}" ps
for service in db backend frontend; do
  status="$("${COMPOSE[@]}" ps --status running --services | grep -Fx "$service" || true)"
  [[ "$status" == "$service" ]] || { echo "[FAIL] ${service} is not running" >&2; exit 1; }
done
curl --fail --silent --show-error http://127.0.0.1:8000/health >/dev/null
curl --fail --silent --show-error http://127.0.0.1:3000/ >/dev/null
bash ./scripts/smoke-test-production.sh
printf '\n[OK] production deployment completed and all services are healthy\n'