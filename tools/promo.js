/**
 * Manage welcome promo codes from the terminal — for honoring the 10% across
 * ALL payment methods (cheque, wire, e-transfer, in-person, Stripe).
 *
 * Because most deposits are collected offline, Stripe can't auto-enforce
 * single-use. So the flow is: VALIDATE the code, honor 10% on the project
 * total (the deposit is then calculated on the discounted amount), and REDEEM
 * (deactivate) the code so it can't be used again.
 *
 *   node tools/promo.js check  WELCOME-7F3K9Q     # is it valid? whose is it?
 *   node tools/promo.js redeem WELCOME-7F3K9Q     # mark used (deactivate) after honoring
 *   node tools/promo.js list                      # recent welcome codes
 *
 * Reads STRIPE_SECRET_KEY from the shell or local .env. Operates in whatever
 * mode the key is (test vs live).
 */

import Stripe from 'stripe';
import { readFileSync } from 'node:fs';

// Pin the same stable API version the issuer uses.
const API_VERSION = '2024-06-20';

try {
  for (const line of readFileSync(new URL('../.env', import.meta.url), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch { /* rely on shell env */ }

if (!process.env.STRIPE_SECRET_KEY) { console.error('Missing STRIPE_SECRET_KEY.'); process.exit(1); }
const sk = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: API_VERSION });
const mode = process.env.STRIPE_SECRET_KEY.startsWith('sk_live') ? 'LIVE' : 'TEST';

const [cmd, codeArg] = process.argv.slice(2);

async function findCode(code) {
  const res = await sk.promotionCodes.list({ code, limit: 1 });
  return res.data[0] || null;
}

function describe(pc, customerEmail) {
  const exp = pc.expires_at ? new Date(pc.expires_at * 1000) : null;
  const expired = exp && exp.getTime() < Date.now();
  const used = pc.max_redemptions != null && pc.times_redeemed >= pc.max_redemptions;
  const valid = pc.active && !expired && !used;
  return {
    valid, code: pc.code, percent: pc.coupon?.percent_off,
    active: pc.active, expired, used,
    expires: exp ? exp.toISOString().slice(0, 10) : '—',
    redeemed: `${pc.times_redeemed}/${pc.max_redemptions ?? '∞'}`,
    boundTo: customerEmail || (pc.customer ? pc.customer : 'not bound'),
  };
}

async function cmdCheck(code) {
  const pc = await findCode(code);
  if (!pc) { console.log(`✗ [${mode}] No such code: ${code}`); process.exit(2); }
  const email = pc.customer ? (await sk.customers.retrieve(pc.customer)).email : null;
  const d = describe(pc, email);
  console.log(`[${mode}] ${d.code} — ${d.percent}% off`);
  console.log(`  valid now   : ${d.valid ? '✓ YES — ok to honor' : '✗ NO'}`);
  console.log(`  bound to    : ${d.boundTo}   ← only honor for this person`);
  console.log(`  expires     : ${d.expires}${d.expired ? '  (EXPIRED)' : ''}`);
  console.log(`  redeemed    : ${d.redeemed}${d.used ? '  (USED UP)' : ''}`);
  console.log(`  active      : ${d.active}`);
  if (d.valid) console.log(`\n  → Honor 10% on the project total, then run:  node tools/promo.js redeem ${d.code}`);
}

async function cmdRedeem(code) {
  const pc = await findCode(code);
  if (!pc) { console.log(`✗ [${mode}] No such code: ${code}`); process.exit(2); }
  if (!pc.active) { console.log(`Already inactive (used/withdrawn): ${code}`); return; }
  await sk.promotionCodes.update(pc.id, { active: false });
  console.log(`✓ [${mode}] Redeemed & deactivated ${code}. It can no longer be used.`);
}

async function cmdList() {
  const res = await sk.promotionCodes.list({ limit: 30 });
  const ours = res.data.filter((p) => p.coupon?.id === 'mailing-welcome-10' || /^WELCOME-/.test(p.code));
  console.log(`[${mode}] ${ours.length} welcome codes (most recent first):`);
  for (const p of ours) {
    const exp = p.expires_at ? new Date(p.expires_at * 1000).toISOString().slice(0, 10) : '—';
    console.log(`  ${p.code.padEnd(16)} active:${String(p.active).padEnd(5)} used:${p.times_redeemed}/${p.max_redemptions ?? '∞'} exp:${exp}`);
  }
}

(async () => {
  if (cmd === 'check' && codeArg) return cmdCheck(codeArg.trim());
  if (cmd === 'redeem' && codeArg) return cmdRedeem(codeArg.trim());
  if (cmd === 'list') return cmdList();
  console.log('Usage:\n  node tools/promo.js check  <CODE>\n  node tools/promo.js redeem <CODE>\n  node tools/promo.js list');
  process.exit(1);
})().catch((e) => { console.error('Error:', e.message); process.exit(1); });
