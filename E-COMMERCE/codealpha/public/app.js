/* ==========================================================================
   NovaTech E-Commerce SPA Application Script (Routing, Cart, Auth & Logic)
   ========================================================================== */

// --- SVG Icons Registry ---
const ICONS = {
  cart: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z"/><path d="M3 6h18M16 10a4 4 0 01-8 0"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="display:inline-block; vertical-align:middle;"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  star: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="display:inline-block; vertical-align:middle; margin-right: 2px;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
  starHalf: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="display:inline-block; vertical-align:middle; margin-right: 2px;"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27V2.27V17.27l6.18 3.73-1.64-7.03z"/></svg>`,
  starEmpty: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block; vertical-align:middle; margin-right: 2px;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  minus: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-left:4px;"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  user: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  check: `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  info: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  close: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  boxOpen: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><path d="M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16V8z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:8px;"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  creditCard: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:8px;"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  volume: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`
};

// --- Global Application State ---
const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  products: [],
  activeCategory: 'all'
};

// --- Helper for formatting INR prices ---
function formatPrice(amount) {
  return '₹' + amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// --- Grounded, realistic, flawed reviews dataset ---
const REVIEWS_DATA = {
  1: [
    { name: "Tushar K.", rating: 4, date: "May 12, 2026", text: "Keycaps feel amazing and the tactile brown switches are super crisp. However, the custom RGB configuration software is Windows-only, so had to struggle on macOS." },
    { name: "Aditi G.", rating: 5, date: "June 2, 2026", text: "Hands down the best keyboard I have used. Survives 10+ hours of typing every single day." }
  ],
  2: [
    { name: "Ananya S.", rating: 5, date: "April 28, 2026", text: "Brilliant noise cancellation on my Bangalore metro commutes, and fast charge is a lifesaver. Extremely comfortable." },
    { name: "Rohan V.", rating: 4, date: "May 15, 2026", text: "Sound quality is outstanding. The treble can sound slightly sharp out of the box until you burn them in for a few hours." }
  ],
  3: [
    { name: "Vikram M.", rating: 4, date: "March 10, 2026", text: "Absolute beast for side-by-side IDE windows. One minor issue: the stand has a massive footprint and the unit itself is incredibly heavy. Make sure you have a solid wood desk." },
    { name: "Kunal S.", rating: 5, date: "May 20, 2026", text: "Crisp resolution, high refresh rate makes reading code super smooth. Worth every rupee." }
  ],
  4: [
    { name: "Sameer R.", rating: 4, date: "May 25, 2026", text: "Super light weight (68g) and glides smoothly. Battery life is solid. The scroll wheel developed a minor squeak after a week of intense use, but a drop of lubricant fixed it." },
    { name: "Nisha P.", rating: 5, date: "June 4, 2026", text: "Extremely accurate. Felt a huge relief on my wrist immediately." }
  ],
  5: [
    { name: "Priya N.", rating: 4, date: "April 18, 2026", text: "Loads of pockets, laptop feels completely protected by the suspended sleeve. Water resistance holds up against sudden Bangalore rain showers. It's a bit rigid and bulky if not fully packed." },
    { name: "Devansh S.", rating: 5, date: "May 29, 2026", text: "Built like a tank. Fits my 16 inch MacBook Pro, mechanical keyboard, headphones and water bottle with room to spare." }
  ],
  6: [
    { name: "Rohan D.", rating: 4, date: "April 30, 2026", text: "No screen glare, which is perfect. Love the touch controls. Color temperature setting doesn't persist after power cycling though, which gets annoying." },
    { name: "Kavitha M.", rating: 5, date: "June 1, 2026", text: "Saves a ton of desk space. The dynamic lighting color matches whatever I need for coding late at night." }
  ]
};

// --- Web Audio Mechanical Key Switch Synthesizer ---
function playSwitchSound(switchType) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  
  const ctx = new AudioContext();
  const now = ctx.currentTime;
  
  if (switchType === "Clicky Blue") {
    // Sharp high pitch transient click + secondary bounce click
    // Click 1: tactile bump
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(2400, now);
    osc1.frequency.exponentialRampToValueAtTime(1000, now + 0.012);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.015);
    
    // Click 2: housing contact
    const delay = 0.012;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1800, now + delay);
    osc2.frequency.exponentialRampToValueAtTime(450, now + delay + 0.02);
    gain2.gain.setValueAtTime(0.15, now + delay);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.02);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + delay);
    osc2.stop(now + delay + 0.025);
    
  } else if (switchType === "Linear Red") {
    // Linear Red: quiet, lower-pitched "thock"
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.07);
    
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
    
  } else {
    // Tactile Brown (Default): subtle bump click + clack
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(1200, now);
    osc1.frequency.exponentialRampToValueAtTime(300, now + 0.015);
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.018);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(330, now + 0.004);
    osc2.frequency.exponentialRampToValueAtTime(140, now + 0.055);
    gain2.gain.setValueAtTime(0.22, now + 0.004);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.004);
  }
}

// --- Transient Cart Button Feedback Helper ---
function triggerCartButtonFeedback(buttonElement, originalHtml, quantity = 1) {
  buttonElement.disabled = true;
  buttonElement.innerHTML = 'Adding...';
  
  setTimeout(() => {
    buttonElement.innerHTML = `Got it! +${quantity}`;
    buttonElement.style.backgroundColor = 'var(--success)';
    buttonElement.style.borderColor = 'var(--success)';
    buttonElement.style.color = '#ffffff';
    
    setTimeout(() => {
      buttonElement.innerHTML = originalHtml;
      buttonElement.style.backgroundColor = '';
      buttonElement.style.borderColor = '';
      buttonElement.style.color = '';
      buttonElement.disabled = false;
    }, 1500);
  }, 350);
}


// --- Dev-to-Dev Q&A Section Dataset ---
const QA_DATA = {
  1: [
    { q: "Is the layout fully programmable? Do I need a software client running to keep my layers?", a: "Yes, the layout is fully programmable. The keyboard supports onboard memory profiles, so once you flash your layers, they persist across macOS/Linux without any background client." },
    { q: "Does the spacebar have dampening? I code in an open-plan office and my last mechanical board was too loud.", a: "We pre-install silicon dampener pads under the spacebar stabilizers. It produces a deep 'thock' rather than a high-pitched click, keeping office peace." }
  ],
  2: [
    { q: "How is the ANC latency when connected via Bluetooth to a Linux workstation?", a: "With Bluetooth 5.2, latency is around 80ms. For latency-critical coding sessions or video calls, we recommend using the included USB-C to 3.5mm low-latency wired connection." },
    { q: "Does the microphone reject mechanical keyboard clicking sounds during calls?", a: "The beamforming mic array features built-in DSP noise suppression which specifically targets and isolates typing frequencies. Your teammates will only hear your voice." }
  ],
  3: [
    { q: "Can I run picture-by-picture (PBP) split screen with a Mac and a PC simultaneously?", a: "Yes! The Horizon Curv-34 supports PBP side-by-side display input. You can connect your Mac via USB-C/DisplayPort and your PC via HDMI and split the 34-inch screen cleanly in half." },
    { q: "Is the text scaling crisp on macOS without causing blurry fonts?", a: "At UWQHD (3440 x 1440), macOS font smoothing renders cleanly. We recommend setting the system scale to 'Default for display' to get a perfect pixel ratio." }
  ],
  4: [
    { q: "Can the DPI profile buttons be disabled to avoid accidental shifts during work?", a: "Yes, the DPI cycle button is located at the bottom of the mouse to prevent accidental clicks. You can also customize or lock the stages." },
    { q: "How long does the battery last if the mouse is left on 24/7?", a: "It has a smart auto-sleep mode that triggers after 3 minutes of inactivity, drawing virtually 0 power. Under daily dev use, a single charge lasts about 3-4 weeks." }
  ],
  5: [
    { q: "Is the laptop sleeve suspended off the bottom of the bag?", a: "Yes, it features a 1-inch bottom clearance buffer zone, so even if you drop the bag on concrete, your laptop will not absorb the direct impact." },
    { q: "Can it fit a 16-inch MacBook Pro and an iPad Pro concurrently in separate slots?", a: "Absolutely! There is a dedicated 16-inch padded laptop pocket and a separate, soft-lined tablet sleeve inside the main compartment." }
  ],
  6: [
    { q: "Does it block webcam mounting or interfere with the camera angle?", a: "It has a slim rear counterweight design. Most webcams can sit comfortably on top of the lightbar mount itself without blocking the lens or screen." },
    { q: "Does it work with curved monitors, or will the light bleed onto the glass?", a: "The asymmetrical projection angle is specifically designed to direct light downward at a 45-degree angle, preventing any glare or light bleed even on high-curvature screens." }
  ]
};

// --- API Helper Function ---
async function apiFetch(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (state.token) {
    headers['Authorization'] = `Bearer ${state.token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

// --- Toast Notification System ---
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let iconSvg = ICONS.info;
  if (type === 'success') iconSvg = ICONS.check;
  if (type === 'error') iconSvg = ICONS.warning;

  toast.innerHTML = `
    <span class="toast-icon-wrapper" style="display: flex; align-items: center; color: inherit;">${iconSvg}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" style="display: flex; align-items: center; justify-content: center;">${ICONS.close}</button>
  `;

  container.appendChild(toast);

  // Close event listener
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  });

  // Self destruct timer
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}

// --- Cart Operations ---
function updateCartCount() {
  const countElement = document.getElementById('cart-count');
  if (countElement) {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    countElement.textContent = totalCount;
    // Simple micro-animation pop effect
    countElement.style.transform = 'scale(1.2)';
    setTimeout(() => countElement.style.transform = 'scale(1)', 150);
  }
}

// Save cart to local storage and update count
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(state.cart));
  updateCartCount();
}

// Add item to cart with selected options
function addToCart(productId, quantity = 1, productName = '', selectedOptions = null) {
  productId = parseInt(productId);

  // If options are not provided, try to find and set default options from products list
  if (!selectedOptions) {
    const product = state.products.find(p => p.id === productId);
    if (product && product.options) {
      try {
        const parsedOpts = JSON.parse(product.options);
        selectedOptions = {};
        if (parsedOpts.colors && parsedOpts.colors.length > 0) {
          selectedOptions.color = parsedOpts.colors[0];
        }
        if (parsedOpts.switches && parsedOpts.switches.length > 0) {
          selectedOptions.switch = parsedOpts.switches[0];
        }
      } catch (e) {
        console.error("Error setting default options:", e);
      }
    }
  }

  // Find index of item with identical product ID AND identical options
  const existingItemIndex = state.cart.findIndex(item => {
    if (item.productId !== productId) return false;
    if (!selectedOptions && !item.selectedOptions) return true;
    if (!selectedOptions || !item.selectedOptions) return false;
    return JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions);
  });

  if (existingItemIndex > -1) {
    state.cart[existingItemIndex].quantity += quantity;
  } else {
    state.cart.push({ productId, quantity, selectedOptions });
  }

  saveCart();

  let optionsText = '';
  if (selectedOptions) {
    const optsList = [];
    if (selectedOptions.color) optsList.push(selectedOptions.color);
    if (selectedOptions.switch) optsList.push(selectedOptions.switch);
    if (optsList.length > 0) {
      optionsText = ` (${optsList.join(', ')})`;
    }
  }
  showToast(`${productName || 'Item'}${optionsText} added to shopping cart!`, 'success');
}

// Remove item from cart by its array index
function removeFromCart(index) {
  state.cart.splice(index, 1);
  saveCart();
  showToast('Item removed from cart.', 'info');
  renderCart(); // Refresh the cart view if we are on it
}

// Update item quantity in cart by its array index
function updateCartQuantity(index, quantity) {
  if (quantity <= 0) {
    removeFromCart(index);
  } else {
    state.cart[index].quantity = quantity;
    saveCart();
    renderCart(); // Refresh the cart view to recalculate totals
  }
}

function clearCart() {
  state.cart = [];
  saveCart();
}

// --- Authentication Operations ---
function logout() {
  state.user = null;
  state.token = null;
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  showToast('You have logged out.', 'info');
  updateNavbarAuth();
  // Redirect to home
  window.location.hash = '#home';
}

function updateNavbarAuth() {
  const authNav = document.getElementById('auth-nav');
  if (!authNav) return;

  if (state.user) {
    authNav.innerHTML = `
      <div class="auth-username">
        <span style="display: flex; align-items: center;">${ICONS.user}</span>
        <span>${state.user.username}</span>
      </div>
      <a href="#orders" class="btn btn-outline btn-sm">My Orders</a>
      <button id="logout-btn" class="btn btn-outline btn-sm" onclick="logout()">Log Out</button>
    `;
  } else {
    authNav.innerHTML = `
      <a href="#login" class="nav-auth-link" style="margin-right: 8px;">Log In</a>
      <a href="#register" class="btn-ghost">Sign Up</a>
    `;
  }
}

// Ensure logout is accessible globally from the inline onclick
window.logout = logout;

// --- Client-Side Routing ---
const routes = {
  '#home': renderHome,
  '#builder': renderBuilder,
  '#cart': renderCart,
  '#checkout': renderCheckout,
  '#login': renderLogin,
  '#register': renderRegister,
  '#orders': renderOrders,
  '#faq': renderFAQ,
  '#returns': renderReturns
};

function router() {
  const hash = window.location.hash || '#home';
  const viewContainer = document.getElementById('view-container');
  const heroBanner = document.getElementById('hero-banner');

  // Show/Hide Hero Section (only on home page)
  if (hash === '#home' || hash === '') {
    if (heroBanner) heroBanner.style.display = 'flex';
  } else {
    if (heroBanner) heroBanner.style.display = 'none';
  }

  // Update navbar link active states
  document.querySelectorAll('.nav-links .nav-link').forEach(link => {
    const category = link.getAttribute('data-category');
    if ((hash === '#home' || hash === '') && category && category.toLowerCase() === state.activeCategory.toLowerCase()) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Match route
  let routeFunction = routes[hash];
  let routeParam = null;

  // Check if matches sub-routes (e.g. #product/1)
  if (hash.startsWith('#product/')) {
    // Split and clean empty values (e.g. trailing slashes like #product/1/)
    const parts = hash.split('/').filter(p => p !== '');
    if (parts.length === 2) {
      const idStr = parts[1];
      if (/^\d+$/.test(idStr)) {
        routeFunction = renderProductDetails;
        routeParam = parseInt(idStr);
      }
    }
  }

  if (routeFunction) {
    // Show loader first
    viewContainer.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
      </div>
    `;
    routeFunction(routeParam);
  } else {
    // Default 404
    viewContainer.innerHTML = `
      <div style="text-align: center; padding: 80px 20px;">
        <h2 style="font-size: 3.5rem; font-family: 'Outfit', sans-serif; margin-bottom: 16px;">404</h2>
        <h3 style="margin-bottom: 12px;">Oops! Route Not Found</h3>
        <p style="color: var(--text-secondary); margin-bottom: 28px; max-width: 450px; margin-left: auto; margin-right: auto;">
          The page you are looking for does not exist, or the link has been changed. Let's get you back on track.
        </p>
        <a href="#home" class="btn btn-primary">Return to Shop</a>
      </div>
    `;
  }
}

// --- View Rendering Logic ---

// Workspace Bundle Builder View
async function renderBuilder() {
  const viewContainer = document.getElementById('view-container');
  
  // Set default builder state if not present
  if (!state.builder) {
    state.builder = { deck: null, view: null, utility: null, currentStep: 1 };
  }
  
  viewContainer.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
    </div>
  `;
  
  try {
    // Fetch products if empty
    if (state.products.length === 0) {
      const data = await apiFetch('/api/products');
      state.products = data.products;
    }
    
    // Group products by step categories
    // Step 1: Decks (Category: Peripherals, specifically keyboards)
    const decks = state.products.filter(p => p.category === 'Peripherals' && p.name.toLowerCase().includes('keyboard'));
    // Step 2: Views (Category: Displays)
    const views = state.products.filter(p => p.category === 'Displays');
    // Step 3: Utilities (Category: Lifestyle or Peripherals that are not keyboards/monitors, L-1 Lightbar and Commuter Tech Pack)
    const utilities = state.products.filter(p => p.id === 5 || p.id === 6);
    
    const step = state.builder.currentStep;
    let currentPool = [];
    let stepTitle = '';
    let stepDesc = '';
    
    if (step === 1) {
      currentPool = decks;
      stepTitle = 'Step 1: Choose Your Deck';
      stepDesc = 'Select a high-end mechanical keyboard engineered to survive marathon coding sessions.';
    } else if (step === 2) {
      currentPool = views;
      stepTitle = 'Step 2: Choose Your View';
      stepDesc = 'Select an immersive curved monitor to spread out your files and save your neck.';
    } else {
      currentPool = utilities;
      stepTitle = 'Step 3: Choose Your Utility';
      stepDesc = 'Select a smart monitor lightbar or a commuter tech pack to complete your workstation.';
    }
    
    // Calculate subtotal and details of choices
    const selectedDeck = state.builder.deck ? state.products.find(p => p.id === state.builder.deck) : null;
    const selectedView = state.builder.view ? state.products.find(p => p.id === state.builder.view) : null;
    const selectedUtility = state.builder.utility ? state.products.find(p => p.id === state.builder.utility) : null;
    
    let subtotal = 0;
    if (selectedDeck) subtotal += selectedDeck.price;
    if (selectedView) subtotal += selectedView.price;
    if (selectedUtility) subtotal += selectedUtility.price;
    
    const isComplete = selectedDeck && selectedView && selectedUtility;
    const discount = isComplete ? 1500 : 0;
    const total = subtotal - discount;
    
    // Render builder HTML
    let poolHtml = '';
    currentPool.forEach(product => {
      let isSelected = false;
      if (step === 1 && state.builder.deck === product.id) isSelected = true;
      if (step === 2 && state.builder.view === product.id) isSelected = true;
      if (step === 3 && state.builder.utility === product.id) isSelected = true;
      
      poolHtml += `
        <div class="glass-card builder-product-card ${isSelected ? 'selected' : ''}" style="border: 2px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}; padding: 20px; border-radius: var(--border-radius-md); display: flex; flex-direction: column; gap: 16px; background: var(--bg-secondary); transition: all 0.3s ease;">
          <img src="${product.image_url}" alt="${product.name}" style="width: 100%; height: 160px; object-fit: cover; border-radius: var(--border-radius-sm);">
          <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
            <h4 style="font-size: 1.1rem; font-family: 'Outfit', sans-serif; margin: 0; text-align: left;">${product.name}</h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0; text-align: left;">${product.description}</p>
            <span style="font-size: 1.2rem; font-weight: 800; color: var(--primary); text-align: left;">${formatPrice(product.price)}</span>
          </div>
          <button class="btn ${isSelected ? 'btn-primary' : 'btn-outline'} select-builder-item-btn" data-id="${product.id}" style="width: 100%;">
            ${isSelected ? 'Selected' : 'Select'}
          </button>
        </div>
      `;
    });
    
    viewContainer.innerHTML = `
      <div style="margin-bottom: 32px; text-align: center;">
        <span style="background-color: var(--accent-light); color: var(--accent); padding: 6px 14px; border-radius: var(--border-radius-pill); font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1.5px; display: inline-block; margin-bottom: 12px;">Visual Workspace Customizer</span>
        <h2 style="font-size: 2.2rem; font-family: 'Outfit', sans-serif; margin-bottom: 8px;">Assemble Your Station</h2>
        <p style="color: var(--text-secondary); max-width: 650px; margin: 0 auto; line-height: 1.6;">
          Build your ultimate workstation package. Complete all 3 steps to unlock a flat <strong style="color: var(--success);">₹1,500.00 bundle discount</strong>!
        </p>
      </div>
      
      <!-- Stepper Indicator -->
      <div class="builder-stepper" style="display: flex; justify-content: center; align-items: center; gap: 12px; margin-bottom: 40px; flex-wrap: wrap;">
        <button class="step-indicator-btn ${step === 1 ? 'active' : ''} ${selectedDeck ? 'completed' : ''}" data-step="1" style="display: flex; align-items: center; gap: 8px; border: 1px solid var(--border-color); padding: 10px 16px; border-radius: var(--border-radius-pill); background: ${step === 1 ? 'var(--primary)' : 'var(--bg-secondary)'}; color: ${step === 1 ? '#ffffff' : 'var(--text-primary)'}; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
          <span style="width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; border: 1px solid currentColor;">1</span> Keyboard
        </button>
        <span style="color: var(--text-muted);">→</span>
        <button class="step-indicator-btn ${step === 2 ? 'active' : ''} ${selectedView ? 'completed' : ''}" data-step="2" style="display: flex; align-items: center; gap: 8px; border: 1px solid var(--border-color); padding: 10px 16px; border-radius: var(--border-radius-pill); background: ${step === 2 ? 'var(--primary)' : 'var(--bg-secondary)'}; color: ${step === 2 ? '#ffffff' : 'var(--text-primary)'}; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
          <span style="width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; border: 1px solid currentColor;">2</span> Monitor
        </button>
        <span style="color: var(--text-muted);">→</span>
        <button class="step-indicator-btn ${step === 3 ? 'active' : ''} ${selectedUtility ? 'completed' : ''}" data-step="3" style="display: flex; align-items: center; gap: 8px; border: 1px solid var(--border-color); padding: 10px 16px; border-radius: var(--border-radius-pill); background: ${step === 3 ? 'var(--primary)' : 'var(--bg-secondary)'}; color: ${step === 3 ? '#ffffff' : 'var(--text-primary)'}; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
          <span style="width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; border: 1px solid currentColor;">3</span> Utility
        </button>
      </div>
      
      <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; align-items: start;">
        <!-- Left Panel: Products List -->
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 16px; margin-bottom: 8px; text-align: left;">
            <h3 style="font-size: 1.35rem; font-family: 'Outfit', sans-serif; margin-bottom: 4px;">${stepTitle}</h3>
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin: 0; line-height: 1.5;">${stepDesc}</p>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
            ${poolHtml}
          </div>
        </div>
        
        <!-- Right Panel: Summary -->
        <div class="glass-card" style="position: sticky; top: 100px; padding: 24px; display: flex; flex-direction: column; gap: 20px; border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); background: var(--bg-secondary);">
          <h3 style="font-size: 1.25rem; font-family: 'Outfit', sans-serif; margin: 0; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; text-align: left;">Your Workspace Configuration</h3>
          
          <div style="display: flex; flex-direction: column; gap: 16px; min-height: 150px; text-align: left;">
            <!-- Choice 1: Deck -->
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding-bottom: 12px;">
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 2px;">Step 1: Deck</span>
                <strong style="font-size: 0.9rem;">${selectedDeck ? selectedDeck.name : 'Not Selected'}</strong>
              </div>
              <div style="font-weight: 700; font-size: 0.95rem;">${selectedDeck ? formatPrice(selectedDeck.price) : '—'}</div>
            </div>
            
            <!-- Choice 2: View -->
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding-bottom: 12px;">
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 2px;">Step 2: View</span>
                <strong style="font-size: 0.9rem;">${selectedView ? selectedView.name : 'Not Selected'}</strong>
              </div>
              <div style="font-weight: 700; font-size: 0.95rem;">${selectedView ? formatPrice(selectedView.price) : '—'}</div>
            </div>
            
            <!-- Choice 3: Utility -->
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding-bottom: 12px;">
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 2px;">Step 3: Utility</span>
                <strong style="font-size: 0.9rem;">${selectedUtility ? selectedUtility.name : 'Not Selected'}</strong>
              </div>
              <div style="font-weight: 700; font-size: 0.95rem;">${selectedUtility ? formatPrice(selectedUtility.price) : '—'}</div>
            </div>
          </div>
          
          <!-- Pricings -->
          <div style="display: flex; flex-direction: column; gap: 10px; padding-top: 12px; border-top: 1px solid var(--border-color); text-align: left;">
            <div class="summary-row" style="display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--text-secondary);">
              <span>Items Subtotal</span>
              <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="summary-row" style="display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--success); font-weight: 600;">
              <span>Bundle Discount</span>
              <span>${discount > 0 ? '-' + formatPrice(discount) : '₹0.00'}</span>
            </div>
            <div class="summary-row" style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 800; border-top: 1px solid var(--border-color); padding-top: 12px; margin-top: 4px;">
              <span>Estimated Total</span>
              <span>${formatPrice(total)}</span>
            </div>
          </div>
          
          <!-- Actions -->
          <button class="btn btn-primary add-bundle-to-cart-btn" ${!isComplete ? 'disabled' : ''} style="width: 100%; margin-top: 12px; display: flex; align-items: center; justify-content: center; gap: 8px;${!isComplete ? ' cursor: not-allowed; opacity: 0.5;' : ''}">
            ${ICONS.cart} Add Bundle to Cart
          </button>
          
          ${!isComplete 
            ? `<div style="font-size: 0.75rem; color: var(--text-muted); text-align: center;">Choose an item from each step to unlock the ₹1,500.00 setup savings.</div>` 
            : `<div style="font-size: 0.75rem; color: var(--success); text-align: center; font-weight: 600;">Bundle discount unlocked! You're saving ₹1,500.00 on the set.</div>`
          }
        </div>
      </div>
    `;
    
    // Attach event listeners for steps indicators
    document.querySelectorAll('.step-indicator-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const stepNum = parseInt(e.target.closest('.step-indicator-btn').getAttribute('data-step'));
        state.builder.currentStep = stepNum;
        renderBuilder();
      });
    });
    
    // Attach event listeners for item select buttons
    document.querySelectorAll('.select-builder-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const btnElem = e.target.closest('.select-builder-item-btn');
        const id = parseInt(btnElem.getAttribute('data-id'));
        if (step === 1) {
          state.builder.deck = id;
          state.builder.currentStep = 2; // Auto advance to monitor selection
        } else if (step === 2) {
          state.builder.view = id;
          state.builder.currentStep = 3; // Auto advance to accessory selection
        } else {
          state.builder.utility = id;
        }
        renderBuilder();
      });
    });
    
    // Attach event listener for bundle cart addition
    const addBundleBtn = document.querySelector('.add-bundle-to-cart-btn');
    if (addBundleBtn) {
      addBundleBtn.addEventListener('click', () => {
        if (!isComplete) return;
        
        // Add all 3 items to cart
        addToCart(state.builder.deck, 1, selectedDeck.name);
        addToCart(state.builder.view, 1, selectedView.name);
        addToCart(state.builder.utility, 1, selectedUtility.name);
        
        showToast('Workspace bundle successfully added to your cart!', 'success');
        
        // Reset builder state
        state.builder = { deck: null, view: null, utility: null, currentStep: 1 };
        
        // Redirect to cart
        window.location.hash = '#cart';
      });
    }
    
  } catch (error) {
    viewContainer.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <span style="display: flex; align-items: center; justify-content: center; color: var(--error); margin-bottom: 16px; transform: scale(1.5);">
          ${ICONS.warning}
        </span>
        <h3>Failed to initialize customizer</h3>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">${error.message}</p>
        <a href="#home" class="btn btn-primary">Return to Shop</a>
      </div>
    `;
  }
}

// 1. Home / Products Listing Page
async function renderHome() {
  const viewContainer = document.getElementById('view-container');
  
  try {
    // Render skeleton loaders immediately if products aren't fetched
    if (state.products.length === 0) {
      let skeletonHtml = `
        <div class="view-header">
          <h2 class="section-title">Shop Collection</h2>
          <div class="filter-bar">
            <button class="filter-btn active" style="opacity: 0.6; pointer-events: none;">All Items</button>
            <button class="filter-btn" style="opacity: 0.6; pointer-events: none;">Peripherals</button>
            <button class="filter-btn" style="opacity: 0.6; pointer-events: none;">Audio</button>
            <button class="filter-btn" style="opacity: 0.6; pointer-events: none;">Displays</button>
            <button class="filter-btn" style="opacity: 0.6; pointer-events: none;">Lifestyle</button>
          </div>
        </div>
        <div class="products-grid">
      `;
      for (let i = 0; i < 6; i++) {
        skeletonHtml += `
          <div class="skeleton-card">
            <div class="skeleton-img skeleton-shimmer"></div>
            <div class="skeleton-body">
              <div class="skeleton-line short skeleton-shimmer"></div>
              <div class="skeleton-line long skeleton-shimmer" style="height: 24px;"></div>
              <div class="skeleton-line medium skeleton-shimmer"></div>
              <div class="skeleton-line short skeleton-shimmer"></div>
              <div class="skeleton-line btn-shimmer skeleton-shimmer"></div>
            </div>
          </div>
        `;
      }
      skeletonHtml += `</div>`;
      viewContainer.innerHTML = skeletonHtml;

      // Mock a slight network delay to make the shimmer visible and premium
      await new Promise(resolve => setTimeout(resolve, 800));

      const data = await apiFetch('/api/products');
      state.products = data.products;
    }

    // Filter products
    const filteredProducts = state.activeCategory === 'all'
      ? state.products
      : state.products.filter(p => p.category.toLowerCase() === state.activeCategory.toLowerCase());

    // Generate Layout
    let html = `
      <div class="view-header">
        <h2 class="section-title">Shop Collection</h2>
        <div class="filter-bar">
          <button class="filter-btn ${state.activeCategory === 'all' ? 'active' : ''}" data-category="all">All Items</button>
          <button class="filter-btn ${state.activeCategory === 'peripherals' ? 'active' : ''}" data-category="Peripherals">Peripherals</button>
          <button class="filter-btn ${state.activeCategory === 'audio' ? 'active' : ''}" data-category="Audio">Audio</button>
          <button class="filter-btn ${state.activeCategory === 'displays' ? 'active' : ''}" data-category="Displays">Displays</button>
          <button class="filter-btn ${state.activeCategory === 'lifestyle' ? 'active' : ''}" data-category="Lifestyle">Lifestyle</button>
        </div>
      </div>

      <div class="products-grid">
    `;

    if (filteredProducts.length === 0) {
      html += `<p style="grid-column: span 3; text-align: center; color: var(--text-secondary); padding: 40px;">No products found in this category.</p>`;
    } else {
      filteredProducts.forEach(product => {
        // Generating rating stars
        let starsHtml = '';
        const floorRating = Math.floor(product.rating);
        for (let i = 1; i <= 5; i++) {
          if (i <= floorRating) {
            starsHtml += ICONS.star;
          } else if (i - 0.5 <= product.rating) {
            starsHtml += ICONS.starHalf;
          } else {
            starsHtml += ICONS.starEmpty;
          }
        }

        // Determine stock label
        const isOutOfStock = product.stock <= 0;
        const isLowStock = product.stock > 0 && product.stock <= 5;
        let stockBadgeHtml = '';
        if (isOutOfStock) {
          stockBadgeHtml = `<span class="stock-badge-tag out-of-stock">Out of Stock</span>`;
        } else if (isLowStock) {
          stockBadgeHtml = `<span class="stock-badge-tag low-stock"><span class="pulse-dot">●</span> Only ${product.stock} Left</span>`;
        }

        html += `
          <div class="product-card" data-product-id="${product.id}">
            <div class="product-card-img-wrapper">
              <a href="#product/${product.id}">
                <img src="${product.image_url}" alt="${product.name}" class="product-card-img" onerror="this.src='https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80'">
              </a>
              <span class="product-card-category">${product.category}</span>
              ${stockBadgeHtml}
            </div>
            <div class="product-card-body">
              <div class="product-card-rating">
                <span style="display: flex; align-items: center; color: var(--warning); gap: 2px;">${starsHtml}</span>
                <span class="rating-val" style="margin-left: 4px;">${product.rating} <span style="color: var(--text-muted); font-size: 0.8rem; font-weight: normal;">(${product.review_count || 0})</span></span>
              </div>
              <h3 class="product-card-title">
                <a href="#product/${product.id}">${product.name}</a>
              </h3>
              <p class="product-card-desc">${product.description}</p>
              <div class="product-card-price-row">
                <span class="product-card-price">${formatPrice(product.price)}</span>
              </div>
              <div class="product-card-actions">
                ${isOutOfStock 
                  ? `<button class="btn btn-outline" style="width: 100%; color: var(--error); border-color: var(--error); cursor: not-allowed; opacity: 0.6;" disabled>Out of stock</button>`
                  : `<button class="btn btn-primary add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;">
                       ${ICONS.cart} Add to Cart
                     </button>`
                }
              </div>
            </div>
          </div>
        `;
      });
    }

    html += `</div>`;

    // Workspace Bundle Promotion Banner
    html += `
      <div class="bundle-promo-banner glass-card animate-fade-in" style="margin-top: 50px; padding: 40px; display: flex; align-items: center; justify-content: space-between; gap: 24px; border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); background: radial-gradient(120% 120% at 0% 0%, rgba(6, 182, 212, 0.05) 0%, rgba(99, 102, 241, 0.02) 50%, transparent 100%), var(--bg-secondary);">
        <div style="flex: 1;">
          <span style="background-color: var(--accent-light); color: var(--accent); padding: 6px 12px; border-radius: var(--border-radius-pill); font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1.2px; display: inline-block; margin-bottom: 12px;">Workspace Bundle Offer</span>
          <h3 style="font-size: 1.45rem; font-family: 'Outfit', sans-serif; margin-bottom: 8px;">Assemble Your Station</h3>
          <p style="color: var(--text-secondary); line-height: 1.6; margin: 0; max-width: 650px;">
            Build your dream workspace setup in 3 quick visual steps. Select your keyboard, monitor, and accessory to save a flat <strong style="color: var(--success);">₹1,500.00</strong> on the complete package. Good gear shouldn't cost a kidney.
          </p>
        </div>
        <div>
          <a href="#builder" class="btn btn-primary btn-lg" style="white-space: nowrap; font-size: 0.95rem;">Assemble Setup</a>
        </div>
      </div>
    `;

    // Append Show Us Your Setup Gallery
    html += `
      <section class="community-section" style="margin-top: 80px; padding-top: 60px; border-top: 1px solid var(--border-color);">
        <h2 class="section-title" style="margin-bottom: 12px; font-family: 'Outfit', sans-serif;">Show Us Your Setup</h2>
        <p style="color: var(--text-secondary); text-align: center; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">
          Join our Discord community and share your workspace setup using the hashtag <strong style="color: var(--primary);">#NovaTechSetup</strong> to get featured. Hover over any setups to inspect what gear they use.
        </p>
        <div class="setup-gallery">
          <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=400&q=80" alt="Minimal Developer Workspace">
            <div class="gallery-overlay">
              <span>@aditya.codes</span>
            </div>
            <div class="hotspots-container">
              <div class="hotspot" style="top: 72%; left: 45%;">
                <span class="hotspot-dot"></span>
                <div class="hotspot-tooltip">
                  <strong>NovaTech KB-75 Keyboard</strong>
                  <span>₹9,499.00</span>
                  <a href="#product/1" class="tooltip-btn">View Gear</a>
                </div>
              </div>
              <div class="hotspot" style="top: 25%; left: 52%;">
                <span class="hotspot-dot"></span>
                <div class="hotspot-tooltip">
                  <strong>Lumina Lightbar (Model L-1)</strong>
                  <span>₹3,499.00</span>
                  <a href="#product/6" class="tooltip-btn">View Gear</a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=400&q=80" alt="Dark Mode Workspace">
            <div class="gallery-overlay">
              <span>@tushar.dev</span>
            </div>
            <div class="hotspots-container">
              <div class="hotspot" style="top: 35%; left: 50%;">
                <span class="hotspot-dot"></span>
                <div class="hotspot-tooltip">
                  <strong>Horizon Curv-34 Monitor</strong>
                  <span>₹38,999.00</span>
                  <a href="#product/3" class="tooltip-btn">View Gear</a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?auto=format&fit=crop&w=400&q=80" alt="Clean Mechanical Keyboard Setup">
            <div class="gallery-overlay">
              <span>@sneha_tech</span>
            </div>
            <div class="hotspots-container">
              <div class="hotspot" style="top: 60%; left: 48%;">
                <span class="hotspot-dot"></span>
                <div class="hotspot-tooltip">
                  <strong>NovaTech KB-75 Keyboard</strong>
                  <span>₹9,499.00</span>
                  <a href="#product/1" class="tooltip-btn">View Gear</a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=400&q=80" alt="Laptop and Lightbar Setup">
            <div class="gallery-overlay">
              <span>@harish_codes</span>
            </div>
            <div class="hotspots-container">
              <div class="hotspot" style="top: 30%; left: 50%;">
                <span class="hotspot-dot"></span>
                <div class="hotspot-tooltip">
                  <strong>Lumina Lightbar (Model L-1)</strong>
                  <span>₹3,499.00</span>
                  <a href="#product/6" class="tooltip-btn">View Gear</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    viewContainer.innerHTML = html;

    // Attach listeners for category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        state.activeCategory = e.currentTarget.getAttribute('data-category').toLowerCase();
        renderHome();
      });
    });

    // Attach listeners for "Add to Cart"
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const btnElem = e.target.closest('.add-to-cart-btn');
        const id = btnElem.getAttribute('data-id');
        const name = btnElem.getAttribute('data-name');
        const originalHtml = btnElem.innerHTML;
        addToCart(id, 1, name);
        triggerCartButtonFeedback(btnElem, originalHtml, 1);
      });
    });

  } catch (error) {
    viewContainer.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <span style="display: flex; align-items: center; justify-content: center; color: var(--error); margin-bottom: 16px; transform: scale(1.5);">
          ${ICONS.warning}
        </span>
        <h3>Failed to load products</h3>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">${error.message}</p>
        <button class="btn btn-primary" onclick="renderHome()">Try Again</button>
      </div>
    `;
  }
}

// 2. Product Detail Page
async function renderProductDetails(productId) {
  const viewContainer = document.getElementById('view-container');

  try {
    const data = await apiFetch(`/api/products/${productId}`);
    const product = data.product;

    let starsHtml = '';
    const floorRating = Math.floor(product.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        starsHtml += ICONS.star;
      } else if (i - 0.5 <= product.rating) {
        starsHtml += ICONS.starHalf;
      } else {
        starsHtml += ICONS.starEmpty;
      }
    }

    const inStock = product.stock > 0;

    // Parse options & specifications
    let specs = {};
    try {
      specs = product.specifications ? JSON.parse(product.specifications) : {};
    } catch(e) {
      console.error("Error parsing specifications:", e);
    }

    let opts = {};
    try {
      opts = product.options ? JSON.parse(product.options) : {};
    } catch(e) {
      console.error("Error parsing options:", e);
    }

    // Color map for dots
    const colorMap = {
      "Obsidian Black": "#121212",
      "Arctic White": "#ffffff",
      "Matte Black": "#1a1a1a",
      "Cosmic Gray": "#3a3d40",
      "Lunar Gray": "#a6a9ac",
      "Stealth Black": "#0b0c10",
      "Midnight Silver": "#70777a"
    };

    let selectedColor = opts.colors && opts.colors.length > 0 ? opts.colors[0] : null;
    let selectedSwitch = opts.switches && opts.switches.length > 0 ? opts.switches[0] : null;

    // Render specifications html
    let specsHtml = '';
    const specEntries = Object.entries(specs);
    if (specEntries.length > 0) {
      specsHtml = `
        <div class="specs-section" style="margin-top: 40px; padding-top: 30px; border-top: 1px solid var(--border-color);">
          <h3 style="font-family: 'Outfit', sans-serif; margin-bottom: 20px;">Technical Specifications</h3>
          <div class="spec-grid">
            ${specEntries.map(([key, val]) => `
              <div class="spec-row">
                <span class="spec-label">${key}</span>
                <span class="spec-value">${val}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Render reviews html
    let reviewsHtml = '';
    const reviews = REVIEWS_DATA[product.id] || [];
    if (reviews.length > 0) {
      reviewsHtml = `
        <div class="reviews-section" style="margin-top: 50px; padding-top: 30px; border-top: 1px solid var(--border-color);">
          <h3 style="font-family: 'Outfit', sans-serif; margin-bottom: 24px;">Customer Reviews & Feedback</h3>
          <div class="reviews-list" style="display: flex; flex-direction: column; gap: 20px;">
            ${reviews.map(rev => {
              let revStars = '';
              for (let i = 1; i <= 5; i++) {
                if (i <= rev.rating) revStars += ICONS.star;
                else revStars += ICONS.starEmpty;
              }
              return `
                <div class="glass-card review-card" style="padding: 20px; display: flex; flex-direction: column; gap: 10px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: var(--text-primary); font-size: 0.95rem;">${rev.name}</strong>
                    <span style="color: var(--text-muted); font-size: 0.8rem;">${rev.date}</span>
                  </div>
                  <div style="color: var(--warning); display: flex; align-items: center; gap: 2px;">
                    ${revStars}
                  </div>
                  <p style="color: var(--text-secondary); line-height: 1.5; font-size: 0.9rem; margin: 0;">${rev.text}</p>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // Render Q&A section html
    let qaHtml = '';
    const qas = QA_DATA[product.id] || [];
    qaHtml = `
      <div class="qa-section" style="margin-top: 50px; padding-top: 30px; border-top: 1px solid var(--border-color);">
        <h3 style="font-family: 'Outfit', sans-serif; margin-bottom: 8px;">Developer Q&A</h3>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 24px;">Got a technical question? Ask our community or read verified responses from NovaTech engineers.</p>
        
        <div class="qa-list" style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 30px;">
          ${qas.map(qa => `
            <div class="glass-card qa-card" style="padding: 20px; display: flex; flex-direction: column; gap: 12px; border-left: 3px solid var(--primary);">
              <div style="display: flex; gap: 8px; align-items: flex-start;">
                <span style="background: var(--primary-light); color: var(--primary); font-weight: 700; font-size: 0.75rem; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; margin-top: 2px;">Q</span>
                <strong style="color: var(--text-primary); font-size: 0.95rem; line-height: 1.4;">${qa.q}</strong>
              </div>
              <div style="display: flex; gap: 8px; align-items: flex-start; margin-left: 4px;">
                <span style="background: rgba(16, 185, 129, 0.1); color: var(--success); font-weight: 700; font-size: 0.75rem; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; margin-top: 2px;">A</span>
                <p style="color: var(--text-secondary); line-height: 1.5; font-size: 0.9rem; margin: 0;">${qa.a}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="glass-card submit-qa-card" style="padding: 24px;">
          <h4 style="margin-top: 0; margin-bottom: 8px; font-family: 'Outfit', sans-serif;">Ask a Technical Question</h4>
          <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">Our developer support team replies to questions within 2 hours.</p>
          <form id="submit-qa-form" style="display: flex; flex-direction: column; gap: 12px;">
            <textarea id="qa-question-text" rows="3" placeholder="Will this fit my custom layout? What is the Linux compatibility..." style="width: 100%; padding: 12px; border: 1px solid var(--border-color); background: var(--bg-card); border-radius: var(--border-radius-sm); color: var(--text-primary); font-family: inherit; font-size: 0.9rem; resize: vertical;" required></textarea>
            <button type="submit" class="btn btn-outline" style="align-self: flex-start; display: flex; align-items: center; gap: 6px;">
              Submit Question
            </button>
          </form>
        </div>
      </div>
    `;

    viewContainer.innerHTML = `
      <div style="margin-bottom: 24px;">
        <a href="#home" style="color: var(--text-secondary); font-weight: 500; display: inline-flex; align-items: center;">
          ${ICONS.arrowLeft} Back to Collection
        </a>
      </div>

      <div class="detail-container">
        <div class="detail-img-panel" style="position: relative; border-radius: var(--border-radius-md); overflow: hidden;">
          <img src="${product.image_url}" alt="${product.name}" class="detail-img" onerror="this.src='https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80'">
          ${product.id === 6 ? `
            <div id="lightbar-glow-overlay" style="position: absolute; inset: 0; pointer-events: none; transition: background 0.1s ease; mix-blend-mode: screen; opacity: 0.5; background: radial-gradient(circle at 50% 15%, rgba(227, 186, 148, 0.6) 0%, rgba(255, 255, 255, 0) 70%);"></div>
          ` : ''}
        </div>

        <div class="detail-info-panel">
          <div class="detail-meta">
            <span class="detail-category">${product.category}</span>
            <div class="detail-rating">
              <span style="color: var(--warning); display: flex; align-items: center; gap: 2px;">${starsHtml}</span>
              <span>${product.rating} <span style="color: var(--text-muted); font-size: 0.85rem; font-weight: normal;">(${product.review_count || 0} reviews)</span></span>
            </div>
          </div>

          <h1 class="detail-title">${product.name}</h1>
          <div class="detail-price">${formatPrice(product.price)}</div>
          
          <p class="detail-desc">${product.description}</p>
          
          <!-- Product Options selectors -->
          ${opts.colors && opts.colors.length > 0 ? `
            <div class="option-group" style="margin-bottom: 20px;">
              <span class="option-label" style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px; display: block;">Select Colorway: <span id="selected-color-text" style="color: var(--text-primary); font-weight: 700; text-transform: none; margin-left: 4px;">${selectedColor}</span></span>
              <div class="color-selector" style="display: flex; gap: 10px;">
                ${opts.colors.map((color, index) => {
                  const hex = colorMap[color] || '#888';
                  return `
                    <button class="color-dot ${index === 0 ? 'selected' : ''}" data-color="${color}" style="background-color: ${hex}; border: 2px solid ${index === 0 ? 'var(--primary)' : (hex === '#ffffff' ? '#ccc' : hex)}; width: 28px; height: 28px; border-radius: 50%; cursor: pointer; transition: all 0.2s;" title="${color}"></button>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}

          ${opts.switches && opts.switches.length > 0 ? `
            <div class="option-group" style="margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
                <span class="option-label" style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; margin: 0; display: block;">Select Switch Type: <span id="selected-switch-text" style="color: var(--text-primary); font-weight: 700; text-transform: none; margin-left: 4px;">${selectedSwitch}</span></span>
                <button id="hear-switches-btn" class="btn btn-outline" style="padding: 4px 8px; font-size: 0.75rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; border-radius: 4px; height: auto;">
                  ${ICONS.volume} Hear Click
                </button>
              </div>
              <div class="switch-selector" style="display: flex; gap: 10px; flex-wrap: wrap;">
                ${opts.switches.map((sw, index) => `
                  <button class="switch-btn ${index === 0 ? 'selected' : ''}" data-switch="${sw}" style="padding: 8px 16px; border: 1px solid var(--border-color); background: var(--bg-card); border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: 500; transition: all 0.2s; color: var(--text-primary);">
                    ${sw}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${product.id === 6 ? `
            <div class="option-group" style="margin-bottom: 24px;">
              <span class="option-label" style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px; display: block;">
                Adjust Ambient Temperature: <span id="temp-value" style="color: var(--text-primary); font-weight: 700; margin-left: 4px;">4000K (Neutral)</span>
              </span>
              <div style="display: flex; align-items: center; gap: 12px; max-width: 320px;">
                <span style="font-size: 0.75rem; color: #ff9d2b; font-weight: 600;">2700K (Warm)</span>
                <input type="range" id="lightbar-temp-slider" min="2700" max="6500" value="4000" style="flex: 1; accent-color: var(--primary); cursor: pointer; height: 6px; border-radius: 3px; outline: none; background: linear-gradient(to right, #ff9d2b, #ffffff, #a6cfff);">
                <span style="font-size: 0.75rem; color: #a6cfff; font-weight: 600;">6500K (Cool)</span>
              </div>
            </div>
          ` : ''}

          <div class="detail-stock-status" style="margin-bottom: 24px;">
            <span class="stock-badge ${inStock ? (product.stock <= 5 ? 'stock-low' : 'stock-in') : 'stock-out'}"></span>
            <span>${inStock ? (product.stock <= 5 ? `Low Stock (Only ${product.stock} Left - Order Soon!)` : `In Stock (${product.stock} items available)`) : 'Out of Stock'}</span>
          </div>

          <div class="detail-actions">
            ${inStock ? `
              <div class="quantity-control">
                <button class="qty-btn" id="qty-minus" style="display: flex; align-items: center; justify-content: center;">${ICONS.minus}</button>
                <div class="qty-val" id="qty-value">1</div>
                <button class="qty-btn" id="qty-plus" style="display: flex; align-items: center; justify-content: center;">${ICONS.plus}</button>
              </div>
              <button class="btn btn-primary btn-lg" id="add-to-cart-detail" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;">
                ${ICONS.cart} Add to Shopping Bag
              </button>
            ` : `
              <button class="btn btn-outline btn-lg" style="color: var(--error); border-color: var(--error); width: 100%; cursor: not-allowed;" disabled>
                Out of Stock
              </button>
            `}
          </div>
        </div>
      </div>

      <!-- Specs & QA & Reviews mounted dynamically -->
      ${specsHtml}
      ${qaHtml}
      ${reviewsHtml}
    `;

    // Bind Option Selectors Click Events
    if (opts.colors && opts.colors.length > 0) {
      const dots = document.querySelectorAll('.color-dot');
      const textLabel = document.getElementById('selected-color-text');
      dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
          dots.forEach(d => {
            const hex = colorMap[d.getAttribute('data-color')] || '#888';
            d.style.borderColor = hex === '#ffffff' ? '#ccc' : hex;
            d.classList.remove('selected');
          });
          dot.classList.add('selected');
          dot.style.borderColor = 'var(--primary)';
          selectedColor = dot.getAttribute('data-color');
          if (textLabel) textLabel.textContent = selectedColor;
        });
      });
    }

    if (opts.switches && opts.switches.length > 0) {
      const sBtns = document.querySelectorAll('.switch-btn');
      const textLabel = document.getElementById('selected-switch-text');
      sBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          sBtns.forEach(b => {
            b.classList.remove('selected');
            b.style.borderColor = 'var(--border-color)';
            b.style.background = 'var(--bg-card)';
            b.style.color = 'var(--text-primary)';
          });
          btn.classList.add('selected');
          btn.style.borderColor = 'var(--primary)';
          btn.style.background = 'var(--primary-light, rgba(59, 130, 246, 0.1))';
          btn.style.color = 'var(--primary)';
          selectedSwitch = btn.getAttribute('data-switch');
          if (textLabel) textLabel.textContent = selectedSwitch;
          playSwitchSound(selectedSwitch); // Auto-play switch sound
        });
      });
      
      // Initialize styling for first selected switch
      if (sBtns.length > 0) {
        const first = sBtns[0];
        first.style.borderColor = 'var(--primary)';
        first.style.background = 'var(--primary-light, rgba(59, 130, 246, 0.1))';
        first.style.color = 'var(--primary)';
      }
    }

    // Bind Hear Click Button for Keyboard
    if (product.id === 1) {
      const hearBtn = document.getElementById('hear-switches-btn');
      if (hearBtn) {
        hearBtn.addEventListener('click', () => {
          playSwitchSound(selectedSwitch);
        });
      }
    }

    // Bind Lightbar Temperature Slider
    if (product.id === 6) {
      const slider = document.getElementById('lightbar-temp-slider');
      const tempVal = document.getElementById('temp-value');
      const overlay = document.getElementById('lightbar-glow-overlay');
      
      if (slider && tempVal && overlay) {
        const updateOverlay = (val) => {
          const t = (val - 2700) / (6500 - 2700);
          const r = Math.round(255 - 55 * t);
          const g = Math.round(147 + 78 * t);
          const b = Math.round(41 + 214 * t);
          
          overlay.style.background = `radial-gradient(circle at 50% 15%, rgba(${r}, ${g}, ${b}, 0.65) 0%, rgba(${r}, ${g}, ${b}, 0) 75%)`;
          
          let desc = 'Neutral';
          if (val < 3500) desc = 'Warm Amber';
          else if (val < 4500) desc = 'Warm White';
          else if (val < 5500) desc = 'Daylight White';
          else desc = 'Cool Daylight';
          
          tempVal.textContent = `${val}K (${desc})`;
        };
        
        slider.addEventListener('input', (e) => {
          updateOverlay(parseInt(e.target.value));
        });
        
        // Initialize
        updateOverlay(4000);
      }
    }

    // Bind Submit Q&A Form
    const qaForm = document.getElementById('submit-qa-form');
    if (qaForm) {
      qaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const textarea = document.getElementById('qa-question-text');
        if (textarea && textarea.value.trim() !== '') {
          const newQ = textarea.value.trim();
          if (!QA_DATA[product.id]) {
            QA_DATA[product.id] = [];
          }
          QA_DATA[product.id].push({
            q: newQ,
            a: "This question is pending review by our developers and will receive a verified answer shortly."
          });
          showToast("Your question has been submitted for peer review. Our dev team will answer it shortly!", "success");
          textarea.value = '';
          // Re-render product details to show the new question immediately
          renderProductDetails(product.id);
        }
      });
    }

    if (inStock) {
      const minusBtn = document.getElementById('qty-minus');
      const plusBtn = document.getElementById('qty-plus');
      const qtyVal = document.getElementById('qty-value');
      const addBtn = document.getElementById('add-to-cart-detail');

      let currentQty = 1;

      minusBtn.addEventListener('click', () => {
        if (currentQty > 1) {
          currentQty--;
          qtyVal.textContent = currentQty;
        }
      });

      plusBtn.addEventListener('click', () => {
        if (currentQty < product.stock) {
          currentQty++;
          qtyVal.textContent = currentQty;
        } else {
          showToast(`Cannot order more than available stock (${product.stock})`, 'warning');
        }
      });

      addBtn.addEventListener('click', () => {
        const finalOptions = {};
        if (selectedColor) finalOptions.color = selectedColor;
        if (selectedSwitch) finalOptions.switch = selectedSwitch;
        const originalHtml = addBtn.innerHTML;
        addToCart(product.id, currentQty, product.name, Object.keys(finalOptions).length > 0 ? finalOptions : null);
        triggerCartButtonFeedback(addBtn, originalHtml, currentQty);
      });
    }

  } catch (error) {
    viewContainer.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <span style="display: flex; align-items: center; justify-content: center; color: var(--error); margin-bottom: 16px; transform: scale(1.5);">
          ${ICONS.warning}
        </span>
        <h3>Failed to load product details</h3>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">${error.message}</p>
        <a href="#home" class="btn btn-primary">Return to Shop</a>
      </div>
    `;
  }
}

// 3. Shopping Cart Page
async function renderCart() {
  const viewContainer = document.getElementById('view-container');

  if (state.cart.length === 0) {
    viewContainer.innerHTML = `
      <div class="empty-cart-state" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <span style="display: flex; align-items: center; justify-content: center; color: var(--text-muted); margin-bottom: 20px; transform: scale(2.2);">${ICONS.cart}</span>
        <h3>Your shopping cart is empty</h3>
        <p>Explore our shop catalog and find something exceptional to upgrade your workstation.</p>
        <a href="#home" class="btn btn-primary">Browse Products</a>
      </div>
    `;
    return;
  }

  try {
    // Fetch all products if not present
    if (state.products.length === 0) {
      const data = await apiFetch('/api/products');
      state.products = data.products;
    }

    // Map cart items to full details
    const cartDetails = state.cart.map((item, index) => {
      const product = state.products.find(p => p.id === item.productId);
      return {
        ...item,
        product,
        index
      };
    }).filter(item => item.product !== undefined);

    let subtotal = 0;
    let itemsHtml = '';

    cartDetails.forEach(item => {
      const itemTotal = item.product.price * item.quantity;
      subtotal += itemTotal;

      let optionsSubText = '';
      if (item.selectedOptions) {
        const optsList = [];
        if (item.selectedOptions.color) optsList.push(`Color: ${item.selectedOptions.color}`);
        if (item.selectedOptions.switch) optsList.push(`Switch: ${item.selectedOptions.switch}`);
        if (optsList.length > 0) {
          optionsSubText = `<div class="cart-item-options" style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">${optsList.join(' | ')}</div>`;
        }
      }

      itemsHtml += `
        <div class="cart-item">
          <img src="${item.product.image_url}" alt="${item.product.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80'">
          <div class="cart-item-info">
            <h3 class="cart-item-name"><a href="#product/${item.product.id}">${item.product.name}</a></h3>
            <span class="cart-item-category">${item.product.category}</span>
            ${optionsSubText}
          </div>
          <div class="quantity-control" style="height: 40px;">
            <button class="qty-btn dec-qty-btn" data-index="${item.index}" data-qty="${item.quantity}" style="display: flex; align-items: center; justify-content: center;">${ICONS.minus}</button>
            <div class="qty-val" style="width: 32px; font-size: 0.95rem;">${item.quantity}</div>
            <button class="qty-btn inc-qty-btn" data-index="${item.index}" data-qty="${item.quantity}" data-max="${item.product.stock}" style="display: flex; align-items: center; justify-content: center;">${ICONS.plus}</button>
          </div>
          <div style="text-align: right; min-width: 100px;">
            <span class="cart-item-price">${formatPrice(itemTotal)}</span>
          </div>
          <button class="cart-item-delete" data-index="${item.index}" style="display: flex; align-items: center; justify-content: center;">
            ${ICONS.trash}
          </button>
        </div>
      `;
    });

    // Check if order qualifies for workspace bundle discount (at least one Keyboard: id 1, one Monitor: id 3, and one Utility: id 5 or 6)
    const hasKeyboard = cartDetails.some(item => item.product.id === 1);
    const hasMonitor = cartDetails.some(item => item.product.id === 3);
    const hasUtility = cartDetails.some(item => item.product.id === 5 || item.product.id === 6);

    let bundleDiscount = 0;
    if (hasKeyboard && hasMonitor && hasUtility) {
      bundleDiscount = 1500;
    }

    const subtotalAfterDiscount = Math.max(0, subtotal - bundleDiscount);
    const shipping = (subtotalAfterDiscount >= 2000 || subtotalAfterDiscount === 0) ? 0 : 150.00;
    const total = subtotalAfterDiscount + shipping;

    viewContainer.innerHTML = `
      <h2 class="section-title" style="margin-bottom: 24px;">Your Cart</h2>

      <div class="cart-layout">
        <div class="cart-items-panel">
          ${itemsHtml}
        </div>

        <div class="glass-card cart-summary-panel">
          <h3 class="summary-title">Order Summary</h3>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${formatPrice(subtotal)}</span>
          </div>
          ${bundleDiscount > 0 
            ? `<div class="summary-row" style="color: var(--success); font-weight: 600;">
                 <span>Setup Bundle Discount</span>
                 <span>-${formatPrice(bundleDiscount)}</span>
               </div>`
            : ''
          }
          <div class="summary-row">
            <span>Shipping</span>
            <span>${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
          </div>
          ${shipping > 0 ? `<div style="font-size: 0.75rem; color: var(--text-muted); margin-top: -8px; margin-bottom: 12px;">Spend ${formatPrice(2000)} or more for Free Shipping!</div>` : ''}
          <div class="summary-row total">
            <span>Total</span>
            <span>${formatPrice(total)}</span>
          </div>
          <a href="#checkout" class="btn btn-primary" style="width: 100%; margin-top: 24px; display: flex; align-items: center; justify-content: center; gap: 8px;">
            Proceed to Checkout ${ICONS.arrowRight}
          </a>
        </div>
      </div>
    `;

    // Add listeners
    document.querySelectorAll('.dec-qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const btnElem = e.target.closest('.dec-qty-btn');
        const index = parseInt(btnElem.getAttribute('data-index'));
        const qty = parseInt(btnElem.getAttribute('data-qty'));
        updateCartQuantity(index, qty - 1);
      });
    });

    document.querySelectorAll('.inc-qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const btnElem = e.target.closest('.inc-qty-btn');
        const index = parseInt(btnElem.getAttribute('data-index'));
        const qty = parseInt(btnElem.getAttribute('data-qty'));
        const max = parseInt(btnElem.getAttribute('data-max'));
        if (qty < max) {
          updateCartQuantity(index, qty + 1);
        } else {
          showToast(`Cannot order more than available stock (${max})`, 'warning');
        }
      });
    });

    document.querySelectorAll('.cart-item-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const btnElem = e.target.closest('.cart-item-delete');
        const index = parseInt(btnElem.getAttribute('data-index'));
        removeFromCart(index);
      });
    });

  } catch (error) {
    viewContainer.innerHTML = `<p>Error loading cart details: ${error.message}</p>`;
  }
}

// 4. Checkout View
function renderCheckout() {
  const viewContainer = document.getElementById('view-container');

  // Guard: User must be logged in to checkout
  if (!state.user) {
    showToast('Please log in or register to complete your order.', 'info');
    // Save intended destination
    localStorage.setItem('redirect_after_auth', '#checkout');
    window.location.hash = '#login';
    return;
  }

  if (state.cart.length === 0) {
    window.location.hash = '#cart';
    return;
  }

  // Calculate totals
  const cartDetails = state.cart.map(item => {
    const product = state.products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product !== undefined);

  let subtotal = 0;
  let itemsReviewHtml = '';

  cartDetails.forEach(item => {
    const itemTotal = item.product.price * item.quantity;
    subtotal += itemTotal;
    
    let optionsText = '';
    if (item.selectedOptions) {
      const opts = [];
      if (item.selectedOptions.color) opts.push(item.selectedOptions.color);
      if (item.selectedOptions.switch) opts.push(item.selectedOptions.switch);
      if (opts.length > 0) {
        optionsText = ` <span style="font-size: 0.8rem; color: var(--text-secondary);">(${opts.join(', ')})</span>`;
      }
    }

    itemsReviewHtml += `
      <div class="checkout-review-item" style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem;">
        <span class="checkout-item-qty-name">${item.quantity}x ${item.product.name}${optionsText}</span>
        <span style="font-weight: 600;">${formatPrice(itemTotal)}</span>
      </div>
    `;
  });

  // Check if order qualifies for the workspace bundle discount (at least one Keyboard: id 1, one Monitor: id 3, and one Utility: id 5 or 6)
  const hasKeyboard = cartDetails.some(item => item.product.id === 1);
  const hasMonitor = cartDetails.some(item => item.product.id === 3);
  const hasUtility = cartDetails.some(item => item.product.id === 5 || item.product.id === 6);

  let bundleDiscount = 0;
  if (hasKeyboard && hasMonitor && hasUtility) {
    bundleDiscount = 1500;
  }

  const subtotalAfterDiscount = Math.max(0, subtotal - bundleDiscount);
  const shipping = (subtotalAfterDiscount >= 2000 || subtotalAfterDiscount === 0) ? 0 : 150.00;
  const total = subtotalAfterDiscount + shipping;

  viewContainer.innerHTML = `
    <h2 class="section-title" style="margin-bottom: 24px;">Checkout</h2>

    <div class="checkout-layout">
      <div class="glass-card">
        <h3 class="checkout-section-title" style="display: flex; align-items: center; gap: 8px;">${ICONS.truck} Shipping Information</h3>
        <form id="checkout-form">
          <div class="checkout-grid">
            <div class="form-group">
              <label class="form-label" for="ship-first-name">First Name</label>
              <input type="text" id="ship-first-name" class="form-input" required placeholder="Rajesh">
            </div>
            <div class="form-group">
              <label class="form-label" for="ship-last-name">Last Name</label>
              <input type="text" id="ship-last-name" class="form-input" required placeholder="Kumar">
            </div>
            <div class="form-group full">
              <label class="form-label" for="ship-address">Street Address (Include Room/Block for Hostels & PGs)</label>
              <input type="text" id="ship-address" class="form-input" required placeholder="Flat 402, Royal Enclave, Indiranagar">
            </div>
            <div class="form-group">
              <label class="form-label" for="ship-city">City</label>
              <input type="text" id="ship-city" class="form-input" required placeholder="Bengaluru">
            </div>
            <div class="form-group">
              <label class="form-label" for="ship-state">State</label>
              <input type="text" id="ship-state" class="form-input" required placeholder="Karnataka">
            </div>
            <div class="form-group">
              <label class="form-label" for="ship-zip">PIN Code</label>
              <input type="text" id="ship-zip" class="form-input" required placeholder="560038" pattern="\\d{6}">
            </div>
            <div class="form-group">
              <label class="form-label" for="ship-country">Country</label>
              <input type="text" id="ship-country" class="form-input" required placeholder="India" value="India">
            </div>
          </div>

          <h3 class="checkout-section-title" style="margin-top: 32px; display: flex; align-items: center; gap: 8px;">${ICONS.creditCard} Secure Payment Details</h3>
          <div class="checkout-grid">
            <div class="form-group full">
              <label class="form-label" for="card-num">Card Number</label>
              <input type="text" id="card-num" class="form-input" required placeholder="4111 2222 3333 4444" pattern="\\d{16}|\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{4}">
            </div>
            <div class="form-group">
              <label class="form-label" for="card-expiry">Expiry Date</label>
              <input type="text" id="card-expiry" class="form-input" required placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\\/\\d{2}">
            </div>
            <div class="form-group">
              <label class="form-label" for="card-cvc">CVV</label>
              <input type="text" id="card-cvc" class="form-input" required placeholder="123" pattern="\\d{3,4}">
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; margin-top: 32px;" id="place-order-btn">
            Place Order ${formatPrice(total)}
          </button>
        </form>
      </div>

      <div class="glass-card" style="align-self: flex-start;">
        <h3 class="summary-title">Review Items</h3>
        <div class="checkout-review-items">
          ${itemsReviewHtml}
        </div>
        
        <div class="summary-row" style="border-top: 1px solid var(--border-color); padding-top: 16px;">
          <span>Subtotal</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        ${bundleDiscount > 0 
          ? `<div class="summary-row" style="color: var(--success); font-weight: 600;">
               <span>Setup Bundle Discount</span>
               <span>-${formatPrice(bundleDiscount)}</span>
             </div>`
          : ''
        }
        <div class="summary-row">
          <span>Shipping</span>
          <span>${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>${formatPrice(total)}</span>
        </div>
      </div>
    </div>
  `;

  // Submit Handler
  document.getElementById('checkout-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('place-order-btn');
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;

    const address = `${document.getElementById('ship-address').value}, ${document.getElementById('ship-city').value}, ${document.getElementById('ship-state').value} ${document.getElementById('ship-zip').value}, ${document.getElementById('ship-country').value}`;

    const items = state.cart.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }));

    try {
      const orderResponse = await apiFetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({
          items,
          shippingAddress: address
        })
      });

      // Clear the local cart
      clearCart();
      
      // Render success screen
      renderSuccess(orderResponse.orderId);

    } catch (error) {
      showToast(error.message, 'error');
      submitBtn.textContent = `Place Order ${formatPrice(total)}`;
      submitBtn.disabled = false;
    }
  });
}

// Order success screen
function renderSuccess(orderId) {
  const viewContainer = document.getElementById('view-container');
  
  viewContainer.innerHTML = `
    <div class="glass-card success-card">
      <div class="success-icon" style="display: flex; align-items: center; justify-content: center; transform: scale(1.5);">
        ${ICONS.check}
      </div>
      <h2>Order Placed Successfully!</h2>
      <p style="color: var(--text-secondary); max-width: 500px; line-height: 1.6;">
        Thank you for shopping at NovaTech. Your order <strong>#${orderId}</strong> has been received and is currently being processed. You can monitor the progress on your orders history page.
      </p>
      <div style="display: flex; gap: 16px; width: 100%; justify-content: center; margin-top: 16px;">
        <a href="#orders" class="btn btn-primary">View My Orders</a>
        <a href="#home" class="btn btn-outline">Continue Shopping</a>
      </div>
    </div>
  `;
  showToast('Order created successfully!', 'success');
}

// 5. Login View
function renderLogin() {
  const viewContainer = document.getElementById('view-container');

  viewContainer.innerHTML = `
    <div class="auth-container">
      <div class="glass-card auth-card">
        <div class="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to manage your cart, checkout, and view orders.</p>
        </div>
        <form id="login-form">
          <div class="form-group">
            <label class="form-label" for="login-email">Email Address</label>
            <input type="email" id="login-email" class="form-input" required placeholder="name@email.com">
          </div>
          <div class="form-group">
            <label class="form-label" for="login-pass">Password</label>
            <input type="password" id="login-pass" class="form-input" required placeholder="••••••••">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 16px;">Log In</button>
        </form>
        <div class="auth-footer">
          Don't have an account? <a href="#register" class="auth-link">Sign up</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pass').value;

    try {
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      state.token = data.token;
      state.user = data.user;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      showToast(`Welcome back, ${data.user.username}!`, 'success');
      updateNavbarAuth();

      // Check if redirect is scheduled
      const redirect = localStorage.getItem('redirect_after_auth');
      if (redirect) {
        localStorage.removeItem('redirect_after_auth');
        window.location.hash = redirect;
      } else {
        window.location.hash = '#home';
      }

    } catch (error) {
      showToast(error.message, 'error');
    }
  });
}

// 6. Register View
function renderRegister() {
  const viewContainer = document.getElementById('view-container');

  viewContainer.innerHTML = `
    <div class="auth-container">
      <div class="glass-card auth-card">
        <div class="auth-header">
          <h2>Create Account</h2>
          <p>Join NovaTech store to start shopping premium gear.</p>
        </div>
        <form id="register-form">
          <div class="form-group">
            <label class="form-label" for="reg-username">Username</label>
            <input type="text" id="reg-username" class="form-input" required placeholder="johndoe">
          </div>
          <div class="form-group">
            <label class="form-label" for="reg-email">Email Address</label>
            <input type="email" id="reg-email" class="form-input" required placeholder="name@email.com">
          </div>
          <div class="form-group">
            <label class="form-label" for="reg-pass">Password</label>
            <input type="password" id="reg-pass" class="form-input" required placeholder="Min 6 characters" minlength="6">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 16px;">Sign Up</button>
        </form>
        <div class="auth-footer">
          Already have an account? <a href="#login" class="auth-link">Log in</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-pass').value;

    try {
      const data = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password })
      });

      state.token = data.token;
      state.user = data.user;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      showToast(`Account created successfully. Welcome, ${data.user.username}!`, 'success');
      updateNavbarAuth();

      // Check if redirect is scheduled
      const redirect = localStorage.getItem('redirect_after_auth');
      if (redirect) {
        localStorage.removeItem('redirect_after_auth');
        window.location.hash = redirect;
      } else {
        window.location.hash = '#home';
      }

    } catch (error) {
      showToast(error.message, 'error');
    }
  });
}

// 7. Orders View
async function renderOrders() {
  const viewContainer = document.getElementById('view-container');

  if (!state.user) {
    window.location.hash = '#login';
    return;
  }

  try {
    const data = await apiFetch('/api/orders');
    const orders = data.orders;

    if (orders.length === 0) {
      viewContainer.innerHTML = `
        <h2 class="section-title" style="margin-bottom: 24px;">Your Orders</h2>
        <div class="glass-card" style="text-align: center; padding: 48px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <span style="color: var(--text-muted); margin-bottom: 16px; display: flex; align-items: center; justify-content: center; transform: scale(1.5);">${ICONS.boxOpen}</span>
          <h3>No Orders Placed Yet</h3>
          <p style="color: var(--text-secondary); margin-bottom: 24px;">Browse our store, add items to your cart, and make your first purchase!</p>
          <a href="#home" class="btn btn-primary">Start Shopping</a>
        </div>
      `;
      return;
    }

    let ordersHtml = '';
    orders.forEach(order => {
      let itemsHtml = '';
      order.items.forEach(item => {
        itemsHtml += `
          <div class="order-card-item">
            <img src="${item.image_url}" alt="${item.product_name}" class="order-card-item-img" onerror="this.src='https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80'">
            <div class="order-card-item-info">
              <h4>${item.product_name}</h4>
              <p>Qty: ${item.quantity} | Unit Price: ${formatPrice(item.price)}</p>
            </div>
          </div>
        `;
      });

      // Format Date
      const date = new Date(order.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      ordersHtml += `
        <div class="order-card">
          <div class="order-card-header">
            <div class="order-meta-info">
              <div class="order-meta-item">
                <span>Order Placed</span>
                <p>${date}</p>
              </div>
              <div class="order-meta-item">
                <span>Total Amount</span>
                <p style="color: var(--primary); font-weight: 700;">${formatPrice(order.total_amount)}</p>
              </div>
              <div class="order-meta-item">
                <span>Order ID</span>
                <p>#${order.id}</p>
              </div>
              <div class="order-meta-item">
                <span>Ship To</span>
                <p style="font-size: 0.85rem; font-weight: 400; color: var(--text-secondary); max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${order.shipping_address}">${order.shipping_address}</p>
              </div>
            </div>
            <span class="order-status-badge ${order.status.toLowerCase()}">${order.status}</span>
          </div>
          <div class="order-card-items">
            ${itemsHtml}
          </div>
        </div>
      `;
    });

    viewContainer.innerHTML = `
      <h2 class="section-title" style="margin-bottom: 24px;">Your Orders</h2>
      <div class="orders-list">
        ${ordersHtml}
      </div>
    `;

  } catch (error) {
    viewContainer.innerHTML = `
      <div style="text-align: center; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <span style="color: var(--error); margin-bottom: 16px; display: flex; align-items: center; justify-content: center; transform: scale(1.5);">${ICONS.warning}</span>
        <h3>Failed to load orders history</h3>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">${error.message}</p>
        <button class="btn btn-primary" onclick="renderOrders()">Try Again</button>
      </div>
    `;
  }
}

// 8. FAQ View
function renderFAQ() {
  const viewContainer = document.getElementById('view-container');
  viewContainer.innerHTML = `
    <h2 class="section-title" style="margin-bottom: 12px; font-family: 'Outfit', sans-serif;">Frequently Asked Questions</h2>
    <p style="color: var(--text-secondary); text-align: center; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto;">
      Got questions? We've got answers. If you don't find what you are looking for, contact us at support@novatech.co.in.
    </p>

    <div class="faq-container" style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px;">
      <div class="glass-card faq-item" style="padding: 24px; border-radius: 12px; border: 1px solid var(--border-color); background: var(--bg-card);">
        <h3 class="faq-question" style="font-size: 1.1rem; color: var(--primary); margin-bottom: 8px;">Do you deliver to hostels or PGs in Bangalore/other cities?</h3>
        <p class="faq-answer" style="color: var(--text-secondary); line-height: 1.6; margin: 0;">
          Yes, we deliver to all major student housing, PGs, and university hostels (like VIT, Manipal, PES, etc.). When checking out, please specify your block number, room number, and any gate restrictions in the street address field. Make sure to check with your warden or security gate regarding parcel drop-offs!
        </p>
      </div>

      <div class="glass-card faq-item" style="padding: 24px; border-radius: 12px; border: 1px solid var(--border-color); background: var(--bg-card);">
        <h3 class="faq-question" style="font-size: 1.1rem; color: var(--primary); margin-bottom: 8px;">How long does shipping take?</h3>
        <p class="faq-answer" style="color: var(--text-secondary); line-height: 1.6; margin: 0;">
          Orders are processed within 24 hours. Delivery to metro cities (Bengaluru, Mumbai, Delhi, Chennai, Hyderabad) typically takes 2-4 business days. For rest of India, it takes 4-7 business days. Horizon ultrawide monitors require special handling and ship within 3 business days, taking up to 5-7 days for delivery.
        </p>
      </div>

      <div class="glass-card faq-item" style="padding: 24px; border-radius: 12px; border: 1px solid var(--border-color); background: var(--bg-card);">
        <h3 class="faq-question" style="font-size: 1.1rem; color: var(--primary); margin-bottom: 8px;">Can I change switch options after ordering?</h3>
        <p class="faq-answer" style="color: var(--text-secondary); line-height: 1.6; margin: 0;">
          If your order has not been dispatched, you can contact us at +91 (80) 4567-8324 or email support@novatech.co.in to change your switch preference (e.g. Tactile Brown to Linear Red). Once shipped, you will have to wait for delivery and request a tactile feel swap.
        </p>
      </div>

      <div class="glass-card faq-item" style="padding: 24px; border-radius: 12px; border: 1px solid var(--border-color); background: var(--bg-card);">
        <h3 class="faq-question" style="font-size: 1.1rem; color: var(--primary); margin-bottom: 8px;">What payment methods do you accept?</h3>
        <p class="faq-answer" style="color: var(--text-secondary); line-height: 1.6; margin: 0;">
          Currently, we accept all major Indian credit cards, debit cards, UPI payments, and Net Banking through our secure payment gateway checkout.
        </p>
      </div>
    </div>
  `;
}

// 9. Shipping & Returns View
function renderReturns() {
  const viewContainer = document.getElementById('view-container');
  viewContainer.innerHTML = `
    <h2 class="section-title" style="margin-bottom: 12px; font-family: 'Outfit', sans-serif;">Shipping & Returns Policy</h2>
    <p style="color: var(--text-secondary); text-align: center; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto;">
      We believe in our products. If you are not fully satisfied, here is how we can resolve it.
    </p>

    <div class="returns-container" style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px;">
      <div class="glass-card returns-item" style="padding: 24px; border-radius: 12px; border: 1px solid var(--border-color); background: var(--bg-card);">
        <h3 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 8px;">7-Day Tactile Feel Switch Exchange</h3>
        <p style="color: var(--text-secondary); line-height: 1.6; margin: 0;">
          Bought mechanical brown tactile switches but realized you prefer silent linear red ones? We offer a unique 7-day tactile swap. We will ship you a fresh set of key switches and keycap pullers, and arrange a pickup for the old ones. The keyboard unit itself must be undamaged.
        </p>
      </div>

      <div class="glass-card returns-item" style="padding: 24px; border-radius: 12px; border: 1px solid var(--border-color); background: var(--bg-card);">
        <h3 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 8px;">10-Day Return & Refund</h3>
        <p style="color: var(--text-secondary); line-height: 1.6; margin: 0;">
          For all other gear (headphones, monitor, backpack, lightbar), we offer a 10-day return policy from the date of delivery. The item must be in its original packaging, with all accessories and cables included. Please initiate a return request by emailing support@novatech.co.in.
        </p>
      </div>

      <div class="glass-card returns-item" style="padding: 24px; border-radius: 12px; border: 1px solid var(--border-color); background: var(--bg-card);">
        <h3 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 8px;">Warranty & Support</h3>
        <p style="color: var(--text-secondary); line-height: 1.6; margin: 0;">
          All NovaTech products come with a 1-year limited warranty covering manufacturing defects. If a switch stops registering or battery drops performance unexpectedly, we will repair or replace it free of cost. Contact Indiranagar center at +91 (80) 4567-8324 for walk-in claims.
        </p>
      </div>
    </div>
  `;
}

// --- App Initialization & Event Listeners ---

// Theme Manager
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme') || 'light';

  if (savedTheme === 'dark') {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    if (themeToggle) themeToggle.innerHTML = ICONS.sun;
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    if (themeToggle) themeToggle.innerHTML = ICONS.moon;
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
        themeToggle.innerHTML = ICONS.sun;
        localStorage.setItem('theme', 'dark');
        showToast('Switched to Dark Mode', 'info');
      } else {
        body.classList.replace('dark-mode', 'light-mode');
        themeToggle.innerHTML = ICONS.moon;
        localStorage.setItem('theme', 'light');
        showToast('Switched to Light Mode', 'info');
      }
    });
  }
}

// Listen to hash change
window.addEventListener('hashchange', router);

// Document loaded
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateNavbarAuth();
  updateCartCount();
  router();

  // Attach quick category click listeners
  document.querySelectorAll('.nav-links .nav-link, .footer-column a[data-category], .hero-actions a[data-category]').forEach(link => {
    link.addEventListener('click', (e) => {
      const linkElem = e.currentTarget;
      const category = linkElem.getAttribute('data-category');
      if (category) {
        state.activeCategory = category.toLowerCase();
        // Force routing to home first
        if (window.location.hash !== '#home' && window.location.hash !== '') {
          window.location.hash = '#home';
        } else {
          renderHome();
        }

        // If clicking from hero, scroll down to the product catalog
        if (e.target.closest('.hero-actions')) {
          const shopSection = document.getElementById('view-container');
          if (shopSection) {
            setTimeout(() => {
              shopSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }
      }
    });
  });

  // Attach listener to Explore Collection button to scroll to products smoothly
  const exploreBtn = document.querySelector('.hero-actions a:not([data-category])');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const shopSection = document.getElementById('view-container');
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Attach listener to logo to reset category filtering
  const logo = document.getElementById('logo');
  if (logo) {
    logo.addEventListener('click', () => {
      state.activeCategory = 'all';
    });
  }
});
