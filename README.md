# PixelSeite – Website

Statische Website für **PixelSeite** – ein Angebot rund um das Erstellen, Entwickeln und Deployen moderner Webseiten. Die Seite präsentiert Leistungen, Preispakete, Projekte und stellt Patrik vor. Alle Inhalte sind auf Deutsch.

Design: dunkler, moderner „Tech"-Look mit Indigo-→-Cyan-Verlauf. Aufgebaut nach dem Vorbild der Website `webseite-sandra`, aber mit eigenem Thema, eigenen Farben und eigener Struktur.

> **Status:** Die Seite ist aktuell bewusst von Suchmaschinen ausgeschlossen (`robots.txt` + `<meta name="robots" content="noindex, nofollow">` auf jeder Seite), da sie sich noch im Aufbau befindet und Platzhalter-Inhalte enthält.

## Tech-Stack

- Reines HTML5, CSS3 und Vanilla JavaScript – kein Framework, kein Build-Tool
- Schriften (`Space Grotesk`, `Inter`) werden **lokal** aus `fonts/` geladen (kein externer Request, datenschutzfreundlich)
- Lokaler Dev-Server über [`http-server`](https://www.npmjs.com/package/http-server) (npm), gestartet per VS-Code-Debugkonfiguration

## Lokal ansehen (F5-Workflow)

Diese Vorlage startet die Seite über **Ausführen > Debugging starten** bzw. **F5**. VS Code startet dabei automatisch den lokalen Webserver und öffnet die Seite in einem separaten Chrome-Fenster mit eigenem Debug-Profil (getrennt von deinem normalen Chrome).

**Einmalige Einrichtung:**

1. Den Ordner in VS Code öffnen.
2. Im Terminal `npm install` ausführen.
3. **F5** drücken (bzw. **Ausführen > Debugging starten**).
4. Falls VS Code nach einer Konfiguration fragt: **Webseite in separatem Chrome starten** wählen.

Beenden mit **Umschalt + F5**. Alternativ ohne VS Code direkt im Terminal: `npm start` und dann `http://localhost:5500` öffnen.

## Struktur

```
index.html          Startseite (Hero, Leistungen, Prozess, Projekte, CTA)
leistungen.html      Leistungen, Preise, FAQ
projekte.html        Portfolio mit Filter & Lightbox
ueber-mich.html       Über-mich-Seite
kontakt.html          Kontaktseite mit Formular
impressum.html        Impressum (Vorlage)
datenschutz.html      Datenschutzerklärung (Vorlage)
css/style.css         Zentrales Stylesheet (Farbvariablen, Layout, Komponenten, Responsive)
js/app.js             Navigation, Scroll-Reveal, Portfolio-Filter, Lightbox, Kontaktformular
fonts/               Lokale Schriftdateien (Space Grotesk, Inter, .woff2)
images/logo.svg       Logo (</> -Monogramm im Indigo→Cyan-Verlauf)
package.json          npm-Start-Skript (http-server) + devDependency
.vscode/             Debugkonfiguration (F5 → Chrome) & Server-Task
.github/             copilot-instructions.md (Projekt-Anweisung für die KI)
robots.txt            Sperrt aktuell die gesamte Seite für Suchmaschinen
```

## Port ändern

Der Webserver verwendet Port `5500`. Falls belegt, an zwei Stellen ändern:

- `package.json` bei `-p 5500`
- `.vscode/launch.json` bei `http://localhost:5500`

## Noch anzupassen (Platzhalter)

Erledigt: ✅ Name **PixelSeite** (Domain `pixelseite.ch`) · ✅ E-Mail `hafner312@gmail.com` (Kontakt & Impressum) · ✅ Portrait-Foto · ✅ Kontaktformular via EmailJS · ✅ Impressum-Adresse · ✅ SEO-Freigabe (`robots.txt` + `noindex`-Tags entfernt).

Bevor die Seite live geht, noch offen:

1. **Preise** – die Preise auf `leistungen.html` sind unverbindliche Richtwerte; nach Bedarf anpassen.
2. **Projekte** – in `projekte.html` die Platzhalter-Kacheln (`placeholder-art`) durch echte Screenshots ersetzen (siehe Kommentar in der Datei).
3. **Domain** – `pixelseite.ch` registrieren (z. B. bei Hostpoint/Infomaniak), sobald du live gehen willst.

**Kontaktformular-Details:** Versand über [EmailJS](https://www.emailjs.com) (kostenlos bis 200 E-Mails/Monat). Service-/Template-/Public-Key stehen in `js/app.js` oben (`EMAILJS_*`-Konstanten) – im EmailJS-Dashboard unter „Email Templates" kannst du den Mailtext jederzeit anpassen, ohne Code zu ändern.
