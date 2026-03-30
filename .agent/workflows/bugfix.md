---
description: Systematischer Workflow zur Fehlersuche und -behebung (Bugfixing)
---

# Bugfix Workflow

Dieser Workflow definiert einen systematischen Prozess, um gemeldete Bugs effizient zu reproduzieren, zu analysieren und zu beheben.

## 1. Reproduktion (Reproduce & Isolate)
- Identifiziere die genauen Schritte, um den Bug auszulösen.
- Prüfe, ob der Bug konsistent oder sporadisch auftritt.
- Isoliere die betroffene Datei oder Sektion (HTML, CSS, JavaScript).

## 2. Analyse (Root Cause Analysis)
- **HTML:** Prüfe die Struktur auf fehlende oder falsch verschachtelte Tags, kaputte Links, fehlende Attribute.
- **CSS:** Analysiere Layout-Probleme, z-index-Konflikte, fehlende Media Queries, Spezifitäts-Probleme.
- **JavaScript:** Prüfe Konsolen-Fehler, Event-Listener-Probleme, DOM-Manipulationen, asynchrone Logik.
- Nutze den Browser-Subagenten oder die Browser-DevTools, um den Fehler visuell nachzuvollziehen.

## 3. Behebung (Fix)
- Erstelle einen isolierten Fix, der nur die betroffene Logik ändert, ohne Nebeneffekte zu erzeugen.
- Teste den Fix in verschiedenen Browsern (Chrome, Firefox, Safari) und auf verschiedenen Bildschirmgrößen.

## 4. Verifikation (Test & Verify)
- Führe einen manuellen Test (über den Browser-Subagent oder User-Feedback) durch, um sicherzustellen, dass der Bug behoben ist und keine neuen Fehler aufgetreten sind.
- Prüfe die Seite auf verschiedenen Geräten (Desktop, Tablet, Mobile).
