function Cart(localStorageKey){
  const cart = {
  cartItems: undefined,

  loadFromLocalStorage: function() {
      this.cartItems = localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey)) :
      [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliverOptions: '1'
        },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliverOptions: '2'
        }
      ];
    },
    saveToLocalStorage: function() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    updateCartQuantity: function() {
      let cartQuantity = 0;

      this.cartItems.forEach((item) => {
        cartQuantity += item.quantity;
      });

      const cartQuantityElement = document.querySelector('.cart-quantity');
      if (cartQuantityElement) {
        cartQuantityElement.innerHTML = cartQuantity;
      }
    },
    addToCart: function(productId, quantity = 1) {
      const matchingProduct = this.cartItems.find((item) => item.productId === productId);

      if (matchingProduct) {
        matchingProduct.quantity += quantity;
      }
      else {
        this.cartItems.push({
          productId: productId,
          quantity: quantity,
          deliverOptions: '1'
        });
      }
      this.saveToLocalStorage();
      this.updateCartQuantity();
    },
    removeFromCart: function(productId) {
      const newCart = [];
      this.cartItems.forEach((item) => {
        if (item.productId !== productId) {
          newCart.push(item);
        }
      });
      this.cartItems = newCart;
      this.updateCartQuantity();
      this.saveToLocalStorage();
    },
    updateCartItemQuantity: function(productId, quantity) {
      const matchingProduct = this.cartItems.find((item) => item.productId === productId);

      if (!matchingProduct) {
        return;
      }

      matchingProduct.quantity = quantity;
      this.saveToLocalStorage();
      this.updateCartQuantity();
    },
    updateDeliveryOption: function(productId, deliveryOptionId) {
      const matchingProduct = this.cartItems.find((item) => item.productId === productId);
      if (matchingProduct) {
        matchingProduct.deliverOptions = deliveryOptionId;
        this.saveToLocalStorage();
      }
    }
  };
  return cart;
}
