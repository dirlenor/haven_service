#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  ./vps-bootstrap.sh <user@host> <repo_url> [branch] [app_dir] [app_name]

Example:
  ./vps-bootstrap.sh root@1.2.3.4 git@github.com:you/haven_service.git main /var/www/haven_service haven-service
EOF
}

if [ "$#" -lt 2 ]; then
  usage
  exit 1
fi

SSH_TARGET="$1"
REPO_URL="$2"
BRANCH="${3:-main}"
APP_DIR="${4:-/var/www/haven_service}"
APP_NAME="${5:-haven-service}"
NODE_MAJOR="${NODE_MAJOR:-20}"

ssh "$SSH_TARGET" "bash -s" -- "$REPO_URL" "$BRANCH" "$APP_DIR" "$APP_NAME" "$NODE_MAJOR" <<'REMOTE'
set -euo pipefail

REPO_URL="$1"
BRANCH="$2"
APP_DIR="$3"
APP_NAME="$4"
NODE_MAJOR="$5"

run_as_root() {
  if [ "$(id -u)" -eq 0 ]; then
    "$@"
  else
    sudo "$@"
  fi
}

export DEBIAN_FRONTEND=noninteractive
run_as_root apt-get update
run_as_root apt-get install -y git curl ca-certificates

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | run_as_root bash -
  run_as_root apt-get install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  run_as_root npm install -g pm2
fi

run_as_root mkdir -p "$(dirname "$APP_DIR")"

if [ ! -d "$APP_DIR/.git" ]; then
  run_as_root git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
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
run_as_root pm2 startup systemd -u "$(whoami)" --hp "$HOME" >/dev/null 2>&1 || true

echo "Bootstrap complete. App: $APP_NAME"
REMOTE

echo "Done: initial setup finished on $SSH_TARGET"
