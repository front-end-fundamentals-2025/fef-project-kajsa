document.addEventListener("DOMContentLoaded", function () {
  let cartButtons = document.querySelectorAll(".cart"); // Selects both desktop & mobile cart buttons
  let closeCart = document.querySelector(".close");
  let body = document.querySelector("body");
  let cartTab = document.querySelector(".cart-tab");

  if (cartButtons.length > 0 && closeCart && cartTab) {
    // Toggle cart on cart button click
    cartButtons.forEach((cart) => {
      cart.addEventListener("click", (event) => {
        event.preventDefault();
        body.classList.toggle("show-cart");
        console.log("Cart toggled:", body.classList.contains("show-cart"));
      });
    });

    // Close cart on close button click
    closeCart.addEventListener("click", () => {
      body.classList.remove("show-cart");
    });

    // Close cart when clicking outside the cart-tab
    document.addEventListener("click", (event) => {
      if (!cartTab.contains(event.target) && !event.target.closest(".cart")) {
        body.classList.remove("show-cart");
      }
    });
  } else {
    console.error(
      "Cart buttons, cart-tab, or close button not found in the DOM"
    );
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
