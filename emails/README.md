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

- **With Stripe configured** (`STRIPE_SECRET_KEY` set): it creates a real,
  **unique, single-use** promotion code (e.g. `WELCOME-7F3K9Q`) off a shared
  10% coupon, expiring in 30 days. The coupon is auto-created once as
  `mailing-welcome-10`.
- **Without Stripe / on error**: it falls back to the static code
  `WELCOME_PROMO_CODE` (default `MARAPONE10`) so the email always has a code.

### One-time Stripe step to make codes redeemable

The codes only apply if your checkout accepts promotion codes:

1. **Payment Links** (what the site uses): open each package's Payment Link in
   the Stripe dashboard → **enable "Allow promotion codes"**.
2. If you prefer one shared code instead of unique ones, create a coupon in
   Stripe with a promotion code matching `WELCOME_PROMO_CODE` and leave
   `STRIPE_SECRET_KEY` out of the newsletter function — the fallback will show
   that code.

## Environment variables

| Var | Used for | Required? |
|-----|----------|-----------|
| `RESEND_API_KEY` | Sending all email | Yes |
| `RESEND_AUDIENCE_ID` | The mailing list (add contacts + broadcasts) | For list/broadcasts |
| `STRIPE_SECRET_KEY` | Unique welcome codes | Optional (falls back) |
| `WELCOME_PROMO_CODE` | Static fallback code | Optional (default `MARAPONE10`) |

> Note: `RESEND_AUDIENCE_ID` isn't in `.env` yet. Create an Audience in Resend,
> copy its ID, and add it (locally **and** in Vercel) to enable list signups and
> campaign sends. Without it, the welcome email still sends; contacts just won't
> be stored.

## Editing copy

All copy lives in `lib/email-brand.js` in the `welcomeEmail` /
`whatWeDoEmail` / `howItWorksEmail` / `dataNeverLeavesEmail` builders. They
compose from helpers (`heading`, `p`, `label`, `button`, `couponBox`, `steps`,
`checklist`, …). Add a new campaign by writing a builder that returns
`{ subject, html }` and registering it in the `CAMPAIGNS` map.
