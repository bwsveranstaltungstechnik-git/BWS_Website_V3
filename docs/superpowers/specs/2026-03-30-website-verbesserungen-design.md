# Website-Verbesserungen — Design-Spec
**Datum:** 2026-03-30
**Projekt:** BWS Veranstaltungstechnik GbR — statische HTML/Tailwind Website

---

## Übersicht

Vier priorisierte Verbesserungen, aufgeteilt in drei Phasen:

| Phase | Feature | Dateien |
|-------|---------|---------|
| 1 | Produkt-Detailseiten | `mietartikel-details.html`, `js/main.js`, alle Katalog-HTMLs |
| 2 | Google-Bewertungs-Badge auf Homepage | `index.html` |
| 2 | „So funktioniert's" Sektion auf Homepage | `index.html` |
| 3 | SEO Structured Data (Product Schema) | alle Katalog-HTMLs |

---

## Phase 1 — Produkt-Detailseiten

### Ziel
Jedes Produkt soll eine eigene Detailseite haben, die über einen „Details"-Button auf den Katalogseiten erreichbar ist.

### Technischer Ansatz
Eine einzelne Template-Seite (`mietartikel-details.html`) liest Produktdaten aus den URL-Parametern und rendert sich dynamisch.

**URL-Format:**
```
mietartikel-details.html?id=tontechnik-ld-icoa-12a-bt&name=LD+ICOA+12A+BT&price=25&category=tontechnik&img=Bilder/...&max=2
```

### Layout (Split A — bestätigt)
- **Links:** Großes Produktbild (aspect-ratio 1:1, liquid-glass Hintergrund)
- **Rechts:**
  - Kategorie-Badge (farbcodiert: cyan/amber/green/purple)
  - Produktname (font-black, groß)
  - Preisblock: `25,00 € / Tag` mit GbR-Hinweis (§ 19 UStG)
  - Verfügbarkeit: `max. X Stück`
  - Mengen-Auswahl (qty-minus / qty-plus, bestehende Logik aus main.js)
  - „In den Warenkorb" Button (bestehende add-to-cart Logik)
- **Unten:** Ähnliche Produkte (selbe Kategorie, aus URL-Param `category`)
- **Navigation:** Breadcrumb (`← Tontechnik / Produktname`) + Zurück-Link

### Änderungen an Katalogseiten
Auf jeder Produktkarte (tontechnik.html, lichttechnik.html, event-zubehoer.html, dj-service.html) wird unterhalb des bestehenden „In den Warenkorb"-Buttons ein zweiter Button ergänzt:

```html
<a href="mietartikel-details.html?id=...&name=...&price=...&category=...&img=...&max=..."
   class="details-link ...">
  Details ansehen
</a>
```

Alle Werte kommen aus den bestehenden `data-*` Attributen der Produktkarte.

### Ähnliche Produkte
- Werden per `<script>` inline in `mietartikel-details.html` definiert
- Enthält alle Produkte als JS-Array (gespiegelt aus den Katalogseiten)
- Gefiltert nach `category` URL-Param, aktuelles Produkt ausgeschlossen
- Maximal 3 ähnliche Produkte angezeigt

### Inhalt (Phase 1 — nur vorhandene Daten)
- Name, Bild, Preis/Tag, Kategorie, max. Stückzahl
- Keine Beschreibungstexte oder technischen Daten (folgt später)

---

## Phase 2 — Homepage-Ergänzungen

### 2a — Google-Bewertungs-Badge

**Position:** Direkt unter den Hero-Buttons (nach dem bestehenden CTA-Bereich)

**Inhalt:**
- 5 gelbe Sterne (★★★★★)
- „4,8" fett
- „· 54 Google-Bewertungen"
- Google-Logo (SVG inline oder `<img>`)

**Styling:** Kleines pill-förmiges Badge, `bg-white/5 border border-white/10 rounded-full`, passt zum bestehenden Glassmorphism-Design.

**Kein Link nötig** (Google-Reviews sind extern, kein Tracking-Ziel).

---

### 2b — „So funktioniert's" Sektion

**Position:** Neue Section direkt nach dem Hero-Bereich, vor dem Kategorien-Grid

**Inhalt:** 3 Schritte nebeneinander (grid-cols-3 auf Desktop, stack auf Mobile)

| Schritt | Icon | Titel | Text |
|---------|------|-------|------|
| 1 | `shopping_cart` | Auswählen | Artikel in den Warenkorb legen |
| 2 | `send` | Anfragen | Unverbindliche Anfrage senden |
| 3 | `celebration` | Loslegen | Abholen oder liefern lassen |

**Styling:** Jeder Schritt als `liquid-glass rounded-2xl p-6`, Nummer oben als amber-farbener Badge, Icon darunter, Titel und Beschreibung.

---

## Phase 3 — SEO Structured Data

### Ziel
Jede Produktkarte erhält ein `<script type="application/ld+json">` mit Product-Schema, damit Google Preis und Kategorie direkt in den Suchergebnissen anzeigen kann.

### Schema-Template pro Produkt
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "LD ICOA 12A BT",
  "image": "https://bws-veranstaltungstechnik.de/Bilder/...",
  "description": "Tontechnik-Equipment zur Miete bei BWS Veranstaltungstechnik GbR",
  "offers": {
    "@type": "Offer",
    "price": "25.00",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "BWS Veranstaltungstechnik GbR"
    }
  }
}
```

**Platzierung:** Im `<head>` jeder Katalogseite, ein Block pro Produkt.

---

## Nicht in Scope (bewusst ausgeschlossen)
- Floating Kontakt-Button (vom Nutzer abgelehnt)
- Produktbeschreibungstexte / technische Daten (folgt in einer späteren Phase)
- Blog / Ratgeber-Seiten (zu aufwändig für jetzt)
- Backend-Änderungen (keine serverseitige Logik)
