---
description: Führt einen automatisierten Test der Live-Version über den Browser aus
---

# Live-Version Check Workflow

Führe alle Schritte der Reihe nach aus.

## 1. Initiale Browser-Verbindung

Starte einen Browser-Subagenten (`browser_subagent`), um die Live-URL aufzurufen und einen vollständigen Test-Durchlauf zu starten.

**Vorbereitung:**
Frage den User nach der Live-URL der Website (z.B. `https://www.bws-veranstaltungstechnik.de/`) oder verwende die bekannte URL.

## 2. Navigation & Rendering prüfen

Der Browser-Subagent soll folgende Basis-Punkte prüfen:
-   **Startseite**: Lädt die Hauptseite vollständig und korrekt?
-   **Navigation**: Funktionieren alle Menüpunkte und Links?
-   **Unterseiten**: Sind alle verlinkten Seiten erreichbar (kein 404)?
-   **Bilder**: Werden alle Bilder korrekt geladen?
-   **Responsive**: Sieht die Seite auf verschiedenen Breiten korrekt aus?

## 3. Fehler-Identifikation

Der Agent soll explizit nach folgenden Dingen auf der Live-Seite Ausschau halten:
-   404 Fehlerseiten oder kaputte Links.
-   Fehlende Bilder (broken image icons).
-   Layout-Fehler (überlappende Elemente, abgeschnittene Texte).
-   JavaScript-Fehler in der Konsole.

## 4. Spezifische Tests (Optional)

Wenn der User bestimmte Features getestet haben möchte (z.B. "Prüfe ob das Kontaktformular funktioniert" oder "Prüfe die neue Galerie-Seite"), instruiere den Subagenten `browser_subagent` **gezielt** auf diese Seite zu navigieren und zu interagieren.

## 5. Bericht auswerten

Schreibe dem User nach Abschluss des Browser-Tests eine kurze, verständliche Zusammenfassung:
- Waren alle Seiten erreichbar?
- Gab es visuelle Probleme?
- Wurden Fehler gefunden?
