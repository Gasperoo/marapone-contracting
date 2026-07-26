import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      // publicDir is copied verbatim, so anything dropped into public/ ships to
      // production. Strip OS cruft and raw camera/screen-capture originals from
      // the bundle — they are source material, never site assets.
      name: 'strip-non-web-assets',
      apply: 'build',
      closeBundle() {
        const outDir = path.resolve(__dirname, 'dist');
        const junk = /(^\.DS_Store$|\.mov$|^Thumbs\.db$|-original\.(mp4|mov)$)/i;
        let removed = 0, bytes = 0;
        const walk = (dir) => {
          for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) { walk(full); continue; }
            if (!junk.test(entry.name)) continue;
            bytes += fs.statSync(full).size;
            fs.unlinkSync(full);
            removed++;
          }
        };
        if (fs.existsSync(outDir)) walk(outDir);
        if (removed) {
          console.log(`[strip-non-web-assets] removed ${removed} file(s), ${(bytes / 1e6).toFixed(1)} MB from dist/`);
        }
      },
    },
    {
      // The construction homepage is the site root. Emit it at dist/index.html
      // rather than relying on a host rewrite: GitHub Pages is configured for
      // marapone.com as a standby and cannot read vercel.json, so a rewrite-only
      // root would 404 there. Every asset reference in the built file is
      // absolute, so the same bytes work at / and at /construction/.
      name: 'construction-index-at-root',
      apply: 'build',
      closeBundle() {
        const from = path.resolve(__dirname, 'dist/construction/index.html');
        const to = path.resolve(__dirname, 'dist/index.html');
        if (!fs.existsSync(from)) {
          this.error('construction/index.html missing from the build — the site root would 404');
        }
        fs.copyFileSync(from, to);
        console.log('[construction-index-at-root] wrote dist/index.html');
      },
    },
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
          '/shop': '/shop.html',
          '/construction/maraponeai': '/construction/maraponeai.html',
          '/logistics/maraponeai': '/logistics/maraponeai.html',
          // construction subdirectory — its index now lives at the site root
          '/': '/construction/index.html',
          '/construction/how-it-works': '/construction/how-it-works.html',
          '/construction/services': '/construction/services.html',
          '/construction/work': '/construction/work.html',
          '/construction/faq': '/construction/faq.html',
          '/construction/contact': '/construction/contact.html',
          '/construction/discovery': '/construction/discovery.html',
          '/construction/about': '/construction/about.html',
          '/construction/pricing': '/construction/pricing.html',
          '/construction/blueprint-auditor': '/construction/blueprint-auditor.html',
          '/construction/ai-estimator': '/construction/ai-estimator.html',
          '/construction/scopeguard': '/construction/scopeguard.html',
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
          // Hardware requirements
          '/construction/hardware': '/construction/hardware.html',
          '/logistics/hardware': '/logistics/hardware.html',
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
          // The landing/chooser page is gone and the construction homepage is
          // now the site root, so the old /construction URL folds into `/`.
          // Mirrors the permanent redirects in vercel.json so dev matches prod.
          if (url === '/construction' || url === '/construction/' || url === '/index.html') {
            res.statusCode = 308;
            res.setHeader('Location', '/');
            res.end();
            return;
          }
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
        // Root pages. There is no index.html source file: the landing / chooser
        // page is gone, and dist/index.html is emitted by the
        // construction-index-at-root plugin above.
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
        shop: path.resolve(__dirname, 'shop.html'),
        'construction-maraponeai': path.resolve(__dirname, 'construction/maraponeai.html'),
        'logistics-maraponeai': path.resolve(__dirname, 'logistics/maraponeai.html'),
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
        'construction-blueprint-auditor': path.resolve(__dirname, 'construction/blueprint-auditor.html'),
        'construction-ai-estimator': path.resolve(__dirname, 'construction/ai-estimator.html'),
        'construction-scopeguard': path.resolve(__dirname, 'construction/scopeguard.html'),
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
        // Tier 1/2: Proof tools + security pack
        'c-sample-assessment':         path.resolve(__dirname, 'construction/sample-assessment.html'),
        'c-roi-calculator':            path.resolve(__dirname, 'construction/roi-calculator.html'),
        'c-security-pack':             path.resolve(__dirname, 'construction/security-pack.html'),
        'l-sample-assessment':         path.resolve(__dirname, 'logistics/sample-assessment.html'),
        'l-roi-calculator':            path.resolve(__dirname, 'logistics/roi-calculator.html'),
        'l-security-pack':             path.resolve(__dirname, 'logistics/security-pack.html'),
        // Live demo pages — construction's runs inline on the Blueprint Auditor.
        'l-demo':                      path.resolve(__dirname, 'logistics/demo.html'),
        // Hardware requirements
        'c-hardware':                  path.resolve(__dirname, 'construction/hardware.html'),
        'l-hardware':                  path.resolve(__dirname, 'logistics/hardware.html'),
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
