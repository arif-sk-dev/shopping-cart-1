// // Cart execution 
// document.addEventListener("DOMContentLoaded", () => {
//   const iconCart = document.getElementById("icon-cart");
//   const closeCart = document.getElementById("close");
//   const cartTab = document.querySelector(".cartTab");

  

//   iconCart.addEventListener('click', () => {
//     cartTab.classList.add("active");
//   });

//   closeCart.addEventListener('click', () => {
//     cartTab.classList.remove("active");
//   });
// });

// const listProductHTML = document.getElementById("listProduct"); //product list


// const addDataToHTML = () => {
//   const listProducts = [];
//   listProductHTML.innerHTML = '';
//   if(listProducts.length > 0) {
//     listProducts.forEach(product => {    
//       let newProduct = document.createElement('div');
//       newProduct.classList.add('item');
//       newProduct.innerHTML = `
//         <img src="${product.image}" alt="">
//         <h3>${product.name}</h3>
//         <div class="price">$${product.price}</div>
//         <button class="addCart">Add To Cart</button>
//       `;
//       listProductHTML.appendChild(newProduct);
//     })
//   }
// }

// const initApp = () => {
//   //get data from json
//   fetch('products.json')
//   .then(response => response.json())
//   .then(data => {
//     listProducts = data;
//     // console.log("listProducts");
//     addDataToHTML();
//   });
// }
// initApp();

document.addEventListener("DOMContentLoaded", () => {
  const iconCart = document.getElementById("icon-cart");
  const closeCart = document.getElementById("close");
  const cartTab = document.querySelector(".cartTab");
  const listProductHTML = document.getElementById("listProduct");

  iconCart.addEventListener('click', () => {
    cartTab.classList.add("active");
  });

  closeCart.addEventListener('click', () => {
    cartTab.classList.remove("active");
  });

  const addDataToHTML = (products) => {
    listProductHTML.innerHTML = '';
    if (products.length > 0) {
      products.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <div class="price">$${product.price}</div>
          <button class="addCart">Add To Cart</button>
        `;
        listProductHTML.appendChild(newProduct);
      });
    }
  };

  const initApp = () => {
    fetch('products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        return response.json();
      })
      .then(data => {
        const listProducts = data; // ✅ Local variable here
        addDataToHTML(listProducts); // ✅ Pass to rendering function
      })
      .catch(error => {
        console.error("Error loading products:", error);
      });
  };

  initApp(); // ✅ Kick off app when DOM is ready
});

