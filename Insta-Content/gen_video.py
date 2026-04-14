#!/usr/bin/env python3
"""
Blueprint Analysis Demo Video — v2
60-second realistic walkthrough: Canadian commercial warehouse blueprint upload → scan → audit.
UI palette matches the website. No software branding. No user info.
"""

import math, os
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from moviepy import VideoClip

# ── Config ────────────────────────────────────────────────────────────────────
W, H   = 1920, 1080
FPS    = 30
DUR    = 60
FRAMES = FPS * DUR
OUT    = os.path.join(os.path.dirname(__file__), "blueprint-analysis-demo.mp4")

# ── Fonts ─────────────────────────────────────────────────────────────────────
SF   = "/System/Library/Fonts/SFNS.ttf"
MONO = "/System/Library/Fonts/SFNSMono.ttf"

def f(sz, mono=False):
    try: return ImageFont.truetype(MONO if mono else SF, sz)
    except: return ImageFont.load_default()

# Proportional
F9=f(9); F10=f(10); F11=f(11); F12=f(12); F13=f(13); F14=f(14)
F16=f(16); F18=f(18); F20=f(20); F22=f(22); F24=f(24); F28=f(28)
F32=f(32); F36=f(36); F40=f(40); F48=f(48); F56=f(56)
# Monospace
M9=f(9,1); M10=f(10,1); M11=f(11,1); M12=f(12,1); M13=f(13,1)
M14=f(14,1); M16=f(16,1); M18=f(18,1); M22=f(22,1)

# ── Website palette ────────────────────────────────────────────────────────────
BG       = (10, 14, 26)          # #0a0e1a
BG2      = (5,  8,  16)          # #050810
PANEL    = (23, 27, 39)          # rgba(255,255,255,0.05) over BG
PANEL2   = (16, 20, 30)          # slightly darker panel
BORDER   = (36, 40, 52)          # rgba(255,255,255,0.1) over BG
BORDER2  = (26, 30, 44)          # rgba(255,255,255,0.06) — subtler
ACC      = (77, 166, 255)        # #4da6ff
ACC2     = (45, 122, 204)        # #2d7acc
ACC_GLOW = (77, 166, 255, 60)    # for glow overlays
TXT      = (255, 255, 255)
TXT2     = (224, 224, 224)       # #e0e0e0
TXT3     = (192, 192, 192)       # #c0c0c0
TXT4     = (120, 130, 150)       # muted
TXT5     = (70,  80, 100)        # very muted
GREEN    = (52, 211, 120)
YELLOW   = (251, 191, 36)
RED      = (239, 68,  68)
ORANGE   = (249, 115, 22)
WHITE    = (255, 255, 255)

# Blueprint colours (keep deep navy/blueprint look)
BP_BG    = (4,  10, 28)
BP_LINE  = (77, 166, 255)         # match accent
BP_THIN  = (55, 120, 210)
BP_DIM   = (160, 205, 255)
BP_HATCH = (30,  60, 120)
BP_GREY  = (100, 130, 180)
BP_TEXT  = (200, 225, 255)

# ── Layout ────────────────────────────────────────────────────────────────────
HDR_H    = 56
SB_W     = 260          # sidebar
RP_W     = 500          # results panel
ST_H     = 28           # status bar
TOOL_H   = 52           # toolbar inside main panel
# Main panel bounds
MP_X1 = SB_W
MP_X2 = W - RP_W
MP_Y1 = HDR_H
MP_Y2 = H - ST_H

# ── Helpers ───────────────────────────────────────────────────────────────────
def ease_io(t): t=max(0.,min(1.,t)); return t*t*(3-2*t)
def ease_o(t):  t=max(0.,min(1.,t)); return 1-(1-t)**3
def lerp(a,b,t): return a+(b-a)*t
def prog(fr,s,e): return ease_io(max(0.,min(1.,(fr-s)/max(1,e-s))))
def lin(fr,s,e):  return max(0.,min(1.,(fr-s)/max(1,e-s)))

def rr(draw, box, r, fill=None, outline=None, width=1):
    """Rounded rectangle."""
    x1,y1,x2,y2 = box
    # clamp radius so the box is always valid
    r = min(r, (x2-x1)//2, (y2-y1)//2)
    if r < 1: r = 1
    if x2-x1 < 2 or y2-y1 < 2: return
    if fill:
        draw.rectangle([x1+r,y1,x2-r,y2], fill=fill)
        draw.rectangle([x1,y1+r,x2,y2-r], fill=fill)
        for cx,cy in [(x1,y1),(x2-2*r,y1),(x1,y2-2*r),(x2-2*r,y2-2*r)]:
            draw.ellipse([cx,cy,cx+2*r,cy+2*r], fill=fill)
    if outline:
        draw.arc([x1,y1,x1+2*r,y1+2*r],180,270,fill=outline,width=width)
        draw.arc([x2-2*r,y1,x2,y1+2*r],270,360,fill=outline,width=width)
        draw.arc([x1,y2-2*r,x1+2*r,y2],90,180,fill=outline,width=width)
        draw.arc([x2-2*r,y2-2*r,x2,y2],0,90,fill=outline,width=width)
        draw.line([(x1+r,y1),(x2-r,y1)],fill=outline,width=width)
        draw.line([(x1+r,y2),(x2-r,y2)],fill=outline,width=width)
        draw.line([(x1,y1+r),(x1,y2-r)],fill=outline,width=width)
        draw.line([(x2,y1+r),(x2,y2-r)],fill=outline,width=width)

def tw(draw, text, font):
    b = draw.textbbox((0,0),text,font=font)
    return b[2]-b[0], b[3]-b[1]

def ctext(draw, cx, cy, text, fill, font):
    w2, h2 = tw(draw, text, font)
    draw.text((cx-w2//2, cy-h2//2), text, fill=fill, font=font)

# ── Cursor path ───────────────────────────────────────────────────────────────
CURSOR_PTS = [
    (0,    980,  460),   # start near upload button area
    (40,   980,  460),
    (90,   852,  438),   # hover Upload button
    (130,  852,  438),
    (158,  852,  438),   # click
    (210,  720,  510),   # after dialog opens
    (280,  688,  496),   # hover PDF file in dialog
    (350,  688,  496),
    (370,  688,  496),   # click file
    (430, 1000,  580),   # move back, blueprint loading
    (500, 1000,  580),
    (560,  870,  440),   # hover Analyze button
    (600,  870,  440),
    (620,  870,  440),   # click Analyze
    (680,  960,  600),   # move back to watch scan
    (920,  760,  700),   # watch scan progress
    (960, 1660,  290),   # move to results panel
    (1040,1660,  290),
    (1160,1660,  470),
    (1340,1660,  620),
    (1480,1660,  820),
    (1540,1660,  980),   # hover Export
    (1800,1660,  980),
]

def get_cursor(fr):
    for i in range(len(CURSOR_PTS)-1):
        f0,x0,y0=CURSOR_PTS[i]; f1,x1,y1=CURSOR_PTS[i+1]
        if f0<=fr<=f1:
            t=ease_io((fr-f0)/max(1,f1-f0))
            return int(lerp(x0,x1,t)), int(lerp(y0,y1,t))
    return CURSOR_PTS[-1][1], CURSOR_PTS[-1][2]

def clicking(fr):
    return any(s<=fr<=e for s,e in [(142,168),(355,382),(608,634),(1542,1568)])

# ── Warehouse Blueprint ───────────────────────────────────────────────────────
def render_blueprint(iw, ih):
    """
    Canadian industry-standard commercial warehouse floor plan.
    60 m × 36 m. Scale 1:200.
    """
    img = Image.new("RGB",(iw,ih),BP_BG)
    d   = ImageDraw.Draw(img)

    S    = 14          # px per metre (1:200 display scale)
    # Building box within the image, leave margin for dims/border
    MX, MY = 90, 100
    BW, BH = int(60*S), int(36*S)   # 840 × 504

    def bx(m): return int(MX + m*S)
    def by(m): return int(MY + m*S)

    # ── Hatch: office area (A-C, rows 1-2)  ──────────────────────────────────
    ox1,oy1 = bx(0), by(0)
    ox2,oy2 = bx(24), by(9)
    spacing = 8
    for x in range(ox1, ox2+1, spacing):
        d.line([(x,oy1),(max(ox1,x-BH),min(oy2,oy1+(x-ox1)))],fill=BP_HATCH,width=1)
    for y in range(oy1, oy2+1, spacing):
        d.line([(ox1,y),(min(ox2,ox1+(y-oy1)),oy1)],fill=BP_HATCH,width=1)

    # ── Grid reference lines (very faint) ─────────────────────────────────────
    gc = (14, 28, 62)
    cols_m = [0, 12, 24, 36, 48, 60]
    rows_m = [0,  9, 18, 27, 36]
    for cm in cols_m: d.line([(bx(cm),by(-2)),(bx(cm),by(38))],fill=gc,width=1)
    for rm in rows_m: d.line([(bx(-2),by(rm)),(bx(62),by(rm))],fill=gc,width=1)

    # ── Structural columns: HSS 254×254 → shown as solid 12×12 px squares ─────
    for cm in cols_m:
        for rm in rows_m:
            cx2,cy2 = bx(cm),by(rm)
            sz=6
            d.rectangle([cx2-sz,cy2-sz,cx2+sz,cy2+sz],fill=BP_LINE,outline=BP_DIM,width=1)

    # ── Exterior walls (tilt-up concrete 200 mm → 3 px) ──────────────────────
    EW=3
    def ext_wall(p1,p2): d.line([p1,p2],fill=BP_LINE,width=EW+2)
    def ext_wall2(p1,p2): d.line([p1,p2],fill=BP_LINE,width=EW)

    # South wall (front/row 1), with entry opening 3.6m wide centred on office
    entry_l = bx(10.2); entry_r = bx(13.8)
    ext_wall2((bx(0),by(0)),(entry_l,by(0)))
    ext_wall2((entry_r,by(0)),(bx(60),by(0)))

    # North wall (rear/row 5), with 4 dock openings (3.0m each) + 1 grade door (4.5m)
    dock_x  = [(bx(14.5),bx(17.5)),(bx(20),bx(23)),(bx(28),bx(31)),(bx(36.5),bx(39.5))]
    grade_x = (bx(5.5), bx(9.5))
    segs_n  = sorted([(bx(0),None),(bx(60),None)] +
                     [(l,r) for l,r in dock_x+[grade_x]], key=lambda x:x[0])
    # Draw north wall in segments (skip door gaps)
    nx_segs = []
    cur = bx(0)
    gaps = sorted(dock_x + [grade_x], key=lambda x: x[0])
    for (gl,gr) in gaps:
        if cur < gl: nx_segs.append((cur, gl))
        cur = gr
    nx_segs.append((cur, bx(60)))
    for (x1,x2) in nx_segs: ext_wall2((x1,by(36)),(x2,by(36)))

    # West wall
    ext_wall2((bx(0),by(0)),(bx(0),by(36)))
    # East wall
    ext_wall2((bx(60),by(0)),(bx(60),by(36)))

    # ── Interior partition: office / warehouse separation ─────────────────────
    IW=2
    d.line([(bx(0),by(9)),(bx(24),by(9))],fill=BP_LINE,width=IW+1)
    d.line([(bx(24),by(0)),(bx(24),by(9))],fill=BP_LINE,width=IW+1)

    # Office sub-partitions
    # Corridor line at y=4.5m (midway), from A to C
    d.line([(bx(0),by(4.5)),(bx(24),by(4.5))],fill=BP_THIN,width=IW)
    # Vertical partitions to create offices
    d.line([(bx(6),by(0)),(bx(6),by(9))],fill=BP_THIN,width=IW)
    d.line([(bx(12),by(0)),(bx(12),by(9))],fill=BP_THIN,width=IW)
    d.line([(bx(18),by(0)),(bx(18),by(9))],fill=BP_THIN,width=IW)
    # Washroom (corner, 3m×3m at B-C, row2 area)
    d.line([(bx(18),by(6)),(bx(24),by(6))],fill=BP_THIN,width=IW)

    # ── Sprinkler/mech room: rear west corner ─────────────────────────────────
    d.line([(bx(12),by(27)),(bx(12),by(36))],fill=BP_THIN,width=IW)
    d.line([(bx(0),by(27)),(bx(12),by(27))],fill=BP_THIN,width=IW)

    # ── Mezzanine outline (dashed) above office area ──────────────────────────
    mz_x1,mz_y1,mz_x2,mz_y2 = bx(0),by(0),bx(24),by(9)
    dash=8
    for x in range(mz_x1, mz_x2, 2*dash):
        d.line([(x,mz_y1-6),(min(x+dash,mz_x2),mz_y1-6)],fill=(100,160,255),width=1)
    for y in range(mz_y1-6, mz_y2-6, 2*dash):
        d.line([(mz_x1,y),(mz_x1,min(y+dash,mz_y2-6))],fill=(100,160,255),width=1)
        d.line([(mz_x2,y),(mz_x2,min(y+dash,mz_y2-6))],fill=(100,160,255),width=1)

    # ── Entry doors (glass double swing) ─────────────────────────────────────
    dr = int(1.8*S)  # door radius
    midx = (entry_l+entry_r)//2
    d.arc([midx-dr,by(0)-dr,midx,by(0)+dr],start=270,end=0,fill=BP_DIM,width=1)
    d.arc([midx,by(0)-dr,midx+dr,by(0)+dr],start=180,end=270,fill=BP_DIM,width=1)
    d.line([(midx-dr,by(0)),(midx-dr,by(0)-dr//2)],fill=BP_DIM,width=1)
    d.line([(midx+dr,by(0)),(midx+dr,by(0)-dr//2)],fill=BP_DIM,width=1)

    # Interior doors (small arcs)
    for dx,dy,ang in [
        (6,4.5,90),(12,4.5,90),(18,4.5,90),
        (18,8.0,0),(6,0.0,270),(12,0.0,270),
    ]:
        dr2=int(0.9*S)
        cx2,cy2=bx(dx),by(dy)
        d.arc([cx2-dr2,cy2-dr2,cx2+dr2,cy2+dr2],start=ang,end=ang+90,fill=BP_THIN,width=1)
        d.line([(cx2,cy2),(cx2,cy2-dr2)],fill=BP_THIN,width=1)

    # ── Dock pits (dashed rectangles inside north wall) ───────────────────────
    for l,r in dock_x:
        pit_depth = int(2.5*S)
        d.line([(l,by(36)-pit_depth),(r,by(36)-pit_depth)],fill=BP_GREY,width=1)
        d.line([(l,by(36)),(l,by(36)-pit_depth)],fill=BP_GREY,width=1)
        d.line([(r,by(36)),(r,by(36)-pit_depth)],fill=BP_GREY,width=1)
        # dock bumper marks
        d.ellipse([l+2,by(36)-4,l+6,by(36)],fill=BP_GREY)
        d.ellipse([r-6,by(36)-4,r-2,by(36)],fill=BP_GREY)

    # ── Grade-level door arrow ────────────────────────────────────────────────
    gl,gr=grade_x
    gcx=(gl+gr)//2
    d.polygon([(gcx,by(36)+6),(gcx-6,by(36)+14),(gcx+6,by(36)+14)],fill=BP_DIM)
    d.text((gcx-14,by(36)+16),"GRADE",fill=BP_GREY,font=M9)

    # ── Column guards in warehouse floor (small circles) ─────────────────────
    for cm in cols_m:
        for rm in rows_m[1:]:    # skip row 1 (office side)
            cx2,cy2=bx(cm),by(rm)
            d.ellipse([cx2-14,cy2-14,cx2+14,cy2+14],outline=(40,80,140),width=1)

    # ── Skylights in warehouse roof (shown as 3m×3m dashed squares) ──────────
    for sx,sy in [(30,13.5),(42,13.5),(30,22.5),(42,22.5),(54,13.5),(54,22.5)]:
        sl = int(1.5*S)
        px1,py1=bx(sx)-sl,by(sy)-sl
        px2,py2=bx(sx)+sl,by(sy)+sl
        for step in range(0,px2-px1,6):
            x=px1+step; d.line([(x,py1),(min(x+3,px2),py1)],fill=(50,90,160),width=1)
            d.line([(x,py2),(min(x+3,px2),py2)],fill=(50,90,160),width=1)
        for step in range(0,py2-py1,6):
            y=py1+step; d.line([(px1,y),(px1,min(y+3,py2))],fill=(50,90,160),width=1)
            d.line([(px2,y),(px2,min(y+3,py2))],fill=(50,90,160),width=1)
        d.line([(px1,py1),(px2,py2)],fill=(40,75,150),width=1)
        d.line([(px2,py1),(px1,py2)],fill=(40,75,150),width=1)
        d.text((bx(sx)-8,by(sy)-5),"SKY",fill=(50,100,180),font=M9)

    # ── Room labels ───────────────────────────────────────────────────────────
    labels = [
        (3,   2.0, "RECEPTION"),
        (9,   2.0, "OFFICE 1"),
        (15,  2.0, "OFFICE 2"),
        (21,  2.0, "OFFICE 3"),
        (3,   6.5, "MEETING"),
        (9,   6.5, "OFFICE 4"),
        (15,  6.5, "OFFICE 5"),
        (21,  7.5, "W.R."),
        (6,  30.0, "MECH / SPRNKLR"),
        (36, 18.0, "OPEN WAREHOUSE FLOOR"),
        (6,  22.0, "CLEAR HT.\n7.32m"),
    ]
    for lx,ly,lbl in labels:
        for i,line in enumerate(lbl.split("\n")):
            bbox=d.textbbox((0,0),line,font=M10)
            tw2=(bbox[2]-bbox[0])
            d.text((bx(lx)-tw2//2, by(ly)+i*13), line, fill=BP_TEXT, font=M10)

    # ── Exterior dimension strings ────────────────────────────────────────────
    def dim_h(xm1,xm2,offset_y,label,sub=None):
        x1,x2,y0 = bx(xm1),bx(xm2),by(0)-offset_y
        d.line([(x1,y0),(x2,y0)],fill=BP_DIM,width=1)
        d.line([(x1,by(0)-4),(x1,y0+2)],fill=BP_DIM,width=1)
        d.line([(x2,by(0)-4),(x2,y0+2)],fill=BP_DIM,width=1)
        d.polygon([(x1,y0),(x1+5,y0-3),(x1+5,y0+3)],fill=BP_DIM)
        d.polygon([(x2,y0),(x2-5,y0-3),(x2-5,y0+3)],fill=BP_DIM)
        bbox=d.textbbox((0,0),label,font=M10)
        mx2=(x1+x2)//2
        d.text((mx2-(bbox[2]-bbox[0])//2, y0-(bbox[3]-bbox[1])-2),label,fill=BP_DIM,font=M10)
        if sub:
            bbox2=d.textbbox((0,0),sub,font=M9)
            d.text((mx2-(bbox2[2]-bbox2[0])//2, y0+4),sub,fill=BP_GREY,font=M9)

    def dim_v(offset_x,ym1,ym2,label):
        x0=bx(60)+offset_x; y1,y2=by(ym1),by(ym2)
        d.line([(x0,y1),(x0,y2)],fill=BP_DIM,width=1)
        d.line([(bx(60)+4,y1),(x0-2,y1)],fill=BP_DIM,width=1)
        d.line([(bx(60)+4,y2),(x0-2,y2)],fill=BP_DIM,width=1)
        d.polygon([(x0,y1),(x0-3,y1+5),(x0+3,y1+5)],fill=BP_DIM)
        d.polygon([(x0,y2),(x0-3,y2-5),(x0+3,y2-5)],fill=BP_DIM)
        bbox=d.textbbox((0,0),label,font=M10)
        my2=(y1+y2)//2
        d.text((x0+4,my2-(bbox[3]-bbox[1])//2),label,fill=BP_DIM,font=M10)

    # Bay-by-bay dims (top)
    for i in range(5):
        dim_h(i*12,(i+1)*12,22,f"{12000}")
    # Overall dim (top)
    dim_h(0,60,40,"60 000","(60 m OVERALL)")
    # Bay dims (right side)
    for i in range(4):
        dim_v(18,i*9,(i+1)*9,f"{9000}")
    dim_v(34,0,36,"36 000")

    # ── Grid bubble labels ────────────────────────────────────────────────────
    for i,cm in enumerate(cols_m):
        lbl=chr(65+i)
        cx2,cy2=bx(cm),by(0)-52
        d.ellipse([cx2-11,cy2-11,cx2+11,cy2+11],outline=BP_DIM,width=1)
        ctext(d,cx2,cy2,lbl,BP_DIM,M12)
        cx2b,cy2b=bx(cm),by(36)+20
        d.ellipse([cx2b-11,cy2b-11,cx2b+11,cy2b+11],outline=BP_DIM,width=1)
        ctext(d,cx2b,cy2b,lbl,BP_DIM,M12)
    for i,rm in enumerate(rows_m):
        lbl=str(i+1)
        rx2,ry2=bx(0)-28,by(rm)
        d.ellipse([rx2-11,ry2-11,rx2+11,ry2+11],outline=BP_DIM,width=1)
        ctext(d,rx2,ry2,lbl,BP_DIM,M12)

    # ── Section marks ─────────────────────────────────────────────────────────
    for sx,sy in [(12,4.5),(36,18.0)]:
        cx2,cy2=bx(sx),by(sy)
        d.ellipse([cx2-9,cy2-9,cx2+9,cy2+9],outline=YELLOW,width=1)
        d.line([(cx2-9,cy2),(cx2-50,cy2)],fill=YELLOW,width=1)
        ctext(d,cx2,cy2,"A",YELLOW,M9)

    # ── North arrow ───────────────────────────────────────────────────────────
    NAX,NAY = bx(56), by(32.5)
    NAIL=22
    d.polygon([(NAX,NAY-NAIL),(NAX-7,NAY+7),(NAX,NAY+4),(NAX+7,NAY+7)],
              fill=BP_DIM, outline=BP_LINE)
    d.text((NAX-4,NAY+10),"N",fill=BP_DIM,font=M12)

    # ── Drawing notes (left side) ─────────────────────────────────────────────
    ny=by(0)
    nx0=12
    d.text((nx0,ny-12),"NOTES:",fill=BP_DIM,font=M10)
    notes=[
        "1. ALL DIMENSIONS IN mm UNLESS OTHERWISE NOTED.",
        "2. DO NOT SCALE DRAWINGS.",
        "3. REFER TO STRUCTURAL ENGINEER DRAWINGS FOR FOUNDATION DETAILS.",
        "4. ALL WORK SHALL COMPLY WITH NBC 2020 & OBC 2012.",
        "5. CONTRACTOR TO VERIFY ALL CONDITIONS IN FIELD.",
    ]
    for i,nt in enumerate(notes):
        d.text((nx0,ny+2+i*11),nt,fill=(100,130,180),font=M9)

    # ── Title block (bottom right) ────────────────────────────────────────────
    tbx1 = bx(36); tby1 = by(36)+36
    tbx2 = iw-14;  tby2 = tby1+80
    d.rectangle([tbx1,tby1,tbx2,tby2],outline=BP_DIM,width=1)
    mid = (tbx1+tbx2)//2
    row2_y = tby1+(tby2-tby1)//2
    d.line([(tbx1,row2_y),(tbx2,row2_y)],fill=BP_DIM,width=1)
    d.line([(mid,tby1),(mid,tby2)],fill=BP_DIM,width=1)
    third_y=tby1+(row2_y-tby1)*2//3

    d.text((tbx1+6,tby1+4),  "PROJECT",       fill=BP_GREY,font=M9)
    d.text((tbx1+6,tby1+15), "PROPOSED COMMERCIAL WAREHOUSE",fill=BP_TEXT,font=M11)
    d.text((tbx1+6,tby1+29), "2847 INDUSTRIAL PKWY — MISSISSAUGA ON",fill=BP_TEXT,font=M10)
    d.text((tbx1+6,tby1+42), "CLIENT: CONFIDENTIAL",fill=BP_GREY,font=M9)
    d.text((mid+6,  tby1+4),  "CONSULTANT",   fill=BP_GREY,font=M9)
    d.text((mid+6,  tby1+15), "MARAPONE CONTRACTING",fill=ACC,font=M11)
    d.text((mid+6,  tby1+29), "STRUCTURAL / CIVIL",fill=BP_TEXT,font=M10)
    d.text((tbx1+6, row2_y+4),"DRAWING TITLE",fill=BP_GREY,font=M9)
    d.text((tbx1+6, row2_y+15),"FLOOR PLAN — LEVEL 1",fill=BP_TEXT,font=M12)
    d.text((tbx1+6, row2_y+30),"SCALE 1:200  |  DWG NO. S-200",fill=BP_GREY,font=M9)
    d.text((mid+6,  row2_y+4), "REVISION",    fill=BP_GREY,font=M9)
    d.text((mid+6,  row2_y+14),"REV. 02",     fill=BP_TEXT,font=M12)
    d.text((mid+6,  row2_y+28),"DATE: 2025-03-15",fill=BP_GREY,font=M9)

    # Stamp circle (engineer seal)
    seal_cx,seal_cy = tbx1+42, tby1+56
    d.ellipse([seal_cx-26,seal_cy-26,seal_cx+26,seal_cy+26],outline=BP_DIM,width=1)
    d.ellipse([seal_cx-22,seal_cy-22,seal_cx+22,seal_cy+22],outline=BP_GREY,width=1)
    d.text((seal_cx-16,seal_cy-8),"P.ENG",fill=BP_DIM,font=M9)
    d.text((seal_cx-12,seal_cy+2),"SEAL",fill=BP_GREY,font=M8 if hasattr(f,"M8") else M9)

    # "NOT FOR CONSTRUCTION" stamp (diagonal across title block)
    d.text((tbx1+20,tby1+55),"NOT FOR CONSTRUCTION",fill=(120,50,50),font=M10)
    d.text((tbx1+20,tby1+68),"FOR REVIEW PURPOSES ONLY",fill=(100,40,40),font=M9)

    # ── Outer drawing border ──────────────────────────────────────────────────
    d.rectangle([8,8,iw-8,ih-8],outline=(25,50,100),width=2)
    d.rectangle([14,14,iw-14,ih-14],outline=(18,36,80),width=1)

    return img

# Pre-render
print("Pre-rendering warehouse blueprint…")
_bp_w = MP_X2 - MP_X1 - 10
_bp_y0_approx = MP_Y1 + TOOL_H + 60  # approx start y for blueprint area
_bp_h = MP_Y2 - _bp_y0_approx - 4
BP_IMG = render_blueprint(_bp_w, _bp_h)
print(f"Blueprint rendered: {_bp_w}×{_bp_h} px")

# ── Analysis result sections ──────────────────────────────────────────────────
SECTIONS = [
    {
        "title":"STRUCTURAL ANALYSIS",
        "col":ACC, "start":770,
        "items":[
            ("Steel frame — moment connections",     "PASS",    GREEN),
            ("Column base plate design",             "PASS",    GREEN),
            ("Roof truss span (12 m bays)",          "PASS",    GREEN),
            ("Wind uplift resistance",               "PASS",    GREEN),
            ("Seismic zone compliance (Zone 2)",     "PASS",    GREEN),
        ]
    },
    {
        "title":"CODE COMPLIANCE — NBC 2020 / OBC 2012",
        "col":(120,160,255), "start":960,
        "items":[
            ("Industrial occupancy classification",  "COMPLIANT",  GREEN),
            ("Fire separation — office / warehouse", "COMPLIANT",  GREEN),
            ("Egress — 4 exit doors confirmed",      "COMPLIANT",  GREEN),
            ("Loading dock safety & fall protection","COMPLIANT",  GREEN),
            ("Sprinkler system — NFPA 13 coverage",  "REVIEW",    YELLOW),
        ]
    },
    {
        "title":"MEASUREMENTS & QUANTITIES",
        "col":(45,212,191), "start":1150,
        "items":[
            ("Gross floor area",                     "2,160 m²",   TXT2),
            ("Clear height — warehouse",             "7.32 m",     TXT2),
            ("Dock doors  (4 × 3 m w)",              "12.0 lin.m", TXT2),
            ("Grade-level door  (1 × 4.5 m)",        "4.5 m",      TXT2),
            ("Office / mezzanine area",              "432 m²",     TXT2),
        ]
    },
    {
        "title":"MATERIAL TAKEOFF",
        "col":ORANGE, "start":1310,
        "items":[
            ("Structural steel (W-shapes)",          "46.8 t",      TXT2),
            ("HSS columns (254×254×13)",             "8.4 t",       TXT2),
            ("Concrete slab  200 mm",                "432 m³",      TXT2),
            ("Tilt-up panels  (ext. walls)",         "864 m²",      TXT2),
            ("Metal roof deck + insulation",         "2,160 m²",    TXT2),
        ]
    },
    {
        "title":"ESTIMATED COST RANGE (CAD)",
        "col":GREEN, "start":1445,
        "items":[
            ("Structural steel & erection",          "$780,000",   TXT2),
            ("Civil / site works",                   "$245,000",   TXT2),
            ("Enclosure & roofing",                  "$560,000",   TXT2),
            ("Mechanical / electrical",              "$390,000",   TXT2),
            ("ESTIMATED TOTAL",                      "$1.97 M – $2.15 M", ACC),
        ]
    },
]

# ── UI drawing functions ──────────────────────────────────────────────────────

def draw_header(d):
    """Clean header — no branding, no user info. Just nav tabs."""
    d.rectangle([0,0,W,HDR_H],fill=BG2)
    d.line([(0,HDR_H-1),(W,HDR_H-1)],fill=BORDER,width=1)

    tabs = ["Dashboard","Projects","Blueprints","Analysis","Reports"]
    tx = 28
    for i,tab in enumerate(tabs):
        active = (i==2)
        tW,tH = tw(d,tab,F14)
        if active:
            rr(d,[tx-10,8,tx+tW+10,HDR_H-8],5,fill=PANEL)
            d.text((tx, (HDR_H-tH)//2), tab, fill=ACC, font=F14)
            d.line([(tx-10,HDR_H-1),(tx+tW+10,HDR_H-1)],fill=ACC,width=2)
        else:
            d.text((tx,(HDR_H-tH)//2), tab, fill=TXT4, font=F14)
        tx += tW+38

    # Status indicator (no user name/avatar)
    d.ellipse([W-130,22,W-118,34],fill=GREEN)
    d.text((W-110,18),"System Active",fill=TXT4,font=F13)

def draw_sidebar(d, frame):
    d.rectangle([0,HDR_H,SB_W,H-ST_H],fill=BG2)
    d.line([(SB_W-1,HDR_H),(SB_W-1,H-ST_H)],fill=BORDER,width=1)

    y=HDR_H+20
    d.text((14,y),"ACTIVE PROJECT",fill=TXT5,font=M10)
    y+=20
    d.text((14,y),"2847 Industrial Pkwy",fill=TXT2,font=F14)
    d.text((14,y+18),"Mississauga, ON",fill=TXT4,font=F12)
    y+=46
    d.line([(14,y),(SB_W-14,y)],fill=BORDER2,width=1)
    y+=14

    d.text((14,y),"DRAWING PACKAGE",fill=TXT5,font=M10)
    y+=20

    files=[
        ("S-100","Site Plan",     True),
        ("S-200","Floor Plan L1", True),
        ("S-201","Floor Plan L2", True),
        ("S-300","Foundation",    True),
        ("S-400","Roof Framing",  False),
        ("A-100","Arch. Plans",   False),
    ]
    for code,name,ready in files:
        active=(code=="S-200")
        if active:
            d.rectangle([6,y-3,SB_W-6,y+22],fill=PANEL)
        dot_col=GREEN if ready else TXT5
        d.ellipse([14,y+4,22,y+12],fill=dot_col)
        d.text((28,y),code,fill=ACC if active else TXT4,font=M11)
        d.text((74,y),name,fill=TXT2 if active else TXT4,font=F12)
        y+=30

    y+=10
    d.line([(14,y),(SB_W-14,y)],fill=BORDER2,width=1)
    y+=14
    d.text((14,y),"ANALYSIS RUNS",fill=TXT5,font=M10)
    y+=20

    runs=[
        ("Structural",  frame>=800),
        ("Code Review", frame>=980),
        ("Quantities",  frame>=1160),
        ("Cost Est.",   frame>=1450),
    ]
    for rname,done in runs:
        col=GREEN if done else TXT5
        d.ellipse([14,y+4,22,y+12],fill=col)
        d.text((28,y),rname,fill=TXT2 if done else TXT5,font=F12)
        status="Done" if done else ("Running…" if frame>=760 else "–")
        s_col=GREEN if done else (ACC if frame>=760 else TXT5)
        rW,_=tw(d,status,M10)
        d.text((SB_W-14-rW,y+1),status,fill=s_col,font=M10)
        y+=28

def draw_statusbar(d, frame):
    d.rectangle([0,H-ST_H,W,H],fill=BG2)
    d.line([(0,H-ST_H),(W,H-ST_H)],fill=BORDER,width=1)
    if   frame<390:  msg="  Ready  ·  Import a blueprint to begin"; col=TXT4
    elif frame<510:  msg="  Blueprint S-200 loaded  ·  Click Analyze to proceed"; col=ACC
    elif frame<750:
        pct=int(lin(frame,510,750)*100)
        msg=f"  Scanning blueprint…  {pct}%"; col=ACC
    elif frame<1500: msg="  Analyzing: structural, code compliance, quantities, cost…"; col=(45,212,191)
    else:            msg="  Analysis complete  ·  Audit Score: 96/100  ·  Status: APPROVED WITH MINOR NOTES"; col=GREEN
    d.text((16,H-ST_H+7),msg,fill=col,font=M12)
    d.text((W-200,H-ST_H+7),"2025-03-15  14:22:07",fill=TXT5,font=M11)

def draw_main(img, d, frame):
    """Main blueprint panel + toolbar."""
    d.rectangle([MP_X1,MP_Y1,MP_X2,MP_Y2],fill=BG)

    # ── Toolbar ───────────────────────────────────────────────────────────────
    tb_y1=MP_Y1; tb_y2=MP_Y1+TOOL_H
    d.rectangle([MP_X1,tb_y1,MP_X2,tb_y2],fill=PANEL2)
    d.line([(MP_X1,tb_y2),(MP_X2,tb_y2)],fill=BORDER,width=1)

    # Breadcrumb
    bc="Projects  /  2847 Industrial Pkwy  /  S-200  —  Floor Plan L1"
    d.text((MP_X1+16, tb_y1+(TOOL_H-12)//2),bc,fill=TXT4,font=F12)

    # Upload button (highlighted before blueprint loads)
    upload_active = frame<160
    ub_col=PANEL if not upload_active else (20,60,110)
    ub_border=BORDER if not upload_active else ACC
    rr(d,[MP_X1+16,tb_y2+10,MP_X1+162,tb_y2+36],6,fill=ub_col,outline=ub_border)
    d.text((MP_X1+32,tb_y2+17),"+ Upload Drawing",fill=ACC,font=F13)

    # Zoom
    for i,(lbl) in enumerate(["100%","–","+"]):
        bx2=MP_X2-144+i*46
        rr(d,[bx2,tb_y2+10,bx2+40,tb_y2+36],4,fill=PANEL,outline=BORDER)
        cW,cH=tw(d,lbl,F14)
        d.text((bx2+(40-cW)//2,tb_y2+(36-(cH+10))//2+10),lbl,fill=TXT4,font=F14)

    # Analyze button
    analyze_active = 390<=frame<=640
    if analyze_active:
        # gradient effect: draw two overlapping rectangles
        rr(d,[MP_X2-310,tb_y2+8,MP_X2-164,tb_y2+38],7,fill=ACC2)
        rr(d,[MP_X2-310,tb_y2+8,MP_X2-230,tb_y2+38],7,fill=ACC)
    else:
        rr(d,[MP_X2-310,tb_y2+8,MP_X2-164,tb_y2+38],7,fill=(18,45,80))
    btext="▶  Analyze Blueprint"
    bW,bH=tw(d,btext,F14)
    d.text((MP_X2-237-bW//2, tb_y2+20),btext,fill=WHITE,font=F14)

    content_y = tb_y2+TOOL_H    # where blueprint starts vertically

    # ── Drop zone phase ───────────────────────────────────────────────────────
    if frame<300:
        dz=(MP_X1+80, content_y+60, MP_X2-80, MP_Y2-60)
        # Very subtle dashed border
        dstep=16
        for x in range(dz[0],dz[2],dstep*2):
            d.line([(x,dz[1]),(min(x+dstep,dz[2]),dz[1])],fill=BORDER,width=1)
            d.line([(x,dz[3]),(min(x+dstep,dz[2]),dz[3])],fill=BORDER,width=1)
        for y in range(dz[1],dz[3],dstep*2):
            d.line([(dz[0],y),(dz[0],min(y+dstep,dz[3]))],fill=BORDER,width=1)
            d.line([(dz[2],y),(dz[2],min(y+dstep,dz[3]))],fill=BORDER,width=1)
        cx2=(dz[0]+dz[2])//2; cy2=(dz[1]+dz[3])//2
        # Upload icon (arrow in circle)
        r_ico=40
        d.ellipse([cx2-r_ico,cy2-r_ico-30,cx2+r_ico,cy2+r_ico-30],outline=BORDER,width=2)
        d.polygon([(cx2,cy2-60),(cx2-14,cy2-38),(cx2-6,cy2-38),
                   (cx2-6,cy2-22),(cx2+6,cy2-22),(cx2+6,cy2-38),(cx2+14,cy2-38)],
                  fill=BORDER)
        txt1="Drag & drop blueprint PDF here"
        t1W,_=tw(d,txt1,F18)
        d.text((cx2-t1W//2,cy2+20),txt1,fill=TXT4,font=F18)
        txt2="or use Upload Drawing above"
        t2W,_=tw(d,txt2,F13)
        d.text((cx2-t2W//2,cy2+52),txt2,fill=TXT5,font=F13)

        # File picker dialog after click
        if frame>=152:
            dt=prog(frame,152,215)
            dlg_h=int(268*dt)
            DLG=(520,MP_Y1+70,930,MP_Y1+70+max(4,dlg_h))
            rr(d,DLG,10,fill=(14,18,30),outline=BORDER)
            if dlg_h>30:
                d.text((DLG[0]+18,DLG[1]+16),"Select Drawing File",fill=TXT2,font=F16)
                d.line([(DLG[0]+14,DLG[1]+42),(DLG[2]-14,DLG[1]+42)],fill=BORDER,width=1)
            if dlg_h>110:
                dlg_files=[
                    ("S-200_FloorPlan_L1_Rev02.pdf","2.8 MB"),
                    ("S-100_SitePlan_Rev01.pdf",    "1.4 MB"),
                    ("S-300_Foundation_Rev01.pdf",  "3.1 MB"),
                ]
                fy=DLG[1]+52
                for i,(fn,sz) in enumerate(dlg_files):
                    sel=(i==0 and frame>=280 and frame<400)
                    if sel: d.rectangle([DLG[0]+8,fy-3,DLG[2]-8,fy+24],fill=PANEL)
                    # PDF icon
                    rr(d,[DLG[0]+16,fy,DLG[0]+38,fy+20],3,fill=(50,20,20))
                    d.text((DLG[0]+20,fy+4),"PDF",fill=RED,font=M9)
                    d.text((DLG[0]+46,fy+2),fn,fill=ACC if sel else TXT2,font=F12)
                    d.text((DLG[2]-50,fy+2),sz,fill=TXT5,font=M10)
                    fy+=36
            if dlg_h>220:
                rr(d,[DLG[0]+14,DLG[3]-38,DLG[0]+120,DLG[3]-14],6,fill=ACC2)
                d.text((DLG[0]+28,DLG[3]-30),"Open",fill=WHITE,font=F14)
                rr(d,[DLG[0]+128,DLG[3]-38,DLG[0]+218,DLG[3]-14],6,outline=BORDER)
                d.text((DLG[0]+150,DLG[3]-30),"Cancel",fill=TXT4,font=F14)
        return

    # ── Blueprint loading phase ───────────────────────────────────────────────
    bp_t=prog(frame,300,430)
    if bp_t<1.0:
        load_h=int((_bp_h)*bp_t)
        if load_h>0:
            partial=BP_IMG.crop((0,0,_bp_w,min(load_h,_bp_h)))
            img.paste(partial,(MP_X1+5,content_y))
        # Shimmer line at load front
        sy=content_y+load_h
        for dy,al in [(-8,20),(-4,50),(0,140),(4,50),(8,20)]:
            yy=sy+dy
            if MP_Y1<yy<MP_Y2:
                ov=Image.new("RGBA",(MP_X2-MP_X1,1),(*ACC,al))
                img.paste(ov,(MP_X1,yy),ov)
        # Progress bar
        bw=MP_X2-MP_X1-80
        px1=MP_X1+40; py=MP_Y2-50
        d.rectangle([px1,py,px1+bw,py+6],fill=BORDER)
        d.rectangle([px1,py,px1+int(bw*bp_t),py+6],fill=ACC)
        pct_txt=f"Loading S-200…  {int(bp_t*100)}%"
        d.text((px1,py-18),pct_txt,fill=TXT4,font=M12)
        return

    # ── Full blueprint displayed ──────────────────────────────────────────────
    img.paste(BP_IMG,(MP_X1+5,content_y))

    # ── Scan line ─────────────────────────────────────────────────────────────
    if 510<=frame<750:
        sp=lin(frame,510,750)
        sy=content_y+int(_bp_h*sp)
        # Glow
        for dy,al in [(-20,8),(-12,20),(-6,55),(0,160),(6,55),(12,20),(20,8)]:
            yy=sy+dy
            if content_y<=yy<MP_Y2:
                ov=Image.new("RGBA",(MP_X2-MP_X1,1),(*ACC,al))
                img.paste(ov,(MP_X1,yy),ov)
        # Bright line
        d.line([(MP_X1,sy),(MP_X2,sy)],fill=ACC,width=2)
        # Measurement ticks
        for mx2 in range(MP_X1,MP_X2,48):
            tl=10 if (mx2-MP_X1)%192==0 else 5
            d.line([(mx2,sy-tl),(mx2,sy+tl)],fill=ACC,width=1)
            if (mx2-MP_X1)%192==0 and mx2+32<MP_X2:
                mm=int((mx2-MP_X1)*200/(_bp_w*14)*1000)
                d.text((mx2+2,sy-18),f"{mm}",fill=TXT4,font=M9)
        # Badge
        pct_n=int(sp*100)
        bd=(MP_X1+14,sy-28,MP_X1+192,sy-7)
        rr(d,bd,4,fill=(8,16,34),outline=BORDER)
        d.text((MP_X1+22,sy-22),f"Scanning…  {pct_n}%",fill=ACC,font=M12)

    # ── Post-scan measurement overlays ───────────────────────────────────────
    if frame>=750:
        hl_ov=Image.new("RGBA",(W,H),(0,0,0,0))
        hl_d=ImageDraw.Draw(hl_ov)
        zones=[
            (MP_X1+5, content_y,          MP_X1+5+int(24*14), content_y+int(9*14)),
            (MP_X1+5+int(24*14), content_y+int(9*14), MP_X2-5, MP_Y2-4),
            (MP_X1+5, content_y+int(27*14), MP_X1+5+int(12*14), MP_Y2-4),
        ]
        cols=[(*ACC,22),(*GREEN,16),(*ORANGE,18)]
        for (rx1,ry1,rx2,ry2),c in zip(zones,cols):
            hl_d.rectangle([rx1,ry1,rx2,ry2],fill=c,outline=(c[0],c[1],c[2],80),width=1)
        img.paste(Image.alpha_composite(img.convert("RGBA"),hl_ov).convert("RGB"),(0,0))

def draw_results(d, frame):
    """Right panel — analysis results."""
    rx=W-RP_W
    d.rectangle([rx,HDR_H,W,H-ST_H],fill=PANEL2)
    d.line([(rx,HDR_H),(rx,H-ST_H)],fill=BORDER,width=1)

    if frame<750:
        d.text((rx+18,HDR_H+22),"ANALYSIS RESULTS",fill=TXT5,font=M12)
        d.text((rx+18,HDR_H+50),"Run analysis to populate results.",fill=TXT5,font=F13)
        return

    # Header
    d.text((rx+18,HDR_H+16),"ANALYSIS RESULTS",fill=TXT3,font=M12)
    d.line([(rx+14,HDR_H+42),(W-14,HDR_H+42)],fill=BORDER,width=1)

    # Overall bar
    overall_t=prog(frame,750,920)
    bar_y=HDR_H+52
    d.text((rx+18,bar_y),"Overall  completion",fill=TXT5,font=M10)
    bar_y+=15
    bw=RP_W-36
    d.rectangle([rx+18,bar_y,rx+18+bw,bar_y+6],fill=BORDER)
    if overall_t>0:
        rr(d,[rx+18,bar_y,rx+18+int(bw*overall_t),bar_y+6],3,fill=ACC)
    bar_y+=18

    SPEED=2.8  # items/sec
    cy=bar_y+6

    for sec in SECTIONS:
        sf=sec["start"]
        if frame<sf: break
        # Section title
        sc=sec["col"]
        d.text((rx+18,cy),sec["title"],fill=sc,font=M12)
        cy+=22
        d.line([(rx+18,cy-4),(W-18,cy-4)],fill=tuple(max(0,c//4) for c in sc),width=1)

        n_vis=min(len(sec["items"]),int((frame-sf)/(FPS/SPEED)))
        for i,(lbl,val,vc) in enumerate(sec["items"]):
            if i>=n_vis:
                cy+=20; continue
            fade=min(1.,(frame-sf-i*(FPS/SPEED))/6)
            fa=tuple(int(c*fade) for c in TXT3)
            fv=tuple(int(c*fade) for c in vc)
            d.text((rx+22,cy),f"  {lbl}",fill=fa,font=F12)
            vW,_=tw(d,val,M10)
            d.text((W-18-vW,cy+1),val,fill=fv,font=M10)
            cy+=20
        cy+=10

    # ── Audit score badge ─────────────────────────────────────────────────────
    if frame>=1500:
        bt=prog(frame,1500,1640)
        badge_y=H-ST_H-172
        rr(d,[rx+14,badge_y,W-14,badge_y+148],10,fill=(8,16,32),outline=BORDER)

        # Arc ring
        ring_x=rx+78; ring_y=badge_y+74; ring_r=50
        d.arc([ring_x-ring_r,ring_y-ring_r,ring_x+ring_r,ring_y+ring_r],
              -90,270,fill=BORDER,width=8)
        ang=int(360*0.96*bt)
        if ang>0:
            d.arc([ring_x-ring_r,ring_y-ring_r,ring_x+ring_r,ring_y+ring_r],
                  -90,-90+ang,fill=GREEN,width=8)
        score_n=int(96*bt)
        sW,sH=tw(d,str(score_n),F32)
        d.text((ring_x-sW//2,ring_y-sH//2),str(score_n),fill=WHITE,font=F32)
        lW,lH=tw(d,"/100",F13)
        d.text((ring_x-lW//2,ring_y+sH//2+2),"/100",fill=TXT4,font=F13)

        # Right text
        tx2=ring_x+ring_r+18
        d.text((tx2,badge_y+18),"AUDIT SCORE",fill=TXT4,font=M11)
        d.text((tx2,badge_y+38),"96 / 100",fill=GREEN,font=F22)
        sc=GREEN if bt>0.7 else YELLOW
        rr(d,[tx2,badge_y+70,tx2+168,badge_y+96],5,fill=(8,28,18))
        d.text((tx2+10,badge_y+76),"✓  APPROVED",fill=sc,font=M13)
        d.text((tx2,badge_y+106),"Minor items for follow-up",fill=TXT4,font=F11)

        # Export button — pulsing glow
        if bt>0.82:
            pulse=0.5+0.5*math.sin(frame*0.16)
            ec=(int(lerp(ACC2[0],ACC[0],pulse)),
                int(lerp(ACC2[1],ACC[1],pulse)),
                int(lerp(ACC2[2],ACC[2],pulse)))
            rr(d,[rx+14,badge_y+152,W-14,badge_y+178],7,fill=ec)
            etxt="⬇  Export Full PDF Report"
            eW,_=tw(d,etxt,F14)
            d.text(((rx+14+W-14)//2-eW//2, badge_y+158),etxt,fill=WHITE,font=F14)

def draw_cursor(d, x, y, click=False):
    S=0.9
    pts=[(0,0),(0,26),(6,20),(12,32),(16,30),(10,18),(19,18)]
    pts=[(int(px*S+x),int(py*S+y)) for px,py in pts]
    shad=[(px+2,py+2) for px,py in pts]
    d.polygon(shad,fill=(0,0,0))
    col=(210,230,255) if click else WHITE
    d.polygon(pts,fill=col,outline=(20,30,50))

def draw_ripple(d, x, y, frame):
    for start,dur in [(156,28),(364,28),(616,28),(1550,28)]:
        if start<=frame<=start+dur:
            t=(frame-start)/dur
            r=int(t*38)
            al=int(180*(1-t))
            d.ellipse([x-r,y-r,x+r,y+r],outline=(*ACC,al),width=max(1,int(3*(1-t))))

# ── Main frame function ───────────────────────────────────────────────────────
def make_frame(t):
    frame=int(t*FPS)
    img=Image.new("RGB",(W,H),BG)
    d=ImageDraw.Draw(img)

    draw_main(img,d,frame)
    draw_results(d,frame)
    draw_sidebar(d,frame)
    draw_header(d)
    draw_statusbar(d,frame)

    cx,cy=get_cursor(frame)
    cl=clicking(frame)
    draw_ripple(d,cx,cy,frame)
    draw_cursor(d,cx,cy,cl)

    return np.array(img)

# ── Compile ───────────────────────────────────────────────────────────────────
if __name__=="__main__":
    print(f"Generating {FRAMES} frames at {W}×{H} @ {FPS}fps…")
    clip=VideoClip(make_frame,duration=DUR)
    clip.write_videofile(
        OUT, fps=FPS, codec="libx264", audio=False,
        preset="fast",
        ffmpeg_params=["-crf","17","-pix_fmt","yuv420p"],
        logger="bar",
    )
    print(f"\nSaved → {OUT}")
