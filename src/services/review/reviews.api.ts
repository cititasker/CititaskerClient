import { API_ROUTES } from "@/constant";
import { api } from "@/lib/api-client";
import { AxiosError } from "axios";

export const getUserReviews = (
  id: any,
  page: number = 1,
): Promise<UserReviewResponse> => {
  return api
    .get(`${API_ROUTES.GET_USER_REVIEW}/${id}`, {
      params: { page },
    })
    .then((data) => {
      return data.data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
};

export const getReviews = (id: number | string): Promise<TaskerReview> => {
  return api
    .get(`${API_ROUTES.GET_REVIEWS}/${id}`)
    .then((data) => {
      return data.data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
};

export const updateReview = ({ data, role }: UpdateReviewArgs) => {
  const endpoint = `${API_ROUTES.UPDATE_REVIEW}/${role}`;

  return api
    .put(endpoint, data)
    .then((res) => res.data.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
};

export const getReviewStatus = (
  id: number | string,
): Promise<GetReviewsResponse> => {
  return api
    .get(`${API_ROUTES.GET_REVIEW_STATUS}?task_id=${id}`)
    .then((data) => {
      return data.data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
};

export const postReview = ({
  data,
  role,
}: {
  data: any;
  role: TRole | undefined;
}): Promise<GetReviewsResponse> => {
  return api
    .post(`${API_ROUTES.POST_REVIEW}/${role}`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
};
