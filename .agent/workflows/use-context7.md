---
description: Wie und wann die Context 7 API für aktuelle Dokumentationen genutzt werden soll
---
# Context 7 Workflow

Dieser Workflow stellt sicher, dass für Code-Implementierungen mit Next.js, React, Tailwind, Supabase oder anderen Libraries stets die aktuellsten Best Practices aus der Context 7 API abgerufen werden.

## Wann dieser Workflow auszuführen ist
- Wenn der User nach einer Implementierung für ein spezifisches Framework oder eine Library fragt (z.B. Next.js Routing, Supabase Auth, Tailwind Setup).
- Wenn der User explizit nach "/use-context7" fragt.
- Bevor Refactorings oder grundlegende Architekturentscheidungen in Next.js (App Router, Server Actions, Middleware) getroffen werden, bei denen veraltetes Wissen zu Fehlern führen könnte.

## Schritte

1. **Suchanfrage an Context 7 senden**
   Verwende `curl` oder `Invoke-RestMethod` (PowerShell) um die Context 7 API nach der relevanten Dokumentation zu durchsuchen.
   
   Beispiel für PowerShell:
   ```powershell
   // turbo
   $response = Invoke-RestMethod -Uri "https://context7.com/api/v2/libs/search?libraryName=next.js&query=SUCHBEGRIFF" -Headers @{ Authorization = "Bearer ctx7sk-512eea36-31f6-48b8-b6c8-cd7d98a930de" }
   $response | ConvertTo-Json -Depth 6
   ```

2. **Ergebnisse analysieren und Bibliothek auswählen**
   Die API liefert verschiedene Ergebnisse (z.B. main, canary, llms_txt). Wähle bevorzugt die `/llmstxt/`-Versionen oder die `main`-Version, da diese am besten für LLMs geeignet bzw. am stabilsten sind.

3. **Dokumentation abrufen (Optional)**
   Falls ein spezifischer Endpunkt (ID) aus der Suche für den Use-Case sehr relevant ist, lade den Inhalt herunter oder nutze die bereitgestellten Snippets aus dem Suchergebnis.

4. **Code generieren**
   Basierend auf den abgerufenen Snippets und der aktuellen Dokumentation schreibst du den Code für den User. 

5. **Antworten**
   Erkläre dem User kurz, dass du dich auf die aktuelle Dokumentation von Context 7 beziehst.
