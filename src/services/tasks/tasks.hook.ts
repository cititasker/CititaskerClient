import { API_ROUTES } from "@/constant";
import {
  useMutation,
  useQuery,
  UseMutationOptions,
  useSuspenseQuery,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  acceptReschedule,
  completeTask,
  createTask,
  createTaskReschedule,
  getAllTasks,
  getReschedules,
  getTaskQuestion,
  getUserTaskById,
  getUserTasks,
  paymentReference,
  postQuestion,
  releasePayment,
  replyQuestion,
  rescheduleTask,
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
    queryKey: [API_ROUTES.TASKS, JSON.stringify(queryParams)],
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
    queryKey: [API_ROUTES.TASKS, String(id)],
    queryFn: () => getUserTaskById(id),
    enabled: !!id,
    ...options,
  });
};

export const useGetMyTasks = (queryParams?: Record<string, any>) =>
  useInfiniteQuery<TaskData, TaskError>({
    queryKey: [API_ROUTES.USER_TASKS, JSON.stringify(queryParams)],
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
    queryKey: [API_ROUTES.USER_TASKS, String(id)],
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

export const useCompleteTask = () => {
  return useMutation<any, Error, FormData>({
    mutationFn: completeTask,
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

export const useFetchTaskQuestion = (id: any) => {
  return useQuery<ITaskQuestionRes, Error>({
    queryKey: [API_ROUTES.GET_QUESTIONS, id],
    queryFn: () => getTaskQuestion(id),
    enabled: !!id,
  });
};

export const useCreateReschedule = () => {
  return useMutation<any, Error, any>({
    mutationFn: createTaskReschedule,
  });
};

export const useFetchReschedules = (id: string) => {
  return useQuery({
    queryKey: [API_ROUTES.GET_RESCHEDULES(id)],
    queryFn: () => getReschedules(id),
    enabled: !!id,
  });
};

export const useAcceptReschedule = () => {
  return useMutation<any, Error, { data: any }>({
    mutationFn: acceptReschedule,
  });
};

export const useRescheduleTask = () => {
  return useMutation<any, Error, { data: any; rejectWithCounter: boolean }>({
    mutationFn: rescheduleTask,
  });
};

export const useReleasePayment = () => {
  return useMutation<any, Error, { task_id: number }>({
    mutationFn: releasePayment,
  });
};
