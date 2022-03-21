import http from "./httpService";
import { getHeaders } from "./authService";

const apiEndpoint = "/wishlists";

const headers = getHeaders();

export function getWishlists() {
  return http.get<WishlistTypes[]>(apiEndpoint, headers);
}

export function saveWishlist(request: SaveWishlistTypes) {
  return http.post(apiEndpoint, request, headers);
}

export function saveToCarts(request: saveToCartTypes) {
  return http.post(`${apiEndpoint}/carts`, request, headers);
}

export function deleteWishlist(id: string) {
  return http.delete(`${apiEndpoint}/${id}`, headers);
}
