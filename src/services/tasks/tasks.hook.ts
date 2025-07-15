import { API_ROUTES } from "@/constant";
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
  useSuspenseQuery,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createTask,
  getAllTasks,
  getUserTaskById,
  getUserTasks,
  paymentReference,
  updateTask,
} from "./tasks.api";
import {
  CreateTask,
  IntentPayload,
  IntentResponse,
  TaskApiResponse,
  TaskData,
  TaskError,
  UseFetchUserTaskByIdOptions,
} from "./tasks.types";

export const useGetAllTasks = () =>
  useInfiniteQuery<TaskData, TaskError>({
    queryKey: [API_ROUTES.TASKS],
    queryFn: async ({ pageParam = 1 }) => getAllTasks({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (data) => {
      const lastPage = data.data as any;
      const currentPage = lastPage?.meta?.current_page ?? 1;
      const totalPages = lastPage?.meta?.last_page ?? 1;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

export const useFetchTaskById = ({
  id,
  ...options
}: UseFetchUserTaskByIdOptions) => {
  return useSuspenseQuery<
    TaskApiResponse,
    Error,
    TaskApiResponse,
    [string, string]
  >({
    queryKey: [API_ROUTES.GET_TASK_BY_ID, id],
    queryFn: () => getUserTaskById(id),
    ...options,
  });
};

export const useGetUserTasks = (
  params: Record<string, any>,
  options?: UseQueryOptions<TaskData, TaskError>
) => {
  return useQuery<TaskData, TaskError>({
    queryKey: [API_ROUTES.USER_TASKS, params],
    queryFn: () => getUserTasks(params),
    ...options,
  });
};

export const useFetchUserTaskById = ({
  id,
  ...options
}: UseFetchUserTaskByIdOptions) => {
  return useSuspenseQuery<
    TaskApiResponse,
    Error,
    TaskApiResponse,
    [string, string]
  >({
    queryKey: [API_ROUTES.GET_USER_TASK, id],
    queryFn: () => getUserTaskById(id),
    ...options,
  });
};

export const useCreateIntent = (
  opt?: UseMutationOptions<IntentResponse, Error, IntentPayload>
) => {
  return useMutation<IntentResponse, Error, IntentPayload>({
    mutationFn: paymentReference,
    ...opt,
  });
};

export const useCreateTask = (
  opt?: UseMutationOptions<CreateTask, Error, any>
) => {
  return useMutation<CreateTask, Error, any>({
    mutationFn: createTask,
    ...opt,
  });
};

export const useUpdateTask = (opt?: UseMutationOptions<any, Error, any>) => {
  return useMutation<any, Error, any>({
    mutationFn: updateTask,
    ...opt,
  });
};
