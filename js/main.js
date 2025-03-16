document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("nav-icon1");
  const menuOverlay = document.querySelector(".menu-overlay");
  const cartButtons = document.querySelectorAll(".cart");
  const cartTab = document.querySelector(".cart-tab");
  const closeButton = document.querySelector(".close");
  const shoppingList = document.querySelector(".shopping-list");
  const cartBadges = document.querySelectorAll(".number-items");
  const addToCartButtons = document.querySelectorAll(".cart-button");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  //Menu Toggle Function
  function toggleMenu() {
    document.body.classList.toggle("show-menu");
    menuIcon.classList.toggle("open");
  }

  // Close Menu
  function closeMenu() {
    document.body.classList.remove("show-menu");
    menuIcon.classList.remove("open");
  }

  // Attach Event Listeners
  menuIcon?.addEventListener("click", toggleMenu);
  menuOverlay?.addEventListener("click", closeMenu);

  // Cart Overlay Setup
  const overlay = document.createElement("div");
  overlay.className = "cart-overlay";
  document.body.appendChild(overlay);

  function openCart() {
    document.body.classList.add("show-cart");
    updateCart();
  }

  function closeCart() {
    document.body.classList.remove("show-cart");
  }

  cartButtons.forEach((button) => button.addEventListener("click", openCart));
  closeButton?.addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);

  // Save to LocalStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Update Cart Display
  function updateCart() {
    shoppingList.innerHTML = "";
    let totalItems = 0;

    cart.forEach((item) => {
      if (item.quantity > 0) {
        totalItems += item.quantity;
        shoppingList.innerHTML += `
          <div class="item">
            <div><img src="${item.img}" alt="${item.name}" /></div>
            <div class="cart-name"><p>${item.name}</p></div>
            <div class="cart-price"><p>${item.price}</p></div>
            <div class="quantity">
              <span class="minus" data-name="${item.name}">-</span>
              <span class="cart-quantity">${item.quantity}</span>
              <span class="plus" data-name="${item.name}">+</span>
            </div>
          </div>
        `;
      }
    });

    // Update Cart Badge Count
    cartBadges.forEach((badge) => {
      badge.style.display = totalItems > 0 ? "flex" : "none";
      badge.textContent = totalItems;
    });

    saveCart();
  }

  // Add to Cart Function
  function addToCart(event) {
    event.preventDefault();

    let itemName, itemPrice, itemImg;

    // Check if we are on the detail page
    const detailPage = document.getElementById("detail-page");

    if (detailPage) {
      itemName = document.querySelector(".detail-T h2")?.textContent.trim();
      itemPrice = document
        .querySelector(".detail-T p:nth-of-type(2)")
        ?.textContent.trim();
      itemImg = document.querySelector(".detail-img")?.src;
    } else {
      // Default for product listing pages
      const itemBox = event.target.closest(".item-box");
      itemName = itemBox?.querySelector("p:first-of-type")?.textContent.trim();
      itemPrice = itemBox
        ?.querySelector("p:nth-of-type(2)")
        ?.textContent.trim();
      itemImg = itemBox?.querySelector("img")?.src;
    }

    if (!itemName || !itemPrice || !itemImg) return;

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

    updateCart();
  }
  // Modify Cart Quantity
  function modifyQuantity(event) {
    const itemName = event.target.dataset.name;
    const item = cart.find((item) => item.name === itemName);

    if (!item) return;

    if (event.target.classList.contains("minus")) {
      item.quantity -= 1;
      if (item.quantity === 0) {
        cart = cart.filter((i) => i.name !== itemName);
      }
    } else if (event.target.classList.contains("plus")) {
      item.quantity += 1;
    }

    updateCart();
  }

  // Event Delegation for Cart Modification
  shoppingList.addEventListener("click", modifyQuantity);
  addToCartButtons.forEach((button) =>
    button.addEventListener("click", addToCart)
  );

  // Initialize Cart on Page Load
  updateCart();
});
