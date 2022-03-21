import http from "./httpService";
import { getHeaders } from "./authService";

const apiEndpoint = "/carts";

const headers = getHeaders();

export function getCarts() {
  return http.get<CartTypes[]>(apiEndpoint, headers);
}

export function saveCart(request: SaveCartTypes) {
  return http.post(apiEndpoint, request, headers);
}

export function deleteCart(id: string | undefined) {
  return http.delete(`${apiEndpoint}/${id}`, headers);
}

export function deleteCarts() {
  return http.delete(apiEndpoint, headers);
}
