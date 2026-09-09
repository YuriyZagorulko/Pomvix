#!/usr/bin/env bash
set -Eeuo pipefail

FRONTEND_URL="${FRONTEND_URL:-http://127.0.0.1:3000}"
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

check_http() {
  local label="$1" url="$2" expected="${3:-200}" actual
  actual="$(curl --silent --show-error --output /dev/null --write-out '%{http_code}' --max-time 10 "$url")"
  [[ "$actual" == "$expected" ]] || { echo "[FAIL] ${label}: expected ${expected}, got ${actual}" >&2; exit 1; }
  echo "[OK] ${label} (${actual})"
}

check_backend_health() {
  local label="$1"
  local status
  status="$(cd "$APP_DIR" && docker compose --env-file .env.production -f docker-compose.prod.yml exec -T backend python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health', timeout=5)" 2>/dev/null && echo ok || echo fail)"
  [[ "$status" == "ok" ]] || { echo "[FAIL] ${label}: backend health check failed" >&2; exit 1; }
  echo "[OK] ${label}"
}

check_backend_cors() {
  local label="$1"
  local status
  status="$(cd "$APP_DIR" && docker compose --env-file .env.production -f docker-compose.prod.yml exec -T backend python -c "
import urllib.request
req = urllib.request.Request('http://127.0.0.1:8000/api/v1/contact', method='OPTIONS')
req.add_header('Origin', 'https://pomvix.com')
req.add_header('Access-Control-Request-Method', 'POST')
resp = urllib.request.urlopen(req, timeout=5)
print(resp.status)
" 2>/dev/null)"
  [[ "$status" == "200" ]] || { echo "[FAIL] ${label}: expected 200, got ${status}" >&2; exit 1; }
  echo "[OK] ${label} (${status})"
}

echo '==> Smoke test: backend health and database connectivity'
check_backend_health 'backend /health'

echo '==> Smoke test: contact API route availability'
check_backend_cors 'contact endpoint'

echo '==> Smoke test: frontend pages and static assets'
check_http 'frontend home' "${FRONTEND_URL}/" 200
check_http 'frontend logo' "${FRONTEND_URL}/logo.png" 200
check_http 'frontend icon' "${FRONTEND_URL}/icon.webp" 200

echo '[OK] production smoke tests passed'