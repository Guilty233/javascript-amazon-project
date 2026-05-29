export let cart;

export function loadFromLocalStorage() {
  cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :
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
}
loadFromLocalStorage(); // this function loads the cart from local storage when the module is first imported, ensuring that the cart is initialized with any previously saved items in local storage
function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart)); // this function saves the current state of the cart to local storage by converting the cart array into a JSON string and storing it under the key 'cart'
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  const cartQuantityElement = document.querySelector('.cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }
}
export function addToCart(productId, quantity = 1) {
  const matchingProduct = cart.find((item) => item.productId === productId);

  if (matchingProduct) {
    matchingProduct.quantity += quantity;
  }
  else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliverOptions: '1'
    });
  }
  saveToLocalStorage();
  updateCartQuantity();
}
export function removeFromCart(productId) {
  
  const newCart = [];
  cart.forEach((item, index) => {
    if (item.productId !== productId) {
      newCart.push(item);
    }
  });
  cart = newCart;
  updateCartQuantity();
  saveToLocalStorage();
}

export function updateCartItemQuantity(productId, quantity) {
  const matchingProduct = cart.find((item) => item.productId === productId);

  if (!matchingProduct) {
    return;
  }

  matchingProduct.quantity = quantity;
  saveToLocalStorage();
  updateCartQuantity();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const matchingProduct = cart.find((item) => item.productId === productId);
  if (matchingProduct) {
    matchingProduct.deliverOptions = deliveryOptionId;
    saveToLocalStorage();
  }
}

export function loadCart(fun){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun(); // call the function passed as an argument to loadProducts after the products have been loaded and processed
  });
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}