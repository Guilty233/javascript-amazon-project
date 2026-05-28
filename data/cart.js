export let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :
[{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
  },{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 10
  }
];

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
export function addToCart(productId, quantity) {
  const matchingProduct = cart.find((item) => item.productId === productId);

  if (matchingProduct) {
    matchingProduct.quantity += quantity;
  }
  else {
    cart.push({
      productId: productId,
      quantity: quantity
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