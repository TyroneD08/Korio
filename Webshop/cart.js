let cartItems = readCart();
const cartContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartItemCount = document.getElementById("cart-item-count");

function createCartItem(product, index, quantity) {
  const [title, price, image] = product;

  const item = document.createElement("div");
  item.className = "cart-item";
  item.dataset.productIndex = index;

  item.innerHTML = `
    <div class="cart-left">
      <img class="cart-img" src="${image}" alt="${title}">
      <div class="cart-details">
        <div class="cart-title">${title}</div>
        <div class="cart-subtitle">Paperback · English</div>
        <div class="cart-unit-price">€${price.toFixed(2)} each</div>
      </div>
    </div>
    <div class="cart-right">
      <label class="quantity-label" for="quantity-${index}">Qty</label>
      <input class="cart-quantity" id="quantity-${index}" type="number" min="1" step="1" value="${quantity}">
      <button class="remove-btn" type="button" aria-label="Remove ${title} from cart">Remove</button>
      <div class="cart-price">€${(price * quantity).toFixed(2)}</div>
    </div>
  `;

  return item;
}

function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;
  let itemCount = 0;

  Object.entries(cartItems).forEach(([index, quantity]) => {
    const product = products_array[Number(index)];
    if (!product || !Number.isInteger(quantity) || quantity < 1) {
      delete cartItems[index];
      return;
    }

    const item = createCartItem(product, index, quantity);
    cartContainer.appendChild(item);
    total += product[1] * quantity;
    itemCount += quantity;
  });

  saveCart(cartItems);
  cartTotal.textContent = `€${total.toFixed(2)}`;
  cartItemCount.textContent = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;

  if (itemCount === 0) {
    cartContainer.innerHTML = '<p class="cart-empty">Your cart is empty. Add something you love from the shop.</p>';
  }

  cartContainer.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", event => {
      const index = event.currentTarget.closest(".cart-item").dataset.productIndex;
      delete cartItems[index];
      saveCart(cartItems);
      renderCart();
    });
  });

  cartContainer.querySelectorAll(".cart-quantity").forEach(input => {
    input.addEventListener("change", event => {
      if (!event.currentTarget.validity.valid || Number(event.currentTarget.value) < 1) {
        event.currentTarget.value = cartItems[event.currentTarget.closest(".cart-item").dataset.productIndex];
        return;
      }

      const index = event.currentTarget.closest(".cart-item").dataset.productIndex;
      cartItems[index] = Number(event.currentTarget.value);
      saveCart(cartItems);
      renderCart();
    });
  });
}

renderCart();
