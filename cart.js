// cart.js   [global dynamic cart]
let listProducts = [];
let carts = [];

const iconCart = document.getElementById("icon-cart");
const closeCart = document.getElementById("close");
const cartTab = document.getElementById("cartTab");
const overlay = document.getElementById("overlay");
const listCartHTML = document.querySelector(".listCart");
const cartCount = document.getElementById("cart-count");

iconCart?.addEventListener("click", () => {
  cartTab.classList.add("active");
  overlay.classList.add("active");
});

closeCart?.addEventListener("click", () => {
  cartTab.classList.remove("active");
  overlay.classList.remove("active");
});

overlay?.addEventListener("click", () => {
  cartTab.classList.remove("active");
  overlay.classList.remove("active");
});

const addToCart = (product_id) => {
  const product = listProducts.find(p => p.id == product_id);
  if (!product) return;

  const existing = carts.find(cart => cart.product_id == product_id);
  if (existing) {
    alert("This product is already added in your cart!");
    return; // prevent quantity increment & stop further execution
    // existing.quantity++;
  } else {
    carts.push({ product_id, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(carts));
  addCartToHTML();
};

const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalUniqueProducts = 0;

  carts.forEach((cart, index) => {
    totalUniqueProducts++;
    const product = listProducts.find(p => p.id == cart.product_id);
    if (!product) return;

    const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;
    const newCart = document.createElement("div");
    newCart.classList.add("item");
    newCart.innerHTML = `
      <div class="image"><img src="${firstImage}" alt="${product.name}"></div>
      <div class="name">${product.name}</div>
      <div class="price">$${product.price * cart.quantity}</div>
      <input type="number" value="${cart.quantity}" min="1" class="quantity" data-index="${index}">
      <i class="ri-delete-bin-6-fill cart-remove" data-index="${index}" style="cursor:pointer;"></i>
    `;
    listCartHTML.appendChild(newCart);
  });

  cartCount.innerText = totalUniqueProducts;

  listCartHTML.querySelectorAll(".quantity").forEach(input => {
    input.addEventListener("change", event => {
      const index = event.target.dataset.index;
      let newQty = parseInt(event.target.value);
      if (isNaN(newQty) || newQty < 1) newQty = 1;
      carts[index].quantity = newQty;
      localStorage.setItem("cart", JSON.stringify(carts));
      addCartToHTML();
    });
  });

  listCartHTML.querySelectorAll(".cart-remove").forEach(button => {
    button.addEventListener("click", event => {
      const index = event.target.dataset.index;
      carts.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(carts));
      addCartToHTML();
    });
  });
};

const initCart = () => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      listProducts = data;
      const saved = localStorage.getItem("cart");
      if (saved) {
        carts = JSON.parse(saved);
      }
      addCartToHTML();
    });
};

initCart();

// Export in global scope for product.js
window.addToCart = addToCart;