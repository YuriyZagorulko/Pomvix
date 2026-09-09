#!/usr/bin/env sh
set -eu

# Coolify starts the services together.  The database health condition in
# Compose prevents the container from starting too early; Alembic remains
# idempotent and is therefore safe on every deployment/restart.
alembic upgrade head
exec "$@"