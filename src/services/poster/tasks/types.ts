export type IntentPayload = {
  task_id: number;
  offer_id: number;
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
