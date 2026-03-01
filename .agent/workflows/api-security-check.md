---
description: Überprüfung der API-Sicherheit und Supabase Zugriffsrechte
---

# API Security Check Workflow

Führe eine Sicherheitsprüfung des Projekts durch, um sicherzustellen, dass keine API Keys kompromittiert oder unsicher im Frontend verwendet werden und dass Datenbankzugriffe sicher sind.

## 0. Context 7 Security Guidelines
- Befrage vorab die Context 7 API (siehe `/use-context7`) nach den aktuellen Next.js Data Fetching und Supabase Auth / SSR Security Best Practices.

## 1. API Keys & Umgebungsvariablen prüfen
- Durchsuche den Code nach hardcodierten API Keys oder Secrets.
- Überprüfe `.env.example` und `.env.local` (falls vorhanden) auf Struktur.
- Stelle sicher, dass `NEXT_PUBLIC_` Variablen nur unkritische Keys enthalten (wie evt. den Supabase Anon Key).
- Prüfe, dass kritische Keys (wie Supabase Service Role Key oder andere Backend-APIs) NICHT durch `NEXT_PUBLIC_` im Frontend exponiert werden.

## 2. API-Routen & Backend-Zugriff (`/app/api/...`)
- Analysiere API-Routen auf serverseitige Authentifizierung.
- Wenn Backend-Routen den Supabase Client verwenden, stelle sicher, dass sie nicht blind Nutzerdaten vertrauen oder RLS umgehen, ohne dass es zwingend nötig und validiert ist (z.B. `@supabase/ssr` Checks).

## 3. Datenbank RLS & Policies (Supabase)
- Analysiere die Row Level Security (RLS) Policies der Supabase Tabellen.
- **Kritische Warnung:** Prüfen, ob `Allow all access` oder `cmd: ALL` für die `public` Rolle (alle ungeprüften oder authentifizierten Frontend-Nutzer) gesetzt sind.
- Falls offene RLS existiert, ist dies ein massives Sicherheitsrisiko, da jeder mit dem Anon-Key die DB modifizieren, lesen oder löschen könnte. 
- Erstelle Vorschläge für strikte RLS-Policies (z.B. basierend auf JWT-Claims, Firma oder Auth-Status).

## 4. Bericht erstellen
- Melde dem User alle gefundenen Sicherheitslücken detailliert.
- Stelle einen klaren Aktionsplan bereit (z.B: "Wie sichern wir die Tabellen ab, ohne die App zu brechen?").
