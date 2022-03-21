import http from "./httpService";

const apiEndpoint = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/upload`;

export function upload(file: File) {
  const data = new FormData();

  data.append("file", file);
  data.append(
    "upload_preset",
    process.env.REACT_APP_CLOUDINARY_UNSIGNED_UPLOAD_PRESET as string
  );

  return http.post(apiEndpoint, data);
}

