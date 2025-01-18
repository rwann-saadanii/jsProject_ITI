document.addEventListener("DOMContentLoaded", () => {
  // Fetch and display users, products, and orders on load
  fetchUsers();
  fetchProducts();
  fetchOrders();

  // Add event listeners to navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const section = link.getAttribute("data-section");
      showSection(section);
    });
  });

  // Add event listeners to buttons
  const addUserButton = document.querySelector(".add-user-btn");
  const addProductButton = document.querySelector(".add-product-btn");

  addUserButton.addEventListener("click", addUser);
  addProductButton.addEventListener("click", addProduct);

  // Logout button
  const logoutButton = document.querySelector(".logout-btn");
  logoutButton.addEventListener("click", handleLogout);
});

// Function to display the selected section
function showSection(section) {
  document.querySelectorAll(".main-content > div").forEach(div => {
    div.style.display = "none";
  });
  document.getElementById(section).style.display = "block";
}

// Fetch and display all users
function fetchUsers() {
  fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(users => {
      const userTable = document.getElementById("userTable");
      userTable.innerHTML = ""; // Clear existing rows
      users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td class="actions">
            <button class="edit-btn" data-id="${user.id}">Edit</button>
            <button class="delete-btn" data-id="${user.id}">Delete</button>
          </td>
        `;
        userTable.appendChild(row);
      });
      attachUserHandlers();
    })
    .catch(error => console.error("Error fetching users:", error));
}

// Attach event listeners to Edit and Delete buttons for users
function attachUserHandlers() {
  document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", () => {
      const userId = button.getAttribute("data-id");
      handleEditUser(userId);
    });
  });

  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", () => {
      const userId = button.getAttribute("data-id");
      handleDeleteUser(userId);
    });
  });
}

// Add a new user
function addUser() {
  const name = prompt("Enter user name:");
  const email = prompt("Enter user email:");
  const role = prompt("Enter user role (Admin or Customer):");

  if (name && email && role) {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, role })
    })
      .then(response => response.json())
      .then(() => {
        alert("User added successfully!");
        fetchUsers();
      })
      .catch(error => console.error("Error adding user:", error));
  } else {
    alert("All fields are required!");
  }
}

// Edit an existing user
function handleEditUser(userId) {
  const newName = prompt("Enter the new name:");
  const newEmail = prompt("Enter the new email:");
  const newRole = prompt("Enter the new role:");

  if (newName && newEmail && newRole) {
    fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: newName, email: newEmail, role: newRole })
    })
      .then(response => response.json())
      .then(() => {
        alert("User updated successfully!");
        fetchUsers();
      })
      .catch(error => console.error("Error updating user:", error));
  } else {
    alert("All fields are required!");
  }
}

// Delete a user
function handleDeleteUser(userId) {
  if (confirm("Are you sure you want to delete this user?")) {
    fetch(`http://localhost:3000/users/${userId}`, { method: "DELETE" })
      .then(response => {
        if (response.ok) {
          alert("User deleted successfully!");
          fetchUsers();
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .catch(error => console.error("Error deleting user:", error));
  }
}

// Fetch and display all products
function fetchProducts() {
  fetch("http://localhost:3000/products")
    .then(response => response.json())
    .then(products => {
      const productTable = document.getElementById("productTable");
      productTable.innerHTML = ""; // Clear existing rows
      products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.stock}</td>
          <td class="actions">
            <button class="edit-product-btn" data-id="${product.id}">Edit</button>
            <button class="delete-product-btn" data-id="${product.id}">Delete</button>
          </td>
        `;
        productTable.appendChild(row);
      });
      attachProductHandlers();
    })
    .catch(error => console.error("Error fetching products:", error));
}

// Attach event listeners to Edit and Delete buttons for products
function attachProductHandlers() {
  document.querySelectorAll(".edit-product-btn").forEach(button => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      handleEditProduct(productId);
    });
  });

  document.querySelectorAll(".delete-product-btn").forEach(button => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      handleDeleteProduct(productId);
    });
  });
}

// Add a new product
function addProduct() {
  const name = prompt("Enter product name:");
  const price = prompt("Enter product price:");
  const stock = prompt("Enter product stock:");

  if (name && price && stock) {
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, price, stock })
    })
      .then(response => response.json())
      .then(() => {
        alert("Product added successfully!");
        fetchProducts();
      })
      .catch(error => console.error("Error adding product:", error));
  } else {
    alert("All fields are required!");
  }
}

// Edit an existing product
function handleEditProduct(productId) {
  const newName = prompt("Enter the new name:");
  const newPrice = prompt("Enter the new price:");
  const newStock = prompt("Enter the new stock:");

  if (newName && newPrice && newStock) {
    fetch(`http://localhost:3000/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: newName, price: newPrice, stock: newStock })
    })
      .then(response => response.json())
      .then(() => {
        alert("Product updated successfully!");
        fetchProducts();
      })
      .catch(error => console.error("Error updating product:", error));
  } else {
    alert("All fields are required!");
  }
}

// Delete a product
function handleDeleteProduct(productId) {
  if (confirm("Are you sure you want to delete this product?")) {
    fetch(`http://localhost:3000/products/${productId}`, { method: "DELETE" })
      .then(response => {
        if (response.ok) {
          alert("Product deleted successfully!");
          fetchProducts();
        } else {
          throw new Error("Failed to delete product");
        }
      })
      .catch(error => console.error("Error deleting product:", error));
  }
}

// Fetch and display all orders
function fetchOrders() {
  fetch("http://localhost:3000/orders")
    .then(response => response.json())
    .then(orders => {
      const orderTable = document.getElementById("orderTable");
      orderTable.innerHTML = ""; // Clear existing rows
      orders.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${order.id}</td>
          <td>${order.customer}</td>
          <td>${order.total}</td>
          <td>${order.status}</td>
          <td class="actions">
            <button class="update-order-btn" data-id="${order.id}">Update Status</button>
          </td>
        `;
        orderTable.appendChild(row);
      });
      attachOrderHandlers();
    })
    .catch(error => console.error("Error fetching orders:", error));
}

// Attach event listeners to Update Status buttons for orders
function attachOrderHandlers() {
  document.querySelectorAll(".update-order-btn").forEach(button => {
    button.addEventListener("click", () => {
      const orderId = button.getAttribute("data-id");
      handleUpdateOrder(orderId);
    });
  });
}

// Update an order's status
function handleUpdateOrder(orderId) {
  const newStatus = prompt("Enter the new status:");
  if (newStatus) {
    fetch(`http://localhost:3000/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(response => response.json())
      .then(() => {
        alert("Order status updated successfully!");
        fetchOrders();
      })
      .catch(error => console.error("Error updating order:", error));
  } else {
    alert("Status is required!");
  }
}

// Logout functionality
function handleLogout() {
  sessionStorage.clear();
  window.location.href = "/html/login.html";
}
