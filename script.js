// Expanded Ultra-Luxury Clothes Collection
const products = [
    {
        id: 1,
        name: "Royal Velvet Evening Tuxedo",
        category: "menswear",
        isSale: false,
        priceUSD: 2450,
        colors: ["#111", "#1b263b", "#2b1e3a"],
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
        description: "Hand-tailored velvet tuxedo with Italian silk lapels and custom gold buttons."
    },
    {
        id: 2,
        name: "Silk Chiffon Couture Gown",
        category: "womenswear",
        isSale: true,
        priceUSD: 3200,
        salePriceUSD: 2560,
        colors: ["#d4af37", "#e74c3c", "#f39c12"],
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
        description: "Pure mulberry silk gown with hand embroidery and dramatic train."
    },
    {
        id: 3,
        name: "Himalayan Cashmere Overcoat",
        category: "menswear",
        isSale: false,
        priceUSD: 1850,
        colors: ["#2b2b2b", "#7f8c8d"],
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
        description: "100% cashmere winter double-breasted coat with tailored fit."
    },
    {
        id: 4,
        name: "Gold Thread Runway Trench",
        category: "womenswear",
        isSale: true,
        priceUSD: 2100,
        salePriceUSD: 1680,
        colors: ["#d4af37", "#000"],
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
        description: "High-end trench coat featuring intricate metallic thread accents."
    },
    {
        id: 5,
        name: "Milano Embroidered Blazer",
        category: "menswear",
        isSale: false,
        priceUSD: 2900,
        colors: ["#000", "#1a2a3a"],
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
        description: "Bespoke blazer embellished with metallic thread embroidery."
    },
    {
        id: 6,
        name: "Sculptural Satin Corset Dress",
        category: "womenswear",
        isSale: true,
        priceUSD: 2750,
        salePriceUSD: 2200,
        colors: ["#8e44ad", "#2c3e50"],
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
        description: "Architectural satin corset gown for red-carpet presence."
    },
    {
        id: 7,
        name: "Emerald Royal Velvet Suit",
        category: "menswear",
        isSale: false,
        priceUSD: 3100,
        colors: ["#0f382c", "#111"],
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800",
        description: "Deep emerald velvet suit crafted for luxury galas."
    },
    {
        id: 8,
        name: "Gold Sequin Majestic Ballgown",
        category: "womenswear",
        isSale: false,
        priceUSD: 4500,
        colors: ["#d4af37"],
        image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=800",
        description: "Hand-sequined gold dress for majestic galas."
    }
];

let cart = [];
let wishlist = [];
let currentCurrency = 'USD';

const rates = {
    USD: { symbol: '$', rate: 1 },
    INR: { symbol: '₹', rate: 83 },
    EUR: { symbol: '€', rate: 0.92 }
};

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 1000, once: true });
    renderProducts(products);
    renderSwiperProducts();
    initSwiper();
    setupEventListeners();
});

function formatPrice(amountUSD) {
    const currency = rates[currentCurrency];
    const converted = Math.round(amountUSD * currency.rate);
    return `${currency.symbol}${converted.toLocaleString()}`;
}

function createProductCardHTML(product) {
    const isLiked = wishlist.includes(product.id) ? 'liked' : '';
    const heartIcon = wishlist.includes(product.id) ? 'fa-solid' : 'fa-regular';
    
    const priceDisplay = product.isSale 
        ? `<span class="old-price">${formatPrice(product.priceUSD)}</span><span class="gold-text">${formatPrice(product.salePriceUSD)}</span>`
        : `<span>${formatPrice(product.priceUSD)}</span>`;

    const swatches = product.colors.map(c => `<span class="swatch" style="background-color: ${c};"></span>`).join('');

    return `
        <div class="product-card hover-lift">
            ${product.isSale ? `<div class="product-tag">20% OFF</div>` : ''}
            <div class="wishlist-btn ${isLiked}" onclick="toggleWishlist(${product.id})">
                <i class="${heartIcon} fa-heart"></i>
            </div>
            <div class="product-image-wrap">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-actions">
                    <button class="btn-action" onclick="openQuickView(${product.id})">Quick View</button>
                    <button class="btn-action" onclick="addToCart(${product.id})">Add to Bag</button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category.toUpperCase()}</p>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${priceDisplay}</p>
                <div class="swatch-wrap">${swatches}</div>
            </div>
        </div>
    `;
}

function renderProducts(items) {
    const grid = document.getElementById('product-grid');
    if (grid) grid.innerHTML = items.map(p => createProductCardHTML(p)).join('');
}

function renderSwiperProducts() {
    const wrapper = document.getElementById('swipe-wrapper');
    if (wrapper) wrapper.innerHTML = products.map(p => `<div class="swiper-slide">${createProductCardHTML(p)}</div>`).join('');
}

function initSwiper() {
    new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 3000 },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
}

function toggleWishlist(id) {
    wishlist = wishlist.includes(id) ? wishlist.filter(i => i !== id) : [...wishlist, id];
    document.getElementById('wishlist-count').innerText = wishlist.length;
    renderProducts(products);
}

function setupEventListeners() {
    // Search Trigger
    document.getElementById('search-toggle')?.addEventListener('click', () => document.getElementById('search-container').classList.add('active'));
    document.getElementById('close-search')?.addEventListener('click', () => document.getElementById('search-container').classList.remove('active'));

    document.getElementById('search-input')?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        renderProducts(products.filter(p => p.name.toLowerCase().includes(query)));
    });

    // Modals Handlers
    document.getElementById('ai-stylist-trigger')?.addEventListener('click', () => toggleModal('ai-stylist-modal', 'ai-modal-overlay', true));
    document.getElementById('hero-ai-btn')?.addEventListener('click', () => toggleModal('ai-stylist-modal', 'ai-modal-overlay', true));
    document.getElementById('close-ai-modal')?.addEventListener('click', () => toggleModal('ai-stylist-modal', 'ai-modal-overlay', false));

    document.getElementById('open-fit-modal')?.addEventListener('click', () => toggleModal('fit-modal', 'fit-overlay', true));
    document.getElementById('close-fit')?.addEventListener('click', () => toggleModal('fit-modal', 'fit-overlay', false));

    document.getElementById('open-privacy-link')?.addEventListener('click', () => toggleModal('privacy-modal', 'privacy-overlay', true));
    document.getElementById('close-privacy')?.addEventListener('click', () => toggleModal('privacy-modal', 'privacy-overlay', false));

    document.getElementById('cart-icon')?.addEventListener('click', openCart);
    document.getElementById('close-cart')?.addEventListener('click', closeCart);
    document.getElementById('close-modal')?.addEventListener('click', closeModal);

    // Currency Change
    document.getElementById('currency-select')?.addEventListener('change', (e) => {
        currentCurrency = e.target.value;
        renderProducts(products);
        updateCartUI();
    });

    // Category Filter Handlers
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');

            if (category === 'all') renderProducts(products);
            else if (category === 'sale') renderProducts(products.filter(p => p.isSale));
            else renderProducts(products.filter(p => p.category === category));
        });
    });

    document.getElementById('generate-ai-recommendation')?.addEventListener('click', generateAIRecommendation);
    document.getElementById('whatsapp-checkout')?.addEventListener('click', checkoutWhatsApp);
}

function toggleModal(modalId, overlayId, show) {
    document.getElementById(modalId)?.classList.toggle('active', show);
    document.getElementById(overlayId)?.classList.toggle('active', show);
}

function calculateFit() {
    const chest = document.getElementById('fit-chest').value;
    const res = document.getElementById('fit-result');

    if (!chest) {
        res.innerText = "Please enter measurement.";
        return;
    }

    let size = "Custom Atelier Measurement Recommended";
    if (chest < 36) size = "EU 46 (Small)";
    else if (chest <= 40) size = "EU 48/50 (Medium)";
    else if (chest <= 44) size = "EU 52/54 (Large)";

    res.innerText = `Recommended Size: ${size}`;
}

function generateAIRecommendation() {
    const rec = products[Math.floor(Math.random() * products.length)];
    const box = document.getElementById('ai-result-container');
    box.style.display = "block";
    box.innerHTML = `
        <div style="border-top:1px solid var(--border-color); margin-top:15px; padding-top:10px;">
            <p class="gold-text" style="font-size:10px;">AI MATCH:</p>
            <h4>${rec.name}</h4>
            <img src="${rec.image}" style="width:100%; height:150px; object-fit:cover; border-radius:8px; margin:10px 0;">
            <button class="btn-primary ios-btn" style="width:100%;" onclick="addToCart(${rec.id})">Add AI Pick To Bag</button>
        </div>
    `;
}

function addToCart(id) {
    const p = products.find(x => x.id === id);
    const existing = cart.find(x => x.id === id);
    const price = p.isSale ? p.salePriceUSD : p.priceUSD;

    if (existing) existing.quantity++;
    else cart.push({ ...p, priceUSD: price, quantity: 1 });

    updateCartUI();
    openCart();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    let total = 0;
    let count = 0;

    container.innerHTML = cart.map(item => {
        total += item.priceUSD * item.quantity;
        count += item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.image}">
                <div>
                    <h4>${item.name}</h4>
                    <p class="gold-text">${formatPrice(item.priceUSD)} x ${item.quantity}</p>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('cart-total').innerText = formatPrice(total);
    document.getElementById('cart-count').innerText = count;
}

function openCart() { document.getElementById('cart-drawer').classList.add('active'); document.getElementById('cart-overlay').classList.add('active'); }
function closeCart() { document.getElementById('cart-drawer').classList.remove('active'); document.getElementById('cart-overlay').classList.remove('active'); }
function closeModal() { document.getElementById('quickview-modal').classList.remove('active'); document.getElementById('modal-overlay').classList.remove('active'); }

function openQuickView(id) {
    const p = products.find(x => x.id === id);
    document.getElementById('quickview-body').innerHTML = `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
            <img src="${p.image}" style="width:100%; height:250px; object-fit:cover; border-radius:12px;">
            <div>
                <h3 class="gold-text">${p.name}</h3>
                <p style="margin:10px 0; font-size:12px;">${p.description}</p>
                <button class="btn-primary ios-btn" onclick="addToCart(${p.id}); closeModal();">Add to Bag</button>
            </div>
        </div>
    `;
    toggleModal('quickview-modal', 'modal-overlay', true);
}

function checkoutWhatsApp() {
    if (cart.length === 0) return alert("Bag is empty");
    let text = "Hello AURA Concierge, I would like to order:%0A";
    cart.forEach(i => text += `- ${i.name} (x${i.quantity})%0A`);
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
    closeCart();
    toggleModal('thankyou-modal', 'modal-overlay', true);
}

function closeThankYouModal() {
    toggleModal('thankyou-modal', 'modal-overlay', false);
    cart = [];
    updateCartUI();
}
