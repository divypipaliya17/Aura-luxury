// Firebase v10 Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase Configuration (તમારી પોર્ટલ વિગતો અહિયાં લગાવો)
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// App State Variables
let cart = [];
let currentAiProduct = null;

// 30 Sample Luxury Products
const products = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Aura Haute Dress Vol. ${i + 1}`,
  price: Math.floor(Math.random() * 15000) + 4999,
  image: `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80`
}));

// DOM Elements
const productGrid = document.getElementById('productGrid');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userInfo = document.getElementById('userInfo');
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');

// 1. Google Authentication Setup
loginBtn.addEventListener('click', async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Authentication Error:", error);
    alert("લોગિન થવામાં ભૂલ આવી: " + error.message);
  }
});

logoutBtn.addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.classList.add('hidden');
    userInfo.classList.remove('hidden');
    userAvatar.src = user.photoURL || 'https://via.placeholder.com/40';
    userName.textContent = user.displayName;
  } else {
    loginBtn.classList.remove('hidden');
    userInfo.classList.add('hidden');
  }
});

// 2. Render Products (4 Column Layout)
function renderProducts() {
  productGrid.innerHTML = products.map(prod => `
    <div class="product-card">
      <div class="card-img-wrap">
        <img src="${prod.image}" alt="${prod.title}">
      </div>
      <div class="card-info">
        <div class="card-title">${prod.title}</div>
        <div class="card-price">₹${prod.price.toLocaleString('gu-IN')}</div>
        <div class="card-actions">
          <button class="btn-add-cart" onclick="addToCart(${prod.id})"><i class="fa-solid fa-cart-plus"></i> Add</button>
          <button class="btn-ai-buy" onclick="openAiModal(${prod.id})"><i class="fa-solid fa-sparkles"></i> Buy With AI</button>
        </div>
      </div>
    </div>
  `).join('');
}

// 3. Cart Functionality
window.addToCart = function(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateCartUI();
};

window.toggleCart = function() {
  document.getElementById('cartDrawer').classList.toggle('active');
};

function updateCartUI() {
  document.getElementById('cartCount').textContent = cart.length;
  const cartItems = document.getElementById('cartItems');
  
  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-msg">તમારી કાર્ટ ખાલી છે.</p>`;
    document.getElementById('cartTotal').textContent = `₹0`;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <h4>${item.title}</h4>
        <p>₹${item.price.toLocaleString('gu-IN')}</p>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('cartTotal').textContent = `₹${total.toLocaleString('gu-IN')}`;
}

// 4. Puter.js AI Integration (Buy With AI Feature)
window.openAiModal = function(productId) {
  currentAiProduct = products.find(p => p.id === productId);
  const previewBox = document.getElementById('aiProductPreview');
  
  previewBox.innerHTML = `
    <img src="${currentAiProduct.image}" alt="${currentAiProduct.title}">
    <div>
      <h4>${currentAiProduct.title}</h4>
      <p style="color:var(--accent-gold);">₹${currentAiProduct.price.toLocaleString('gu-IN')}</p>
    </div>
  `;
  
  document.getElementById('aiModal').style.display = 'flex';
};

window.closeAiModal = function() {
  document.getElementById('aiModal').style.display = 'none';
};

window.sendAiMessage = async function() {
  const inputField = document.getElementById('aiInput');
  const userText = inputField.value.trim();
  const chatBox = document.getElementById('aiChatBox');

  if (!userText) return;

  // Render User Message
  chatBox.innerHTML += `<div class="ai-msg user">${userText}</div>`;
  inputField.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  // Add Thinking Message
  const loadingId = 'loading-' + Date.now();
  chatBox.innerHTML += `<div class="ai-msg bot" id="${loadingId}">AI વિચારી રહ્યું છે...</div>`;

  try {
    // Puter.js AI API Call (Custom Gemini powered call)
    const prompt = `તમે AURA COUTURE ના લક્ઝરી ફેશન AI કન્સલ્ટન્ટ છો. યુઝરે ${currentAiProduct.title} (કિંમત: ₹${currentAiProduct.price}) માટે પૂછ્યું છે: "${userText}". જવાબ ટૂંકમાં, વિનમ્ર અને ગુજરાતી ભાષામાં આપો.`;
    
    const response = await puter.ai.chat(prompt);
    
    const botElement = document.getElementById(loadingId);
    if(botElement) {
      botElement.textContent = typeof response === 'object' ? response.toString() : response;
    }
  } catch (err) {
    console.error("Puter AI Error:", err);
    const botElement = document.getElementById(loadingId);
    if(botElement) {
      botElement.textContent = "માફ કરશો, AI કન્સલ્ટેશનમાં ત્રુટિ આવી છે. કૃપા કરીને થોડીવાર પછી પ્રયત્ન કરો.";
    }
  }
  chatBox.scrollTop = chatBox.scrollHeight;
};

// Initialize App
renderProducts();