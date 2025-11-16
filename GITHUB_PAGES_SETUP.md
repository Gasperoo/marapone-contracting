# GitHub Pages Setup Guide for marapone.com

Your local git repository is ready! Follow these steps to deploy to GitHub Pages and connect your domain.

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create an account)
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository settings:
   - **Repository name**: `marapone-contracting` (or any name you prefer)
   - **Visibility**: Public (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

## Step 2: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```bash
cd /Users/gasper/marapone-contracting

# Add the GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/marapone-contracting.git

# Push your code
git branch -M main
git push -u origin main
```

**OR** if you prefer SSH:
```bash
git remote add origin git@github.com:YOUR_USERNAME/marapone-contracting.git
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**
6. Your site will be available at: `https://YOUR_USERNAME.github.io/marapone-contracting/`

## Step 4: Configure Custom Domain (marapone.com)

### In GitHub:
1. Still in **Settings** → **Pages**
2. Under **Custom domain**, enter: `marapone.com`
3. Check **"Enforce HTTPS"** (will be available after DNS is configured)
4. Click **Save**

GitHub will automatically create/update the CNAME file (we already created it, so this will confirm it).

### In IONOS (DNS Configuration):

1. Log in to your IONOS account
2. Go to **Domains & SSL** → **Your Domains** → **marapone.com**
3. Click **DNS** or **DNS Settings**
4. You need to add these DNS records:

   **Option A: Using A Records (Recommended)**
   - Add 4 A records for the root domain:
     - Type: **A**
     - Name: **@** (or leave blank)
     - Value: `185.199.108.153`
     - TTL: 3600
   
     - Type: **A**
     - Name: **@**
     - Value: `185.199.109.153`
     - TTL: 3600
   
     - Type: **A**
     - Name: **@**
     - Value: `185.199.110.153`
     - TTL: 3600
   
     - Type: **A**
     - Name: **@**
     - Value: `185.199.111.153`
     - TTL: 3600

   **Option B: Using CNAME (Alternative)**
   - Type: **CNAME**
   - Name: **@**
   - Value: `YOUR_USERNAME.github.io`
   - TTL: 3600

   **For www subdomain:**
   - Type: **CNAME**
   - Name: **www**
   - Value: `YOUR_USERNAME.github.io`
   - TTL: 3600

5. **Save** the DNS changes

## Step 5: Wait for DNS Propagation

- DNS changes can take **24-48 hours** to propagate globally
- You can check propagation status at: [whatsmydns.net](https://www.whatsmydns.net)
- Enter `marapone.com` and check A records

## Step 6: Verify Everything Works

1. After DNS propagates, visit `marapone.com` - your site should load!
2. GitHub will automatically enable HTTPS for your custom domain
3. In GitHub Settings → Pages, you should see a green checkmark next to your domain

## Troubleshooting

- **Site not loading?** Wait longer for DNS propagation (can take up to 48 hours)
- **HTTPS not working?** Wait 24 hours after DNS is configured, then enable "Enforce HTTPS" in GitHub Pages settings
- **404 error?** Make sure your `index.html` is in the root of the repository
- **Domain not verified?** Check that the CNAME file contains exactly `marapone.com` (no www, no http://)

## Important Notes

- Keep your repository **public** for free GitHub Pages
- The CNAME file must contain only `marapone.com` (we already created this)
- Any changes you push to the `main` branch will automatically update your live site
- GitHub Pages is free and includes HTTPS certificates

## Next Steps After Setup

Once your site is live, you can:
- Update social media links in `script.js`
- Make design changes and push updates
- Your site will automatically update within a few minutes of pushing changes

