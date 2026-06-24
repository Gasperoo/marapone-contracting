/* Shared live-demo controller for both /construction/demo and /logistics/demo.
 *
 * Flow:
 *   1. Upload (≤5 MB) -> POST tier-0 (no email) -> server returns a counts/risk
 *      teaser only (no findings text, no rows, no field values).
 *   2. Visitor enters email + solves Cloudflare Turnstile -> POST tier-1 ->
 *      server verifies the token, enforces the daily quota, captures the lead,
 *      and returns ONLY the top few genuine findings (+ a couple of rows). The
 *      bulk stays locked. The page-supplied renderResult() draws the tool-specific
 *      unlocked view.
 *
 * A page calls MaraDemo.init({ mode, sample, sampleName, accent, gradientClass,
 *   contactUrl, sitekey, renderResult }).
 */
window.MaraDemo = (function () {
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function riskColor(r) { return r === 'HIGH' ? '#f87171' : r === 'MEDIUM' ? '#fbbf24' : '#34d399'; }
  function money(v) { return v == null ? '—' : '$' + Number(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

  function init(cfg) {
    var dz = document.getElementById('dz');
    var fileInput = document.getElementById('file');
    var results = document.getElementById('results');
    var sampleBtn = document.getElementById('sample-btn');
    var accent = cfg.accent, grad = cfg.gradientClass, contact = cfg.contactUrl;
    var pending = null;          // { b64, filename }
    var cfToken = '';            // current Turnstile token
    var cfWidgetId = null;
    var helpers = { esc: esc, money: money, riskColor: riskColor, accent: accent, gradientClass: grad, contactUrl: contact };

    dz.addEventListener('click', function () { fileInput.click(); });
    dz.addEventListener('dragover', function (e) { e.preventDefault(); dz.classList.add('drag'); });
    dz.addEventListener('dragleave', function () { dz.classList.remove('drag'); });
    dz.addEventListener('drop', function (e) { e.preventDefault(); dz.classList.remove('drag'); if (e.dataTransfer.files[0]) handle(e.dataTransfer.files[0]); });
    fileInput.addEventListener('change', function () { if (fileInput.files[0]) handle(fileInput.files[0]); fileInput.value = ''; });
    if (sampleBtn) sampleBtn.addEventListener('click', function () {
      results.classList.remove('hidden'); results.innerHTML = loadingHTML(cfg.sampleName);
      fetch(cfg.sample).then(function (r) { return r.blob(); }).then(function (b) {
        handle(new File([b], cfg.sampleName, { type: 'application/octet-stream' }));
      }).catch(function () { results.innerHTML = errHTML('Could not load the sample file.'); });
    });

    function handle(file) {
      if (file.size > 5 * 1024 * 1024) { results.classList.remove('hidden'); results.innerHTML = errHTML('That file is larger than 5 MB. Try a smaller export.'); return; }
      results.classList.remove('hidden'); results.innerHTML = loadingHTML(file.name);
      cfToken = ''; cfWidgetId = null;
      var reader = new FileReader();
      reader.onload = function () { pending = { b64: reader.result, filename: file.name }; analyze(); };
      reader.onerror = function () { results.innerHTML = errHTML('Could not read that file.'); };
      reader.readAsDataURL(file);
    }

    function analyze() {
      post({ mode: cfg.mode, filename: pending.filename, b64: pending.b64 }, function (status, j) {
        if (!j || !j.ok) { results.innerHTML = errHTML((j && j.error) || 'Analysis failed.'); return; }
        if (j.needs_email) renderTeaser(j);
        else cfg.renderResult(results, j, helpers);   // unlocked (shouldn't occur without email)
      });
    }

    function unlock() {
      var emailEl = document.getElementById('demo-email');
      var msgEl = document.getElementById('demo-form-msg');
      var btn = document.getElementById('demo-unlock-btn');
      var email = (emailEl.value || '').trim();
      if (!EMAIL_RE.test(email)) { msgEl.textContent = 'Please enter a valid email address.'; emailEl.focus(); return; }
      if (!cfToken) { msgEl.textContent = 'Please complete the verification check.'; return; }
      msgEl.textContent = ''; btn.disabled = true; btn.textContent = 'Unlocking…';
      post({ mode: cfg.mode, filename: pending.filename, b64: pending.b64, email: email, turnstile_token: cfToken }, function (status, j) {
        if (j && j.ok) { cfg.renderResult(results, j, helpers); return; }
        btn.disabled = false; btn.textContent = 'Reveal the top findings →';
        if (window.turnstile && cfWidgetId !== null) { try { window.turnstile.reset(cfWidgetId); } catch (e) {} cfToken = ''; }
        if (j && j.quota) { results.innerHTML = errHTML(j.error, true, contact); }
        else { msgEl.textContent = (j && j.error) || 'Something went wrong — please retry.'; }
      });
    }

    function post(payload, cb) {
      fetch('/api/demo-analyze', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify(payload)
      }).then(function (r) { return r.json().then(function (j) { return cb(r.status, j); }); })
        .catch(function () { results.innerHTML = errHTML('Network error — please try again.'); });
    }

    function loadingHTML(name) {
      return '<div class="bg-gunmetal border border-plate rounded-xl p-10 text-center">' +
        '<svg class="spin w-8 h-8 mx-auto mb-3" style="color:' + accent + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a9 9 0 1 0 9 9" stroke-linecap="round"/></svg>' +
        '<p class="text-fog text-sm">Analysing <b class="text-chalk">' + esc(name) + '</b>…</p></div>';
    }
    function errHTML(msg, quota, contactUrl) {
      return '<div class="bg-gunmetal border border-plate rounded-xl p-8 text-center">' +
        '<p class="' + (quota ? '' : 'text-red-400') + ' font-semibold mb-2"' + (quota ? ' style="color:' + accent + '"' : '') + '>' + esc(msg) + '</p>' +
        (quota ? '<a href="' + (contactUrl || '#') + '" class="inline-block ' + grad + ' text-white font-semibold px-5 py-2.5 rounded mt-2">Book a free assessment &rarr;</a>'
               : '<p class="text-plate text-xs">A text-based PDF or CSV works best.</p>') + '</div>';
    }

    // Blurred placeholder bars (no real content — purely visual under the lock).
    function lockedBars(n) {
      var bars = '';
      for (var i = 0; i < n; i++) bars += '<div class="flex items-center gap-3 py-2 border-b border-plate/40"><span class="dot bg-plate"></span><span class="locked-blur text-sm text-fog">XXXXXXXX XXXXX XXXX XXXXXXX XXXX XX</span></div>';
      return bars;
    }
    function premiumCard(p) {
      return '<div class="lock-wrap bg-steel border border-plate rounded-lg p-4">' +
        '<div class="flex items-center gap-2 mb-2"><svg class="w-4 h-4" style="color:' + accent + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg><p class="text-chalk text-sm font-semibold">' + esc(p.label) + '</p></div>' +
        '<div class="locked-blur space-y-1"><div class="h-2 bg-plate rounded w-5/6"></div><div class="h-2 bg-plate rounded w-2/3"></div><div class="h-2 bg-plate rounded w-3/4"></div></div></div>';
    }

    function renderTeaser(j) {
      var t = j.teaser || {};
      var summaryLine = j.tool === 'invoice'
        ? (t.issues || 0) + ' issue' + (t.issues === 1 ? '' : 's') + ' detected across ' + (t.line_count || 0) + ' line items · ' + (t.flagged || 0) + ' flagged'
        : (t.issues || 0) + ' finding' + (t.issues === 1 ? '' : 's') + ' · ' + (t.sheets || 0) + ' sheet references · ' + (t.disciplines || 0) + ' disciplines';
      var sevChips = Object.keys(t.severities || {}).map(function (s) {
        return '<span class="font-mono text-[10px] uppercase sev-' + s + '" style="color:currentColor">' + (t.severities[s]) + ' ' + s + '</span>';
      }).join(' · ');
      var premium = (j.premium || []).map(premiumCard).join('');

      results.innerHTML =
        '<div class="bg-gunmetal border border-plate rounded-xl p-6 lg:p-8">' +
          '<div class="flex flex-wrap items-center gap-3 mb-4"><span class="font-mono text-xs text-plate">' + esc(j.filename) + '</span>' +
            '<span class="ml-auto inline-flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full border" style="color:' + riskColor(j.risk) + ';border-color:' + riskColor(j.risk) + '55">' + esc(j.risk) + ' RISK</span></div>' +
          '<p class="text-chalk text-lg font-semibold">Analysis complete.</p>' +
          '<p class="text-fog text-sm mb-1">' + esc(summaryLine) + '</p>' +
          (sevChips ? '<p class="mb-5">' + sevChips + '</p>' : '<div class="mb-5"></div>') +
          // Locked findings preview (blurred, no real text)
          '<p class="font-mono text-xs uppercase tracking-widest mb-2" style="color:' + accent + '">// Findings</p>' +
          '<div class="lock-wrap mb-6"><div>' + lockedBars(Math.max(2, (t.issues || 2))) + '</div>' +
            '<div class="lock-veil"><svg class="w-6 h-6" style="color:' + accent + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg><p class="text-chalk text-sm font-semibold">Enter your email to reveal the top findings</p></div></div>' +
          // Email capture + Turnstile
          '<div class="bg-steel border border-plate rounded-lg p-5 mb-6">' +
            '<p class="text-chalk font-semibold text-sm mb-1">Reveal your result</p>' +
            '<p class="text-plate text-xs mb-3">We\'ll show the top genuine findings from your file. The full audit runs in your private build.</p>' +
            '<div class="flex flex-col sm:flex-row gap-3">' +
              '<input id="demo-email" type="email" inputmode="email" autocomplete="email" placeholder="you@company.com" class="flex-1 bg-charcoal border border-plate rounded px-3 py-2.5 text-sm text-chalk" style="outline:none" />' +
              '<button id="demo-unlock-btn" class="' + grad + ' text-white font-semibold px-5 py-2.5 rounded whitespace-nowrap">Reveal the top findings &rarr;</button>' +
            '</div>' +
            '<div id="cf-widget" class="mt-3"></div>' +
            '<p id="demo-form-msg" class="text-red-400 text-xs mt-2"></p>' +
            '<p class="text-plate text-[11px] mt-2">By continuing you agree to be contacted about Marapone. No spam.</p>' +
          '</div>' +
          '<p class="font-mono text-xs uppercase tracking-widest mb-3" style="color:' + accent + '">// In your full private build</p>' +
          '<div class="grid sm:grid-cols-2 gap-3">' + premium + '</div>' +
        '</div>';

      document.getElementById('demo-unlock-btn').addEventListener('click', unlock);
      document.getElementById('demo-email').addEventListener('keydown', function (e) { if (e.key === 'Enter') unlock(); });
      mountTurnstile();
      results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function mountTurnstile(tries) {
      tries = tries || 0;
      var el = document.getElementById('cf-widget');
      if (!el) return;
      if (window.turnstile && window.turnstile.render) {
        try {
          cfWidgetId = window.turnstile.render(el, {
            sitekey: cfg.sitekey, theme: 'dark',
            callback: function (tok) { cfToken = tok; },
            'error-callback': function () { cfToken = ''; },
            'expired-callback': function () { cfToken = ''; }
          });
        } catch (e) {}
      } else if (tries < 40) {
        setTimeout(function () { mountTurnstile(tries + 1); }, 150);
      }
    }
  }

  return { init: init, _helpers: { esc: esc, money: money, riskColor: riskColor } };
})();
