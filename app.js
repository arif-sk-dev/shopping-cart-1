document.addEventListener("DOMContentLoaded", () => {
  const iconCart = document.getElementById("icon-cart");
  const closeCart = document.getElementById("close");
  const cartTab = document.querySelector(".cartTab");
  const listProductHTML = document.querySelector(".listProduct");
  const listCartHTML = document.querySelector(".listCart");
  const iconCartSpan = document.querySelector(".icon-cart span");

  let listProducts = [];
  let carts = [];

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

        newProduct.dataset.id = product.id;

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
      let product_id = positionClick.parentElement.dataset.id;
      addToCart(product_id);
    }
  })

  const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0) {
      carts = [{
        product_id: product_id,
        quantity: 1
      }]
    } else if( positionThisProductInCart <0) {
      carts.push({
        product_id: product_id,
        quantity: 1
      });
    } else{
      carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity+1;
    }
    // console.log(carts);
      addCartToHTML();
  }
  const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    if(carts.length >0) {
      carts.forEach(carts => {
        let newCart = document.createElement('div');
        newCart.classList.add('item');

        newCart.innerHTML = `
          <div class="image">
            <img src="image/baby12.jpg" alt="">
          </div>
          <div class="name">NAME</div>
          <div class="totalPrice">$100</div>
          <div class="quantity">
            <span class="minus"><</span>
            <span>1</span>
            <span class="plus">></span>
          </div>
        `;
        listCartHTML.appendChild(newCart);
      });
    }
  }

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

