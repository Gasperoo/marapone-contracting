# Stripe checkout — setup & how it works

Online payments are handled by Stripe; in-person payments stay e-Transfer /
cheque / bank wire.

## What's purchasable online

| Thing | Mode | Charge (all figures **pre-tax**) |
|-------|------|--------|
| **Each of the five apps** | one-time | full **$990** |
| **The suite** (all five) | one-time | full **$3,950** |
| **Data packs** | one-time | **$59–$99** each, **$349** for the bundle |
| **Starter build** | one-time | **25% deposit** of the discounted total (balance invoiced later) |
| **Pilot build** | one-time | **35% deposit** of the discounted total (balance invoiced later) |
| **Local-machine add-on** | one-time | full **$1,000** (added to a Starter/Pilot deposit checkout) |
| **Marketing** Starter/Growth/Pro | one-time | full price |
| **Support** Flex/Annual | subscription | $249/mo or $1,750/yr |
| **Full Build / Plus** | — | **manual** (still "Get Started" → contact) |

## Tax

Nothing above includes tax, and nothing in this repo decides a tax rate. Stripe
Tax computes it from the buyer's billing address at checkout — HST for an
Ontario buyer, GST+PST in BC, the right state rate in the US, the right VAT rate
in the EU, and **zero** anywhere we hold no registration.

That last part is deliberate and is the setting most likely to surprise: Stripe
only charges tax in jurisdictions you have registered in, under
**Tax → Registrations** in the Dashboard. Until an EU/OSS or US state
registration is added there, those sales come through untaxed. That is correct
behaviour — the previous flat 13% HST rate charged *Ontario* tax to buyers in
Texas and Germany, which was not.

Set up per mode (test and live are configured separately):

1. **Tax → Settings** — origin address, default tax code, and Tax switched on.
2. **Tax → Registrations** — one per jurisdiction you must collect in.

Everything else is in code: `TAX_SPREAD` in [lib/stripe.js](lib/stripe.js) turns
on `automatic_tax`, requires a billing address (automatic tax cannot compute a
rate without one) and enables `tax_id_collection` so an EU/UK business can enter
its VAT number and get the reverse charge instead of VAT it would have to
reclaim.

Prices and math live in [lib/pricing.js](lib/pricing.js) (single source of truth,
shared by the API and the front-end widget).

## Delivering a product purchase (staged delivery)

Source code cannot be handed back, so it is not handed over until the refund
window has closed. That is what lets us offer a genuine 30-day refund *and* a
genuine ownership promise, with no licence key, activation server or kill switch
anywhere in the product.

| When | What the buyer gets |
|------|---------------------|
| On payment | The working application — fully featured, no time limit, no licence check |
| Day 31 | The complete source repository and any bundled model weights |
| Refund inside 30 days | Licence terminates, app removed, source was never delivered |

Operationally that means two sends per product order, so the webhook's "paid"
email is the trigger for the first one and the day-31 send has to be diarised.
Nothing in the app enforces any of this — deliberately. The enforcement is
simply that the second file has not been sent yet.

The wording lives in three places and must stay in step: the guarantee section
on `/construction/pricing`, the licence and refund clauses in `terms.html`, and
the shipped-products section of `security.html`.

## Finished products vs. custom builds

The two shipped applications are paid **in full** at checkout — there is nothing
to scope and delivery is immediate, so a deposit would make no sense. They skip
the build modal entirely and go straight to Stripe:

```html
<a data-checkout="product" data-product="ai-estimator">Buy the AI Estimator</a>
```

Valid `data-product` values: `blueprint-auditor`, `ai-estimator`, `pair`.
Buttons live on `/construction/pricing`, `/construction/ai-estimator` and
`/construction/blueprint-auditor`; each page must load `/checkout.js`. Every
button also carries a real `href` so it still goes somewhere useful if JS fails.

The webhook flags these as `kind: product` in the "paid" email so you know to
send the download and licence.

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
| `PACK_URL_CODE_LIBRARY` | Private storage URL for that pack's ZIP |
| `PACK_URL_ASSEMBLY_SCHEMA` | ” |
| `PACK_URL_RATE_2026` | ” |
| `PACK_URL_BID_LEVELING` | ” |
| `PACK_URL_SCOPE_CHECKLIST` | ” |
| `PACK_URL_BUNDLE` | ” |

## Data-pack delivery

Packs deliver themselves. [api/download.js](api/download.js) takes the Stripe
session id, asks Stripe whether it was actually paid, checks the purchase was a
data pack and is younger than `PACK_LINK_DAYS`, then 302s to that pack's private
storage URL. The buyer gets `/api/download?session_id=…` on the success page and
in their receipt email; they never see the storage URL, so it cannot be
forwarded or guessed.

**A pack with no `PACK_URL_*` set is not broken** — every surface degrades to the
honest "emailed within 12 hours" wording, and the internal notification says to
send it. Set that one variable and that one pack becomes an instant download,
with no other change anywhere. The packs are independent, so they can go live one
at a time.

Do not put pack files in `public/` — that directory is served to anyone who
guesses a filename. They belong in private object storage.
