/* Marapone price display in the reader's own currency.
   ──────────────────────────────────────────────────────────────────────────────
   This replaces a copy of the same idea that lived inline in
   /construction/pricing only, and fixes the thing that made that copy risky:
   it converted $990 into "$723 USD" and then said nothing about what the card
   would actually be charged. A US reader could reasonably have believed USD 723
   was the price, and been surprised by a CAD charge and their bank's FX fee.

   The rule here: converted figures are always marked approximate, and the
   billing currency is always stated next to them. We sell in CAD. Everything
   else on the page is a courtesy conversion so a reader in Chicago or Berlin
   does not have to open a converter to find out whether this is a $700 or a
   $7,000 decision.

   Markup it drives (all optional, all already on the pricing pages):
     <span data-price-cad="990">$990</span>          the figure itself
     <span data-curr-suffix></span>                  "CAD · one time · tax at checkout"
     <span data-curr-period="month|year"></span>     the same, per period
     <button class="curr-btn" data-curr="USD">       manual override
     <span data-curr-note></span>                    the billing-currency footnote

   Tax is deliberately NOT stated as a rate anywhere here. It is worked out by
   Stripe from the buyer's address at checkout, so the only honest thing the
   page can say before then is that it gets calculated.
*/
(function () {
  'use strict';

  /* Indicative mid-market rates against CAD, entered by hand. They only ever
     drive a "≈" figure, never a charge, so drift costs a reader nothing beyond a
     slightly stale estimate — but STALE_AFTER_DAYS makes the drift visible
     rather than silent: past that, conversion switches itself off and everyone
     sees plain CAD instead of a number nobody has checked in a year. */
  var RATES_SET_ON = '2026-08-08';
  var STALE_AFTER_DAYS = 365;
  var RATES = { CAD: 1, USD: 0.73, EUR: 0.68, GBP: 0.58 };
  var SYMBOL = { CAD: '$', USD: 'US$', EUR: '€', GBP: '£' };
  var LOGISTICS_ACCENT = '#52b788';

  function ratesAreStale() {
    var age = (Date.now() - Date.parse(RATES_SET_ON)) / 864e5;
    return !(age >= 0) || age > STALE_AFTER_DAYS;
  }

  /* Which currency to *offer*. Read from the browser's region, not from an IP
     lookup — no third-party request, nothing to consent to, and a reader who
     disagrees has the toggle. Anything we have no rate for stays CAD. */
  var EUROZONE = ('AT BE HR CY EE FI FR DE GR IE IT LV LT LU MT NL PT SK SI ES')
    .split(' ');

  function regionOf(tag) {
    try {
      if (window.Intl && Intl.Locale) return new Intl.Locale(tag).region || '';
    } catch (_) { /* fall through to the string form below */ }
    var m = /[-_]([A-Za-z]{2})\b/.exec(tag || '');
    return m ? m[1].toUpperCase() : '';
  }

  function detect() {
    var tags = (navigator.languages && navigator.languages.length)
      ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < tags.length; i++) {
      var r = regionOf(tags[i]);
      if (!r) continue;
      if (r === 'CA') return 'CAD';
      if (r === 'US') return 'USD';
      if (r === 'GB') return 'GBP';
      if (EUROZONE.indexOf(r) !== -1) return 'EUR';
    }
    return 'CAD';
  }

  /* The suffix carries the whole disclosure, so it is built rather than looked
     up: for CAD there is nothing to disclose, and for everything else the
     billing currency has to appear in the same breath as the converted number. */
  function suffix(c, period) {
    var unit = period === 'month' ? ' / month' : period === 'year' ? ' / year' : ' · one time';
    if (c === 'CAD') return 'CAD' + unit + ' · tax at checkout';
    return '≈ ' + c + unit + ' · billed in CAD · tax at checkout';
  }

  function money(cad, c) {
    var v = Math.round(cad * RATES[c]);
    return (c === 'CAD' ? '' : '≈ ') + SYMBOL[c] + v.toLocaleString('en-CA');
  }

  function apply(c) {
    if (!RATES[c] || ratesAreStale()) c = 'CAD';

    document.querySelectorAll('[data-price-cad]').forEach(function (el) {
      var cad = parseFloat(el.getAttribute('data-price-cad'));
      if (!isFinite(cad)) return;
      // Keep the authored CAD text so switching back is exact rather than
      // reconstructed from a rounded conversion.
      if (!el.hasAttribute('data-price-original')) {
        el.setAttribute('data-price-original', el.textContent);
      }
      el.textContent = c === 'CAD' ? el.getAttribute('data-price-original') : money(cad, c);
    });

    document.querySelectorAll('[data-curr-suffix]').forEach(function (el) {
      el.textContent = suffix(c, null);
    });
    document.querySelectorAll('[data-curr-period]').forEach(function (el) {
      el.textContent = suffix(c, el.getAttribute('data-curr-period'));
    });
    document.querySelectorAll('[data-curr-note]').forEach(function (el) {
      el.textContent = c === 'CAD'
        ? 'Prices in Canadian dollars. Tax is calculated for your region at checkout.'
        : 'Converted from Canadian dollars at an indicative rate, for comparison only. '
          + 'You are charged in CAD, and your bank sets the rate on the day. '
          + 'Tax is calculated for your region at checkout.';
    });

    // Construction styles the active button with Tailwind classes; logistics
    // uses its own green and has no such classes compiled, so it is painted
    // inline. Same toggle, two brands — hence both paths rather than one.
    var green = location.pathname.indexOf('/logistics') === 0;
    document.querySelectorAll('.curr-btn').forEach(function (b) {
      var on = b.getAttribute('data-curr') === c;
      b.setAttribute('aria-pressed', String(on));
      if (green) {
        b.style.color = on ? LOGISTICS_ACCENT : '';
        b.style.borderColor = on ? LOGISTICS_ACCENT : '';
        b.style.background = on ? 'rgba(82,183,136,0.1)' : '';
        b.classList.toggle('border-plate', !on);
        b.classList.toggle('text-fog', !on);
      } else if (on) {
        b.classList.remove('border-plate', 'text-fog');
        b.classList.add('border-hiviz', 'text-hiviz', 'bg-hiviz/10');
      } else {
        b.classList.remove('border-hiviz', 'text-hiviz', 'bg-hiviz/10');
        b.classList.add('border-plate', 'text-fog');
      }
    });

    try { localStorage.setItem('mp_currency', c); } catch (_) { }
  }

  function start() {
    document.querySelectorAll('.curr-btn').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-curr')); });
    });

    // An explicit past choice wins over detection; detection only guesses for
    // someone who has never chosen.
    var saved = null;
    try { saved = localStorage.getItem('mp_currency'); } catch (_) { }
    apply(saved && RATES[saved] ? saved : detect());
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
