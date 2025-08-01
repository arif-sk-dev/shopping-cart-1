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
      const womenProducts = data.filter(product => product.category === "women");
      addDataToHTML(womenProducts); // Load to page
    });
};
initApp();

// get women product all item count =============
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const womenProducts = data.filter(product => product.category === "women");
    const womenItemCount = womenProducts.length;
    // console.log("Total number count", womenItemCount);
    document.getElementById("allItem").innerHTML = `Women all Product: ${womenItemCount} items`;
  });

// Count specific types within women products============
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const womenProducts = data.filter(product => product.category === "women");

    const topCount = womenProducts.filter(product => product.type === "top").length;
    const bottomCount = womenProducts.filter(product => product.type === "bottom").length;
    const shariCount = womenProducts.filter(product => product.type === "shari").length;
    const kaftanCount = womenProducts.filter(product => product.type === "kaftan").length;
    const gownCount = womenProducts.filter(product => product.type === "gown").length;
    const maxiCount = womenProducts.filter(product => product.type === "maxi").length;
    const bodyconCount = womenProducts.filter(product => product.type === "bodycon").length;
    const scarvesCount = womenProducts.filter(product => product.type === "scarves").length;
    const shoeCount = womenProducts.filter(product => product.type === "shoe").length;

      // Count 'other' women items (those not explicitly shirt or pant)
    const otherCount = womenProducts.filter(product => product.type !== "top" && product.type !== "bottom" && product.type !== "shari" && product.type !== "kaftan" && product.type !== "gown" && product.type !== "maxi" && product.type !== "bodycon" && product.type !== "scarves" && product.type !== "shoe").length;

    document.getElementById("topCount").innerHTML = `${topCount}`;
    document.getElementById("bottomCount").innerHTML = `${bottomCount}`;
    document.getElementById("shariCount").innerHTML = `${shariCount}`;
    document.getElementById("kaftanCount").innerHTML = `${kaftanCount}`;
    document.getElementById("gownCount").innerHTML = `${gownCount}`;
    document.getElementById("maxiCount").innerHTML = `${maxiCount}`;
    document.getElementById("bodyconCount").innerHTML = `${bodyconCount}`;
    document.getElementById("scarvesCount").innerHTML = `${scarvesCount}`;
    document.getElementById("shoeCount").innerHTML = `${shoeCount}`;
    document.getElementById("otherCount").innerHTML = `${otherCount}`;
  });


// sidebar link's counted product show/execute ==============
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    const selectedType = event.target.dataset.type;
    filterWomenProductsByType(selectedType);
  });
});

// Filter baby category by selected type
const filterWomenProductsByType = (type) => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      const filteredProducts = data.filter(product => 
        product.category === "women" && (
          type === "other" ? product.type !== "top" && product.type !== "bottom" && product.type !== "shari" && product.type !== "kaftan" && product.type !== "gown" && product.type !== "maxi" && product.type !== "bodycon" && product.type !== "scarves" && product.type !== "shoe" : product.type === type
        )
      );
      addDataToHTML(filteredProducts);
    });
};

