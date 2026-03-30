---
description: Code-Optimierung & Refactoring für HTML/CSS/JS Websites
---

Führe eine umfassende Code-Optimierung im Projekt durch:

1. **Unnötigen Code finden und löschen:**
   - Suche nach auskommentiertem Code, ungenutzten CSS-Klassen, leeren Funktionen und nicht verwendeten Variablen.
   - Analysiere große Dateien auf redundante oder doppelte Styles.

2. **Code überprüfen und refactoren:**
   - Prüfe auf redundante CSS-Regeln oder doppelte Selektoren (Don't Repeat Yourself - DRY).
   - Extrahiere wiederverwendbare CSS-Klassen und JavaScript-Funktionen.
   - Stelle sicher, dass HTML semantisch korrekt ist (richtige Tags: `<section>`, `<article>`, `<nav>`, etc.).

3. **Performance-Analyse:**
   - Identifiziere große Bilddateien und optimiere sie (WebP-Format, Kompression, lazy loading).
   - Prüfe CSS auf nicht genutzte Selektoren und reduziere die Dateigröße.
   - Minimiere JavaScript und entferne Blocking-Scripts aus dem `<head>`.
   - Prüfe ob `defer` oder `async` bei Script-Tags fehlt.

4. **Barrierefreiheit & Best Practices:**
   - Stelle sicher, dass alle Bilder `alt`-Attribute haben.
   - Überprüfe Farbkontraste für Lesbarkeit.
   - Prüfe ob Formulare korrekte Labels haben.

Führe diese Schritte systematisch durch und berichte dem User am Ende in einer kurzen Übersicht, welche Dateien bereinigt und welche Bereiche am stärksten optimiert wurden.
