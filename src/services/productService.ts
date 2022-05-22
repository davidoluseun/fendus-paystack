import http from "./httpService";
import { getHeaders } from "./authService";

const apiEndpoint = "/products";

const headers = getHeaders();

export function getProducts(query?: string) {
  if (!query) return http.get<ProductTypes[]>(apiEndpoint);
  else return http.get<ProductTypes[]>(`${apiEndpoint}?${query}`);
}

export function getProduct(id: string | undefined) {
  return http.get<ProductTypes>(`${apiEndpoint}/${id}`);
}

export function saveProduct(request: SaveProductTypes, productId?: string) {
  if (productId)
    return http.put(`${apiEndpoint}/${productId}`, request, headers);

  return http.post(apiEndpoint, request, headers);
}

export function deleteProduct(id: string) {
  return http.delete(`${apiEndpoint}/${id}`, headers);
}

export function demo(request: SaveProductTypes) {
  return http.post(`${apiEndpoint}/demo`, request, headers);
}
