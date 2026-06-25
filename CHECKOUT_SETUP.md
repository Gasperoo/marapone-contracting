# Stripe checkout — setup & how it works

Online payments are handled by Stripe; in-person payments stay e-Transfer /
cheque / bank wire.

## What's purchasable online

| Thing | Mode | Charge |
|-------|------|--------|
| **Starter build** | one-time | **25% deposit** of the discounted, taxed total (balance invoiced later) |
| **Pilot build** | one-time | **35% deposit** of the discounted, taxed total (balance invoiced later) |
| **Local-machine add-on** | one-time | full **$1,000, no tax** (added to a Starter/Pilot deposit checkout) |
| **Marketing** Starter/Growth/Pro | one-time | full price + 13% HST |
| **Support** Flex/Annual | subscription | $499/mo or $3,500/yr + 13% HST |
| **Full Build / Plus** | — | **manual** (still "Get Started" → contact) |

Prices and math live in [lib/pricing.js](lib/pricing.js) (single source of truth,
shared by the API and the front-end widget).

## The build deposit math

`build × 1.13 (HST)` → apply welcome code (10%, build only) → that's the project
total → deposit is 25%/35% of it (due now). The add-on is added at full price,
untaxed. Balance = the rest, invoiced on completion. Example — Starter + code +
machine: $1,695 × 0.9 = $1,525.50 total; deposit $381.38 + machine $1,000 =
**$1,381.38 now**, balance $1,144.12 later.

The deposit line item has tax **baked in** (it's a % of an already-taxed total),
so Stripe shows no separate tax on it; the description spells out the breakdown.
Marketing/support use a real 13% HST tax rate so tax shows as its own line.

## Welcome codes at checkout

The build modal accepts a welcome code. The API ([api/checkout.js](api/checkout.js))
validates it via [lib/stripe-promo.js](lib/stripe-promo.js) `validateCode()`:
active, unexpired, unused, and **bound to the buyer's email** (a forwarded code
is rejected). The 10% is applied to the build, and the code is **redeemed
(deactivated) by the webhook once the deposit is actually paid** — so it's truly
single-use across the deposit + later balance.

## One-time setup

1. **Webhook** (required for auto-redeeming codes + paid notifications):
   Stripe Dashboard → Developers → Webhooks → Add endpoint
   - URL: `https://marapone.com/api/stripe-webhook`
   - Event: `checkout.session.completed`
   - Copy the signing secret → set `STRIPE_WEBHOOK_SECRET` (Vercel + `.env`).
   Without it, codes won't auto-redeem — use `node tools/promo.js redeem <CODE>`
   as the manual fallback.
2. **Live vs test:** everything was built and verified against the **test** key.
   To go live, ensure Vercel's `STRIPE_SECRET_KEY` is the **live** key and the
   webhook above is added in **live** mode. The HST tax rate is auto-created on
   first use in each mode.
3. Nothing else to create — products/prices are generated inline per checkout.

## Env vars

| Var | For |
|-----|-----|
| `STRIPE_SECRET_KEY` | Creating checkout sessions (test or live) |
| `STRIPE_WEBHOOK_SECRET` | Verifying webhook events (code redemption) |
| `RESEND_API_KEY` | "Paid" notification email to general@marapone.com |
