---
description: Überprüfe die Supabase-Datenbank auf fehlende Tabellen, RLS-Policies, Schema-Fehler und Daten-Konsistenz
---

# SQL Check Workflow (Fixture Builder)

Führe alle Schritte der Reihe nach aus. Nutze die Supabase MCP Tools für alle Prüfungen.

## 0. Projekt Kontext
- Rufe vorab `/fixture-builder-context` auf, um die spezifischen Anforderungen für dieses Projekt zu verstehen.

## 1. Projekt & Tabellen auflisten

Verwende `list_projects` um die Project-ID zu ermitteln, dann `list_tables` für das `public`-Schema.

Erwartete Tabellen:
- `fixtures` (Zentrale Tabelle für alle Fixture-Definitionen)

Melde fehlende Tabellen.

## 2. RLS-Status prüfen

Führe folgendes SQL aus:

```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

Prüfe ob `fixtures` `rowsecurity = true` hat. Falls nicht, melde dies als Sicherheitsrisiko.

## 3. RLS-Policies prüfen

Führe folgendes SQL aus:

```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

Stelle sicher, dass die `fixtures` Tabelle sinnvolle Policies hat (z.B. öffentlicher Lesezugriff oder an Nutzer gebundener Schreibzugriff).

## 4. Schema-Konsistenz prüfen

Führe für die Tabelle `fixtures` aus:

```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'fixtures'
ORDER BY ordinal_position;
```

Prüfe ob die Spalten mit den TypeScript-Typen in `src/types/fixture.ts` übereinstimmen. 
Zentrale Spalten:
- `id` (uuid)
- `name` (text)
- `manufacturer` (text)
- `type` (text)
- `data` (jsonb) - enthält die Kanäle, Modi und Capabilities.

## 5. Supabase Advisor

Nutze das MCP Tool `get_advisors` nacheinander mit:
1. `type: 'security'`
2. `type: 'performance'`

## 6. Bericht erstellen

Erstelle einen übersichtlichen Bericht mit:
- ✅ für bestandene Prüfungen
- ❌ für Fehler
- ⚠️ für Warnungen
