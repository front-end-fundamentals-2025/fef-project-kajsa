document.addEventListener("DOMContentLoaded", function () {
  // Select elements
  const cartIcon = document.querySelector(".cart");
  const cartTab = document.querySelector(".cart-tab"); // Fixed selector
  const closeButton = document.querySelector(".close");
  const cartList = document.querySelector(".shopping-list");
  const cartButtons = document.querySelectorAll(".cart-button");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Toggle cart visibility
  function toggleCart() {
    document.body.classList.toggle("show-cart");
  }

  // Open cart when cart icon is clicked
  cartIcon.addEventListener("click", toggleCart);
  closeButton.addEventListener("click", () =>
    document.body.classList.remove("show-cart")
  );

  // Render cart items
  function renderCart() {
    cartList.innerHTML = ""; // Clear existing items

    cart.forEach((item) => {
      if (item.quantity > 0) {
        const cartItem = document.createElement("div");
        cartItem.classList.add("item");
        cartItem.innerHTML = `
            <div><img src="${item.image}" alt="${item.name}" /></div>
            <div class="cart-name"><p>${item.name}</p></div>
            <div class="cart-price"><p>${item.price} SEK</p></div>
            <div class="quantity">
                <button class="minus" data-name="${item.name}">-</button>
                <span>${item.quantity}</span>
                <button class="plus" data-name="${item.name}">+</button>
            </div>
          `;
        cartList.appendChild(cartItem);
      }
    });

    saveCart();
  }

  // Add item to cart
  function addToCart(event) {
    const button = event.target;
    const itemBox = button.closest(".item-box");
    if (!itemBox) return;

    const itemName = itemBox.querySelector(".name")?.textContent.trim();
    const itemPrice = itemBox.querySelector(".price")?.textContent.trim();
    const itemImage = itemBox.querySelector("img")?.src;

    if (!itemName || !itemPrice || !itemImage) return;

    const existingItem = cart.find((item) => item.name === itemName);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        name: itemName,
        price: itemPrice,
        image: itemImage,
        quantity: 1,
      });
    }

    renderCart();
  }

  // Update item quantity using event delegation
  cartList.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("plus") ||
      event.target.classList.contains("minus")
    ) {
      const itemName = event.target.getAttribute("data-name");
      const item = cart.find((item) => item.name === itemName);
      if (!item) return;

      if (event.target.classList.contains("plus")) {
        item.quantity++;
      } else if (event.target.classList.contains("minus")) {
        item.quantity--;
        if (item.quantity <= 0) {
          cart = cart.filter((cartItem) => cartItem.name !== itemName);
        }
      }

      renderCart();
    }
  });

  // Attach event listeners to "Add to Cart" buttons
  cartButtons.forEach((button) => button.addEventListener("click", addToCart));

  // Initialize cart display
  renderCart();
});
