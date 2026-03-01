---
description: Code-Optimierung & Refactoring
---

Führe eine umfassende Code-Optimierung im Projekt durch:

0. **Context 7 Best Practices abfragen (MANDATORY):**
   - Rufe zwingend den Workflow `/use-context7` auf oder frage direkt die Context 7 API an, um die aktuellsten Architektur- und Performance-Empfehlungen für Next.js/React/Supabase (SSR, Server Actions) zu erhalten, BEVOR du mit dem Refactoring beginnst.

1. **Unnötigen Code finden und löschen:**
   - Suche nach auskommentiertem Code, ungenutzten Variablen, leeren Funktionen und Imports, die nicht mehr benötigt werden.
   - Analysiere große Dateien auf ungenutzte Komponenten oder Hooks.

2. **Code überprüfen und refactoren:**
   - Prüfe auf redundante Logik oder doppelte Implementierungen ähnlicher Funktionen (Don't Repeat Yourself - DRY).
   - Extrahiere komplexe, wiederverwendbare Logik in separate Hooks oder Helper-Funktionen.
   - Ersetze veraltete Muster durch moderne React/Next.js Best Practices.

3. **Performance-Analyse:**
   - Identifiziere Komponenten, die unnötig oft neu rendern, und implementiere `useMemo` oder `useCallback` wo sinnvoll.
   - Prüfe Ladezeiten und implementiere ggf. Lazy Loading via `next/dynamic` für große Komponenten, die nicht direkt im Viewport sichtbar sind.
   - Analysiere useEffect-Hooks auf korrekte Dependencies und unnötige Ausführungen.

4. **Fehlerbehandlung und Typisierung:**
   - Stelle sicher, dass TypeScript-Interfaces und Types konsistent und streng sind (`any` vermeiden).
   - Überprüfe das Fehler-Handling (Console-Logs statt echter UI-Rückmeldung auflösen).

Führe diese Schritte systematisch durch und berichte dem User am Ende in einer kurzen Übersicht, welche Dateien bereinigt und welche Bereiche am stärksten optimiert wurden.
