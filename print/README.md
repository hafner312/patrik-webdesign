# Visitenkarte — Druckdaten

Vorlage für Vistaprint, Standardformat **85 × 55 mm**, Ecken quadratisch.

## Dateien

| Datei | Zweck |
|---|---|
| `visitenkarte-vorne.png` | Vorderseite — Logo, Schriftzug, Claim |
| `visitenkarte-hinten.png` | Rückseite — Name, Kontakt, freie Fläche für den QR-Code |
| `visitenkarte-vorne.html` / `-hinten.html` | Quelldateien zum Anpassen |

## Masse

```
Endformat (Trim)        85 × 55 mm    1004 × 650 px
+ 2 mm Beschnitt        89 × 59 mm    1051 × 697 px   <- Grösse der PNG-Dateien
Sicherheitsabstand      3 mm ab Trim  = 5 mm ab Bildrand
```

Alle Texte und das Logo liegen innerhalb der Sicherheitszone. Der Hintergrund läuft
bewusst bis an den Rand (randabfallend), damit beim Schneiden kein weisser Rand entsteht.
Auflösung: **300 dpi**.

## QR-Code

Die rechte Fläche der Rückseite (ca. 21 × 49 mm) ist absichtlich leer. Der QR-Code wird
im Vistaprint-Editor eingefügt und dort automatisch mit der Ziel-URL verknüpft.

## Änderungen

Texte in den HTML-Dateien anpassen, dann neu rendern:

```bash
npx http-server -p 5550 -s
npx playwright screenshot --viewport-size=1051,697 --wait-for-timeout=1500 \
  "http://localhost:5550/print/visitenkarte-vorne.html" print/visitenkarte-vorne.png
```

(für die Rückseite analog mit `-hinten`)
