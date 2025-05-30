import axios from "axios";

const signupApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

signupApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("signup-token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers.set("Accept", "application/json");
    config.headers.set("Content-Type", "application/json");
  }

  return config;
});

export default signupApi;
