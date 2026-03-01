---
description: Systematischer Workflow zur Fehlersuche und -behebung (Bugfixing)
---

# Bugfix Workflow

Dieser Workflow definiert einen systematischen Prozess, um gemeldete Bugs effizient zu reproduzieren, zu analysieren und zu beheben.

## 0. Context 7 Best Practices (MANDATORY FIRST STEP)
Bevor du an Next.js, React oder Supabase-Fehlern arbeitest, befrage zwingend die Context 7 API nach den aktuellsten Best Practices oder Known Issues (Nutze den `/use-context7` Workflow oder rufe die API via `Invoke-RestMethod` auf), um nicht mit veralteten Lösungsansätzen (z.B. Client-Components statt Server-Actions) zu arbeiten.

## 1. Reproduktion (Reproduce & Isolate)
- Identifiziere die genauen Schritte, um den Bug auszulösen.
- Prüfe, ob der Bug konsistent oder sporadisch auftritt.
- Isoliere die betroffene Komponente oder Route (Frontend, Backend, Datenbank, State Management).

## 2. Analyse (Root Cause Analysis)
- **Frontend:** Prüfe React State, Context Provider, `useEffect`-Schleifen (Infinite Loops) und Konsolen-Logs im Browser.
- **Backend/API:** Analysiere Netzwerkanfragen (`fetch`, Server Actions) auf Fehlercodes, Timeouts oder fehlerhafte Payloads.
- **Datenbank:** Prüfe Supabase Logs, RLS-Policies und Schema-Struktur auf Unstimmigkeiten oder blockierte Queries.
- Nutze gezieltes Logging (`console.log`, `toast.error`), um den Datenfluss visuell nachzuvollziehen.

## 3. Behebung (Fix)
- Erstelle einen isolierten Fix, der nur die betroffene Logik ändert, ohne Nebeneffekte zu erzeugen.
- Überprüfe Abhängigkeiten (z.B. Circular Dependencies bei Importen) und löse diese mit direkten Importen auf.

## 4. Verifikation (Test & Verify)
// turbo-all
Führe statische Code-Checks durch, um sicherzustellen, dass der Fix keine Build-Fehler verursacht:
```bash
npm run build
```
- Führe einen manuellen Test (über den Browser-Subagent oder User-Feedback) durch, um sicherzustellen, dass der Bug behoben ist und keine neuen Fehler aufgetreten sind.
