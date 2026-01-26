# GitHub Actions Setup Guide

## ✅ Workflow File Status

The GitHub Actions workflow file is already created and committed:
- **Location**: `.github/workflows/deploy.yml`
- **Status**: ✅ Ready to use

## How to Enable GitHub Actions

### Step 1: Push the Code to GitHub

Once your network connection is restored, push all commits:
```bash
cd /Users/gasper/marapone-contracting
git push
```

### Step 2: Enable GitHub Actions in Repository Settings

1. Go to your repository on GitHub: `https://github.com/gasperoo/marapone-contracting`
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Actions** → **General**
4. Under **Actions permissions**, select:
   - ✅ **Allow all actions and reusable workflows**
   - OR
   - ✅ **Allow local actions and reusable workflows**
5. Scroll down to **Workflow permissions**:
   - ✅ Select **Read and write permissions**
   - ✅ Check **Allow GitHub Actions to create and approve pull requests**
6. Click **Save**

### Step 3: Configure GitHub Pages

1. Still in **Settings**, click **Pages** (left sidebar)
2. Under **Source**, select:
   - **Source**: `Deploy from a branch`
   - **Branch**: `gh-pages` (this will be created by the workflow)
   - **Folder**: `/ (root)`
3. Click **Save**

### Step 4: Verify the Workflow

1. Go to the **Actions** tab in your repository
2. You should see the workflow run automatically after pushing to `main`
3. The workflow will:
   - Install dependencies
   - Build the React app
   - Deploy to GitHub Pages
   - Configure CNAME for marapone.com

## Workflow Details

The workflow (`.github/workflows/deploy.yml`) will:

- **Trigger**: Automatically on every push to `main` branch
- **Build**: React app using Vite
- **Deploy**: Output to GitHub Pages
- **CNAME**: Automatically configure `marapone.com`

## Troubleshooting

### If the workflow doesn't run:

1. **Check Actions tab**: Go to `https://github.com/gasperoo/marapone-contracting/actions`
2. **Check if Actions are enabled**: Repository Settings → Actions → General
3. **Check workflow file**: Ensure `.github/workflows/deploy.yml` exists in the repository
4. **Check branch**: Workflow only runs on `main` branch

### If deployment fails:

1. **Check build logs**: Click on the failed workflow run to see error messages
2. **Common issues**:
   - Missing dependencies (should be fixed with `npm ci`)
   - Build errors (check React code)
   - Permission issues (ensure workflow has write permissions)

### If the site doesn't load:

1. **Wait a few minutes**: GitHub Pages can take 1-5 minutes to update
2. **Check CNAME**: Ensure `marapone.com` is configured in repository settings
3. **Check DNS**: Ensure your domain DNS points to GitHub Pages IPs

## Manual Deployment (Alternative)

If you prefer manual deployment:

1. Build locally:
   ```bash
   npm run build
   ```

2. Push the `dist/` folder to `gh-pages` branch manually

3. Configure GitHub Pages to serve from `gh-pages` branch

## Current Configuration

- **Base Path**: `/` (for root domain)
- **Build Output**: `dist/`
- **CNAME**: `marapone.com`
- **Node Version**: 18
- **Deploy Branch**: `gh-pages` (auto-created)
