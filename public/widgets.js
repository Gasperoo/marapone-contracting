/* ============================================================
   Marapone site-wide widgets
   - WhatsApp floating button (always visible)
   - Exit-intent email capture (desktop only, shown once per session)
   - Newsletter signup mount target (`#newsletter-mount`) — opt-in
   Auto-detects the current vertical from the URL to pick palette.
   ============================================================ */
(function () {
  'use strict';
  if (window.__marapone_widgets_loaded) return;
  window.__marapone_widgets_loaded = true;

  var path = location.pathname || '';
  var isLogistics = path.indexOf('/logistics') === 0;
  var accent = isLogistics ? '#52b788' : '#f97316';
  var accentDark = isLogistics ? '#2d6a4f' : '#ea580c';
  var contactUrl = isLogistics ? '/logistics/contact' : '/construction/contact';
  var WA_URL = 'https://wa.me/message/SZZRHSTGUDJCL1';

  // Don't render widgets on legal / standalone pages
  var SKIP = ['/privacy', '/terms', '/cookies', '/security', '/badge'];
  for (var i = 0; i < SKIP.length; i++) if (path.indexOf(SKIP[i]) === 0) return;

  // ===== STYLES =====
  var style = document.createElement('style');
  style.textContent = [
    '#mp-wa-btn{position:fixed;bottom:20px;right:20px;z-index:9998;width:54px;height:54px;border-radius:50%;background:#25D366;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(0,0,0,0.45);transition:transform .18s ease,box-shadow .18s ease;text-decoration:none}',
    '#mp-wa-btn:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(0,0,0,0.55)}',
    '#mp-wa-btn svg{width:28px;height:28px;fill:#fff}',
    '#mp-wa-btn[aria-expanded="true"]{background:#1da851}',
    '@media (max-width:639px){#mp-wa-btn{bottom:14px;right:14px;width:48px;height:48px}#mp-wa-btn svg{width:24px;height:24px}}',
    '#mp-exit{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;padding:1rem;background:rgba(10,10,10,0.78);backdrop-filter:blur(6px)}',
    '#mp-exit.open{display:flex}',
    '#mp-exit .box{background:#1a1a1a;border:1px solid #3a3a3a;border-radius:12px;max-width:440px;width:100%;padding:2rem;color:#e8e8e8;font-family:"DM Sans",sans-serif;position:relative}',
    '#mp-exit .close{position:absolute;top:0.75rem;right:0.75rem;background:none;border:none;color:#a0a0a0;cursor:pointer;padding:0.5rem}',
    '#mp-exit .close:hover{color:#fff}',
    '#mp-exit h3{font-family:"Bebas Neue",sans-serif;font-size:1.75rem;letter-spacing:0.02em;color:#e8e8e8;margin:0 0 0.5rem;line-height:1.1}',
    '#mp-exit p{font-size:0.875rem;color:#a0a0a0;line-height:1.55;margin:0 0 1.25rem}',
    '#mp-exit input[type=email]{width:100%;background:#2e2e2e;border:1px solid #3a3a3a;color:#e8e8e8;padding:0.75rem 1rem;border-radius:6px;font-size:0.875rem;font-family:"DM Sans",sans-serif;outline:none;margin-bottom:0.75rem;transition:border-color .15s}',
    '#mp-exit input[type=email]:focus{border-color:' + accent + '}',
    '#mp-exit button.submit{width:100%;color:#fff;font-weight:600;padding:0.85rem;border-radius:6px;border:none;cursor:pointer;font-family:"DM Sans",sans-serif;font-size:0.9rem;background:linear-gradient(135deg,' + accent + ' 0%,' + accentDark + ' 100%)}',
    '#mp-exit button.submit:disabled{opacity:0.6;cursor:wait}',
    '#mp-exit .micro{font-family:"DM Mono",monospace;font-size:0.7rem;color:' + accent + ';text-transform:uppercase;letter-spacing:0.08em;margin:0 0 0.75rem}',
    '#mp-exit .note{font-size:0.75rem;color:#666;text-align:center;margin-top:0.75rem}',
    '#mp-exit .ok{text-align:center;padding:1rem 0}',
    '.mp-nl-form{display:flex;gap:0.5rem;flex-wrap:wrap;max-width:420px}',
    '.mp-nl-form input{flex:1 1 200px;background:#2e2e2e;border:1px solid #3a3a3a;color:#e8e8e8;padding:0.65rem 0.85rem;border-radius:6px;font-size:0.85rem;font-family:"DM Sans",sans-serif;outline:none;transition:border-color .15s}',
    '.mp-nl-form input:focus{border-color:' + accent + '}',
    '.mp-nl-form button{color:#fff;padding:0.65rem 1.1rem;border:none;border-radius:6px;font-weight:600;cursor:pointer;font-size:0.85rem;font-family:"DM Sans",sans-serif;white-space:nowrap;background:linear-gradient(135deg,' + accent + ' 0%,' + accentDark + ' 100%)}',
    '.mp-nl-form button:disabled{opacity:0.6;cursor:wait}',
    '.mp-nl-msg{font-family:"DM Mono",monospace;font-size:0.7rem;color:#a0a0a0;margin-top:0.5rem}',
    '.mp-nl-msg.ok{color:' + accent + '}'
  ].join('\n');
  document.head.appendChild(style);

  // ===== WHATSAPP BUTTON =====
  var wa = document.createElement('a');
  wa.id = 'mp-wa-btn';
  wa.href = WA_URL;
  wa.target = '_blank';
  wa.rel = 'noopener noreferrer';
  wa.setAttribute('aria-label', 'Chat with Marapone on WhatsApp');
  wa.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

  // ===== EXIT INTENT MODAL =====
  var exit = document.createElement('div');
  exit.id = 'mp-exit';
  exit.setAttribute('role', 'dialog');
  exit.setAttribute('aria-modal', 'true');
  exit.setAttribute('aria-labelledby', 'mp-exit-title');
  exit.innerHTML = [
    '<div class="box">',
    '<button type="button" class="close" aria-label="Close">',
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    '</button>',
    '<div class="content">',
    '<p class="micro">// Before you go</p>',
    '<h3 id="mp-exit-title">Get the sample handover doc — by email.</h3>',
    '<p>See exactly what you receive at the end of a build: the folder tree, the README template, the sample report, and the runbook. No follow-up calls.</p>',
    '<form id="mp-exit-form" novalidate>',
    '<input type="email" name="email" placeholder="you@yourcompany.com" required autocomplete="email" />',
    '<button type="submit" class="submit">Email me the sample →</button>',
    '<p class="note">One email. No list adds without consent.</p>',
    '</form>',
    '</div>',
    '<div class="ok" id="mp-exit-ok" style="display:none">',
    '<p class="micro" style="text-align:center">// Sent</p>',
    '<h3 style="text-align:center">Check your inbox</h3>',
    '<p style="text-align:center;margin-bottom:0">The sample will land within a few minutes.</p>',
    '</div>',
    '</div>'
  ].join('');

  function closeExit() { exit.classList.remove('open'); }
  function openExit() {
    if (sessionStorage.getItem('mp_exit_seen')) return;
    if (location.pathname.indexOf('/contact') !== -1 || location.pathname.indexOf('/discovery') !== -1) return;
    sessionStorage.setItem('mp_exit_seen', '1');
    exit.classList.add('open');
  }

  function attach() {
    document.body.appendChild(wa);
    document.body.appendChild(exit);
    exit.querySelector('.close').addEventListener('click', closeExit);
    exit.addEventListener('click', function (e) { if (e.target === exit) closeExit(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeExit(); });

    // Desktop exit-intent
    var mediaQuery = window.matchMedia('(min-width: 768px) and (pointer: fine)');
    if (mediaQuery.matches) {
      var triggered = false;
      document.addEventListener('mouseout', function (e) {
        if (triggered) return;
        if (!e.relatedTarget && e.clientY < 10) { triggered = true; openExit(); }
      });
    }

    // Exit form submit
    var form = document.getElementById('mp-exit-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('button[type=submit]');
        var email = form.email.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { form.email.focus(); return; }
        btn.disabled = true; btn.textContent = 'Sending…';
        fetch('/api/newsletter-signup', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, source: 'exit_intent', vertical: isLogistics ? 'logistics' : 'construction' })
        }).then(function (r) { return r.json().catch(function () { return {}; }); }).then(function () {
          form.style.display = 'none';
          document.getElementById('mp-exit-ok').style.display = 'block';
        }).catch(function () {
          btn.disabled = false; btn.textContent = 'Try again →';
        });
      });
    }

    // Newsletter mount points (footer signup boxes)
    document.querySelectorAll('#newsletter-mount, [data-newsletter]').forEach(function (mount) {
      var f = document.createElement('form');
      f.className = 'mp-nl-form';
      f.innerHTML = '<input type="email" name="email" placeholder="you@yourcompany.com" required autocomplete="email" /><button type="submit">Subscribe</button>';
      var msg = document.createElement('p');
      msg.className = 'mp-nl-msg';
      msg.textContent = 'One email a month. One sample case study + one trend.';
      mount.innerHTML = '';
      mount.appendChild(f);
      mount.appendChild(msg);
      f.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var btn = f.querySelector('button');
        var email = f.email.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = 'Please enter a valid email.'; return; }
        btn.disabled = true; btn.textContent = 'Sending…';
        fetch('/api/newsletter-signup', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, source: 'footer', vertical: isLogistics ? 'logistics' : 'construction' })
        }).then(function (r) { return r.json().catch(function () { return {}; }); }).then(function () {
          f.style.display = 'none';
          msg.className = 'mp-nl-msg ok';
          msg.textContent = '✓ Subscribed. Welcome.';
        }).catch(function () {
          btn.disabled = false; btn.textContent = 'Subscribe';
          msg.textContent = 'Something went wrong. Try again or email general@marapone.com.';
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
})();
