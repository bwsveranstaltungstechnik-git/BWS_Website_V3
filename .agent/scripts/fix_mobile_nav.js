const fs = require('fs');
const path = require('path');

const htmlFiles = [
    'index.html',
    'tontechnik.html',
    'lichttechnik.html',
    'event-zubehoer.html',
    'dj-service.html',
    'impressionen.html',
    'impressum.html',
    'warenkorb.html',
    'mietartikel-details.html'
];

const mobileMenuHtml = `

    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="fixed inset-0 z-[100] bg-background-dark/95 backdrop-blur-xl translate-x-full transition-transform duration-300 flex flex-col md:hidden">
        <div class="flex items-center justify-between p-6 border-b border-white/10 mt-safe">
            <span class="text-xl font-black uppercase text-white">Menu</span>
            <button id="mobile-menu-close" class="w-10 h-10 flex items-center justify-center text-white rounded-lg hover:bg-white/10 transition-colors">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
        <div class="flex flex-col p-6 gap-6 overflow-y-auto pb-safe">
            <a href="index.html" class="text-2xl font-black text-white hover:text-primary transition-colors mobile-link">Startseite</a>
            <a href="lichttechnik.html" class="text-2xl font-black text-white hover:text-amber-500 transition-colors mobile-link">Licht</a>
            <a href="tontechnik.html" class="text-2xl font-black text-white hover:text-cyan-500 transition-colors mobile-link">Ton</a>
            <a href="event-zubehoer.html" class="text-2xl font-black text-white hover:text-green-500 transition-colors mobile-link">Zubehör</a>
            <a href="dj-service.html" class="text-2xl font-black text-white hover:text-purple-500 transition-colors mobile-link">DJ Service</a>
            <hr class="border-white/10 my-2" />
            <a href="warenkorb.html" class="text-xl font-bold flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mobile-link"><span class="material-symbols-outlined">shopping_cart</span> Warenkorb</a>
            <a href="impressionen.html" class="text-xl font-bold text-slate-400 hover:text-white transition-colors mobile-link">Impressionen</a>
            <a href="impressum.html" class="text-xl font-bold text-slate-400 hover:text-white transition-colors mobile-link">Unternehmen</a>
        </div>
    </div>`;

htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Add overflow-x-hidden to body
    content = content.replace(/<body class="([^"]+)">/, (match, p1) => {
        if (!p1.includes('overflow-x-hidden')) {
            return `<body class="${p1} overflow-x-hidden">`;
        }
        return match;
    });

    // Extract the <nav> block
    const navMatch = content.match(/<nav[\s\S]*?<\/nav>/);
    if (navMatch) {
        let navContent = navMatch[0];
        
        // 2. Modify the Warenkorb button
        // Replace "Warenkorb" text with "<span class="hidden sm:inline">Warenkorb</span>" inside the Warenkorb link
        // We look for: <a href="warenkorb.html"...>...Warenkorb...</a>
        const btnRegex = /<a href="warenkorb\.html"[^>]*>([\s\S]*?)<\/a>/g;
        navContent = navContent.replace(btnRegex, (match, innerHtml) => {
            let newInner = innerHtml;
            // Only replace bare "Warenkorb" text, not if it's already wrapped
            if (!newInner.includes('<span class="hidden sm:inline">Warenkorb</span>')) {
                // simple replacement of the text "Warenkorb"
                newInner = newInner.replace(/\bWarenkorb\b/, '<span class="hidden sm:inline">Warenkorb</span>');
            }
            
            // Reconstruct the <a> tag
            let newA = match.replace(innerHtml, newInner);
            
            // Add hamburger button
            if (!content.includes('id="mobile-menu-open"')) {
                newA += `\n                <button id="mobile-menu-open" class="md:hidden flex items-center justify-center w-10 h-10 text-white rounded-lg hover:bg-white/10 transition-colors ml-2">
                    <span class="material-symbols-outlined">menu</span>
                </button>`;
            }
            return newA;
        });
        
        // 3. Add mobile menu overlay right after </nav>
        let newNavAndMenu = navContent;
        if (!content.includes('id="mobile-menu"')) {
            newNavAndMenu += mobileMenuHtml;
        }
        
        content = content.replace(navMatch[0], newNavAndMenu);
    }
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log("Updated HTML files!");
