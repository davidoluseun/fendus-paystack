import http from "./httpService";
import { getHeaders } from "./authService";

const apiEndpoint = "/orders";

const headers = getHeaders();

export function getOrders() {
  return http.get<OrderTypes[]>(apiEndpoint, headers);
}

export function getOrder(id: string | undefined) {
  return http.get<OrderTypes>(`${apiEndpoint}/order/${id}`, headers);
}

export function getOrdersCount() {
  return http.get<OrdersCountTypes>(`${apiEndpoint}/admin/count`, headers);
}

export function getSales() {
  return http.get<SalesTypes>(`${apiEndpoint}/admin/sales`, headers);
}

export function getStats() {
  return http.get<StatsTypes[]>(`${apiEndpoint}/admin/stats`, headers);
}

export function saveOrder(request: SaveOrderTypes) {
  return http.post(apiEndpoint, request, headers);
}

export function cancelOrder(request: CancelTypes, id: string | undefined) {
  return http.put(`${apiEndpoint}/cancel/${id}`, request, headers);
}

export function getAdminOrders(query?: string) {
  if (!query) return http.get<OrderTypes[]>(`${apiEndpoint}/admin`, headers);
  return http.get<OrderTypes[]>(`${apiEndpoint}/admin?${query}`, headers);
}

export function getAdminOrder(id: string | undefined) {
  return http.get<OrderTypes>(`${apiEndpoint}/admin/${id}`, headers);
}

export function saveStatus(request: StatusTypes, id: string | undefined) {
  return http.put(`${apiEndpoint}/status/${id}`, request, headers);
}
