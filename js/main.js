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

// let cart;

// document.getElementById("cart-button").addEventListener("click", function () {
//   // Get the product data from the button attributes
//   const productImg = this.getAttribute("data-product-img");
//   const productId = this.getAttribute("data-product-id");
//   const productName = this.getAttribute("data-product-name");
//   const productPrice = this.getAttribute("data-product-price");

//   // Create a product object to add to the cart
//   const product = {
//     Img: productImg,
//     id: productId,
//     name: productName,
//     price: productPrice,
//   };

//   // Add the product to the cart (add one item)
//   cartTab.push(product);

//   // Update the cart display
//   updateCartDisplay();
// });

// Array to store cart items
let cart = [];

// Function to update the cart display
function updateCartDisplay() {
  const cartItemsContainer = document.querySelector(".shopping-list");
  const totalPriceElement = document.querySelector(".cart-tab .total-price");
  cartItemsContainer.innerHTML = ""; // Clear the current cart display

  let totalPrice = 0;

  // Loop through the cart items and display them
  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("item");

    cartItemElement.innerHTML = `
      <div>
        <img src="${item.img}" alt="${item.name}" />
      </div>
      <div class="cart-name">
        <p>${item.name}</p>
      </div>
      <div class="cart-price">
        <p>${item.price}sek</p>
      </div>
      <div class="quantity">
        <span class="minus">-</span>
        <span>${item.quantity}</span>
        <span class="plus">+</span>
      </div>
    `;

    cartItemsContainer.appendChild(cartItemElement);
    totalPrice += parseFloat(item.price) * item.quantity;
  });

  // Update the total price in the cart
  totalPriceElement.textContent = `${totalPrice.toFixed(2)} sek`;
}

// Add an event listener to the "Add to Cart" buttons
document.querySelectorAll(".cart-button").forEach((button) => {
  button.addEventListener("click", function () {
    const productImg = this.getAttribute("data-product-img");
    const productId = this.getAttribute("data-product-id");
    const productName = this.getAttribute("data-product-name");
    const productPrice = this.getAttribute("data-product-price");

    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
      // If the product already exists, increase the quantity
      existingProduct.quantity += 1;
    } else {
      // Otherwise, add a new product to the cart
      cart.push({
        id: productId,
        name: productName,
        img: productImg,
        price: productPrice,
        quantity: 1,
      });
    }

    // Update the cart display
    updateCartDisplay();
  });
});

// Optional: Event listeners for the cart buttons (e.g., plus/minus)
document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("plus") ||
    e.target.classList.contains("minus")
  ) {
    const cartItemElement = e.target.closest(".item");
    const productId = cartItemElement.querySelector(".cart-name p").textContent;
    const action = e.target.classList.contains("plus") ? "plus" : "minus";

    const product = cart.find((item) => item.name === productId);

    if (action === "plus") {
      product.quantity += 1;
    } else if (action === "minus" && product.quantity > 1) {
      product.quantity -= 1;
    }

    // Update the cart display
    updateCartDisplay();
  }
});
