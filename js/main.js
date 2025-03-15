/* this was found and used from
 * https://codepen.io/designcouch/pen/ExvwPY
 */

document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("nav-icon1");
  const menuTab = document.querySelector(".phone-menu");
  const menuOverlay = document.querySelector(".menu-overlay");

  // ✅ Function to open/close menu
  function toggleMenu() {
    document.body.classList.toggle("show-menu");
    menuIcon.classList.toggle("open"); // Animate hamburger icon
  }

  // ✅ Toggle menu on icon click
  menuIcon.addEventListener("click", toggleMenu);

  // ✅ Close menu when clicking overlay
  menuOverlay.addEventListener("click", function () {
    document.body.classList.remove("show-menu");
    menuIcon.classList.remove("open");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let icons = document.querySelectorAll("#nav-icon1");

  icons.forEach((icon) => {
    icon.addEventListener("click", function () {
      this.classList.toggle("open");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cartButtons = document.querySelectorAll(".cart"); // Select all cart buttons
  const cartTab = document.querySelector(".cart-tab"); // Cart tab container
  const closeButton = document.querySelector(".close"); // Close button
  const overlay = document.createElement("div"); // Create an overlay
  const shoppingList = document.querySelector(".shopping-list"); // Shopping cart list
  const cartBadges = document.querySelectorAll(".number-items"); // Select both cart badges
  const addToCartButtons = document.querySelectorAll(".cart-button"); // "Add to Cart" buttons

  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load from LocalStorage or initialize empty

  overlay.className = "cart-overlay";
  document.body.appendChild(overlay); // Append overlay to body

  // Function to save cart to LocalStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Function to open the cart tab
  function openCart() {
    document.body.classList.add("show-cart");
    updateCart();
  }

  // Function to close the cart tab
  function closeCart() {
    document.body.classList.remove("show-cart");
  }

  // Add click event listeners to all cart buttons
  cartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openCart();
    });
  });

  // Close button event
  if (closeButton) {
    closeButton.addEventListener("click", closeCart);
  }

  // Close cart when clicking on the overlay
  overlay.addEventListener("click", closeCart);

  // Function to add an item to the cart
  function addToCart(event) {
    event.preventDefault();
    const itemBox = event.target.closest(".item-box"); // Find the closest product item
    const itemName = itemBox
      .querySelector("p:first-of-type")
      .textContent.trim();
    const itemPrice = itemBox
      .querySelector("p:nth-of-type(2)")
      .textContent.trim();
    const itemImg = itemBox.querySelector("img").src;

    const existingItem = cart.find((item) => item.name === itemName);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        name: itemName,
        price: itemPrice,
        img: itemImg,
        quantity: 1,
      });
    }

    saveCart(); // Save to LocalStorage
    updateCart();
  }

  // Function to update the cart display
  function updateCart() {
    shoppingList.innerHTML = ""; // Clear the cart before updating

    if (cart.length === 0) {
      cartBadges.forEach((badge) => {
        badge.style.display = "none"; // Hide badge if empty
        badge.textContent = "0"; // Reset to 0
      });
      saveCart();
      return;
    }

    cart.forEach((item) => {
      if (item.quantity === 0) return; // Skip rendering items with 0 quantity

      const cartItem = document.createElement("div");
      cartItem.classList.add("item");
      cartItem.innerHTML = `
        <div>
            <img src="${item.img}" alt="${item.name}" />
        </div>
        <div class="cart-name">
            <p>${item.name}</p>
        </div>
        <div class="cart-price">
            <p>${item.price}</p>
        </div>
        <div class="quantity">
            <span class="minus" data-name="${item.name}">-</span>
            <span class="cart-quantity">${item.quantity}</span>
            <span class="plus" data-name="${item.name}">+</span>
        </div>
      `;

      shoppingList.appendChild(cartItem);
    });

    // ✅ Update Cart Badge Count (both desktop & mobile)
    let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartBadges.forEach((badge) => {
      badge.style.display = totalItems > 0 ? "flex" : "none";
      badge.textContent = totalItems; // ✅ Display correct number
    });

    saveCart(); // Save to LocalStorage after update
  }

  // **Event Delegation for `+` and `-` buttons**
  shoppingList.addEventListener("click", function (event) {
    if (event.target.classList.contains("minus")) {
      decreaseQuantity(event);
    } else if (event.target.classList.contains("plus")) {
      increaseQuantity(event);
    }
  });

  // Function to decrease quantity
  function decreaseQuantity(event) {
    const itemName = event.target.getAttribute("data-name");
    const itemIndex = cart.findIndex((item) => item.name === itemName);

    if (itemIndex !== -1) {
      cart[itemIndex].quantity -= 1;
      if (cart[itemIndex].quantity === 0) {
        cart.splice(itemIndex, 1); // Remove item if quantity reaches 0
      }
      saveCart(); // Save to LocalStorage
      updateCart();
    }
  }

  // Function to increase quantity
  function increaseQuantity(event) {
    const itemName = event.target.getAttribute("data-name");
    const item = cart.find((item) => item.name === itemName);

    if (item) {
      item.quantity += 1;
      saveCart(); // Save to LocalStorage
      updateCart();
    }
  }

  // Attach event listeners to "Add to Cart" buttons
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  // ✅ Load Cart on Page Load
  updateCart();
});
