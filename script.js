// Sample Luxury Products Data
const products = [
    {
        id: 1,
        name: "Royal Velvet Evening Tuxedo",
        category: "menswear",
        price: 2450,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
        description: "Hand-tailored velvet tuxedo crafted with Italian silk lapels and custom gold-plated buttons.",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 2,
        name: "Silk Chiffon Couture Gown",
        category: "womenswear",
        price: 3200,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
        description: "Pure mulberry silk gown featured with delicate hand embroidery and a dramatic train.",
        sizes: ["XS", "S", "M", "L"]
    },
    {
        id: 3,
        name: "Cashmere Double-Breasted Coat",
        category: "menswear",
        price: 1850,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
        description: "100% Himalayan cashmere winter coat with tailored structured shoulders.",
        sizes: ["M", "L", "XL"]
    },
    {
        id: 4,
        name: "Embroidered Atelier Trench",
        category: "womenswear",
        price: 2100,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
        description: "High-end designer trench coat featuring gold thread accents and custom silk lining.",
        sizes: ["S", "M", "L"]
    }
];

// Cart State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const quickViewModal = document.getElementById('quickview-modal');
const modalOverlay = document.getElementById('modal-overlay');
const quickviewBody = document.getElementById('quickview-body');

// Initialize Store
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupEventListeners();
});

// Render Products to Grid
function renderProducts(items) {
    if (!productGrid) return;
    
    productGrid.innerHTML = items.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image-wrap">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-actions">
                    <button class="btn-action" onclick="openQuickView(${product.id})">Quick View</button>
                    <button class="btn-action" onclick="addToCart(${product.id})">Add to Cart</button>
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

// Setup Event Listeners
function setupEventListeners() {
    // Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            if (filter === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === filter);
                renderProducts(filtered);
            }
        });
    });

    // Cart Open / Close
    const cartIcon = document.getElementById('cart-icon');
    const closeCartBtn = document.getElementById('close-cart');
    
    if (cartIcon) cartIcon.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    
    // Modal Close
    const closeModalBtn = document.getElementById('close-modal');
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // WhatsApp Checkout
    const whatsappBtn = document.getElementById('whatsapp-checkout');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', checkoutWhatsApp);
    }
}

// Add to Cart Function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    openCart();
}

// Update Cart UI
function updateCartUI() {
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align:center; color:#888; padding: 40px 0;">Your cart is empty</p>`;
        if (cartCount) cartCount.innerText = '0';
        if (cartTotal) cartTotal.innerText = '$0';
        return;
    }

    let total = 0;
    let totalCount = 0;

    cartItemsContainer.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        totalCount += item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toLocaleString()} x ${item.quantity}</p>
                    <div class="cart-item-qty">
                        <button onclick="changeQty(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    if (cartCount) cartCount.innerText = totalCount;
    if (cartTotal) cartTotal.innerText = `$${total.toLocaleString()}`;
}

// Change Quantity
function changeQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
}

// Open / Close Cart
function openCart() {
    if (cartDrawer) cartDrawer.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
}

function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
}

// Open Quick View Modal
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !quickviewBody) return;

    quickviewBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: center;">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 350px; object-fit: cover;">
            <div>
                <p style="color: var(--primary-gold); letter-spacing: 2px; font-size: 12px; font-weight: 600;">${product.category.toUpperCase()}</p>
                <h2 style="font-family: var(--font-heading); font-size: 24px; margin: 10px 0;">${product.name}</h2>
                <p style="font-size: 20px; color: var(--primary-gold); margin-bottom: 15px;">$${product.price.toLocaleString()}</p>
                <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">${product.description}</p>
                <button class="btn-primary" style="width: 100%;" onclick="addToCart(${product.id}); closeModal();">Add to Shopping Bag</button>
            </div>
        </div>
    `;

    if (quickViewModal) quickViewModal.classList.add('active');
    if (modalOverlay) modalOverlay.classList.add('active');
}

function closeModal() {
    if (quickViewModal) quickViewModal.classList.remove('active');
    if (modalOverlay) modalOverlay.classList.remove('active');
}

// WhatsApp Checkout
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hello AURA COUTURE, I would like to place an order:%0A%0A";
    let total = 0;

    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}* (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString()}%0A`;
        total += item.price * item.quantity;
    });

    message += `%0A*Total Amount:* $${total.toLocaleString()}`;
    
    // Replace with your real WhatsApp number
    const phoneNumber = "919876543210"; 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}