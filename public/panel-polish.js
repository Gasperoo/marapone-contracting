/* Panel-inspired polish kit — shared behaviour across all construction + logistics pages.
   Theme accent (--pnl) is set pre-paint by an inline head snippet; this file adds the
   progressive-enhancement behaviour. Everything is guarded so one failure can't break a page. */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  /* ---------- 1. scroll reveal ---------- */
  function initReveals() {
    try {
      if (!('IntersectionObserver' in window) || reduce) {
        [].slice.call(document.querySelectorAll('.pnl-reveal')).forEach(function (el) { el.classList.add('pnl-vis'); });
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('pnl-vis'); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      // a) authored bespoke reveals (hero wipes, custom blocks) — observe on every page
      [].slice.call(document.querySelectorAll('.pnl-reveal')).forEach(function (el) { io.observe(el); });
      // b) on pages with no existing .reveal system, reveal off-screen sections + cascade their grid children
      if (!document.querySelector('.reveal')) {
        var vh = window.innerHeight || 800;
        [].slice.call(document.querySelectorAll('section')).filter(function (s) { return !s.parentElement.closest('section'); })
          .forEach(function (s, idx) {
            if (idx === 0) return;                                 // never hide the hero
            if (s.classList.contains('pnl-reveal')) return;        // already handled
            if (s.getBoundingClientRect().top < vh * 0.9) return;  // already on screen -> no flash
            s.classList.add('pnl-reveal'); io.observe(s);
            // stagger grid children for a nicer cascade
            [].slice.call(s.querySelectorAll('.grid')).forEach(function (g) {
              if (g.closest('.grid') !== g) { /* allow */ }
              var kids = [].slice.call(g.children);
              if (kids.length >= 2 && kids.length <= 16) {
                kids.forEach(function (k, i) {
                  if (k.querySelector('section')) return;
                  k.classList.add('pnl-cascade'); k.style.transitionDelay = (i * 55) + 'ms';
                });
              }
            });
          });
      }
    } catch (e) { }
  }

  /* ---------- add .in on scroll (timeline line-draw + section top-line) ---------- */
  function initInview() {
    try {
      var els = [].slice.call(document.querySelectorAll('.pnl-tl, .pnl-section'));
      if (!els.length) return;
      if (!('IntersectionObserver' in window) || reduce) { els.forEach(function (t) { t.classList.add('in'); }); return; }
      var io = new IntersectionObserver(function (en, o) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } }); }, { threshold: 0.2 });
      els.forEach(function (t) { io.observe(t); });
    } catch (e) { }
  }

  /* ---------- word-by-word headline reveal ---------- */
  function splitWords(el) {
    var d = { n: 0 };
    (function walk(node) {
      [].slice.call(node.childNodes).forEach(function (ch) {
        if (ch.nodeType === 3) {
          var parts = ch.textContent.split(/(\s+)/), frag = document.createDocumentFragment();
          parts.forEach(function (w) {
            if (w === '' ) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
            var s = document.createElement('span'); s.className = 'w'; s.textContent = w;
            s.style.transitionDelay = (d.n * 0.05) + 's'; d.n++;
            frag.appendChild(s);
          });
          node.replaceChild(frag, ch);
        } else if (ch.nodeType === 1 && ch.tagName !== 'BR') { walk(ch); }
      });
    })(el);
  }
  function initWords() {
    try {
      var els = [].slice.call(document.querySelectorAll('.pnl-words'));
      if (!els.length) return;
      els.forEach(splitWords);
      if (!('IntersectionObserver' in window) || reduce) { els.forEach(function (e) { e.classList.add('in'); }); return; }
      var io = new IntersectionObserver(function (en, o) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } }); }, { threshold: 0.3 });
      els.forEach(function (e) { io.observe(e); });
    } catch (e) { }
  }

  /* ---------- blueprint SVG draws itself in ---------- */
  function initDraw() {
    try {
      if (reduce) return;
      var els = [].slice.call(document.querySelectorAll('.hero-section svg path, .hero-section svg circle, .hero-section svg line'));
      if (!els.length) return;
      var pending = [];
      els.forEach(function (el) {
        if (el.getAttribute('stroke-dasharray')) return;          // skip intentionally-dashed strokes
        if (el.closest('a, button')) return;                      // skip CTA icons
        var svg = el.closest('svg'); if (!svg || svg.getBoundingClientRect().width < 48) return; // decorative (large) only
        var len; try { len = el.getTotalLength(); } catch (e) { return; }
        if (!len || len > 4000) return;
        el.style.strokeDasharray = len; el.style.strokeDashoffset = len;
        el.classList.add('pnl-draw'); pending.push(el);
      });
      if (!pending.length) return;
      function go() { pending.forEach(function (el, i) { el.style.transitionDelay = (i * 0.12) + 's'; el.classList.add('in'); }); }
      var host = pending[0].closest('svg') || pending[0];
      if ('IntersectionObserver' in window) { new IntersectionObserver(function (en, o) { en.forEach(function (e) { if (e.isIntersecting) { go(); o.disconnect(); } }); }, { threshold: 0.1 }).observe(host); }
      else go();
    } catch (e) { }
  }

  /* ---------- sliding underline on footer links ---------- */
  function initLinkUl() {
    try {
      [].slice.call(document.querySelectorAll('footer a')).forEach(function (a) {
        if (a.querySelector('*')) return;                         // text links only
        if (!a.textContent.trim()) return;
        a.classList.add('pnl-ul');
      });
    } catch (e) { }
  }

  /* ---------- scroll-progress bar ---------- */
  function initProgress() {
    try {
      var bar = document.getElementById('nav-progress');
      if (!bar) { bar = document.createElement('div'); bar.className = 'pnl-progress'; bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar); }
      var ticking = false;
      function upd() { var h = document.documentElement; var max = (h.scrollHeight - h.clientHeight) || 1; var p = (window.pageYOffset || h.scrollTop) / max; bar.style.width = Math.max(0, Math.min(1, p)) * 100 + '%'; ticking = false; }
      window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(upd); ticking = true; } }, { passive: true });
      window.addEventListener('resize', upd, { passive: true }); upd();
    } catch (e) { }
  }

  /* ---------- magnetic hover on role cards ---------- */
  function initMagnetic() {
    try {
      if (reduce || (window.matchMedia && window.matchMedia('(hover: none)').matches)) return;
      [].slice.call(document.querySelectorAll('.role-card')).forEach(function (el) {
        el.classList.add('pnl-mag');
        el.addEventListener('pointermove', function (e) {
          var r = this.getBoundingClientRect();
          var x = (e.clientX - r.left - r.width / 2) / r.width, y = (e.clientY - r.top - r.height / 2) / r.height;
          this.style.transform = 'translate(' + (x * 8).toFixed(1) + 'px,' + (y * 8).toFixed(1) + 'px)';
        });
        el.addEventListener('pointerleave', function () { this.style.transform = ''; });
      });
    } catch (e) { }
  }

  /* ---------- auto count-up on display-font stat numbers ---------- */
  function initAutoCount() {
    try {
      if (!('IntersectionObserver' in window)) return;
      var re = /^(\D{0,3})(\d[\d,]*)(\D{0,4})$/;
      function run(el) {
        var target = parseInt(el.getAttribute('data-target'), 10), pre = el.getAttribute('data-pre') || '', suf = el.getAttribute('data-suf') || '';
        var t0 = null, dur = 1200;
        requestAnimationFrame(function step(ts) { if (!t0) t0 = ts; var p = Math.min((ts - t0) / dur, 1); var e = 1 - Math.pow(1 - p, 3); el.textContent = pre + Math.round(target * e).toLocaleString() + suf; if (p < 1) requestAnimationFrame(step); });
      }
      var io = new IntersectionObserver(function (en, o) { en.forEach(function (e) { if (e.isIntersecting) { run(e.target); o.unobserve(e.target); } }); }, { threshold: 0.5 });
      [].slice.call(document.querySelectorAll('.font-display')).forEach(function (el) {
        if (el.closest('nav,header,footer')) return;
        var tn = el.tagName; if (tn === 'H1' || tn === 'H2' || tn === 'H3') return;
        if (el.querySelector('*')) return;                       // leaf text only
        if (el.closest('.pnl-stat') || el.hasAttribute('data-count')) return;
        var t = el.textContent.trim(); if (t.length > 12) return;
        var m = t.match(re); if (!m) return;
        var val = parseInt(m[2].replace(/,/g, ''), 10);
        if (isNaN(val) || val < 5) return;
        if (val >= 1990 && val <= 2099) return;                  // skip likely years
        el.setAttribute('data-pre', m[1]); el.setAttribute('data-suf', m[3]); el.setAttribute('data-target', String(val));
        if (reduce) return;
        el.textContent = m[1] + '0' + m[3];
        io.observe(el);
      });
    } catch (e) { }
  }

  /* ---------- tag primary accent CTAs for hover shine ---------- */
  function initCta() {
    try {
      var sel = '.hiviz-gradient,[class*="hiviz-gradient"],a[style*="linear-gradient"],button[style*="linear-gradient"]';
      [].slice.call(document.querySelectorAll(sel)).forEach(function (el) {
        if (el.closest('nav,header')) return;
        var tag = el.tagName.toLowerCase();
        if (tag !== 'a' && tag !== 'button') return;
        if (el.clientHeight > 90) return;
        el.classList.add('pnl-cta');
      });
    } catch (e) { }
  }

  /* ---------- subtle parallax on decorative glows ---------- */
  function initParallax() {
    try {
      var els = [].slice.call(document.querySelectorAll('.hero-glow, .gn-glow, .hero-video-glow'));
      if (!els.length || reduce) return;
      var ticking = false;
      function upd() { var y = window.pageYOffset || 0; els.forEach(function (el) { el.style.transform = 'translate3d(0,' + (y * 0.08) + 'px,0)'; }); ticking = false; }
      window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(upd); ticking = true; } }, { passive: true });
      upd();
    } catch (e) { }
  }

  /* ---------- 2. card hover-lift ---------- */
  function initLifts() {
    try {
      var sel = '.service-card,.role-card,.gn-card,.pnl-num,[class*="rounded-xl"][class*="border"],[class*="rounded-2xl"][class*="border"],[class*="rounded-lg"][class*="border-plate"]';
      [].slice.call(document.querySelectorAll(sel)).forEach(function (el) {
        if (el.closest('nav,header,footer')) return;
        if (el.querySelector('section')) return;                 // skip large layout containers
        if (el.clientHeight > 640) return;
        el.classList.add('pnl-lift', 'pnl-spot');
        el.addEventListener('pointermove', function (e) {
          var r = this.getBoundingClientRect();
          this.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
          this.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
        });
      });
    } catch (e) { }
  }

  /* ---------- animated count-up stats ---------- */
  function initStats() {
    try {
      var els = [].slice.call(document.querySelectorAll('[data-count]'));
      if (!els.length || !('IntersectionObserver' in window)) {
        els.forEach(function (el) { el.textContent = Number(parseFloat(el.getAttribute('data-count')) || 0).toLocaleString(); });
        return;
      }
      function fmt(v, dec) { return Number(v.toFixed(dec)).toLocaleString(); }
      function run(el) {
        var target = parseFloat(el.getAttribute('data-count')) || 0;
        var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
        if (reduce) { el.textContent = fmt(target, dec); return; }
        var t0 = null, dur = 1200;
        requestAnimationFrame(function step(ts) {
          if (!t0) t0 = ts; var p = Math.min((ts - t0) / dur, 1); var e = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(target * e, dec);
          if (p < 1) requestAnimationFrame(step);
        });
      }
      var io = new IntersectionObserver(function (en, o) { en.forEach(function (e) { if (e.isIntersecting) { run(e.target); o.unobserve(e.target); } }); }, { threshold: 0.4 });
      els.forEach(function (el) { io.observe(el); });
    } catch (e) { }
  }

  /* ---------- 3. agent terminals (bespoke sections marked data-pnl-auto) ---------- */
  function initTerminals() {
    [].slice.call(document.querySelectorAll('.pnl-term[data-pnl-auto]')).forEach(function (term) {
      if (term.getAttribute('data-pnl-init')) return;
      term.setAttribute('data-pnl-init', '1');
      try {
        var typeEl = term.querySelector('.pnl-type');
        var caret = term.querySelector('.pnl-caret');
        var steps = [].slice.call(term.querySelectorAll('.pnl-step-line'));
        var full = typeEl ? (typeEl.getAttribute('data-text') || '') : '';
        var played = false;
        function runSteps(i) {
          if (i >= steps.length) return;
          var s = steps[i]; s.classList.add('on');
          var ic = s.querySelector('.ic'); if (ic) { ic.textContent = '●'; }
          setTimeout(function () { s.classList.add('done'); if (ic) ic.textContent = '✓'; runSteps(i + 1); }, parseInt(s.getAttribute('data-run'), 10) || 800);
        }
        function play() {
          if (played) return; played = true;
          if (reduce) { if (typeEl) typeEl.textContent = full; if (caret) caret.style.display = 'none'; steps.forEach(function (s) { s.classList.add('on', 'done'); var ic = s.querySelector('.ic'); if (ic) ic.textContent = '✓'; }); return; }
          var i = 0;
          (function tick() {
            if (typeEl && i <= full.length) { typeEl.textContent = full.slice(0, i); i++; setTimeout(tick, 22); }
            else { setTimeout(function () { if (caret) caret.style.display = 'none'; runSteps(0); }, 350); }
          })();
        }
        if ('IntersectionObserver' in window) {
          new IntersectionObserver(function (en, o) { en.forEach(function (e) { if (e.isIntersecting) { play(); o.disconnect(); } }); }, { threshold: 0.35 }).observe(term);
        } else { play(); }
      } catch (e) { }
    });
  }

  /* ---------- 4. tabbed video steppers (bespoke sections marked data-pnl-auto) ---------- */
  function initSteppers() {
    [].slice.call(document.querySelectorAll('.pnl-stepper[data-pnl-auto]')).forEach(function (step) {
      if (step.getAttribute('data-pnl-init')) return;
      step.setAttribute('data-pnl-init', '1');
      try {
        var tabs = [].slice.call(step.querySelectorAll('.pnl-tab'));
        var vids = [].slice.call(step.querySelectorAll('.pnl-screen video'));
        var txs = [].slice.call(step.querySelectorAll('.pnl-slide-tx'));
        var cur = step.querySelector('.pnl-cur');
        var bar = step.querySelector('.pnl-prog i');
        var n = tabs.length, active = 0, DUR = 6000, t0 = 0, raf = null, inView = false;
        if (!n) return;
        function paint(ts) {
          if (!t0) t0 = ts; var p = Math.min((ts - t0) / DUR, 1);
          if (bar) bar.style.width = (p * 100) + '%';
          if (p >= 1) { go((active + 1) % n, true); } else { raf = requestAnimationFrame(paint); }
        }
        function loop() { cancelAnimationFrame(raf); t0 = 0; if (inView && !reduce) raf = requestAnimationFrame(paint); }
        function go(i) {
          active = i;
          tabs.forEach(function (t, k) { t.classList.toggle('active', k === i); });
          txs.forEach(function (t, k) { t.classList.toggle('active', k === i); });
          vids.forEach(function (v, k) {
            var on = k === i; v.classList.toggle('active', on);
            if (on) { if (v.preload === 'none') { v.preload = 'auto'; v.load(); } var pr = v.play(); if (pr && pr.catch) pr.catch(function () { }); }
            else { v.pause(); }
          });
          if (cur) cur.textContent = '0' + (i + 1);
          loop();
        }
        tabs.forEach(function (t) { t.addEventListener('click', function () { go(parseInt(t.getAttribute('data-i'), 10) || 0); }); });
        if ('IntersectionObserver' in window) {
          new IntersectionObserver(function (en) { en.forEach(function (e) { inView = e.isIntersecting; if (inView) loop(); else cancelAnimationFrame(raf); }); }, { threshold: 0.3 }).observe(step);
        } else { inView = true; loop(); }
      } catch (e) { }
    });
  }

  ready(function () { initReveals(); initLifts(); initTerminals(); initSteppers(); initStats(); initInview(); initParallax(); initWords(); initCta(); initProgress(); initMagnetic(); initAutoCount(); initDraw(); initLinkUl(); });
})();
