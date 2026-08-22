(function () {
  'use strict';

  /* ---------- Mobile navigation toggle ---------- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Menü schliessen' : 'Menü öffnen');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Menü öffnen');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
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
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Product "buy" buttons — design demo only ---------- */
  var buyButtons = document.querySelectorAll('.btn-buy');
  buyButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.product-card');
      var hint = card ? card.querySelector('.product-hint') : null;
      if (hint) {
        hint.classList.add('is-active');
        window.setTimeout(function () {
          hint.classList.remove('is-active');
        }, 2200);
      }
    });
  });

  /* ---------- Newsletter form — UI only, not functional ---------- */
  var form = document.getElementById('newsletter-form');
  var note = document.getElementById('newsletter-note');

  if (form && note) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      note.textContent = 'Danke! (Demo — dieses Formular ist nicht aktiv.)';
      form.reset();
    });
  }
})();
