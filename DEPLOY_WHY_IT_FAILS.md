# Why GitHub Isn’t Deploying Changes

Use this checklist in order. The workflow was updated (Node/npm + permissions) so deploy can succeed once these are correct.

---

## 1. Are you actually pushing to `main`?

The workflow **only runs on push to the `main` branch**.

- Open your repo on GitHub → **Code** → switch branch to **main**.
- Check the **latest commit** on main. Is it the one you expect?
- If the latest commit on GitHub is old, your new code **never reached GitHub**. You need to push from your machine:

```bash
cd /Users/gasper/marapone-contracting
git checkout main
git pull origin main
git push origin main
```

If you develop in a worktree, commit there, push that branch, then **merge into main** in the main repo and **push main** (see above). Until `main` on GitHub is updated, the workflow won’t run and nothing will deploy.

---

## 2. GitHub Pages source

- Repo → **Settings** → **Pages** (left sidebar).
- **Build and deployment**:
  - **Source**: **Deploy from a branch** (this workflow pushes to `gh-pages`).
  - **Branch**: **gh-pages** and **/ (root)**.
- Click **Save** if you changed anything.

---

## 3. Workflow ran and succeeded

- Repo → **Actions**.
- Open the latest **“Deploy to GitHub Pages”** run.
- If there is **no run** after your last push → push to `main` didn’t happen or didn’t trigger (see step 1).
- If the run is **red (failed)** → open it and expand the failed step (e.g. “Install dependencies” or “Build”) and fix the error.
- If the run is **green** → deploy happened; wait 1–2 minutes and refresh the site.

---

## 4. Where the site is served

- **Custom domain (marapone.com):** DNS must point the domain to GitHub Pages (see GitHub’s custom domain docs). The workflow sets `cname: marapone.com`.
- **GitHub URL:** If you didn’t set a custom domain, the site is at  
  `https://<your-username>.github.io/<repo-name>/`  
  (Settings → Pages shows the exact URL.)

---

## 5. Get the workflow fix onto GitHub

This repo’s workflow was updated (Node/npm, permissions). To use it:

1. Commit and push the updated workflow from your current worktree, **then** merge/push to `main` (see step 1).
2. After that, the next push to `main` will run the new workflow and deploy.

If deployment still doesn’t update after a green run, say what you see in **Settings → Pages** and **Actions** (e.g. “no runs”, “run failed at step X”, “run green but site old”) and we can narrow it down.
