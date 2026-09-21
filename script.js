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

// Products Data
const products = [
    { id: 1, name: "Royal Silk Tuxedo", price: 1200, img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600" },
    { id: 2, name: "Velvet Evening Gown", price: 1800, img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600" },
    { id: 3, name: "Cashmere Overcoat", price: 1500, img: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600" },
    { id: 4, name: "Embroidered Runway Dress", price: 2100, img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600" }
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();

    // Firebase Elements
    const loginBtn = document.getElementById("google-login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const userProfile = document.getElementById("user-profile");
    const userAvatar = document.getElementById("user-avatar");
    const userName = document.getElementById("user-display-name");

    // Login Event Listener
    loginBtn?.addEventListener("click", async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (e) {
            alert("Login Failed: " + e.message);
        }
    });

    // Logout Event Listener
    logoutBtn?.addEventListener("click", () => signOut(auth));

    // Auth State Monitor
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

// Render Catalogue
function renderProducts() {
    const grid = document.getElementById("product-grid");
    if (!grid) return;
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="product-img-wrapper">
                <img src="${p.img}" alt="${p.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <div class="product-price">$${p.price}</div>
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
                <div class="cart-item-price">$${item.price}</div>
            </div>
            <span class="cart-item-delete" onclick="removeFromCart(${i})"><i class="fa-solid fa-trash"></i></span>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("cart-total").innerText = `$${total}`;
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
    
    resp.innerText = "✨ AI is curating your look...";
    
    setTimeout(() => {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        cart.push(randomProduct);
        updateCartUI();
        resp.innerText = `Matched & Added: ${randomProduct.name}!`;
        setTimeout(closeAiModal, 1500);
    }, 1200);
}
