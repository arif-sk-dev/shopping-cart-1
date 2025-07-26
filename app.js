// document.addEventListener("DOMContentLoaded", () => {
//   const iconCart = document.getElementById("icon-cart");
//   const closeCart = document.getElementById("close");
//   const cartTab = document.querySelector(".cartTab");
//   const listProductHTML = document.querySelector(".listProduct");
//   const listCartHTML = document.querySelector(".listCart");
//   const iconCartSpan = document.querySelector(".icon-cart span");

//   let listProducts = [];
//   let carts = [];

//   iconCart.addEventListener("click", () => {
//     cartTab.classList.add("active");
//   });

//   closeCart.addEventListener("click", () => {
//     cartTab.classList.remove("active");
//   });

//   const addDataToHTML = (products) => {
//     listProductHTML.innerHTML = "";
//     products.forEach((product) => {
//       let newProduct = document.createElement("div");
//       newProduct.classList.add("item");
//       newProduct.dataset.id = product.id;

//       newProduct.innerHTML = `
//         <img src="${product.image}" alt="${product.name}">
//         <h3>${product.name}</h3>
//         <div class="price">$${product.price}</div>
//         <button class="addCart">Add To Cart</button>
//       `;
//       listProductHTML.appendChild(newProduct);
//     });
//   };

//   listProductHTML.addEventListener("click", (event) => {
//     const positionClick = event.target;
//     if (positionClick.classList.contains("addCart")) {
//       const product_id = positionClick.parentElement.dataset.id;
//       addToCart(product_id);
//     }
//   });

//   const addToCart = (product_id) => {
//     const positionInCart = carts.findIndex((item) => item.product_id == product_id);
//     if (positionInCart >= 0) {
//       carts[positionInCart].quantity += 1;
//     } else {
//       carts.push({
//         product_id,
//         quantity: 1,
//       });
//     }
//     addCartToMemory();
//     addCartToHTML();
//   };

//   const addCartToMemory = () => {
//     localStorage.setItem("cart", JSON.stringify(carts));
//   };

//   const addCartToHTML = () => {
//     listCartHTML.innerHTML = "";
//     let totalQuantity = 0;

//     carts.forEach((cart, index) => {
//       totalQuantity += cart.quantity;
//       const product = listProducts.find((p) => p.id == cart.product_id);
//       if (!product) return;

//       const newCart = document.createElement("div");
//       newCart.classList.add("item");

//       newCart.innerHTML = `
//         <div class="image">
//           <img src="${product.image}" alt="${product.name}">
//         </div>
//         <div class="name">${product.name}</div>
//         <div class="price">$${product.price * cart.quantity}</div>
//         <input type="number" value="${cart.quantity}" min="1" class="quantity" data-index="${index}">
//         <i class="ri-delete-bin-6-fill cart-remove"></i>
//       `;
//       listCartHTML.appendChild(newCart);
//     });

//     iconCartSpan.innerText = totalQuantity;

//     // Handle quantity change
//     const quantityInputs = listCartHTML.querySelectorAll('.quantity');
//     quantityInputs.forEach(input => {
//       input.addEventListener('change', (event) => {
//         let newQuantity = parseInt(event.target.value);
//         const index = parseInt(event.target.dataset.index);

//         if (isNaN(newQuantity) || newQuantity < 1) newQuantity = 1;
//         carts[index].quantity = newQuantity;

//         addCartToMemory();
//         addCartToHTML(); // Re-render with updated total price
//       });
//     });
//   };

//   const initApp = () => {
//     fetch("products.json")
//       .then((res) => {
//         if (!res.ok) throw new Error("Network response was not ok");
//         return res.json();
//       })
//       .then((data) => {
//         listProducts = data;
//         addDataToHTML(listProducts);
//         const savedCart = localStorage.getItem("cart");
//         if (savedCart) {
//           carts = JSON.parse(savedCart);
//           addCartToHTML();
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to load products:", err);
//       });
//   };

//   initApp();
// });

document.addEventListener("DOMContentLoaded", () => {
  const iconCart = document.getElementById("icon-cart");
  const closeCart = document.getElementById("close");
  const cartTab = document.querySelector(".cartTab");
  const listProductHTML = document.querySelector(".listProduct");
  const listCartHTML = document.querySelector(".listCart");
  const iconCartSpan = document.querySelector(".icon-cart span");

  let listProducts = [];
  let carts = [];

  iconCart.addEventListener("click", () => {
    cartTab.classList.add("active");
  });

  closeCart.addEventListener("click", () => {
    cartTab.classList.remove("active");
  });

  const addDataToHTML = (products) => {
    listProductHTML.innerHTML = "";
    products.forEach((product) => {
      const newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;

      newProduct.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="price">$${product.price}</div>
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
      // carts[positionInCart].quantity += 1;
      alert("This Product is already in yur cart! To add quantity, please click the cart icon.");
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
    let totalQuantity = 0;

    carts.forEach((cart, index) => {
      totalQuantity += cart.quantity;
      const product = listProducts.find((p) => p.id == cart.product_id);
      if (!product) return;

      const newCart = document.createElement("div");
      newCart.classList.add("item");

      newCart.innerHTML = `
        <div class="image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="name" style="font-size:14px">${product.name}</div>
        <div class="price">$${product.price * cart.quantity}</div>
        <input type="number" value="${cart.quantity}" min="1" class="quantity" data-index="${index}">
        <i class="ri-delete-bin-6-fill cart-remove" data-index="${index}" style="cursor:pointer;"></i>
      `;
      listCartHTML.appendChild(newCart);
    });

    iconCartSpan.innerText = totalQuantity;

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