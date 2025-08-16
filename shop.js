// Shop Page Functionality
let filteredProducts = [...products];
let currentSort = 'featured';

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('shop.html')) {
        initializeShopPage();
    }
});

function initializeShopPage() {
    loadUrlCategory();
    setupFilters();
    setupSorting();
    displayProducts();
}

function loadUrlCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        currentFilter = category;
        updateCategoryTitle(category);
        
        // Update radio button selection
        const categoryRadio = document.querySelector(`input[name="category"][value="${category}"]`);
        if (categoryRadio) {
            categoryRadio.checked = true;
        }
    }
}

function updateCategoryTitle(category) {
    const categoryTitle = document.getElementById('category-title');
    if (categoryTitle) {
        const titles = {
            'women': "Women's Wear",
            'men': "Men's Wear",
            'kids': "Kids",
            'accessories': "Accessories",
            'all': "All Products"
        };
        categoryTitle.textContent = titles[category] || "All Products";
    }
}

function setupFilters() {
    // Category filters
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            if (this.checked) {
                currentFilter = this.value;
                updateCategoryTitle(this.value);
                applyFilters();
            }
        });
    });
    
    // Price filters
    const priceFilters = document.querySelectorAll('input[type="checkbox"]');
    priceFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
}
document.addEventListener("DOMContentLoaded", () => {
  const addProductForm = document.getElementById("addProductForm");
  const productList = document.querySelector(".product-grid") || document.getElementById("productList");

  if (addProductForm && productList) {
    addProductForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("productName").value;
      const category = document.getElementById("productCategory").value;
      const price = document.getElementById("productPrice").value;
      const image = document.getElementById("productImage").value;

      // Create product card
      const card = document.createElement("div");
      card.classList.add("product-card", "border", "rounded", "p-3", "shadow", "bg-white");

      card.innerHTML = `
        <img src="${image}" alt="${name}" class="w-full h-48 object-cover rounded mb-2">
        <h3 class="font-semibold">${name}</h3>
        <p class="text-gray-500">Category: ${category}</p>
        <p class="text-blue-600 font-bold">₹${price}</p>
      `;

      productList.appendChild(card);

      // Reset form
      this.reset();
    });
  }
});

function setupSorting() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            applyFilters();
        });
    }
}

function applyFilters() {
    let filtered = [...products];
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(product => product.category === currentFilter);
    }
    
    // Apply price filters
    const priceFilters = document.querySelectorAll('.filter-options input[type="checkbox"]:checked');
    if (priceFilters.length > 0) {
        const priceRanges = Array.from(priceFilters).map(filter => filter.value);
        filtered = filtered.filter(product => {
            return priceRanges.some(range => {
                if (range === '0-50') return product.price < 50;
                if (range === '50-100') return product.price >= 50 && product.price < 100;
                if (range === '100-200') return product.price >= 100 && product.price < 200;
                if (range === '200+') return product.price >= 200;
                return false;
            });
        });
    }
    
    // Apply sorting
    switch (currentSort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filtered.sort((a, b) => b.id - a.id);
            break;
        case 'featured':
        default:
            // Keep original order for featured
            break;
    }
    
    filteredProducts = filtered;
    displayProducts();
}

function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ddd; margin-bottom: 1rem;"></i>
                <h3>No products found</h3>
                <p>Try adjusting your filters to see more products.</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

// Make functions available globally
window.applyFilters = applyFilters;
window.displayProducts = displayProducts;