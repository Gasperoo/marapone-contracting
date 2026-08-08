#!/usr/bin/env python3
"""
Build the MARAPONE wordmark as a square profile picture.

    python3 scripts/build-avatar.py

Bebas Neue in caps with the site's 0.1em wordmark tracking — the same setting
as the `.wordmark` class in `build-instagram.py`, so the avatar and the post
footers are the same mark. MARA in white, PONE in hi-viz.

No grain and no wash: at 32px in a comment thread those read as mud, and a
profile picture only ever has to survive being made small.

Two things this has to get right that a card does not:

  * **The circle.** Every platform crops a square avatar to a circle, so the
    mark is fitted to CIRCLE_FIT of the width — inside the inscribed circle with
    room to breathe — rather than to the square's margins.
  * **Optical centring.** Letter-spacing adds a trailing gap after the final E,
    and Bebas sets its caps well off the em box's centre — so a mark centred by
    layout sits visibly low and left. Nothing Chrome reports is exact enough to
    fix that: SVG getBBox() is derived from font metrics, and leaves the mark
    ~1.5% off centre and ~3% under its target width. So the wordmark is
    rendered oversized on transparency, cropped to its measured alpha bounds,
    and composited dead centre — exact by construction rather than by metric.

Output: instagram-posts/brand/
"""

from __future__ import annotations

import importlib.util
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "instagram-posts" / "brand"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

_spec = importlib.util.spec_from_file_location(
    "build_instagram", Path(__file__).resolve().parent / "build-instagram.py"
)
bi = importlib.util.module_from_spec(_spec)
sys.modules["build_instagram"] = bi
_spec.loader.exec_module(bi)

SIZE = 2048          # rendered at dpr 2 and downsampled, so 4096 of real detail
CIRCLE_FIT = 0.70    # mark width as a fraction of the square

CHARCOAL = "#1a1a1a"
WHITE = "#ffffff"
HIVIZ = "#f97316"

# Rendered wide and oversized on transparency; Pillow does the fitting, so the
# only thing this page has to get right is drawing the glyphs cleanly.
STRIP_W, STRIP_H = 2400, 700

PAGE = """<!doctype html><html><head><meta charset='utf-8'><style>
%(FONTS)s
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:%(W)dpx;height:%(H)dpx;overflow:hidden}
body{-webkit-font-smoothing:antialiased;
  display:flex;align-items:center;justify-content:center}
.mark{font-family:'Bebas',sans-serif;font-weight:400;font-size:400px;
  line-height:1;letter-spacing:0.1em;white-space:nowrap;color:%(WHITE)s}
.mark .hi{color:%(HIVIZ)s}
</style></head><body>
<div class='mark'>MARA<span class='hi'>PONE</span></div>
</body></html>
"""


def render_wordmark(fonts: str, tmp: Path) -> "Image.Image":
    """The wordmark on transparency, cropped to its own ink."""
    html = tmp / "wordmark.html"
    html.write_text(
        PAGE % {"FONTS": fonts, "W": STRIP_W, "H": STRIP_H,
                "WHITE": WHITE, "HIVIZ": HIVIZ},
        encoding="utf-8",
    )
    shot = tmp / "wordmark.png"
    subprocess.run(
        [CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
         "--force-device-scale-factor=2",
         f"--window-size={STRIP_W},{STRIP_H}",
         "--default-background-color=00000000",
         f"--screenshot={shot}", "--virtual-time-budget=2500", str(html)],
        check=True, capture_output=True,
    )
    mark = Image.open(shot).convert("RGBA")
    box = mark.getbbox()
    if box is None:
        sys.exit("the wordmark rendered empty — check the font cache")
    return mark.crop(box)


def compose(mark: "Image.Image", background: str | None) -> "Image.Image":
    """Centre the cropped mark on a square at CIRCLE_FIT of the width."""
    target_w = round(SIZE * CIRCLE_FIT)
    target_h = round(mark.height * target_w / mark.width)
    scaled = mark.resize((target_w, target_h), Image.LANCZOS)

    canvas = Image.new(
        "RGBA", (SIZE, SIZE),
        (0, 0, 0, 0) if background is None else background,
    )
    canvas.alpha_composite(
        scaled, ((SIZE - target_w) // 2, (SIZE - target_h) // 2)
    )
    return canvas


def save(image: "Image.Image", name: str) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for size in (SIZE, 512):
        out = OUT / (f"{name}.png" if size == SIZE else f"{name}-{size}.png")
        (image if size == SIZE
         else image.resize((size, size), Image.LANCZOS)).save(out)
        print(f"  {out.relative_to(ROOT)}  {size}x{size}")


def main() -> None:
    if not Path(CHROME).exists():
        sys.exit(f"Google Chrome not found at {CHROME}")
    fonts = bi.load_fonts()
    tmp = Path(tempfile.mkdtemp(prefix="avatar-"))
    try:
        mark = render_wordmark(fonts, tmp)
        print(f"  wordmark ink {mark.width}x{mark.height}")
        save(compose(mark, CHARCOAL), "marapone-avatar")
        save(compose(mark, None), "marapone-avatar-transparent")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
    print("done")


if __name__ == "__main__":
    main()
