# Quick Guide: Enable GitHub Actions

## ⚠️ Important Note

I cannot directly access GitHub's web interface to change settings. However, here are three ways to enable GitHub Actions:

## Option 1: Manual (Easiest - Recommended)

Once your network is restored and you've pushed:

1. **Go to**: https://github.com/gasperoo/marapone-contracting/settings/actions
2. **Enable Actions**:
   - Under "Actions permissions": Select "Allow all actions and reusable workflows"
   - Under "Workflow permissions": Select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"
   - Click **Save**

3. **Configure Pages**:
   - Go to: https://github.com/gasperoo/marapone-contracting/settings/pages
   - Source: "Deploy from a branch"
   - Branch: `gh-pages`
   - Folder: `/ (root)`
   - Click **Save**

## Option 2: Using GitHub CLI (If Installed)

```bash
# Install GitHub CLI (if not installed)
brew install gh

# Login to GitHub
gh auth login

# Run the enable script
cd /Users/gasper/marapone-contracting
./enable-github-actions.sh
```

## Option 3: Using GitHub API with Token

```bash
# Get a GitHub Personal Access Token from:
# https://github.com/settings/tokens
# (Needs: repo, workflow permissions)

export GITHUB_TOKEN=your_token_here
cd /Users/gasper/marapone-contracting
./enable-github-actions.sh
```

## What Happens After Enabling

Once enabled, the workflow will automatically:
- ✅ Run on every push to `main`
- ✅ Build your React app
- ✅ Deploy to GitHub Pages
- ✅ Configure marapone.com CNAME

## Verify It's Working

1. Push your code: `git push`
2. Go to: https://github.com/gasperoo/marapone-contracting/actions
3. You should see the workflow running automatically

## Current Status

- ✅ Workflow file: `.github/workflows/deploy.yml` (committed)
- ⏳ Actions: Need to enable in settings (after push)
- ⏳ Pages: Need to configure (after push)
