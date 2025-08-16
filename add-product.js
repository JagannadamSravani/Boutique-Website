let products = [];

// Load products from localStorage if available
if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
}

// Handle form submission
document.getElementById("addProductForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const category = document.getElementById("productCategory").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const img = document.getElementById("productImage").value;

    const newProduct = { name, category, price, img };
    products.push(newProduct);

    // Save updated list to localStorage
    localStorage.setItem("products", JSON.stringify(products));

    alert("Product added successfully!");
    window.location.href = "shop.html"; // Redirect back to shop
});
