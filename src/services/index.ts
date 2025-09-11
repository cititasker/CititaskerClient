import { AxiosError } from "axios";
import api from "./apiService";
import { API_ROUTES } from "@/constant";

export function joinPosterApi(data: any) {
  return api
    .post(`waitlist/join/poster`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}
export function joinTaskerApi(data: any) {
  return api
    .post(`waitlist/join/tasker`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getCategories(): Promise<ITaskCategory[]> {
  return api
    .get(`${API_ROUTES.UTILITY.CATEGORIES}`)
    .then((data) => {
      return data.data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}
export function getSubCategories(id: any): Promise<ITaskCategory[]> {
  return api
    .get(`utility/sub-categories?category_id=${id}&search`)
    .then((data) => {
      return data.data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string | null> {
  try {
    const response = await fetch(`/api/reverse-geocode?lat=${lat}&lng=${lng}`);

    if (response.ok) {
      const data = await response.json();
      return data.address;
    }
  } catch (error) {
    console.warn("Server-side reverse geocoding failed:", error);
  }

  return `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
}

export function getBanks(): Promise<any> {
  return api
    .get(API_ROUTES.UTILITY.BANKS)
    .then((data) => {
      return data.data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function verifyAccountNumber(data: any) {
  const queryParams = new URLSearchParams(data).toString();
  return api
    .get(`${API_ROUTES.UTILITY.VERIFY_ACCOUNT_NUMBER}?${queryParams}`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}
