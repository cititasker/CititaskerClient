import { API_ROUTES } from "@/constant";
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
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
} from "./types";

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

export const useGetAllTasks = (opt?: UseQueryOptions<TaskData, TaskError>) => {
  return useQuery<TaskData, TaskError>({
    queryKey: [API_ROUTES.TASKS],
    queryFn: getAllTasks,
    ...opt,
  });
};

export const useFetchUserTaskById = (
  data: { id: string },
  opt?: Omit<
    UseSuspenseQueryOptions<
      TaskApiResponse,
      Error,
      TaskApiResponse,
      [string, string]
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useSuspenseQuery<
    TaskApiResponse,
    Error,
    TaskApiResponse,
    [string, string]
  >({
    queryKey: [API_ROUTES.GET_USER_TASK, data.id],
    queryFn: () => getUserTaskById(data.id),
    ...opt,
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
