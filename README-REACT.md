# React Setup for Marapone Contracting

This project has been converted from vanilla JavaScript/HTML to React with Vite.

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

3. **Build for production**:
   ```bash
   npm run build
   ```
   Output will be in the `dist/` folder

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.jsx      # Navigation header with dropdowns
│   ├── Layout.jsx      # Main layout wrapper
│   └── LiquidEther.jsx # LiquidEther animation wrapper
├── context/             # React Context for state management
│   ├── AuthContext.jsx  # Authentication state
│   └── CartContext.jsx  # Shopping cart state
├── pages/               # Page components
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── ContactPage.jsx
│   └── ... (all other pages)
├── App.jsx              # Main app component with routing
└── main.jsx             # React entry point

public/                  # Static assets
├── styles.css
├── logo.png
├── LiquidEther-cdn.js
└── ... (other assets)
```

## Features

- ✅ React Router for navigation
- ✅ Context API for state management (cart & auth)
- ✅ All 17 pages converted to React components
- ✅ LiquidEther animation integrated
- ✅ Click-outside handlers for dropdowns
- ✅ 404 page for unknown routes
- ✅ Form validation
- ✅ localStorage integration
- ✅ Error boundaries for graceful error handling
- ✅ Lazy loading for service pages (reduces initial bundle size)
- ✅ GitHub Pages deployment ready
- ✅ GitHub Actions CI/CD workflow

## Deployment

### GitHub Pages

#### Option 1: Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Update GitHub Pages settings to serve from `/dist` folder

3. If deploying to a subdirectory, create a `.env` file:
   ```bash
   VITE_BASE_PATH=/your-repo-name/
   ```
   Then rebuild:
   ```bash
   npm run build
   ```

#### Option 2: Automatic Deployment (GitHub Actions)

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically:
- Builds the project on every push to `main`
- Deploys to GitHub Pages
- Configures the CNAME for marapone.com

To use it:
1. Ensure GitHub Actions is enabled in your repository settings
2. Push to the `main` branch
3. The workflow will automatically build and deploy

### Environment Variables

Create a `.env` file in the root directory to configure the base path:
```bash
# For root domain
VITE_BASE_PATH=/

# For subdirectory
VITE_BASE_PATH=/marapone-contracting/
```

## Issues Fixed

- ✅ Dropdown menus now close when clicking outside
- ✅ 404 page added for unknown routes
- ✅ Proper cleanup for LiquidEther component
- ✅ All static assets in public folder
- ✅ Proper React Router configuration
- ✅ Error boundaries for better error handling
- ✅ Lazy loading for service pages (performance optimization)
- ✅ GitHub Pages deployment configuration
- ✅ GitHub Actions workflow for automatic deployment

## Notes

- The original vanilla JS files are still in the repo but not used by React
- CSS styles work as-is (no changes needed)
- All functionality from the original site is preserved
