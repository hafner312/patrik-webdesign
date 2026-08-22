# CLAUDE.md — PixelSeite (Website)

## Overview

Static marketing website for "PixelSeite" — services, pricing packages, portfolio and an
about page, all in German. Plain HTML5 / CSS3 / vanilla JavaScript: **no framework and no build
step**. The only tooling is `http-server` as a local dev server. Visual identity is a dark "tech"
look with an indigo→cyan gradient; the structure was derived from the `webseite-sandra` site but
uses its own theme, colors and content.

## Commands

```bash
npm install     # once — installs http-server
npm start       # serves the folder at http://localhost:5500
```

In VS Code, **F5** ("Webseite in separatem Chrome starten") runs the same server and opens Chrome
with an isolated debug profile; stop with Shift+F5.

There is no build, no bundler, no test suite. Edited files are live on reload.

## Structure

```
index.html          Home (hero, services, process, projects, CTA)
leistungen.html     Services, pricing, FAQ
projekte.html       Portfolio with filter & lightbox
ueber-mich.html     About
kontakt.html        Contact page with form
impressum.html      Imprint (template)
datenschutz.html    Privacy policy (template)
css/style.css       Single stylesheet: color variables, layout, components, responsive
js/app.js           Navigation, scroll reveal, portfolio filter, lightbox, contact form
fonts/              Local .woff2 files (Space Grotesk, Inter)
images/
```

All styling lives in **one** stylesheet and all behaviour in **one** script — when adding a
feature, extend `css/style.css` / `js/app.js` rather than introducing per-page files.

## Conventions

- **Fonts are loaded locally** from `fonts/`, deliberately avoiding external requests for privacy
  reasons. Do not replace them with a Google Fonts CDN link.
- The site is intentionally **excluded from search engines** while under construction:
  `robots.txt` plus `<meta name="robots" content="noindex, nofollow">` on every page. Keep both in
  sync when adding a new page, and only remove them when the site actually goes live.
- Content is German throughout — new copy should match.
- `.chrome-debug-profile/` is a generated Chrome profile for the F5 debug workflow. Ignore it; never
  edit or commit its contents.
- `.github/copilot-instructions.md` holds the template's own editor guidance — worth a look before
  restructuring the project.
