import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();
const token = cookie.get("citi-user");
const domain = process.env.NEXT_PUBLIC_DOMAIN;
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (domain === "localhost") {
        cookie.remove("citi-user", { domain, path: "/" });
      } else {
        cookie.remove("citi-user", { domain: `.${domain}`, path: "/" });
      }
      window.location.href = "/login";
    }
    /** Handle errors **/
    return Promise.reject(error);
  }
);

export const formDataApi = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});

formDataApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (domain === "localhost") {
        cookie.remove("citi-user", { domain, path: "/" });
      } else {
        cookie.remove("citi-user", { domain: `.${domain}`, path: "/" });
      }
      window.location.href = "/login";
    }
    /** Handle errors **/
    return Promise.reject(error);
  }
);

export const publicApi = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
