#!/usr/bin/env bash
set -Eeuo pipefail

ENV_FILE="${1:-.env.production}"

fail() {
  printf '[FAIL] configuration: %s\n' "$1" >&2
  exit 1
}

value() {
  awk -F= -v key="$1" '$1 == key {sub(/^[^=]*=/, ""); print; exit}' "$ENV_FILE"
}

[[ -f "$ENV_FILE" ]] || fail "missing ${ENV_FILE}"

duplicate_keys="$(awk -F= '/^[A-Za-z_][A-Za-z0-9_]*=/ { if (++seen[$1] > 1) print $1 }' "$ENV_FILE" | sort -u | paste -sd, -)"
[[ -z "$duplicate_keys" ]] || fail "duplicate environment variables: ${duplicate_keys}"

required=(ENVIRONMENT DATABASE_URL POSTGRES_USER POSTGRES_PASSWORD POSTGRES_DB SECRET_KEY NEXT_PUBLIC_SITE_URL NEXT_PUBLIC_API_URL NEXT_PUBLIC_CONTACT_EMAIL FRONTEND_URL EMAIL_FROM EMAIL_TO)
for key in "${required[@]}"; do
  current="$(value "$key")"
  [[ -n "$current" ]] || fail "${key} is required"
  [[ "$current" != *CHANGE_ME* ]] || fail "${key} still contains CHANGE_ME"
done

[[ "$(value ENVIRONMENT)" == "production" ]] || fail "ENVIRONMENT must be production"
[[ "$(value DEBUG | tr '[:upper:]' '[:lower:]')" != "true" ]] || fail "DEBUG must be false"
[[ "$(value COOKIE_SECURE | tr '[:upper:]' '[:lower:]')" == "true" ]] || fail "COOKIE_SECURE must be true"

for key in NEXT_PUBLIC_SITE_URL NEXT_PUBLIC_API_URL FRONTEND_URL; do
  url="$(value "$key")"
  [[ "$url" =~ ^https://[^[:space:]]+$ ]] || fail "${key} must be an HTTPS URL"
done

secret_key="$(value SECRET_KEY)"
[[ "${#secret_key}" -ge 32 ]] || fail "SECRET_KEY must be at least 32 characters"

[[ "$(value DATABASE_URL)" =~ ^postgresql\+asyncpg://[^@]+@db:5432/[^[:space:]]+$ ]] || fail "DATABASE_URL must target the db service using postgresql+asyncpg"

for key in NEXT_PUBLIC_SITE_URL NEXT_PUBLIC_API_URL FRONTEND_URL; do
  url="$(value "$key")"
  host="${url#https://}"
  host="${host%%/*}"
  host="${host%%:*}"
  [[ "$host" != "localhost" && "$host" != "127.0.0.1" && "$host" != "0.0.0.0" ]] || fail "${key} cannot use localhost or an IP loopback address in production"
  [[ ! "$host" =~ ^[0-9]+(\.[0-9]+){3}$ ]] || fail "${key} must use a DNS hostname, not an IP address"
done

backup_skip="$(value ALLOW_MIGRATION_WITHOUT_BACKUP | tr '[:upper:]' '[:lower:]')"
[[ -z "$backup_skip" || "$backup_skip" == "true" || "$backup_skip" == "false" ]] || fail "ALLOW_MIGRATION_WITHOUT_BACKUP must be true or false"
retention="$(value BACKUP_RETENTION_DAYS)"
if [[ -n "$retention" ]]; then
  [[ "$retention" =~ ^[1-9][0-9]*$ ]] || fail "BACKUP_RETENTION_DAYS must be a positive integer"
fi

smtp_host="$(value SMTP_HOST)"
if [[ -n "$smtp_host" ]]; then
  [[ -n "$(value SMTP_USERNAME)" ]] || fail "SMTP_USERNAME is required when SMTP_HOST is set"
  [[ -n "$(value SMTP_PASSWORD)" ]] || fail "SMTP_PASSWORD is required when SMTP_HOST is set"
  [[ "$(value SMTP_USERNAME)" != *CHANGE_ME* ]] || fail "SMTP_USERNAME still contains CHANGE_ME"
  [[ "$(value SMTP_PASSWORD)" != *CHANGE_ME* ]] || fail "SMTP_PASSWORD still contains CHANGE_ME"
fi

for key in EMAIL_FROM EMAIL_TO NEXT_PUBLIC_CONTACT_EMAIL; do
  [[ "$(value "$key")" =~ ^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$ ]] || fail "${key} must be an email address"
done

printf '[OK] production configuration is valid (%s)\n' "$ENV_FILE"