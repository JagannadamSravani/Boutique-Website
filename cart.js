// Cart Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
        setupCartEventListeners();
    }
});

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        emptyCart.style.display = 'block';
        document.querySelector('.cart-summary').style.display = 'none';
        return;
    }
    
    cartItemsContainer.style.display = 'block';
    emptyCart.style.display = 'none';
    document.querySelector('.cart-summary').style.display = 'block';
    
    cartItemsContainer.innerHTML = cart.map(item => createCartItemHTML(item)).join('');
    updateCartSummary();
}

function createCartItemHTML(item) {
    return `
        <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>Size: ${item.size}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="changeQuantity(${item.id}, '${item.size}', ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, '${item.size}', ${item.quantity + 1})">+</button>
            </div>
            <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-item" onclick="removeCartItem(${item.id}, '${item.size}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
}

function changeQuantity(productId, size, newQuantity) {
    if (newQuantity <= 0) {
        removeCartItem(productId, size);
        return;
    }
    
    updateCartQuantity(productId, size, newQuantity);
    displayCartItems();
}

function removeCartItem(productId, size) {
    removeFromCart(productId, size);
    displayCartItems();
    showNotification('Item removed from cart');
}

function updateCartSummary() {
    const subtotal = getCartTotal();
    const shipping = subtotal > 0 ? 10.00 : 0;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('cart-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

function setupCartEventListeners() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                window.location.href = 'checkout.html';
            } else {
                showNotification('Your cart is empty');
            }
        });
    }
}

// Make functions globally available
window.changeQuantity = changeQuantity;
window.removeCartItem = removeCartItem;