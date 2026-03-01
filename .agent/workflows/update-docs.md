---
description: Aktualisiert die Dokumentation (FEATURES.md) basierend auf dem aktuellen Stand des Codes und der Datenbank.
---

# Dokumentations-Workflow (Fixture Builder)

Dieser Workflow analysiert automatisch die Datenbank, das Verzeichnis für Komponenten und Typen und aktualisiert die Markdown-Dateien im Ordner `docs/`.

## 1. Typescript Code & Struktur analysieren

Nutze `view_file` auf `src/types/fixture.ts` um die neuesten Typen und Felder für Kanäle, Modi und Fixtures auszulesen.

Prüfe das Verzeichnis `src/components/features/builder/` auf neue Komponenten oder geänderte Logik.

## 2. FEATURES.md aktualisieren

Dieser Workflow sollte **automatisch nach jeder Codeänderung** gefolgt werden, die Features, Komponenten oder Typen modifiziert.

1. Nach einer Codeänderung prüfen:
   - Neue **Export-Formate** in `src/lib/generators/`?
   - Neue **Kanal-Typen** in `src/types/fixture.ts`?
   - Neue **Builder-Schritte** in `src/app/page.tsx` oder `src/components/features/builder/`?

2. Aktualisiere `docs/FEATURES.md` entsprechend:
   - Bereich **Fixture Editor**: Fortschritt bei Schritten (Info, Kanäle, Capabilities, Modi, Export).
   - Bereich **Library**: Sync-Status mit Supabase.
   - Bereich **Export**: Unterstützte Formate.

3. Einträge kompakt halten. Neue Features mit `🆕` und Datum markieren.

## 3. Bestätigung
Melde dem User kurz, was genau ergänzt oder verändert wurde.
