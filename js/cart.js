const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const totalPriceElement = document.getElementById("total-price");
let cart = [];


fetch('db.json')
    .then(response => response.json())
    .then(data => {
        renderProducts(data.products);
    })
    .catch(error => console.error('Error loading the JSON file', error));

function renderProducts(products) {
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");
        productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}

function addToCart(id, name, price) {
    const productInCart = cart.find(item => item.id === id);

    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

function renderCart() {
    cartList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${item.price * item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartList.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total Price: $${totalPrice}`;
}
