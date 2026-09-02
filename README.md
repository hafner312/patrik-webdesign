# PixelSeite Website

Statische Website fuer **PixelSeite**: Webdesign, Frontend-Entwicklung, Veroeffentlichung und SEO-Grundlagen fuer Selbststaendige, KMU und Vereine.

Die Seite ist live unter:

`https://pixelseite.ch/`

## Aktueller Stand

- Domain `pixelseite.ch` ist registriert.
- Hosting laeuft ueber GitHub Pages.
- HTTPS ist aktiv.
- `CNAME` ist gesetzt.
- `sitemap.xml` listet die 7 oeffentlichen Seiten.
- Die Hauptseiten sind fuer Suchmaschinen freigegeben.
- Musterprojekte unter `projekte/` bleiben bewusst `noindex, nofollow`.
- Google Search Console ist eingerichtet und die Sitemap ist eingereicht.
- Google Unternehmensprofil ist bestaetigt.
- localsearch/local.ch/search.ch/localcities.ch ist eingereicht, Freigabe offen.
- Google Ads ist vorbereitet, aber noch nicht live.

## Tech-Stack

- Reines HTML5, CSS3 und Vanilla JavaScript
- Kein Framework, kein Build-Schritt
- Lokaler Dev-Server ueber `http-server`
- Lokale Fonts aus `fonts/`
- Kontaktformular ueber EmailJS

## Starten

Einmalig:

```bash
npm install
```

Lokal starten:

```bash
npm start
```

Danach im Browser:

`http://localhost:5500`

In VS Code kann die Seite auch per F5 gestartet werden.

## Struktur

```text
index.html          Startseite
leistungen.html     Leistungen, Preise, FAQ
projekte.html       Portfolio mit Filter und Lightbox
ueber-mich.html     Ueber-mich-Seite
kontakt.html        Kontaktseite mit EmailJS-Formular
impressum.html      Impressum
datenschutz.html    Datenschutzerklaerung
css/style.css       Zentrales Stylesheet
js/app.js           Navigation, Animationen, Filter, Formular
fonts/              Lokale Schriften
images/             Logo, Portrait, OG-Bild, Ads-Bild
projekte/           Musterprojekte, bewusst noindex
print/              Druckmaterial
intern/             Interne Notizen, nicht oeffentlich verlinkt
```

## Datenschutz

Aktuell verwendet die Website keine Analytics-, Google-Tag-Manager-, Meta-Pixel- oder Retargeting-Tags. Die Fonts werden lokal geladen.

Die Kontaktseite nutzt EmailJS. EmailJS ist in der Datenschutzerklaerung genannt.

Vor Google Ads Conversion Tracking, Analytics, Retargeting oder UTM-Uebermittlung im Formular muss zuerst geklaert werden:

- Datenschutzerklaerung aktualisieren
- notwendige Daten minimieren
- Einwilligung/Consent-Banner pruefen
- keine Tags vor erforderlicher Zustimmung laden

## Marketing-Status

Interne Notizen stehen in:

`intern/marketing-status.md`

Wichtige naechste Schritte:

- Sandra wegen Testimonial und Rueckverweis von `diamoon-art.ch` fragen
- localsearch-Freigabe pruefen
- echte Social-Links erst einbauen, wenn Profile vorhanden sind
- Google Ads erst nach Trust-Beweis und Consent-Klaerung starten
- Conversion-Tracking im EmailJS-Erfolgszweig von `js/app.js` umsetzen, falls Ads live gehen

## Arbeitsregel fuer Codex

Wenn Codex Dateien in diesem Repo aendert, sollen die Aenderungen danach committed und gepusht werden, sofern der User nichts anderes sagt.

## Hinweise

- Keine externen Font-CDNs einbauen.
- Keine Musterprojekt-Seiten indexieren lassen.
- Neue oeffentliche Seiten brauchen Canonical, Open Graph/Twitter-Tags und einen Sitemap-Eintrag.
- Keine Trackingdienste ohne vorherige Datenschutzpruefung einbauen.