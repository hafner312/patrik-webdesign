(function () {
  'use strict';

  /* --- Mobile-Menü-Toggle ------------------------------------------------ */

  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Menü schliessen' : 'Menü öffnen');
    });

    // Menü nach Klick auf einen Link schliessen (mobile)
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Menü öffnen');
      });
    });
  }

  /* --- "In den Warenkorb"-Hinweis ---------------------------------------- */

  var cartNote = document.getElementById('cartNote');
  var cartButtons = document.querySelectorAll('.btn-cart');
  var noteTimeout;

  cartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var product = button.getAttribute('data-product') || 'Produkt';

      if (cartNote) {
        cartNote.textContent =
          '"' + product + '" würde hier über ein eingebundenes Shop-Tool (z. B. Shopify oder Ecwid) ' +
          'in den Warenkorb gelegt und bezahlt — in diesem Musterprojekt ist der Bestellvorgang nur angedeutet.';

        clearTimeout(noteTimeout);
        noteTimeout = setTimeout(function () {
          cartNote.textContent = '';
        }, 6000);

        cartNote.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  /* --- Scroll-Reveal für Sektionen ---------------------------------------- */

  var revealTargets = document.querySelectorAll('.product-card, .value-card, .about-text, .location-card, .hours-card');

  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
