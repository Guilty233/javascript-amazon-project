export const cart =[{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
  },{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 10
  }
];

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}
export function addToCart(productId, quantity) {
  const matchingProduct = cart.find((item) => item.productId === productId);

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