// Detail.js
//Popup section start here 
document.addEventListener("DOMContentLoaded", () => {
  const openPopup = document.getElementById("openSizeGuide");
  const popup = document.querySelector(".popup-content");
  const closePopup = document.getElementById("closeSizeGuide");
  const overlay = document.querySelector("#popupOverlay");


  openPopup.addEventListener('click', () => {
    popup.classList.add("active");
    overlay.classList.add("active");
  });

  closePopup.addEventListener('click', () => {
    popup.classList.remove("active");
    // console.log("hide");
    overlay.classList.remove("active");
  });

  overlay.addEventListener('click', ()=> {
    popup.classList.remove("active");
    overlay.classList.remove("active");
  });
});
// //Popup section end here 

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

document.addEventListener("DOMContentLoaded", () => {
  const productId = getProductIdFromURL();
  fetch("products.json")
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id == productId);
      if (!product) return;

      document.getElementById("main-img").src = Array.isArray(product.image) ? product.image[0] : product.image;
      document.getElementById("product-name").innerText = product.name;
      document.querySelector(".price").innerText = `$${product.price}`;
      document.getElementById("product-desc").innerText = product.description || "No description available.";

      const thumbnails = document.querySelector(".thumbnails");
      thumbnails.innerHTML = "";
      if (Array.isArray(product.image)) {
        product.image.forEach(img => {
          const thumb = document.createElement("img");
          thumb.src = img;
          thumb.classList.add("small-img");
          thumb.onclick = () => {
            document.getElementById("main-img").src = img;
          };
          thumbnails.appendChild(thumb);
        });
      }
    });
});


// detail product add to cart with dynamic function which is updated all page's header
document.addEventListener("DOMContentLoaded", () => {
  const productId = getProductIdFromURL();

  const addToCartBtn = document.getElementById("addToCartBtn");
  const quantityInput = document.querySelector("input[type='number']");

  addToCartBtn.addEventListener("click", () => {
    const qty = parseInt(quantityInput.value);
    if (isNaN(qty) || qty < 1) return;

    // check if product exists in listProducts
    const product = listProducts.find(p => p.id == productId);
    if (!product) return;

    const existing = carts.find(cart => cart.product_id == productId);
    if (existing) {
      alert("This product is already added in your cart!");
    } else {
      carts.push({ product_id: productId, quantity: qty });
      localStorage.setItem("cart", JSON.stringify(carts));
      addCartToHTML();
    }
  });
});

// similar product execution=========
// document.addEventListener("DOMContentLoaded", () => {
//   const productId = getProductIdFromURL();

//   fetch("products.json")
//     .then(res => res.json())
//     .then(products => {
//       const currentProduct = products.find(p => p.id == productId);
//       if (!currentProduct) return;

//       // Existing detail code…
//       document.getElementById("main-img").src = Array.isArray(currentProduct.image) ? currentProduct.image[0] : currentProduct.image;
//       document.getElementById("product-name").innerText = currentProduct.name;
//       document.querySelector(".price").innerText = `$${currentProduct.price}`;
//       // document.getElementById("product-desc").innerText = currentProduct.description || "No description available.";

//       // Thumbnails…
//       const thumbnails = document.querySelector(".thumbnails");
//       thumbnails.innerHTML = "";
//       if (Array.isArray(currentProduct.image)) {
//         currentProduct.image.forEach(img => {
//           const thumb = document.createElement("img");
//           thumb.src = img;
//           thumb.classList.add("small-img");
//           thumb.onclick = () => {
//             document.getElementById("main-img").src = img;
//           };
//           thumbnails.appendChild(thumb);
//         });
//       }

//       // 👉 Similar Products Logic
//       const similarProductsContainer = document.getElementById("similar-products");
//       similarProductsContainer.innerHTML = "";

//       // Optional: match by category or type if available
//       const similarProducts = products.filter(p => p.id !== productId); 

//       similarProducts.forEach(p => {
//         const productCard = document.createElement("div");
//         productCard.classList.add("similar-product-card");

//         const img = document.createElement("img");
//         img.src = Array.isArray(p.image) ? p.image[0] : p.image;
//         img.alt = p.name;
//         img.classList.add("small-img");
//         img.onclick = () => {
//           window.location.href = `detail.html?id=${p.id}`; // Navigate to product detail
//         };

//         const name = document.createElement("p");
//         name.innerText = p.name;

//         const price = document.createElement("p");
//         price.innerText = `$${p.price}`;

//         productCard.appendChild(img);
//         productCard.appendChild(name);
//         productCard.appendChild(price);
//         similarProductsContainer.appendChild(productCard);
//       });
//     });
// });