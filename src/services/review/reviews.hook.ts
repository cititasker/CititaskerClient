import { useBaseQuery } from "@/hooks/useBaseQuery";
import { getReviews, getReviewStatus, getUserReviews } from "./reviews.api";
import { API_ROUTES } from "@/constant";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetReviews = (id: number) => {
  return useBaseQuery([API_ROUTES.GET_REVIEWS, id], () => getReviews(id), {
    enabled: !!id,
  });
};

export const useUserReviewsInfinite = (id: any) => {
  return useInfiniteQuery({
    queryKey: [API_ROUTES.GET_USER_REVIEW, id, "infinite"],
    queryFn: ({ pageParam = 1 }) => getUserReviews(id, pageParam),
    enabled: !!id,
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.meta;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
    // staleTime: 1000 * 60 * 5, // 5 minutes
  });
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
