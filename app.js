document.addEventListener("DOMContentLoaded", () => {
  const iconCart = document.getElementById("icon-cart");
  const closeCart = document.getElementById("close");
  const cartTab = document.querySelector(".cartTab");
  const listProductHTML = document.querySelector(".listProduct");

  let listProducts = [];

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

  listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
      alert('1');
    }
  })

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

