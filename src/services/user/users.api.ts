import { AxiosError } from "axios";
import { API_ROUTES } from "@/constant";
import api from "../apiService";
import { loginSchemaType } from "@/schema/auth";

export function getUserApi() {
  return api
    .get(API_ROUTES.GET_USER_DETAILS)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function uploadProfile(data: any) {
  return api
    .post(API_ROUTES.UPLOAD_PROFILE, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function updateProfile(data: any) {
  return api
    .put(API_ROUTES.UPDATE_PROFILE, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function updateProfileDetails(data: any) {
  return api
    .post(API_ROUTES.UPDATE_PROFILE_DETAILS, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getUserProfileDetails(id: any) {
  return api
    .get(`${API_ROUTES.GET_PROFILE_DETAILS}/${id}`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export const getUserPorfolio = (id: any): Promise<UserPorfolioRes> => {
  return api
    .get(`${API_ROUTES.GET_PORTFOLIO}/${id}`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
};

export function updateUserPorfolio(data: any) {
  return api
    .post(`${API_ROUTES.UPDATE_PORTFOLIO}`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function deleteUserPorfolio(id: any) {
  return api
    .delete(`${API_ROUTES.UPDATE_PORTFOLIO}/${id}`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function createFaq(data: any) {
  return api
    .post(`${API_ROUTES.CREATE_FAQ}`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getFaq(id: any) {
  return api
    .get(`${API_ROUTES.GET_FAQ}/${id}`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function updateFaq({ id, data }: any) {
  return api
    .put(`${API_ROUTES.UPDATE_FAQ}/${id}`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function deleteFaq(id: any) {
  return api
    .delete(`${API_ROUTES.DELETE_FAQ}/${id}`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export const getReviews = (
  id: number | string
): Promise<GetReviewsResponse> => {
  return api
    .get(`${API_ROUTES.GET_REVIEWS}?task_id=${id}`)
    .then((data) => {
      return data.data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
};

export const postReview = ({
  role,
  ...data
}: {
  role: TRole;
  [key: string]: any;
}): Promise<GetReviewsResponse> => {
  return api
    .post(`${API_ROUTES.POST_REVIEW}/${role}`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
};

export const reorderFaqs = (data: any): Promise<GetReviewsResponse> => {
  return api
    .post(`${API_ROUTES.POST_REVIEW}`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
};

export const switchRoles = (data: { role: TRole }): Promise<any> => {
  return api
    .post(`${API_ROUTES.SWITCH_ROLE}`, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
};

export function updateBankDetails(data: any): Promise<any> {
  return api
    .post(API_ROUTES.AUTH.UPDATE_BANK_DETAILS, data)
    .then((data) => {
      return data.data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function loginUser(data: loginSchemaType): Promise<ILoginRes> {
  return api
    .post(API_ROUTES.LOGIN, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}
