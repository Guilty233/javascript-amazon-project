export const cart =[];

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}
export function addToCart(productId, quantity) {
  const matchingProduct = cart.find((item) => item.id === productId);

  if (matchingProduct) {
    matchingProduct.quantity += quantity;
  }
  else {
    cart.push({
      id: productId,
      quantity: quantity
    });
  }
  updateCartQuantity();
}