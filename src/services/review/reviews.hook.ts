import { useBaseQuery } from "@/hooks/useBaseQuery";
import { getReviews, getReviewStatus, getUserReviews } from "./reviews.api";
import { API_ROUTES } from "@/constant";

export const useGetReviews = (id: number) => {
  return useBaseQuery([API_ROUTES.GET_REVIEWS, id], () => getReviews(id), {
    enabled: !!id,
  });
};

export const useUserReviews = (id: any) => {
  return useBaseQuery(
    [API_ROUTES.GET_USER_REVIEW, id],
    () => getUserReviews(id),
    {
      enabled: !!id,
    },
  );
};

export const useGetReviewStatus = (
  id: number,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: GetReviewsResponse) => void;
    onError?: (error: Error) => void;
  },
) => {
  return useBaseQuery<GetReviewsResponse, Error>(
    [API_ROUTES.GET_REVIEW_STATUS, id],
    () => getReviewStatus(id),
    {
      enabled: options?.enabled ?? !!id,
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    },
  );
};
