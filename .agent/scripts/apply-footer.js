const fs = require('fs');
const path = require('path');

const newFooter = `    <!-- Footer (UI/UX Pro Max Applied) -->
    <footer class="border-t border-white/10 py-16 px-6 bg-background-dark relative overflow-hidden mt-24">
        <!-- Glow effects -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div class="absolute inset-0 z-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
        
        <div class="max-w-7xl mx-auto relative z-10 w-full">
            <!-- Top Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                <!-- Brand Info -->
                <div class="flex flex-col gap-6">
                    <a href="index.html" class="flex items-center gap-2 group w-fit">
                        <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            <span class="material-symbols-outlined text-background-dark text-xl font-bold">blur_on</span>
                        </div>
                        <span class="text-xl font-black tracking-tighter uppercase text-white">BWS Veranstaltungstechnik GbR</span>
                    </a>
                    <p class="text-slate-400 text-sm leading-relaxed">
                        Dein Premium Partner für Veranstaltungstechnik in Berlin. Höchste Qualität für unvergessliche Events.
                    </p>
                    <div class="flex items-center gap-4">
                        <a href="javascript:void(0)" class="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-slate-400 hover:text-white hover:border-primary hover:-translate-y-1 transition-all">
                            <span class="material-symbols-outlined text-[20px]">photo_camera</span>
                        </a>
                        <a href="javascript:void(0)" class="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-slate-400 hover:text-white hover:border-primary hover:-translate-y-1 transition-all">
                            <span class="material-symbols-outlined text-[20px]">smart_display</span>
                        </a>
                        <a href="javascript:void(0)" class="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-slate-400 hover:text-white hover:border-primary hover:-translate-y-1 transition-all">
                            <span class="material-symbols-outlined text-[20px]">email</span>
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="flex flex-col gap-4">
                    <h4 class="text-white font-black uppercase tracking-widest text-sm mb-2">Equipment</h4>
                    <a href="tontechnik.html" class="text-slate-400 hover:text-cyan-500 text-sm font-medium transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-500 transition-colors"></span> Tontechnik</a>
                    <a href="lichttechnik.html" class="text-slate-400 hover:text-amber-500 text-sm font-medium transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-amber-500/50 group-hover:bg-amber-500 transition-colors"></span> Lichttechnik</a>
                    <a href="event-zubehoer.html" class="text-slate-400 hover:text-green-500 text-sm font-medium transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-green-500/50 group-hover:bg-green-500 transition-colors"></span> Zubehör</a>
                    <a href="dj-service.html" class="text-slate-400 hover:text-purple-500 text-sm font-medium transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-purple-500/50 group-hover:bg-purple-500 transition-colors"></span> DJ Service</a>
                </div>

                <!-- Legal / Info -->
                <div class="flex flex-col gap-4">
                    <h4 class="text-white font-black uppercase tracking-widest text-sm mb-2">Unternehmen</h4>
                    <a href="impressionen.html" class="text-slate-400 hover:text-fuchsia-500 text-sm font-medium transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-fuchsia-500/50 group-hover:bg-fuchsia-500 transition-colors"></span> Impressionen</a>
                    <a href="impressum.html" class="text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-slate-500/50 group-hover:bg-white transition-colors"></span> Über Uns</a>
                    <a href="impressum.html#agb" class="text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-slate-500/50 group-hover:bg-white transition-colors"></span> AGB</a>
                    <a href="impressum.html#datenschutz" class="text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-slate-500/50 group-hover:bg-white transition-colors"></span> Datenschutz</a>
                </div>

                <!-- Trust Badges & Contact -->
                <div class="flex flex-col gap-4">
                    <h4 class="text-white font-black uppercase tracking-widest text-sm mb-2">Vertrauen & Kontakt</h4>
                    <div class="flex flex-col gap-3">
                        <div class="flex items-center gap-3">
                            <span class="material-symbols-outlined text-green-500">verified</span>
                            <span class="text-xs text-slate-400 font-medium">100% Geprüftes Equipment</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="material-symbols-outlined text-primary">headset_mic</span>
                            <span class="text-xs text-slate-400 font-medium">24/7 Technischer Support</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="material-symbols-outlined text-amber-500">local_shipping</span>
                            <span class="text-xs text-slate-400 font-medium">Lieferung & Aufbau verfügbar</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Section -->
            <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <p class="text-xs text-slate-500 font-medium uppercase tracking-widest">© 2026 BWS Veranstaltungstechnik GbR. Alle Rechte vorbehalten.</p>
                
                <!-- Payment Methods Placeholder using Material Icons as generic stand-ins -->
                <div class="flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                    <div class="w-10 h-6 bg-white/10 rounded flex items-center justify-center border border-white/5"><span class="material-symbols-outlined text-[16px] text-white">account_balance</span></div>
                    <div class="w-10 h-6 bg-white/10 rounded flex items-center justify-center border border-white/5"><span class="material-symbols-outlined text-[16px] text-white">credit_card</span></div>
                    <div class="w-10 h-6 bg-white/10 rounded flex items-center justify-center border border-white/5"><span class="material-symbols-outlined text-[16px] text-white">payments</span></div>
                </div>
            </div>
        </div>
    </footer>`;

const files = [
    'index.html',
    'tontechnik.html',
    'lichttechnik.html',
    'event-zubehoer.html',
    'dj-service.html',
    'mietartikel-details.html',
    'warenkorb.html',
    'impressionen.html',
    'impressum.html'
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        content = content.replace(/<footer[\s\S]*?<\/footer>/i, newFooter);
        
        content = content.replace(/class="([^"]*hover:[^"]*)"/g, (match, classes) => {
            if (!classes.includes('transition')) {
                return 'class="' + classes + ' transition-all duration-300"';
            }
            return match;
        });

        content = content.replace(/class="([^"]*hover:scale[^"]*)"/g, (match, classes) => {
            if (!classes.includes('cursor')) {
                return 'class="' + classes + ' cursor-pointer"';
            }
            return match;
        });

        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated ' + file);
    } else {
        console.error(file + ' not found.');
    }
});
