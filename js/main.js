fetch('http://localhost:3000/products')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(products => {
        const productCards = document.querySelector(".product-cards");

        if (productCards) {
            products.forEach(product => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
                    <img src="${product.img}" alt="${product.name}">
                    <p class="candel-name">${product.name}</p>
                    <span class="candel-price">&dollar;${product.price}</span>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                `;
                productCards.appendChild(card);
            });

            const addToCartButtons = document.querySelectorAll(".add-to-cart");
            addToCartButtons.forEach(button => {
                button.addEventListener("click", (e) => {
                    const productId = e.target.dataset.id;
                    addToCart(productId);
                });
            });
        } else {
            console.error("Product cards container not found in the DOM.");
        }
    })
    


function addToCart(productId) {
    console.log(`Product with ID ${productId} added to cart`);
    
}