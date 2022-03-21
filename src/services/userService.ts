import http from "./httpService";
import { getHeaders } from "./authService";

const apiEndpoint = "/users";

const headers = getHeaders();

export function signUp(request: SignUpTypes) {
  return http.post(apiEndpoint, request);
}

export function getUser() {
  return http.get<UserTypes>(`${apiEndpoint}/me`, headers);
}

export function saveUser(request: SaveUserTypes) {
  return http.post(`${apiEndpoint}/me`, request, headers);
}

export function saveUserPhoto(request: SaveUserPhotoTypes) {
  return http.post(`${apiEndpoint}/me/photo`, request, headers);
}
