// // Details section start here 
// const mainImg = document.getElementById("main-img");
// const smallImg = document.getElementsByClassName("small-img");

// smallImg[0].onclick = function() {
//   mainImg.src = smallImg[0].src;
// }
// smallImg[1].onclick = function() {
//   mainImg.src = smallImg[1].src;
// }
// smallImg[2].onclick = function() {
//   mainImg.src = smallImg[2].src;
// }
// smallImg[3].onclick = function() {
//   mainImg.src = smallImg[3].src;
// }
// // Details section end here 



// //Popup section start here 
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