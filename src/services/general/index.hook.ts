import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getCategories, getSubCategories } from "./index.api";
import { API_ROUTES } from "@/constant";

export type TaskError = unknown;

export const useGetCategories = (
  opt?: UseQueryOptions<ITaskCategory[], TaskError>
) => {
  return useQuery<ITaskCategory[], TaskError>({
    queryKey: [API_ROUTES.UTILITY.CATEGORY],
    queryFn: getCategories,
    ...opt,
  });
};

export const useGetSubCategories = (
  data: { id: any },
  opt?: UseQueryOptions<ITaskCategory[], TaskError>
) => {
  return useQuery<ITaskCategory[], TaskError>({
    queryKey: [API_ROUTES.UTILITY.SUB_CATEGORY, data.id],
    queryFn: () => getSubCategories(data.id),
    enabled: !!data.id,
    ...opt,
  });
};
