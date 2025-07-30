// Step 1: Get the product list container
const listProductHTML = document.querySelector(".listProduct");

// Step 2: Define a function to display products in HTML
const addDataToHTML = (products) => {
  listProductHTML.innerHTML = ""; // Clear current content

  products.forEach(product => {
    const newProduct = document.createElement("div");
    newProduct.classList.add("item");
    newProduct.dataset.id = product.id;

    const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;

    newProduct.innerHTML = `
      <a href="detail.html?id=${product.id}" style="text-decoration: none; color: black;">
        <img src="${firstImage}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="price">$${product.price}</div>
      </a>
      <button class="addCart">Add To Cart</button>
    `;
    listProductHTML.appendChild(newProduct);
  });
};

// Step 3: Enable Add To Cart logic by delegating click event
listProductHTML.addEventListener("click", (event) => {
  if (event.target.classList.contains("addCart")) {
    const product_id = event.target.closest(".item").dataset.id;
    window.addToCart(product_id); // Global cart logic from header.html
  }
});

// Step 4: Initialize and load baby products only
const initApp = () => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      // Filter only "baby" category products
      const babyProducts = data.filter(product => product.category === "baby");
      addDataToHTML(babyProducts); // Load to page
    });
};

initApp(); // Step 5: Run the app when script loads
