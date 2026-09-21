// Expanded High-End Clothes Collection
const products = [
    {
        id: 1,
        name: "Royal Velvet Evening Tuxedo",
        category: "menswear",
        isSale: false,
        priceUSD: 2450,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
        description: "Hand-tailored velvet tuxedo crafted with Italian silk lapels and custom gold-plated buttons."
    },
    {
        id: 2,
        name: "Silk Chiffon Couture Gown",
        category: "womenswear",
        isSale: true,
        priceUSD: 3200,
        salePriceUSD: 2560,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
        description: "Pure mulberry silk gown featured with delicate hand embroidery and a dramatic train."
    },
    {
        id: 3,
        name: "Cashmere Double-Breasted Coat",
        category: "menswear",
        isSale: false,
        priceUSD: 1850,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
        description: "100% Himalayan cashmere winter coat with tailored structured shoulders."
    },
    {
        id: 4,
        name: "Embroidered Atelier Trench",
        category: "womenswear",
        isSale: true,
        priceUSD: 2100,
        salePriceUSD: 1680,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
        description: "High-end designer trench coat featuring gold thread accents and custom silk lining."
    },
    {
        id: 5,
        name: "Gold Thread Blazer",
        category: "menswear",
        isSale: false,
        priceUSD: 2900,
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
        description: "Bespoke blazer embellished with intricate metallic thread embroidery."
    },
    {
        id: 6,
        name: "Satin Silk Corset Dress",
        category: "womenswear",
        isSale: true,
        priceUSD: 2750,
        salePriceUSD: 2200,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
        description: "Sculptural satin corset dress designed for red-carpet elegance."
    },
    {
        id: 7,
        name: "Monaco Emerald Velvet Suit",
        category: "menswear",
        isSale: false,
        priceUSD: 3100,
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800",
        description: "Deep emerald velvet suit with silk peak lapels designed for gala evenings."
    },
    {
        id: 8,
        name: "Milano Gold Sequin Ballgown",
        category: "womenswear",
        isSale: false,
        priceUSD: 4500,
        image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=800",
        description: "Hand-sequined gold masterpiece built for majestic presence."
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
    startCountdownTimer();
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

    const tagDisplay = product.isSale ? `<div class="product-tag">20% OFF</div>` : '';

    return `
        <div class="product-card">
            ${tagDisplay}
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
            </div>
        </div>
    `;
}

function renderProducts(items) {
    const grid = document.getElementById('product-grid');
    if (grid) grid.innerHTML = items.map(product => createProductCardHTML(product)).join('');
}

function renderSwiperProducts() {
    const wrapper = document.getElementById('swipe-wrapper');
    if (wrapper) wrapper.innerHTML = products.map(product => `<div class="swiper-slide">${createProductCardHTML(product)}</div>`).join('');
}

function initSwiper() {
    new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
        }
    });
}

function toggleWishlist(id) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
    } else {
        wishlist.push(id);
    }
    document.getElementById('wishlist-count').innerText = wishlist.length;
    renderProducts(products);
    renderSwiperProducts();
}

function setupEventListeners() {
    // Search toggle
    const searchContainer = document.getElementById('search-container');
    document.getElementById('search-toggle')?.addEventListener('click', () => searchContainer.classList.add('active'));
    document.getElementById('close-search')?.addEventListener('click', () => searchContainer.classList.remove('active'));

    document.getElementById('search-input')?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
        renderProducts(filtered);
    });

    // AI Stylist Triggers
    document.getElementById('ai-stylist-trigger')?.addEventListener('click', openAIModal);
    document.getElementById('hero-ai-btn')?.addEventListener('click', openAIModal);
    document.getElementById('close-ai-modal')?.addEventListener('click', closeAIModal);
    document.getElementById('ai-modal-overlay')?.addEventListener('click', closeAIModal);
    document.getElementById('generate-ai-recommendation')?.addEventListener('click', generateAIRecommendation);

    // Privacy Policy Modals
    document.getElementById('open-privacy-link')?.addEventListener('click', () => {
        document.getElementById('privacy-modal').classList.add('active');
        document.getElementById('privacy-overlay').classList.add('active');
    });

    document.getElementById('close-privacy')?.addEventListener('click', () => {
        document.getElementById('privacy-modal').classList.remove('active');
        document.getElementById('privacy-overlay').classList.remove('active');
    });

    // Currency Switcher
    document.getElementById('currency-select')?.addEventListener('change', (e) => {
        currentCurrency = e.target.value;
        renderProducts(products);
        renderSwiperProducts();
        updateCartUI();
    });

    // Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            if (filter === 'all') {
                renderProducts(products);
            } else if (filter === 'sale') {
                renderProducts(products.filter(p => p.isSale));
            } else {
                renderProducts(products.filter(p => p.category === filter));
            }
        });
    });

    document.getElementById('cart-icon')?.addEventListener('click', openCart);
    document.getElementById('close-cart')?.addEventListener('click', closeCart);
    document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
    document.getElementById('close-modal')?.addEventListener('click', closeModal);
    document.getElementById('modal-overlay')?.addEventListener('click', closeModal);
    document.getElementById('whatsapp-checkout')?.addEventListener('click', checkoutWhatsApp);
}

// AI Stylist Logic
function openAIModal() {
    document.getElementById('ai-stylist-modal').classList.add('active');
    document.getElementById('ai-modal-overlay').classList.add('active');
}

function closeAIModal() {
    document.getElementById('ai-stylist-modal').classList.remove('active');
    document.getElementById('ai-modal-overlay').classList.remove('active');
}

function generateAIRecommendation() {
    const recommendedProduct = products[Math.floor(Math.random() * products.length)];
    const resultBox = document.getElementById('ai-result-container');

    resultBox.style.display = "block";
    resultBox.innerHTML = `
        <div style="border-top: 1px solid var(--border-color); padding-top: 15px; text-align: center;">
            <p style="color: var(--primary-gold); font-size: 11px; letter-spacing: 1px;">AI MATCH FOUND:</p>
            <h3 style="font-family: var(--font-heading); margin: 5px 0;">${recommendedProduct.name}</h3>
            <img src="${recommendedProduct.image}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px; margin: 10px 0;">
            <p style="font-size: 12px; color: var(--text-muted);">${recommendedProduct.description}</p>
            <button class="btn-primary ios-btn" style="width: 100%; margin-top: 10px;" onclick="addToCart(${recommendedProduct.id}); closeAIModal();">Add Recommended Outfit To Bag</button>
        </div>
    `;
}

// Countdown Timer for Sale
function startCountdownTimer() {
    let duration = 90000;
    setInterval(() => {
        duration--;
        const hours = Math.floor((duration % 86400) / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);

        if(document.getElementById('hours')) {
            document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
        }
    }, 1000);
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        const finalPrice = product.isSale ? product.salePriceUSD : product.priceUSD;
        cart.push({ ...product, priceUSD: finalPrice, quantity: 1 });
    }

    updateCartUI();
    openCart();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#888; padding: 40px 0;">Your bag is empty</p>`;
        totalEl.innerText = formatPrice(0);
        countEl.innerText = '0';
        return;
    }

    let totalUSD = 0;
    let count = 0;

    container.innerHTML = cart.map(item => {
        totalUSD += item.priceUSD * item.quantity;
        count += item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${formatPrice(item.priceUSD)}</p>
                    <div class="cart-item-qty">
                        <button onclick="changeQty(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    totalEl.innerText = formatPrice(totalUSD);
    countEl.innerText = count;
}

function changeQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
    updateCartUI();
}

function openCart() {
    document.getElementById('cart-drawer')?.classList.add('active');
    document.getElementById('cart-overlay')?.classList.add('active');
}

function closeCart() {
    document.getElementById('cart-drawer')?.classList.remove('active');
    document.getElementById('cart-overlay')?.classList.remove('active');
}

function openQuickView(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const displayPrice = product.isSale ? product.salePriceUSD : product.priceUSD;

    document.getElementById('quickview-body').innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: center;">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 280px; object-fit: cover; border-radius: 12px;">
            <div>
                <p style="color: var(--primary-gold); font-size: 11px; letter-spacing: 2px;">${product.category.toUpperCase()}</p>
                <h2 style="font-family: var(--font-heading); font-size: 20px; margin: 8px 0;">${product.name}</h2>
                <p style="color: var(--primary-gold); font-size: 18px; margin-bottom: 10px;">${formatPrice(displayPrice)}</p>
                <p style="color: #aaa; font-size: 12px; margin-bottom: 15px;">${product.description}</p>
                <button class="btn-primary ios-btn" style="width: 100%;" onclick="addToCart(${product.id}); closeModal();">Add to Bag</button>
            </div>
        </div>
    `;

    document.getElementById('quickview-modal')?.classList.add('active');
    document.getElementById('modal-overlay')?.classList.add('active');
}

function closeModal() {
    document.getElementById('quickview-modal')?.classList.remove('active');
    document.getElementById('modal-overlay')?.classList.remove('active');
}

function checkoutWhatsApp() {
    if (cart.length === 0) return alert("Your bag is empty!");

    let message = "Hello AURA COUTURE, I would like to place an order:%0A%0A";
    let totalUSD = 0;

    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}* (x${item.quantity}) - ${formatPrice(item.priceUSD * item.quantity)}%0A`;
        totalUSD += item.priceUSD * item.quantity;
    });

    message += `%0A*Total Amount:* ${formatPrice(totalUSD)}`;
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');

    closeCart();
    setTimeout(() => {
        document.getElementById('thankyou-modal')?.classList.add('active');
        document.getElementById('modal-overlay')?.classList.add('active');
    }, 400);
}

function closeThankYouModal() {
    document.getElementById('thankyou-modal')?.classList.remove('active');
    document.getElementById('modal-overlay')?.classList.remove('active');
    cart = [];
    updateCartUI();
}
