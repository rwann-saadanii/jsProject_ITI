// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Fetch products from the backend and display them
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
                // Clear any existing content in the product cards container
                productCards.innerHTML = '';

                // Loop through the products and create cards for each one
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

                // Add event listeners to the "Add to Cart" buttons
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
        .catch(error => {
            console.error('Error fetching products:', error);
        });

    // Add event listener to the search button
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', function () {
            const query = document.getElementById('searchInput').value;
            if (query) {
                searchProducts(query);
            }
        });
    } else {
        console.error('Search button not found!');
    }
});

// Function to search products
function searchProducts(query) {
    fetch(`/search?query=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to display search results
function displayResults(products) {
    const resultsDiv = document.getElementById('results');
    if (resultsDiv) {
        resultsDiv.innerHTML = '';

        if (products.length === 0) {
            resultsDiv.innerHTML = '<p>No products found.</p>';
            return;
        }

        // Loop through the search results and display them
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
            `;
            resultsDiv.appendChild(productDiv);
        });
    } else {
        console.error('Results container not found in the DOM.');
    }
}

// Function to handle adding a product to the cart
function addToCart(productId) {
    console.log(`Product with ID ${productId} added to cart`);
    // You can implement the logic to add the product to the cart here
}