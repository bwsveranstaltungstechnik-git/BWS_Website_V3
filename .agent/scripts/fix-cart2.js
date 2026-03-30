const fs = require('fs');

const files = ['lichttechnik.html', 'tontechnik.html', 'event-zubehoer.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');
    
    // Determine category
    let category = 'lichttechnik';
    if (file.includes('tontechnik')) category = 'tontechnik';
    if (file.includes('event-zubehoer')) category = 'event-zubehoer';
    
    let counter = 0;
    
    // Split into lines for context-aware processing
    const lines = html.split('\n');
    const newLines = [];
    
    // Track context as we go through lines
    let lastImgSrc = '';
    let lastAvailQty = 1;
    let lastName = '';
    let lastPrice = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Track image src
        const imgMatch = line.match(/src="(Bilder\/Miet-Sortiment\/[^"]+)"/);
        if (imgMatch) lastImgSrc = imgMatch[1];
        
        // Track availability
        const availMatch = line.match(/(\d+)\s*St..?ck verf..?gbar/i);
        if (availMatch) lastAvailQty = parseInt(availMatch[1]);
        
        // Track product name from h3
        const nameMatch = line.match(/<h3[^>]*>([^<]+)<\/h3>/);
        if (nameMatch) lastName = nameMatch[1].trim();
        
        // Track price
        const priceMatch = line.match(/>(\d+(?:,\d+)?)€</);
        if (priceMatch) lastPrice = parseFloat(priceMatch[1].replace(',', '.'));
        
        // Also try "ab X€" pattern
        const priceMatch2 = line.match(/>ab (\d+(?:,\d+)?)€</);
        if (priceMatch2) lastPrice = parseFloat(priceMatch2[1].replace(',', '.'));
        
        // Check if this line contains the cart button
        if (line.includes('In den Warenkorb') && line.includes('shopping_cart')) {
            counter++;
            const id = category + '-' + lastName.toLowerCase()
                .replace(/[äÄ]/g, 'ae').replace(/[öÖ]/g, 'oe').replace(/[üÜ]/g, 'ue').replace(/[ß]/g, 'ss')
                .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 50);
            
            // Replace the single button line with qty selector + button
            const newButton = `            <div class="flex items-center gap-2">
                <div class="flex items-center bg-black/40 rounded-xl border border-white/10 overflow-hidden">
                    <button class="qty-minus h-10 w-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all text-lg font-bold" data-target="${id}">\u2212</button>
                    <span class="qty-display w-8 text-center font-black text-white text-sm" id="qty-${id}">1</span>
                    <button class="qty-plus h-10 w-10 flex items-center justify-center text-primary hover:text-white hover:bg-primary/20 transition-all text-lg font-bold" data-target="${id}" data-max="${lastAvailQty}">+</button>
                </div>
                <button class="flex-1 add-to-cart-btn bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-black font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/5 uppercase text-sm tracking-wider" data-id="${id}" data-name="${lastName}" data-price="${lastPrice}" data-category="${category}" data-img="${lastImgSrc}" data-max="${lastAvailQty}">
                    <span class="material-symbols-outlined text-[18px]">shopping_cart</span> In den Warenkorb
                </button>
            </div>`;
            
            newLines.push(newButton);
        } else {
            newLines.push(line);
        }
    }
    
    fs.writeFileSync(file, newLines.join('\n'));
    console.log(`${file}: ${counter} buttons replaced with qty selectors`);
});

console.log('Done!');
