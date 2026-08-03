# Production deployment

Pomvix is deployed automatically to an Ubuntu production server with Docker Compose. GitHub Actions connects to the server over SSH after every push to the `main` branch.

## Production services

The production Compose project contains:

- `db` — PostgreSQL
- `backend` — FastAPI
- `frontend` — Next.js

The application repository is located at `/home/yuri/pomvix`.

Nginx runs separately as a host-level service. The deployment workflow does not restart, reload, or modify Nginx.

## Deployment process

The workflow is stored at `.github/workflows/deploy.yml`.

For every push to `main`, GitHub Actions:

1. Connects to the production server using SSH.
2. Changes to `/home/yuri/pomvix`.
3. Pulls the latest `main` branch.
4. Builds the production Docker images.
5. Runs pending Alembic migrations inside the backend container.
6. Starts or updates the production services.
7. Prints the Compose service status.
8. Prints recent backend and frontend logs if a deployment command fails.

The commands executed on the server are:

    cd /home/yuri/pomvix
    git pull origin main
    docker compose -f docker-compose.prod.yml build
    docker compose -f docker-compose.prod.yml run --rm backend alembic upgrade head
    docker compose -f docker-compose.prod.yml up -d

The workflow uses strict shell error handling and stops when any command fails.

## Required GitHub Secrets

Configure these repository secrets under **Settings → Secrets and variables → Actions**.

| Secret | Description |
| --- | --- |
| `HOST` | Production server hostname or IP address |
| `PORT` | SSH port of the production server |
| `USERNAME` | Ubuntu user used for deployment |
| `SSH_PRIVATE_KEY` | Private SSH key authorized for the deployment user |

The deployment user must be able to:

- Connect to the server over SSH.
- Read and update `/home/yuri/pomvix`.
- Pull from the repository's `origin` remote.
- Run Docker and Docker Compose without an interactive password prompt.

The production server must already have a valid `.env.production` file in `/home/yuri/pomvix`. GitHub Actions does not create, print, or modify that file.

Do not commit private keys, passwords, production environment files, or other secrets.

## Triggering deployment

Automatic deployment occurs when changes are pushed to `main`:

    git checkout main
    git push origin main

Pushes to other branches do not trigger this workflow.

## Manual deployment

The workflow is configured for push events only. To deploy manually from the production server:

    cd /home/yuri/pomvix
    git pull origin main
    docker compose -f docker-compose.prod.yml build
    docker compose -f docker-compose.prod.yml run --rm backend alembic upgrade head
    docker compose -f docker-compose.prod.yml up -d
    docker compose -f docker-compose.prod.yml ps

## Checking deployment logs

### GitHub Actions

1. Open the repository on GitHub.
2. Open the **Actions** tab.
3. Select **Deploy production**.
4. Select the relevant workflow run.
5. Open the **Deploy over SSH** step.

### Docker Compose status

On the production server:

    cd /home/yuri/pomvix
    docker compose -f docker-compose.prod.yml ps

### Service logs

    docker compose -f docker-compose.prod.yml logs --tail=100 db
    docker compose -f docker-compose.prod.yml logs --tail=100 backend
    docker compose -f docker-compose.prod.yml logs --tail=100 frontend

Follow backend and frontend logs:

    docker compose -f docker-compose.prod.yml logs -f backend frontend

Check the backend health endpoint:

    curl http://127.0.0.1:8000/health

Check the frontend:

    curl -I http://127.0.0.1:3000/

## Rolling back

First inspect recent commits:

    cd /home/yuri/pomvix
    git log --oneline --decorate -n 20

The preferred rollback method is to revert the problematic commit on `main` and push the revert commit. That preserves Git history and uses the normal deployment process:

    git checkout main
    git pull origin main
    git revert <commit-to-revert>
    git push origin main

For an immediate server-only rollback, check out a known-good commit:

    cd /home/yuri/pomvix
    git fetch origin
    git checkout --detach <known-good-commit>

Then rebuild and restart:

    docker compose -f docker-compose.prod.yml build
    docker compose -f docker-compose.prod.yml up -d

A code rollback does not automatically roll back database schema changes. Inspect the migration state before applying any downgrade:

    docker compose -f docker-compose.prod.yml run --rm backend alembic current
    docker compose -f docker-compose.prod.yml run --rm backend alembic history

Database downgrades should be planned carefully and performed only with an appropriate backup because they may cause data loss.

To return to the latest `main` branch:

    cd /home/yuri/pomvix
    git checkout main
    git pull origin main
    docker compose -f docker-compose.prod.yml build
    docker compose -f docker-compose.prod.yml run --rm backend alembic upgrade head
    docker compose -f docker-compose.prod.yml up -d

## Troubleshooting

### SSH connection or authentication failure

Check:

- `HOST` is correct.
- `PORT` is the actual SSH port.
- `USERNAME` is correct.
- The public key is in the deployment user's `~/.ssh/authorized_keys`.
- `SSH_PRIVATE_KEY` contains the complete private key.
- The server firewall permits SSH connections from GitHub-hosted runners.

### Docker permission failure

Verify the deployment user directly on the server:

    docker info
    docker compose version

If necessary, add the user to the Docker group:

    sudo usermod -aG docker <deployment-user>

The user must start a new login session after this change.

### Git pull failure

Inspect the production checkout:

    cd /home/yuri/pomvix
    git status
    git remote -v
    git branch --show-current

The checkout should be on `main`, and the `origin` remote must be accessible without interactive credentials.

### Docker build failure

Build each application image separately:

    cd /home/yuri/pomvix
    docker compose -f docker-compose.prod.yml build backend
    docker compose -f docker-compose.prod.yml build frontend

Check available disk space:

    df -h
    docker system df

### Migration failure

Check that `.env.production` exists:

    cd /home/yuri/pomvix
    test -f .env.production

Check the database:

    docker compose -f docker-compose.prod.yml ps db
    docker compose -f docker-compose.prod.yml logs --tail=100 db

Check the current Alembic revision:

    docker compose -f docker-compose.prod.yml run --rm backend alembic current

The backend image must contain both `alembic/` and `alembic.ini`.

### Backend or frontend startup failure

    docker compose -f docker-compose.prod.yml ps
    docker compose -f docker-compose.prod.yml logs --tail=200 backend
    docker compose -f docker-compose.prod.yml logs --tail=200 frontend

The frontend depends on a healthy backend, so resolve backend health or configuration errors first.

### Nginx failure

Nginx is not managed by GitHub Actions. Check it separately:

    sudo nginx -t
    sudo systemctl status nginx
    sudo journalctl -u nginx -n 100 --no-pager

Do not reload or restart Nginx as part of this application deployment.
