export function getTotalSales(orders: OrderTypes[]) {
  const total = orders.reduce((acc: number, order: OrderTypes) => {
    return acc + order.total;
  }, 0);

  return total;
}
