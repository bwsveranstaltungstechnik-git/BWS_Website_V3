# Website-Verbesserungen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produkt-Detailseiten dynamisieren, Google-Bewertungsbadge und „So funktioniert's"-Sektion auf der Homepage ergänzen, SEO Product Schema generieren.

**Architecture:** Alle Änderungen rein client-seitig in der statischen HTML/JS-Site. `mietartikel-details.html` liest Produktdaten aus URL-Parametern. Details-Links und SEO-Schema werden einmalig in `js/main.js` per DOM-Traversal für alle Katalogseiten generiert. Homepage-Ergänzungen sind reine HTML-Einfügungen in `index.html`.

**Tech Stack:** Vanilla HTML, Tailwind CSS (CDN), Vanilla JavaScript, localStorage (`bws_cart`)

---

## Dateiübersicht

| Datei | Änderung |
|-------|----------|
| `mietartikel-details.html` | `<main>` komplett ersetzen — dynamische Inhalte via URL-Params + eingebettetes Produktarray |
| `js/main.js` | 2 neue Blöcke: Details-Links generieren + SEO-Schema generieren |
| `index.html` | Google-Badge nach Hero-Buttons einfügen + neue „So funktioniert's" Section |

---

## Task 1: mietartikel-details.html — dynamische Detailseite

**Dateien:**
- Modify: `mietartikel-details.html` (ab Zeile 85, `<main>` bis `</main>`)

### Überblick
Ersetzt den statischen `<main>`-Bereich durch ein leeres Skeleton + Inline-`<script>`, der beim Laden URL-Params liest und alle Inhalte befüllt. Enthält ein eingebettetes Produktarray für „Ähnliche Artikel".

- [ ] **Schritt 1: `<main>`-Bereich ersetzen**

Ersetze in `mietartikel-details.html` den gesamten Block von `<main class="flex-1 max-w-7xl...">` bis zum schließenden `</main>` (Zeile 85 ff.) mit folgendem:

```html
    <main class="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <!-- Breadcrumb -->
        <nav class="flex mb-8 text-sm text-slate-400 gap-2 items-center flex-wrap">
            <a class="hover:text-white transition-colors" href="index.html">Home</a>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
            <a id="breadcrumb-category-link" class="hover:text-white transition-colors" href="tontechnik.html">Kategorie</a>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
            <span id="breadcrumb-product-name" class="text-amber-500 font-bold">Produkt</span>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Bild links -->
            <div>
                <div id="detail-image-wrap" class="relative aspect-square rounded-2xl overflow-hidden liquid-glass flex items-center justify-center p-8 border border-white/5">
                    <div id="detail-glow" class="absolute inset-0 pointer-events-none"></div>
                    <img id="detail-img" alt="" class="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700" src="" onerror="this.src='Bilder/Placeholder/Placeholder.webp'"/>
                    <div class="absolute bottom-6 left-6">
                        <span id="detail-avail-badge" class="bg-amber-500/20 backdrop-blur-md text-amber-500 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-widest">Verfügbar</span>
                    </div>
                </div>
            </div>

            <!-- Info rechts -->
            <div class="flex flex-col">
                <!-- Kategorie-Badge -->
                <div id="detail-category-badge" class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 w-fit border"></div>

                <h1 id="detail-name" class="text-4xl lg:text-5xl font-black tracking-tight mb-6 text-white"></h1>

                <!-- Preisblock -->
                <div class="liquid-glass rounded-2xl p-5 mb-6 border border-white/5">
                    <p class="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Mietpreis</p>
                    <div class="flex items-baseline gap-2">
                        <span id="detail-price" class="text-4xl font-black text-white"></span>
                        <span class="text-slate-400 text-lg">/ Tag</span>
                    </div>
                    <p id="detail-max" class="text-xs text-slate-500 mt-1"></p>
                    <p class="text-[10px] text-slate-600 mt-1">Netto gem. § 19 UStG · keine MwSt.</p>
                </div>

                <!-- Menge + Warenkorb -->
                <div class="flex items-center gap-3 mb-4">
                    <div class="flex items-center bg-black/40 rounded-xl border border-white/10 overflow-hidden">
                        <button id="detail-qty-minus" class="h-12 w-12 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all text-xl font-bold">−</button>
                        <span id="detail-qty-display" class="w-10 text-center font-black text-white">1</span>
                        <button id="detail-qty-plus" class="h-12 w-12 flex items-center justify-center transition-all text-xl font-bold text-amber-500 hover:text-white hover:bg-amber-500/20">+</button>
                    </div>
                    <button id="detail-add-to-cart" class="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-black py-3 px-6 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider">
                        <span class="material-symbols-outlined text-[18px]">shopping_cart</span> In den Warenkorb
                    </button>
                </div>

                <a id="detail-back-link" href="#" class="text-sm text-slate-500 hover:text-white transition-colors flex items-center gap-1 mt-2">
                    <span class="material-symbols-outlined text-[16px]">arrow_back</span> Zurück zur Übersicht
                </a>
            </div>
        </div>

        <!-- Ähnliche Artikel -->
        <div class="mt-16">
            <h2 class="text-2xl font-black text-white mb-6">Weitere <span id="related-category-label" class="text-amber-500">Artikel</span></h2>
            <div id="related-products" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        </div>
    </main>
```

- [ ] **Schritt 2: Inline-Script vor `</body>` einfügen**

Direkt vor dem `<script src="js/main.js"></script>` Tag in `mietartikel-details.html` folgenden Block einfügen:

```html
    <script>
    // =====================================================
    // Alle Produkte (gespiegelt aus Katalogseiten)
    // =====================================================
    const ALL_PRODUCTS = [
        // Tontechnik
        {id:'tontechnik-ld-icoa-12a-bt',name:'LD ICOA 12A BT',price:25,category:'tontechnik',img:'Bilder/Miet-Sortiment/Ton/LD 12 Icoa.webp',max:2},
        {id:'tontechnik-ld-icoa-15a-bt',name:'LD ICOA 15A BT',price:30,category:'tontechnik',img:'Bilder/Miet-Sortiment/Ton/LD 15 Icoa.webp',max:2},
        {id:'tontechnik-ld-stinger-18a-g3',name:'LD STINGER 18A G3',price:40,category:'tontechnik',img:'Bilder/Miet-Sortiment/Ton/LD 18A Stinger.webp',max:4},
        {id:'tontechnik-set-xs',name:'Set XS',price:30,category:'tontechnik',img:'Bilder/Miet-Sortiment/Ton/Set XS.jpg',max:2},
        {id:'tontechnik-set-s',name:'Set S',price:70,category:'tontechnik',img:'Bilder/Miet-Sortiment/Ton/Set S.jpg',max:2},
        {id:'tontechnik-set-m',name:'Set M',price:100,category:'tontechnik',img:'Bilder/Miet-Sortiment/Ton/Set M.jpg',max:2},
        {id:'tontechnik-set-l',name:'Set L',price:140,category:'tontechnik',img:'Bilder/Miet-Sortiment/Ton/Set L.jpg',max:2},
        {id:'tontechnik-shure-sm58',name:'Shure SM58',price:7,category:'tontechnik',img:'Bilder/Miet-Sortiment/Mikros/SM58.webp',max:2},
        {id:'tontechnik-funkmikrofone',name:'Funkmikrofone',price:99,category:'tontechnik',img:'Bilder/Miet-Sortiment/Mikros/Funkmikros.webp',max:2},
        {id:'tontechnik-notepad-5',name:'Notepad 5',price:10,category:'tontechnik',img:'Bilder/Miet-Sortiment/Mischpulte/Notepad 5.webp',max:2},
        {id:'tontechnik-flow-8',name:'Flow 8',price:20,category:'tontechnik',img:'Bilder/Miet-Sortiment/Mischpulte/Flow8.webp',max:2},
        // Lichttechnik
        {id:'lichttechnik-led-flat-par-18x18w',name:'LED Flat Par 18x18W',price:10,category:'lichttechnik',img:'Bilder/Miet-Sortiment/Licht/Flat Par.webp',max:6},
        {id:'lichttechnik-eurolite-kls-401',name:'Eurolite KLS 401',price:25,category:'lichttechnik',img:'Bilder/Miet-Sortiment/Licht/LED Bar.webp',max:3},
        {id:'lichttechnik-outdoor-par',name:'Outdoor Par',price:10,category:'lichttechnik',img:'Bilder/Miet-Sortiment/Licht/Outdoor Par.webp',max:8},
        {id:'lichttechnik-ip-54-akku-par',name:'IP 54 Akku Par',price:20,category:'lichttechnik',img:'Bilder/Miet-Sortiment/Licht/IP 54 Akku Par.webp',max:4},
        {id:'lichttechnik-purelight-pixelbar',name:'Purelight Pixelbar',price:15,category:'lichttechnik',img:'Bilder/Miet-Sortiment/Licht/Pixel Bar.webp',max:4},
        {id:'lichttechnik-led-strobe-4in1',name:'LED Strobe 4in1',price:15,category:'lichttechnik',img:'Bilder/Miet-Sortiment/Licht/LED Strobe.webp',max:2},
        {id:'lichttechnik-quad-star-hp',name:'Quad Star HP',price:20,category:'lichttechnik',img:'Bilder/Miet-Sortiment/Licht/Quad Star HP.webp',max:2},
        {id:'lichttechnik-19x40w-b-eye',name:'19x40W B-EYE',price:60,category:'lichttechnik',img:'Bilder/Miet-Sortiment/Licht/B-EYE Movinghead.webp',max:2},
        {id:'lichttechnik-600w-cmy-beam',name:'600W CMY Beam',price:75,category:'lichttechnik',img:'Bilder/Miet-Sortiment/Licht/Beam Movinghead.webp',max:4},
        {id:'lichttechnik-adj-vdf-1100',name:'ADJ VDF 1100',price:15,category:'lichttechnik',img:'Bilder/Miet-Sortiment/Licht/Nebel-Maschine.webp',max:2},
        {id:'lichttechnik-2in1-haze-fogger',name:'2in1 Haze Fogger',price:40,category:'lichttechnik',img:'Bilder/Miet-Sortiment/Licht/Haze Fogger.webp',max:1},
        {id:'lichttechnik-wolfmix-w1-mk2',name:'Wolfmix W1 MK2',price:50,category:'lichttechnik',img:'Bilder/Miet-Sortiment/Mischpulte/Wolfmix.webp',max:1},
        {id:'lichttechnik-vmb-te-034-b',name:'VMB TE-034 B',price:25,category:'lichttechnik',img:'Bilder/Miet-Sortiment/Traverse und Lifte/Traversen-Lift.webp',max:2},
        {id:'lichttechnik-naxpro-fd34',name:'Naxpro FD34',price:15,category:'lichttechnik',img:'Bilder/Miet-Sortiment/Traverse und Lifte/Traverse.webp',max:2},
        // Event-Zubehör
        {id:'event-zubehoer-slush-eis-maschine',name:'Slush Eis Maschine',price:50,category:'event-zubehoer',img:'Bilder/Miet-Sortiment/Event-Zubehör/Slush Eis.webp',max:1},
        {id:'event-zubehoer-glaeser-becher-sets',name:'Gläser & Becher Sets',price:7.5,category:'event-zubehoer',img:'Bilder/Miet-Sortiment/Event-Zubehör/Glaeser.webp',max:1},
        {id:'event-zubehoer-hartek-zapfanlage',name:'Hartek Zapfanlage',price:40,category:'event-zubehoer',img:'Bilder/Miet-Sortiment/Event-Zubehör/Hartek Zapfanlage.webp',max:1},
        {id:'event-zubehoer-xi-moto-pavillon',name:'XI-Moto Pavillon',price:20,category:'event-zubehoer',img:'Bilder/Miet-Sortiment/Event-Zubehör/Pavillon.webp',max:1},
    ];

    // Kategorie-Konfiguration
    const CAT_CONFIG = {
        tontechnik:    {color:'cyan',  label:'Tontechnik',    page:'tontechnik.html'},
        lichttechnik:  {color:'amber', label:'Lichttechnik',  page:'lichttechnik.html'},
        'event-zubehoer': {color:'green', label:'Event-Zubehör', page:'event-zubehoer.html'},
        'dj-service':  {color:'purple',label:'DJ Service',    page:'dj-service.html'},
    };

    document.addEventListener('DOMContentLoaded', () => {
        const params = new URLSearchParams(window.location.search);
        const id       = params.get('id')       || '';
        const name     = params.get('name')     || 'Produkt';
        const price    = parseFloat(params.get('price')) || 0;
        const category = params.get('category') || 'tontechnik';
        const img      = params.get('img')      || '';
        const max      = parseInt(params.get('max')) || 1;

        const cfg = CAT_CONFIG[category] || CAT_CONFIG.tontechnik;
        const colorMap = {
            cyan:   {text:'text-cyan-500',  bg:'bg-cyan-500/15',  border:'border-cyan-500/30',  glow:'bg-cyan-500/5'},
            amber:  {text:'text-amber-500', bg:'bg-amber-500/15', border:'border-amber-500/30', glow:'bg-amber-500/5'},
            green:  {text:'text-green-500', bg:'bg-green-500/15', border:'border-green-500/30', glow:'bg-green-500/5'},
            purple: {text:'text-purple-500',bg:'bg-purple-500/15',border:'border-purple-500/30',glow:'bg-purple-500/5'},
        };
        const c = colorMap[cfg.color];

        // Seitentitel
        document.title = `${name} mieten | BWS Veranstaltungstechnik GbR`;

        // Breadcrumb
        const catLink = document.getElementById('breadcrumb-category-link');
        catLink.textContent = cfg.label;
        catLink.href = cfg.page;
        document.getElementById('breadcrumb-product-name').textContent = name;

        // Bild
        document.getElementById('detail-img').src = img;
        document.getElementById('detail-img').alt = name;
        document.getElementById('detail-glow').className = `absolute inset-0 ${c.glow} pointer-events-none`;
        document.getElementById('detail-avail-badge').className =
            `${c.bg} backdrop-blur-md ${c.text} text-[10px] font-bold px-3 py-1 rounded-full border ${c.border} uppercase tracking-widest`;

        // Kategorie-Badge
        const badge = document.getElementById('detail-category-badge');
        badge.className = `inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 w-fit border ${c.bg} ${c.border} ${c.text}`;
        badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-current"></span>${cfg.label}`;

        // Name
        document.getElementById('detail-name').textContent = name;

        // Preis
        document.getElementById('detail-price').textContent = `${price.toFixed(2).replace('.', ',')} €`;
        document.getElementById('detail-max').textContent = `Bis zu ${max} Stück verfügbar`;

        // Zurück-Link
        document.getElementById('detail-back-link').href = cfg.page;

        // Qty-Logik
        let qty = 1;
        const qtyDisplay = document.getElementById('detail-qty-display');
        document.getElementById('detail-qty-minus').addEventListener('click', () => {
            if (qty > 1) { qty--; qtyDisplay.textContent = qty; }
        });
        document.getElementById('detail-qty-plus').addEventListener('click', () => {
            if (qty < max) { qty++; qtyDisplay.textContent = qty; }
            else {
                qtyDisplay.style.color = '#ef4444';
                setTimeout(() => { qtyDisplay.style.color = ''; }, 500);
            }
        });

        // In den Warenkorb
        const cartBtn = document.getElementById('detail-add-to-cart');
        cartBtn.setAttribute('data-id', id);
        cartBtn.setAttribute('data-name', name);
        cartBtn.setAttribute('data-price', price);
        cartBtn.setAttribute('data-category', category);
        cartBtn.setAttribute('data-img', img);
        cartBtn.setAttribute('data-max', max);
        cartBtn.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('bws_cart')) || [];
            const idx = cart.findIndex(i => i.id === id);
            if (idx > -1) {
                const newQty = Math.min(cart[idx].quantity + qty, max);
                cart[idx].quantity = newQty;
            } else {
                cart.push({ id, name, price, category, img, quantity: qty, maxQty: max });
            }
            localStorage.setItem('bws_cart', JSON.stringify(cart));

            const orig = cartBtn.innerHTML;
            cartBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">check</span> Hinzugefügt';
            cartBtn.classList.add('!bg-green-500', '!shadow-green-500/20');
            setTimeout(() => {
                cartBtn.innerHTML = orig;
                cartBtn.classList.remove('!bg-green-500', '!shadow-green-500/20');
            }, 1500);

            // Badge aktualisieren
            const badge2 = document.querySelector('nav a[href="warenkorb.html"] .cart-badge');
            if (badge2) {
                const total = (JSON.parse(localStorage.getItem('bws_cart'))||[]).reduce((s,i)=>s+i.quantity,0);
                badge2.textContent = total;
                badge2.style.display = total > 0 ? 'flex' : 'none';
            }
        });

        // Ähnliche Produkte (gleiche Kategorie, anderes Produkt, max. 3)
        const related = ALL_PRODUCTS.filter(p => p.category === category && p.id !== id).slice(0, 3);
        const relLabel = document.getElementById('related-category-label');
        if (relLabel) relLabel.textContent = cfg.label;
        relLabel.className = `${c.text}`;

        const relContainer = document.getElementById('related-products');
        related.forEach(p => {
            const detailUrl = `mietartikel-details.html?id=${encodeURIComponent(p.id)}&name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(p.price)}&category=${encodeURIComponent(p.category)}&img=${encodeURIComponent(p.img)}&max=${encodeURIComponent(p.max)}`;
            const card = document.createElement('a');
            card.href = detailUrl;
            card.className = 'liquid-glass rounded-2xl overflow-hidden flex flex-col border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group';
            card.innerHTML = `
                <div class="h-48 bg-background-dark flex items-center justify-center p-4 overflow-hidden">
                    <img src="${p.img}" alt="${p.name}" onerror="this.src='Bilder/Placeholder/Placeholder.webp'"
                         class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-lg"/>
                </div>
                <div class="p-4 flex flex-col gap-2">
                    <p class="font-black text-white text-sm leading-tight">${p.name}</p>
                    <p class="${c.text} font-bold text-sm">${p.price.toFixed(2).replace('.',',')} € <span class="text-slate-500 text-xs font-normal">/ Tag</span></p>
                </div>`;
            relContainer.appendChild(card);
        });
    });
    </script>
```

- [ ] **Schritt 3: Prüfen im Browser**

Öffne: `mietartikel-details.html?id=tontechnik-ld-icoa-12a-bt&name=LD+ICOA+12A+BT&price=25&category=tontechnik&img=Bilder%2FMiet-Sortiment%2FTon%2FLD+12+Icoa.webp&max=2`

Erwartetes Ergebnis:
- Produktname „LD ICOA 12A BT" in der H1
- Produktbild korrekt geladen
- Preis „25,00 € / Tag"
- Kategorie-Badge in Cyan
- Breadcrumb zeigt „Tontechnik > LD ICOA 12A BT"
- „Ähnliche Tontechnik" zeigt bis zu 3 andere Ton-Produkte
- „In den Warenkorb" fügt Artikel in localStorage ein

- [ ] **Schritt 4: Commit**

```bash
git add mietartikel-details.html
git commit -m "feat: make mietartikel-details.html dynamic via URL params"
```

---

## Task 2: Details-Links auf allen Katalogseiten (via main.js)

**Dateien:**
- Modify: `js/main.js` (nach dem `addToCartBtns.forEach(...)` Block, ca. Zeile 164)

### Überblick
Ein einziger JS-Block in `main.js` iteriert alle `.add-to-cart-btn` Elemente und fügt nach ihrem Container-Div einen „Details ansehen"-Link ein. Funktioniert automatisch auf allen 4 Katalogseiten.

- [ ] **Schritt 1: Details-Link-Generator in main.js einfügen**

Füge nach dem schließenden `});` des `addToCartBtns.forEach(...)` Blocks (nach Zeile 164) folgenden Code ein:

```javascript
    // Details-Links für alle Produktkarten generieren
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        const id       = btn.getAttribute('data-id');
        const name     = btn.getAttribute('data-name');
        const price    = btn.getAttribute('data-price');
        const category = btn.getAttribute('data-category');
        const img      = btn.getAttribute('data-img');
        const max      = btn.getAttribute('data-max') || '1';

        const url = `mietartikel-details.html?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&category=${encodeURIComponent(category)}&img=${encodeURIComponent(img)}&max=${encodeURIComponent(max)}`;

        const link = document.createElement('a');
        link.href = url;
        link.className = 'details-link mt-2 w-full text-center text-slate-500 hover:text-white text-xs font-medium py-1.5 transition-colors flex items-center justify-center gap-1 rounded-lg hover:bg-white/5';
        link.innerHTML = '<span class="material-symbols-outlined text-[14px]">open_in_new</span> Details ansehen';

        const container = btn.closest('.flex.items-center.gap-2');
        if (container) container.insertAdjacentElement('afterend', link);
    });
```

- [ ] **Schritt 2: Prüfen auf tontechnik.html**

Öffne `tontechnik.html` im Browser. Unter jedem „In den Warenkorb"-Button soll ein kleiner „Details ansehen"-Link erscheinen. Klick darauf navigiert zur Detailseite mit korrekten URL-Params.

- [ ] **Schritt 3: Commit**

```bash
git add js/main.js
git commit -m "feat: auto-generate product details links on catalog pages"
```

---

## Task 3: Google-Bewertungsbadge auf index.html

**Dateien:**
- Modify: `index.html` (nach Zeile 118, nach dem `</div>` der Hero-Buttons)

- [ ] **Schritt 1: Badge nach Hero-Buttons einfügen**

Ersetze in `index.html` (Zeile 118–119):
```html
                </div>
            </div>
        </section>
```
mit:
```html
                </div>

                <!-- Google-Bewertung -->
                <div class="flex items-center justify-center mt-6">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div class="flex text-amber-400 text-sm leading-none">★★★★★</div>
                        <span class="text-white font-bold text-sm">4,8</span>
                        <span class="text-slate-400 text-xs">· 54 Google-Bewertungen</span>
                        <svg class="h-3.5 opacity-70" viewBox="0 0 74 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z" fill="#4285F4"/>
                            <path d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#EA4335"/>
                            <path d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3C47.53 6.19 45 8.72 45 12c0 3.26 2.53 5.81 5.43 5.81 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.13-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1zm-2.93 7.03c-1.76 0-3.1-1.5-3.1-3.52 0-2.05 1.34-3.52 3.1-3.52 1.74 0 3.1 1.49 3.1 3.54.01 2.03-1.36 3.5-3.1 3.5z" fill="#4285F4"/>
                            <path d="M38 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#FBBC05"/>
                            <path d="M58 .24h2.51v17.57H58z" fill="#34A853"/>
                            <path d="M63.93 14.06c-.68 0-1.16-.31-1.47-.93l4.07-1.68-.14-.35c-.26-.7-1.06-1.99-2.68-1.99-1.61 0-2.95 1.27-2.95 3.26 0 1.83 1.32 3.26 3.1 3.26 1.43 0 2.26-.88 2.6-1.39l-1.06-.71c-.36.52-.84.87-1.47.87zm-.1-4.01c.55 0 1.02.28 1.18.68l-2.83 1.17c-.02-1.98 1.4-1.85 1.65-1.85z" fill="#EA4335"/>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
```

- [ ] **Schritt 2: Prüfen**

Öffne `index.html`. Unter den Hero-Buttons soll das Google-Rating-Badge erscheinen: 5 gelbe Sterne, „4,8", „54 Google-Bewertungen", Google-Logo.

- [ ] **Schritt 3: Commit**

```bash
git add index.html
git commit -m "feat: add Google rating badge to hero section"
```

---

## Task 4: „So funktioniert's" Sektion auf index.html

**Dateien:**
- Modify: `index.html` (nach dem `</section>` des Hero, vor der `id="kategorien"` Section, ca. Zeile 122)

- [ ] **Schritt 1: Sektion einfügen**

Suche in `index.html` die Zeile:
```html
        <!-- Categories Section -->
        <section id="kategorien" class="py-24 px-6 max-w-7xl mx-auto relative z-10 -mt-20">
```

Füge **davor** folgendes ein:

```html
        <!-- So funktioniert's -->
        <section class="py-20 px-6 max-w-5xl mx-auto relative z-10">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-black text-white mb-3">So einfach geht's</h2>
                <p class="text-slate-400">In 3 Schritten zum perfekten Event</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                <!-- Verbindungslinie Desktop -->
                <div class="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

                <!-- Schritt 1 -->
                <div class="liquid-glass rounded-2xl p-8 flex flex-col items-center text-center border border-white/5 hover:border-primary/20 transition-all group">
                    <div class="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-lg mb-5 group-hover:scale-110 transition-transform">1</div>
                    <span class="material-symbols-outlined text-3xl text-primary mb-4">shopping_cart</span>
                    <h3 class="text-lg font-black text-white mb-2">Auswählen</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">Wähle dein Equipment aus unserem Sortiment und leg es in den Warenkorb.</p>
                </div>

                <!-- Schritt 2 -->
                <div class="liquid-glass rounded-2xl p-8 flex flex-col items-center text-center border border-white/5 hover:border-amber-500/20 transition-all group">
                    <div class="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-black text-lg mb-5 group-hover:scale-110 transition-transform">2</div>
                    <span class="material-symbols-outlined text-3xl text-amber-500 mb-4">send</span>
                    <h3 class="text-lg font-black text-white mb-2">Anfragen</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">Sende uns deine unverbindliche Anfrage — wir melden uns schnell mit einem Angebot.</p>
                </div>

                <!-- Schritt 3 -->
                <div class="liquid-glass rounded-2xl p-8 flex flex-col items-center text-center border border-white/5 hover:border-green-500/20 transition-all group">
                    <div class="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 font-black text-lg mb-5 group-hover:scale-110 transition-transform">3</div>
                    <span class="material-symbols-outlined text-3xl text-green-500 mb-4">celebration</span>
                    <h3 class="text-lg font-black text-white mb-2">Loslegen</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">Hol das Equipment ab oder lass es liefern — und feier ein unvergessliches Event.</p>
                </div>
            </div>
        </section>
```

- [ ] **Schritt 2: Prüfen**

Öffne `index.html`. Zwischen Hero und dem Kategorien-Grid soll eine neue Sektion mit 3 Schritten erscheinen.

- [ ] **Schritt 3: Commit**

```bash
git add index.html
git commit -m "feat: add 'So funktioniert es' 3-step section to homepage"
```

---

## Task 5: SEO Product Schema (via main.js)

**Dateien:**
- Modify: `js/main.js` (am Ende des `DOMContentLoaded`-Blocks, vor der Mobile-Menu-Logik)

- [ ] **Schritt 1: Schema-Generator in main.js einfügen**

Füge nach dem Details-Link-Generator (aus Task 2) folgenden Block ein:

```javascript
    // SEO: Product Schema für alle Katalogprodukte generieren
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        const schema = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            'name': btn.getAttribute('data-name'),
            'image': `https://bws-veranstaltungstechnik.de/${btn.getAttribute('data-img')}`,
            'description': `${btn.getAttribute('data-name')} zur Miete bei BWS Veranstaltungstechnik GbR in der Eifel`,
            'offers': {
                '@type': 'Offer',
                'price': btn.getAttribute('data-price'),
                'priceCurrency': 'EUR',
                'availability': 'https://schema.org/InStock',
                'priceValidUntil': `${new Date().getFullYear() + 1}-12-31`,
                'seller': {
                    '@type': 'Organization',
                    'name': 'BWS Veranstaltungstechnik GbR'
                }
            }
        };
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    });
```

- [ ] **Schritt 2: Prüfen**

Öffne `tontechnik.html`, öffne DevTools → Elements → `<head>`. Am Ende des `<head>` sollen mehrere `<script type="application/ld+json">` Tags mit Produktdaten erscheinen.

Alternativ: Google Rich Results Test mit der URL aufrufen und auf `Product` Schema prüfen.

- [ ] **Schritt 3: Commit**

```bash
git add js/main.js
git commit -m "feat: generate SEO product schema for all catalog products"
```

---

## Verifikations-Checkliste

- [ ] `mietartikel-details.html?id=tontechnik-ld-icoa-12a-bt&name=LD+ICOA+12A+BT&price=25&category=tontechnik&img=Bilder%2FMiet-Sortiment%2FTon%2FLD+12+Icoa.webp&max=2` — Seite lädt korrekt, Farben Cyan, Bild vorhanden
- [ ] „In den Warenkorb" auf Detailseite → Artikel in `bws_cart` localStorage
- [ ] Auf `tontechnik.html`: jede Produktkarte hat „Details ansehen"-Link
- [ ] Auf `index.html`: Google-Badge unter Hero-Buttons sichtbar
- [ ] Auf `index.html`: „So funktioniert's"-Sektion zwischen Hero und Kategorien sichtbar
- [ ] DevTools `<head>` auf `tontechnik.html`: JSON-LD Product Schema vorhanden
