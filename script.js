// High-End Product Catalog Database
const products = [
{
id: 1,
name: "Imperial Velvet Evening Gown",
category: "women",
price: 2850,
badge: "Haute Couture",
image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop",
description: "Hand-tailored deep emerald velvet gown with delicate Swarovski crystal corseting and Italian silk train."
},
{
id: 2,
name: "Royal Obsidian Tuxedo",
category: "men",
price: 3400,
badge: "Bespoke",
image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
description: "Double-breasted tuxedo crafted from Super 180s Italian wool with silk satin lapels."
},
{
id: 3,
name: "Sherlock Cashmere Trench Coat",
category: "streetwear",
price: 2150,
badge: "Runway",
image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
description: "Heavyweight Grade-A Mongolian cashmere long coat with custom horn buttons."
},
{
id: 4,
name: "Gold-Thread Silk Corset Dress",
category: "women",
price: 3100,
badge: "Limited 1/10",
image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
description: "Custom metallic gold embroidery over hand-spun Mulberry silk."
},
{
id: 5,
name: "Monaco Velvet Dinner Blazer",
category: "men",
price: 1950,
badge: "Exclusive",
image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop",
description: "Midnight blue Italian cotton velvet blazer with silk peak lapels."
},
{
id: 6,
name: "Exotic Alligator Leather Tote",
category: "accessories",
price: 4800,
badge: "Heritage",
image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
description: "Sustainably sourced leather bag with 24k gold plated hardware."
},
{
id: 7,
name: "Parisian Silk Scarf & Wrap",
category: "accessories",
price: 650,
badge: "Atelier",
image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop",
description: "100% Mulberry silk printed wrap hand-rolled by Parisian artisans."
},
{
id: 8,
name: "Atelier Oversized Leather Bomber",
category: "streetwear",
price: 2900,
badge: "New Release",
image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
description: "Supple lambskin leather jacket with silk lining and distressed finish."
}
];let cart = [];
let wishlist = [];
let currencySymbol = "$";
let currencyRate = 1;// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
renderProducts(products);
});// Render Product Cards
function renderProducts(items) {
const grid = document.getElementById("product-grid");
grid.innerHTML = "";if (items.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #A0AEC0;">No couture pieces found matching your criteria.</p>`;
    return;
}

items.forEach(product => {
    const formattedPrice = (product.price * currencyRate).toLocaleString('en-US');
    const isWishlisted = wishlist.includes(product.id);

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <span class="product-badge">${product.badge}</span>
            <div class="product-actions-hover">
                <button onclick="openQuickView(${product.id})" title="Quick View"><i class="fa-solid fa-eye"></i></button>
                <button onclick="toggleWishlist(${product.id})" title="Wishlist" style="color: ${isWishlisted ? '#D4AF37' : '#FFF'}">
                    <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
                </button>
                <button onclick="addToCart(${product.id})" title="Add to Bag"><i class="fa-solid fa-bag-shopping"></i></button>
            </div>
        </div>
        <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">${currencySymbol}${formattedPrice}</p>
        </div>
    `;
    grid.appendChild(card);
});
}// Product Filtering
function filterProducts(category) {
document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
const activeTab = document.getElementById(tab-${category});
if (activeTab) activeTab.classList.add("active");if (category === "all") {
    renderProducts(products);
} else {
    const filtered = products.filter(p => p.category === category);
    renderProducts(filtered);
}
}// Shopping Cart Functions
function addToCart(id) {
const itemIndex = cart.findIndex(item => item.id === id);
if (itemIndex > -1) {
cart[itemIndex].quantity += 1;
} else {
const product = products.find(p => p.id === id);
cart.push({ ...product, quantity: 1, size: 'M' });
}
updateCartUI();
toggleCartDrawer(true);
}function removeFromCart(id) {
cart = cart.filter(item => item.id !== id);
updateCartUI();
}function updateCartUI() {
const container = document.getElementById("cart-items-container");
const countBadge = document.getElementById("cart-count");
const subtotalEl = document.getElementById("cart-subtotal");container.innerHTML = "";
let total = 0;
let itemCount = 0;

cart.forEach(item => {
    total += item.price * item.quantity;
    itemCount += item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details" style="flex:1;">
            <h4>${item.name}</h4>
            <p>${currencySymbol}${(item.price * currencyRate).toLocaleString()} (Size: ${item.size})</p>
            <div style="display:flex; gap:10px; align-items:center;">
                <span style="font-size: 12px; color:#A0AEC0;">Qty: ${item.quantity}</span>
                <button onclick="removeFromCart(${item.id})" style="color:#ef4444; font-size: 11px;"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `;
    container.appendChild(cartItem);
});

countBadge.innerText = itemCount;
subtotalEl.innerText = `${currencySymbol}${(total * currencyRate).toLocaleString()}`;
}function toggleCartDrawer(forceOpen = false) {
const drawer = document.getElementById("cart-drawer");
const overlay = document.getElementById("cart-drawer-overlay");
if (forceOpen) {
drawer.classList.add("active");
overlay.classList.add("active");
} else {
drawer.classList.toggle("active");
overlay.classList.toggle("active");
}
}// Wishlist Functionality
function toggleWishlist(id) {
const index = wishlist.indexOf(id);
if (index > -1) {
wishlist.splice(index, 1);
} else {
wishlist.push(id);
}
document.getElementById("wishlist-count").innerText = wishlist.length;
renderProducts(products);
}function openWishlist() {
if (wishlist.length === 0) {
alert("Your wishlist is empty.");
return;
}
const wishlistedProducts = products.filter(p => wishlist.includes(p.id));
renderProducts(wishlistedProducts);
}// Quick View Modal
function openQuickView(id) {
const product = products.find(p => p.id === id);
const content = document.getElementById("quickview-content");content.innerHTML = `
    <div>
        <img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;">
    </div>
    <div style="padding: 20px;">
        <span class="gold-text-sm">${product.badge}</span>
        <h2 style="font-size: 24px; margin: 10px 0;">${product.name}</h2>
        <p style="font-size: 20px; color:#D4AF37; margin-bottom: 15px;">${currencySymbol}${(product.price * currencyRate).toLocaleString()}</p>
        <p style="font-size: 13px; color:#A0AEC0; line-height: 1.6; margin-bottom: 20px;">${product.description}</p>
        <button onclick="addToCart(${product.id}); closeQuickView();" class="btn btn-gold" style="width:100%;">ADD TO SHOPPING BAG</button>
    </div>
`;

document.getElementById("quickview-modal").classList.add("active");
}function closeQuickView() {
document.getElementById("quickview-modal").classList.remove("active");
}// Search Functionality
function toggleSearchModal() {
document.getElementById("search-modal").classList.toggle("active");
}function handleSearch() {
const query = document.getElementById("search-input").value.toLowerCase();
const resultsContainer = document.getElementById("search-results");
resultsContainer.innerHTML = "";if (query.trim() === "") return;

const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));

filtered.forEach(p => {
    const item = document.createElement("div");
    item.style.cssText = "padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); cursor: pointer;";
    item.innerHTML = `<strong>${p.name}</strong> - ${currencySymbol}${p.price}`;
    item.onclick = () => {
        openQuickView(p.id);
        toggleSearchModal();
    };
    resultsContainer.appendChild(item);
});
}// Currency Switcher
function toggleCurrency() {
if (currencySymbol === "$") {
currencySymbol = "₹";
currencyRate = 83;
} else {
currencySymbol = "$";
currencyRate = 1;
}
document.getElementById("current-currency").innerText = currencySymbol === "$" ? "USD ($)" : "INR (₹)";
renderProducts(products);
updateCartUI();
}// Mobile Nav Toggle
function toggleMobileNav() {
document.getElementById("mobile-nav").classList.toggle("active");
}// WhatsApp Checkout Direct Integration
function checkoutWhatsApp() {
if (cart.length === 0) {
alert("Your shopping bag is empty!");
return;
}let message = "Hello AURA Couture Atelier, I would like to place an order for:\n\n";
let subtotal = 0;

cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity * currencyRate;
    subtotal += itemTotal;
    message += `${index + 1}. ${item.name} (Size: ${item.size}) x${item.quantity} - ${currencySymbol}${itemTotal.toLocaleString()}\n`;
});

message += `\nTotal Amount: ${currencySymbol}${subtotal.toLocaleString()}\n`;
message += "\nPlease contact me regarding payment and express shipping details.";

const encodedMessage = encodeURIComponent(message);
window.open(`https://wa.me/919876543210?text=${encodedMessage}`, '_blank');
}