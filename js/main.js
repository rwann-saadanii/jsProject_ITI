// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Fetch products from the backend and display them
    fetch('http://localhost:3000/products') // Replace with your actual backend URL
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(products => {
        const productCards = document.querySelector(".product-cards");
  
        if (productCards) {
          // Clear any existing content in the product cards container
          productCards.innerHTML = '';
  
          // Loop through the products and create cards for each one
          products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
              <img src="${product.img}" alt="${product.name}">
              <p class="candel-name">${product.name}</p>
              <p class="candel-price">$${product.price}</p>
              <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productCards.appendChild(card);
          });
  
          // Add event listeners to the "Add to Cart" buttons
          const addToCartButtons = document.querySelectorAll(".add-to-cart");
          addToCartButtons.forEach(button => {
            button.addEventListener("click", (e) => {
              const productId = e.target.dataset.id;
              addToCart(productId, products);
            });
          });
        } else {
          console.error("Product cards container not found in the DOM.");
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  
    // Add event listener to view the cart
    const viewCartButton = document.getElementById('viewCart');
    if (viewCartButton) {
      viewCartButton.addEventListener('click', () => {
        displayCart();
        window.location.href = '/html/cart.html';
        });
      }
  });
  
  // Function to add a product to the cart
  function addToCart(productId, products) {
    // Retrieve the current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Find the product details from the products array
    const product = products.find(item => item.id === productId);
  
    if (!product) {
      console.error('Product not found!');
      return;
    }
  
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
      // If the product exists, increment its quantity
      existingProduct.quantity += 1;
    } else {
      // If the product doesn't exist, add it with a quantity of 1
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        quantity: 1
      });
    }
  
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    alert(`Product "${product.name}" added to cart!`);
  }
  
  // Function to display the cart
  function displayCart() {
    const cartContainer = document.getElementById('cartContainer');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }
  
    // Display the cart items
    cartContainer.innerHTML = '<ul>';
    cart.forEach(item => {
      cartContainer.innerHTML += `
        <li>
          <img src="${item.img}" alt="${item.name}" width="50">
          <strong>${item.name}</strong> - $${item.price} x ${item.quantity}
          <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        </li>
      `;
    });
    cartContainer.innerHTML += '</ul>';
  
    // Add event listeners to remove buttons
    const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
    removeFromCartButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const productId = e.target.dataset.id;
        removeFromCart(productId);
        displayCart(); // Refresh the cart display
      });
    });
  }
  
  // Function to remove a product from the cart
  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product removed from cart!');
  }
  
