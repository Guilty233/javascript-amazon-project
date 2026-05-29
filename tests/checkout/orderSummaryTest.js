import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromLocalStorage, cart} from '../../data/cart.js'; // import the addToCart function and cart array from the cart.js file to test adding products to the cart and updating the cart array
describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  beforeEach(() => { // set up the test environment before each test by spying on localStorage methods, rendering the order summary, and loading the cart from local storage to ensure that each test starts with a consistent state
    spyOn(localStorage, 'setItem'); // spy on the localStorage.setItem method to check if it is called when a product is removed from the cart
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div> 
      <div class="js-payment-summary"></div>
    `;  
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliverOptions: '1'
        },{
        productId: productId2,
        quantity: 1,
        deliverOptions: '2'
        }
      ]);
    });
    loadFromLocalStorage();
    renderOrderSummary();
  });
  it('displays the cart', () => { 
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toBe(2);
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
  });
  it('removes a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click(); // simulate a click on the delete link for the first product to test if it is removed from the order summary
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toBeNull(); // the second product should still be displayed in the order summary
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toBe(1); // there should only be one product container displayed in the order summary after the first product is removed
    expect(cart.length).toBe(1); // the cart array should have one product after the first product is removed
    expect(cart[0].productId).toBe(productId2); // the remaining product in the cart should be the second product after the first product is removed

  });
});