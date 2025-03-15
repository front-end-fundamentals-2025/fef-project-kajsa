document.addEventListener("DOMContentLoaded", function () {
  let cartButtons = document.querySelectorAll(".cart"); // Selects both desktop & mobile cart buttons
  let closeCart = document.querySelector(".close");
  let body = document.querySelector("body");

  if (cartButtons.length > 0 && closeCart) {
    cartButtons.forEach((cart) => {
      cart.addEventListener("click", (event) => {
        event.preventDefault();
        body.classList.toggle("show-cart");
        console.log("Cart toggled:", body.classList.contains("show-cart"));
      });
    });

    closeCart.addEventListener("click", () => {
      body.classList.remove("show-cart");
    });
  } else {
    console.error("Cart buttons or close button not found in the DOM");
  }
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
