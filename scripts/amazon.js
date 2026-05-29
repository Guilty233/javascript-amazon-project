import {cart} from '../data/cart-class.js'; // import cart object from cart-class.js
import {products, loadProducts} from '../data/products.js'; // import the products array and loader from the products.js file
import {formatCurrency} from './utils/money.js'; // import the formatCurrency function from the money.js file to format price in dollars and cents
loadProducts(renderProducts); // load the products and then call the renderProducts function to display them on the page

function renderProducts() {
  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-product-quantity-selector" data-product-id="${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      ${product.extraInfoHTML ? product.extraInfoHTML() : ''}
      <div class="product-spacer"></div>

      <div class="added-to-cart" data-product-id="${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  function showAddedToCartMessage(productId) {
    const addedToCartMessage = document.querySelector(`.added-to-cart[data-product-id="${productId}"]`);
    addedToCartMessage.classList.add('added-visible');
    setTimeout(() => {
      addedToCartMessage.classList.remove('added-visible');
    }, 2000);
  }

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const quantitySelect = button.closest('.product-container').querySelector('select');
        const quantityToAdd = quantitySelect ? (parseInt(quantitySelect.value, 10) || 1) : 1;

        cart.addToCart(productId, quantityToAdd);

        showAddedToCartMessage(productId);
      });
    });

  document.querySelector('.js-cart-quantity').innerHTML = cart.cartItems.reduce((total, item) => total + item.quantity, 0);
}

loadProducts().then(() => {
  renderProducts();
});