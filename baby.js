//Get the product list container
const listProductHTML = document.querySelector(".listProduct");

//Define a function to display products in HTML
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

// Enable Add To Cart logic by delegating click event
listProductHTML.addEventListener("click", (event) => {
  if (event.target.classList.contains("addCart")) {
    const product_id = event.target.closest(".item").dataset.id;
    window.addToCart(product_id); // Global cart logic from header.html
  }
});

// Initialize and load baby products only
const initApp = () => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      // Filter only "baby" category products
      const babyProducts = data.filter(product => product.category === "baby");
      addDataToHTML(babyProducts); // Load to page
    });
};
initApp();

// get all baby product item count =============
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const babyProducts = data.filter(product => product.category === "baby");
    const babyItemCount = babyProducts.length;
    // console.log("Total number count", babyItemCount);
    document.getElementById("allItem").innerHTML = `Baby all Product: ${babyItemCount} items`;
  });

// Count specific types within baby products============
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const babyProducts = data.filter(product => product.category === "baby");

    const shirtCount = babyProducts.filter(product => product.type === "shirt").length;
    const pantCount = babyProducts.filter(product => product.type === "pant").length;

      // Count 'other' baby items (those not explicitly shirt or pant)
    const otherCount = babyProducts.filter(product => product.type !== "shirt" && product.type !== "pant").length;

    document.getElementById("shirtCount").innerHTML = `${shirtCount}`;
    document.getElementById("pantCount").innerHTML = `${pantCount}`;
    document.getElementById("otherCount").innerHTML = `${otherCount}`;
  });


// sidebar link's counted product show ==============
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    const selectedType = event.target.dataset.type;
    filterBabyProductsByType(selectedType);
  });
});

// Filter baby category by selected type
const filterBabyProductsByType = (type) => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      const filteredProducts = data.filter(product => 
        product.category === "baby" && (
          type === "other" ? product.type !== "shirt" && product.type !== "pant" : product.type === type
        )
      );
      addDataToHTML(filteredProducts);
    });
};

