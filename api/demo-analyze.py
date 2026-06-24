"""Live demo endpoint — runs the genuine document-intelligence engine on the
user's uploaded file and returns REAL results, but gates them server-side:
only the top few findings (and a couple of rows) come back in full; everything
else is redacted to a count/severity so the browser never receives the locked
data. CSS blur on the client is purely cosmetic over already-stripped content.

The engine logic is vendored verbatim from the desktop apps and kept inline in
this single file so the serverless function has no sibling-module import to
bundle. Deterministic Python, one light dependency (pypdf), no external calls,
no per-request cost.

Security: 5 MB cap, file-type allowlist, in-memory per-IP burst limit +
HMAC-signed per-browser daily quota, in-memory only (nothing persisted),
tight CORS.
"""
import base64
import hashlib
import hmac
import io
import json
import os
import re
import time
import urllib.parse
import urllib.request
from http.server import BaseHTTPRequestHandler

# ════════════════════════════ ENGINE ═════════════════════════════════════
_AMOUNT_RE = r'-?\$?€?£?\s*\d{1,3}(?:,\d{3})+(?:\.\d{1,2})?|-?\$?€?£?\s*\d+\.\d{2}'


def money(s):
    try:
        return float(str(s).replace(',', '').replace('$', '').replace('€', '')
                     .replace('£', '').strip())
    except Exception:
        return None


def extract_text(ext, raw):
    """Extract plain text from an uploaded file (pdf/csv/txt/json)."""
    if ext == 'pdf' or raw[:4] == b'%PDF':
        try:
            from pypdf import PdfReader
            reader = PdfReader(io.BytesIO(raw))
            pages = [(pg.extract_text() or '') for pg in reader.pages]
            return '\n'.join(pages), len(pages)
        except Exception as e:
            return f'__PDF_ERROR__:{e}', 0
    for enc in ('utf-8', 'latin-1'):
        try:
            return raw.decode(enc), 0
        except Exception:
            continue
    return '', 0


# ── Invoice Auditor (logistics) ───────────────────────────────────────────
def _parse_invoice_csv(text):
    import csv
    delim = '\t' if (text.count('\t') > text.count(',')) else ','
    rows = list(csv.reader(io.StringIO(text), delimiter=delim))
    rows = [r for r in rows if any(c.strip() for c in r)]
    if not rows:
        return [], {}

    summary = {}
    SUMMARY_LABELS = {
        'subtotal': 'subtotal', 'sub total': 'subtotal',
        'tax': 'tax', 'vat': 'tax', 'gst': 'tax', 'hst': 'tax', 'sales tax': 'tax',
        'shipping': 'shipping', 'freight': 'shipping', 'carriage': 'shipping',
        'discount': 'discount',
        'grand total': 'total', 'total due': 'total', 'amount due': 'total',
        'balance due': 'total', 'invoice total': 'total', 'total': 'total',
    }
    META_LABELS = {
        'invoice no': 'invoice_no', 'invoice number': 'invoice_no', 'invoice #': 'invoice_no',
        'invoice date': 'invoice_date', 'date': 'invoice_date',
        'due date': 'due_date', 'po number': 'po_no', 'po no': 'po_no',
        'purchase order': 'po_no', 'currency': 'currency',
    }

    def last_num(cells):
        for c in reversed(cells):
            v = money(c)
            if v is not None and c.strip():
                return v
        return None

    header_idx = -1
    for i, r in enumerate(rows):
        joined = ' '.join(c.strip().lower() for c in r)
        if any(k in joined for k in ('qty', 'quantity', 'unit price', 'price', 'rate', 'amount')):
            header_idx = i
            break
    header = [h.strip().lower() for h in rows[header_idx]] if header_idx >= 0 else []

    def col(*names):
        for i, h in enumerate(header):
            if any(n in h for n in names):
                return i
        return -1

    ci_desc = col('description', 'item', 'product', 'service')
    ci_qty = col('qty', 'quantity', 'units')
    ci_price = col('unit price', 'unitprice', 'price', 'rate', 'unit cost')
    ci_amt = col('amount', 'line total', 'extended', 'total')

    items = []
    for i, r in enumerate(rows):
        if i == header_idx:
            continue
        first = (r[0].strip().lower() if r else '')
        matched_meta = False
        for lbl, key in META_LABELS.items():
            if first == lbl or first.startswith(lbl):
                val = ''
                for c in r[1:]:
                    if c.strip():
                        val = c.strip(); break
                if val and key not in summary:
                    summary[key] = val
                matched_meta = True
                break
        if matched_meta:
            continue
        matched_sum = False
        for lbl, key in SUMMARY_LABELS.items():
            if first == lbl or first.startswith(lbl + ' ') or first == lbl + ':':
                n = last_num(r)
                if n is not None:
                    summary[key] = n
                matched_sum = True
                break
        if matched_sum:
            continue
        if header_idx >= 0 and max(ci_qty, ci_price, ci_amt) >= 0:
            if len(r) < len(header):
                r = r + [''] * (len(header) - len(r))
            desc = r[ci_desc].strip() if ci_desc >= 0 and ci_desc < len(r) else ''
            qty = money(r[ci_qty]) if ci_qty >= 0 and ci_qty < len(r) else None
            price = money(r[ci_price]) if ci_price >= 0 and ci_price < len(r) else None
            amt = money(r[ci_amt]) if ci_amt >= 0 and ci_amt < len(r) else None
            if desc or qty or price or amt:
                items.append({'description': desc, 'qty': qty, 'unit_price': price, 'amount': amt})
    return items, summary


def audit_invoice(filename, ext, raw):
    text, _ = extract_text(ext, raw)
    if text.startswith('__PDF_ERROR__'):
        return {'ok': False, 'error': 'Could not read this PDF (it may be scanned/image-only). Try a text-based PDF or CSV.'}
    if not text.strip():
        return {'ok': False, 'error': 'No readable text found in the file.'}

    is_csv = (ext in ('csv', 'tsv')) or (raw[:4] != b'%PDF' and ext not in ('pdf', 'txt', 'json')
                                         and ',' in text and text.count('\n') >= 1
                                         and text.count(',') >= text.count('\n'))
    items = []
    if is_csv:
        items, summ = _parse_invoice_csv(text)
        inv_no = str(summ.get('invoice_no', '') or '')
        inv_date = str(summ.get('invoice_date', '') or '')
        due_date = str(summ.get('due_date', '') or '')
        po_no = str(summ.get('po_no', '') or '')
        cur = str(summ.get('currency', '') or '')
        subtotal = summ.get('subtotal'); tax = summ.get('tax'); total = summ.get('total')
        discount = summ.get('discount'); shipping = summ.get('shipping')
    else:
        def grab(pattern):
            m = re.search(pattern, text, re.IGNORECASE)
            return m.group(1).strip() if m else ''
        inv_no = grab(r'invoice\s*(?:no|number|#)\s*[:#]?\s*([A-Za-z0-9][\w\-/]{1,24})')
        inv_date = grab(r'(?:invoice\s*date|date\s*of\s*issue|dated)\s*[:#]?\s*([\d]{1,4}[\-/.][\d]{1,2}[\-/.][\d]{1,4}|[A-Za-z]+\s+\d{1,2},?\s+\d{4})')
        due_date = grab(r'due\s*date\s*[:#]?\s*([\d]{1,4}[\-/.][\d]{1,2}[\-/.][\d]{1,4}|[A-Za-z]+\s+\d{1,2},?\s+\d{4})')
        po_no = grab(r'(?:p\.?o\.?|purchase\s*order)\s*(?:no|number|#)?\s*[:#]?\s*([A-Za-z0-9][\w\-/]{1,24})')
        cur = ''
        for code, sym in [('USD', '$'), ('EUR', '€'), ('GBP', '£')]:
            if code in text or sym in text:
                cur = code; break

        def grab_amt(label):
            m = re.search(label + r'[^\d\-]{0,20}(' + _AMOUNT_RE + r')', text, re.IGNORECASE)
            return money(m.group(1)) if m else None
        subtotal = grab_amt(r'sub[\s\-]?total')
        tax = grab_amt(r'(?:tax|vat|gst|hst)')
        total = grab_amt(r'(?:grand\s*total|total\s*due|amount\s*due|balance\s*due|invoice\s*total|(?<!sub)total)')
        discount = grab_amt(r'discount')
        shipping = grab_amt(r'(?:shipping|freight|carriage)')

    findings = []

    def add(sev, msg):
        findings.append({'severity': sev, 'message': msg})

    line_results = []
    computed_subtotal = 0.0
    have_line_amounts = False
    for it in items:
        qty, price, amt = it.get('qty'), it.get('unit_price'), it.get('amount')
        check = 'ok'; expected = None
        if qty is not None and price is not None:
            expected = round(qty * price, 2)
            if amt is None:
                amt = expected
            elif abs(expected - amt) > 0.01:
                check = 'mismatch'
                add('high', f"Line '{it.get('description') or '—'}': {qty} × {price} = {expected:,.2f}, but invoice states {amt:,.2f} (Δ {amt - expected:+,.2f})")
        if amt is not None:
            computed_subtotal += amt; have_line_amounts = True
        if amt is not None and amt < 0:
            add('medium', f"Negative line amount on '{it.get('description') or '—'}' ({amt:,.2f})")
        line_results.append({**it, 'amount': amt, 'expected': expected, 'check': check})

    computed_subtotal = round(computed_subtotal, 2) if have_line_amounts else None

    seen = {}
    for it in items:
        d = (it.get('description') or '').strip().lower()
        if d:
            seen[d] = seen.get(d, 0) + 1
    for d, c in seen.items():
        if c > 1:
            add('low', f"Duplicate line item appears {c}× : '{d}'")

    if computed_subtotal is not None and subtotal is not None and abs(computed_subtotal - subtotal) > 0.01:
        add('high', f"Line items sum to {computed_subtotal:,.2f} but stated subtotal is {subtotal:,.2f} (Δ {subtotal - computed_subtotal:+,.2f})")
    base = subtotal if subtotal is not None else computed_subtotal
    if base is not None and tax is not None and total is not None:
        expected_total = round(base + tax + (shipping or 0) - (discount or 0), 2)
        if abs(expected_total - total) > 0.02:
            add('high', f"Subtotal {base:,.2f} + tax {tax:,.2f}{' + shipping ' + format(shipping, ',.2f') if shipping else ''}{' − discount ' + format(discount, ',.2f') if discount else ''} = {expected_total:,.2f}, but stated total is {total:,.2f} (Δ {total - expected_total:+,.2f})")
    tax_rate = None
    if base and tax is not None and base > 0:
        tax_rate = round(tax / base * 100, 2)
        if tax_rate > 30:
            add('medium', f"Unusually high effective tax rate: {tax_rate}%")

    if not inv_no:
        add('medium', 'No invoice number detected.')
    if not inv_date:
        add('low', 'No invoice date detected.')
    if total is None:
        add('high', 'No invoice total detected.')

    severity_order = {'high': 0, 'medium': 1, 'low': 2}
    findings.sort(key=lambda f: severity_order.get(f['severity'], 3))
    risk = 'HIGH' if any(f['severity'] == 'high' for f in findings) else \
           'MEDIUM' if any(f['severity'] == 'medium' for f in findings) else 'LOW'

    return {
        'ok': True, 'tool': 'invoice', 'filename': filename,
        'fields': {'invoice_no': inv_no, 'invoice_date': inv_date, 'due_date': due_date,
                   'po_no': po_no, 'currency': cur},
        'totals': {'stated_subtotal': subtotal, 'computed_subtotal': computed_subtotal,
                   'tax': tax, 'shipping': shipping, 'discount': discount,
                   'stated_total': total, 'tax_rate_pct': tax_rate},
        'line_items': line_results, 'findings': findings, 'risk': risk,
        'summary': {'line_count': len(line_results),
                    'flagged': sum(1 for r in line_results if r['check'] != 'ok'),
                    'issues': len(findings)},
    }


# ── Blueprint quick-scan (construction) ───────────────────────────────────
_DISCIPLINES = [
    ('Architectural', ['architectural', 'floor plan', 'elevation', 'door schedule', 'window schedule', 'room finish']),
    ('Structural', ['structural', 'foundation', 'rebar', 'reinforc', 'footing', 'beam schedule', 'column schedule']),
    ('Mechanical', ['mechanical', 'hvac', 'ductwork', 'rooftop unit', 'rtu', 'diffuser']),
    ('Electrical', ['electrical', 'panel schedule', 'single line', 'lighting plan', 'receptacle']),
    ('Plumbing', ['plumbing', 'sanitary', 'storm', 'domestic water', 'fixture schedule', 'riser diagram']),
    ('Civil', ['civil', 'grading', 'site plan', 'utility plan', 'drainage']),
    ('Fire Protection', ['fire protection', 'sprinkler', 'fire alarm', 'standpipe']),
]


def scan_blueprint(filename, ext, raw):
    text, page_count = extract_text(ext, raw)
    if text.startswith('__PDF_ERROR__'):
        return {'ok': False, 'error': 'Could not read this PDF (it may be scanned/image-only). A text/vector PDF works best.'}
    if not text.strip():
        return {'ok': False, 'error': 'No readable text found — this looks like a scanned/image-only drawing. The full app OCRs these; the demo needs a vector PDF.'}
    low = text.lower()

    sheet_re = re.compile(r'\b([A-Z]{1,3}[-.]?\d{1,3}(?:\.\d{1,2})?)\b')
    sheets = []
    seen = set()
    for m in sheet_re.finditer(text):
        if re.match(r'^[A-Z]{1,3}[-.]?\d', m.group(1).upper()) and m.group(1).upper()[0] in 'ASMEPCFGLT':
            key = m.group(1).upper()
            if key not in seen:
                seen.add(key); sheets.append(key)
    sheets = sheets[:60]

    disciplines = [name for name, kws in _DISCIPLINES if any(k in low for k in kws)]

    scales = list(dict.fromkeys(re.findall(r'(\d{1,2}/\d{1,2}"\s*=\s*\d+\'(?:-\d+")?|1\s*:\s*\d{1,4}|1/\d{1,3}"\s*=\s*1\'?-?0")', text)))[:6]
    areas = re.findall(r'([\d,]{2,})\s*(?:sq\.?\s*ft|sf|square\s*feet)', low)
    area_total = None
    try:
        nums = [int(a.replace(',', '')) for a in areas if a.replace(',', '').isdigit()]
        if nums:
            area_total = sum(nums)
    except Exception:
        pass
    rooms = list(dict.fromkeys(re.findall(r'\b(office|corridor|lobby|restroom|toilet|kitchen|stair|storage|mechanical room|electrical room|conference|classroom|bedroom|bathroom|garage|closet|utility)\b', low)))
    has_revisions = bool(re.search(r'\b(rev(?:ision)?\.?\s*\d|issued for (?:construction|permit|bid))\b', low))
    has_scale = bool(scales) or 'scale' in low
    has_north = 'north' in low or 'true north' in low
    has_titleblock = bool(re.search(r'(project no|drawn by|checked by|sheet title|sheet no|drawing no)', low))

    findings = []

    def add(sev, msg):
        findings.append({'severity': sev, 'message': msg})

    if not has_scale:
        add('high', 'No drawing scale detected on any sheet — quantities and dimensions cannot be verified against scale.')
    if not has_north:
        add('medium', 'No north arrow / orientation reference detected — coordination risk across plan sheets.')
    if not has_titleblock:
        add('medium', 'Title-block metadata (project no., drawn/checked by, sheet title) not detected — drawings may be uncontrolled.')
    if not has_revisions:
        add('medium', 'No revision history or issue stamp detected — cannot confirm this is the current issued set.')
    if len(disciplines) <= 1:
        add('low', 'Only one design discipline detected — a coordinated set normally spans Architectural + Structural + MEP.')
    if not rooms:
        add('low', 'No room/space labels detected — area takeoff and finish scheduling rely on labelled spaces.')
    add('low', f'{page_count or "Multiple"} page(s) parsed · {len(sheets)} sheet reference(s) · {len(disciplines)} discipline(s) identified.')

    severity_order = {'high': 0, 'medium': 1, 'low': 2}
    findings.sort(key=lambda f: severity_order.get(f['severity'], 3))
    risk = 'HIGH' if any(f['severity'] == 'high' for f in findings) else \
           'MEDIUM' if any(f['severity'] == 'medium' for f in findings) else 'LOW'

    return {
        'ok': True, 'tool': 'blueprint', 'filename': filename,
        'fields': {'pages': page_count, 'sheets_detected': len(sheets),
                   'disciplines': disciplines, 'scales': scales,
                   'gross_area_sf': area_total, 'rooms_detected': len(rooms)},
        'sheets': sheets, 'rooms': rooms,
        'findings': findings, 'risk': risk,
        'summary': {'sheets': len(sheets), 'disciplines': len(disciplines),
                    'issues': len(findings)},
    }


# ════════════════════════════ HANDLER ════════════════════════════════════
ALLOWED_ORIGINS = {
    'https://marapone.com', 'https://www.marapone.com',
    'https://marapone.app', 'https://www.marapone.app',
}
ALLOWED_EXT = {'pdf', 'csv', 'tsv', 'txt', 'json'}
MAX_BYTES = 5 * 1024 * 1024
DAILY_QUOTA = 1
REVEAL = 3          # genuine findings revealed after a valid email (rest stay locked)
BURST_MAX = 12
BURST_WINDOW = 10 * 60
SECRET = (os.environ.get('DEMO_HMAC_SECRET') or 'marapone-demo-v1').encode()

# Cloudflare Turnstile. Defaults are Cloudflare's public TEST secret (always
# passes) so the flow works before real keys are set — replace TURNSTILE_SECRET
# (env) and the site key in the demo pages with your real widget's keys.
TURNSTILE_SECRET = os.environ.get('TURNSTILE_SECRET') or '1x0000000000000000000000000000000AA'
TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

# Lead capture (best-effort) via Resend, reusing the key the other functions use.
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
LEAD_TO = os.environ.get('DEMO_LEAD_TO') or 'maraponecontracting@gmail.com'
LEAD_FROM = os.environ.get('DEMO_LEAD_FROM') or 'Marapone Demo <onboarding@resend.dev>'
EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]{2,}$')

_ip_hits = {}


def _verify_turnstile(token, ip):
    """Verify a Cloudflare Turnstile token. Returns True/False."""
    if not token:
        return False
    try:
        data = urllib.parse.urlencode({'secret': TURNSTILE_SECRET, 'response': token, 'remoteip': ip}).encode()
        req = urllib.request.Request(TURNSTILE_VERIFY_URL, data=data, method='POST')
        with urllib.request.urlopen(req, timeout=8) as r:
            return bool(json.loads(r.read()).get('success'))
    except Exception:
        return False


def _capture_lead(email, tool, filename, risk):
    """Best-effort lead notification via Resend. Never blocks the response."""
    if not RESEND_API_KEY:
        return
    try:
        body = json.dumps({
            'from': LEAD_FROM, 'to': [LEAD_TO],
            'subject': f'New demo lead: {email} ({tool})',
            'text': f'Email: {email}\nTool: {tool}\nFile: {filename}\nRisk: {risk}\n'
                    f'Captured: {time.strftime("%Y-%m-%d %H:%M:%S")} UTC',
        }).encode()
        req = urllib.request.Request('https://api.resend.com/emails', data=body, method='POST',
                                     headers={'Authorization': f'Bearer {RESEND_API_KEY}',
                                              'Content-Type': 'application/json'})
        urllib.request.urlopen(req, timeout=8)
    except Exception:
        pass


PREMIUM = {
    'invoice': [
        {'label': 'Duplicate-payment & double-billing detection across your invoice history'},
        {'label': 'Contract-rate compliance — flag any charge above your agreed tariff'},
        {'label': 'Vendor risk scoring & spend analytics'},
        {'label': 'Live OFAC / sanctions screening on every party (Trade Doc Engine)'},
    ],
    'blueprint': [
        {'label': 'Automated quantity takeoff — counts, areas & lengths per assembly'},
        {'label': 'Full 113-point code & coordination audit'},
        {'label': 'Scope-gap finder — items in the spec but missing from the drawings'},
        {'label': 'Change-order & RFI risk detection'},
    ],
}


def _sign(payload):
    return hmac.new(SECRET, payload.encode(), hashlib.sha256).hexdigest()[:24]


def _read_quota_cookie(cookie_header):
    today = time.strftime('%Y-%m-%d')
    for part in (cookie_header or '').split(';'):
        part = part.strip()
        if part.startswith('mdemo='):
            try:
                day, count, sig = part[len('mdemo='):].split('.')
                if hmac.compare_digest(sig, _sign(f'{day}.{count}')) and day == today:
                    return today, int(count)
            except Exception:
                pass
    return today, 0


def _make_quota_cookie(day, count):
    val = f'{day}.{count}.{_sign(f"{day}.{count}")}'
    return f'mdemo={val}; Path=/; Max-Age=86400; SameSite=Strict; Secure; HttpOnly'


def _burst_ok(ip):
    now = time.time()
    hits = [t for t in _ip_hits.get(ip, []) if now - t < BURST_WINDOW]
    if len(hits) >= BURST_MAX:
        _ip_hits[ip] = hits
        return False
    hits.append(now)
    _ip_hits[ip] = hits
    return True


def _gate(result):
    """Split a genuine engine result into unlocked (real) + locked (redacted)."""
    tool = result.get('tool')
    findings = result.get('findings', [])
    out = {
        'ok': True, 'tool': tool, 'filename': result.get('filename'),
        'risk': result.get('risk'), 'summary': result.get('summary'),
        'fields': result.get('fields'),
        'findings': findings[:REVEAL],
        'locked_findings': [{'locked': True, 'severity': f.get('severity')} for f in findings[REVEAL:]],
        'premium': PREMIUM.get(tool, []),
    }
    if tool == 'invoice':
        items = result.get('line_items', [])
        out['totals'] = result.get('totals')
        out['line_items'] = items[:3]
        out['line_items_hidden'] = max(0, len(items) - 3)
    elif tool == 'blueprint':
        sheets = result.get('sheets', [])
        out['sheets'] = sheets[:5]
        out['sheets_hidden'] = max(0, len(sheets) - 5)
        out['rooms_hidden'] = len(result.get('rooms', []))
    out['unlocked'] = True
    return out


def _teaser(result):
    """Tier-0 (no email): aggregate counts + risk only. No field values, no
    finding text, no rows — nothing substantive leaves the server until a valid
    email is supplied (and even then only the top few findings are revealed)."""
    tool = result.get('tool')
    findings = result.get('findings', [])
    summ = result.get('summary', {})
    sev = {}
    for f in findings:
        sev[f['severity']] = sev.get(f['severity'], 0) + 1
    teaser = {'issues': summ.get('issues', len(findings)), 'severities': sev}
    if tool == 'invoice':
        teaser['line_count'] = summ.get('line_count')
        teaser['flagged'] = summ.get('flagged')
    elif tool == 'blueprint':
        teaser['sheets'] = summ.get('sheets')
        teaser['disciplines'] = summ.get('disciplines')
    return {'ok': True, 'tool': tool, 'filename': result.get('filename'),
            'risk': result.get('risk'), 'needs_email': True,
            'teaser': teaser, 'premium': PREMIUM.get(tool, [])}


class handler(BaseHTTPRequestHandler):
    def _cors(self):
        origin = self.headers.get('Origin', '')
        allow = origin if origin in ALLOWED_ORIGINS else 'https://marapone.com'
        self.send_header('Access-Control-Allow-Origin', allow)
        self.send_header('Vary', 'Origin')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Credentials', 'true')

    def _json(self, code, obj, extra_headers=None):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self._cors()
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        for k, v in (extra_headers or []):
            self.send_header(k, v)
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_POST(self):
        ip = (self.headers.get('x-real-ip')
              or (self.headers.get('x-forwarded-for', '').split(',')[0].strip())
              or 'unknown')
        if not _burst_ok(ip):
            return self._json(429, {'ok': False, 'error': 'Too many requests — please wait a few minutes.'})

        try:
            length = int(self.headers.get('Content-Length', 0))
        except ValueError:
            length = 0
        if length <= 0 or length > MAX_BYTES + 1_500_000:
            return self._json(413, {'ok': False, 'error': 'File too large. The demo accepts files up to 5 MB.'})

        try:
            raw_body = self.rfile.read(length)
            payload = json.loads(raw_body)
        except Exception:
            return self._json(400, {'ok': False, 'error': 'Malformed request.'})

        mode = (payload.get('mode') or '').strip()
        filename = (payload.get('filename') or 'upload').strip()
        b64 = payload.get('b64') or ''
        email = (payload.get('email') or '').strip().lower()
        token = payload.get('turnstile_token') or ''
        if mode not in ('invoice', 'blueprint'):
            return self._json(400, {'ok': False, 'error': 'Unknown demo mode.'})

        if ',' in b64 and b64[:5] == 'data:':
            b64 = b64.split(',', 1)[1]
        try:
            data = base64.b64decode(b64, validate=False)
        except Exception:
            data = b''
        if not data:
            return self._json(400, {'ok': False, 'error': 'Could not read the uploaded file.'})
        if len(data) > MAX_BYTES:
            return self._json(413, {'ok': False, 'error': 'File too large. The demo accepts files up to 5 MB.'})

        ext = filename.rsplit('.', 1)[-1].lower() if '.' in filename else ''
        if ext not in ALLOWED_EXT and data[:4] != b'%PDF':
            return self._json(415, {'ok': False, 'error': 'Unsupported file type. Upload a PDF, CSV, TSV, TXT or JSON.'})

        try:
            result = audit_invoice(filename, ext, data) if mode == 'invoice' else scan_blueprint(filename, ext, data)
        except Exception as e:
            return self._json(500, {'ok': False, 'error': f'Analysis failed: {e}'})

        if not result.get('ok'):
            return self._json(200, result)   # unreadable file — no gate, no quota

        # ── Tier 0: no email → counts + risk teaser only (nothing substantive). ──
        if not email or not EMAIL_RE.match(email):
            return self._json(200, _teaser(result))

        # ── Tier 1: valid email → verify human, enforce quota, reveal first result. ──
        if not _verify_turnstile(token, ip):
            return self._json(403, {'ok': False, 'verify': True,
                                    'error': 'Verification failed — please complete the check and retry.'})

        day, count = _read_quota_cookie(self.headers.get('Cookie', ''))
        if count >= DAILY_QUOTA:
            return self._json(429, {
                'ok': False, 'quota': True,
                'error': ('You have used your free demo unlock for today. ' if DAILY_QUOTA == 1
                          else f'You have used all {DAILY_QUOTA} free demo unlocks for today. ') +
                         'Book a free assessment to run the full audit on your documents.'})

        _capture_lead(email, mode, filename, result.get('risk'))
        gated = _gate(result)
        new_count = count + 1
        gated['remaining_today'] = max(0, DAILY_QUOTA - new_count)
        return self._json(200, gated, extra_headers=[('Set-Cookie', _make_quota_cookie(day, new_count))])
