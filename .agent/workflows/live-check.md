---
description: Führt einen automatisierten Test der Live-Version über den Browser aus
---

# Live-Version Check Workflow

Führe alle Schritte der Reihe nach aus.

## 1. Initiale Browser-Verbindung

Starte einen Browser-Subagenten (`browser_subagent`), um die Live-URL aufzurufen und einen vollständigen Test-Durchlauf zu starten. 

**Vorbereitung:**
Bereite den Subagenten mit folgenden Aufgaben vor:
1.  Navigiere zur Live-URL des Fixture Builders (z.B. `https://fixture-builder-bws.vercel.app/`).

## 2. Navigation & Rendering prüfen

Der Browser-Subagent soll folgende Basis-Punkte prüfen:
-   **Editor**: Lädt die Startseite mit dem Fixture-Formular?
-   **Navigation**: Funktionieren die Schritte (Tabs/Buttons) oben?
-   **Komponenten**: Sind die UI-Elemente (Buttons, Checkboxen) sichtbar und im korrekten Theme (Dark Mode)?


## 3. Fehler-Identifikation

Der Agent soll explizit nach folgenden Dingen auf der Live-Seite Ausschau halten:
-   404 oder 500 Fehlerseiten ("Uncaught Application Error" oder Next.js Error Boundaries).
-   "Hydration Mismatches" (falls die Seite nach dem Laden kurz springt oder zuckt).
-   Unendliche Ladeanzeigen (Skeleton-Loader oder Spinner, die sich nach 10 Sekunden nicht auflösen).

## 4. Spezifische Tests (Optional)

Wenn der User bestimmte neue Features getestet haben möchte (z.B. "Prüfe ob der neue Button da ist" oder "Prüfe das 6-stellige PIN-Feld"), instruiere den Subagenten `browser_subagent` **gezielt** auf diese Seite zu navigieren und zu interagieren.

## 5. Bericht auswerten

Schreibe dem User nach Abschluss des Browser-Tests eine kurze, verständliche Zusammenfassung:
- Hat der Login auf der Live-Umgebung funktioniert?
- Waren die wichtigen Tabellen und Navigationsansichten sichtbar?
- Wurden Fehler gefunden?
