const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
const body = document.querySelector("body");

cartIcon.addEventListener("click", () => {
  scrollPosition = window.scrollY;

  cart.classList.add("active");
  body.style.position = "fixed";
  body.style.top = `-${scrollPosition}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.overflow = "hidden";
});
cartClose.addEventListener("click", () => {
  cart.classList.remove("active");
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.overflow = "";

  window.scrollTo(0, scrollPosition);
});

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const productItem = event.target.closest(".product-items");
    addTocart(productItem);
  });
});

const cartContent = document.querySelector(".cart-content");
const addTocart = (productItem) => {
  const productImgSrc = productItem.querySelector("img").src;
  const productTitle = productItem.querySelector(".product-title").textContent;
  const productPrice = productItem.querySelector(".price-tag").textContent;

  const cartItems = cartContent.querySelectorAll(".cart-product-title");
  for (let item of cartItems) {
    if (item.textContent === productTitle) {
      alert("This item is already in the cart.");
      return;
    }
  }

  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  cartBox.innerHTML = `<img src="${productImgSrc}"/>
          <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
              <button id="decrement">-</button>
              <span class="number">1</span>
              <button id="increment">+</button>
            </div>
          </div>
          <i class="ri-delete-bin-line cart-remove"></i>`;

  cartContent.appendChild(cartBox);

  cartBox.querySelector(".cart-remove").addEventListener("click", () => {
    cartBox.remove();

    updateCartCount(-1);

    updateTotalPrice();
  });

  cartBox.querySelector(".cart-quantity").addEventListener("click", (event) => {
    const numberElement = cartBox.querySelector(".number");
    const decrementButton = cartBox.querySelector("#decrement");
    let quantity = numberElement.textContent;

    if (event.target.id === "decrement" && quantity > 1) {
      quantity--;
      if (quantity === 1) {
        decrementButton.style.color = "#999";
      }
    } else if (event.target.id === "increment") {
      quantity++;
      decrementButton.style.color = "#333";
    }

    numberElement.textContent = quantity;

    updateTotalPrice();
  });

  updateCartCount(1);

  updateTotalPrice();
};

const updateTotalPrice = () => {
  const totalPriceElemeent = document.querySelector(".total-price");
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    const priceElement = cartBox.querySelector(".cart-price");
    const quantityElement = cartBox.querySelector(".number");
    const price = priceElement.textContent.replace("$", "");
    const quantity = quantityElement.textContent;
    total += price * quantity;
  });

  totalPriceElemeent.textContent = `$${total}`;
};

let cartItemCount = 0;
const updateCartCount = (change) => {
  const cartItemCountBadge = document.querySelector(".cart-item-count");
  cartItemCount += change;
  if (cartItemCount > 0) {
    cartItemCountBadge.style.visibility = "visible";
    cartItemCountBadge.textContent = cartItemCount;
  } else {
    cartItemCountBadge.style.visibility = "hidden";
    cartItemCountBadge.textContent = "";
  }
};

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  if (cartBoxes.length === 0) {
    alert("Your cart is empty. Please add items to your cart befoe buying.");
    return;
  }

  cartBoxes.forEach((cartBox) => cartBox.remove());

  cartItemCount = 0;
  updateCartCount(0);

  updateTotalPrice();

  alert("Thank you for your purchase");
});
