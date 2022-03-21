import { isAfter, parseISO, subMonths } from "date-fns";

export function getDashboardChartData(orders: OrderTypes[]) {
  const chartData: ChartDataTypes[] = [];

  for (let i = 0; i <= 11; i++) {
    chartData.push({
      time: subMonths(new Date(), 11 - i).toISOString(),
      sales: 0,
      orders: 0,
    });
  }

  const elevenMonthAgo = subMonths(new Date(), 11);

  const chartOrders = orders.filter((order) =>
    isAfter(parseISO(order.datePurchased), elevenMonthAgo)
  );

  chartOrders.forEach((chartOrder) => {
    const monthPurchased = parseISO(chartOrder.datePurchased).getMonth();

    const chartObj = chartData.find(
      (data) => parseISO(data.time).getMonth() === monthPurchased
    );

    if (chartObj) {
      chartObj.sales += chartOrder.total;
      chartObj.orders++;
    }
  });

  return chartData;
}
