import http from "./httpService";

const apiEndpoint = "/subscribe";

export function subscribe(request: SubscribeTypes) {
  return http.post(apiEndpoint, request);
}
