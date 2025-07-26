document.addEventListener("DOMContentLoaded", () => {
  const iconCart = document.getElementById("icon-cart");
  const closeCart = document.getElementById("close");
  const cartTab = document.querySelector(".cartTab");
  const listProductHTML = document.querySelector(".listProduct");
  const listCartHTML = document.querySelector(".listCart");
  const iconCartSpan = document.querySelector(".icon-cart span");
  const overlay = document.querySelector("#overlay");

  let listProducts = [];
  let carts = [];

  iconCart.addEventListener("click", () => {
    cartTab.classList.add("active");
    overlay.classList.add("active");
  });

  closeCart.addEventListener("click", () => {
    cartTab.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener('click', () => {
    cartTab.classList.remove("active");
    overlay.classList.remove("active");
  })

  const addDataToHTML = (products) => {
    listProductHTML.innerHTML = "";
    products.forEach((product) => {
      const newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;

      const firstImage = Array.isArray(product.image) ? product.image[0] : product.image; //render first img

      newProduct.innerHTML = `
      <a href="detail.html?id=${product.id}" style= "text-decoration: none; color: black;">
        <img src="${firstImage}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="price">$${product.price}</div>
      </a>
        <button class="addCart">Add To Cart</button>
      `;
      listProductHTML.appendChild(newProduct);
    });
  };

  listProductHTML.addEventListener("click", (event) => {
    const positionClick = event.target;
    if (positionClick.classList.contains("addCart")) {
      const product_id = positionClick.parentElement.dataset.id;
      addToCart(product_id);
    }
  });

  const addToCart = (product_id) => {
    const positionInCart = carts.findIndex((item) => item.product_id == product_id);
    if (positionInCart >= 0) {
      carts[positionInCart].quantity += 1;
      alert("This Product is already in your cart! To add quantity, please click the cart icon.");
      return; // Stop here if product already in cart
    }
      // If not found, add to cart
      carts.push({
        product_id,
        quantity: 1,
      });

    addCartToMemory();
    addCartToHTML();
  };

  const addCartToMemory = () => {
    localStorage.setItem("cart", JSON.stringify(carts));
  };

  const addCartToHTML = () => {
    listCartHTML.innerHTML = "";
    // Change this line: totalQuantity should be the number of unique items
    let totalUniqueProducts = 0; 

    carts.forEach((cart, index) => {
      // Increment for each unique product
      totalUniqueProducts += 1; 

      const product = listProducts.find((p) => p.id == cart.product_id);
      if (!product) return;

      const newCart = document.createElement("div");
      newCart.classList.add("item");
      const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;
      newCart.innerHTML = `
        <div class="image">
          <img src="${firstImage}" alt="${product.name}">
        </div>
        <div class="name" style="font-size:14px">${product.name}</div>
        <div class="price">$${product.price * cart.quantity}</div>
        <input type="number" value="${cart.quantity}" min="1" class="quantity" data-index="${index}">
        <i class="ri-delete-bin-6-fill cart-remove" data-index="${index}" style="cursor:pointer;"></i>
      `;
      listCartHTML.appendChild(newCart);
    });

    // Update this line to use totalUniqueProducts
    iconCartSpan.innerText = totalUniqueProducts; 

    // Quantity input change
    const quantityInputs = listCartHTML.querySelectorAll('.quantity');
    quantityInputs.forEach(input => {
      input.addEventListener('change', (event) => {
        let newQuantity = parseInt(event.target.value);
        const index = parseInt(event.target.dataset.index);

        if (isNaN(newQuantity) || newQuantity < 1) newQuantity = 1;
        carts[index].quantity = newQuantity;

        addCartToMemory();
        addCartToHTML();
      });
    });

    // Delete item click
    const deleteButtons = listCartHTML.querySelectorAll('.cart-remove');
    deleteButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const index = parseInt(event.target.dataset.index);
        carts.splice(index, 1); // Remove item from array
        addCartToMemory();
        addCartToHTML(); // Re-render cart
      });
    });
  };

  const initApp = () => {
    fetch("products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        listProducts = data;
        addDataToHTML(listProducts);
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          carts = JSON.parse(savedCart);
          addCartToHTML();
        }
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
      });
  };

  initApp();
});