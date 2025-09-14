"use client";

import { ROUTES } from "@/constant";
import { useMyTasksQuery } from "./hooks/useMyTasksQuery";
import InfiniteTaskList from "../shared/task/InfiniteTaskList";

const TaskList = () => {
  const { tasks, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMyTasksQuery();

  return (
    <InfiniteTaskList
      tasks={tasks}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      path={ROUTES.MY_TASKS}
    />
  );
};

export default TaskList;
