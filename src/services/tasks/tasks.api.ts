import { API_ROUTES, ROLE } from "@/constant";
import api from "@/services/apiService";
import { AxiosError } from "axios";
import { IReschedule, TaskData } from "./tasks.types";

export const getAllTasks = async (
  queryParams?: Record<string, any>
): Promise<TaskData> => {
  const params = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      // Handle arrays - append each value separately
      if (Array.isArray(value)) {
        value.forEach((item) => {
          params.append(`${key}[]`, String(item));
        });
      } else {
        params.set(key, String(value));
      }
    });
  }

  const query = params.toString();

  return api
    .get(`${API_ROUTES.TASKS}${query ? `?${query}` : ""}`)
    .then((data) => data.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
};

export function getTaskById(id: string) {
  return api
    .get(`${API_ROUTES.GET_TASK_BY_ID}/${id}`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getUserTasks(
  queryParams?: Record<string, any>
): Promise<TaskData> {
  const query = new URLSearchParams(queryParams).toString();
  return api
    .get(`${API_ROUTES.USER_TASKS}?${query}`)
    .then((data) => data.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getUserTaskById(id: string) {
  return api
    .get(`${API_ROUTES.GET_TASK_BY_ID}/${id}`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function paymentReference(data: any) {
  return api
    .post(API_ROUTES.CREATE_PAYMENT_INTENT, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function createTask(data: any) {
  return api
    .post(API_ROUTES.CREATE_TASK, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function updateTask(data: any) {
  return api
    .post(API_ROUTES.UPDATE_TASK, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function completeTask(data: any) {
  return api
    .post(API_ROUTES.COMPLETE_TASK, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function postQuestion(data: any) {
  return api
    .post(API_ROUTES.POST_QUESTION, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function replyQuestion(data: any) {
  return api
    .post(API_ROUTES.REPLY_QUESTION, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getTaskQuestion(id: any) {
  return api
    .get(`${API_ROUTES.GET_QUESTIONS}?task_id=${id}`)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function createTaskReschedule(data: any) {
  return api
    .post(API_ROUTES.CREAT_TASK_RESCHEDULE, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getReschedules(id: any): ApiResponsePromise<IReschedule[]> {
  return api
    .get(API_ROUTES.GET_RESCHEDULES(id))
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function acceptReschedule({ data, role }: { data: any; role: TRole }) {
  const url =
    role === ROLE.poster
      ? API_ROUTES.APPROVE_TASK_RESCHEDULE
      : API_ROUTES.ACCEPT_TASK_RESCHEDULE;

  return api
    .post(url, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function rescheduleTask({
  data,
  rejectWithCounter,
}: {
  data: any;
  rejectWithCounter: boolean;
}) {
  const url = rejectWithCounter
    ? API_ROUTES.POSTER_RESCHEDULE_TASK
    : API_ROUTES.TASKER_RESCHEDULE_TASK;
  return api
    .post(url, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function releasePayment(data: { task_id: number }) {
  return api
    .post(API_ROUTES.RELEASE_PAYMENT, data)
    .then((data) => {
      return data.data;
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}
