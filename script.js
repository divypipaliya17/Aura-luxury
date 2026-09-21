const products = [
    {
        id: 1,
        name: "Royal Velvet Evening Tuxedo",
        category: "menswear",
        price: 2450,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
        description: "Hand-tailored velvet tuxedo crafted with Italian silk lapels and custom gold-plated buttons."
    },
    {
        id: 2,
        name: "Silk Chiffon Couture Gown",
        category: "womenswear",
        price: 3200,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
        description: "Pure mulberry silk gown featured with delicate hand embroidery and a dramatic train."
    },
    {
        id: 3,
        name: "Cashmere Double-Breasted Coat",
        category: "menswear",
        price: 1850,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
        description: "100% Himalayan cashmere winter coat with tailored structured shoulders."
    },
    {
        id: 4,
        name: "Embroidered Atelier Trench",
        category: "womenswear",
        price: 2100,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
        description: "High-end designer trench coat featuring gold thread accents and custom silk lining."
    }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupEventListeners();
});

function renderProducts(items) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = items.map(product => `
        <div class="product-card">
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
                <p class="product-price">$${product.price.toLocaleString()}</p>
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            if (filter === 'all') {
                renderProducts(products);
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

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
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
        totalEl.innerText = '$0';
        countEl.innerText = '0';
        return;
    }

    let total = 0;
    let count = 0;

    container.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        count += item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toLocaleString()}</p>
                    <div class="cart-item-qty">
                        <button onclick="changeQty(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    totalEl.innerText = `$${total.toLocaleString()}`;
    countEl.innerText = count;
}

function changeQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
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

    document.getElementById('quickview-body').innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: center;">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 280px; object-fit: cover;">
            <div>
                <p style="color: var(--primary-gold); font-size: 11px; letter-spacing: 2px;">${product.category.toUpperCase()}</p>
                <h2 style="font-family: var(--font-heading); font-size: 20px; margin: 8px 0;">${product.name}</h2>
                <p style="color: var(--primary-gold); font-size: 18px; margin-bottom: 10px;">$${product.price.toLocaleString()}</p>
                <p style="color: #aaa; font-size: 12px; margin-bottom: 15px;">${product.description}</p>
                <button class="btn-primary" style="width: 100%;" onclick="addToCart(${product.id}); closeModal();">Add to Shopping Bag</button>
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
    let total = 0;

    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}* (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString()}%0A`;
        total += item.price * item.quantity;
    });

    message += `%0A*Total Amount:* $${total.toLocaleString()}`;
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
}
