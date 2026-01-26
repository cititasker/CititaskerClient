import { UseSuspenseQueryOptions } from "@tanstack/react-query";

export type IntentPayload = {
  task_id: number;
  payable_id: number;
  intent: "accept_offer" | "surcharge_payment";
  payment_method: PaymentMethodType;
};

export type IntentResponse = {
  status: "success";
  data: {
    hash_id: string;
    amount: number;
    currency: string;
    payment_url?: string;
    gateway_amount: number;
    payment_method: PaymentMethodType;
    status: "approved" | "failed";
    wallet_amount: number;
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
  TQueryKey extends readonly unknown[] = unknown[],
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

type UserT = {
  email: "juliet_poster@gmail.com";
  id: 15;
  profile: {
    first_name: "Juliet";
    id: 7;
    last_name: "Poster";
    user_id: 15;
  };
};

export interface IReschedule {
  agreed_date: string | null;
  agreed_time: string | null;
  approver: string | null;
  counter_proposals: IReschedule[];
  created_at: string;
  expires_at: string;
  id: number;
  parent_id: number | null;
  proposed_date: string;
  proposed_time: string;
  reason: string;
  round: number;
  status: string;
  task_id: number;
  type: string;
  updated_at: string;
  poster: UserT;
  tasker: UserT;
}
