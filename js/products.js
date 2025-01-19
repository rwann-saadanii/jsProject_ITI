document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-container");
  
    // Fetch product data
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((products) => {
        displayProducts(products); // Use the root-level 'products' array
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  
    // Display products
    function displayProducts(products) {
      productContainer.innerHTML = products
        .map((product) => createProductCard(product))
        .join("");
    }
  
    // Create HTML for a single product card
    function createProductCard(product) {
      return `
        <div class="product-card">
          <img src="${product.img}" alt="${product.name}">
          <div class="product-details">
            <h3>${product.name}</h3>
            <p>${product.description || "No description available."}</p>
            <span>$${product.price}</span>
          </div>
        </div>
      `;
    }
  
    // View All Button
    document.getElementById("view-all-btn").addEventListener("click", () => {
      alert("View All Products clicked!");
    });
  });
  