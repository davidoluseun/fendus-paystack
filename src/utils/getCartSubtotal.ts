export function getCartSubtotal(cart: CartTypes[]) {
  const subTotal = cart.reduce((acc: number, product: CartTypes) => {
    return acc + product.price * product.qty;
  }, 0);
  return subTotal;
}
