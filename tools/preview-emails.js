/**
 * Renders every Marapone email to static HTML under emails/preview/ so you can
 * open them in a browser and eyeball the design before sending.
 *
 *   node tools/preview-emails.js
 *   open emails/preview/index.html
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { welcomeEmail, CAMPAIGNS } from '../lib/email-brand.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'emails', 'preview');
mkdirSync(OUT, { recursive: true });

// Welcome uses a sample code purely for previewing.
const all = {
  welcome: welcomeEmail({ code: 'WELCOME-7F3K9Q', vertical: 'construction' }),
  ...Object.fromEntries(Object.entries(CAMPAIGNS).map(([k, fn]) => [k, fn()])),
};

const links = [];
for (const [key, { subject, html }] of Object.entries(all)) {
  const file = `${key}.html`;
  writeFileSync(join(OUT, file), html);
  links.push(`<li><a href="${file}">${key}</a> <span>${subject.replace(/</g, '&lt;')}</span></li>`);
  console.log(`✓ ${file.padEnd(24)} ${subject}`);
}

writeFileSync(join(OUT, 'index.html'), `<!doctype html><meta charset="utf-8">
<title>Marapone email previews</title>
<style>body{background:#0a0a0a;color:#e8e8e8;font:15px/1.6 'DM Sans',system-ui,sans-serif;max-width:640px;margin:48px auto;padding:0 20px}
h1{font-family:'Bebas Neue',sans-serif;letter-spacing:3px;font-weight:400;font-size:40px}
h1 span{color:#f97316}ul{list-style:none;padding:0}li{border:1px solid #2e2e2e;border-radius:8px;padding:14px 18px;margin:10px 0}
a{color:#fb923c;text-decoration:none;font-weight:600}span{display:block;color:#a0a0a0;font-size:13px;margin-top:3px}</style>
<h1>MARA<span>PONE</span> · EMAIL PREVIEWS</h1>
<ul>${links.join('\n')}</ul>`);

console.log(`\nOpen: emails/preview/index.html  (${Object.keys(all).length} emails)`);
