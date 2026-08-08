# Marapone "Data Packs" — Storefront Section
### v2 — North America & Europe coverage

Revised to reflect full regional scope: all Canadian provinces/territories, all US states, and all EU countries plus UK/Ireland — since that data already exists in the AI engine. The core structural decision this scope change forces: **each pack ships as one download covering every jurisdiction, rather than a checkout-time "pick your region" selector.** That keeps fulfillment fully automated (one file per SKU, uploaded once to the MoR platform) and turns the breadth into a selling point rather than a checkout complication.

---

## Part 1 — What Gets Carved Out (and Why It's Safe)

Same underlying principle as before: each of your five products pairs a structured reference library with an automation engine that reads the client's actual documents against it. The library is safe to sell on its own because a buyer still has to do the matching and drafting by hand — that gap is what pushes a serious buyer up to the $990 tool. Widening the library from one jurisdiction to ~90 doesn't change that logic; it just makes the pack itself a more serious dataset.

Two of the five packs are genuinely regional in structure (code and tax content differs by law). Two are largely structural and travel well across regions with light localization. One sits in between. Worth pricing and describing them accordingly rather than pretending all five scale the same way:

| Data Pack | Pulled from | Regional reality | Suggested price |
|---|---|---|---|
| **Building Code Compliance Library** — code-check rulesets as PDF + CSV, organized by jurisdiction | Blueprint Auditor | Fully regional. One folder per jurisdiction: all Canadian provinces/territories, all US states, all EU countries + UK/Ireland. | $89 |
| **Assembly Property Schema** — measurable properties per named assembly, structured JSON/CSV | SpecChecker | Regional by classification standard, not just by border. North America uses CSI MasterFormat-aligned assemblies; Europe uses EN/Eurocode-aligned equivalents. Ship both, clearly labeled — don't blend them into one "universal" schema, since they're genuinely different standards. | $89 |
| **Estimating Rate Pack** — permits, development charges/impact fees, GST/HST/PST/state sales tax, EU VAT by country, plus the contingency-risk framework | AI Estimator | Fully regional and time-sensitive — tax and fee schedules change annually per jurisdiction. Sell as a dated edition (e.g. "2026 Edition") rather than an evergreen file; re-release as a new SKU each year. | $99 |
| **Bid-Leveling Template** — scope-element checklist across trade packages, blank comparison matrix | Bid Leveler | Largely structural. Trade packages and scope elements don't vary hugely by geography — ship one template with a short region-notes tab flagging where NA and EU tendering conventions differ (e.g. bonding, retainage/retention norms). | $59 |
| **Master Scope Requirement Checklist** — master scope requirements across trade packages | ScopeGuard | Same as above — mostly structural, with a region-notes layer rather than a full rebuild per jurisdiction. | $59 |
| **The Full Data Pack Bundle** — all five | All five | — | $349 (vs. $395 separately) |

This still anchors well under any single $990 tool and far under the $3,950 full bundle — the step up should feel obvious, not required.

**Honesty check before you build these:** "broad coverage already exists" in the engine is the green light for this whole redesign — but confirm the *rate pack* specifically is current. Permit fees, development charges, and VAT rates are the fastest-decaying data you have. If any jurisdiction's numbers are more than a year old, either refresh them before shipping or exclude that jurisdiction from the initial release rather than publishing stale tax figures with your name on them.

Optional traffic play, unchanged from before: a genuinely free, stripped-down open-source script (e.g. a barebones PDF quantity extractor with no code-compliance logic) on GitHub, README linking back to Blueprint Auditor. Region breadth doesn't change this — keep it as one lightweight utility, not 90 versions of one.

---

## Part 2 — Page Copy & Structure

### Navigation
Same placement as before: add **Data Packs** to the top nav after "Pricing." No other nav changes.

### URL
`marapone.com/data-packs`

---

### Hero

> **New — Self-Serve Reference Library**
>
> ## The Data Behind the Tools. Every Region. Yours Instantly.
>
> Our AI tools run on structured libraries — code clauses, spec properties, trade scope requirements, and jurisdiction-by-jurisdiction rate tables covering all of Canada, all 50 US states, and the EU plus UK/Ireland. You can now buy that library directly: no software, no license, no account. Pick a pack, pay in your currency, and the download lands in your inbox in under a minute.
>
> **[ Browse Data Packs ]**   ·   Want it automated instead? [See the AI tools →]

Trust strip:
`Instant download · One-time price, no subscription · Charged in CAD, USD, or EUR automatically · Covers all of Canada, the US, and the EU/UK · 14-day refund, no questions asked`

---

### Product grid

**Card — Building Code Compliance Library**
> **$89 · Instant download**
> The full code-check ruleset behind Blueprint Auditor — every Canadian province and territory, all 50 US states, and every EU country plus UK/Ireland, organized by jurisdiction.
>
> What's inside:
> - One folder per jurisdiction, PDF + CSV
> - Plain-language notes on what each check is looking for
> - Built for drop-in use in your own spreadsheets or scripts
>
> Built from the same library that powers **Blueprint Auditor** — the tool applies these checks to your actual drawings automatically and cites every finding to the sheet.
>
> **[ Buy Now — $89 ]**

**Card — Assembly Property Schema**
> **$89 · Instant download**
> The structured assembly data behind SpecChecker — CSI MasterFormat-aligned assemblies for North America, EN/Eurocode-aligned assemblies for Europe, clearly labeled and kept separate.
>
> What's inside:
> - JSON and CSV, ready for your own QA scripts or spreadsheets
> - Both classification standards included, not blended
> - Property definitions in plain language
>
> Built from the same library that powers **SpecChecker** — the tool does the document-to-document comparison and clause citation automatically; this pack is the raw taxonomy.
>
> **[ Buy Now — $89 ]**

**Card — Estimating Rate Pack (2026 Edition)**
> **$99 · Instant download**
> Permits, development charges, GST/HST/PST, US state sales tax, and EU VAT — by jurisdiction — plus the contingency-risk framework behind AI Estimator.
>
> What's inside:
> - Current-year rate tables for every included jurisdiction
> - The full contingency-rule framework, written out
> - Dated "2026 Edition" so you always know how fresh it is — next year's rates ship as a new edition, not a silent update
>
> Built from the same library that powers **AI Estimator** — the tool turns your raw quantities into priced line items automatically, with contingency and rationale attached.
>
> **[ Buy Now — $99 ]**

**Card — Bid-Leveling Template**
> **$59 · Instant download**
> The scope-element checklist and comparison matrix behind Bid Leveler, with a region-notes tab covering where North American and European tendering conventions differ.
>
> **[ Buy Now — $59 ]**

**Card — Master Scope Requirement Checklist**
> **$59 · Instant download**
> The master scope-requirement library behind ScopeGuard, with the same region-notes layer.
>
> **[ Buy Now — $59 ]**

**Bundle card — The Full Data Pack Bundle**
> **$349 · Save $46 · Instant download**
> All five libraries — code compliance, assembly schema, estimating rates, bid-leveling, and scope requirements — covering Canada, the US, and the EU/UK, in one download.
>
> **[ Buy Now — $349 ]**

---

### "Why isn't this just the AI tool?" — FAQ block

**Does this cover my jurisdiction?**
Yes — the Building Code and Estimating packs include every Canadian province and territory, all 50 US states, and every EU country plus UK/Ireland. If you're outside those regions, [get in touch] before buying.

**What's the difference between a Data Pack and the AI tool it came from?**
The Data Pack is the reference library — a checklist, schema, or rate table for your jurisdiction. You still apply it to your own documents by hand. The AI tool reads your actual drawings, specs, or bids automatically and produces cited findings and draft letters in minutes.

**Why is the Rate Pack dated "2026 Edition" but the others aren't?**
Permit fees, development charges, and VAT rates change every year; code and scope checklists don't move nearly as fast. We'll release a new Rate Pack edition annually — buying this one doesn't include next year's update, so you always know exactly how current your numbers are.

**Can I upgrade later?**
Yes — any Data Pack purchase counts toward the price of its matching AI tool if you upgrade within 60 days. [See eligible tools →]

**How do I receive it?**
Checkout is handled by our payment processor, which supports CAD, USD, and EUR and handles local tax automatically. The moment payment clears, you'll get a secure download link by email.

---

### Closing strip

> **Outgrown the manual checklist?**
> Our AI tools apply this exact library to your real documents automatically — cited to the clause and sheet, in minutes, running entirely on your own machine.
> **[ Get Your Free 24-Hour Assessment → ]**

---

## Implementation notes

- **Fulfillment stays single-file per SKU.** Because each pack now bundles every jurisdiction into one download, there's no checkout-time region picker to build — upload one ZIP per product to your MoR platform, same as before. Breadth adds value without adding fulfillment complexity.
- **Checkout:** Same as prior draft — embed your MoR's buy-button/checkout widget per card (confirm which platform is currently accepting new merchants before building).
- **Versioning:** Only the Rate Pack needs an annual refresh cycle. Treat that refresh as a new dated SKU (e.g. "2027 Edition"), not a free update to the 2026 file — keeps the zero-maintenance, one-time-purchase model intact instead of quietly creating an ongoing support obligation.
- **Consistency with the rest of the site:** your existing product pages currently describe Blueprint Auditor, AI Estimator, and ScopeGuard using Ontario/Toronto-specific language ("Ontario Building Code," "Toronto permits... HST," "Toronto 2026 rate table"). Worth updating that copy to match the broader regional claim now being made on the Data Packs page — a buyer who reads "covers all of Canada, the US, and the EU" on one page and "Ontario Building Code" on another will reasonably wonder which is true.
- **Refund window:** 14 days on these packs, distinct from the 30-day guarantee on the $990+ tools.
- **Keep the packs off the primary CTA slots** on the main product pages — "Get Your Free Assessment" stays the dominant call to action everywhere except the Data Packs page itself.
