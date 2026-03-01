---
description: Mobile Version überprüfen ob die neuen Feature auch Richtig implementier sind udn ob die Ui sinn ergibt
---

Führe eine umfassende Überprüfung der mobilen Darstellung durch und stelle sicher, dass alle Features korrekt implementiert und nutzbar sind.

0. **Context 7 Tailwind UI Guidelines:**
   - Falls größere Layouts (z.B. Tabellen, Modal-Dialoge) neu geschrieben werden müssen, konsultiere `/use-context7` für Best Practices bzgl. Tailwind CSS und Mobile-First Architektur.

1.  **Responsivität & Layout prüfen:**
   - Analysiere die wichtigsten Views (Fixture-Editor, Channels, Capabilities, Modes, Export) auf kleineren Bildschirmen.
   - Stelle sicher, dass die Kanalliste auf mobilen Geräten nutzbar ist.
   - Überprüfe Padding und Margins (`p-2`, `m-2` auf Mobile statt `p-8`).


2. **Sichtbarkeit von UI-Elementen:**
   - Prüfe, ob wichtige Buttons (z.B. "Neuer Artikel", "Neuer Job", "Export") auf dem Handy nicht hinter anderen Elementen verschwinden oder zu einer horizontalen Scrollbar führen.
   - Kontrolliere, ob die neuen Features (Direct Product Opening per Suchleiste, Multiauswahl) mobil gut bedienbar sind.

3. **Touch-Bedienung & Interaktionsflächen:**
   - Checke, ob Checkboxen und Dropdowns auf Touchscreens leicht anwählbar sind (ausreichend große "Hit-Areas", z.B. bei der Multiauswahl in der Suchleiste).
   - Teste, ob modale Dialoge auf kleinen Screens nicht abgeschnitten werden.

4. **Korrektur & Feedback:**
   - Behebe identifizierte Layout-Fehler direkt per Tailwind-Klassen (`sm:`, `md:` Breakpoints anpassen).
   - Erstelle bei komplexeren Usability-Problemen auf Mobilgeräten einen Bericht für den User (z.B. wenn eine Tabelle zu viele Spalten hat, um sinnvoll als Liste auf dem Handy angezeigt zu werden).
