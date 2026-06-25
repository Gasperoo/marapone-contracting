# Marapone email system

Branded HTML emails that match the website / invoice aesthetic — black canvas,
the MARAPONE wordmark, the orange hairline, the mono meta-strip, and the orange
"amount-due" box (reused as the discount box). No plain-text emails.

Everything is driven by one shared shell so the look stays consistent and you
only edit copy in one place.

```
lib/email-brand.js     ← the shell + components + all campaign copy  (edit here)
lib/stripe-promo.js    ← generates the unique 10%-off welcome code
api/newsletter-signup.js ← sends the welcome email on every signup
tools/preview-emails.js  ← render all emails to emails/preview/*.html
tools/send-campaign.js   ← send a campaign to the mailing list (Resend broadcast)
tools/promo.js           ← check / redeem welcome codes when honoring the 10%
tools/render-headings.js ← rasterise the Bebas Neue display headings
```

## The emails

| Key                  | When it sends            | What it is |
|----------------------|--------------------------|------------|
| `welcome`            | Automatically, on signup | First-touch welcome + **10% off first build** code |
| `what-we-do`         | You send it (campaign)   | The explainer — private AI you own outright |
| `how-it-works`       | You send it (campaign)   | The 4-step process, call → handover |
| `data-never-leaves`  | You send it (campaign)   | Trust / security piece |

## Preview before sending

```bash
node tools/preview-emails.js
open emails/preview/index.html
```

`emails/preview/` is generated (git-ignored) — re-run any time after editing copy.

## Send a campaign to the list

Campaigns go out as **Resend Broadcasts** to your audience, so each gets a
managed unsubscribe link and delivery tracking.

```bash
node tools/send-campaign.js what-we-do          # creates a DRAFT in Resend
node tools/send-campaign.js what-we-do --send    # creates AND sends now
node tools/send-campaign.js --list               # list campaign keys
```

Review the draft in the Resend dashboard first; add `--send` when happy.

## The 10% welcome offer — how it works

On every signup, `api/newsletter-signup.js` asks `lib/stripe-promo.js` for a
code:

- **With Stripe configured** (`STRIPE_SECRET_KEY` set): it creates a real promo
  code (e.g. `WELCOME-7F3K9Q`) off a shared 10% coupon (`mailing-welcome-10`,
  auto-created once), with four anti-abuse restrictions so codes can't be
  shared or reused:
  - **unique** — a fresh code string per subscriber
  - **single-use** — `max_redemptions: 1` (one redemption, ever)
  - **time-limited** — expires 30 days out
  - **per-customer** — bound to a Stripe customer created from the subscriber's
    email, so a forwarded code is rejected for anyone else
- **Without Stripe / on error**: it falls back to the static code
  `WELCOME_PROMO_CODE` (default `MARAPONE10`). Note this fallback is *not*
  unique or per-customer, so keep Stripe configured in production.

> The module pins Stripe API version `2024-06-20` — the account default
> (`2026-01-28.clover`) restructured promotion codes and rejects `coupon` on
> create.

### Honoring a code (deposit / mostly-offline flow)

Payments are mostly offline (cheque, wire, e-transfer) with Stripe as one
option, and a **deposit** is taken up front. The 10% applies to the **whole
project total**, then the deposit is calculated on the discounted amount. (The
order doesn't change the deposit: 10%-off-then-deposit-% equals
deposit-%-then-10%-off.)

Because offline payments can't be auto-enforced by Stripe, use the CLI to treat
each code as a verifiable, single-use token:

```bash
node tools/promo.js check  WELCOME-7F3K9Q   # valid? expired? whose email is it bound to?
# → honor 10% on the project total, calculate the deposit on the discounted amount
node tools/promo.js redeem WELCOME-7F3K9Q   # deactivate so it can't be reused
node tools/promo.js list                    # recent codes at a glance
```

- **Always `check` first.** Only honor a code that shows `valid: YES` and is
  **bound to the email of the person presenting it** — that's what stops sharing.
- **`redeem` once you've applied it.** This deactivates the code (single-use)
  regardless of how they paid.
- **If they pay the deposit through Stripe** instead: pick the existing customer
  with that email and add the promotion code under **Discounts** (or enable
  "Allow promotion codes" on a Payment Link and have them check out with the
  same email). Stripe then enforces single-use automatically.

## Environment variables

| Var | Used for | Required? |
|-----|----------|-----------|
| `RESEND_API_KEY` | Sending all email | Yes |
| `RESEND_AUDIENCE_ID` | The mailing list (add contacts + broadcasts) | For list/broadcasts |
| `STRIPE_SECRET_KEY` | Unique welcome codes | Optional (falls back) |
| `WELCOME_PROMO_CODE` | Static fallback code | Optional (default `MARAPONE10`) |

> `RESEND_AUDIENCE_ID` is set locally (audience "Marapone Mailing List"). It
> still needs adding in **Vercel → Settings → Environment Variables** (all
> environments) for production signups to store contacts and for broadcasts.

## Editing copy

All copy lives in `lib/email-brand.js` in the `welcomeEmail` /
`whatWeDoEmail` / `howItWorksEmail` / `dataNeverLeavesEmail` builders. They
compose from helpers (`heading`, `p`, `label`, `button`, `couponBox`, `steps`,
`checklist`, …). Add a new campaign by writing a builder that returns
`{ subject, html }` and registering it in the `CAMPAIGNS` map.
