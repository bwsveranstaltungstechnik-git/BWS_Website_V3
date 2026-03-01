---
description: Wie die KI mit dem Konzept des "BWS Fixture Builder" umgehen soll.
---

# Workflow: Fixture Builder Kontext

Dieser Workflow definiert die Grundregeln für alle KI-Agenten, die am "BWS Fixture Builder" arbeiten.

## Der Kernsatz
**"Wir bauen ein Werkzeug, mit dem Lichttechniker komplexe DMX-Fixture-Definitionen intuitiv erstellen und für verschiedene Konsolen exportieren können."**

## Konsequenzen für die Entwicklung:

1.  **DMX-Integrität ist heilig:**
    *   Überlappende Kanäle oder ungültige DMX-Werte (außerhalb 0-255) müssen verhindert werden.
    *   Nutze den `validate-dmx-integrity` Skill bei Änderungen an der Logik.

2.  **Export-Kompatibilität:**
    *   Änderungen an der Datenstruktur (`src/types/fixture.ts`) müssen in allen Generatoren (`src/lib/generators/`) reflektiert werden (R20, D4, XML).
    *   Achte darauf, dass die exportierten Dateien den Spezifikationen der jeweiligen Konsolen (Avolites, MA, etc.) entsprechen.

3.  **UI/UX für Builder:**
    *   Der Builder ist ein Tool für Power-User. Drag-and-Drop (DND) für die Kanalreihenfolge muss flüssig funktionieren.
    *   Achte auf visuelles Feedback beim Editieren von Capabilities (Farben, Icons).

4.  **Supabase & Library:**
    *   Die Library dient zum Speichern und Teilen von Fixtures.
    *   RLS Policies sollten so gesetzt sein, dass Nutzer ihre eigenen Fixtures verwalten können, aber ggf. auch eine öffentliche Library existiert.

## Anweisung an KI-Agenten:
Bevor du neue Features implementierst, prüfe immer:
*   Bricht meine Änderung den Export für eine der Zielkonsolen?
*   Ist die User Experience für das Editieren von 50+ Kanälen noch gegeben?
*   Sind die Typen konsistent?
