/**
 * Data-pack delivery — the thing that removes the human from the loop.
 *
 *   GET /api/download?session_id=cs_live_…
 *
 * Packs used to be delivered by a person emailing a file "within 12 hours",
 * which contradicted the page's own promise of an instant download and put a
 * manual step on every $59 sale. This endpoint is the automated path: it asks
 * Stripe whether that checkout session was actually paid, works out which pack
 * it was for, and 302s to the private storage URL for it.
 *
 * Why the session id and not a signed token: the session id IS the proof of
 * purchase, Stripe is the authority on whether it was paid, and there is no
 * secret to rotate or leak. It is bearer-ish, so three things bound it:
 *
 *   - the session must be `paid` (an expired or unpaid one gets nothing)
 *   - the purchase must be a data pack (an application purchase is a different
 *     fulfilment path and must not resolve here)
 *   - the session must be younger than PACK_LINK_DAYS
 *
 * The storage URL itself never reaches the buyer, so it cannot be forwarded.
 * Responses are marked no-store so a shared machine's cache doesn't hold the
 * redirect target.
 */

import { getStripe } from '../lib/stripe.js';
import { isDataPack } from '../lib/pricing.js';
import { packStorageUrl, PACK_LINK_DAYS } from '../lib/fulfillment.js';

const CONTACT = 'general@marapone.com';

// Deliberately plain: this is reached from an email link, sometimes months
// later, and an error here needs to tell a paying customer what to do next
// rather than render a styled page.
function fail(res, status, message) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).send(`${message}\n\nEmail ${CONTACT} and we will send it straight over.\n`);
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return fail(res, 405, 'Method not allowed.');
  }

  const sessionId = String(req.query?.session_id || '').trim();
  if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
    return fail(res, 400, 'That download link is missing its purchase reference.');
  }

  const sk = getStripe();
  if (!sk) return fail(res, 500, 'Downloads are not configured right now.');

  let session;
  try {
    session = await sk.checkout.sessions.retrieve(sessionId);
  } catch (err) {
    console.error('Download lookup failed:', err?.message || err);
    return fail(res, 404, 'We could not find that purchase.');
  }

  if (session.payment_status !== 'paid') {
    return fail(res, 402, 'That purchase has not completed, so there is nothing to download yet.');
  }

  const product = session.metadata?.product || '';
  if (!isDataPack(product)) {
    // An application purchase is delivered as a package plus a licence, and its
    // source repository follows on day 31 — none of which this endpoint serves.
    return fail(res, 400, 'That purchase is not a data pack.');
  }

  const ageDays = (Date.now() / 1000 - (session.created || 0)) / 86400;
  if (ageDays > PACK_LINK_DAYS) {
    return fail(res, 410, `This download link expired ${PACK_LINK_DAYS} days after purchase.`);
  }

  const url = packStorageUrl(product);

  // `?check=1` answers "is there a file to give this buyer?" without handing one
  // over. The success page asks first so it can show a working download button
  // or the honest hand-delivery message — it cannot read the env vars itself,
  // and rendering a button that 503s would be worse than rendering neither.
  if (String(req.query?.check || '') === '1') {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ ready: !!url, product });
  }

  if (!url) {
    // The pack is sold but its file is not live yet. Say so precisely — the
    // buyer has paid, and "not found" would read as though they had not.
    return fail(res, 503, 'This pack is being sent to you by hand and will arrive shortly.');
  }

  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Referrer-Policy', 'no-referrer');
  return res.redirect(302, url);
}
