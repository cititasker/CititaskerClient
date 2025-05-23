import {
  getAllTasks,
  getSingleTask,
  getUserTaskById,
  getUserTasks,
} from "@/services/task";
import { queryOptions } from "@tanstack/react-query";
import { TASK_ID, USER_TASK_ID, USER_TASKS } from "./queryKeys";

export const getAllTasksQuery = () => {
  return queryOptions({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });
};

export const getSingleTaskQuery = (id: string) => {
  return queryOptions({
    queryKey: TASK_ID(id),
    queryFn: () => getSingleTask(id),
    enabled: !!id,
  });
};

export const getUserTaskByIdQuery = (id: string) => {
  return queryOptions({
    queryKey: USER_TASK_ID(id),
    queryFn: () => getUserTaskById(id),
    enabled: !!id,
  });
};

export const getUserTasksQuery = ({ status }: { status: string | null }) => {
  return queryOptions({
    queryKey: USER_TASKS(status),
    queryFn: () => getUserTasks({ status }),
  });
};
