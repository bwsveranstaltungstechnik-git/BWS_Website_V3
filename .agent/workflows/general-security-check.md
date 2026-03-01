---
description: Genereller Security & Audit Check Workflow
---

# Genereller Security Check Workflow

Führt einen allgemeinen Sicherheits- und Stabilitäts-Check des gesamten Projekts durch (Dependencies, Code-Secrets, etc.). Dieser Workflow ist weiter gefasst als der API-Security-Check.

// turbo-all
1. Prüfe auf NPM-Abhängigkeiten mit bekannten Sicherheitslücken:
```bash
npm audit
```

2. Scanne den Quellcode rekursiv nach hartcodierten Kennwörtern (Passwörter, DB-Secrets, API-Schlüssel):
```bash
find src/ -type f -exec grep -inE "(password|secret|api_key|token)[=:]\s*['\\\"]([^'\\\"]+)['\\\"]" {} + | grep -v "password: ''" | grep -v "token: ''" | grep -v "NEXT_PUBLIC" || echo "Keine offensichtlichen hartcodierten Secrets gefunden."
```

3. Überprüfe die Next.js Konfiguration auf Sicherheits-Header (`next.config.js` / `next.config.mjs`):
```bash
cat next.config.* || echo "Keine next.config.* Datei gefunden."
```

4. Liste alle im Frontend exponierten Umgebungsvariablen (`NEXT_PUBLIC_`) auf, um sicherzustellen, dass keine echten Secrets dabei sind (durchsucht `.env*` Dateien und den Code):
```bash
grep -r "NEXT_PUBLIC_" .env* src/ app/ || echo "Keine NEXT_PUBLIC Environment Variables gefunden."
```

5. Generiere einen kurzen Report (falls Lücken gefunden wurden, bitte beheben und den Status an den Nutzer melden).
