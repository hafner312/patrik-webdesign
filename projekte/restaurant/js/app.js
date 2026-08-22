/* =========================================================
   Ristorante Via Verde — Verhalten
   Mobile-Menü + dezente Scroll-Reveal-Animation
   ========================================================= */
(function () {
  'use strict';

  /* ---- Mobile-Menü ---- */
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('main-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Menü schliessen' : 'Menü öffnen');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Menü öffnen');
      });
    });
  }

  /* ---- Scroll-Reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
