import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(undefined, (ex) => {
  const expectedError =
    ex.response && ex.response.status >= 400 && ex.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", ex);
    toast.error("An unexpected error occurred.");
  }

  return Promise.reject(ex);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default http;
