---
description: Genereller Security & Audit Check Workflow
---

# Genereller Security Check Workflow

Führt einen allgemeinen Sicherheits- und Stabilitäts-Check des gesamten Website-Projekts durch.

1. **Externe Ressourcen prüfen:**
   - Scanne alle HTML-Dateien auf externe Links, CDN-Einbindungen und Drittanbieter-Scripts.
   - Prüfe ob alle externen Ressourcen über HTTPS eingebunden sind.
   - Verifiziere, dass `integrity`-Attribute (SRI) bei CDN-Scripts gesetzt sind.

2. **Hartcodierte Daten prüfen:**
   - Durchsuche HTML, CSS und JS Dateien nach hartcodierten API-Keys, Passwörtern oder Tokens.
   - Prüfe ob sensible Daten in JavaScript-Dateien exponiert sind.

3. **Formular-Sicherheit:**
   - Prüfe ob Formulare korrekte `action`-Attribute und `method` (POST für sensible Daten) verwenden.
   - Stelle sicher, dass Eingabefelder geeignete `type`-Attribute haben (z.B. `type="email"`, `type="tel"`).

4. **Content Security:**
   - Prüfe ob `target="_blank"` Links ein `rel="noopener noreferrer"` haben.
   - Stelle sicher, dass keine unsicheren Inline-Scripts verwendet werden.

5. **Report:**
   Generiere einen kurzen Report (falls Lücken gefunden wurden, bitte beheben und den Status an den Nutzer melden).
