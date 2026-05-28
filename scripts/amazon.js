import {cart, addToCart} from '../data/cart.js'; // import the cart array from the cart.js file
import {products} from '../data/products.js'; // import the products array from the products.js file
import {formatCurrency} from './utils/money.js'; // import the formatCurrency function from the money.js file to format price in dollars and cents
let productsHTML = '';

products.forEach((product) => {
  //const productElement = document.createElement('div');
  //productElement.classList.add('product');  

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
          src="images/ratings/rating-${product.rating.stars*10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${formatCurrency(product.priceCents)}
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

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
    `
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
.forEach((button, index) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
      // read quantity from the product's select dropdown
      const quantitySelect = button.closest('.product-container').querySelector('select');
      const quantityToAdd = quantitySelect ? (parseInt(quantitySelect.value, 10) || 1) : 1;

    addToCart(productId, quantityToAdd);

    showAddedToCartMessage(productId);
    console.log(cart);
  }); 
});
document.querySelector('.js-cart-quantity').innerHTML = cart.reduce((total, item) => total + item.quantity, 0);