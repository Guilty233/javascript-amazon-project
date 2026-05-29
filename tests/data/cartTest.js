import {addToCart, cart, loadFromLocalStorage} from '../../data/cart.js'; // import the addToCart function and cart array from the cart.js file to test adding products to the cart and updating the cart array

describe('test suite: addToCart', () => {
  beforeEach(() => {
    cart.length = 0; // clear the cart array before each test to ensure that tests are independent and do not affect each other
  }); 
  it('should add a product to the cart with the correct productId and quantity', () => {
    addToCart('1', 2);
    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe('1');
    expect(cart[0].quantity).toBe(2);
  });
  it('should update the quantity of an existing product in the cart if the same product is added again', () => {
    addToCart('1', 2);
    addToCart('1', 3);
    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe('1');
    expect(cart[0].quantity).toBe(5); // the quantity should be updated to 5 (2 + 3)
  });
  it('should add multiple different products to the cart', () => {
    addToCart('1', 2);
    addToCart('2', 3);
    expect(cart.length).toBe(2);
    expect(cart[0].productId).toBe('1');
    expect(cart[0].quantity).toBe(2);
    expect(cart[1].productId).toBe('2');
    expect(cart[1].quantity).toBe(3);
  });
  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem'); // spy on the localStorage.setItem method to check if it is called when a product is added to the cart    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
          quantity: 1, 
          deliveryOptions: '1'
        }]);
    }); // spy on the localStorage.getItem method to return an existing product when loadFromLocalStorage is called, ensuring that the cart starts with one product for this test

    loadFromLocalStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1); // the cart should still have only one product since the same product is added again, but the quantity should be updated
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // expect localStorage.setItem to have been called once to save the updated cart to local storage after adding a product
    expect(cart[0].productId).toBe('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2); // the quantity should be set to 2 when the existing product is added again
  });
});