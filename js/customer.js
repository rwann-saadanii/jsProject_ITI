document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();

  // Event listeners for navigation
  document.getElementById("viewCartBtn").addEventListener("click", () => toggleSection("cart-section"));
  document.getElementById("wishlistBtn").addEventListener("click", () => toggleSection("wishlist-section"));
  document.getElementById("profileBtn").addEventListener("click", () => toggleSection("profile-section"));

  // Logout logic
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    alert("Logged out successfully!");
    window.location.href = "/html/login.html";
  });

  // Profile update logic
  document.getElementById("profileForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    alert(`Profile updated: ${name}, ${email}`);
  });

  // Search logic
  document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.toLowerCase();
    fetchProducts(query);
  });
});

let cart = [];
let wishlist = [];

// Fetch and display products
function fetchProducts(query = "") {
  fetch("http://localhost:3000/products")
    .then(response => response.json())
    .then(products => {
      const productList = document.getElementById("productList");
      productList.innerHTML = "";

      products
        .filter(product => product.name.toLowerCase().includes(query))
        .forEach(product => {
          const productCard = document.createElement("div");
          productCard.className = "product-card";
          productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="addToWishlist(${product.id})">Add to Wishlist</button>
          `;
          productList.appendChild(productCard);
        });
    });
}

// Add product to cart
function addToCart(productId) {
  fetch(`http://localhost:3000/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      cart.push(product);
      alert(`${product.name} added to cart.`);
    });
}

// Add product to wishlist
function addToWishlist(productId) {
  fetch(`http://localhost:3000/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      wishlist.push(product);
      alert(`${product.name} added to wishlist.`);
    });
}

// Toggle section visibility
function toggleSection(sectionId) {
  document.querySelectorAll("section").forEach(section => section.style.display = "none");
  document.getElementById(sectionId).style.display = "block";
}
