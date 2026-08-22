// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });
}

// Header state on scroll
const header = document.querySelector('.site-header');

function updateHeader() {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Scroll-reveal animations
const revealSelectors = [
  '.section-header', '.card', '.gallery-item', '.intro-visual',
  '.intro-text', '.about-content', '.portrait', '.contact-info',
  'form', '.step', '.price-card', '.stat-band', '.faq-item',
  '.cta-band', '.pill-row'
].join(', ');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(revealSelectors).forEach(el => {
    // Leichter Versatz für Elemente, die nebeneinander stehen
    const siblings = Array.from(el.parentElement.children)
      .filter(s => s.matches('.card, .gallery-item, .step, .price-card'));
    const index = siblings.indexOf(el);
    if (index > 0) {
      el.style.transitionDelay = `${(index % 6) * 70}ms`;
    }
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// Portfolio-Filter (projekte.html) – Kategorie- und Seitenanzahl-Filter kombiniert
const catButtons = document.querySelectorAll('.filter-btn[data-filter]');
const pagesButtons = document.querySelectorAll('.filter-btn[data-filter-pages]');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryEmpty = document.getElementById('galleryEmpty');

if (galleryItems.length && (catButtons.length || pagesButtons.length)) {
  let activeCat = 'all';
  let activePages = 'all';

  const applyFilters = () => {
    let visibleCount = 0;
    galleryItems.forEach(item => {
      const matchCat = activeCat === 'all' || item.dataset.cat === activeCat;
      const matchPages = activePages === 'all' || item.dataset.pages === activePages;
      const match = matchCat && matchPages;
      item.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    if (galleryEmpty) {
      galleryEmpty.classList.toggle('visible', visibleCount === 0);
    }
  };

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.filter;
      applyFilters();
    });
  });

  pagesButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      pagesButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePages = btn.dataset.filterPages;
      applyFilters();
    });
  });
}

// Lightbox: Projekt-Screenshots in Grossansicht
const galleryImages = Array.from(document.querySelectorAll('.gallery-item .thumb img'));

if (galleryImages.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-label', 'Bildansicht');
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Schliessen">&times;</button>
    <button class="lightbox-prev" aria-label="Vorheriges Bild">&#8249;</button>
    <figure>
      <img alt="">
      <figcaption></figcaption>
    </figure>
    <button class="lightbox-next" aria-label="N&auml;chstes Bild">&#8250;</button>
  `;
  document.body.appendChild(lightbox);

  const lbImage = lightbox.querySelector('figure img');
  const lbCaption = lightbox.querySelector('figcaption');
  const btnClose = lightbox.querySelector('.lightbox-close');
  const btnPrev = lightbox.querySelector('.lightbox-prev');
  const btnNext = lightbox.querySelector('.lightbox-next');

  let currentList = [];
  let currentIndex = 0;

  function visibleImages() {
    return galleryImages.filter(img => {
      const item = img.closest('.gallery-item');
      return item && item.style.display !== 'none';
    });
  }

  function renderLightbox() {
    const img = currentList[currentIndex];
    if (!img) return;
    lbImage.src = img.src;
    lbImage.alt = img.alt;
    lbCaption.textContent = img.alt || '';
    const multiple = currentList.length > 1;
    btnPrev.style.display = multiple ? '' : 'none';
    btnNext.style.display = multiple ? '' : 'none';
  }

  function openLightbox(img) {
    currentList = visibleImages();
    currentIndex = Math.max(0, currentList.indexOf(img));
    renderLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function stepLightbox(direction) {
    if (!currentList.length) return;
    currentIndex = (currentIndex + direction + currentList.length) % currentList.length;
    renderLightbox();
  }

  galleryImages.forEach(img => {
    const item = img.closest('.gallery-item');
    if (item) {
      item.addEventListener('click', () => openLightbox(img));
    }
  });

  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(-1); });
  btnNext.addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(1); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  });
}

// Kontaktformular: Versand über EmailJS
const EMAILJS_PUBLIC_KEY = 'w8mdnvATlyjC1hceX';
const EMAILJS_SERVICE_ID = 'service_53siwmn';
const EMAILJS_TEMPLATE_ID = 'template_7uo2ceb';

const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const formSubmitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

if (contactForm && window.emailjs) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

// Paket-Vorauswahl aus der URL übernehmen (z. B. kontakt.html?paket=Business)
if (contactForm) {
  const allowedPakete = ['Starter', 'Business', 'Premium'];
  const raw = new URLSearchParams(window.location.search).get('paket') || '';
  const paket = allowedPakete.find(p => p.toLowerCase() === raw.toLowerCase());
  if (paket) {
    const paketField = document.getElementById('paketField');
    const formPreselect = document.getElementById('formPreselect');
    const messageField = document.getElementById('message');
    if (paketField) paketField.value = paket;
    if (formPreselect) {
      formPreselect.textContent = `✓ Gewähltes Paket: ${paket}`;
      formPreselect.hidden = false;
    }
    if (messageField && !messageField.value) {
      messageField.value = `Hallo, ich interessiere mich für das «${paket}»-Paket. `;
    }
  }
}

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot: unsichtbares Feld, das nur Bots ausfüllen – Formular still verwerfen
    const botcheck = contactForm.querySelector('input[name="botcheck"]');
    if (botcheck && botcheck.checked) {
      contactForm.reset();
      return;
    }

    if (formSubmitBtn) {
      formSubmitBtn.disabled = true;
      formSubmitBtn.textContent = 'Wird gesendet …';
    }

    formNote.classList.remove('visible', 'error');

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm);
      formNote.textContent = 'Danke für deine Anfrage! Ich melde mich schnellstmöglich bei dir zurück.';
      formNote.classList.add('visible');
      contactForm.reset();
    } catch (error) {
      formNote.textContent = 'Ups, das hat leider nicht geklappt. Bitte versuch es in ein paar Minuten nochmal oder schreib mir direkt eine E-Mail.';
      formNote.classList.add('visible', 'error');
    } finally {
      if (formSubmitBtn) {
        formSubmitBtn.disabled = false;
        formSubmitBtn.textContent = 'Anfrage senden';
      }
    }
  });
}
