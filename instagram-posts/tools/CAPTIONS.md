# MARAPONE — tool social kit

5 posts · one per product, in pipeline order. Each is a mixed carousel of
6 slides (1080×1350) plus a standalone 9:16 Reel.

Same layout grammar as the main kit in `instagram-posts/` — mono eyebrow,
hairline-ruled index, Bebas in caps, DM Sans for body, the `//` marker — but
built around real footage and screenshots of the applications rather than type
alone. Every figure is lifted from the product's own page under `construction/`.

Regenerate: `python3 scripts/build-tool-social.py [slug …] [--no-video]`

**Carousel order** (Instagram takes mixed image/video carousels, video first):

| # | File | What it is |
|---|------|------------|
| 1 | `<slug>-feed.mp4` | The app running, 4 views, ~26s |
| 2 | `01-cover.png` | Headline and price |
| 3 | `02-screen-b.png` | Second screen, with its figure |
| 4 | `03-screen-a.png` | Lead screen, with its figure |
| 5 | `04-numbers.png` | The four stats |
| 6 | `05-proof.png` | One real finding |
| 7 | `06-spec.png` | What you get · $990 |

`<slug>-reel.mp4` is the 9:16 cut of the same footage for Reels — all copy sits
above 1650px so Instagram's caption and action rail don't cover it.

---

## STAGE 01 · Blueprint Auditor — `tools/blueprint-auditor/`

*How much is there. Views in the video: Drop a drawing, Takeoff, Code audit, Live pricing.*

Drop in a drawing set and it reads the sheets live — room-by-room areas, door and window counts off the schedules, then 110+ code checks across OBC, AODA, fire, zoning and green standards with the clause reference attached to every finding.

Nine file formats in, including scanned sheets. 100% on-device — the drawings are processed in memory and never stored.

First results are free on your own drawings. $990 one time after that, source code included.

→ marapone.com

#takeoff #quantitysurveying #ontariobuildingcode #construction #generalcontractor #constructiontech #contech #preconstruction #constructionmanagement #privateai #onpremai #toronto #gta #ontarioconstruction

---

## STAGE 02 · SpecChecker — `tools/specchecker/`

*Do the documents agree. Views in the video: Dashboard, Findings, Coverage, RFIs.*

The project manual and the drawing set are both contract documents. They're written by different people, revised on different cycles, and issued together as though they agree.

SpecChecker reads one against the other and reports every place they don't — 27 measurable properties, 39 named assemblies, 11 conflict types, across 25 CSI divisions.

The window closes at the purchase order. Until the material is ordered a contradiction is a question; after it, it's a change order.

$990 one time. Runs on your own machine, with the wifi off.

→ marapone.com

#specifications #masterformat #constructiondocuments #construction #generalcontractor #constructiontech #contech #preconstruction #constructionmanagement #privateai #onpremai #toronto #gta #ontarioconstruction

---

## STAGE 03 · AI Estimator — `tools/ai-estimator/`

*What should we bid. Views in the video: Risk, Strategy, Scenarios, Soft costs.*

Measuring is a geometry problem. Pricing is a judgement problem. This is the second one.

Quantities become assemblies — studs, board, tape, fasteners, waste, crew-hours — across 57 parametric assemblies and 20 CSI divisions. Then 27 risk rules size the contingency, each one citing the code, by-law or statute it comes from.

On the demo job the model wants 9.0% contingency and the bid carries 5.0%. That's $362,535 of unpriced exposure, on screen before the bid goes out.

$990 one time. Runs offline, on your own machine. Source code included.

→ marapone.com

#estimating #costestimating #bidding #construction #generalcontractor #constructiontech #contech #preconstruction #constructionmanagement #privateai #onpremai #toronto #gta #ontarioconstruction

---

## STAGE 04 · Bid Leveler — `tools/bidleveler/`

*Whose quote is actually cheapest. Views in the video: Quotes, Matrix, Findings, Award.*

Five bidders quote the same package and none of them quote the same scope. One carries crane hoisting, one excludes it, two never mention it, the fifth prices it as an alternate. Put those five numbers in a column and the column is meaningless.

The interesting move isn't "read a PDF." It's this: when Sub A excludes hoisting and Sub B carries it as a $15,000 alternate, Sub A's gap is worth $15,000 — a real market price, for this job, from a contractor who wants the work.

On the demo package the low bid was $1,142,000. Levelled, that bidder lands fourth, and awarding on the bid form alone would have cost $84,986.

$990 one time. Runs on your own machine.

→ marapone.com

#bidleveling #procurement #subcontractors #construction #generalcontractor #constructiontech #contech #preconstruction #constructionmanagement #privateai #onpremai #toronto #gta #ontarioconstruction

---

## STAGE 05 · ScopeGuard — `tools/scopeguard/`

*Did anyone actually price it. Views in the video: Dashboard, Findings, Compare, Clarifications.*

What comes back from the trades is prose — inclusions, exclusions and qualifications written by fifteen different estimators, each protecting their own number. Most GCs review it by hand, under time pressure, days before award.

The failure is never dramatic. It's one sentence in the concrete letter that puts winter heating on somebody else, on a job whose structure runs November to March.

215 master scope requirements, 22 interface conditions, 8 finding types — every one cited on both sides and costed. Silence is reported as loudly as a bad clause, because the most expensive item on a buyout is the one no letter mentions at all.

$990 one time. 100% local — it works with the wifi off.

→ marapone.com

#buyout #subcontractors #riskmanagement #construction #generalcontractor #constructiontech #contech #preconstruction #constructionmanagement #privateai #onpremai #toronto #gta #ontarioconstruction

---
