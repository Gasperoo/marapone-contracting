# Marapone.com Audit — Post-Update Review

Scope note: this pass was done by fetching and cross-referencing live pages (homepage, all five product pages, Pricing, Regions, Data Packs, Terms, Privacy). The Chrome browser bridge wasn't connected this session, so this is a content, link, and logic audit — not a visual/mobile/click-through QA pass. If you want the interactive layer checked (does a real purchase go through, mobile layout, console errors), that's worth a follow-up.

## Headline finding

The copy layer is genuinely well done and closely matches what we drafted — the Data Packs page, the Regions page, the FAQ, the bundle discount, the upgrade-credit mechanic. That part is real progress.

But underneath the copy, the actual purchase mechanism doesn't exist yet. Every "Buy" button on the site — for the $990 tools and for the new $59–$349 Data Packs — either dead-ends on a page that isn't a checkout, or routes to the same contact/assessment intake form the whole project was meant to replace. Right now the site *describes* a self-serve storefront without *being* one. That's the one thing worth fixing before anything else on this list.

---

## 1. Blocking issues — the storefront doesn't function yet

**No checkout exists anywhere.**
- On the homepage and product pages, every "Buy it — $990" button links to `/construction/pricing#products` — the pricing page itself, not a payment flow. Clicking it just scrolls you back to a price you already saw.
- On the Data Packs page, all six "Buy now" buttons (five packs + bundle) link to `/construction/contact?pack=...` — the same inquiry form used for the $15,000+ enterprise tier, with fields for "Budget range (rough)," "Timeline," and "Attach a document." A visitor trying to buy a $59 checklist is handed a form built for a construction firm scoping a custom AI build. That mismatch alone will kill conversion on the low-ticket packs.

**Fulfillment is manual, not automated.**
The Data Packs FAQ states: *"Checkout is handled by Stripe... your download link is sent by hand within 12 hours."* "Sent by hand" means a person is doing this. That directly contradicts the page's own headline ("yours **instantly**") and trust strip ("**instant** download"), and it reintroduces exactly the maintenance burden — a human in the loop on every sale — that the whole point of this project was to remove.

**No multi-currency, and no merchant of record.**
Every price on the site is CAD-only; there's no USD/EUR display or currency selector anywhere, including on the pages whose own copy promises "charged in CAD, USD, or EUR automatically." The Terms of Service confirm this is raw Stripe, not a merchant of record (Lemon Squeezy, Paddle, etc.) — which was the specific recommendation earlier precisely to avoid this problem.

**Tax handling doesn't match the stated regional scope.**
Product and pricing pages show a flat "+HST" on every price. Your own Terms of Service are actually careful about this — they correctly scope HST to Ontario clients and note others "may be subject to different tax treatment" — but that nuance isn't reflected on the pages people actually see before buying. There's no VAT handling anywhere for EU sales, despite the Regions and Data Packs pages actively marketing EU/UK coverage. Selling into the EU without VAT collection is a real compliance gap, not just a copy issue — this is the exact scenario a merchant of record exists to solve.

**The Data Packs page is orphaned.**
It's not in the main nav or the footer. The only way to reach it is the one "Buy a pack on its own" link buried on the Regions & Rate Packs page — which itself isn't a top-level nav item either (it's inside a "More" dropdown). A new visitor has no real path to discovering this product line exists.

---

## 2. Consistency issues — pages contradict each other

**ScopeGuard contradicts itself on the same page.** The page opens with "subcontractor scope gap detection software for general contractors in **North America and Europe**," then later has a section literally headed "Toronto, not 'North America'" arguing the product is deliberately built for one jurisdiction rather than generalized. Both can't be true to a reader. Worth noting: the second argument is actually a strong positioning angle (precision over sprawl) — it's just fighting the first claim instead of being reconciled with it.

**Blueprint Auditor wasn't updated with the others.** AI Estimator, ScopeGuard, Regions, and Data Packs all now carry the "North America and Europe" framing. Blueprint Auditor still reads as Ontario-first, describing other jurisdictions as something you'd need to request ("rule sets for a jurisdiction outside Ontario..."). Looks like the regional rollout was applied inconsistently across the five product pages.

**The Regions page quietly undercuts the breadth claim it's making.** It states packs exist for "every Canadian province and territory, all 50 US states, and the EU plus UK/Ireland" — but also states Toronto/GTA is the "deepest implementation," only "~73% portable" content carries across jurisdictions, and gives a count of "59 Ontario-specific references." Read together, that's an admission that most jurisdictions are templated/generic rather than actually built out to Toronto's depth. This is the exact risk flagged before this expansion: a buyer purchasing a "Building Code Compliance Library" for, say, Texas or Germany, expecting Toronto-level specificity, could reasonably feel misled. Either the marketing claim should be dialed back to "Ontario live today, more jurisdictions shipping" until the depth is real, or the depth needs to catch up to the claim before it's this prominent on three separate pages.

**Support Plans reintroduce the thing you removed.** Pricing now lists a "Flex" plan at $249/month and an "Annual" plan at $1,750/year. That's fine as a business decision, but it directly conflicts with the site's own comparison table elsewhere, which lists "no monthly fees" as a named differentiator against SaaS competitors. Worth deciding on purpose and then making the copy agree with itself.

---

## 3. What's actually working well

- **Data Packs page execution** closely follows the structure and copy we drafted — the coverage table, the "why isn't this just the AI tool" FAQ, the 60-day upgrade credit, the bundle discount math. The writing itself is in good shape.
- **Privacy Policy is real, not boilerplate.** It has substantive, correct GDPR/UK GDPR language, addresses EEA-to-Canada data transfer, and references Canada's EU adequacy status. That's more diligence than most sites this size bother with, and it matters now that you're marketing to EU visitors.
- **The core $990 product pages remain detailed and credible** — the level of specificity (215 scope items, 27 risk rules, named CSI divisions) is a real differentiator and shouldn't be diluted in the effort to sound broader.

---

## Fix priority, in order

1. **Build the actual checkout.** Nothing else on this page matters until "Buy" leads to a real payment flow. This was the entire premise of the project — right now it's the one piece still missing.
2. **Automate fulfillment.** Instant, system-generated download link on payment confirmation — not a person sending files within 12 hours.
3. **Get a merchant of record wired in** (or confirm Stripe Tax / Stripe's own EU VAT handling is configured) before continuing to market USD/EUR/EU pricing that doesn't yet exist at checkout.
4. **Add Data Packs to primary nav and footer.** It can't sell if it can't be found.
5. **Reconcile the regional-coverage claims** across ScopeGuard, Blueprint Auditor, Regions, and Data Packs — pick one honest story and make every page tell it. Given the "73% portable" admission, the safer near-term move is probably softening the claim rather than racing to backfill 90 jurisdictions to match it.
6. **Decide on Support Plans' place in the pitch** and update the "no monthly fees" comparison copy so it isn't contradicted two sections later.
7. **Fix the flat "+HST" display** on customer-facing pricing so it doesn't apply Canadian tax language to non-Canadian buyers before checkout is even built.
