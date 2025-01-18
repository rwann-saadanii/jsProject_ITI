async function browseProductsAsAnonymous() {
  const products = await fetchData("products");
  const mainContent = document.getElementById("main-content");

  mainContent.innerHTML = `
    <h2>Browse Products</h2>
    <ul>
      ${products
        .map(
          (product) => `
        <li>${product.name} - $${product.price}
          <button disabled>Login to Purchase</button>
        </li>`
        )
        .join("")}
    </ul>
  `;
}

function showLoginPrompt() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `
    <h2>Login</h2>
    <form id="login-form">
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  `;

  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password);
  });
}
