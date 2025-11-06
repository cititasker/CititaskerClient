import { UseSuspenseQueryOptions } from "@tanstack/react-query";

export type IntentPayload = {
  task_id: number;
  payable_id: number;
  intent: "accept_offer" | "surcharge_payment";
};

export type IntentResponse = {
  status: "success";
  data: {
    hash_id: string;
    amount: number;
    currency: string;
    payment_url?: string;
  };
};

export interface TaskData extends IResponse {
  data: { data: ITask[] };
}
export type TaskError = unknown;

export type TaskApiResponse = {
  data: ITask;
};

export type CreateTask = {
  message: string;
  data: ITask;
};

export type UseCustomSuspenseQueryOptions<
  TData,
  TError = unknown,
  TQueryKey extends readonly unknown[] = unknown[]
> = Omit<
  UseSuspenseQueryOptions<TData, TError, TData, TQueryKey>,
  "queryKey" | "queryFn"
>;

export type UseGetAllTasksOptions = {
  queryParams?: Record<string, any>;
} & UseCustomSuspenseQueryOptions<
  TaskData,
  TaskError,
  [string, Record<string, any>?]
>;

export type UseFetchUserTaskByIdOptions = {
  id: string;
} & UseCustomSuspenseQueryOptions<TaskApiResponse, Error, [string, string]>;

export interface ITaskQuestionRes extends IResponse {
  data: { data: CommentThreadT[] };
}
