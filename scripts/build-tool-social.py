#!/usr/bin/env python3
"""
Build a social kit for each of the five construction tools — a mixed carousel of
images and video, plus a 9:16 reel, in the site's own brand.

    python3 scripts/build-tool-social.py            # all five
    python3 scripts/build-tool-social.py estimator  # just one

The layout grammar, palette and fonts come straight out of `build-instagram.py`
so a tool post sits in the same feed as the existing kit without looking like a
different company made it: mono eyebrow, hairline-ruled index, Bebas in caps,
DM Sans for body, DM Mono for structural labels, the `//` section marker.

What's new here is media. The existing kit is typographic; these posts are built
around footage and screenshots of the actual applications, which already exist
under `public/<product>/` from the product-page captures:

  * the video slides composite the real per-view tour clips onto a branded
    1080x1350 (feed) or 1080x1920 (reel) card, one caption per view, so the
    footage is cut to a beat rather than being a silent 60-second screen record
  * the screen slides put a real app screenshot in a full-bleed band under a
    pulled-out figure

Every number and every line of copy is lifted from the product's own page under
`construction/`, so a card can't promise something the site doesn't sell.

Output lands in `instagram-posts/tools/<slug>/`, numbered in carousel order.
"""

from __future__ import annotations

import argparse
import base64
import importlib.util
import mimetypes
import shutil
import subprocess
import sys
import tempfile
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OUT = ROOT / "instagram-posts" / "tools"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# Reuse the existing kit's shell rather than restating it — same palette, same
# CSS, same font cache, so the two sets stay in step if either is retuned.
_spec = importlib.util.spec_from_file_location(
    "build_instagram", Path(__file__).resolve().parent / "build-instagram.py"
)
bi = importlib.util.module_from_spec(_spec)
sys.modules["build_instagram"] = bi  # @dataclass there resolves via sys.modules
_spec.loader.exec_module(bi)

STEEL, CHALK = bi.STEEL, bi.CHALK
ARROW, CHECK, GRAIN = bi.ARROW, bi.CHECK, bi.GRAIN

FEED = (1080, 1350)
REEL = (1080, 1920)

# The clips are 16:9. Full-bleed across a 1080 card puts the window at 1080x608,
# which is the only size the app footage is ever shown at here — a zoom would
# read as cropping the product to hide something.
VID_W, VID_H = 1080, 608
# Instagram overlays a Reel's bottom ~300px with the caption and action rail, so
# the 9:16 card keeps every word above ~1650 and lets the footer sit high.
VID_Y = {(1080, 1350): 326, (1080, 1920): 620}


# ---------------------------------------------------------------------------
# Extra CSS — the media band and the pull-figure, on top of the kit's sheet.
# ---------------------------------------------------------------------------

EXTRA_CSS = """
/* Full-bleed media band. The screenshot is positioned rather than object-fit so
   each one can be anchored on the part of the UI worth showing. */
.band{position:absolute;left:0;width:%(W)dpx;overflow:hidden;
  background:#0e0e0e;z-index:1}
.band::before,.band::after{content:'';position:absolute;left:0;right:0;
  height:1px;background:var(--border-strong);z-index:2}
.band::before{top:0}.band::after{bottom:0}
.band img{position:absolute;display:block}
/* A hi-viz hairline down the left edge of the band, the same marker the site
   uses on a quoted finding. */
.band .edge{position:absolute;left:0;top:0;bottom:0;width:4px;
  background:var(--accent);z-index:3}

.abs{position:absolute;left:72px;right:72px;z-index:2}

/* The one figure a slide is actually about, set at display size. */
.figure{font-family:'Bebas',sans-serif;font-size:88px;line-height:0.86;
  letter-spacing:0.01em;color:var(--accent-text)}
.caption{font-size:27px;line-height:1.45;color:var(--fg);text-wrap:pretty}

.seg{display:flex;align-items:baseline;gap:18px}
.seg .idx{font-family:'DMMono',ui-monospace,monospace;font-size:19px;
  letter-spacing:0.18em;color:var(--accent-text)}
.seg .name{font-family:'Bebas',sans-serif;font-size:44px;letter-spacing:0.02em;
  color:var(--fg)}

.quote{border-left:4px solid var(--accent);padding-left:34px;
  font-size:34px;line-height:1.45;color:var(--fg);text-wrap:pretty}
.quote em{font-style:normal;color:var(--accent-text)}

.stack{display:flex;flex-direction:column;gap:0}
"""


def css(w: int, h: int) -> str:
    return (bi.CSS + EXTRA_CSS) % {"W": w, "H": h, "GRAIN": GRAIN}


def shell(body: str, theme: dict, fonts: str, size, wash: float = 0.12) -> str:
    w, h = size
    variables = "\n".join(
        f"  --{k}: {v};"
        for k, v in {
            "bg": theme["bg"],
            "surface": theme["surface"],
            "fg": theme["fg"],
            "muted": theme["muted"],
            "faint": theme["faint"],
            "border": theme["border"],
            "border-strong": theme["border_strong"],
            "accent": theme["accent"],
            "accent-text": theme["accent_text"],
            "on-accent": theme["on_accent"],
            "grain-blend": theme["grain_blend"],
            "grain-opacity": theme["grain_opacity"],
            "wash": f"{wash}",
        }.items()
    )
    return (
        "<!doctype html><html><head><meta charset='utf-8'><style>"
        + fonts
        + ":root{\n" + variables + "\n}"
        + css(w, h)
        + "</style></head><body><div class='card'>"
        "<div class='wash'></div>" + body + "<div class='grain'></div>"
        "</div></body></html>"
    )


def data_uri(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "image/webp"
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()


# ---------------------------------------------------------------------------
# Fragments
# ---------------------------------------------------------------------------


def head(label: str, right: str = "") -> str:
    r = f"<div class='pager'>{right}</div>" if right else ""
    return (
        f"<div class='head'><p class='eyebrow'><span class='slashes'>//</span>"
        f"{label}</p>{r}</div>"
    )


def foot(swipe: bool = False) -> str:
    s = f"<div class='swipe'>swipe <i>{ARROW}</i></div>" if swipe else ""
    return (
        f"<div style='margin-top:auto'>{s}<div class='rule'></div>"
        f"<div class='foot'><span class='mark'>MARA"
        f"<span class='accent'>PONE</span></span>"
        f"<span>marapone.com</span></div></div>"
    )


def foot_abs(bottom: int) -> str:
    """Footer pinned to the baseline, for the absolutely-laid-out media cards."""
    return (
        f"<div class='abs' style='bottom:{bottom}px'>"
        f"<div class='rule'></div>"
        f"<div class='foot' style='margin-top:26px'>"
        f"<span class='mark'>MARA<span class='accent'>PONE</span></span>"
        f"<span>marapone.com</span></div></div>"
    )


def wrap(*parts: str) -> str:
    return "<div class='inner'>" + "".join(parts) + "</div>"


def checks(items: list[str]) -> str:
    li = "".join(
        f"<li><span class='tick'>{CHECK}</span><span>{i}</span></li>" for i in items
    )
    return f"<ul class='checks'>{li}</ul>"


def band(img: Path, top: int, height: int, zoom: float, ox: float, oy: float) -> str:
    """A full-bleed screenshot band, anchored by (ox, oy) in overflow fractions."""
    iw = int(VID_W * zoom)
    from_w, from_h = image_size(img)
    ih = int(iw * from_h / from_w)
    left = int(-(iw - VID_W) * ox)
    top_off = int(-(ih - height) * oy) if ih > height else 0
    return (
        f"<div class='band' style='top:{top}px;height:{height}px'>"
        f"<img src='{data_uri(img)}' style='width:{iw}px;left:{left}px;"
        f"top:{top_off}px'><span class='edge'></span></div>"
    )


def image_size(path: Path) -> tuple[int, int]:
    out = subprocess.run(
        ["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(path)],
        check=True, capture_output=True, text=True,
    ).stdout
    w = h = 0
    for line in out.splitlines():
        if "pixelWidth:" in line:
            w = int(line.split(":")[1])
        if "pixelHeight:" in line:
            h = int(line.split(":")[1])
    return w, h


# ---------------------------------------------------------------------------
# Product definitions — copy and figures lifted from construction/<slug>.html
# ---------------------------------------------------------------------------


@dataclass
class Screen:
    file: str              # relative to public/; an .mp4 is sampled at `at`
    label: str             # mono eyebrow above the band
    figure: str            # the one number the slide is about
    caption: str
    # zoom 1.0 fits the whole app window across the card. Cropping in makes the
    # UI text marginally bigger and still unreadable at feed size, while cutting
    # a table mid-column — so the default is the entire screen, and the figure
    # beneath it does the talking.
    zoom: float = 1.0
    ox: float = 0.0
    oy: float = 0.0
    at: float = 0.0        # seconds, when `file` is a clip


@dataclass
class Clip:
    file: str              # relative to public/
    name: str              # segment title, Bebas
    caption: str
    seconds: float = 6.4


@dataclass
class Product:
    slug: str
    stage: str             # "STAGE 03"
    when: str              # "AT THE BID"
    question: str          # the one-line job, from the stage rail
    display: str           # name as set on the cover, <br> allowed
    wordmark: str          # single-line name for headers
    headline: str
    lede: str
    stats: list[tuple[str, str, str]]
    proof_eyebrow: str
    proof: str
    checks: list[str]
    screens: list[Screen]
    clips: list[Clip]
    tag: str = ""          # "NEW", or a live-demo note
    footnote: str = "$990 CAD &middot; one time &middot; source code included"
    recorded: str = ""     # the "the real app, recorded ·" line
    hashtags: list[str] = field(default_factory=list)
    caption_text: str = ""


PRODUCTS: list[Product] = [
    Product(
        slug="blueprint-auditor",
        stage="STAGE 01",
        when="BEFORE THE BID",
        question="How much is there",
        display="Blueprint<br>Auditor",
        wordmark="Blueprint Auditor",
        headline="Audit any<br>blueprint.<br><span class='accent'>Instantly.</span>",
        lede=(
            "Drop in a drawing set and the engine reads it live — a real quantity "
            "takeoff, plus sheets, disciplines, completeness gaps and code risk, "
            "computed from your file."
        ),
        stats=[
            ("110+", "Code checks run per drawing set", "Every sheet"),
            ("5", "Rule sets — OBC, AODA, fire, zoning, green", "Ontario"),
            ("9", "File formats ingested, including scanned PDFs", "Ingestion"),
            ("100%", "On-device — nothing leaves your machine", "Privacy"),
        ],
        proof_eyebrow="First results are free",
        proof=(
            "Run it on your own drawings before you pay anything. Vector or text "
            "PDF from Revit, AutoCAD or Bluebeam — <em>processed in memory, never "
            "stored.</em>"
        ),
        checks=[
            "Room-by-room areas with a live total, read off the sheets",
            "Door, window and fixture counts pulled from the schedules",
            "OBC, AODA, fire and zoning checks with clause references",
            "Cross-discipline coordination conflicts, severity-ranked",
            "Tender risk — bonding, LDs, fair wage, restricted hours",
            "Metric and imperial handled automatically",
            "Exports as JSON straight into the AI Estimator",
        ],
        tag="free live demo",
        recorded="the real app, recorded &middot; one real drawing set",
        screens=[
            Screen(
                "blueprint-auditor-takeoff.mp4",
                "01 — Quantity takeoff",
                "Measured off the sheets.",
                "Rooms, areas, doors, windows and fixtures pulled out of the "
                "drawing set and the schedules — every line traceable back to the "
                "sheet it came from.",
                zoom=1.04, ox=0.0, oy=0.5, at=5.4,
            ),
            Screen(
                "blueprint-auditor-review.mp4",
                "02 — Code &amp; coordination audit",
                "110+ checks.",
                "The full set checked against the 2024 Ontario Building Code and "
                "against itself — clause references included, so a finding goes to "
                "the consultant instead of being argued about.",
                zoom=1.04, ox=0.0, oy=0.5, at=9.0,
            ),
        ],
        clips=[
            # The "assess" clip is the app's upload screen, so it opens rather
            # than sitting third — a segment label has to match its footage.
            Clip("blueprint-auditor-assess.mp4", "Drop a drawing",
                 "PDF, DWG, IFC or a scan — read on your own machine.", 7.0),
            Clip("blueprint-auditor-takeoff.mp4", "Takeoff",
                 "Rooms, areas and counts, off the geometry.", 6.6),
            Clip("blueprint-auditor-review.mp4", "Code audit",
                 "OBC, AODA, fire and zoning — with clause references.", 7.0),
            Clip("blueprint-auditor-pricing.mp4", "Live pricing",
                 "Quantities costed against live market rates.", 7.0),
        ],
        hashtags=["takeoff", "quantitysurveying", "ontariobuildingcode"],
        caption_text=(
            "Drop in a drawing set and it reads the sheets live — room-by-room "
            "areas, door and window counts off the schedules, then 110+ code "
            "checks across OBC, AODA, fire, zoning and green standards with the "
            "clause reference attached to every finding.\n\n"
            "Nine file formats in, including scanned sheets. 100% on-device — the "
            "drawings are processed in memory and never stored.\n\n"
            "First results are free on your own drawings. $990 one time after "
            "that, source code included."
        ),
    ),
    Product(
        slug="specchecker",
        stage="STAGE 02",
        when="BEFORE THE ORDER",
        question="Do the documents agree",
        display="Spec<br>Checker",
        wordmark="SpecChecker",
        headline=(
            "Two contract<br>documents.<br>"
            "<span class='accent'>One of them is wrong.</span>"
        ),
        lede=(
            "The drawing says &frac12;-inch drywall. Section 09 29 00 requires "
            "&frac58;-inch Type X. SpecChecker reads the project manual against "
            "the drawing set and reports every place they disagree — before the "
            "material is ordered."
        ),
        stats=[
            ("27", "Measurable properties", "Ratings, thicknesses, strengths, grades"),
            ("39", "Named assemblies", "Doors, AHUs, panelboards, slabs, partitions"),
            ("11", "Conflict types", "Including the two a document has with itself"),
            ("25", "CSI divisions", "MasterFormat spine, 47 sections mapped"),
        ],
        proof_eyebrow="One finding, as the app reports it",
        proof=(
            "Spec: <em>&ldquo;Door D-1 shall have a 90 minute fire rating.&rdquo;</em> "
            "Drawing A-601: <em>0 minutes.</em> A rating is stamped at the factory, "
            "so an unrated leaf is replaced, not upgraded — and the lead time is "
            "measured in months."
        ),
        checks=[
            "The project manual read against the drawing set, page by page",
            "11 conflict types — including the two a document has with itself",
            "Every finding quotes both documents and cites both",
            "Ranked by action: hold the order, or carry the question",
            "RFIs drafted with the wording of each document attached",
            "PDF, Word, Excel or a scan — and it works with the wifi off",
            "Windows, macOS &amp; Linux &middot; full source code included",
        ],
        tag="new",
        recorded="the real app, recorded &middot; one manual, two drawing sets",
        screens=[
            Screen("specchecker/findings.webp", "Findings",
                   "21 conflicts.",
                   "One project manual against two drawing sets and an addendum. "
                   "Every one quoted on both sides and ranked by what it costs to "
                   "find late."),
            Screen("specchecker/matrix.webp", "Conflict matrix",
                   "13 blocking.",
                   "Every row cites the specification section and the drawing "
                   "sheet it came from, and carries the action: hold the material "
                   "order, or carry the question."),
        ],
        clips=[
            Clip("specchecker/clip-dashboard.mp4", "Dashboard",
                 "Two documents in. Every disagreement out.", 6.6),
            Clip("specchecker/clip-findings.mp4", "Findings",
                 "Both documents quoted. Both cited.", 6.6),
            Clip("specchecker/clip-matrix.mp4", "Coverage",
                 "47 CSI sections, manual against drawings.", 6.6),
            Clip("specchecker/clip-rfis.mp4", "RFIs",
                 "Drafted with the wording of each document.", 6.6),
        ],
        hashtags=["specifications", "masterformat", "constructiondocuments"],
        caption_text=(
            "The project manual and the drawing set are both contract documents. "
            "They're written by different people, revised on different cycles, and "
            "issued together as though they agree.\n\n"
            "SpecChecker reads one against the other and reports every place they "
            "don't — 27 measurable properties, 39 named assemblies, 11 conflict "
            "types, across 25 CSI divisions.\n\n"
            "The window closes at the purchase order. Until the material is "
            "ordered a contradiction is a question; after it, it's a change order.\n\n"
            "$990 one time. Runs on your own machine, with the wifi off."
        ),
    ),
    Product(
        slug="ai-estimator",
        stage="STAGE 03",
        when="AT THE BID",
        question="What should we bid",
        display="AI<br>Estimator",
        wordmark="AI Estimator",
        headline=(
            "Takeoff<br>measures.<br><span class='accent'>This prices.</span>"
        ),
        lede=(
            "24,000 square feet of partition becomes studs, board, tape, fasteners, "
            "waste and crew-hours — then the risk, the contingency, the Toronto "
            "soft costs and the margin you can actually win at."
        ),
        stats=[
            ("57", "Parametric assemblies", "Across 20 CSI divisions"),
            ("27", "Risk rules", "Each with a cited reason"),
            ("25", "Requirement types read", "From specs, ITBs and addenda"),
            ("4,000", "Monte Carlo iterations", "Per cost distribution"),
        ],
        proof_eyebrow="The number under the number",
        proof=(
            "On the demo job the model wants <em>9.0% contingency.</em> The bid "
            "carries 5.0%. That gap is $362,535 of unpriced exposure — on screen "
            "before the bid goes out rather than in the post-mortem."
        ),
        checks=[
            "57 parametric assemblies across 20 CSI divisions",
            "27 risk rules — a contingency with a written reason",
            "Toronto permits, development charges, HST and rebates",
            "Monte Carlo, tornado sensitivity, eight what-if presets",
            "Margin ladder with win probability from your own bids",
            "Procore, Sage, QuickBooks and Bluebeam exports",
            "Full source code — every fee schedule editable",
        ],
        tag="new",
        recorded="the real app, recorded &middot; a 38-unit Toronto infill",
        screens=[
            Screen("estimator/risk.webp", "Risk &amp; contingency",
                   "$362,535.",
                   "27 rules across scope, schedule, market, site, regulatory and "
                   "financial exposure. Each one that fires gets a written reason, "
                   "a dollar figure and a mitigation — not a coloured dot."),
            Screen("estimator/strategy.webp", "Bid strategy",
                   "The margin call.",
                   "Four numbers every estimator has in their head and almost never "
                   "writes down — the walk-away, the target, the stretch, and the "
                   "probability of winning at each."),
        ],
        clips=[
            Clip("estimator/clip-risk.mp4", "Risk",
                 "27 rules. Each one cites its reason.", 6.6),
            Clip("estimator/clip-strategy.mp4", "Strategy",
                 "Where to put the margin, and why.", 6.6),
            Clip("estimator/clip-scenarios.mp4", "Scenarios",
                 "Monte Carlo and eight what-if presets.", 6.6),
            Clip("estimator/clip-softcosts.mp4", "Soft costs",
                 "Toronto permits, DCs, HST and rebates.", 6.6),
        ],
        hashtags=["estimating", "costestimating", "bidding"],
        caption_text=(
            "Measuring is a geometry problem. Pricing is a judgement problem. This "
            "is the second one.\n\n"
            "Quantities become assemblies — studs, board, tape, fasteners, waste, "
            "crew-hours — across 57 parametric assemblies and 20 CSI divisions. "
            "Then 27 risk rules size the contingency, each one citing the code, "
            "by-law or statute it comes from.\n\n"
            "On the demo job the model wants 9.0% contingency and the bid carries "
            "5.0%. That's $362,535 of unpriced exposure, on screen before the bid "
            "goes out.\n\n"
            "$990 one time. Runs offline, on your own machine. Source code included."
        ),
    ),
    Product(
        slug="bidleveler",
        stage="STAGE 04",
        when="AT THE BID TABLE",
        question="Whose quote is actually cheapest",
        display="Bid<br>Leveler",
        wordmark="Bid Leveler",
        headline=(
            "The lowest<br>number is not<br>"
            "<span class='accent'>the lowest bid.</span>"
        ),
        lede=(
            "A dozen quotes come back in a dozen formats — a formal letter, a wall "
            "of prose, a spreadsheet, a four-line email, a photograph of a fax. Bid "
            "Leveler normalises all of them to the same scope and tells you what "
            "each one would actually cost."
        ),
        stats=[
            ("155", "Scope elements", "Across 15 trade packages, mapped to CSI"),
            ("6", "Valuation bases", "Shown on every adjustment, ranked by strength"),
            ("9", "Finding types", "From scope gaps to bids that miss the market"),
            ("123", "Toronto rates", "The fallback only, and always labelled as one"),
        ],
        proof_eyebrow="The demo package",
        proof=(
            "Delta submitted the lowest number at $1,142,000. Levelled, they land "
            "<em>fourth</em> — and awarding on the bid form alone would have cost "
            "$84,986."
        ),
        checks=[
            "Five formats read by one extractor — letter, prose, sheet, email, scan",
            "155 scope elements across 15 trade packages, normalised to one scope",
            "Gaps priced from what a competing bidder actually quoted",
            "Every adjustment states its basis, ranked by strength",
            "Silence flagged as loudly as a written exclusion",
            "An award corpus built on your machine from what you actually paid",
            "Works with the wifi off &middot; full source code included",
        ],
        tag="new",
        recorded="the real app, recorded &middot; five quotes, one $1.3M package",
        screens=[
            Screen("bidleveler/matrix.webp", "Leveling matrix",
                   "$84,986.",
                   "What awarding on the bid form alone would have cost on this "
                   "package. Five bidders, 36 scope rows, 26 of them a "
                   "disagreement — and ten carried by nobody at all."),
            Screen("bidleveler/award.webp", "Award",
                   "Ranking changed.",
                   "The grey bar is what they bid, the orange is what leveling "
                   "added. Read the right-hand column, not the bid form — that's "
                   "the only reason any of this is worth doing."),
        ],
        clips=[
            Clip("bidleveler/clip-quotes.mp4", "Quotes",
                 "Five formats. One extractor.", 6.6),
            Clip("bidleveler/clip-matrix.mp4", "Matrix",
                 "155 scope elements, normalised to one scope.", 6.6),
            Clip("bidleveler/clip-findings.mp4", "Findings",
                 "What nobody priced, and what two subs both carry.", 6.6),
            Clip("bidleveler/clip-award.mp4", "Award",
                 "The levelled ranking, not the bid form.", 6.6),
        ],
        hashtags=["bidleveling", "procurement", "subcontractors"],
        caption_text=(
            "Five bidders quote the same package and none of them quote the same "
            "scope. One carries crane hoisting, one excludes it, two never mention "
            "it, the fifth prices it as an alternate. Put those five numbers in a "
            "column and the column is meaningless.\n\n"
            "The interesting move isn't \"read a PDF.\" It's this: when Sub A "
            "excludes hoisting and Sub B carries it as a $15,000 alternate, Sub A's "
            "gap is worth $15,000 — a real market price, for this job, from a "
            "contractor who wants the work.\n\n"
            "On the demo package the low bid was $1,142,000. Levelled, that bidder "
            "lands fourth, and awarding on the bid form alone would have cost "
            "$84,986.\n\n"
            "$990 one time. Runs on your own machine."
        ),
    ),
    Product(
        slug="scopeguard",
        stage="STAGE 05",
        when="AFTER YOU WIN",
        question="Did anyone actually price it",
        display="Scope<br>Guard",
        wordmark="ScopeGuard",
        headline=(
            "You won the job.<br>"
            "<span class='accent'>Now don't give it back.</span>"
        ),
        lede=(
            "Twenty trades quote your job and twenty estimators write their own "
            "exclusions. ScopeGuard reads all of it against the master documents "
            "and puts a number on every gap — before you award, not after."
        ),
        stats=[
            ("215", "Master scope requirements", "Across 20 trade packages, CSI-mapped"),
            ("22", "Interface conditions", "The grey zones between two trades"),
            ("18", "GTA dispute hotspots", "Frequency, exposure and prevention"),
            ("8", "Finding types", "Each with a citation on both sides"),
        ],
        proof_eyebrow="From the concrete proposal, as read",
        proof=(
            "<em>&ldquo;Cold weather concreting — by others.&rdquo;</em> Section "
            "03 30 00 requires it. Nobody else priced it. $118,320–$201,840, found "
            "before award instead of on the first cold morning."
        ),
        checks=[
            "215 master scope requirements across 20 trade packages",
            "Eight finding types — missing scope, overlap, ambiguity …",
            "Every finding cited to your clause and their page",
            "Costed from a Toronto 2026 subcontract rate table",
            "Absence reported as loudly as a bad clause",
            "Clarification letters drafted in one click",
            "100% local &middot; source code and knowledge base included",
        ],
        tag="new",
        recorded="the real app, recorded &middot; one $14.25M buyout",
        screens=[
            Screen("scopeguard/findings.webp", "Findings",
                   "120 findings.",
                   "Seventy-five of them high severity, on one $14.25M buyout. Each "
                   "one quotes the sub's own wording and the clause of yours it "
                   "walks away from."),
            Screen("scopeguard/compare.webp", "Compare",
                   "$160,080.",
                   "One trade's proposal set against your master scope, "
                   "requirement by requirement — included, excluded, or never "
                   "mentioned. Winter concreting: excluded, and priced."),
        ],
        clips=[
            Clip("scopeguard/clip-dashboard.mp4", "Dashboard",
                 "One buyout, twenty trades, one exposure number.", 6.6),
            Clip("scopeguard/clip-findings.mp4", "Findings",
                 "Cited on both sides — your clause, their page.", 6.6),
            Clip("scopeguard/clip-compare.mp4", "Compare",
                 "What two trades both carry, and what neither does.", 6.6),
            Clip("scopeguard/clip-clarifications.mp4", "Clarifications",
                 "The letter, drafted in one click.", 6.6),
        ],
        hashtags=["buyout", "subcontractors", "riskmanagement"],
        caption_text=(
            "What comes back from the trades is prose — inclusions, exclusions and "
            "qualifications written by fifteen different estimators, each "
            "protecting their own number. Most GCs review it by hand, under time "
            "pressure, days before award.\n\n"
            "The failure is never dramatic. It's one sentence in the concrete "
            "letter that puts winter heating on somebody else, on a job whose "
            "structure runs November to March.\n\n"
            "215 master scope requirements, 22 interface conditions, 8 finding "
            "types — every one cited on both sides and costed. Silence is reported "
            "as loudly as a bad clause, because the most expensive item on a buyout "
            "is the one no letter mentions at all.\n\n"
            "$990 one time. 100% local — it works with the wifi off."
        ),
    ),
]


# ---------------------------------------------------------------------------
# Slides
# ---------------------------------------------------------------------------


def cover(p: Product) -> tuple[str, dict, float]:
    tag = (
        f"<span class='eyebrow' style='color:var(--accent-text)'>"
        f"&middot; {p.tag}</span>"
        if p.tag else ""
    )
    return (
        wrap(
            head(f"{p.stage} &middot; {p.when}", "01 / 06"),
            "<div class='body-fill'>"
            f"<p class='eyebrow'>{p.question} {tag}</p>"
            f"<h1 class='t-hero' style='margin-top:34px;max-width:940px'>"
            f"{p.headline}</h1>"
            f"<p class='t-lede' style='margin-top:44px;max-width:780px'>{p.lede}</p>"
            f"<p class='t-body' style='margin-top:34px'>"
            f"<span class='accent'>$990</span>{p.footnote[4:]}</p>"
            "</div>",
            foot(swipe=True),
        ),
        STEEL,
        0.13,
    )


def numbers(p: Product) -> tuple[str, dict, float]:
    rows = "".join(
        f"<div><span class='n'>{n}</span>"
        f"<span class='l'>{label}<span class='s'>{sub}</span></span></div>"
        for n, label, sub in p.stats
    )
    return (
        wrap(
            head(f"{p.wordmark} &middot; by the numbers", "04 / 06"),
            "<div class='body-fill'>"
            f"<div class='stats' style='margin-top:8px'>{rows}</div>"
            f"<p class='t-body' style='margin-top:34px'>"
            f"{p.recorded[0].upper() + p.recorded[1:]}</p></div>",
            foot(swipe=True),
        ),
        STEEL,
        0.10,
    )


def spec(p: Product) -> tuple[str, dict, float]:
    return (
        wrap(
            head("What you get", "06 / 06"),
            "<div class='body-fill'>"
            f"<h2 class='t-h2' style='max-width:880px'>{p.wordmark} "
            "<span class='accent'>&mdash; $990 once.</span></h2>"
            f"<div style='margin-top:34px'>{checks(p.checks)}</div>"
            f"<p class='t-body' style='margin-top:30px'>{p.proof_eyebrow} "
            "&mdash; see it running at marapone.com</p>"
            "</div>",
            foot(),
        ),
        CHALK,
        0.0,
    )


def screen_source(s: Screen, tmp: Path) -> Path:
    """A still for the band — the file itself, or a frame lifted out of a clip."""
    src = PUBLIC / s.file
    if src.suffix != ".mp4":
        return src
    still = tmp / f"still-{Path(s.file).stem}-{s.at:g}.png"
    if not still.exists():
        subprocess.run(
            ["ffmpeg", "-y", "-ss", str(s.at), "-i", str(src),
             "-frames:v", "1", str(still)],
            check=True, capture_output=True,
        )
    return still


def screen_slide(p: Product, s: Screen, pager: str, tmp: Path) -> tuple[str, dict, float]:
    """Absolute layout: header, full-bleed band, pull figure, caption, footer."""
    top, band_h = 250, 640
    body = (
        f"<div class='abs' style='top:82px'>"
        f"<div class='head'><p class='eyebrow'><span class='slashes'>//</span>"
        f"{p.wordmark}</p><div class='pager'>{pager}</div></div>"
        f"<p class='eyebrow' style='margin-top:46px;color:var(--accent-text)'>"
        f"{s.label}</p></div>"
        + band(screen_source(s, tmp), top, band_h, s.zoom, s.ox, s.oy)
        + f"<div class='abs' style='top:{top + band_h + 46}px'>"
        f"<p class='figure'>{s.figure}</p>"
        f"<p class='caption' style='margin-top:26px;max-width:900px'>{s.caption}</p>"
        "</div>"
        + foot_abs(74)
    )
    return body, STEEL, 0.10


def proof_slide(p: Product) -> tuple[str, dict, float]:
    return (
        wrap(
            head(p.proof_eyebrow, "05 / 06"),
            "<div class='body-fill'>"
            f"<p class='quote'>{p.proof}</p>"
            "<div class='rule' style='margin:52px 0 34px'></div>"
            f"<p class='t-lede' style='max-width:800px'>{p.lede}</p>"
            "</div>",
            foot(swipe=True),
        ),
        STEEL,
        0.12,
    )


# ---------------------------------------------------------------------------
# Video frames — one background per clip, composited by ffmpeg
# ---------------------------------------------------------------------------


def video_frame(p: Product, c: Clip, i: int, total: int, size) -> tuple[str, dict, float]:
    w, h = size
    vy = VID_Y[size]
    if size == FEED:
        cap_top = 1000
        headline = (
            f"<p class='t-h2' style='margin-top:26px'>{p.wordmark}</p>"
            f"<p class='eyebrow' style='margin-top:24px'>{p.recorded}</p>"
        )
    else:
        cap_top = 1270
        headline = (
            f"<p class='t-h1' style='margin-top:32px;max-width:900px'>"
            f"{p.display}</p>"
            f"<p class='t-lede' style='margin-top:34px;max-width:800px'>{p.lede}</p>"
        )
    body = (
        f"<div class='abs' style='top:82px'>"
        f"<div class='head'><p class='eyebrow'><span class='slashes'>//</span>"
        f"{p.stage} &middot; {p.when}</p>"
        f"<div class='pager'>{i + 1:02d} / {total:02d}</div></div>"
        f"{headline}</div>"
        # The window the clip lands in — filled dark so a dropped frame reads as
        # the card's own ground rather than a hole.
        f"<div class='band' style='top:{vy}px;height:{VID_H}px'>"
        f"<span class='edge'></span></div>"
        f"<div class='abs' style='top:{cap_top}px'>"
        f"<div class='seg'><span class='idx'>{i + 1:02d}</span>"
        f"<span class='name'>{c.name}</span></div>"
        f"<p class='caption' style='margin-top:20px;max-width:880px'>{c.caption}</p>"
        "</div>"
        + (
            f"<div class='abs' style='top:{cap_top + 190}px'>"
            f"<p class='eyebrow'>{p.recorded}</p></div>"
            if size == REEL else ""
        )
        + foot_abs(300 if size == REEL else 74)
    )
    return body, STEEL, 0.12


# ---------------------------------------------------------------------------
# Render
# ---------------------------------------------------------------------------


def shoot(html: str, out: Path, size, tmp: Path) -> None:
    w, h = size
    src = tmp / (out.stem + ".html")
    src.write_text(html, encoding="utf-8")
    raw = tmp / (out.stem + "-2x.png")
    subprocess.run(
        [
            CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
            "--force-device-scale-factor=2", f"--window-size={w},{h}",
            f"--screenshot={raw}", "--virtual-time-budget=2500", str(src),
        ],
        check=True, capture_output=True,
    )
    out.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ["sips", "-z", str(h), str(w), str(raw), "--out", str(out)],
        check=True, capture_output=True,
    )


ENCODE = [
    "-c:v", "libx264", "-preset", "slow", "-crf", "20",
    "-pix_fmt", "yuv420p", "-profile:v", "high", "-level", "4.0",
    "-r", "30", "-g", "60",
    "-c:a", "aac", "-b:a", "128k", "-ar", "44100", "-ac", "2",
    "-movflags", "+faststart",
]


def build_video(p: Product, size, out: Path, tmp: Path, fonts: str) -> None:
    """Composite each clip onto its own branded card, then concatenate."""
    vy = VID_Y[size]
    parts = []
    for i, c in enumerate(p.clips):
        bg = tmp / f"{out.stem}-bg{i}.png"
        body, theme, wash = video_frame(p, c, i, len(p.clips), size)
        shoot(shell(body, theme, fonts, size, wash), bg, size, tmp)

        seg = tmp / f"{out.stem}-seg{i}.mp4"
        subprocess.run(
            [
                "ffmpeg", "-y", "-loop", "1", "-i", str(bg),
                "-i", str(PUBLIC / c.file),
                "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
                "-filter_complex",
                # Fit the clip to the window width, then trim it to the window
                # height from the top — the app's own chrome sits there, so a
                # bottom crop loses less than letterboxing costs.
                f"[1:v]scale={VID_W}:-2,crop={VID_W}:{VID_H}:0:0,setsar=1,"
                f"fps=30,trim=0:{c.seconds},setpts=PTS-STARTPTS[clip];"
                f"[0:v][clip]overlay=0:{vy}:shortest=1[v]",
                "-map", "[v]", "-map", "2:a",
                "-t", str(c.seconds), *ENCODE, str(seg),
            ],
            check=True, capture_output=True,
        )
        parts.append(seg)

    listing = tmp / f"{out.stem}-parts.txt"
    listing.write_text("".join(f"file '{s}'\n" for s in parts), encoding="utf-8")
    out.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(listing),
            "-c", "copy", "-movflags", "+faststart", str(out),
        ],
        check=True, capture_output=True,
    )
    # A poster for the scheduler / any surface that wants a thumbnail.
    subprocess.run(
        [
            "ffmpeg", "-y", "-ss", "2", "-i", str(out), "-frames:v", "1",
            "-q:v", "3", str(out.with_name(out.stem + "-poster.jpg")),
        ],
        check=True, capture_output=True,
    )


def build(p: Product, fonts: str, video: bool = True) -> None:
    dest = OUT / p.slug
    dest.mkdir(parents=True, exist_ok=True)
    tmp = Path(tempfile.mkdtemp(prefix=f"social-{p.slug}-"))
    try:
        slides = [
            ("01-cover", cover(p), FEED),
            ("03-screen-a", screen_slide(p, p.screens[0], "03 / 06", tmp), FEED),
            ("04-numbers", numbers(p), FEED),
            ("05-proof", proof_slide(p), FEED),
            ("06-spec", spec(p), FEED),
        ]
        for name, (body, theme, wash), size in slides:
            out = dest / f"{name}.png"
            shoot(shell(body, theme, fonts, size, wash), out, size, tmp)
            print(f"  {out.relative_to(ROOT)}")

        # The second screenshot rides the numbers card's slot in the sequence,
        # so the carousel alternates media and type rather than stacking two
        # screens back to back.
        out = dest / "02-screen-b.png"
        body, theme, wash = screen_slide(p, p.screens[1], "02 / 06", tmp)
        shoot(shell(body, theme, fonts, FEED, wash), out, FEED, tmp)
        print(f"  {out.relative_to(ROOT)}")

        for label, size in ((("feed", FEED), ("reel", REEL)) if video else ()):
            out = dest / f"{p.slug}-{label}.mp4"
            build_video(p, size, out, tmp, fonts)
            print(f"  {out.relative_to(ROOT)}")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


BASE_TAGS = [
    "construction", "generalcontractor", "constructiontech", "contech",
    "preconstruction", "constructionmanagement", "privateai", "onpremai",
    "toronto", "gta", "ontarioconstruction",
]


def write_captions() -> None:
    """Emit CAPTIONS.md from the same data the cards are built from."""
    out = [
        "# MARAPONE — tool social kit",
        "",
        f"{len(PRODUCTS)} posts · one per product, in pipeline order. Each is a "
        "mixed carousel of",
        "6 slides (1080×1350) plus a standalone 9:16 Reel.",
        "",
        "Same layout grammar as the main kit in `instagram-posts/` — mono eyebrow,",
        "hairline-ruled index, Bebas in caps, DM Sans for body, the `//` marker — but",
        "built around real footage and screenshots of the applications rather than type",
        "alone. Every figure is lifted from the product's own page under `construction/`.",
        "",
        "Regenerate: `python3 scripts/build-tool-social.py [slug …] [--no-video]`",
        "",
        "**Carousel order** (Instagram takes mixed image/video carousels, video first):",
        "",
        "| # | File | What it is |",
        "|---|------|------------|",
        "| 1 | `<slug>-feed.mp4` | The app running, 4 views, ~26s |",
        "| 2 | `01-cover.png` | Headline and price |",
        "| 3 | `02-screen-b.png` | Second screen, with its figure |",
        "| 4 | `03-screen-a.png` | Lead screen, with its figure |",
        "| 5 | `04-numbers.png` | The four stats |",
        "| 6 | `05-proof.png` | One real finding |",
        "| 7 | `06-spec.png` | What you get · $990 |",
        "",
        "`<slug>-reel.mp4` is the 9:16 cut of the same footage for Reels — all copy sits",
        "above 1650px so Instagram's caption and action rail don't cover it.",
        "",
        "---",
        "",
    ]
    for p in PRODUCTS:
        tags = " ".join(f"#{t}" for t in p.hashtags + BASE_TAGS)
        views = ", ".join(c.name for c in p.clips)
        out += [
            f"## {p.stage} · {p.wordmark} — `tools/{p.slug}/`",
            "",
            f"*{p.question}. Views in the video: {views}.*",
            "",
            p.caption_text,
            "",
            "→ marapone.com",
            "",
            tags,
            "",
            "---",
            "",
        ]
    (OUT / "CAPTIONS.md").write_text("\n".join(out), encoding="utf-8")
    print(f"  {(OUT / 'CAPTIONS.md').relative_to(ROOT)}")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("slugs", nargs="*", help="limit to these product slugs")
    ap.add_argument("--no-video", action="store_true")
    args = ap.parse_args()

    if not Path(CHROME).exists():
        sys.exit(f"Google Chrome not found at {CHROME}")
    if not shutil.which("ffmpeg"):
        sys.exit("ffmpeg not on PATH")

    wanted = [p for p in PRODUCTS if not args.slugs or p.slug in args.slugs]
    if not wanted:
        sys.exit(f"no product matches {args.slugs}")

    fonts = bi.load_fonts()
    for p in wanted:
        print(f"{p.wordmark} …")
        build(p, fonts, video=not args.no_video)
    write_captions()
    print("done")


if __name__ == "__main__":
    main()
