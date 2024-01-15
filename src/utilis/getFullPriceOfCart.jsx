export function getFullPriceOfCart(products) {
  let totalPrice = 0;
  products.forEach((product) => {
    totalPrice += parseInt(product.price);
  });
  return totalPrice;
}
