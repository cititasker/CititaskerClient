import { API_ROUTES } from "@/constant";
import {
  useMutation,
  useQuery,
  UseMutationOptions,
  useSuspenseQuery,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createTask,
  getAllTasks,
  getTaskQuestion,
  getUserTaskById,
  getUserTasks,
  paymentReference,
  postQuestion,
  replyQuestion,
  requestPayment,
  updateTask,
} from "./tasks.api";
import {
  CreateTask,
  IntentPayload,
  IntentResponse,
  ITaskQuestionRes,
  TaskApiResponse,
  TaskData,
  TaskError,
  UseFetchUserTaskByIdOptions,
} from "./tasks.types";

export const useGetAllTasks = (queryParams?: Record<string, any>) =>
  useInfiniteQuery<TaskData, TaskError>({
    queryKey: [API_ROUTES.TASKS, queryParams], // make queryKey dependent on params
    queryFn: async ({ pageParam = 1 }) =>
      getAllTasks({ page: pageParam, ...queryParams }),
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
  return useQuery<TaskApiResponse, Error, TaskApiResponse, [string, string]>({
    queryKey: [API_ROUTES.GET_TASK_BY_ID, id],
    queryFn: () => getUserTaskById(id),
    enabled: !!id,
    ...options,
  });
};

export const useGetMyTasks = (queryParams?: Record<string, any>) =>
  useInfiniteQuery<TaskData, TaskError>({
    queryKey: [API_ROUTES.USER_TASKS, queryParams],
    queryFn: async ({ pageParam = 1 }) =>
      getUserTasks({ page: pageParam, ...queryParams }),
    initialPageParam: 1,
    getNextPageParam: (data) => {
      const lastPage = data.data as any;
      const currentPage = lastPage?.meta?.current_page ?? 1;
      const totalPages = lastPage?.meta?.last_page ?? 1;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

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

export const usePostTask = (
  opt?: UseMutationOptions<CreateTask, Error, { id: string; body: any }>
) => {
  return useMutation<CreateTask, Error, { id: any; body: any }>({
    mutationFn: ({ id, body }) => (!id ? createTask(body) : updateTask(body)),
    ...opt,
  });
};

export const useRequestPayment = (
  opt?: UseMutationOptions<any, Error, any>
) => {
  return useMutation<any, Error, any>({
    mutationFn: requestPayment,
    ...opt,
  });
};

export const usePostQuestion = (
  opt?: UseMutationOptions<CreateTask, Error, any>
) => {
  return useMutation<CreateTask, Error, any>({
    mutationFn: postQuestion,
    ...opt,
  });
};

export const useReplyQuestion = (opt?: UseMutationOptions<any, Error, any>) => {
  return useMutation<any, Error, any>({
    mutationFn: replyQuestion,
    ...opt,
  });
};

// export const useFetchItemByIdMutation = () => {
//   return useMutation<Item, Error, string>({
//     mutationFn: fetchItemById,
//   });
// };

export const useFetchTaskQuestion = (id: any) => {
  return useQuery<ITaskQuestionRes, Error>({
    queryKey: [API_ROUTES.GET_QUESTIONS, id],
    queryFn: () => getTaskQuestion(id),
    enabled: !!id,
  });
};
