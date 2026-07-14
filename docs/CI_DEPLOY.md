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

## Manual deploy

```bash
/home/server/bin/deploy-sparqsys.sh
```

## Health check

Post-deploy probe hits `http://127.0.0.1:8080/` (public homepage).  
`/api/health` requires a token and is not used as the gate.

## Workflow source

See [`.gitea/workflows/ci-deploy.yml`](../.gitea/workflows/ci-deploy.yml).

The legacy `.gitea/workflows/deploy.yml` (Docker job that wiped the host tree) was replaced by this pipeline.
