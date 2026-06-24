#!/usr/bin/env python3
"""Regenerate the construction demo's sample plan set.

Produces a small (~4 KB) text-layer PDF at
  public/samples/sample-residential-plan-set.pdf
containing realistic drawing schedules (room finish, door, window, plumbing
fixture) so the live Blueprint Auditor demo can extract a *real* quantity
takeoff from it. Dependency-free PDF writer; pypdf is used only to normalise
the final xref. Run from the repo root:  python3 tools/make-sample-plan-set.py
"""
import io


def _esc(s):
    return s.replace('\\', r'\\').replace('(', r'\(').replace(')', r'\)')


def _content(lines, x=54, y0=760, size=9, lead=13):
    body = ['BT', f'/F1 {size} Tf', f'{lead} TL', f'1 0 0 1 {x} {y0} Tm']
    for ln in lines:
        body += [f'({_esc(ln)}) Tj', 'T*']
    body.append('ET')
    return '\n'.join(body).encode('latin-1')


def build_pdf(pages):
    objs = {1: b'<< /Type /Catalog /Pages 2 0 R >>',
            3: b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'}
    kids, nxt = [], 4
    for lines in pages:
        page_id, content_id = nxt, nxt + 1
        nxt += 2
        stream = _content(lines)
        objs[content_id] = b'<< /Length %d >>\nstream\n' % len(stream) + stream + b'\nendstream'
        objs[page_id] = (b'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] '
                         b'/Resources << /Font << /F1 3 0 R >> >> /Contents %d 0 R >>' % content_id)
        kids.append(page_id)
    objs[2] = (b'<< /Type /Pages /Kids [' + b' '.join(b'%d 0 R' % k for k in kids) +
               b'] /Count %d >>' % len(kids))

    out = bytearray(b'%PDF-1.4\n%\xe2\xe3\xcf\xd3\n')
    offsets = {}
    for n in sorted(objs):
        offsets[n] = len(out)
        out += b'%d 0 obj\n' % n + objs[n] + b'\nendobj\n'
    xref_pos, maxn = len(out), max(objs)
    out += b'xref\n0 %d\n0000000000 65535 f \n' % (maxn + 1)
    for n in range(1, maxn + 1):
        out += b'%010d 00000 n \n' % offsets.get(n, 0)
    out += b'trailer\n<< /Size %d /Root 1 0 R >>\nstartxref\n%d\n%%%%EOF\n' % (maxn + 1, xref_pos)
    return bytes(out)


PAGES = [
  ["MARAPONE SAMPLE RESIDENCE  -  CONSTRUCTION DOCUMENTS",
   "ISSUED FOR CONSTRUCTION    REVISION 2    DATE 2026-05-01",
   "PROJECT NO: MARA-2026-014   DRAWN BY: JL   CHECKED BY: AM",
   "SCALE: 1/4\" = 1'-0\"      TRUE NORTH ARROW SHOWN",
   "", "SHEET INDEX",
   "A-101  FIRST FLOOR PLAN", "A-102  SECOND FLOOR PLAN",
   "A-201  EXTERIOR ELEVATIONS", "A-301  BUILDING SECTIONS",
   "A-501  DOOR AND WINDOW SCHEDULES", "A-601  ROOM FINISH SCHEDULE",
   "S-101  FOUNDATION PLAN", "S-201  FLOOR FRAMING PLAN",
   "M-101  HVAC PLAN", "E-101  ELECTRICAL POWER PLAN",
   "E-102  LIGHTING PLAN AND PANEL SCHEDULE", "P-101  PLUMBING PLAN"],
  ["ROOM FINISH SCHEDULE", "ROOM NAME                AREA",
   "LIVING ROOM              324 SF", "KITCHEN                  201 SF",
   "DINING ROOM              168 SF", "FOYER                    72 SF",
   "MASTER BEDROOM           286 SF", "BEDROOM 2                164 SF",
   "BEDROOM 3                152 SF", "MASTER BATH              96 SF",
   "BATHROOM 2               54 SF", "POWDER ROOM              28 SF",
   "WALK-IN CLOSET           64 SF", "LAUNDRY                  48 SF",
   "HALLWAY                  88 SF", "MECHANICAL ROOM          36 SF",
   "GARAGE                   440 SF"],
  ["DOOR SCHEDULE", "MARK   SIZE             TYPE                QTY",
   "D1     3'-0\" x 7'-0\"     EXTERIOR INSULATED HM    QTY 2",
   "D2     2'-8\" x 6'-8\"     INTERIOR SOLID CORE      QTY 8",
   "D3     2'-6\" x 6'-8\"     INTERIOR HOLLOW CORE     QTY 6",
   "D4     2'-4\" x 6'-8\"     INTERIOR POCKET          QTY 3",
   "D5     16'-0\" x 7'-0\"    OVERHEAD GARAGE          QTY 1",
   "D6     6'-0\" x 6'-8\"     EXTERIOR SLIDING GLASS   QTY 1"],
  ["WINDOW SCHEDULE", "MARK   SIZE             TYPE          QTY",
   "W1     3'-0\" x 4'-0\"     DOUBLE HUNG     QTY 8",
   "W2     2'-6\" x 4'-0\"     DOUBLE HUNG     QTY 5",
   "W3     5'-0\" x 4'-0\"     FIXED PICTURE   QTY 3",
   "W4     2'-0\" x 2'-0\"     AWNING          QTY 4"],
  ["PLUMBING FIXTURE SCHEDULE",
   "WATER CLOSET             QTY 3", "LAVATORY                 QTY 4",
   "BATHTUB                  QTY 1", "SHOWER                   QTY 2",
   "KITCHEN SINK             QTY 1", "LAUNDRY SINK             QTY 1",
   "WATER HEATER             QTY 1", "HOSE BIBB                QTY 2"],
]

if __name__ == '__main__':
    import warnings
    from pypdf import PdfReader, PdfWriter
    pdf = build_pdf(PAGES)
    # Normalise so the shipped asset has a clean, standards-valid xref.
    with warnings.catch_warnings():
        warnings.simplefilter('ignore')
        rd, wr = PdfReader(io.BytesIO(pdf)), PdfWriter()
        for p in rd.pages:
            wr.add_page(p)
        buf = io.BytesIO(); wr.write(buf); pdf = buf.getvalue()
    path = 'public/samples/sample-residential-plan-set.pdf'
    open(path, 'wb').write(pdf)
    print(f'wrote {path} ({len(pdf)} bytes, {len(PAGES)} pages)')
