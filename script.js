// Firebase SDK Modules Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 1. FIREBASE CONFIGURATION
const firebaseConfig = {
    apiKey: "AIzaSyAMetcDlRe7Jwe-qMFK703JpE_Fg5NljIc", // Config select karine je API key dekhay te ahiya replace karo
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

// Product Data
const products = [
    { id: 1, name: "Royal Silk Tuxedo", price: 1200, category: "menswear", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=500" },
    { id: 2, name: "Velvet Evening Gown", price: 1800, category: "womenswear", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=500" },
    { id: 3, name: "Cashmere Overcoat", price: 1500, category: "menswear", img: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=500" },
    { id: 4, name: "Embroidered Runway Dress", price: 2100, category: "womenswear", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500" }
];

let cart = [];

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize Animations & Swiper
    if (typeof AOS !== 'undefined') AOS.init();
    
    if (typeof Swiper !== 'undefined') {
        new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            pagination: { el: ".swiper-pagination", clickable: true },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    renderProducts(products);
    renderSlider(products);

    // --- FIREBASE GOOGLE LOGIN & LOGOUT ---
    const loginBtn = document.getElementById("google-login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const userProfile = document.getElementById("user-profile");
    const userAvatar = document.getElementById("user-avatar");
    const userName = document.getElementById("user-display-name");

    const profileModal = document.getElementById("profile-modal");
    const profileOverlay = document.getElementById("profile-overlay");

    // Login Event
    if (loginBtn) {
        loginBtn.addEventListener("click", async () => {
            try {
                await signInWithPopup(auth, provider);
            } catch (error) {
                console.error("Login Failed:", error.message);
                alert("Login Error: " + error.message);
            }
        });
    }

    // Logout Event
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            try {
                await signOut(auth);
                if (profileModal) profileModal.style.display = "none";
                if (profileOverlay) profileOverlay.style.display = "none";
            } catch (error) {
                console.error("Logout Error:", error.message);
            }
        });
    }

    // Auth State Listener
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (loginBtn) loginBtn.style.display = "none";
            if (userProfile) userProfile.style.display = "flex";
            if (userAvatar) userAvatar.src = user.photoURL || "https://via.placeholder.com/40";
            if (userName) userName.textContent = user.displayName ? user.displayName.split(' ')[0] : "User";

            // Profile Modal Details
            const modalAvatar = document.getElementById("modal-user-avatar");
            const modalName = document.getElementById("modal-user-name");
            const modalEmail = document.getElementById("modal-user-email");

            if (modalAvatar) modalAvatar.src = user.photoURL || "";
            if (modalName) modalName.textContent = user.displayName || "User";
            if (modalEmail) modalEmail.textContent = user.email || "";
        } else {
            if (loginBtn) loginBtn.style.display = "flex";
            if (userProfile) userProfile.style.display = "none";
        }
    });

    // Profile Modal Open/Close Controls
    if (userProfile) {
        userProfile.addEventListener("click", () => {
            if (profileModal) profileModal.style.display = "block";
            if (profileOverlay) profileOverlay.style.display = "block";
        });
    }

    document.getElementById("close-profile-modal")?.addEventListener("click", () => {
        if (profileModal) profileModal.style.display = "none";
        if (profileOverlay) profileOverlay.style.display = "none";
    });

    // Cart Drawer Controls
    const cartIcon = document.getElementById("cart-icon");
    const cartDrawer = document.getElementById("cart-drawer");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCart = document.getElementById("close-cart");

    cartIcon?.addEventListener("click", () => {
        cartDrawer?.classList.add("open");
        if (cartOverlay) cartOverlay.style.display = "block";
    });

    closeCart?.addEventListener("click", () => {
        cartDrawer?.classList.remove("open");
        if (cartOverlay) cartOverlay.style.display = "none";
    });

    cartOverlay?.addEventListener("click", () => {
        cartDrawer?.classList.remove("open");
        if (cartOverlay) cartOverlay.style.display = "none";
    });
});

// Render Products Function
function renderProducts(items) {
    const grid = document.getElementById("product-grid");
    if (!grid) return;
    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3 class="product-title">${p.name}</h3>
            <p class="product-price">$${p.price}</p>
            <button class="btn-primary ios-btn" style="width: 100%; margin-top: 10px;" onclick="addToCart(${p.id})">Add to Bag</button>
        </div>
    `).join('');
}

// Render Swiper Slider Function
function renderSlider(items) {
    const wrapper = document.getElementById("swipe-wrapper");
    if (!wrapper) return;
    wrapper.innerHTML = items.map(p => `
        <div class="swiper-slide">
            <img src="${p.img}" alt="${p.name}">
            <h4 style="margin-top:10px;">${p.name}</h4>
            <p class="gold-text">$${p.price}</p>
        </div>
    `).join('');
}

// Global Add To Cart Function
window.addToCart = function(id) {
    const item = products.find(p => p.id === id);
    if (item) {
        cart.push(item);
        const cartCount = document.getElementById("cart-count");
        if (cartCount) cartCount.innerText = cart.length;
        renderCart();
    }
};

// Render Cart Drawer
function renderCart() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = "<p style='color: var(--text-muted); text-align: center;'>Your bag is empty.</p>";
        if (totalEl) totalEl.innerText = "$0";
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <div>
                <p style="font-size: 12px;">${item.name}</p>
                <p class="gold-text" style="font-size: 11px;">$${item.price}</p>
            </div>
            <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #e74c3c; cursor: pointer;">&times;</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    if (totalEl) totalEl.innerText = `$${total}`;
}

// Remove Item From Cart
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    const cartCount = document.getElementById("cart-count");
    if (cartCount) cartCount.innerText = cart.length;
    renderCart();
};
