import axios from "axios";
import { getSession } from "next-auth/react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user?.authToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${session.user.authToken}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers.set("Accept", "application/json");
    config.headers.set("Content-Type", "application/json");
  }

  return config;
});

export default api;
