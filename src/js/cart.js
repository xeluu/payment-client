// Cart functionality
let cartItems = [];

// Add to cart
function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            ...product,
            quantity: 1
        });
    }
    updateCartUI();
    showNotification('Đã thêm vào giỏ hàng!');
}

// Remove from cart
function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCartUI();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        updateCartUI();
    }
}

// Calculate total
function calculateTotal() {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    // Update cart count
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItemsContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    // Update total price
    cartTotalPrice.textContent = formatPrice(calculateTotal());
}

// Cart Modal
const cartModal = document.getElementById('cart-modal');
const cartIcon = document.getElementById('cart-icon');
const closeCart = document.getElementById('close-cart');

cartIcon.addEventListener('click', () => {
    cartModal.classList.add('show');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('show');
});

// Checkout Modal
const checkoutModal = document.getElementById('checkout-modal');
const checkoutBtn = document.getElementById('checkout-btn');
const closeCheckout = document.getElementById('close-checkout');
const checkoutForm = document.getElementById('checkout-form');

checkoutBtn.addEventListener('click', () => {
    if (cartItems.length === 0) {
        showNotification('Giỏ hàng trống!');
        return;
    }
    updateCheckoutUI();
    cartModal.classList.remove('show');
    checkoutModal.classList.add('show');
});

closeCheckout.addEventListener('click', () => {
    checkoutModal.classList.remove('show');
});

// Update checkout UI
function updateCheckoutUI() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotalPrice = document.getElementById('checkout-total-price');

    checkoutItems.innerHTML = cartItems.map(item => `
        <div class="checkout-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');

    checkoutTotalPrice.textContent = formatPrice(calculateTotal());
}

// Handle checkout form submission
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would typically send the order to a server
    const orderData = {
        items: cartItems,
        total: calculateTotal(),
        customer: {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            paymentMethod: document.getElementById('payment').value
        }
    };

    // For demo purposes, we'll just show a success message
    showNotification('Đặt hàng thành công!');
    checkoutModal.classList.remove('show');
    $('#card-modal').show();
    cartItems = [];
    updateCartUI();
});

