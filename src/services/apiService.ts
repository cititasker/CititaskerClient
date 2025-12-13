import axios from "axios";
import { getSession, signOut } from "next-auth/react";

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

// Response interceptor - Handle 401 errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 Unauthorized
    if (error.response?.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        // Sign out the user
        await signOut({
          callbackUrl: "/auth/login",
          redirect: true,
        });

        return Promise.reject(error);
      }
    }

    // For other errors, just reject
    return Promise.reject(error);
  }
);

export default api;
