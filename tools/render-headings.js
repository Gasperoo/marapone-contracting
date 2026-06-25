/**
 * Renders every display heading in HEADINGS (lib/email-brand.js) to a tight,
 * transparent, 2x (retina) Bebas Neue PNG under public/email/h/<slug>.png, and
 * writes the size manifest to lib/heading-manifest.js.
 *
 * This is what lets the real Bebas Neue type show up in Hotmail / Gmail /
 * Outlook, which strip web-font <link>s. Re-run whenever heading text changes:
 *
 *   node tools/render-headings.js
 *
 * Uses headless Chrome over the DevTools Protocol (no extra dependencies —
 * Node's global fetch + WebSocket). Requires internet (loads Bebas from Google
 * Fonts) and a local Chrome install.
 */

import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HEADINGS, C } from '../lib/email-brand.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'email', 'h');
const MANIFEST = join(ROOT, 'lib', 'heading-manifest.js');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9333;
const SCALE = 2; // retina

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function pageHtml(h) {
  const content = h.html
    ? h.html.replace(/<i>/g, `<i style="font-style:normal;color:${C.hiviz}">`)
    : (h.text || '');
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
<style>html,body{margin:0;padding:0;background:transparent}
#t{display:inline-block;font-family:'Bebas Neue',sans-serif;font-weight:400;line-height:1;white-space:nowrap;
   font-size:${h.size}px;letter-spacing:${h.tracking || 1}px;color:${h.color || C.chalk};text-transform:uppercase;padding:3px 2px}</style>
</head><body><span id="t">${content}</span></body></html>`;
}

// Minimal CDP client over the page target's WebSocket.
class CDP {
  constructor(ws) {
    this.ws = ws; this.id = 0; this.pending = new Map(); this.handlers = new Map();
    ws.addEventListener('message', (e) => {
      const m = JSON.parse(e.data);
      if (m.id && this.pending.has(m.id)) {
        const { res, rej } = this.pending.get(m.id); this.pending.delete(m.id);
        m.error ? rej(new Error(m.error.message)) : res(m.result);
      } else if (m.method) {
        (this.handlers.get(m.method) || []).forEach((fn) => fn(m.params));
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((res, rej) => { this.pending.set(id, { res, rej }); this.ws.send(JSON.stringify({ id, method, params })); });
  }
  once(method) {
    return new Promise((res) => {
      const arr = this.handlers.get(method) || [];
      const fn = (p) => { const i = arr.indexOf(fn); if (i >= 0) arr.splice(i, 1); res(p); };
      arr.push(fn); this.handlers.set(method, arr);
    });
  }
}

async function pageWsUrl() {
  for (let i = 0; i < 80; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
      const page = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch { /* not up yet */ }
    await sleep(125);
  }
  throw new Error('Chrome DevTools endpoint never came up.');
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`,
    '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
    '--user-data-dir=' + join(ROOT, '.chrome-render-profile'), 'about:blank',
  ], { stdio: 'ignore' });

  try {
    const wsUrl = await pageWsUrl();
    const ws = new WebSocket(wsUrl);
    await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej); });
    const cdp = new CDP(ws);

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });

    const manifest = {};
    for (const [slug, h] of Object.entries(HEADINGS)) {
      const url = 'data:text/html;charset=utf-8,' + encodeURIComponent(pageHtml(h));
      const loaded = cdp.once('Page.loadEventFired');
      await cdp.send('Page.navigate', { url });
      await loaded;
      // Wait for Bebas to actually load before measuring.
      await cdp.send('Runtime.evaluate', { expression: 'document.fonts.ready.then(()=>1)', awaitPromise: true });
      await sleep(60);

      const rectRes = await cdp.send('Runtime.evaluate', {
        expression: `(()=>{const r=document.getElementById('t').getBoundingClientRect();return JSON.stringify({x:r.x,y:r.y,w:r.width,h:r.height});})()`,
        returnByValue: true,
      });
      const r = JSON.parse(rectRes.result.value);

      const shot = await cdp.send('Page.captureScreenshot', {
        format: 'png', captureBeyondViewport: true,
        clip: { x: r.x, y: r.y, width: r.w, height: r.h, scale: SCALE },
      });
      writeFileSync(join(OUT_DIR, `${slug}.png`), Buffer.from(shot.data, 'base64'));
      manifest[slug] = { w: Math.round(r.w), h: Math.round(r.h) };
      console.log(`✓ ${slug.padEnd(14)} ${manifest[slug].w}×${manifest[slug].h}  "${(h.alt || h.text || h.html || '').slice(0, 40)}"`);
    }

    writeFileSync(MANIFEST,
      '// Auto-generated by tools/render-headings.js — do not edit by hand.\n' +
      '// Maps heading slug -> { w, h } display size (CSS px) of the rendered Bebas PNG.\n' +
      'export default ' + JSON.stringify(manifest, null, 2) + ';\n');
    console.log(`\n✓ ${Object.keys(manifest).length} headings → public/email/h/  +  lib/heading-manifest.js`);
    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
