let cart = document.querySelector(".cart");
let closeCart = document.querySelector(".close");
let body = document.querySelector("body");

cart.addEventListener("click", () => {
  body.classList.toggle("show-cart");
  console.log("Cart toggled: ", body.classList.contains("show-cart"));
});

closeCart.addEventListener("click", () => {
  body.classList.toggle("show-cart");
});

/* this was found and used from
 * https://codepen.io/designcouch/pen/ExvwPY
 */

document.addEventListener("DOMContentLoaded", function () {
  let icons = document.querySelectorAll("#nav-icon1");

  icons.forEach((icon) => {
    icon.addEventListener("click", function () {
      this.classList.toggle("open");
    });
  });
});
