(function () {
  'use strict';

  /* ---------- Header: shrink/blur on scroll ---------- */
  var header = document.getElementById('siteHeader');
  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  function closeNav() {
    if (!navToggle || !primaryNav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('is-open');
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      primaryNav.classList.toggle('is-open', !isOpen);
    });

    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------- Scroll-reveal animations ---------- */
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
    // Fallback: no IntersectionObserver support — just show everything.
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Waitlist form (demo only, no real submission) ---------- */
  var form = document.getElementById('waitlistForm');
  var message = document.getElementById('formMessage');

  if (form && message) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = document.getElementById('email');
      var email = emailInput ? emailInput.value.trim() : '';

      if (!email || !email.includes('@')) {
        message.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein.';
        message.style.color = '#ff7a45';
        return;
      }

      message.textContent = 'Danke! Du stehst auf der Warteliste für NOVA.';
      message.style.color = '';
      form.reset();
    });
  }
})();
