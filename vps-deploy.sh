#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  ./vps-deploy.sh <user@host> [branch] [app_dir] [app_name]

Example:
  ./vps-deploy.sh root@1.2.3.4 main /var/www/haven_service haven-service
EOF
}

if [ "$#" -lt 1 ]; then
  usage
  exit 1
fi

SSH_TARGET="$1"
BRANCH="${2:-main}"
APP_DIR="${3:-/var/www/haven_service}"
APP_NAME="${4:-haven-service}"

ssh "$SSH_TARGET" "bash -s" -- "$BRANCH" "$APP_DIR" "$APP_NAME" <<'REMOTE'
set -euo pipefail

BRANCH="$1"
APP_DIR="$2"
APP_NAME="$3"

run_as_root() {
  if [ "$(id -u)" -eq 0 ]; then
    "$@"
  else
    sudo "$@"
  fi
}

if [ ! -d "$APP_DIR/.git" ]; then
  echo "Missing repo at $APP_DIR"
  echo "Run bootstrap first."
  exit 1
fi

cd "$APP_DIR"
run_as_root git fetch origin "$BRANCH"
run_as_root git checkout "$BRANCH"
run_as_root git pull --ff-only origin "$BRANCH"

if [ -f package-lock.json ]; then
  run_as_root npm ci
else
  run_as_root npm install
fi

run_as_root npm run build

if run_as_root pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  run_as_root pm2 restart "$APP_NAME" --update-env
else
  run_as_root pm2 start npm --name "$APP_NAME" -- start
fi

run_as_root pm2 save

echo "Deploy complete. App: $APP_NAME"
REMOTE

echo "Done: deploy finished on $SSH_TARGET"
