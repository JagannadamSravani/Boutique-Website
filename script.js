const { MonitorPause } = require("lucide-react");

// Global Variables
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';
price = MRP;


// Product Data
const productData = [
    {
        id: 1,
        name: "Elegant Summer Dress",
        price: 89.99,
        category: "women",
        image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "A beautiful flowing summer dress perfect for any occasion. Made with premium materials for comfort and style."
    },
    {
        id: 2,
        name: "Classic Blazer",
        price: 129.99,
        category: "women",
        image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Sophisticated blazer that transitions seamlessly from office to evening wear."
    },
    {
        id: 3,
        name: "Casual Denim Jacket",
        price: 79.99,
        category: "men",
        image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Timeless denim jacket crafted from premium cotton for everyday comfort and style."
    },
    {
        id: 4,
        name: "Designer Handbag",
        price: 199.99,
        category: "accessories",
        image: "https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Luxurious handbag with exquisite craftsmanship and attention to detail."
    },
    {
        id: 5,
        name: "Kids Rainbow Dress",
        price: 45.99,
        category: "kids",
        image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Colorful and comfortable dress perfect for playtime and special occasions."
    },
    {
        id: 6,
        name: "Silk Scarf",
        price: 59.99,
        category: "accessories",
        image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Premium silk scarf that adds elegance to any outfit. Available in multiple colors."
    },
    {
        id: 7,
        name: "Men's Formal Shirt",
        price: 69.99,
        category: "men",
        image: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Crisp formal shirt perfect for business meetings and special events."
    },
    {
        id: 8,
        name: "Boho Maxi Dress",
        price: 99.99,
        category: "women",
        image: "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Free-spirited maxi dress with intricate patterns and flowing silhouette."
    },
    {
        id: 9,
        name: "Kids Denim Overalls",
        price: 39.99,
        category: "kids",
        image: "https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Durable and stylish overalls that kids love to wear for any activity."
    },
    {
        id: 10,
        name: "Statement Necklace",
        price: 89.99,
        category: "accessories",
        image: "https://images.pexels.com/photos/1485031/pexels-photo-1485031.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Bold statement necklace that transforms any simple outfit into a head-turner."
    },
    {
        id: 11,
        name: "Men's Casual Sweater",
        price: 85.99,
        category: "men",
        image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Soft and comfortable sweater perfect for casual outings and relaxed weekends."
    },
    {
        id: 12,
        name: "Cocktail Dress",
        price: 149.99,
        category: "women",
        image: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Stunning cocktail dress designed to make you the center of attention at any event."
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    products = [...productData];
    updateCartCount();
    setupNavigation();
    setupModal();
    
    // Load page-specific content
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadFeaturedProducts();
        setupCategoryNavigation();
    }
    
    setupNewsletterForm();
});

// Navigation Setup
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Sticky navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 100);
        }
    });
}

// Featured Products
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    const featuredProducts = products.slice(0, 8);
    featuredContainer.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// Product Card Creation
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Category Navigation
function setupCategoryNavigation() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            window.location.href = `shop.html?category=${category}`;
        });
    });
}

// Cart Functions
function addToCart(productId, size = 'M') {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId && item.size === size);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Product added to cart!');
}

function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartQuantity(productId, size, newQuantity) {
    const item = cart.find(item => item.id === productId && item.size === size);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId, size);
        } else {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        updateCartCount();
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Modal Setup
function setupModal() {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close');
    
    if (modal && closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Product card click handlers
    document.addEventListener('click', function(e) {
        if (e.target.closest('.product-card') && !e.target.closest('.add-to-cart-btn')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.dataset.id);
            openProductModal(productId);
        }
    });
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    if (!modal) return;
    
    document.getElementById('modal-product-image').src = product.image;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modal-product-description').textContent = product.description;
    
    const addToCartBtn = document.getElementById('modal-add-to-cart');
    addToCartBtn.onclick = function() {
        const selectedSize = document.getElementById('product-size').value;
        addToCart(productId, selectedSize);
        modal.style.display = 'none';
    };
    
    modal.style.display = 'block';
}

// Newsletter Form
function setupNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form, .sidebar-newsletter');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            if (email) {
                showNotification('Thank you for subscribing to our newsletter!');
                form.reset();
            }
        });
    });
}

// Notification System
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'linear-gradient(135deg, #D4AF37, #F7E7CE)',
        color: '#333',
        padding: '1rem 2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
        zIndex: '10000',
        fontWeight: '600',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Utility Functions
function formatPrice(price) {
    return `MRP{price.toFixed(2)}`;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for other scripts
window.products = products;
window.cart = cart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.getCartTotal = getCartTotal;
window.showNotification = showNotification;