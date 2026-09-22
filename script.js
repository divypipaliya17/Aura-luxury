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

// 18 Bespoke Luxury Products
const products = [
    { id: 1, name: "Royal Silk Tuxedo", category: "Men", price: 1200, img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600" },
    { id: 2, name: "Velvet Evening Gown", category: "Women", price: 1800, img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600" },
    { id: 3, name: "Cashmere Overcoat", category: "Men", price: 1500, img: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600" },
    { id: 4, name: "Embroidered Runway Dress", category: "Women", price: 2100, img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600" },
    { id: 5, name: "Bespoke Emerald Suit", category: "Men", price: 1950, img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600" },
    { id: 6, name: "Satin Ball Gown", category: "Women", price: 2400, img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600" },
    { id: 7, name: "Midnight Navy Blazer", category: "Men", price: 1350, img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600" },
    { id: 8, name: "Golden Sequin Dress", category: "Women", price: 2250, img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600" },
    { id: 9, name: "Classic Italian Tuxedo", category: "Men", price: 1750, img: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=600" },
    { id: 10, name: "Ivory Bridal Couture", category: "Women", price: 3200, img: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=600" },
    { id: 11, name: "Monochrome Trench Coat", category: "Men", price: 1400, img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=600" },
    { id: 12, name: "Floral Runway Kimono", category: "Women", price: 1650, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600" },
    { id: 13, name: "Double-Breasted Blazer", category: "Men", price: 1600, img: "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=600" },
    { id: 14, name: "Chiffon Summer Gown", category: "Women", price: 1850, img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600" },
    { id: 15, name: "Custom Tailored Jacket", category: "Men", price: 1250, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600" },
    { id: 16, name: "Met Gala Couture Edition", category: "Women", price: 4500, img: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=600" },
    { id: 17, name: "Charcoal Wool Overcoat", category: "Men", price: 1680, img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600" },
    { id: 18, name: "Crystal Embellished Cape", category: "Women", price: 2900, img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600" }
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    renderProducts("all");

    // Filter Buttons
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            renderProducts(e.target.dataset.category);
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
        overlay.style.display = "none";
    });

    // AI Modal Triggers
    document.getElementById("ai-buy-btn").addEventListener("click", openAiModal);
    document.getElementById("hero-ai-btn").addEventListener("click", openAiModal);
    document.getElementById("close-ai-modal").addEventListener("click", closeAiModal);
    document.getElementById("ai-submit-btn").addEventListener("click", processAiBuy);
});

// Render Catalogue with Staggered Animation
function renderProducts(category) {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    const filtered = category === "all" ? products : products.filter(p => p.category === category);

    grid.innerHTML = filtered.map((p, index) => `
        <div class="product-card" style="animation-delay: ${index * 0.08}s;">
            <div class="product-img-wrapper">
                <span class="product-tag">${p.category}</span>
                <img src="${p.img}" alt="${p.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <div class="product-price">$${p.price.toLocaleString()}</div>
                <button class="btn-gold full-width" onclick="addToCart(${p.id})">Add To Bag</button>
            </div>
        </div>
    `).join('');
}

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
