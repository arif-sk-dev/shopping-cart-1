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

// Initialize and load women products only
const initApp = () => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      // Filter only "women" category products
      const menProducts = data.filter(product => product.category === "men");
      addDataToHTML(menProducts); // Load to page
    });
};
initApp();

// get women product all item count =============
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const menProducts = data.filter(product => product.category === "men");
    const menItemCount = menProducts.length;
    // console.log("Total number count", menItemCount);
    document.getElementById("allItem").innerHTML = `Men all Product: ${menItemCount} items`;
  });

// Count specific types within women products============
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const menProducts = data.filter(product => product.category === "men");

    const shirtCount = menProducts.filter(product => product.type === "shirt").length;
    const pantCount = menProducts.filter(product => product.type === "pant").length;
    const tshirtCount = menProducts.filter(product => product.type === "tshirt").length;
    const poloCount = menProducts.filter(product => product.type === "polo").length;
    const hoodieCount = menProducts.filter(product => product.type === "hoodie").length;
    const joggersCount = menProducts.filter(product => product.type === "joggers").length;
    const blazerCount = menProducts.filter(product => product.type === "blazer").length;
    const tieCount = menProducts.filter(product => product.type === "tie").length;
    const trousersCount = menProducts.filter(product => product.type === "trousers").length;
    const jacketCount = menProducts.filter(product => product.type === "jacket").length;
    const overcoatCount = menProducts.filter(product => product.type === "overcoat").length;
    const raincoatCount = menProducts.filter(product => product.type === "raincoat").length;
    const shoeCount = menProducts.filter(product => product.type === "shoe").length;

      // Count 'other' women items (those not explicitly shirt or pant)
    const otherCount = menProducts.filter(product => product.type !== "shirt" && product.type !== "pant" && product.type !== "tshirt" && product.type !== "polo" && product.type !== "hoodie" && product.type !== "joggers" && product.type !== "blazer" && product.type !== "tie" && product.type !== "trousers" && product.type !== "jacket" && product.type !== "overcoat" && product.type !== "raincoat" && product.type !== "shoe").length;

    document.getElementById("shirtCount").innerHTML = `${shirtCount}`;
    document.getElementById("pantCount").innerHTML = `${pantCount}`;
    document.getElementById("tshirtCount").innerHTML = `${tshirtCount}`;
    document.getElementById("poloCount").innerHTML = `${poloCount}`;
    document.getElementById("hoodieCount").innerHTML = `${hoodieCount}`;
    document.getElementById("joggersCount").innerHTML = `${joggersCount}`;
    document.getElementById("blazerCount").innerHTML = `${blazerCount}`;
    document.getElementById("tieCount").innerHTML = `${tieCount}`;
    document.getElementById("trousersCount").innerHTML = `${trousersCount}`;
    document.getElementById("jacketCount").innerHTML = `${jacketCount}`;
    document.getElementById("overcoatCount").innerHTML = `${overcoatCount}`;
    document.getElementById("raincoatCount").innerHTML = `${raincoatCount}`;
    document.getElementById("otherCount").innerHTML = `${otherCount}`;
  });


// sidebar link's counted product show/execute ==============
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    const selectedType = event.target.dataset.type;
    filterMenProductsByType(selectedType);
  });
});

// Filter baby category by selected type
const filterMenProductsByType = (type) => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      const filteredProducts = data.filter(product => 
        product.category === "men" && (
          type === "other" ? product.type !== "shirt" && product.type !== "pant" && product.type !== "tshirt" && product.type !== "polo" && product.type !== "hoodie" && product.type !== "joggers" && product.type !== "blazer" && product.type !== "tie" && product.type !== "trousers" && product.type !== "jacket" && product.type !== "overcoat" && product.type !== "raincoat" && product.type !== "shoe" : product.type === type
        )
      );
      addDataToHTML(filteredProducts);
    });
};

