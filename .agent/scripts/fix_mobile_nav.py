import os
import re

html_files = [
    'index.html',
    'tontechnik.html',
    'lichttechnik.html',
    'event-zubehoer.html',
    'dj-service.html',
    'impressionen.html',
    'impressum.html',
    'warenkorb.html',
    'mietartikel-details.html'
]

mobile_menu_html = """
    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="fixed inset-0 z-[100] bg-background-dark/95 backdrop-blur-xl translate-x-full transition-transform duration-300 flex flex-col md:hidden">
        <div class="flex items-center justify-between p-6 border-b border-white/10 pt-safe">
            <span class="text-xl font-black uppercase text-white">Menu</span>
            <button id="mobile-menu-close" class="w-10 h-10 flex items-center justify-center text-white rounded-lg hover:bg-white/10 transition-colors">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
        <div class="flex flex-col p-6 gap-6 overflow-y-auto">
            <a href="index.html" class="text-2xl font-black text-white hover:text-primary transition-colors">Startseite</a>
            <a href="lichttechnik.html" class="text-2xl font-black text-white hover:text-amber-500 transition-colors">Licht</a>
            <a href="tontechnik.html" class="text-2xl font-black text-white hover:text-cyan-500 transition-colors">Ton</a>
            <a href="event-zubehoer.html" class="text-2xl font-black text-white hover:text-green-500 transition-colors">Zubehör</a>
            <a href="dj-service.html" class="text-2xl font-black text-white hover:text-purple-500 transition-colors">DJ Service</a>
            <hr class="border-white/10 my-2" />
            <a href="impressionen.html" class="text-xl font-bold text-slate-400 hover:text-white transition-colors">Impressionen</a>
            <a href="impressum.html" class="text-xl font-bold text-slate-400 hover:text-white transition-colors">Unternehmen</a>
        </div>
    </div>
"""

for file in html_files:
    if not os.path.exists(file):
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Add overflow-x-hidden to body
    content = re.sub(r'<body class="([^"]+)">', lambda m: f'<body class="{m.group(1)} overflow-x-hidden">' if 'overflow-x-hidden' not in m.group(1) else m.group(0), content)
    
    # 2. Modify the Warenkorb button to include the hamburger menu
    # The div looks like: <div class="flex items-center gap-4"> ... </div>
    # and ends just before </div> </nav>
    
    # Find the closing tag of the <div class="flex items-center gap-4"> block
    # It usually contains the <a href="warenkorb.html"...> block and then a closing </div>
    
    # Let's use a regex to inject the mobile menu button right after the Warenkorb </a>
    # Specifically looking for the Warenkorb </a> inside the nav
    nav_btn_pattern = r'(<a href="warenkorb.html"[^>]*>[\s\S]*?Warenkorb[\s\S]*?</a>)'
    
    def repl_nav_btn(match):
        orig_a = match.group(1)
        # make the text "Warenkorb" hidden on sm to save space
        # replacing bare "Warenkorb" with "<span class="hidden sm:inline">Warenkorb</span>"
        # Since it's indented, it might be "\n                    Warenkorb\n"
        if '<span class="hidden sm:inline">Warenkorb</span>' not in orig_a:
            orig_a = re.sub(r'Warenkorb', r'<span class="hidden sm:inline">Warenkorb</span>', orig_a, count=1)
        
        hamburger = """
                <button id="mobile-menu-open" class="md:hidden flex items-center justify-center w-10 h-10 text-white rounded-lg hover:bg-white/10 transition-colors ml-2">
                    <span class="material-symbols-outlined">menu</span>
                </button>"""
        if 'id="mobile-menu-open"' not in content:
            return orig_a + hamburger
        return orig_a

    # Only replace inside the <nav> block
    nav_match = re.search(r'<nav.*?</nav>', content, re.DOTALL)
    if nav_match:
        nav_content = nav_match.group(0)
        nav_content_new = re.sub(nav_btn_pattern, repl_nav_btn, nav_content, count=1)
        
        # 3. Add mobile menu overlay after </nav>
        if 'id="mobile-menu"' not in content:
            nav_content_new += mobile_menu_html
            
        content = content.replace(nav_content, nav_content_new)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Updated HTML files!")
