"use client";
import React from "react";
import { useTasksQuery } from "./hooks/useTasksQuery";
import { ROUTES } from "@/constant";
import InfiniteTaskList from "../shared/task/InfiniteTaskList";

export default function TaskList() {
  const { tasks, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useTasksQuery();

  return (
    <InfiniteTaskList
      tasks={tasks}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      path={ROUTES.BROWSE_TASK}
    />
  );
}
