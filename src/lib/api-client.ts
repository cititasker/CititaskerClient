// lib/api-client.ts
import axios, { AxiosInstance, AxiosError } from "axios";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const isServer = typeof window === "undefined";

// Create base axios instance
function createApiInstance(): AxiosInstance {
  return axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

// Smart API client that works on both server and client
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = createApiInstance();
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - handles auth for both server and client
    this.client.interceptors.request.use(
      async (config) => {
        let token: string | undefined;

        if (isServer) {
          // Server: Use NextAuth's auth() function
          const session = await auth();
          token = session?.user?.authToken;
        } else {
          // Client: Use getSession()
          const session = await getSession();
          token = session?.user?.authToken;
        }

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Handle FormData
        if (config.data instanceof FormData) {
          delete config.headers["Content-Type"];
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - only for client-side
    if (!isServer) {
      this.client.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
          if (error.response?.status === 401) {
            // Only handle signOut on client
            const { signOut } = await import("next-auth/react");
            await signOut({ callbackUrl: "/auth/login", redirect: true });
          }
          return Promise.reject(error);
        }
      );
    }
  }

  // Expose axios methods
  get<T = any>(...args: Parameters<AxiosInstance["get"]>) {
    return this.client.get<T>(...args);
  }

  post<T = any>(...args: Parameters<AxiosInstance["post"]>) {
    return this.client.post<T>(...args);
  }

  put<T = any>(...args: Parameters<AxiosInstance["put"]>) {
    return this.client.put<T>(...args);
  }

  patch<T = any>(...args: Parameters<AxiosInstance["patch"]>) {
    return this.client.patch<T>(...args);
  }

  delete<T = any>(...args: Parameters<AxiosInstance["delete"]>) {
    return this.client.delete<T>(...args);
  }
}

// Export singleton instance
export const api = new ApiClient();
