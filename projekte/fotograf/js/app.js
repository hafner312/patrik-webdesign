(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */

  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Menü schliessen' : 'Menü öffnen');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Menü öffnen');
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Gallery filter ---------- */

  var filterButtons = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      var filter = btn.getAttribute('data-filter');

      galleryItems.forEach(function (item) {
        var category = item.getAttribute('data-category');
        var show = filter === 'all' || filter === category;
        item.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------- Contact form (demo only, no backend) ---------- */

  var form = document.getElementById('contact-form');
  var note = document.getElementById('form-note');

  if (form && note) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      note.textContent = 'Danke für Ihre Nachricht! Dies ist ein Musterprojekt — es wird keine echte Nachricht versendet.';
    });
  }
})();
