#!/usr/bin/env python3
"""
Build the Marapone Instagram post kit — 1080x1350, in the construction site's
own brand.

Same kit format as the GASPEROHLAB set (4:5 portrait, carousels ordered by
filename, a CAPTIONS.md alongside) and the same layout grammar — a mono eyebrow,
a hairline-ruled index, a fact strip, a footer rule. Everything else is
Marapone: charcoal and hi-viz, Bebas Neue set in caps, DM Sans for body, DM Mono
for the structural labels, and the site's `// LABEL` marker instead of a dot.

Copy is lifted from construction/index.html, pricing.html and how-it-works.html
rather than written for social, so a card can't promise something the site
doesn't sell. The three figures on the proof card carry their case attribution
for the same reason.

    python3 scripts/build-instagram.py

Renders each card as a standalone HTML document and screenshots it with the
headless Chrome already on the machine. Fonts are pulled from Google Fonts once
into scripts/.font-cache/ and embedded, so a re-render needs no network.
"""

from __future__ import annotations

import base64
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.request
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "instagram-posts"
FONT_CACHE = Path(__file__).resolve().parent / ".font-cache"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

W, H = 1080, 1350

# ---------------------------------------------------------------------------
# Palette — tailwind.config.js, with two faces built out of it.
#
# The site itself is charcoal-only. A feed of seventeen charcoal cards reads as
# one long wall, so the statement posts run on `chalk`, which is already a brand
# token, just never used as a ground. That inversion needs one derived value:
# hi-viz #f97316 as *type* on chalk is about 2.6:1 and unreadable, so accent text
# there steps down to orange-700 (#c2410c, 5.0:1). The fill stays hi-viz, since
# it carries white label text either way.
# ---------------------------------------------------------------------------

STEEL = {
    "bg": "#1a1a1a",
    "surface": "#232323",
    "fg": "#e8e8e8",
    "muted": "#a0a0a0",
    "faint": "#8a8a8a",
    "border": "rgba(232, 232, 232, 0.14)",
    "border_strong": "rgba(232, 232, 232, 0.28)",
    "accent": "#f97316",
    "accent_text": "#fb923c",
    "on_accent": "#1a1a1a",
    "grain_blend": "screen",
    "grain_opacity": "0.03",
}

CHALK = {
    "bg": "#e8e8e8",
    "surface": "#dedede",
    "fg": "#1a1a1a",
    "muted": "#4a4a4a",
    "faint": "#5e5e5e",
    "border": "rgba(26, 26, 26, 0.16)",
    "border_strong": "rgba(26, 26, 26, 0.30)",
    "accent": "#ea580c",
    "accent_text": "#c2410c",
    "on_accent": "#ffffff",
    "grain_blend": "multiply",
    "grain_opacity": "0.05",
}

GRAIN = (
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' "
    "width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence "
    "type='fractalNoise' baseFrequency='0.8' numOctaves='4' "
    "stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' "
    "values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' "
    "filter='url(%23n)'/%3E%3C/svg%3E\")"
)

# The Google Fonts latin subset stops short of U+2192, so every arrow on these
# cards is drawn rather than typed — a missing-glyph box in a headline is the
# one rendering failure nobody forgives.
ARROW = (
    "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' "
    "stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round' "
    "style='width:1em;height:1em;vertical-align:-0.1em'>"
    "<path d='M5 12h14M13 6l6 6-6 6'/></svg>"
)

# Same reason as the arrow: U+2713 isn't in the latin subset either.
CHECK = (
    "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' "
    "stroke-width='3' stroke-linecap='round' stroke-linejoin='round' "
    "style='width:0.82em;height:0.82em'><path d='M4 12.5l5.5 5.5L20 6.5'/></svg>"
)

FONT_SPECS = {
    "BebasNeue-Regular": ("family=Bebas+Neue", "Bebas", 400),
    "DMSans-Regular": ("family=DM+Sans:wght@400", "DMSans", 400),
    "DMSans-Medium": ("family=DM+Sans:wght@500", "DMSans", 500),
    "DMSans-Bold": ("family=DM+Sans:wght@700", "DMSans", 700),
    "DMMono-Regular": ("family=DM+Mono:wght@400", "DMMono", 400),
    "DMMono-Medium": ("family=DM+Mono:wght@500", "DMMono", 500),
}

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120 Safari/537.36"
)


def fetch_font(name: str, query: str) -> bytes:
    """Pull one latin-subset woff2 out of the Google Fonts CSS API."""
    css = urllib.request.urlopen(
        urllib.request.Request(
            f"https://fonts.googleapis.com/css2?{query}&display=swap",
            headers={"User-Agent": UA},
        )
    ).read().decode()
    latin = None
    for block in css.split("@font-face"):
        if "unicode-range: U+0000" in block:
            m = re.search(r"url\((https://[^)]+\.woff2)\)", block)
            if m:
                latin = m.group(1)
    if latin is None:
        m = re.search(r"url\((https://[^)]+\.woff2)\)", css)
        if not m:
            sys.exit(f"no woff2 in the CSS for {name}")
        latin = m.group(1)
    return urllib.request.urlopen(
        urllib.request.Request(latin, headers={"User-Agent": UA})
    ).read()


def load_fonts() -> str:
    FONT_CACHE.mkdir(parents=True, exist_ok=True)
    faces = []
    for name, (query, family, weight) in FONT_SPECS.items():
        path = FONT_CACHE / f"{name}.woff2"
        if not path.exists():
            print(f"  fetching {name} …")
            path.write_bytes(fetch_font(name, query))
        data = base64.b64encode(path.read_bytes()).decode()
        faces.append(
            f"@font-face{{font-family:'{family}';font-weight:{weight};"
            f"font-style:normal;font-display:block;"
            f"src:url(data:font/woff2;base64,{data}) format('woff2')}}"
        )
    return "".join(faces)


# ---------------------------------------------------------------------------
# Page shell
# ---------------------------------------------------------------------------

CSS = """
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:%(W)dpx;height:%(H)dpx;overflow:hidden}
body{
  background:var(--bg);color:var(--fg);
  font-family:'DMSans',system-ui,sans-serif;
  -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility;
  font-size:26px;line-height:1.6;
}
.card{position:relative;width:%(W)dpx;height:%(H)dpx;overflow:hidden;isolation:isolate}
.grain{position:absolute;inset:0;z-index:3;pointer-events:none;
  background-image:%(GRAIN)s;opacity:var(--grain-opacity);
  mix-blend-mode:var(--grain-blend)}
/* A hi-viz wash off the top-right corner — the only gradient the site allows
   itself, and the reason a charcoal card doesn't read as a flat rectangle. */
.wash{position:absolute;inset:0;z-index:0;pointer-events:none;
  background:radial-gradient(70%% 48%% at 88%% 4%%,
    rgba(249,115,22,var(--wash)) 0%%,rgba(249,115,22,0) 68%%)}
.inner{position:relative;z-index:2;display:flex;flex-direction:column;
  width:100%%;height:100%%;padding:82px 72px 74px}
.body-fill{flex:1;min-height:0;display:flex;flex-direction:column;
  justify-content:center}

/* Bebas is caps-only and very tall, so it wants a shorter line height and a
   touch of tracking that a normal display face would not. */
.t-hero{font-family:'Bebas',sans-serif;font-size:132px;line-height:0.88;
  letter-spacing:0.012em;font-weight:400;text-wrap:balance}
.t-h1{font-family:'Bebas',sans-serif;font-size:104px;line-height:0.9;
  letter-spacing:0.014em;text-wrap:balance}
.t-h2{font-family:'Bebas',sans-serif;font-size:78px;line-height:0.94;
  letter-spacing:0.016em;text-wrap:balance}
.t-h3{font-family:'Bebas',sans-serif;font-size:52px;line-height:1;
  letter-spacing:0.02em}
.t-lede{font-size:30px;line-height:1.5;color:var(--muted);text-wrap:pretty}
.t-body{font-size:25px;line-height:1.55;color:var(--muted);text-wrap:pretty}
.eyebrow{font-family:'DMMono',ui-monospace,monospace;font-size:19px;
  line-height:1;letter-spacing:0.18em;text-transform:uppercase;
  color:var(--faint)}
.slashes{color:var(--accent-text);margin-right:12px}
.accent{color:var(--accent-text)}
.fg{color:var(--fg)}

.rule{height:1px;background:var(--border);width:100%%}

.head{display:flex;align-items:flex-start;justify-content:space-between;gap:40px}
.pager{font-family:'DMMono',ui-monospace,monospace;font-size:19px;
  letter-spacing:0.18em;color:var(--faint);white-space:nowrap}

.foot{display:flex;align-items:baseline;justify-content:space-between;
  font-family:'DMMono',ui-monospace,monospace;font-size:19px;
  letter-spacing:0.14em;text-transform:uppercase;color:var(--faint)}
.foot .rule{margin-bottom:26px}
.foot .mark{font-family:'Bebas',sans-serif;font-size:30px;letter-spacing:0.14em;
  color:var(--fg)}

.swipe{font-family:'DMMono',ui-monospace,monospace;font-size:19px;
  letter-spacing:0.18em;text-transform:uppercase;color:var(--faint);
  display:flex;align-items:center;justify-content:flex-end;gap:12px;
  margin-bottom:26px}
.swipe i{color:var(--accent-text);font-style:normal;display:inline-flex}

.rows{border-top:1px solid var(--border)}
.row{border-bottom:1px solid var(--border);padding:26px 0}
.row .top{display:flex;align-items:baseline;justify-content:space-between;gap:24px}
.row h3{margin-top:12px}
.row p{margin-top:8px;max-width:830px}

.price{font-family:'Bebas',sans-serif;font-size:44px;letter-spacing:0.02em;
  color:var(--accent-text);white-space:nowrap}

.strip{display:grid;grid-template-columns:repeat(2,1fr);
  border-top:1px solid var(--border)}
.strip > div{padding:24px 0;border-bottom:1px solid var(--border)}
.strip > div:nth-child(even){border-left:1px solid var(--border);padding-left:34px}
.strip dt{margin-bottom:12px}
.strip dd{font-size:25px;color:var(--fg)}

.stats{display:grid;grid-template-columns:1fr;border-top:1px solid var(--border)}
.stats > div{padding:34px 0;border-bottom:1px solid var(--border);
  display:flex;align-items:baseline;gap:38px}
.stats .n{font-family:'Bebas',sans-serif;font-size:92px;line-height:0.85;
  letter-spacing:0.01em;color:var(--accent-text);min-width:250px}
.stats .l{font-size:26px;line-height:1.4;color:var(--fg)}
.stats .s{display:block;margin-top:8px;font-family:'DMMono',ui-monospace,monospace;
  font-size:18px;letter-spacing:0.12em;text-transform:uppercase;color:var(--faint)}

/* Spec bullets — the site's check list, set as a ruled column so it keeps the
   same grammar as everything else here. */
.checks{border-top:1px solid var(--border)}
.checks li{list-style:none;display:flex;gap:22px;padding:24px 0;
  border-bottom:1px solid var(--border);font-size:26px;line-height:1.4;
  color:var(--fg)}
.checks .tick{color:var(--accent-text);font-family:'DMMono',monospace;
  font-size:22px;line-height:1.5;flex:none}

.btn{display:inline-flex;align-items:center;gap:14px;background:var(--accent);
  color:var(--on-accent);font-family:'Bebas',sans-serif;font-size:34px;
  letter-spacing:0.04em;padding:18px 34px;border-radius:4px}
.btn-ghost{display:inline-flex;align-items:center;gap:14px;
  border:1px solid var(--border-strong);color:var(--fg);
  font-family:'Bebas',sans-serif;font-size:34px;letter-spacing:0.04em;
  padding:18px 34px;border-radius:4px}

.wordmark{font-family:'Bebas',sans-serif;letter-spacing:0.1em}
.tagline{font-family:'DMMono',ui-monospace,monospace;font-size:20px;
  letter-spacing:0.16em;text-transform:uppercase;color:var(--faint)}
"""


@dataclass
class Card:
    name: str
    theme: dict
    body: str
    wash: float = 0.10


def shell(card: Card, fonts: str) -> str:
    t = card.theme
    variables = "\n".join(
        f"  --{k}: {v};"
        for k, v in {
            "bg": t["bg"],
            "surface": t["surface"],
            "fg": t["fg"],
            "muted": t["muted"],
            "faint": t["faint"],
            "border": t["border"],
            "border-strong": t["border_strong"],
            "accent": t["accent"],
            "accent-text": t["accent_text"],
            "on-accent": t["on_accent"],
            "grain-blend": t["grain_blend"],
            "grain-opacity": t["grain_opacity"],
            "wash": f"{card.wash}",
        }.items()
    )
    return (
        "<!doctype html><html><head><meta charset='utf-8'><style>"
        + fonts
        + ":root{\n"
        + variables
        + "\n}"
        + (CSS % {"W": W, "H": H, "GRAIN": GRAIN})
        + "</style></head><body><div class='card'>"
        + "<div class='wash'></div>"
        + card.body
        + "<div class='grain'></div></div></body></html>"
    )


# ---------------------------------------------------------------------------
# Fragments
# ---------------------------------------------------------------------------


def head(label: str, pager: str = "") -> str:
    p = f"<div class='pager'>{pager}</div>" if pager else ""
    return (
        f"<div class='head'><p class='eyebrow'><span class='slashes'>//</span>"
        f"{label}</p>{p}</div>"
    )


def foot(swipe: bool = False) -> str:
    s = (
        f"<div class='swipe'>swipe <i>{ARROW}</i></div>" if swipe else ""
    )
    return (
        f"<div style='margin-top:auto'>{s}<div class='rule'></div>"
        f"<div class='foot'><span class='mark'>MARA"
        f"<span class='accent'>PONE</span></span>"
        f"<span>marapone.com</span></div></div>"
    )


def wrap(*parts: str) -> str:
    return "<div class='inner'>" + "".join(parts) + "</div>"


def checks(items: list[str]) -> str:
    li = "".join(
        f"<li><span class='tick'>{CHECK}</span><span>{i}</span></li>"
        for i in items
    )
    return f"<ul class='checks'>{li}</ul>"


def product(stage: str, name: str, price: str, blurb: str) -> str:
    return (
        f"<div class='row'><div class='top'>"
        f"<span class='eyebrow'>{stage}</span>"
        f"<span class='price'>{price}</span></div>"
        f"<h3 class='t-h3'>{name}</h3>"
        f"<p class='t-body'>{blurb}</p></div>"
    )


# ---------------------------------------------------------------------------
# The kit — 10 posts, 17 cards.
# ---------------------------------------------------------------------------


def build_cards() -> list[Card]:
    cards: list[Card] = []

    # 01 — Flagship. The construction hero, verbatim.
    cards.append(
        Card(
            "01-flagship",
            STEEL,
            wrap(
                head("Private construction AI"),
                "<h1 class='t-hero' style='margin-top:74px;max-width:900px'>"
                "Stop renting<br>your AI.<br>"
                "<span class='accent'>Own the engine.</span></h1>",
                "<p class='t-lede' style='margin-top:48px;max-width:740px'>"
                "Private AI for general contractors, estimators and tender "
                "teams — deployed on your infrastructure, trained on your "
                "blueprints, handed to you permanently.</p>",
                "<div style='margin-top:auto'>"
                "<dl class='strip'>"
                "<div><dt class='eyebrow'>Deployed</dt>"
                "<dd>On your own machine</dd></div>"
                "<div><dt class='eyebrow'>Price</dt>"
                "<dd>One time, no subscription</dd></div>"
                "<div><dt class='eyebrow'>Your data</dt>"
                "<dd>Never leaves the building</dd></div>"
                "<div><dt class='eyebrow'>Regions</dt>"
                "<dd>Canada &amp; Italy</dd></div>"
                "</dl>"
                "<div class='foot' style='margin-top:30px'>"
                "<span class='mark'>MARA<span class='accent'>PONE</span></span>"
                "<span>marapone.com</span></div></div>",
            ),
            wash=0.13,
        )
    )

    # 02 — The three tools (carousel x3)
    cards.append(
        Card(
            "02a-tools-cover",
            CHALK,
            wrap(
                head("What we build", "01 / 03"),
                "<div class='body-fill'>"
                "<h2 class='t-h1' style='max-width:900px'>Three tools,<br>"
                "ready now.<br><span class='accent'>One built around you.</span>"
                "</h2>"
                "<p class='t-lede' style='margin-top:44px;max-width:740px'>"
                "Buy a finished product and run it this week, or commission a "
                "system shaped around how your company actually works. Every "
                "one is bought once, runs on your own hardware, and ships with "
                "the source code.</p></div>",
                foot(swipe=True),
            ),
            wash=0.0,
        )
    )
    cards.append(
        Card(
            "02b-tools-list",
            STEEL,
            wrap(
                head("One job, three stages", "02 / 03"),
                "<div class='body-fill'>"
                "<div class='rows'>"
                + product(
                    "Before the bid",
                    "Blueprint Auditor",
                    "$990",
                    "How much is there, and what are the drawings hiding? "
                    "Quantities, scope gaps and code conflicts, read straight "
                    "off the PDF set.",
                )
                + product(
                    "At the bid",
                    "AI Estimator",
                    "$990",
                    "What should you bid, and where is the walk-away number? "
                    "Quantities become studs, board, waste, crew-hours, risk "
                    "and margin.",
                )
                + product(
                    "After you win",
                    "ScopeGuard",
                    "$990",
                    "Is the margin you bid still the margin you keep? Every "
                    "subcontractor exclusion read against your own tender "
                    "documents.",
                )
                + "</div></div>",
                foot(swipe=True),
            ),
        )
    )
    cards.append(
        Card(
            "02c-tools-suite",
            STEEL,
            wrap(
                head("All three", "03 / 03"),
                "<div class='body-fill'>"
                "<p class='eyebrow'>Drawings "
                f"<span class='accent'>{ARROW}</span> awarded subcontract</p>"
                "<h2 class='t-hero' style='margin-top:34px;max-width:900px'>"
                "The suite.<br><span class='accent'>$2,490</span> once.</h2>"
                "<p class='t-lede' style='margin-top:40px;max-width:760px'>"
                "Save $480 against buying separately. The takeoff feeds the "
                "estimate and the estimate becomes ScopeGuard's budget, so a "
                "job runs from the drawing set to the awarded subcontract with "
                "nothing retyped — which removes every seam where estimating "
                "errors are actually born.</p></div>",
                foot(),
            ),
            wash=0.14,
        )
    )

    # 03 — The handover statement
    cards.append(
        Card(
            "03-you-own-it",
            CHALK,
            wrap(
                head("Installation &amp; handover"),
                "<div class='body-fill'>"
                "<p class='t-hero' style='max-width:900px'>You own it.<br>"
                "<span class='accent'>We walk away.</span></p>"
                "<p class='t-lede' style='margin-top:46px;max-width:760px'>"
                "Source code, model weights, documentation and an onboarding "
                "session. After handover you can modify it, extend it, or hand "
                "it to another developer. No usage restrictions, no renewals, "
                "and no dependency on our servers continuing to exist.</p>"
                "</div>",
                foot(),
            ),
            wash=0.0,
        )
    )

    # 04 — Blueprint Auditor (carousel x2)
    cards.append(
        Card(
            "04a-blueprint-auditor",
            STEEL,
            wrap(
                head("Product 01 &middot; takeoff &amp; review", "01 / 02"),
                "<div class='body-fill'>"
                "<p class='eyebrow'>Before the bid &middot; free live demo</p>"
                "<h2 class='t-hero' style='margin-top:32px;max-width:900px'>"
                "Blueprint<br>Auditor</h2>"
                "<p class='t-lede' style='margin-top:40px;max-width:760px'>"
                "Drop in a drawing set. It reads the sheets, measures the "
                "quantities, and flags what the drawings contradict — before "
                "it becomes a change order.</p>"
                "<p class='t-body' style='margin-top:34px'>"
                "<span class='accent'>$990</span> CAD &middot; one time &middot; "
                "source code included</p></div>",
                foot(swipe=True),
            ),
            wash=0.13,
        )
    )
    cards.append(
        Card(
            "04b-blueprint-auditor-spec",
            STEEL,
            wrap(
                head("What you get", "02 / 02"),
                "<div class='body-fill'>"
                + checks(
                    [
                        "Quantity takeoff read straight off the PDF drawing set",
                        "Scope-gap and drawing-conflict detection",
                        "Ontario Building Code compliance checks",
                        "Tender risk scan across the bid documents",
                        "RFI, deficiency and change-order lists generated for you",
                        "Unlimited drawings — no per-sheet or per-project fees",
                        "Full source code on day 31, once the refund window closes",
                    ]
                )
                + "<p class='t-body' style='margin-top:34px'>Run it on your own "
                "drawings, free — marapone.com</p></div>",
                foot(),
            ),
        )
    )

    # 05 — AI Estimator (carousel x2)
    cards.append(
        Card(
            "05a-ai-estimator",
            STEEL,
            wrap(
                head("Product 02 &middot; pricing &amp; strategy", "01 / 02"),
                "<div class='body-fill'>"
                "<p class='eyebrow'>At the bid</p>"
                "<h2 class='t-hero' style='margin-top:32px;max-width:900px'>"
                "AI<br>Estimator</h2>"
                "<p class='t-lede' style='margin-top:40px;max-width:760px'>"
                "Takeoff says there are 24,000 square feet of partition. This "
                "turns that into studs, board, waste and crew-hours — then adds "
                "the risk, the contingency, the Toronto soft costs and the "
                "margin you can actually win at.</p>"
                "<p class='t-body' style='margin-top:34px'>"
                "<span class='accent'>$990</span> CAD &middot; one time &middot; "
                "source code included</p></div>",
                foot(swipe=True),
            ),
            wash=0.13,
        )
    )
    cards.append(
        Card(
            "05b-ai-estimator-spec",
            STEEL,
            wrap(
                head("What you get", "02 / 02"),
                "<div class='body-fill'>"
                + checks(
                    [
                        "57 parametric assemblies across 20 CSI divisions",
                        "27 risk rules — a contingency with a written reason",
                        "Toronto permits, development charges, HST and rebates",
                        "Monte Carlo, tornado sensitivity, eight what-if presets",
                        "Margin ladder with win probability from your own bids",
                        "Procore, Sage, QuickBooks and Bluebeam exports",
                        "Full source code on day 31 — every fee schedule editable",
                    ]
                )
                + "</div>",
                foot(),
            ),
        )
    )

    # 06 — ScopeGuard (carousel x2)
    cards.append(
        Card(
            "06a-scopeguard",
            STEEL,
            wrap(
                head("Product 03 &middot; buyout &amp; scope", "01 / 02"),
                "<div class='body-fill'>"
                "<p class='eyebrow'>After you win &middot; new</p>"
                "<h2 class='t-hero' style='margin-top:32px;max-width:900px'>"
                "Scope<br>Guard</h2>"
                "<p class='t-lede' style='margin-top:40px;max-width:760px'>"
                "You won the job. Now twenty subcontractors send you their own "
                "exclusions. ScopeGuard reads every letter against your tender "
                "documents and puts a number on what nobody priced.</p>"
                "<p class='t-body' style='margin-top:34px'>"
                "<span class='accent'>$990</span> CAD &middot; one time &middot; "
                "source code included</p></div>",
                foot(swipe=True),
            ),
            wash=0.13,
        )
    )
    cards.append(
        Card(
            "06b-scopeguard-spec",
            STEEL,
            wrap(
                head("What you get", "02 / 02"),
                "<div class='body-fill'>"
                + checks(
                    [
                        "215 master scope requirements across 20 trade packages",
                        "Eight finding types — missing scope, overlap, ambiguity …",
                        "Every finding cited to your clause and their page",
                        "Costed exposure from a Toronto 2026 subcontract rate table",
                        "Clarification letters drafted in one click",
                        "100% local — it works with the wifi off",
                        "Full source code plus the knowledge base as editable JSON",
                    ]
                )
                + "</div>",
                foot(),
            ),
        )
    )

    # 07 — Proof. Every figure carries its case, because the site's own line is
    # that they come from three documented builds and nowhere else.
    cards.append(
        Card(
            "07-proof",
            STEEL,
            wrap(
                head("The numbers"),
                "<div class='body-fill'>"
                "<h2 class='t-h1' style='max-width:840px'>Three documented "
                "builds. <span class='accent'>Three numbers.</span></h2>"
                "<p class='t-lede' style='margin-top:30px;max-width:760px'>"
                "Nothing here is a projection — run them against your own shop "
                "with the ROI calculator.</p>"
                "<div class='stats' style='margin-top:48px'>"
                "<div><span class='n'>6&ndash;8h</span><span class='l'>"
                "Staff hours recovered per week"
                "<span class='s'>Case 01</span></span></div>"
                "<div><span class='n'>&minus;41%</span><span class='l'>"
                f"RFI turnaround, 9.2 {ARROW} 5.4 days"
                "<span class='s'>Case 02</span></span></div>"
                "<div><span class='n'>3 mo</span><span class='l'>"
                "Time to break even"
                "<span class='s'>Cases 01 &amp; 02</span></span></div>"
                "</div></div>",
                foot(),
            ),
        )
    )

    # 08 — Four steps (carousel x2)
    cards.append(
        Card(
            "08a-how-it-works",
            CHALK,
            wrap(
                head("How it works", "01 / 02"),
                "<div class='body-fill'>"
                "<h2 class='t-hero' style='max-width:900px'>Four steps<br>"
                "to <span class='accent'>owning it.</span></h2>"
                "<p class='t-lede' style='margin-top:44px;max-width:740px'>"
                "From your documents to a private system you own outright. Most "
                "builds ship in two to three weeks, from scoping to handover.</p>"
                "</div>",
                foot(swipe=True),
            ),
            wash=0.0,
        )
    )
    steps = [
        ("Intake", "You hand over your documents — one real file is enough to start."),
        ("Build", "We fine-tune a private model on your formats, in our secure environment."),
        ("Deploy", "It runs on your infrastructure — your office server or a local machine."),
        ("Own", "Source code, model weights, docs and onboarding. Then we walk away."),
    ]
    step_html = "".join(
        f"<div style='border-top:1px solid var(--border);padding:28px 0 8px'>"
        f"<span class='eyebrow'>Step 0{i + 1}</span>"
        f"<h3 class='t-h3' style='margin-top:18px'>{t}</h3>"
        f"<p class='t-body' style='margin-top:12px;max-width:830px'>{b}</p></div>"
        for i, (t, b) in enumerate(steps)
    )
    cards.append(
        Card(
            "08b-how-it-works-steps",
            STEEL,
            wrap(
                head("Four steps to owning it", "02 / 02"),
                f"<div class='body-fill'>{step_html}"
                "<div style='border-top:1px solid var(--border)'></div></div>",
                foot(),
            ),
        )
    )

    # 09 — What ownership actually means
    cards.append(
        Card(
            "09-ownership",
            CHALK,
            wrap(
                head("No vague platform access"),
                "<div class='body-fill'>"
                "<h2 class='t-h1' style='max-width:860px'>What you actually "
                "<span class='accent'>get handed.</span></h2>"
                + "<div style='margin-top:40px'>"
                + checks(
                    [
                        "One-time price — no subscriptions, no per-seat fees",
                        "Full source code, yours to modify or hand to anyone",
                        "Runs on your own machine, in your own environment",
                        "Your documents deleted from our systems after the build",
                        "30-day full refund guarantee, no questions asked",
                    ]
                )
                + "</div></div>",
                foot(),
            ),
            wash=0.0,
        )
    )

    # 10 — CTA (carousel x2)
    cards.append(
        Card(
            "10a-assessment",
            STEEL,
            wrap(
                head("Free 24-hour assessment", "01 / 02"),
                "<div class='body-fill'>"
                "<h2 class='t-hero' style='max-width:900px;font-size:116px'>"
                "Send one document.<br><span class='accent'>Get a real answer "
                "in 24 hours.</span></h2>"
                "<p class='t-lede' style='margin-top:44px;max-width:760px'>"
                "A blueprint, a stack of daily logs, an RFI log or a tender "
                "package. We analyse it, review the output personally, and send "
                "back a written report and a short video walkthrough within 24 "
                "hours. No pitch, no obligation.</p>"
                f"<div style='margin-top:48px;display:flex;gap:20px'>"
                f"<span class='btn'>Get the assessment <i>{ARROW}</i></span>"
                f"<span class='btn-ghost'>marapone.com</span></div></div>",
                foot(swipe=True),
            ),
            wash=0.14,
        )
    )
    cards.append(
        Card(
            "10b-close",
            STEEL,
            wrap(
                head("Private AI, built and handed over", "02 / 02"),
                "<div class='body-fill'>"
                "<p class='wordmark' style='font-size:104px;line-height:1'>MARA"
                "<span class='accent'>PONE</span></p>"
                "<p class='tagline' style='margin-top:18px'>Contracting Inc. "
                "&middot; Canada &amp; Italy</p>"
                "<p class='t-lede' style='margin-top:38px;max-width:720px'>"
                "Private AI systems for construction teams — general "
                "contractors, estimators and owners' reps. Built around your "
                "documents, deployed on your hardware, handed over with the "
                "source.</p>"
                "<div class='rule' style='margin:48px 0 32px'></div>"
                "<p class='eyebrow' style='line-height:2.4'>marapone.com<br>"
                "@maraponehq</p></div>",
                foot(),
            ),
        )
    )

    return cards


# ---------------------------------------------------------------------------
# Render
# ---------------------------------------------------------------------------


def render(cards: list[Card]) -> None:
    if not Path(CHROME).exists():
        sys.exit(f"Google Chrome not found at {CHROME}")
    fonts = load_fonts()
    OUT.mkdir(parents=True, exist_ok=True)
    tmp = Path(tempfile.mkdtemp(prefix="iggen-"))
    try:
        for card in cards:
            html = tmp / f"{card.name}.html"
            html.write_text(shell(card, fonts), encoding="utf-8")
            shot = tmp / f"{card.name}.png"
            subprocess.run(
                [
                    CHROME,
                    "--headless",
                    "--disable-gpu",
                    "--hide-scrollbars",
                    "--force-device-scale-factor=2",
                    f"--window-size={W},{H}",
                    f"--screenshot={shot}",
                    "--virtual-time-budget=1500",
                    str(html),
                ],
                check=True,
                capture_output=True,
            )
            final = OUT / f"{card.name}.png"
            subprocess.run(
                ["sips", "-z", str(H), str(W), str(shot), "--out", str(final)],
                check=True,
                capture_output=True,
            )
            print(f"  {final.relative_to(ROOT)}")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    cards = build_cards()
    print(f"Rendering {len(cards)} cards at {W}x{H} …")
    render(cards)
    print("done")
