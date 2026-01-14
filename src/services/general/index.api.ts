import { AxiosError } from "axios";
import { api } from "@/lib/api-client";
import { API_ROUTES } from "@/constant";

export function getCategories(): Promise<ITaskCategory[]> {
  return api
    .get(API_ROUTES.UTILITY.CATEGORIES)
    .then((data) => {
      return data.data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}
export function getSubCategories(id: any): Promise<ITaskCategory[]> {
  return api
    .get(`${API_ROUTES.UTILITY.SUB_CATEGORY}?category_id=${id}&search`)
    .then((data) => {
      return data.data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export const reverseGeocode = async (
  latitude: any,
  longitude: any
): Promise<string | undefined> => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.display_name;
  } catch (error) {
    console.error("Error in reverse geocoding:", error);
  }
};
