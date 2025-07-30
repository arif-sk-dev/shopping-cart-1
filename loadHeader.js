// loadHeader.js
document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("header-placeholder").innerHTML = html;
    })
    .then(() => {
      const script = document.createElement("script");
      script.src = "cart.js";
      document.body.appendChild(script);
    });
});
