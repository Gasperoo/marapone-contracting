import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-rewrite',
      configureServer(server) {
        const rewrites = {
          '/about': '/about.html',
          '/pricing': '/pricing.html',
          '/how-it-works': '/how-it-works.html',
          '/contact': '/contact.html',
          '/services': '/services.html',
          '/privacy': '/privacy.html',
          '/terms': '/terms.html',
          '/cookies': '/cookies.html',
          '/work': '/work.html',
          '/faq': '/faq.html',
          '/security': '/security.html',
          '/badge': '/badge.html',
          '/discovery': '/discovery.html',
          // construction subdirectory
          '/construction': '/construction/index.html',
          '/construction/how-it-works': '/construction/how-it-works.html',
          '/construction/services': '/construction/services.html',
          '/construction/work': '/construction/work.html',
          '/construction/faq': '/construction/faq.html',
          '/construction/contact': '/construction/contact.html',
          '/construction/discovery': '/construction/discovery.html',
          // logistics subdirectory
          '/logistics': '/logistics/index.html',
          '/logistics/how-it-works': '/logistics/how-it-works.html',
          '/logistics/services': '/logistics/services.html',
          '/logistics/work': '/logistics/work.html',
          '/logistics/faq': '/logistics/faq.html',
          '/logistics/contact': '/logistics/contact.html',
          '/logistics/discovery': '/logistics/discovery.html',
        };
        server.middlewares.use((req, res, next) => {
          const url = req.url?.split('?')[0];
          if (rewrites[url]) {
            const filePath = path.resolve(__dirname, rewrites[url].slice(1));
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'text/html');
              res.end(fs.readFileSync(filePath));
              return;
            }
          }
          next();
        });
      },
    },
  ],
  base: process.env.VITE_BASE_PATH || '/',
  publicDir: 'public',
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      input: {
        // Root pages (index.html is the landing/chooser page)
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'about.html'),
        'how-it-works': path.resolve(__dirname, 'how-it-works.html'),
        pricing: path.resolve(__dirname, 'pricing.html'),
        contact: path.resolve(__dirname, 'contact.html'),
        services: path.resolve(__dirname, 'services.html'),
        privacy: path.resolve(__dirname, 'privacy.html'),
        terms: path.resolve(__dirname, 'terms.html'),
        cookies: path.resolve(__dirname, 'cookies.html'),
        work: path.resolve(__dirname, 'work.html'),
        faq: path.resolve(__dirname, 'faq.html'),
        security: path.resolve(__dirname, 'security.html'),
        badge: path.resolve(__dirname, 'badge.html'),
        discovery: path.resolve(__dirname, 'discovery.html'),
        // Construction subdirectory
        'construction-index': path.resolve(__dirname, 'construction/index.html'),
        'construction-how-it-works': path.resolve(__dirname, 'construction/how-it-works.html'),
        'construction-services': path.resolve(__dirname, 'construction/services.html'),
        'construction-work': path.resolve(__dirname, 'construction/work.html'),
        'construction-faq': path.resolve(__dirname, 'construction/faq.html'),
        'construction-contact': path.resolve(__dirname, 'construction/contact.html'),
        'construction-discovery': path.resolve(__dirname, 'construction/discovery.html'),
        // Logistics subdirectory
        'logistics-index': path.resolve(__dirname, 'logistics/index.html'),
        'logistics-how-it-works': path.resolve(__dirname, 'logistics/how-it-works.html'),
        'logistics-services': path.resolve(__dirname, 'logistics/services.html'),
        'logistics-work': path.resolve(__dirname, 'logistics/work.html'),
        'logistics-faq': path.resolve(__dirname, 'logistics/faq.html'),
        'logistics-contact': path.resolve(__dirname, 'logistics/contact.html'),
        'logistics-discovery': path.resolve(__dirname, 'logistics/discovery.html'),
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
