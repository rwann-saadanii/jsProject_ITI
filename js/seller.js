document.addEventListener("DOMContentLoaded", () => {
  showSection("browse-products"); // Default section

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const section = link.getAttribute("data-section");
      showSection(section);
    });
  });

  const addProductBtn = document.querySelector(".add-product-btn");
  addProductBtn.addEventListener("click", addProduct);

  loadProducts();
  loadOrders();
});

// Show specific section
function showSection(section) {
  document.querySelectorAll(".content-section").forEach(sec => {
    sec.style.display = "none";
  });
  document.getElementById(section).style.display = "block";
}

// Add a new product
function addProduct() {
  const name = prompt("Enter product name:");
  const price = prompt("Enter product price:");
  const category = prompt("Enter product category:");
  if (name && price && category) {
    const newRow = `
      <tr>
        <td>${name}</td>
        <td>${price}</td>
        <td>${category}</td>
        <td>
          <button onclick="editProduct(this)">Edit</button>
          <button onclick="deleteProduct(this)">Delete</button>
        </td>
      </tr>
    `;
    document.querySelector("#productTable tbody").insertAdjacentHTML("beforeend", newRow);
  } else {
    alert("All fields are required!");
  }
}

// Edit product
function editProduct(button) {
  const row = button.closest("tr");
  const name = prompt("Enter new product name:", row.children[0].textContent);
  const price = prompt("Enter new product price:", row.children[1].textContent);
  const category = prompt("Enter new product category:", row.children[2].textContent);
  if (name && price && category) {
    row.children[0].textContent = name;
    row.children[1].textContent = price;
    row.children[2].textContent = category;
  } else {
    alert("All fields are required!");
  }
}

// Delete product
function deleteProduct(button) {
  if (confirm("Are you sure you want to delete this product?")) {
    button.closest("tr").remove();
  }
}

// Load products
function loadProducts() {
  const productList = document.getElementById("product-list");
  for (let i = 1; i <= 5; i++) {
    const productCard = `
      <div class="product-card">
        <h3>Product ${i}</h3>
        <p>Price: $${i * 10}</p>
        <p>Category: Category ${i}</p>
      </div>
    `;
    productList.insertAdjacentHTML("beforeend", productCard);
  }
}

// Load orders
function loadOrders() {
  const orderTable = document.querySelector("#orderTable tbody");
  for (let i = 1; i <= 3; i++) {
    const orderRow = `
      <tr>
        <td>${i}</td>
        <td>Customer ${i}</td>
        <td>Pending</td>
        <td>
          <button onclick="updateOrderStatus(this)">Update Status</button>
        </td>
      </tr>
    `;
    orderTable.insertAdjacentHTML("beforeend", orderRow);
  }
}

// Update order status
function updateOrderStatus(button) {
  const row = button.closest("tr");
  const newStatus = prompt("Enter new status:", row.children[2].textContent);
  if (newStatus) {
    row.children[2].textContent = newStatus;
  }
}
