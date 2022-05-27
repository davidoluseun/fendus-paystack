import { AxiosResponseHeaders } from "axios";

export const parseHeaders = (headers: AxiosResponseHeaders) => {
  return headers["link"].split(",").reduce((acc: any, link: string) => {
    const resRegex = /^\<(.+)\>; rel="(.+)"$/.exec(link.trim());

    if (resRegex) acc[resRegex[2]] = resRegex[1];

    return acc;
  }, {});
};
