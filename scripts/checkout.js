import {cart, removeFromCart, updateCartItemQuantity} from '../data/cart.js'; // import cart helpers from cart.js
import {products} from '../data/products.js'; // import the products array from the products.js file
import {formatCurrency} from './utils/money.js'; // import the formatCurrency function from the money.js file to format price in dollars and cents
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; // import the Day.js library to work with dates
import {deliveryOptions} from '../data/deliveryOptions.js'; // import the deliveryOptions array from the deliveryOptions.js file to display delivery options for each product in the cart
let cartSummaryHTML = '';


function updateCheckoutItemsQuantity() {
  const checkoutItemsQuantity = document.querySelector('.js-items-quantity');

  if (checkoutItemsQuantity) {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    checkoutItemsQuantity.innerHTML = `${totalQuantity} items`;
  }
}

function setEditingQuantity(productId, isEditing) {
  const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);

  if (!cartItemContainer) {
    return;
  }

  cartItemContainer.classList.toggle('is-editing-quantity', isEditing);
}

cart.forEach((item) => {
  const productId = item.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  const deliveryOptionId = item.deliverOptions;
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  }); // find the delivery option that matches the one selected for this cart item, so that we can display the correct delivery date and price for the selected delivery option
  cartSummaryHTML +=
  `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dayjs().add(deliveryOption.days, 'day').format('dddd, MMMM D')}
    </div>
    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          ${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${item.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-cart-quantity" data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input update-input" type="number" min="1" value="${item.quantity}" data-product-id="${matchingProduct.id}">
          <span class="save-quantity-link link-primary js-save-cart-quantity" data-product-id="${matchingProduct.id}">
            Save
          </span>
          <span class="delete-quantity-link link-primary js-delete-from-cart" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-options-list">
        ${deliveryOptionHTML(matchingProduct.id, item)}
        </div>
      </div>
  </div>
  </div>`; // each option has a unique name attribute on the input so that they work as separate groups of radio buttons, allowing the user to select a delivery option for each product in their cart
});
function deliveryOptionHTML(productId, item) {
  let deliveryOptionsHTML = '';
  deliveryOptions.forEach((option) => {
    const today = dayjs();
    const deliveryDate = today.add(option.days, 'day').format('dddd, MMMM D');
    const price = option.priceCents === 0 ? 'Free Shipping' : `$${formatCurrency(option.priceCents)} - Shipping`;
    const isChecked = item.deliverOptions === option.id;
    deliveryOptionsHTML += `
    <div class="delivery-option">
      <input type="radio" ${isChecked ? 'checked' : ''} 
        class="delivery-option-input"
        name="delivery-option-${productId}"> 
      <div>
        <div class="delivery-option-date">
          ${deliveryDate}
        </div>
        <div class="delivery-option-price">
          ${price}
        </div>
      </div>
    </div>`;
  });
  return deliveryOptionsHTML;
}
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-from-cart').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    cartItemContainer.remove();
    updateCheckoutItemsQuantity();
  });
});
document.querySelectorAll('.js-update-cart-quantity').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const quantityInput = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);

    if (quantityInput) {
      setEditingQuantity(productId, true);
      quantityInput.focus();
      quantityInput.select();
    }
  });
});

function applyUpdatedQuantity(productId) {
  const quantityInput = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);
  if (!quantityInput) {
    return;
  }

  const parsedQuantity = Number(quantityInput.value);
  const newQuantity = Number.isInteger(parsedQuantity) && parsedQuantity > 0 ? parsedQuantity : 1;
  quantityInput.value = newQuantity;

  updateCartItemQuantity(productId, newQuantity);

  setEditingQuantity(productId, false);

  const quantityLabel = document.querySelector(`.js-cart-item-container-${productId} .quantity-label`);
  if (quantityLabel) {
    quantityLabel.innerHTML = newQuantity;
  }

  updateCheckoutItemsQuantity();
}

document.querySelectorAll('.js-save-cart-quantity').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    applyUpdatedQuantity(productId);
  });
});

document.querySelectorAll('.quantity-input').forEach((input) => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      applyUpdatedQuantity(input.dataset.productId);
    }
  });
});

updateCheckoutItemsQuantity();