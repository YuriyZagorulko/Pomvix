#!/usr/bin/env bash
set -Eeuo pipefail

BACKEND_URL="${BACKEND_URL:-http://127.0.0.1:8000}"
FRONTEND_URL="${FRONTEND_URL:-http://127.0.0.1:3000}"

check_http() {
  local label="$1" url="$2" expected="${3:-200}" actual
  actual="$(curl --silent --show-error --output /dev/null --write-out '%{http_code}' --max-time 10 "$url")"
  [[ "$actual" == "$expected" ]] || { echo "[FAIL] ${label}: expected ${expected}, got ${actual}" >&2; exit 1; }
  echo "[OK] ${label} (${actual})"
}

echo '==> Smoke test: backend health and database connectivity'
check_http 'backend /health' "${BACKEND_URL}/health" 200

echo '==> Smoke test: contact API route availability'
contact_status="$(curl --silent --show-error --output /dev/null --write-out '%{http_code}' \
  --max-time 10 -X OPTIONS \
  -H 'Origin: https://pomvix.com' \
  -H 'Access-Control-Request-Method: POST' \
  "${BACKEND_URL}/api/v1/contact")"
[[ "$contact_status" == "200" ]] || { echo "[FAIL] contact endpoint: expected 200, got ${contact_status}" >&2; exit 1; }
echo "[OK] contact endpoint (${contact_status})"

echo '==> Smoke test: frontend pages and static assets'
check_http 'frontend home' "${FRONTEND_URL}/" 200
check_http 'frontend logo' "${FRONTEND_URL}/logo.png" 200
check_http 'frontend icon' "${FRONTEND_URL}/icon.webp" 200

echo '[OK] production smoke tests passed'