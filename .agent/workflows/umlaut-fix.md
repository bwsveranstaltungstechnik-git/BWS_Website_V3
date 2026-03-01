---
description: Umlaut Fix (Repariert kaputte Umlaute wie ü, ä, ö)
---
Dieser Workflow durchsucht alle `.ts` und `.tsx` Dateien im `src/` Verzeichnis und repariert kaputte Umlaute (UTF-8 Encoding Fehler).

// turbo-all
1. Führe das Reparatur-Skript aus:
```bash
node .agent/scripts/fix-umlaute.js
```
