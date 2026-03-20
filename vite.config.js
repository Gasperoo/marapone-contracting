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
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'about.html'),
        'how-it-works': path.resolve(__dirname, 'how-it-works.html'),
        pricing: path.resolve(__dirname, 'pricing.html'),
        contact: path.resolve(__dirname, 'contact.html'),
        services: path.resolve(__dirname, 'services.html'),
        privacy: path.resolve(__dirname, 'privacy.html'),
        terms: path.resolve(__dirname, 'terms.html'),
        cookies: path.resolve(__dirname, 'cookies.html'),
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
