import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyAMetcDlRe7Jwe-qMFK703JpE_Fg5NljIc",
    authDomain: "aura-couture-39ce7.firebaseapp.com",
    projectId: "aura-couture-39ce7",
    storageBucket: "aura-couture-39ce7.firebasestorage.app",
    messagingSenderId: "934174328830",
    appId: "1:934174328830:web:84f41004418990b09de2af"
};

// Initialize Firebase & Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 30 Bespoke Luxury Products
const products = [
    // Men's Outfits (15)
    { id: 1, name: "Royal Silk Tuxedo", category: "Men", price: 1200, img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600" },
    { id: 2, name: "Cashmere Overcoat", category: "Men", price: 1500, img: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600" },
    { id: 3, name: "Bespoke Emerald Suit", category: "Men", price: 1950, img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600" },
    { id: 4, name: "Midnight Navy Blazer", category: "Men", price: 1350, img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600" },
    { id: 5, name: "Classic Italian Tuxedo", category: "Men", price: 1750, img: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=600" },
    { id: 6, name: "Monochrome Trench Coat", category: "Men", price: 1400, img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=600" },
    { id: 7, name: "Double-Breasted Blazer", category: "Men", price: 1600, img: "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=600" },
    { id: 8, name: "Custom Tailored Jacket", category: "Men", price: 1250, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600" },
    { id: 9, name: "Charcoal Wool Overcoat", category: "Men", price: 1680, img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600" },
    { id: 10, name: "Satin Trim Dinner Suit", category: "Men", price: 2100, img: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=600" },
    { id: 11, name: "Pinstripe Executive Suit", category: "Men", price: 1850, img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600" },
    { id: 12, name: "Velvet Smoking Jacket", category: "Men", price: 1450, img: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=600" },
    { id: 13, name: "Heritage Plaid Blazer", category: "Men", price: 1300, img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600" },
    { id: 14, name: "Pure Silk Summer Suit", category: "Men", price: 1900, img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600" },
    { id: 15, name: "Bespoke Royal Sherwani", category: "Men", price: 2800, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600" },

    // Women's Outfits (15)
    { id: 16, name: "Velvet Evening Gown", category: "Women", price: 1800, img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600" },
    { id: 17, name: "Embroidered Runway Dress", category: "Women", price: 2100, img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600" },
    { id: 18, name: "Satin Ball Gown", category: "Women", price: 2400, img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600" },
    { id: 19, name: "Golden Sequin Dress", category: "Women", price: 2250, img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600" },
    { id: 20, name: "Ivory Bridal Couture", category: "Women", price: 3200, img: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=600" },
    { id: 21, name: "Floral Runway Kimono", category: "Women", price: 1650, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600" },
    { id: 22, name: "Chiffon Summer Gown", category: "Women", price: 1850, img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600" },
    { id: 23, name: "Met Gala Couture Edition", category: "Women", price: 4500, img: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=600" },
    { id: 24, name: "Crystal Embellished Cape", category: "Women", price: 2900, img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600" },
    { id: 25, name: "Scarlet Silk Cocktail Dress", category: "Women", price: 1950, img: "https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=600" },
    { id: 26, name: "Pastel Layered Tulle Gown", category: "Women", price: 2600, img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=600" },
    { id: 27, name: "High-Slit Metallic Gown", category: "Women", price: 2300, img: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?q=80&w=600" },
    { id: 28, name: "Bohemian Couture Dress", category: "Women", price: 1700, img: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=600" },
    { id: 29, name: "Midnight Corset Dress", category: "Women", price: 2150, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600" },
    { id: 30, name: "Opal Silk Ensemble", category: "Women", price: 3100, img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600" }
];

let cart = [];
let wishlist = [];
let currentCategory = "all";

document.addEventListener("DOMContentLoaded", () => {
    renderProducts("all");

    // Search Filter
    document.getElementById("search-input")?.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        );
        renderProductsList(filtered);
    });

    // Category Filter Buttons
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            currentCategory = e.target.dataset.category;
            renderProducts(currentCategory);
        });
    });

    // Firebase Auth Elements
    const loginBtn = document.getElementById("google-login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const userProfile = document.getElementById("user-profile");
    const userAvatar = document.getElementById("user-avatar");
    const userName = document.getElementById("user-display-name");

    loginBtn?.addEventListener("click", async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (e) {
            alert("Login Failed: " + e.message);
        }
    });

    logoutBtn?.addEventListener("click", () => signOut(auth));

    onAuthStateChanged(auth, (user) => {
        if (user) {
            loginBtn.style.display = "none";
            userProfile.style.display = "flex";
            userAvatar.src = user.photoURL || "";
            userName.textContent = user.displayName ? user.displayName.split(' ')[0] : "User";
        } else {
            loginBtn.style.display = "inline-flex";
            userProfile.style.display = "none";
        }
    });

    // Cart Drawer Controls
    const cartIcon = document.getElementById("cart-icon");
    const cartDrawer = document.getElementById("cart-drawer");
    const closeCart = document.getElementById("close-cart");
    const overlay = document.getElementById("overlay");

    cartIcon.addEventListener("click", () => {
        cartDrawer.classList.add("open");
        overlay.style.display = "block";
    });

    closeCart.addEventListener("click", () => {
        cartDrawer.classList.remove("open");
        overlay.style.display = "none";
    });

    overlay.addEventListener("click", () => {
        cartDrawer.classList.remove("open");
        closeAiModal();
        closeQuickModal();
        overlay.style.display = "none";
    });

    // AI Modal Triggers
    document.getElementById("ai-buy-btn").addEventListener("click", openAiModal);
    document.getElementById("hero-ai-btn").addEventListener("click", openAiModal);
    document.getElementById("close-ai-modal").addEventListener("click", closeAiModal);
    document.getElementById("ai-submit-btn").addEventListener("click", processAiBuy);

    // Quick Modal Close
    document.getElementById("close-quick-modal")?.addEventListener("click", closeQuickModal);
});

// Render Catalogue with Staggered Animation
function renderProducts(category) {
    const filtered = category === "all" ? products : products.filter(p => p.category === category);
    renderProductsList(filtered);
}

function renderProductsList(productList) {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    grid.innerHTML = productList.map((p, index) => {
        const isWish = wishlist.some(item => item.id === p.id);
        return `
            <div class="product-card" style="animation-delay: ${index * 0.05}s;">
                <div class="product-img-wrapper">
                    <span class="product-tag">${p.category}</span>
                    <button class="wishlist-btn ${isWish ? 'active' : ''}" onclick="toggleWishlist(${p.id})">
                        <i class="fa-${isWish ? 'solid' : 'regular'} fa-heart"></i>
                    </button>
                    <img src="${p.img}" alt="${p.name}">
                    <div class="product-actions-overlay">
                        <button class="btn-gold full-width" onclick="openQuickView(${p.id})">Quick View</button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${p.name}</h3>
                    <div class="product-price">$${p.price.toLocaleString()}</div>
                    <button class="btn-gold full-width" onclick="addToCart(${p.id})">Add To Bag</button>
                </div>
            </div>
        `;
    }).join('');
}

// Quick View Functions
window.openQuickView = function(id) {
    const p = products.find(prod => prod.id === id);
    if (!p) return;

    document.getElementById("quick-img").src = p.img;
    document.getElementById("quick-title").innerText = p.name;
    document.getElementById("quick-category").innerText = p.category;
    document.getElementById("quick-price").innerText = `$${p.price.toLocaleString()}`;
    
    const addBtn = document.getElementById("quick-add-btn");
    addBtn.onclick = () => {
        addToCart(p.id);
        closeQuickModal();
    };

    document.getElementById("quick-modal").classList.add("active");
    document.getElementById("overlay").style.display = "block";
};

function closeQuickModal() {
    document.getElementById("quick-modal")?.classList.remove("active");
    document.getElementById("overlay").style.display = "none";
}

// Wishlist Functions
window.toggleWishlist = function(id) {
    const index = wishlist.findIndex(item => item.id === id);
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        const item = products.find(p => p.id === id);
        if (item) wishlist.push(item);
    }
    document.getElementById("wishlist-count").innerText = wishlist.length;
    renderProducts(currentCategory);
};

// Add Item to Cart
window.addToCart = function(id) {
    const item = products.find(p => p.id === id);
    if (item) {
        cart.push(item);
        updateCartUI();
    }
};

// Remove Item from Cart
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

// Update Cart Interface
function updateCartUI() {
    document.getElementById("cart-count").innerText = cart.length;
    const container = document.getElementById("cart-items");
    
    if (cart.length === 0) {
        container.innerHTML = "<p class='empty-cart-text'>Your bag is empty.</p>";
        document.getElementById("cart-total").innerText = "$0";
        return;
    }

    container.innerHTML = cart.map((item, i) => `
        <div class="cart-item-row">
            <div>
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toLocaleString()}</div>
            </div>
            <span class="cart-item-delete" onclick="removeFromCart(${i})"><i class="fa-solid fa-trash"></i></span>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("cart-total").innerText = `$${total.toLocaleString()}`;
}

// AI Functions
function openAiModal() {
    document.getElementById("ai-modal").classList.add("active");
    document.getElementById("overlay").style.display = "block";
}

function closeAiModal() {
    document.getElementById("ai-modal").classList.remove("active");
    document.getElementById("overlay").style.display = "none";
}

function processAiBuy() {
    const prompt = document.getElementById("ai-prompt").value;
    const resp = document.getElementById("ai-response");
    
    if (!prompt) {
        resp.innerText = "Please enter an occasion or preference!";
        return;
    }
    
    resp.innerText = "✨ AI is curating your bespoke outfit...";
    
    setTimeout(() => {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        cart.push(randomProduct);
        updateCartUI();
        resp.innerText = `Matched & Added: ${randomProduct.name}!`;
        setTimeout(closeAiModal, 1500);
    }, 1200);
}
