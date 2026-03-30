---
description: Umlaut Fix (Repariert kaputte Umlaute wie ü, ä, ö)
---
Dieser Workflow durchsucht alle `.html`, `.js` und `.css` Dateien im Projekt und repariert kaputte Umlaute (UTF-8 Encoding Fehler).

1. Durchsuche alle relevanten Dateien nach bekannten kaputten Umlaut-Mustern:
   - `Ã¼` → `ü`, `Ã¤` → `ä`, `Ã¶` → `ö`
   - `Ã–` → `Ö`, `Ã„` → `Ä`, `Ãœ` → `Ü`
   - `ÃŸ` → `ß`

2. Ersetze alle gefundenen Vorkommen mit den korrekten UTF-8 Zeichen.

3. Stelle sicher, dass alle HTML-Dateien `<meta charset="UTF-8">` im `<head>` haben.

4. Berichte dem User, welche Dateien geändert wurden.
