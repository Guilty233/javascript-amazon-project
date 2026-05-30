import {cart} from '../../data/cart.js'; // import the shared cart state so delivery option changes update the same source used by the order summary
import {getProduct} from '../../data/products.js'; // import the products array from the products.js file
import {getDeliveryOption} from '../../data/deliveryOptions.js'; // import the deliveryOptions array from the deliveryOptions.js file to display delivery options for each product in the cart
import {formatCurrency} from '../utils/money.js'; // import the formatCurrency function from the money.js file to format price in dollars and cents
import {addOrder} from '../../data/order.js'; // import the addOrder function to add the order to the orders array and save it to localStorage
export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  const cartItems = Array.isArray(cart) ? cart : cart.cartItems;

  cartItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliverOptions);
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  //console.log(totalCents);
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartItems.reduce((total, item) => total + item.quantity, 0)}):</div>
      <div class="payment-summary-money">${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  document.querySelector('.js-place-order').addEventListener('click', async() => {
    try{
      const response = await fetch('https://supersimplebackend.dev/orders',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart: cart
      })
      });
    const order = await response.json();
    addOrder(order);
    }catch(error){
      console.error('Error placing order:', error);
    }
    window.location.href = 'orders.html';
  });
}