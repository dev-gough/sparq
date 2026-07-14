#!/usr/bin/env bash
# Deploy sparqsys on the lab host and restart its systemd unit.
#
# Install on labserver (once):
#   install -m 755 scripts/deploy-sparqsys.sh /home/server/bin/deploy-sparqsys.sh
#
# Sudoers (exact argv match):
#   server ALL=(root) NOPASSWD: /usr/bin/systemctl restart sparqsys
#   server ALL=(root) NOPASSWD: /usr/bin/systemctl is-active sparqsys
#   server ALL=(root) NOPASSWD: /usr/bin/systemctl status sparqsys
#
# Safe for Gitea Actions host runner (label: labserver).
# Preserves .env* and logs/ (gitignored).
set -euo pipefail

APP_DIR="${APP_DIR:-/home/server/sparqsys}"
UNIT="${UNIT:-sparqsys}"
BRANCH="${BRANCH:-master}"
NODE_BIN_DIR="${NODE_BIN_DIR:-/home/server/.nvm/versions/node/v22.14.0/bin}"
SYSTEMCTL="${SYSTEMCTL:-/usr/bin/systemctl}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:8080/}"
HEALTH_RETRIES="${HEALTH_RETRIES:-30}"
HEALTH_SLEEP_SEC="${HEALTH_SLEEP_SEC:-2}"

log() { printf '==> %s\n' "$*"; }
die() { printf 'ERROR: %s\n' "$*" >&2; exit 1; }

# Passwordless sudo with pinned absolute path (matches typical sudoers drop-in).
sc() {
  if ! sudo -n "$SYSTEMCTL" "$@"; then
    die "passwordless systemctl failed: sudo -n ${SYSTEMCTL} $*
Check /etc/sudoers.d/ for user '$(id -un)' and path ${SYSTEMCTL}.
Example:
  $(id -un) ALL=(root) NOPASSWD: ${SYSTEMCTL} restart ${UNIT}
  $(id -un) ALL=(root) NOPASSWD: ${SYSTEMCTL} is-active ${UNIT}
  $(id -un) ALL=(root) NOPASSWD: ${SYSTEMCTL} status ${UNIT}"
  fi
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "missing command: $1"
}

require_cmd git
require_cmd curl
require_cmd sudo
[[ -x "$SYSTEMCTL" ]] || die "systemctl not found at $SYSTEMCTL"
[[ -d "$APP_DIR/.git" ]] || die "not a git checkout: $APP_DIR"
[[ -x "$NODE_BIN_DIR/node" ]] || die "node not found at $NODE_BIN_DIR/node"
[[ -x "$NODE_BIN_DIR/npm" ]] || die "npm not found at $NODE_BIN_DIR/npm"

export PATH="$NODE_BIN_DIR:$PATH"
log "node $(node -v) / npm $(npm -v)"
log "deploying $APP_DIR (branch=$BRANCH) → unit $UNIT"

cd "$APP_DIR"

# Root-owned .next/node_modules from past `sudo npm …` breaks non-root builds.
# Never use sudo for npm; fix ownership once instead.
if find "$APP_DIR" \( -path "$APP_DIR/node_modules/*" -o -path "$APP_DIR/.next/*" -o -path "$APP_DIR/.next" -o -path "$APP_DIR/node_modules" \) -user root -print -quit 2>/dev/null | grep -q .; then
  n_root="$(find "$APP_DIR" \( -path "$APP_DIR/node_modules/*" -o -path "$APP_DIR/.next/*" -o -path "$APP_DIR/.next" -o -path "$APP_DIR/node_modules" \) -user root 2>/dev/null | wc -l | tr -d ' ')"
  die "found ${n_root} root-owned files under .next/ or node_modules/.
This is why \`npm run build\` fails without sudo — root owns outputs from a prior
\`sudo npm install/build\` (or an old CI job that ran as root).

Fix once (as an admin), then never sudo npm again:
  sudo chown -R server:server ${APP_DIR}
  # optional hard reset of build artifacts:
  # sudo rm -rf ${APP_DIR}/.next ${APP_DIR}/node_modules
  # cd ${APP_DIR} && npm ci && npm run build"
fi

if [[ -n "$(git status --porcelain --untracked-files=no 2>/dev/null || true)" ]]; then
  log "warning: tracked files differ from HEAD before reset:"
  git status --short --untracked-files=no || true
fi

log "fetch + reset to origin/${BRANCH}"
git fetch --prune origin
git checkout "$BRANCH"
git reset --hard "origin/${BRANCH}"

log "HEAD $(git rev-parse --short HEAD) — $(git log -1 --pretty=format:'%s')"

log "install dependencies"
if [[ -f package-lock.json ]]; then
  npm ci
else
  npm install
fi

log "build"
npm run build

log "restart ${UNIT}"
sc restart "$UNIT"

log "wait for unit active"
for i in $(seq 1 20); do
  state="$(sudo -n "$SYSTEMCTL" is-active "$UNIT" 2>/dev/null || true)"
  if [[ "$state" == "active" ]]; then
    log "unit is active"
    break
  fi
  if [[ "$i" -eq 20 ]]; then
    sudo -n "$SYSTEMCTL" status "$UNIT" || true
    die "unit ${UNIT} did not become active (last state: ${state:-unknown})"
  fi
  sleep 1
done

log "health check ${HEALTH_URL}"
ok=0
for i in $(seq 1 "$HEALTH_RETRIES"); do
  code="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 5 "$HEALTH_URL" || true)"
  if [[ "$code" =~ ^[23][0-9][0-9]$ ]]; then
    log "health OK (HTTP ${code}) after ${i} attempt(s)"
    ok=1
    break
  fi
  sleep "$HEALTH_SLEEP_SEC"
done
[[ "$ok" -eq 1 ]] || die "health check failed for ${HEALTH_URL}"

log "deploy complete: $(git rev-parse --short HEAD)"
