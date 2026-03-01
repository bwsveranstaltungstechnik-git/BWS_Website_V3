---
description: Führt einen kompletten manuellen Check aller Features gegen docs/FEATURES.md durch
---

# Feature-Check Workflow (Fixture Builder)

Dieser Workflow stellt sicher, dass alle implementierten Features des Fixture Builders gemäß `docs/FEATURES.md` funktionieren.

## 1. Vorbereitung
- Lade und lies `docs/FEATURES.md`.
- Führe einen Type-Check und Build durch:
```bash
npx --no-install tsc --noEmit && npm run build
```

## 2. Funktionstests nach Bereich

### Bereich A: Fixture Editor
- **Schritt 1 (General Info)**: Validierung von Hersteller und Name.
- **Schritt 2 (Channels)**: Hinzufügen, Bearbeiten, Löschen und Reordering (Drag-and-Drop) von Kanälen.
- **Schritt 3 (Capabilities)**: Definition von DMX-Ranges für Kanäle.
- **Schritt 4 (Modes)**: Gruppierung von Kanälen zu Modi.

### Bereich B: Daten-Management
- **Import**: Funktioniert der AI-Import oder das Laden aus Referenzdateien?
- **Library**: Können Fixtures in Supabase gespeichert und von dort geladen werden?
- **Duplicate/Clone**: Funktioniert das Klonen von Fixtures oder Modi?

### Bereich C: Export
- Generierung von **.r20** (Avolites Classic).
- Generierung von **.d4** (Titan).
- Generierung von **.xml** (MA / Generic).
- Download-Funktionalität (ZIP? Einzeldatei?).

## 3. Report
Berichte über Fehler oder Abweichungen von der Dokumentation.
