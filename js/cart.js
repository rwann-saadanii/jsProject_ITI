const cartList = document.getElementById("cart-list");
const totalPriceElement = document.getElementById("total-price");

// Ensure that the DOM is fully loaded before rendering the cart
document.addEventListener('DOMContentLoaded', function () {
    renderCart();
});

// Render the items in the cart from localStorage
function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];  // Retrieve cart from localStorage
    cartList.innerHTML = '';  // Clear previous cart content
    let totalPrice = 0;

    // If cart is empty, display a message
    if (cart.length === 0) {
        cartList.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceElement.textContent = "Total Price: $0";
        return;
    }

    // Display cart items
    cart.forEach(item => {
        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");

        // Ensure the price is a valid number and multiply by quantity
        const itemTotalPrice = (Number(item.price) * Number(item.quantity)).toFixed(2);

        // Add the Remove button for each cart item
        cartItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${itemTotalPrice}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        
        // Append the cart item to the cart list
        cartList.appendChild(cartItem);

        // Update total price (ensure it is a number)
        totalPrice += Number(item.price) * Number(item.quantity);
    });

    // Update the total price display
    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

// Remove an item from the cart
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];  // Retrieve cart from localStorage
    cart = cart.filter(item => item.id !== id);  // Remove item by ID

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();  // Re-render the cart after removal
}
