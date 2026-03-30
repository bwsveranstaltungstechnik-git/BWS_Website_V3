document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------
    // Category Filtering Logic
    // -----------------------------------------
    const categoryFiltersContainer = document.getElementById('category-filters');
    const productGrid = document.getElementById('product-grid');

    if (categoryFiltersContainer && productGrid) {
        const filterBtns = categoryFiltersContainer.querySelectorAll('.category-btn');
        const activeClassStr = categoryFiltersContainer.getAttribute('data-active-class') || '';
        const inactiveClassStr = categoryFiltersContainer.getAttribute('data-inactive-class') || '';

        const activeClasses = activeClassStr.split(' ').filter(c => c.trim() !== '');
        const inactiveClasses = inactiveClassStr.split(' ').filter(c => c.trim() !== '');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get the filter category
                const filter = btn.getAttribute('data-filter') || btn.closest('.category-btn').getAttribute('data-filter');

                // 1. Update button states
                filterBtns.forEach(b => {
                    // Remove active classes, add inactive classes
                    b.classList.remove(...activeClasses);
                    b.classList.add(...inactiveClasses);
                });

                // Add active classes to the clicked button, remove inactive classes
                btn.classList.remove(...inactiveClasses);
                btn.classList.add(...activeClasses);

                // 2. Filter products
                const products = productGrid.querySelectorAll('.product-card');
                products.forEach(product => {
                    if (filter === 'all' || product.getAttribute('data-category') === filter) {
                        product.style.display = ''; // Reset display to default (which is flex)
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }

    // -----------------------------------------
    // Shopping Cart Logic (Global)
    // -----------------------------------------
    
    // Function to update the cart badge in the navbar
    const updateCartBadge = () => {
        const cart = JSON.parse(localStorage.getItem('bws_cart')) || [];
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        
        const cartLinks = document.querySelectorAll('nav a[href="warenkorb.html"]');
        cartLinks.forEach(link => {
            if (!link.classList.contains('relative')) link.classList.add('relative');
            
            let badge = link.querySelector('.cart-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = "absolute -top-1 -right-1 bg-white text-slate-900 border-slate-200 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border cart-badge";
                // If the link has text-amber-500 or cyan etc, we could try to inherit it, but black on white works universally well as a badge counter.
                link.appendChild(badge);
            }
            
            if (itemCount > 0) {
                badge.textContent = itemCount;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        });
    };

    // Initialize Badge on page load
    updateCartBadge();

    // Quantity Selector Logic (on catalog pages)
    document.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const display = document.getElementById('qty-' + targetId);
            if (display) {
                let val = parseInt(display.textContent) || 1;
                if (val > 1) display.textContent = val - 1;
            }
        });
    });
    document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const maxQty = parseInt(btn.getAttribute('data-max')) || 99;
            const display = document.getElementById('qty-' + targetId);
            if (display) {
                let val = parseInt(display.textContent) || 1;
                if (val < maxQty) {
                    display.textContent = val + 1;
                } else {
                    btn.style.color = '#ef4444';
                    setTimeout(() => { btn.style.color = ''; }, 500);
                }
            }
        });
    });

    // Add to cart functionality (with quantity selector and max limit)
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const id = btn.getAttribute('data-id');
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));
            const category = btn.getAttribute('data-category');
            const img = btn.getAttribute('data-img');
            const maxQty = parseInt(btn.getAttribute('data-max')) || 99;

            // Get selected quantity from the qty selector
            const qtyDisplay = document.getElementById('qty-' + id);
            const selectedQty = qtyDisplay ? parseInt(qtyDisplay.textContent) || 1 : 1;

            let cart = JSON.parse(localStorage.getItem('bws_cart')) || [];
            
            const existingItemIndex = cart.findIndex(item => item.id === id);
            if (existingItemIndex > -1) {
                const newQty = cart[existingItemIndex].quantity + selectedQty;
                if (newQty > maxQty) {
                    cart[existingItemIndex].quantity = maxQty;
                    const originalText = btn.innerHTML;
                    btn.innerHTML = `<span class="material-symbols-outlined text-sm">block</span> Max. ${maxQty} Stück`;
                    btn.classList.add('!bg-red-500/20', '!text-red-400', '!border-red-500/30');
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.remove('!bg-red-500/20', '!text-red-400', '!border-red-500/30');
                    }, 2000);
                } else {
                    cart[existingItemIndex].quantity = newQty;
                }
            } else {
                const qty = Math.min(selectedQty, maxQty);
                cart.push({ id, name, price, category, img, quantity: qty, maxQty });
            }
            
            localStorage.setItem('bws_cart', JSON.stringify(cart));
            updateCartBadge();
            
            // Visual feedback
            const originalText = btn.innerHTML;
            if (!btn.classList.contains('!bg-red-500/20')) {
                btn.innerHTML = `<span class="material-symbols-outlined text-sm">check</span> ${selectedQty}x hinzugefügt`;
                btn.classList.add('!bg-green-500/20', '!text-green-400', '!border-green-500/30');
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('!bg-green-500/20', '!text-green-400', '!border-green-500/30');
                }, 1500);
            }
            
            // Reset qty selector to 1
            if (qtyDisplay) qtyDisplay.textContent = '1';
        });
    });

    // -----------------------------------------
    // Cart Page Rendering & Logic
    // -----------------------------------------
    const cartItemsContainer = document.getElementById('cart-items-container');
    if (cartItemsContainer) {
        // We are on the cart page
        
        let rentFactor = 1.0;
        let rentDays = 1;

        const dateStartInput = document.getElementById('rent-start');
        const dateEndInput = document.getElementById('rent-end');
        const durationText = document.getElementById('rent-duration-text');
        const factorText = document.getElementById('rent-factor-text');
        const warningBox = document.getElementById('long-rental-warning');

        // Set default dates (Today and Tomorrow)
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        dateStartInput.valueAsDate = today;
        dateEndInput.valueAsDate = tomorrow;

        const calculateFactor = () => {
            const start = dateStartInput.valueAsDate;
            const end = dateEndInput.valueAsDate;
            
            if (!start || !end) return;

            // Calculate diff in days (inclusive, so if start=end -> 1 day, start=X end=X+1 -> 2 days etc.)
            // Or usually: Event rental day is usage days. Let's assume start to end is total days. e.g. 15th to 16th = 2 days.
            // Let's assume end - start = diff. 15th to 16th is 1 day difference. But usually it counts as 1 rental day for a 24h period, maybe 2 days for usage. 
            // In typical rental: 1 day usage, pickup day before, return day after = 1 rental day.
            // Let's just do diff in days = (end - start) / ms_per_day. If 0, then 1 day.
            let diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
            // Let's say minimum is 1 day. 
            if (diffDays <= 0) diffDays = 1;
            
            rentDays = diffDays;

            // Factor logic: 1 -> 1.0, 2 -> 1.5, 3 -> 1.9, 4 -> 2.2, 5 -> 2.5
            const factors = [1.0, 1.0, 1.5, 1.9, 2.2, 2.5]; // index is days (1 to 5)
            
            if (rentDays <= 5) {
                rentFactor = factors[rentDays];
                warningBox.classList.add('hidden');
            } else {
                // > 5 days -> 2.5 + 0.2 per extra day as default calc
                rentFactor = 2.5 + ((rentDays - 5) * 0.2);
                warningBox.classList.remove('hidden');
            }

            durationText.textContent = `${rentDays} TAG${rentDays > 1 ? 'E' : ''}`;
            factorText.textContent = rentFactor.toFixed(1);
            
            document.getElementById('summary-days-text').textContent = `${rentDays} Tag${rentDays > 1 ? 'e' : ''}`;

            renderCart();
        };

        dateStartInput.addEventListener('change', calculateFactor);
        dateEndInput.addEventListener('change', calculateFactor);

        const renderCart = () => {
            const cart = JSON.parse(localStorage.getItem('bws_cart')) || [];
            cartItemsContainer.innerHTML = '';

            let totalNetto = 0;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="liquid-glass rounded-xl p-8 text-center text-slate-400 border border-white/5">
                        <span class="material-symbols-outlined text-4xl mb-3 opacity-50">production_quantity_limits</span>
                        <p>Dein Warenkorb ist leer.</p>
                        <a href="tontechnik.html" class="inline-block mt-4 text-amber-500 hover:text-amber-400 font-bold">Zum Sortiment</a>
                    </div>
                `;
                document.getElementById('cart-title-count').textContent = `(0 Positionen)`;
                updateSummary(0);
                return;
            }

            document.getElementById('cart-title-count').textContent = `(${cart.length} Positionen)`;

            cart.forEach((item) => {
                const itemTotal = item.price * item.quantity * rentFactor;
                totalNetto += itemTotal;

                // Color themes based on category
                let colorTheme = 'amber';
                if (item.category === 'tontechnik') colorTheme = 'cyan';
                else if (item.category === 'lichttechnik') colorTheme = 'amber';
                else if (item.category === 'event-zubehoer') colorTheme = 'green';
                else if (item.category === 'dj-service') colorTheme = 'purple';

                const div = document.createElement('div');
                div.className = `liquid-glass rounded-xl p-4 flex gap-6 items-center group border-l-4 border-l-transparent hover:border-l-${colorTheme}-500 transition-all relative overflow-hidden glass-card`;
                div.innerHTML = `
                    <div class="absolute top-0 left-0 w-1 p-2 h-full bg-${colorTheme}-500/5 group-hover:bg-${colorTheme}-500/10 transition-colors duration-300"></div>
                    <div class="h-24 w-24 rounded-lg bg-black/40 shrink-0 border border-white/10 flex items-center justify-center p-2">
                        <img alt="${item.name}" class="h-full w-full object-contain" src="${item.img || 'Bilder/Platzhalter.png'}"/>
                    </div>
                    <div class="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                        <div>
                            <h3 class="font-black text-lg text-slate-100 group-hover:text-${colorTheme}-500 transition-colors">${item.name}</h3>
                            <p class="text-slate-400 text-sm capitalize">${item.category}</p>
                            <p class="text-${colorTheme}-500 text-sm font-bold mt-1">${item.price.toFixed(2).replace('.', ',')} € <span class="text-[10px] text-slate-500 uppercase font-normal">/ Tag</span></p>
                        </div>
                        <div class="flex items-center gap-6 flex-wrap">
                            <div class="flex items-center bg-black/40 rounded-lg p-1 border border-white/10">
                                <button class="h-8 w-8 flex items-center justify-center hover:bg-white/5 rounded transition-colors text-slate-400 decrease-qty" data-id="${item.id}">-</button>
                                <span class="w-8 text-center font-bold text-white">${item.quantity}</span>
                                <button class="h-8 w-8 flex items-center justify-center hover:bg-white/5 rounded text-${colorTheme}-500 transition-colors increase-qty" data-id="${item.id}">+</button>
                            </div>
                            <div class="text-right min-w-[80px]">
                                <p class="text-[10px] text-slate-400 uppercase font-bold">Gesamt (inkl. Faktor)</p>
                                <p class="font-black text-lg text-white">${itemTotal.toFixed(2).replace('.', ',')} €</p>
                            </div>
                            <button class="text-slate-500 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg remove-item" data-id="${item.id}">
                                <span class="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(div);
            });

            // Bind events for dynamically created buttons
            document.querySelectorAll('.increase-qty').forEach(btn => {
                btn.addEventListener('click', () => changeQuantity(btn.getAttribute('data-id'), 1));
            });
            document.querySelectorAll('.decrease-qty').forEach(btn => {
                btn.addEventListener('click', () => changeQuantity(btn.getAttribute('data-id'), -1));
            });
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', () => removeItem(btn.getAttribute('data-id')));
            });

            updateSummary(totalNetto);
        };

        const updateSummary = (netto) => {
            document.getElementById('summary-netto').textContent = `${netto.toFixed(2).replace('.', ',')} €`;
            document.getElementById('summary-brutto').textContent = `${netto.toFixed(2).replace('.', ',')} €`;
            populateHiddenFields();
        };

        const populateHiddenFields = () => {
            const cart = JSON.parse(localStorage.getItem('bws_cart')) || [];
            const cartField = document.getElementById('hidden-cart-inhalt');
            const mietdauerField = document.getElementById('hidden-mietdauer');
            const logistikField = document.getElementById('hidden-logistik');
            const gesamtField = document.getElementById('hidden-gesamtbetrag');

            if (cartField) {
                if (cart.length === 0) {
                    cartField.value = 'Kein Artikel im Warenkorb.';
                } else {
                    let cartText = 'Mietanfrage – Artikelliste:\n';
                    cart.forEach(item => {
                        cartText += `- ${item.name} (${item.quantity}x) — ${item.price.toFixed(2)} €/Tag\n`;
                    });
                    cartField.value = cartText;
                }
            }

            if (mietdauerField) {
                const startEl = document.getElementById('rent-start');
                const endEl = document.getElementById('rent-end');
                if (startEl && endEl) {
                    mietdauerField.value = `${startEl.value} bis ${endEl.value} (${rentDays} Tag${rentDays > 1 ? 'e' : ''}, Faktor ${rentFactor.toFixed(1)})`;
                }
            }

            if (logistikField) {
                const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
                let logistikValue = 'Selbstabholung';
                deliveryRadios.forEach((radio, i) => {
                    if (radio.checked && i === 1) logistikValue = 'Lieferung & Aufbau';
                });
                logistikField.value = logistikValue;
            }

            if (gesamtField) {
                const bruttoEl = document.getElementById('summary-brutto');
                if (bruttoEl) gesamtField.value = bruttoEl.textContent;
            }
        };

        const changeQuantity = (id, delta) => {
            let cart = JSON.parse(localStorage.getItem('bws_cart')) || [];
            const index = cart.findIndex(item => item.id === id);
            if (index > -1) {
                const maxQty = cart[index].maxQty || 99;
                let newQty = cart[index].quantity + delta;
                if (newQty <= 0) {
                    cart.splice(index, 1);
                } else if (newQty > maxQty) {
                    cart[index].quantity = maxQty;
                } else {
                    cart[index].quantity = newQty;
                }
                localStorage.setItem('bws_cart', JSON.stringify(cart));
                updateCartBadge();
                renderCart();
            }
        };

        const removeItem = (id) => {
            let cart = JSON.parse(localStorage.getItem('bws_cart')) || [];
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('bws_cart', JSON.stringify(cart));
            updateCartBadge();
            renderCart();
        };

        document.getElementById('clear-cart-btn')?.addEventListener('click', () => {
            if(confirm('Möchtest du die Liste wirklich leeren?')) {
                localStorage.removeItem('bws_cart');
                updateCartBadge();
                renderCart();
            }
        });

        // Update hidden fields when logistics selection changes
        document.querySelectorAll('input[name="delivery"]').forEach(radio => {
            radio.addEventListener('change', populateHiddenFields);
        });

        // Angebot speichern
        document.getElementById('save-offer-btn')?.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('bws_cart')) || [];
            const startEl = document.getElementById('rent-start');
            const endEl = document.getElementById('rent-end');
            const savedOffer = {
                cart,
                startDate: startEl?.value || '',
                endDate: endEl?.value || '',
                timestamp: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
            };
            localStorage.setItem('bws_saved_offer', JSON.stringify(savedOffer));

            const btn = document.getElementById('save-offer-btn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<span class="material-symbols-outlined text-sm">check</span> Angebot gespeichert ✓';
            btn.classList.add('!bg-green-500/20', '!text-green-400', '!border-green-500/30');
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('!bg-green-500/20', '!text-green-400', '!border-green-500/30');
            }, 2000);
        });

        // Check for saved offer on load and show banner if present
        const savedOffer = JSON.parse(localStorage.getItem('bws_saved_offer'));
        if (savedOffer) {
            const banner = document.getElementById('saved-offer-banner');
            const dateEl = document.getElementById('saved-offer-date');
            if (banner) {
                banner.classList.remove('hidden');
                if (dateEl) dateEl.textContent = `Gespeichert am ${savedOffer.timestamp}`;
            }
        }

        document.getElementById('load-offer-btn')?.addEventListener('click', () => {
            const offer = JSON.parse(localStorage.getItem('bws_saved_offer'));
            if (offer) {
                localStorage.setItem('bws_cart', JSON.stringify(offer.cart));
                const startEl = document.getElementById('rent-start');
                const endEl = document.getElementById('rent-end');
                if (startEl && offer.startDate) startEl.value = offer.startDate;
                if (endEl && offer.endDate) endEl.value = offer.endDate;
                document.getElementById('saved-offer-banner')?.classList.add('hidden');
                updateCartBadge();
                calculateFactor();
            }
        });

        document.getElementById('discard-offer-btn')?.addEventListener('click', () => {
            localStorage.removeItem('bws_saved_offer');
            document.getElementById('saved-offer-banner')?.classList.add('hidden');
        });

        // Initial Calculation
        calculateFactor();
    }

    // -----------------------------------------
    // Mobile Menu Logic
    // -----------------------------------------
    const mobileMenuOpen = document.getElementById('mobile-menu-open');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuOpen && mobileMenuClose && mobileMenu) {
        mobileMenuOpen.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            });
        });
    }

    console.log('Main JS loaded');
});
