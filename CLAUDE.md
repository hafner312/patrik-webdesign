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
webdesign-zentralschweiz.html  Regional SEO landing page for German-speaking Zentralschweiz
webdesign-uri.html             Local supporting page for Webdesign Uri / Altdorf
projekte.html       Portfolio with filter & lightbox
ueber-mich.html     About
kontakt.html        Contact page with form
impressum.html      Imprint (template)
datenschutz.html    Privacy policy (template)
css/style.css       Single stylesheet: color variables, layout, components, responsive
js/app.js           Navigation, scroll reveal, portfolio filter, lightbox, contact form
fonts/              Local .woff2 files (Space Grotesk, Inter)
images/             Logo, portrait, social preview image
projekte/           The 8 sample projects, each a self-contained mini site
print/              Business card artwork + the OG image source (not part of the site)
intern/             Business-process notes for the owner (not part of the site)
CNAME               Custom domain for GitHub Pages
sitemap.xml         Lists the 9 public pages (sample projects deliberately excluded)
```

All styling lives in **one** stylesheet and all behaviour in **one** script — when adding a
feature, extend `css/style.css` / `js/app.js` rather than introducing per-page files.

## Conventions

- **Fonts are loaded locally** from `fonts/`, deliberately avoiding external requests for privacy
  reasons. Do not replace them with a Google Fonts CDN link.
- The site is **live and publicly indexed** at <https://pixelseite.ch> (GitHub Pages, custom domain
  via `CNAME`; DNS at hosttech, HTTPS enforced). A new public page needs a `<link rel="canonical">`,
  the Open Graph / Twitter block, and an entry in `sitemap.xml` — copy the head of an existing page.
- The **sample projects under `projekte/` stay out of the index**: each of their pages carries
  `<meta name="robots" content="noindex, nofollow">`. They portray invented businesses with made-up
  addresses, so they must never surface as real companies in search results. Keep that tag on every
  new sample-project page, and do not block `/projekte/` in `robots.txt` — crawlers have to read the
  page to see the noindex.
- Content is German throughout — new copy should match.
- PixelSeite does not offer physical customer contact or on-site meetings. Public copy should frame collaboration as remote-only via email or video call.
- PixelSeite also serves private individuals without a company. Pricing copy should keep the three package anchors, but frame them as guideline prices with project-specific assessment rather than open-ended haggling.
- `.chrome-debug-profile/` is a generated Chrome profile for the F5 debug workflow. Ignore it; never
  edit or commit its contents.
- `.github/copilot-instructions.md` holds the template's own editor guidance — worth a look before
  restructuring the project.

## Working efficiently (keep token usage down)

This project involves a lot of external, non-code work (DNS at hosttech, GitHub Pages, Google
Search Console, Google Business Profile, ImprovMX, directory listings) driven by the user pasting
screenshots. That back-and-forth is what actually burns tokens in this repo, not the codebase
itself. A few habits that keep it cheap without losing rigor:

- **Verify once, not after every sub-step.** After a multi-field change (e.g. several DNS records),
  check propagation once at the end — not after each individual field. Only re-check something that
  was already confirmed working if there's a concrete reason to doubt it.
- **Batch independent checks into one Bash call** (e.g. one script that runs several `nslookup`/`curl`
  checks and prints a short summary) instead of one tool call per check.
- **Don't take a full-page screenshot for a small visual tweak.** Crop to the relevant region, or
  reason about the change from the diff when a render check isn't essential.
- **For guided UI walkthroughs (third-party dashboards, DNS panels), give the next few unambiguous
  steps together** rather than one field per turn — reserve single-step, wait-for-screenshot pacing
  for points that are genuinely ambiguous or risky (e.g. anything that exposes a home address, costs
  money, or is hard to reverse).
- **Keep verification output short.** Print a one-line pass/fail per check, not raw command dumps,
  unless something actually failed and the detail is needed to debug it.

## Codex commit rule

When Codex changes files in this repo, commit and push those changes after verification unless the user explicitly says otherwise.
