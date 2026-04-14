"""
Marapone Contracting — Instagram Content Generator
Generates 10 professional Instagram posts (1080×1080) + 1 4K wallpaper (3840×2160)
Brand palette: #1a1a1a · #f97316 · #e8e8e8 · #a0a0a0
"""

from PIL import Image, ImageDraw, ImageFont
import os
import math
import random

# ── Paths ──────────────────────────────────────────────────────────────────────
OUT_DIR    = os.path.dirname(os.path.abspath(__file__))
FONT_DIR   = "/tmp/marapone-fonts"
LOGO_PATH  = os.path.join(os.path.dirname(OUT_DIR), "MaraponeLogo-1.png")

BEBAS_PATH  = os.path.join(FONT_DIR, "BebasNeue-Regular.ttf")
DMSANS_PATH = os.path.join(FONT_DIR, "DMSans-Regular.ttf")
DMSANS_MED  = os.path.join(FONT_DIR, "DMSans-Medium.ttf")

# ── Brand colours ──────────────────────────────────────────────────────────────
CHARCOAL  = (26, 26, 26)
GUNMETAL  = (35, 35, 35)
STEEL     = (46, 46, 46)
PLATE     = (58, 58, 58)
ORANGE    = (249, 115, 22)
ORANGE2   = (234, 88, 12)
CHALK     = (232, 232, 232)
FOG       = (160, 160, 160)
WHITE     = (255, 255, 255)
BLACK     = (0, 0, 0)

# ── Font helpers ───────────────────────────────────────────────────────────────
def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

def bebas(size):   return font(BEBAS_PATH,  size)
def dm(size):      return font(DMSANS_PATH, size)
def dm_med(size):  return font(DMSANS_MED,  size)

# ── Canvas helpers ─────────────────────────────────────────────────────────────
def new_canvas(w=1080, h=1080):
    img = Image.new("RGB", (w, h), CHARCOAL)
    return img, ImageDraw.Draw(img)

def dot_grid(draw, w, h, spacing=36, alpha=30):
    """Subtle dot grid texture matching the website background."""
    dot_color = (58, 58, 58)
    for x in range(0, w, spacing):
        for y in range(0, h, spacing):
            draw.ellipse([x-1, y-1, x+1, y+1], fill=dot_color)

def orange_bar(draw, y, w, height=4):
    """Full-width horizontal orange accent bar."""
    draw.rectangle([0, y, w, y + height], fill=ORANGE)

def corner_accent(draw, w, h, size=80):
    """Orange corner marks — top-left and bottom-right."""
    s = size
    lw = 4
    # Top-left
    draw.rectangle([0, 0, lw, s], fill=ORANGE)
    draw.rectangle([0, 0, s, lw], fill=ORANGE)
    # Bottom-right
    draw.rectangle([w - lw, h - s, w, h], fill=ORANGE)
    draw.rectangle([w - s, h - lw, w, h], fill=ORANGE)

def draw_logo(img, x, y, size):
    """Paste the PNG logo at (x, y) scaled to `size` px wide."""
    try:
        logo = Image.open(LOGO_PATH).convert("RGBA")
        ratio = size / logo.width
        new_h = int(logo.height * ratio)
        logo = logo.resize((size, new_h), Image.LANCZOS)
        img.paste(logo, (x, y), logo)
    except Exception as e:
        print(f"  Logo error: {e}")

def centre_text(draw, text, font_obj, y, w, color=CHALK):
    bbox = draw.textbbox((0, 0), text, font=font_obj)
    text_w = bbox[2] - bbox[0]
    draw.text(((w - text_w) // 2, y), text, font=font_obj, fill=color)

def wrap_text(draw, text, font_obj, max_w, x, y, line_spacing=8, color=CHALK):
    """Simple word-wrap and draw, returns final y."""
    words = text.split()
    lines, line = [], []
    for word in words:
        test = " ".join(line + [word])
        bbox = draw.textbbox((0, 0), test, font=font_obj)
        if bbox[2] - bbox[0] <= max_w:
            line.append(word)
        else:
            if line:
                lines.append(" ".join(line))
            line = [word]
    if line:
        lines.append(" ".join(line))
    for l in lines:
        draw.text((x, y), l, font=font_obj, fill=color)
        bbox = draw.textbbox((0, 0), l, font=font_obj)
        y += (bbox[3] - bbox[1]) + line_spacing
    return y

def save(img, name):
    path = os.path.join(OUT_DIR, name)
    img.save(path, quality=98, optimize=False)
    print(f"  ✓ {name}")
    return path


# ══════════════════════════════════════════════════════════════════════════════
# POST 01 — HERO BRAND STATEMENT
# ══════════════════════════════════════════════════════════════════════════════
def post_01():
    img, draw = new_canvas()
    dot_grid(draw, 1080, 1080)

    # Strong orange bar at top
    orange_bar(draw, 0, 1080, 6)

    # Background panel for logo area
    draw.rectangle([0, 80, 1080, 480], fill=GUNMETAL)

    # Logo centred in panel
    draw_logo(img, (1080 - 240) // 2, 110, 240)

    # Divider line
    draw.rectangle([60, 490, 1020, 493], fill=PLATE)

    # Main headline
    f_hero = bebas(128)
    # "STOP RENTING YOUR AI." — two lines
    centre_text(draw, "STOP RENTING YOUR AI.", f_hero, 510, 1080, CHALK)
    centre_text(draw, "OWN THE ENGINE.", f_hero, 640, 1080, ORANGE)

    # Sub
    f_sub = dm(28)
    centre_text(draw, "Private AI for Construction & Logistics", f_sub, 785, 1080, FOG)

    # Tag
    f_tag = dm(22)
    centre_text(draw, "marapone.com  ·  @maraponehq", f_tag, 840, 1080, PLATE)

    # Corner accents & bottom bar
    corner_accent(draw, 1080, 1080)
    orange_bar(draw, 1074, 1080, 6)

    save(img, "01-hero-brand.png")


# ══════════════════════════════════════════════════════════════════════════════
# POST 02 — THE PROBLEM (Rented AI is a Liability)
# ══════════════════════════════════════════════════════════════════════════════
def post_02():
    img, draw = new_canvas()
    dot_grid(draw, 1080, 1080)
    orange_bar(draw, 0, 1080, 6)
    corner_accent(draw, 1080, 1080)

    # Top label
    f_label = dm_med(22)
    centre_text(draw, "// THE PROBLEM", f_label, 80, 1080, ORANGE)

    # Big headline
    f_h = bebas(110)
    centre_text(draw, "RENTED AI IS", f_h, 130, 1080, CHALK)
    centre_text(draw, "A LIABILITY.", f_h, 245, 1080, ORANGE)

    # Divider
    draw.rectangle([200, 375, 880, 378], fill=PLATE)

    # Three pain points as cards
    card_data = [
        ("$400–$2,000/mo", "Monthly fees that never stop — even when margins are tight."),
        ("YOUR DATA, THEIR SERVER", "Every document you upload lives on someone else's infrastructure."),
        ("VC MONEY DRIES UP", "SaaS tools shut down. Your workflows disappear with them."),
    ]
    f_card_h = bebas(36)
    f_card_b = dm(22)
    y = 400
    for title, body in card_data:
        draw.rectangle([60, y, 1020, y + 100], fill=STEEL, outline=PLATE, width=1)
        draw.rectangle([60, y, 64, y + 100], fill=ORANGE)  # left orange strip
        draw.text((85, y + 14), title, font=f_card_h, fill=CHALK)
        wrap_text(draw, body, f_card_b, 880, 85, y + 55, color=FOG)
        y += 116

    # Bottom tag
    f_tag = dm(22)
    centre_text(draw, "There's a better way.  marapone.com", f_tag, 775, 1080, FOG)

    orange_bar(draw, 1074, 1080, 6)
    save(img, "02-the-problem.png")


# ══════════════════════════════════════════════════════════════════════════════
# POST 03 — OWNERSHIP PROPOSITION
# ══════════════════════════════════════════════════════════════════════════════
def post_03():
    img, draw = new_canvas()
    dot_grid(draw, 1080, 1080)
    orange_bar(draw, 0, 1080, 6)
    corner_accent(draw, 1080, 1080)

    f_label = dm_med(22)
    centre_text(draw, "// THE DEAL", f_label, 80, 1080, ORANGE)

    f_h = bebas(120)
    centre_text(draw, "OWN IT.", f_h, 130, 1080, CHALK)
    centre_text(draw, "ALL OF IT.", f_h, 250, 1080, ORANGE)

    draw.rectangle([200, 382, 880, 385], fill=PLATE)

    # Five ownership pillars
    pillars = [
        "✓  One-time price — no subscriptions, ever.",
        "✓  Full source code handed to you.",
        "✓  Fine-tuned model weights — yours to keep.",
        "✓  Deployed on your own infrastructure.",
        "✓  Your data never leaves your network.",
    ]
    f_pill = dm_med(30)
    y = 410
    for p in pillars:
        draw.text((100, y), p, font=f_pill, fill=CHALK)
        y += 56

    draw.rectangle([100, y + 10, 980, y + 13], fill=PLATE)

    f_tag = dm(24)
    centre_text(draw, "marapone.com  ·  @maraponehq", f_tag, y + 28, 1080, FOG)

    orange_bar(draw, 1074, 1080, 6)
    save(img, "03-ownership.png")


# ══════════════════════════════════════════════════════════════════════════════
# POST 04 — CONSTRUCTION USE CASES
# ══════════════════════════════════════════════════════════════════════════════
def post_04():
    img, draw = new_canvas()
    dot_grid(draw, 1080, 1080)
    orange_bar(draw, 0, 1080, 6)
    corner_accent(draw, 1080, 1080)

    f_label = dm_med(22)
    centre_text(draw, "// BUILT FOR THE JOBSITE", f_label, 75, 1080, ORANGE)

    f_h = bebas(108)
    centre_text(draw, "CONSTRUCTION", f_h, 115, 1080, CHALK)
    centre_text(draw, "AI SYSTEMS", f_h, 225, 1080, ORANGE)

    draw.rectangle([200, 350, 880, 353], fill=PLATE)

    use_cases = [
        ("BLUEPRINT AUDIT",       "Review full PDFs in minutes — gaps, clashes, scope conflicts flagged."),
        ("RFI BACKLOG CLEARED",   "Read every RFI against the drawings. Bottlenecks surfaced instantly."),
        ("DAILY LOGS → REPORTS",  "Turn weeks of logs into a weekly executive summary."),
        ("CHANGE ORDER TRACKER",  "Every CO reviewed for cost exposure and missing documentation."),
    ]
    f_uc_h = bebas(34)
    f_uc_b = dm(21)
    y = 374
    for title, body in use_cases:
        draw.rectangle([60, y, 1020, y + 96], fill=STEEL, outline=PLATE, width=1)
        draw.rectangle([60, y, 64, y + 96], fill=ORANGE)
        draw.text((84, y + 10), title, font=f_uc_h, fill=CHALK)
        wrap_text(draw, body, f_uc_b, 880, 84, y + 50, color=FOG)
        y += 110

    f_tag = dm(22)
    centre_text(draw, "+4 more use cases  ·  marapone.com/services", f_tag, 828, 1080, FOG)

    orange_bar(draw, 1074, 1080, 6)
    save(img, "04-construction.png")


# ══════════════════════════════════════════════════════════════════════════════
# POST 05 — LOGISTICS USE CASES
# ══════════════════════════════════════════════════════════════════════════════
def post_05():
    img, draw = new_canvas()
    dot_grid(draw, 1080, 1080)
    orange_bar(draw, 0, 1080, 6)
    corner_accent(draw, 1080, 1080)

    f_label = dm_med(22)
    centre_text(draw, "// BUILT FOR THE TRADE LANE", f_label, 75, 1080, ORANGE)

    f_h = bebas(108)
    centre_text(draw, "LOGISTICS", f_h, 115, 1080, CHALK)
    centre_text(draw, "AI SYSTEMS", f_h, 225, 1080, ORANGE)

    draw.rectangle([200, 350, 880, 353], fill=PLATE)

    use_cases = [
        ("SHIPMENT DOC AUDIT",    "B/L, invoices, packing lists — discrepancies caught before they cost you."),
        ("FREIGHT INVOICE CHECK", "Compare carrier charges against your rate agreements automatically."),
        ("CUSTOMS ENTRY REVIEW",  "Flag classification issues and certificate gaps before filing."),
        ("SUPPLY CHAIN RISK",     "Weekly risk scoring across all active inbound shipments."),
    ]
    f_uc_h = bebas(34)
    f_uc_b = dm(21)
    y = 374
    for title, body in use_cases:
        draw.rectangle([60, y, 1020, y + 96], fill=STEEL, outline=PLATE, width=1)
        draw.rectangle([60, y, 64, y + 96], fill=ORANGE)
        draw.text((84, y + 10), title, font=f_uc_h, fill=CHALK)
        wrap_text(draw, body, f_uc_b, 880, 84, y + 50, color=FOG)
        y += 110

    f_tag = dm(22)
    centre_text(draw, "+3 more use cases  ·  marapone.com/services", f_tag, 828, 1080, FOG)

    orange_bar(draw, 1074, 1080, 6)
    save(img, "05-logistics.png")


# ══════════════════════════════════════════════════════════════════════════════
# POST 06 — THE GUARANTEE
# ══════════════════════════════════════════════════════════════════════════════
def post_06():
    img, draw = new_canvas()
    dot_grid(draw, 1080, 1080)
    orange_bar(draw, 0, 1080, 6)
    corner_accent(draw, 1080, 1080)

    f_label = dm_med(22)
    centre_text(draw, "// RISK-FREE GUARANTEE", f_label, 75, 1080, ORANGE)

    f_h = bebas(100)
    centre_text(draw, "10 HOURS SAVED", f_h, 120, 1080, CHALK)
    centre_text(draw, "IN 30 DAYS.", f_h, 225, 1080, ORANGE)

    f_h2 = bebas(80)
    centre_text(draw, "OR YOUR MONEY BACK.", f_h2, 336, 1080, CHALK)

    draw.rectangle([200, 436, 880, 439], fill=PLATE)

    # Big circle with "FULL REFUND"
    cx, cy, r = 540, 600, 130
    draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=STEEL, outline=ORANGE, width=4)
    f_circle = bebas(58)
    centre_text(draw, "FULL", f_circle, cy - 58, 1080, CHALK)
    centre_text(draw, "REFUND", f_circle, cy - 4, 1080, ORANGE)

    f_sub = dm(26)
    wrap_text(draw, "No questions asked. No fine print. No hoops to jump through.",
              f_sub, 860, 110, 760, line_spacing=10, color=FOG)

    f_tag = dm(22)
    centre_text(draw, "marapone.com  ·  @maraponehq", f_tag, 880, 1080, FOG)

    orange_bar(draw, 1074, 1080, 6)
    save(img, "06-guarantee.png")


# ══════════════════════════════════════════════════════════════════════════════
# POST 07 — HOW IT WORKS
# ══════════════════════════════════════════════════════════════════════════════
def post_07():
    img, draw = new_canvas()
    dot_grid(draw, 1080, 1080)
    orange_bar(draw, 0, 1080, 6)
    corner_accent(draw, 1080, 1080)

    f_label = dm_med(22)
    centre_text(draw, "// HOW IT WORKS", f_label, 75, 1080, ORANGE)

    f_h = bebas(108)
    centre_text(draw, "SIMPLE.", f_h, 115, 1080, CHALK)
    centre_text(draw, "PERMANENT.", f_h, 225, 1080, ORANGE)

    draw.rectangle([200, 350, 880, 353], fill=PLATE)

    steps = [
        ("01", "FREE ASSESSMENT",  "Send us your documents. We map your workflow and show you what's possible — no cost."),
        ("02", "WE BUILD",         "We fine-tune a private model on your data. You approve every step."),
        ("03", "YOU OWN IT",       "Full handover. Source code, model weights, install guide. Runs on your hardware."),
    ]
    f_num  = bebas(72)
    f_steph = bebas(36)
    f_stepb = dm(22)
    y = 380
    for num, title, body in steps:
        # Step box
        draw.rectangle([60, y, 1020, y + 130], fill=STEEL, outline=PLATE, width=1)
        # Orange number block
        draw.rectangle([60, y, 148, y + 130], fill=ORANGE)
        centre_text(draw, num, f_num, y + 28, 208, CHARCOAL)   # centred in 148-wide block
        # Title & body
        draw.text((165, y + 16), title, font=f_steph, fill=CHALK)
        wrap_text(draw, body, f_stepb, 820, 165, y + 66, color=FOG)
        y += 148

    f_tag = dm(22)
    centre_text(draw, "Book your free assessment  ·  marapone.com/contact", f_tag, 820, 1080, FOG)

    orange_bar(draw, 1074, 1080, 6)
    save(img, "07-how-it-works.png")


# ══════════════════════════════════════════════════════════════════════════════
# POST 08 — WHO IS MARAPONE (About)
# ══════════════════════════════════════════════════════════════════════════════
def post_08():
    img, draw = new_canvas()
    dot_grid(draw, 1080, 1080)
    orange_bar(draw, 0, 1080, 6)
    corner_accent(draw, 1080, 1080)

    f_label = dm_med(22)
    centre_text(draw, "// WHO IS MARAPONE", f_label, 75, 1080, ORANGE)

    f_h = bebas(108)
    centre_text(draw, "NO VC FUNDING.", f_h, 115, 1080, CHALK)
    centre_text(draw, "NO FAKE STATS.", f_h, 225, 1080, ORANGE)

    draw.rectangle([200, 352, 880, 355], fill=PLATE)

    f_body = dm(28)
    body = (
        "We are a boutique B2B AI company based in Canada and "
        "Italy. Not a construction company. Not a venture-backed "
        "startup burning investor cash on a SaaS dashboard. A focused, "
        "technical team — 10+ years hands-on in construction and "
        "logistics — that builds private AI systems and sells them "
        "directly to the businesses that need them."
    )
    wrap_text(draw, body, f_body, 900, 90, 380, line_spacing=14, color=FOG)

    # Principles row
    principles = ["RADICAL\nTRANSPARENCY", "FULL\nHANDOVER", "PRIVATE\nBY DEFAULT"]
    f_prin = bebas(34)
    x_positions = [130, 450, 760]
    for i, (text, px) in enumerate(zip(principles, x_positions)):
        draw.rectangle([px - 50, 730, px + 130, 840], fill=STEEL, outline=ORANGE, width=2)
        lines = text.split("\n")
        draw.text((px - 38, 742), lines[0], font=f_prin, fill=CHALK)
        draw.text((px - 38, 784), lines[1], font=f_prin, fill=ORANGE)

    draw_logo(img, (1080 - 100) // 2, 868, 100)

    orange_bar(draw, 1074, 1080, 6)
    save(img, "08-about.png")


# ══════════════════════════════════════════════════════════════════════════════
# POST 09 — PRICING
# ══════════════════════════════════════════════════════════════════════════════
def post_09():
    img, draw = new_canvas()
    dot_grid(draw, 1080, 1080)
    orange_bar(draw, 0, 1080, 6)
    corner_accent(draw, 1080, 1080)

    f_label = dm_med(22)
    centre_text(draw, "// ONE-TIME PRICING", f_label, 75, 1080, ORANGE)

    f_h = bebas(100)
    centre_text(draw, "PAY ONCE.", f_h, 115, 1080, CHALK)
    centre_text(draw, "OWN FOREVER.", f_h, 218, 1080, ORANGE)

    draw.rectangle([200, 338, 880, 341], fill=PLATE)

    tiers = [
        ("STARTER",   "$1,500 CAD",  "1 document review · written report · video walkthrough"),
        ("PILOT",     "$4,900 CAD",  "Custom fine-tune · blueprint + RFI analysis · full source code"),
        ("FULL BUILD","$9,500 CAD",  "Unlimited docs · full suite · delay & risk modules  ★ MOST POPULAR"),
        ("PLUS",      "$15,000 CAD", "Full Build + 90-day support · air-gap config · 4 training calls"),
    ]
    f_tier_h = bebas(34)
    f_tier_p = bebas(42)
    f_tier_b = dm(20)
    y = 362
    for tier, price, features in tiers:
        is_popular = "MOST POPULAR" in features
        bg = GUNMETAL if not is_popular else STEEL
        border = ORANGE if is_popular else PLATE
        draw.rectangle([60, y, 1020, y + 100], fill=bg, outline=border, width=2)
        draw.text((84, y + 10), tier, font=f_tier_h, fill=CHALK if not is_popular else ORANGE)
        price_bbox = draw.textbbox((0, 0), price, font=f_tier_p)
        price_w = price_bbox[2] - price_bbox[0]
        draw.text((1020 - price_w - 20, y + 8), price, font=f_tier_p, fill=ORANGE)
        clean_features = features.replace(" ★ MOST POPULAR", "")
        wrap_text(draw, clean_features, f_tier_b, 700, 84, y + 58, color=FOG)
        y += 114

    f_note = dm(21)
    centre_text(draw, "+ HST  ·  All tiers include full source code  ·  No subscriptions", f_note, 832, 1080, FOG)
    f_tag = dm(22)
    centre_text(draw, "marapone.com/pricing", f_tag, 870, 1080, PLATE)

    orange_bar(draw, 1074, 1080, 6)
    save(img, "09-pricing.png")


# ══════════════════════════════════════════════════════════════════════════════
# POST 10 — CALL TO ACTION
# ══════════════════════════════════════════════════════════════════════════════
def post_10():
    img, draw = new_canvas()
    dot_grid(draw, 1080, 1080)
    orange_bar(draw, 0, 1080, 6)

    # Full-bleed accent rectangle
    draw.rectangle([0, 0, 1080, 400], fill=GUNMETAL)

    # Logo in top panel
    draw_logo(img, (1080 - 200) // 2, 80, 200)

    # Orange divider
    orange_bar(draw, 400, 1080, 6)

    # Big CTA
    f_h = bebas(120)
    centre_text(draw, "GET YOUR", f_h, 425, 1080, CHALK)
    centre_text(draw, "FREE ASSESSMENT.", f_h, 547, 1080, ORANGE)

    # Sub copy
    f_sub = dm(28)
    centre_text(draw, "Tell us what you're working on.", f_sub, 688, 1080, CHALK)
    centre_text(draw, "We'll show you exactly what's possible —", f_sub, 728, 1080, FOG)
    centre_text(draw, "usually within 24 hours.", f_sub, 768, 1080, FOG)

    # CTA Box
    draw.rectangle([200, 820, 880, 896], fill=ORANGE)
    f_btn = bebas(52)
    centre_text(draw, "marapone.com/contact", f_btn, 832, 1080, CHARCOAL)

    f_tag = dm(22)
    centre_text(draw, "@maraponehq", f_tag, 920, 1080, PLATE)

    corner_accent(draw, 1080, 1080)
    orange_bar(draw, 1074, 1080, 6)
    save(img, "10-cta.png")


# ══════════════════════════════════════════════════════════════════════════════
# WALLPAPER — 4K Landscape (3840×2160) with centred logo
# ══════════════════════════════════════════════════════════════════════════════
def wallpaper_4k():
    W, H = 3840, 2160
    img = Image.new("RGB", (W, H), CHARCOAL)
    draw = ImageDraw.Draw(img)

    # Dense dot grid
    dot_grid(draw, W, H, spacing=48, alpha=25)

    # Subtle horizontal bands
    for i in range(0, W, 160):
        draw.line([(i, 0), (i, H)], fill=(32, 32, 32), width=1)
    for j in range(0, H, 160):
        draw.line([(0, j), (W, j)], fill=(32, 32, 32), width=1)

    # Large orange accent lines
    orange_bar(draw, 0, W, 8)
    orange_bar(draw, H - 8, W, 8)
    draw.rectangle([0, 0, 8, H], fill=ORANGE)
    draw.rectangle([W - 8, 0, W, H], fill=ORANGE)

    # Large corner marks
    corner_accent(draw, W, H, size=180)

    # Faint large circle behind logo
    cx, cy, r = W // 2, H // 2, 620
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(46, 46, 46), width=3)
    draw.ellipse([cx - r - 60, cy - r - 60, cx + r + 60, cy + r + 60], outline=(38, 38, 38), width=2)

    # Centred logo — large
    logo_size = 900
    draw_logo(img, (W - logo_size) // 2, (H - logo_size) // 2, logo_size)

    # Bottom tagline
    f_tag_big = bebas(90)
    centre_text(draw, "PRIVATE AI FOR CONSTRUCTION & LOGISTICS", f_tag_big, H - 220, W, FOG)

    f_url = dm(52)
    centre_text(draw, "marapone.com  ·  @maraponehq", f_url, H - 130, W, PLATE)

    # Small orange side-label
    f_side = bebas(36)
    draw.text((30, H // 2 - 10), "MARAPONE", font=f_side, fill=ORANGE)

    save(img, "wallpaper-4k.png")


# ══════════════════════════════════════════════════════════════════════════════
# RUN ALL
# ══════════════════════════════════════════════════════════════════════════════
if __name__ == "__main__":
    print("Generating Marapone Instagram Content...\n")
    post_01()
    post_02()
    post_03()
    post_04()
    post_05()
    post_06()
    post_07()
    post_08()
    post_09()
    post_10()
    wallpaper_4k()
    print("\nAll files saved to Insta-Content/")
