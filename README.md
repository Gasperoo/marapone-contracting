# Marapone Contracting Inc. - React Website

A modern, performant React website built with best practices, featuring a full-screen LiquidEther background animation.

## 🚀 Features

- **React 18** with Vite for fast development and builds
- **Full-screen LiquidEther background** - Optimized WebGL fluid simulation
- **Responsive design** - Works seamlessly on all devices
- **Performance optimized** - Lazy loading, code splitting, optimized builds
- **Error boundaries** - Graceful error handling
- **Clean architecture** - Modular, maintainable code structure

## 📁 Project Structure

```
marapone-contracting/
├── public/                 # Static assets
│   ├── LiquidEther-cdn.js  # WebGL fluid simulation
│   ├── logo.png            # Company logo
│   └── styles.css          # Global styles
├── src/
│   ├── components/         # Reusable components
│   │   ├── ErrorBoundary.jsx
│   │   └── LiquidEtherBackground.jsx
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   └── NotFoundPage.jsx
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # React entry point
│   └── index.css           # Base styles
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

## 🛠️ Setup

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Key Features Explained

### Full-Screen LiquidEther Background

- **Fixed positioning** - Stays in place during scroll
- **Performance optimized** - Lower resolution for full-screen use
- **Lazy loaded** - Only loads when needed
- **Responsive** - Adapts to all screen sizes
- **Non-intrusive** - Pointer events disabled so content is clickable

### React Best Practices

1. **Error Boundaries** - Catches and handles React errors gracefully
2. **Code Splitting** - Ready for lazy loading when pages are added
3. **Optimized Builds** - Vendor chunks separated for better caching
4. **Clean Component Structure** - Single responsibility, reusable components

### Performance Optimizations

- **Lazy script loading** - LiquidEther loads asynchronously
- **Optimized Vite config** - Fast builds and HMR
- **Efficient rendering** - Minimal re-renders with proper React patterns
- **Asset optimization** - Images and assets in public folder

## 🔧 Configuration

### Environment Variables

Create a `.env` file for deployment:

```bash
# For root domain
VITE_BASE_PATH=/

# For subdirectory (e.g., GitHub Pages)
VITE_BASE_PATH=/marapone-contracting/
```

### LiquidEther Options

Customize the background in `HomePage.jsx`:

```jsx
<LiquidEtherBackground
  options={{
    mouseForce: 20,
    cursorSize: 100,
    resolution: 0.5, // Lower = better performance
    autoDemo: true,
    colors: ['#5227FF', '#FF9FFC', '#B19EEF'],
  }}
/>
```

## 📦 Dependencies

- **react** ^18.2.0 - UI library
- **react-dom** ^18.2.0 - React DOM renderer
- **react-router-dom** ^6.20.0 - Client-side routing
- **vite** ^5.0.8 - Build tool and dev server

## 🚀 Deployment

### GitHub Pages

1. Build the project: `npm run build`
2. Configure GitHub Pages to serve from `/dist` folder
3. Set custom domain if needed

### GitHub Actions

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys on push to `main`.

## 🎯 Future Enhancements

The structure is ready for:
- Additional pages (just add routes in `App.jsx`)
- State management (Context API or Redux)
- React Bits components integration
- More interactive features

## 📝 Notes

- LiquidEther is loaded from `/public/LiquidEther-cdn.js`
- All styles are in `/public/styles.css`
- The site is optimized for performance and SEO
- Mobile-first responsive design
