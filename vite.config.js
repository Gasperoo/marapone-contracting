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
          '/construction/about': '/construction/about.html',
          '/construction/pricing': '/construction/pricing.html',
          // logistics subdirectory
          '/logistics': '/logistics/index.html',
          '/logistics/how-it-works': '/logistics/how-it-works.html',
          '/logistics/services': '/logistics/services.html',
          '/logistics/work': '/logistics/work.html',
          '/logistics/faq': '/logistics/faq.html',
          '/logistics/contact': '/logistics/contact.html',
          '/logistics/discovery': '/logistics/discovery.html',
          '/logistics/about': '/logistics/about.html',
          '/logistics/pricing': '/logistics/pricing.html',
          // Construction industry sub-pages
          '/construction/for/general-contractors': '/construction/for/general-contractors.html',
          '/construction/for/ici': '/construction/for/ici.html',
          '/construction/for/estimators': '/construction/for/estimators.html',
          '/construction/for/owners-reps': '/construction/for/owners-reps.html',
          '/construction/for/subcontractors': '/construction/for/subcontractors.html',
          // Logistics industry sub-pages
          '/logistics/for/freight-brokers': '/logistics/for/freight-brokers.html',
          '/logistics/for/3pls': '/logistics/for/3pls.html',
          '/logistics/for/customs-brokers': '/logistics/for/customs-brokers.html',
          '/logistics/for/importers': '/logistics/for/importers.html',
          '/logistics/for/forwarders': '/logistics/for/forwarders.html',
          // Architecture / Integrations / Trust
          '/construction/architecture': '/construction/architecture.html',
          '/construction/integrations': '/construction/integrations.html',
          '/construction/trust': '/construction/trust.html',
          '/logistics/architecture': '/logistics/architecture.html',
          '/logistics/integrations': '/logistics/integrations.html',
          '/logistics/trust': '/logistics/trust.html',
          // Comparison pages
          '/construction/vs/procore': '/construction/vs/procore.html',
          '/construction/vs/autodesk': '/construction/vs/autodesk.html',
          '/construction/vs/document-crunch': '/construction/vs/document-crunch.html',
          '/construction/vs/chatgpt': '/construction/vs/chatgpt.html',
          '/logistics/vs/project44': '/logistics/vs/project44.html',
          '/logistics/vs/descartes': '/logistics/vs/descartes.html',
          '/logistics/vs/flexport': '/logistics/vs/flexport.html',
          '/logistics/vs/in-house-build': '/logistics/vs/in-house-build.html',
          // Resources hub + articles
          '/construction/resources': '/construction/resources/index.html',
          '/construction/resources/rfi-ai-vs-procore-ai': '/construction/resources/rfi-ai-vs-procore-ai.html',
          '/construction/resources/scope-a-blueprint-auditor': '/construction/resources/scope-a-blueprint-auditor.html',
          '/construction/resources/own-vs-rent-ai-for-gcs': '/construction/resources/own-vs-rent-ai-for-gcs.html',
          '/construction/resources/cost-of-private-llm-stack-2026': '/construction/resources/cost-of-private-llm-stack-2026.html',
          '/construction/resources/sample-handover-walkthrough': '/construction/resources/sample-handover-walkthrough.html',
          '/logistics/resources': '/logistics/resources/index.html',
          '/logistics/resources/invoice-audit-build-vs-buy': '/logistics/resources/invoice-audit-build-vs-buy.html',
          '/logistics/resources/gdpr-safe-ai-for-eu-customs': '/logistics/resources/gdpr-safe-ai-for-eu-customs.html',
          '/logistics/resources/private-tms-integrated-ai': '/logistics/resources/private-tms-integrated-ai.html',
          '/logistics/resources/what-owning-the-model-means': '/logistics/resources/what-owning-the-model-means.html',
          '/logistics/resources/sample-carrier-scorecard': '/logistics/resources/sample-carrier-scorecard.html',
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
        'construction-about': path.resolve(__dirname, 'construction/about.html'),
        'construction-pricing': path.resolve(__dirname, 'construction/pricing.html'),
        // Logistics subdirectory
        'logistics-index': path.resolve(__dirname, 'logistics/index.html'),
        'logistics-how-it-works': path.resolve(__dirname, 'logistics/how-it-works.html'),
        'logistics-services': path.resolve(__dirname, 'logistics/services.html'),
        'logistics-work': path.resolve(__dirname, 'logistics/work.html'),
        'logistics-faq': path.resolve(__dirname, 'logistics/faq.html'),
        'logistics-contact': path.resolve(__dirname, 'logistics/contact.html'),
        'logistics-discovery': path.resolve(__dirname, 'logistics/discovery.html'),
        'logistics-about': path.resolve(__dirname, 'logistics/about.html'),
        'logistics-pricing': path.resolve(__dirname, 'logistics/pricing.html'),
        // Construction industry sub-pages
        'construction-for-gc':         path.resolve(__dirname, 'construction/for/general-contractors.html'),
        'construction-for-ici':        path.resolve(__dirname, 'construction/for/ici.html'),
        'construction-for-est':        path.resolve(__dirname, 'construction/for/estimators.html'),
        'construction-for-or':         path.resolve(__dirname, 'construction/for/owners-reps.html'),
        'construction-for-sub':        path.resolve(__dirname, 'construction/for/subcontractors.html'),
        // Logistics industry sub-pages
        'logistics-for-fb':            path.resolve(__dirname, 'logistics/for/freight-brokers.html'),
        'logistics-for-3pl':           path.resolve(__dirname, 'logistics/for/3pls.html'),
        'logistics-for-cb':            path.resolve(__dirname, 'logistics/for/customs-brokers.html'),
        'logistics-for-imp':           path.resolve(__dirname, 'logistics/for/importers.html'),
        'logistics-for-fwd':           path.resolve(__dirname, 'logistics/for/forwarders.html'),
        // Tier 2: Architecture / Integrations / Trust
        'c-architecture':              path.resolve(__dirname, 'construction/architecture.html'),
        'c-integrations':              path.resolve(__dirname, 'construction/integrations.html'),
        'c-trust':                     path.resolve(__dirname, 'construction/trust.html'),
        'l-architecture':              path.resolve(__dirname, 'logistics/architecture.html'),
        'l-integrations':              path.resolve(__dirname, 'logistics/integrations.html'),
        'l-trust':                     path.resolve(__dirname, 'logistics/trust.html'),
        // Tier 2: Comparison pages
        'c-vs-procore':                path.resolve(__dirname, 'construction/vs/procore.html'),
        'c-vs-autodesk':               path.resolve(__dirname, 'construction/vs/autodesk.html'),
        'c-vs-dc':                     path.resolve(__dirname, 'construction/vs/document-crunch.html'),
        'c-vs-chatgpt':                path.resolve(__dirname, 'construction/vs/chatgpt.html'),
        'l-vs-p44':                    path.resolve(__dirname, 'logistics/vs/project44.html'),
        'l-vs-descartes':              path.resolve(__dirname, 'logistics/vs/descartes.html'),
        'l-vs-flexport':               path.resolve(__dirname, 'logistics/vs/flexport.html'),
        'l-vs-inhouse':                path.resolve(__dirname, 'logistics/vs/in-house-build.html'),
        // Tier 2: Resources hub + articles
        'c-res':                       path.resolve(__dirname, 'construction/resources/index.html'),
        'c-res-1':                     path.resolve(__dirname, 'construction/resources/rfi-ai-vs-procore-ai.html'),
        'c-res-2':                     path.resolve(__dirname, 'construction/resources/scope-a-blueprint-auditor.html'),
        'c-res-3':                     path.resolve(__dirname, 'construction/resources/own-vs-rent-ai-for-gcs.html'),
        'c-res-4':                     path.resolve(__dirname, 'construction/resources/cost-of-private-llm-stack-2026.html'),
        'c-res-5':                     path.resolve(__dirname, 'construction/resources/sample-handover-walkthrough.html'),
        'l-res':                       path.resolve(__dirname, 'logistics/resources/index.html'),
        'l-res-1':                     path.resolve(__dirname, 'logistics/resources/invoice-audit-build-vs-buy.html'),
        'l-res-2':                     path.resolve(__dirname, 'logistics/resources/gdpr-safe-ai-for-eu-customs.html'),
        'l-res-3':                     path.resolve(__dirname, 'logistics/resources/private-tms-integrated-ai.html'),
        'l-res-4':                     path.resolve(__dirname, 'logistics/resources/what-owning-the-model-means.html'),
        'l-res-5':                     path.resolve(__dirname, 'logistics/resources/sample-carrier-scorecard.html'),
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
