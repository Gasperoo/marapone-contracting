/* Marapone Stripe checkout widget.
   Wires any element with [data-checkout] to start a Stripe Checkout session.

   Build tiers (Starter/Pilot) open a small modal to choose the local-machine
   add-on and (optionally) apply a welcome code, then pay the deposit. Marketing
   packages and support plans go straight to Stripe.

   Markup:
     <a data-checkout="build"     data-tier="starter" data-vertical="construction">…</a>
     <a data-checkout="marketing" data-tier="growth">…</a>
     <a data-checkout="support"   data-plan="flex">…</a>
*/
(function () {
  'use strict';
  var HST = 0.13, ADDON = 1000;
  var BUILDS = { starter: { label: 'Starter', price: 1500, dep: 0.25 }, pilot: { label: 'Pilot', price: 4900, dep: 0.35 } };
  var fmt = function (n) { return '$' + n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };

  function injectCss() {
    if (document.getElementById('mp-co-css')) return;
    var s = document.createElement('style');
    s.id = 'mp-co-css';
    s.textContent = [
      '.mp-co-ovl{position:fixed;inset:0;background:rgba(0,0,0,.72);backdrop-filter:blur(3px);z-index:9998;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .18s}',
      '.mp-co-ovl.on{opacity:1}',
      '.mp-co{background:#141414;border:1px solid #2e2e2e;border-radius:12px;max-width:440px;width:100%;padding:26px 26px 22px;font-family:"DM Sans",system-ui,sans-serif;color:#e8e8e8;max-height:92vh;overflow:auto;transform:translateY(8px);transition:transform .18s}',
      '.mp-co-ovl.on .mp-co{transform:none}',
      '.mp-co h3{font-family:"Bebas Neue",Arial,sans-serif;font-weight:400;letter-spacing:1px;font-size:26px;margin:0 0 2px;color:#fff;text-transform:uppercase}',
      '.mp-co .sub{font-family:"DM Mono",monospace;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#f97316;margin:0 0 18px}',
      '.mp-co .row{display:flex;justify-content:space-between;font-size:14px;padding:6px 0;color:#a0a0a0}',
      '.mp-co .row b{color:#e8e8e8;font-weight:600}',
      '.mp-co .due{border-top:1px solid #2e2e2e;margin-top:8px;padding-top:12px;font-size:16px;color:#e8e8e8}',
      '.mp-co .due b{color:#fb923c}',
      '.mp-co label.chk{display:flex;gap:10px;align-items:flex-start;margin:14px 0;font-size:14px;color:#e8e8e8;cursor:pointer}',
      '.mp-co input[type=checkbox]{margin-top:3px;accent-color:#f97316;width:16px;height:16px}',
      '.mp-co input[type=email],.mp-co input[type=text]{width:100%;box-sizing:border-box;background:#1f1f1f;border:1px solid #3a3a3a;color:#e8e8e8;padding:11px 12px;border-radius:7px;font-size:14px;font-family:inherit;outline:none;margin-top:10px}',
      '.mp-co input:focus{border-color:#f97316}',
      '.mp-co .err{color:#f87171;font-size:12.5px;margin:8px 0 0;min-height:1px}',
      '.mp-co .go{width:100%;margin-top:16px;background:#f97316;color:#0a0a0a;border:0;border-radius:7px;padding:13px;font-weight:700;font-size:14px;font-family:inherit;cursor:pointer}',
      '.mp-co .go:disabled{opacity:.6;cursor:wait}',
      '.mp-co .fine{font-size:11.5px;color:#6e6e6e;margin:12px 0 0;line-height:1.5}',
      '.mp-co .x{float:right;background:none;border:0;color:#6e6e6e;font-size:22px;line-height:1;cursor:pointer;margin:-6px -6px 0 0}',
      '.mp-co a{color:#fb923c}'
    ].join('');
    document.head.appendChild(s);
  }

  function close(ovl) { ovl.classList.remove('on'); setTimeout(function () { ovl.remove(); }, 200); }

  function post(payload) {
    return fetch('/api/checkout', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); });
  }

  // Marketing & support: straight to Stripe.
  function quickCheckout(el, payload, btnLabel) {
    var orig = el.textContent;
    el.style.pointerEvents = 'none'; el.dataset.busy = '1'; el.textContent = 'Loading…';
    post(payload).then(function (res) {
      if (res.ok && res.j.url) { window.location.href = res.j.url; return; }
      alert((res.j && res.j.error) || 'Could not start checkout. Email general@marapone.com.');
      el.style.pointerEvents = ''; el.textContent = orig; delete el.dataset.busy;
    }).catch(function () {
      alert('Network error. Email general@marapone.com.');
      el.style.pointerEvents = ''; el.textContent = orig; delete el.dataset.busy;
    });
  }

  // Build tiers: modal with add-on + welcome code, then pay the deposit.
  function openBuildModal(tier, vertical) {
    var b = BUILDS[tier]; if (!b) return;
    injectCss();
    var ovl = document.createElement('div'); ovl.className = 'mp-co-ovl';
    ovl.innerHTML =
      '<div class="mp-co" role="dialog" aria-modal="true">' +
      '<button class="x" aria-label="Close">&times;</button>' +
      '<div class="sub">' + (vertical ? vertical + ' · ' : '') + 'deposit to reserve</div>' +
      '<h3>' + b.label + ' build</h3>' +
      '<div class="bd"></div>' +
      '<label class="chk"><input type="checkbox" class="addon"><span>Add a <b>dedicated local machine</b> — +' + fmt(ADDON) + ', no tax, yours to keep</span></label>' +
      '<input type="email" class="email" placeholder="Email for your receipt" autocomplete="email" required>' +
      '<input type="text" class="code" placeholder="Welcome code (optional)">' +
      '<p class="err"></p>' +
      '<button class="go">Continue to payment &rarr;</button>' +
      '<p class="fine">Secure checkout by Stripe. The balance is invoiced on completion. A valid welcome code (10% off, tied to your email) is applied at the payment step.</p>' +
      '</div>';
    document.body.appendChild(ovl);
    requestAnimationFrame(function () { ovl.classList.add('on'); });

    var bd = ovl.querySelector('.bd');
    var addonEl = ovl.querySelector('.addon');
    var emailEl = ovl.querySelector('.email');
    var codeEl = ovl.querySelector('.code');
    var err = ovl.querySelector('.err');
    var go = ovl.querySelector('.go');

    function render() {
      var taxed = b.price * (1 + HST);
      var deposit = taxed * b.dep;
      var addon = addonEl.checked ? ADDON : 0;
      var due = deposit + addon;
      var balance = taxed - deposit;
      bd.innerHTML =
        '<div class="row"><span>' + b.label + ' build</span><span>' + fmt(b.price) + '</span></div>' +
        '<div class="row"><span>HST (13%)</span><span>' + fmt(taxed - b.price) + '</span></div>' +
        '<div class="row"><span>Project total</span><b>' + fmt(taxed) + '</b></div>' +
        (addon ? '<div class="row"><span>Local machine (no tax)</span><span>' + fmt(addon) + '</span></div>' : '') +
        '<div class="row due"><span>Deposit due now (' + Math.round(b.dep * 100) + '%' + (addon ? ' + machine' : '') + ')</span><b>' + fmt(due) + '</b></div>' +
        '<div class="row" style="font-size:12.5px"><span>Balance on completion</span><span>' + fmt(balance) + '</span></div>';
    }
    render();
    addonEl.addEventListener('change', render);

    ovl.querySelector('.x').addEventListener('click', function () { close(ovl); });
    ovl.addEventListener('click', function (e) { if (e.target === ovl) close(ovl); });

    go.addEventListener('click', function () {
      err.textContent = '';
      var email = emailEl.value.trim();
      var code = codeEl.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = 'Please enter a valid email.'; emailEl.focus(); return; }
      go.disabled = true; go.textContent = 'Starting checkout…';
      post({ kind: 'build', tier: tier, vertical: vertical, addOn: addonEl.checked, email: email, code: code })
        .then(function (res) {
          if (res.ok && res.j.url) { window.location.href = res.j.url; return; }
          err.textContent = (res.j && res.j.error) || 'Could not start checkout.';
          go.disabled = false; go.textContent = 'Continue to payment →';
        }).catch(function () {
          err.textContent = 'Network error. Try again or email general@marapone.com.';
          go.disabled = false; go.textContent = 'Continue to payment →';
        });
    });
  }

  function onClick(e) {
    var el = e.currentTarget;
    if (el.dataset.busy) return;
    e.preventDefault();
    var kind = el.getAttribute('data-checkout');
    if (kind === 'build') {
      openBuildModal(el.getAttribute('data-tier'), el.getAttribute('data-vertical') || '');
    } else if (kind === 'marketing') {
      quickCheckout(el, { kind: 'marketing', tier: el.getAttribute('data-tier') });
    } else if (kind === 'support') {
      quickCheckout(el, { kind: 'support', plan: el.getAttribute('data-plan') });
    }
  }

  function attach() {
    document.querySelectorAll('[data-checkout]').forEach(function (el) {
      if (el.dataset.coWired) return; el.dataset.coWired = '1';
      el.addEventListener('click', onClick);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { var o = document.querySelector('.mp-co-ovl'); if (o) close(o); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attach);
  else attach();
})();
