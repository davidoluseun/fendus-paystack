import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";

export function getToken() {
  return localStorage.getItem("token");
}

export function getHeaders() {
  const jwt = localStorage.getItem("token");

  if (!jwt) return;

  return { headers: { "x-auth-token": jwt } };
}

export async function signIn(request: SignInTypes) {
  const { data: jwt } = await http.post(apiEndpoint, request);
  localStorage.setItem("token", jwt);
}

export function signInWithJwt(jwt: string) {
  localStorage.setItem("token", jwt);
}

export function signOut() {
  localStorage.removeItem("token");
}

export function verifyEmail(request: VerifyEmailTypes) {
  return http.post(`${apiEndpoint}/verify/email`, request);
}

export function resendVerifyEmail(request: AuthMailTypes) {
  return http.post(`${apiEndpoint}/verify/resend`, request);
}

export function recoverPassword(request: AuthMailTypes) {
  return http.post(`${apiEndpoint}/password/recovery`, request);
}

export function getPasswordEmail(token: string | undefined) {
  return http.get<string>(`${apiEndpoint}/password/email/${token}`);
}

export function resetPassword(request: PasswordResetTypes) {
  return http.post(`${apiEndpoint}/password/reset`, request);
}

export function getCurrentUser() {
  const jwt = localStorage.getItem("token");

  if (!jwt) return null;

  try {
    return jwtDecode<CurrentUserTypes>(jwt);
  } catch (ex) {
    return null;
  }
}
