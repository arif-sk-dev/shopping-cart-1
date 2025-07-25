// Cart execution 
document.addEventListener("DOMContentLoaded", () => {
  const iconCart = document.getElementById("icon-cart");
  const closeCart = document.getElementById("close");
  const cartTab = document.querySelector(".cartTab");

  iconCart.addEventListener('click', () => {
    cartTab.classList.add("active");
  });

  closeCart.addEventListener('click', () => {
    cartTab.classList.remove("active");
  });
});

