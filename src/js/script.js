// Previous script.js content remains unchanged until the addToCart function
// Format price to VND
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Display categories
function displayCategories() {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = categories.map(category => `
        <div class="category-item">
            <img src="${category.image}" alt="${category.name}">
            <p>${category.name}</p>
        </div>
    `).join('');
}

// Display flash sale products
function displayFlashSaleProducts() {
    const container = document.getElementById('flash-sale-container');
    container.innerHTML = flashSaleProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-sale-info">
                    <span>-${product.discount}%</span>
                    <span>Đã bán ${product.sold}</span>
                </div>
                <button class="add-to-cart" onclick="addToCart(flashSaleProducts[${flashSaleProducts.indexOf(product)}])">
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    `).join('');
}

// Display mall products
function displayMallProducts() {
    const container = document.getElementById('mall-container');
    container.innerHTML = mallProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="brand">${product.brand}</p>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="mall-tag">Mall</div>
                <button class="add-to-cart" onclick="addToCart(mallProducts[${mallProducts.indexOf(product)}])">
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    `).join('');
}

// Flash sale countdown
function updateFlashSaleCountdown() {
    const countdownElement = document.getElementById('flash-sale-countdown');
    const now = new Date();
    const hours = 23 - now.getHours();
    const minutes = 59 - now.getMinutes();
    const seconds = 59 - now.getSeconds();
    
    countdownElement.textContent = `KẾT THÚC TRONG ${hours}:${minutes}:${seconds}`;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayCategories();
    displayFlashSaleProducts();
    displayMallProducts();
    
    // Update countdown every second
    setInterval(updateFlashSaleCountdown, 1000);
    updateFlashSaleCountdown();
});