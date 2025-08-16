// Checkout Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('checkout.html')) {
        displayCheckoutItems();
        setupCheckoutForm();
        
        // Redirect if cart is empty
        if (cart.length === 0) {
            showNotification('Your cart is empty');
            setTimeout(() => {
                window.location.href = 'shop.html';
            }, 2000);
        }
    }
});

function displayCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    if (!checkoutItemsContainer) return;
    
    checkoutItemsContainer.innerHTML = cart.map(item => createCheckoutItemHTML(item)).join('');
    updateCheckoutSummary();
}

function createCheckoutItemHTML(item) {
    return `
        <div class="checkout-item">
            <span>${item.name} (${item.size}) × ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `;
}

function updateCheckoutSummary() {
    const subtotal = getCartTotal();
    const shipping = 10.00;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkout-shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('checkout-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
}

function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    if (!checkoutForm) return;
    
    // Format card number input
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
            e.target.value = formattedValue;
        });
    }
    
    // Format expiry date input
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // Format CVV input
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
        });
    }
    
    // Handle form submission
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        processOrder();
    });
}

function processOrder() {
    // Show loading state
    const submitBtn = document.querySelector('.place-order-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
        // Clear cart
        cart.length = 0;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Show success message
        showSuccessModal();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function showSuccessModal() {
    // Create success modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content" style="text-align: center; padding: 3rem;">
            <div style="font-size: 4rem; color: #28a745; margin-bottom: 1rem;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2 style="font-family: 'Playfair Display', serif; margin-bottom: 1rem; color: #333;">
                Order Successful!
            </h2>
            <p style="margin-bottom: 2rem; color: #666;">
                Thank you for your purchase. You will receive an email confirmation shortly.
            </p>
            <button class="cta-button" onclick="closeSuccessModal()">
                Continue Shopping
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto redirect after 5 seconds
    setTimeout(() => {
        closeSuccessModal();
    }, 5000);
}

function closeSuccessModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
    window.location.href = 'shop.html';
}

// Make functions globally available
window.closeSuccessModal = closeSuccessModal;