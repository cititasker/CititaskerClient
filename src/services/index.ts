import { AxiosError } from "axios";
import api, { publicApi } from "./apiService";

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
    .get(`utility/categories`)
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

export function getBanks(): Promise<any> {
  return publicApi
    .get(`https://api.paystack.co/bank`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECERET_KEY}`,
      },
    })
    .then((data) => {
      return data.data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function resolveAccountNumber({
  account,
  bank_code,
}: any): Promise<any> {
  return publicApi
    .get(
      `https://api.paystack.co/bank/resolve?account_number=${account}&bank_code=${bank_code}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECERET_KEY}`,
        },
      }
    )
    .then((data) => {
      return data.data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}
