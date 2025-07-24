import {
  getAllTasks,
  getUserTaskById,
  getUserTasks,
  requestPayment,
} from "@/services/task";
import { queryOptions, useMutation } from "@tanstack/react-query";
import { USER_TASKS } from "./queryKeys";
import { API_ROUTES } from "@/constant";

export const getAllTasksQuery = () => {
  return queryOptions({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });
};

export const getUserTasksQuery = ({ status }: { status: string | null }) => {
  return queryOptions({
    queryKey: USER_TASKS(status),
    queryFn: () => getUserTasks({ status }),
  });
};

export const useRequestPayment = () => {
  return useMutation({
    mutationFn: requestPayment,
  });
};
