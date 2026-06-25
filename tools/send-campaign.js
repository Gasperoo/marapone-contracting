/**
 * Send a content campaign to the Marapone mailing list (Resend audience) as a
 * Broadcast — so it gets a managed unsubscribe link and delivery tracking.
 *
 *   node tools/send-campaign.js what-we-do           # create a DRAFT broadcast
 *   node tools/send-campaign.js how-it-works --send   # create AND send now
 *   node tools/send-campaign.js --list                # list available campaigns
 *
 * Requires env: RESEND_API_KEY, RESEND_AUDIENCE_ID
 * Reads them from the shell or a local .env if present.
 */

import { Resend } from 'resend';
import { readFileSync } from 'node:fs';
import { CAMPAIGNS } from '../lib/email-brand.js';

// Minimal .env loader (no dependency) — only fills vars that aren't already set.
try {
  for (const line of readFileSync(new URL('../.env', import.meta.url), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch (_) { /* no .env — rely on the shell */ }

const args = process.argv.slice(2);
const doSend = args.includes('--send');
const name = args.find((a) => !a.startsWith('--'));

if (args.includes('--list') || !name) {
  console.log('Available campaigns:\n' + Object.keys(CAMPAIGNS).map((k) => '  • ' + k).join('\n'));
  console.log('\nUsage: node tools/send-campaign.js <name> [--send]');
  process.exit(name ? 0 : 1);
}

const builder = CAMPAIGNS[name];
if (!builder) {
  console.error(`Unknown campaign "${name}". Run with --list to see options.`);
  process.exit(1);
}
if (!process.env.RESEND_API_KEY) { console.error('Missing RESEND_API_KEY.'); process.exit(1); }
if (!process.env.RESEND_AUDIENCE_ID) { console.error('Missing RESEND_AUDIENCE_ID (your mailing list).'); process.exit(1); }

const resend = new Resend(process.env.RESEND_API_KEY);
const { subject, html } = builder();

const broadcast = await resend.broadcasts.create({
  audienceId: process.env.RESEND_AUDIENCE_ID,
  from: 'Marapone <info@marapone.com>',
  replyTo: 'general@marapone.com',
  subject,
  html,
});

if (broadcast.error) { console.error('Create failed:', broadcast.error); process.exit(1); }
const id = broadcast.data?.id;
console.log(`✓ Draft broadcast created: ${id}\n  Subject: ${subject}`);

if (doSend) {
  const sent = await resend.broadcasts.send(id);
  if (sent.error) { console.error('Send failed:', sent.error); process.exit(1); }
  console.log('✓ Sent to the audience.');
} else {
  console.log('  (draft only — review it in Resend, or re-run with --send to deliver)');
}
