class Cart {
  cartItems;
  localStorageKey;
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    this.cartItems = localStorage.getItem(this.localStorageKey) ? JSON.parse(localStorage.getItem(this.localStorageKey)) :
    [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliverOptions: '1'
      }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliverOptions: '2'
      }
    ];
  }

  saveToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  updateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((item) => {
      cartQuantity += item.quantity;
    });

    const cartQuantityElement = document.querySelector('.cart-quantity');
    if (cartQuantityElement) {
      cartQuantityElement.innerHTML = cartQuantity;
    }
  }

  addToCart(productId, quantity = 1) {
    if (!productId) {
      return;
    }

    if (!Array.isArray(this.cartItems)) {
      this.loadFromLocalStorage();
    }

    const parsedQuantity = Number(quantity);
    const quantityToAdd = Number.isInteger(parsedQuantity) && parsedQuantity > 0 ? parsedQuantity : 1;
    const matchingProduct = this.cartItems.find((item) => item.productId === productId);

    if (matchingProduct) {
      matchingProduct.quantity += quantityToAdd;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: quantityToAdd,
        deliverOptions: '1'
      });
    }

    this.saveToLocalStorage();
    this.updateCartQuantity();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((item) => {
      if (item.productId !== productId) {
        newCart.push(item);
      }
    });
    this.cartItems = newCart;
    this.updateCartQuantity();
    this.saveToLocalStorage();
  }

  updateCartItemQuantity(productId, quantity) {
    const matchingProduct = this.cartItems.find((item) => item.productId === productId);

    if (!matchingProduct) {
      return;
    }

    matchingProduct.quantity = quantity;
    this.saveToLocalStorage();
    this.updateCartQuantity();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const matchingProduct = this.cartItems.find((item) => item.productId === productId);
    if (matchingProduct) {
      matchingProduct.deliverOptions = deliveryOptionId;
      this.saveToLocalStorage();
    }
  }
}

export const cart = new Cart('cart-oop');
export const businessCart = new Cart('business-cart-oop');

cart.loadFromLocalStorage();
businessCart.loadFromLocalStorage();

export {Cart};