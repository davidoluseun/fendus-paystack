import http from "./httpService";
import { getHeaders } from "./authService";

const apiEndpoint = "/delivery-details";

const headers = getHeaders();

export function getInfo() {
  return http.get<DeliveryTypes>(apiEndpoint, headers);
}

export function saveInfo(request: DeliveryTypes, id?: string) {
  if (id) return http.put(`${apiEndpoint}/${id}`, request, headers);

  return http.post(apiEndpoint, request, headers);
}
