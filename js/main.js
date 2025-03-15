document.addEventListener("DOMContentLoaded", function () {
  // Select the cart icon, cart tab, close button, cart list, cart buttons, and number-items badge
  const cartIcon = document.querySelector(".cart");
  const cartTab = document.querySelector(".show-cart");
  const closeButton = document.querySelector(".close");
  const cartList = document.querySelector(".shopping-list");
  const cartButtons = document.querySelectorAll(".cart-button");
  const cartBadge = document.querySelector(".number-items"); // Select the badge

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to save cart to local storage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Function to toggle cart visibility
  function toggleCart() {
    document.body.classList.toggle("show-cart");
  }

  // Open cart when cart icon is clicked
  cartIcon.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent any default action
    toggleCart();
  });

  // Close cart when the close button is clicked
  closeButton.addEventListener("click", function () {
    document.body.classList.remove("show-cart");
  });

  // Function to update cart badge count
  function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalItems > 0) {
      cartBadge.textContent = totalItems;
      cartBadge.style.display = "flex"; // Show badge
    } else {
      cartBadge.style.display = "none"; // Hide badge if empty
    }
  }

  // Function to render the cart items
  function renderCart() {
    cartList.innerHTML = ""; // Clear existing items
    cart.forEach((item, index) => {
      if (item.quantity > 0) {
        const cartItem = document.createElement("div");
        cartItem.classList.add("item");
        cartItem.innerHTML = `
                  <div><img src="${item.image}" alt="${item.name}" /></div>
                  <div class="cart-name"><p>${item.name}</p></div>
                  <div class="cart-price"><p>${item.price} SEK</p></div>
                  <div class="quantity">
                      <span class="minus" data-index="${index}">-</span>
                      <span>${item.quantity}</span>
                      <span class="plus" data-index="${index}">+</span>
                  </div>
              `;
        cartList.appendChild(cartItem);
      }
    });
    saveCart();
    updateCartBadge(); // Update badge when rendering cart
    addEventListenersToButtons();
  }

  // Function to add item to cart
  function addToCart(event) {
    const button = event.target;
    const itemBox = button.closest(".item-box");
    const itemName = itemBox.querySelector("p").textContent;
    const itemPrice = itemBox.querySelectorAll("p")[1].textContent;
    const itemImage = itemBox.querySelector("img").src;

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

  // Function to update quantity
  function updateQuantity(event) {
    const index = event.target.getAttribute("data-index");
    if (event.target.classList.contains("plus")) {
      cart[index].quantity++;
    } else if (event.target.classList.contains("minus")) {
      cart[index].quantity--;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // Remove item when quantity reaches 0
      }
    }
    renderCart();
  }

  // Attach event listeners to dynamically created buttons
  function addEventListenersToButtons() {
    document.querySelectorAll(".plus").forEach((button) => {
      button.addEventListener("click", updateQuantity);
    });
    document.querySelectorAll(".minus").forEach((button) => {
      button.addEventListener("click", updateQuantity);
    });
  }

  // Add event listeners to "Add to cart" buttons
  cartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  // Initialize the cart display and update badge
  renderCart();
  updateCartBadge();
});
