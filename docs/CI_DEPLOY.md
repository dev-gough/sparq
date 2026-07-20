# sparqsys — CI / lab deploy

Automated pipeline:

```text
git push origin master
  → Gitea Actions (npm ci + next build on ubuntu-latest)
  → host deploy on labserver (label: labserver)
  → /home/server/bin/deploy-sparqsys.sh
  → npm ci + build + systemctl restart sparqsys
```

Pre-redesign site is preserved on branch **`old_design`**. Lab deploys track **`master`**.

## Lab host prerequisites

1. **Gitea Actions** enabled; runner has labels `ubuntu-latest` and `labserver:host`.
2. **Deploy script** installed:

   ```bash
   install -m 755 scripts/deploy-sparqsys.sh /home/server/bin/deploy-sparqsys.sh
   ```

3. **Passwordless sudo** for the `server` user (exact path `/usr/bin/systemctl`):

   ```sudoers
   server ALL=(root) NOPASSWD: /usr/bin/systemctl restart sparqsys
   server ALL=(root) NOPASSWD: /usr/bin/systemctl is-active sparqsys
   server ALL=(root) NOPASSWD: /usr/bin/systemctl status sparqsys
   ```

   Verify:

   ```bash
   sudo -n /usr/bin/systemctl is-active sparqsys
   ```

4. App checkout at `/home/server/sparqsys` with `origin` → Gitea remote.
   `.env.local` and `logs/` are preserved (`git reset --hard` does not delete ignored files).

5. **`LOG_DIR` should be set in production** (email/app/Next logs + Control Center ops export).
   Set in the host `.env.local` (or systemd `Environment=`), for example:

   ```bash
   LOG_DIR=/home/server/sparqsys/logs
   # or: LOG_DIR=/var/log/sparqsys
   ```

   If unset, the process still starts and falls back to `./logs`, but logs a loud error and
   `/api/health` reports `log_dir` as degraded. Prefer setting it so ops export paths are stable.

## Manual deploy

```bash
/home/server/bin/deploy-sparqsys.sh
```

## Do not use `sudo npm`

If `npm run build` only works with `sudo`, the tree has **root-owned** files under
`.next/` and/or `node_modules/` (from a past `sudo npm …` or the old Actions
workflow that `sudo cp`/`sudo find -delete`'d into the deploy dir).

That is a permissions problem, not a Next.js quirk. Fix ownership, then always
build as `server`:

```bash
sudo chown -R server:server /home/server/sparqsys
# if builds still look stale:
# sudo rm -rf /home/server/sparqsys/.next /home/server/sparqsys/node_modules
cd /home/server/sparqsys
npm ci
npm run build
sudo systemctl restart sparqsys   # only systemctl needs sudo
```

Never `sudo npm install` / `sudo npm run build` — it re-poisons the tree.

## Health check

Post-deploy probe hits `http://127.0.0.1:8080/` (public homepage).  
`/api/health` requires a token and is not used as the gate.

## Workflow source

See [`.gitea/workflows/ci-deploy.yml`](../.gitea/workflows/ci-deploy.yml).

The legacy `.gitea/workflows/deploy.yml` (Docker job that wiped the host tree) was replaced by this pipeline.
