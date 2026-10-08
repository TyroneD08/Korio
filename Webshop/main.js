const productSection = document.querySelector('.products');
const cartCountEl = document.getElementById('cart-count');
const priceFilter = document.getElementById('price-filter');
const cartButton = document.getElementById('cartButton');
const productDialog = document.getElementById('productDialog');
const productDialogImage = document.getElementById('productDialogImage');
const productDialogTitle = document.getElementById('productDialogTitle');
const productDialogPrice = document.getElementById('productDialogPrice');
const productDialogDescription = document.getElementById('productDialogDescription');
const productDialogAvailability = document.getElementById('productDialogAvailability');
const productDialogAdd = document.getElementById('productDialogAdd');
let activeDialogProductIndex = null;
let cartItems = readCart();
let currentSearchTerm = '';
let currentPriceFilter = 'all';
const productRatings = products_array.map(() => Math.floor(Math.random() * 5) + 1);

function updateCartCount() {
  const cartCount = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  cartCountEl.textContent = cartCount;
  const cart = document.querySelector('.cart');
  cart.setAttribute('aria-label', `Shopping cart with ${cartCount} item${cartCount !== 1 ? 's' : ''}`);
}

function onAddToCartClick(event) {
  const productIndex = event.currentTarget.closest('.product').dataset.productIndex;
  addToCart(productIndex);
}

function addToCart(productIndex) {
  if (!products_array[productIndex]?.[3]) return;
  cartItems[productIndex] = (cartItems[productIndex] || 0) + 1;
  saveCart(cartItems);
  updateCartCount();
}

function onRemoveFromCartClick(event) {
  const productIndex = event.currentTarget.closest('.product').dataset.productIndex;
  if (!cartItems[productIndex]) return;

  cartItems[productIndex]--;
  if (cartItems[productIndex] === 0) delete cartItems[productIndex];
  saveCart(cartItems);
  updateCartCount();
}

function openProductDetails(index) {
  const [name, price, image, available, description] = products_array[index];
  activeDialogProductIndex = index;
  productDialogImage.src = image;
  productDialogImage.alt = simplifyProductName(name);
  productDialogTitle.textContent = simplifyProductName(name);
  productDialogPrice.textContent = `€${price.toFixed(2)}`;
  productDialogDescription.textContent = description;
  productDialogAvailability.textContent = available ? 'Available' : 'Sold out';
  productDialogAvailability.classList.toggle('is-unavailable', !available);
  productDialogAdd.disabled = !available;
  productDialogAdd.textContent = available ? 'Add to cart' : 'Sold out';
  productDialog.showModal();
}

function createProductCard(product, index) {
  const [name, price, imgSrc, available] = product;
  const displayName = simplifyProductName(name);
  const article = document.createElement('article');
  article.classList.add('product');
  article.dataset.productIndex = index;
  if (!available) article.classList.add('product--not-available');

  article.innerHTML = `
    <img src="${imgSrc}" alt="${displayName}" class="product__img" width="250" height="300" loading="lazy" />
    <h2 class="product__price">€${price.toFixed(2)}</h2>
    <h3 class="product__title">${displayName}</h3>
    <p class="product__rating" aria-label="Rated ${productRatings[index]} out of 5 stars">${stars(productRatings[index])}</p>
    <button class="product__view-button" type="button">View item</button>
    ${
      available
        ? `<div class="product__actions">
             <button class="product__button" type="button">Add to cart</button>
             <button class="remove__button" type="button" aria-label="Remove one ${displayName} from cart">Remove one</button>
           </div>`
        : `<button class="product__button product__button--disabled" type="button" disabled>Sold out</button>`
    }
  `;

  article.addEventListener('click', event => {
    if (!event.target.closest('button')) openProductDetails(index);
  });
  article.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target === article) {
      event.preventDefault();
      openProductDetails(index);
    }
  });
  article.tabIndex = 0;
  article.setAttribute('aria-label', `${displayName}. Click to view details.`);
  article.querySelector('.product__view-button').addEventListener('click', () => openProductDetails(index));
  article.querySelector('.product__button:not(.product__button--disabled)')?.addEventListener('click', onAddToCartClick);
  article.querySelector('.remove__button')?.addEventListener('click', onRemoveFromCartClick);
  return article;
}

function simplifyProductName(name) {
  return name
    .replace(/ Complete Manga Box Set/i, ' Box Set')
    .replace(/ Complete Box Set/i, ' Box Set')
    .replace(/ Volume /gi, ' Vol. ')
    .replace(/ volume /gi, ' Vol. ');
}

function stars(rating) {
  return `<span class="stars-filled">${'★'.repeat(rating)}</span><span class="stars-empty">${'☆'.repeat(5 - rating)}</span>`;
}
function renderProducts(products) {
  productSection.innerHTML = '';
  products.forEach(({ product, index }) => {
    productSection.appendChild(createProductCard(product, index));
  });
}


if (cartButton) {
  cartButton.addEventListener('click', () => {
    window.location.href = 'cart.html';
  });
}

document.querySelector('.product-dialog__close').addEventListener('click', () => productDialog.close());
productDialog.addEventListener('click', event => {
  if (event.target === productDialog) productDialog.close();
});
productDialogAdd.addEventListener('click', () => {
  if (activeDialogProductIndex === null) return;
  addToCart(activeDialogProductIndex);
  productDialog.close();
});

function applyFilters() {
  const filtered = products_array.map((product, index) => ({ product, index })).filter(({ product: [name, price] }) => {
    const matchesSearch = name.toLowerCase().includes(currentSearchTerm.toLowerCase());

    let matchesPrice = true;
    if (currentPriceFilter === '100+') {
      matchesPrice = price >= 100;
    } else if (currentPriceFilter !== 'all') {
      const limit = parseFloat(currentPriceFilter);
      matchesPrice = price <= limit;
    }

    return matchesSearch && matchesPrice;
  });

  renderProducts(filtered);
}

function handleSearch(event) {
  event.preventDefault();
  currentSearchTerm = event.target.q.value.trim();
  applyFilters();
}

function handlePriceFilter() {
  currentPriceFilter = priceFilter.value;
  applyFilters();
}

document.querySelector('form').addEventListener('submit', handleSearch);
priceFilter.addEventListener('change', handlePriceFilter);

updateCartCount();
applyFilters();
