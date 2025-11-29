"use client";

import React from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { TaskListSkeleton } from "@/components/skeletons/TaskListSkeleton";
import { LoadingIndicator } from "@/components/shared/task/LoadingIndicator";
import TaskCardList from "@/components/shared/task/TaskList";
import { EnhancedEmptyTasksState } from "@/components/shared/task/EnhancedEmptyTasksState";
import { EmptyTasksState } from "@/components/shared/task/EnhancedEmptyTasksState";

interface InfiniteTaskListProps {
  tasks: ITask[];
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  path: string;
  variant?: "default" | "enhanced";
}

const InfiniteTaskList = ({
  tasks,
  isLoading = false,
  isFetchingNextPage = false,
  fetchNextPage,
  hasNextPage = false,
  path,
  variant = "enhanced",
}: InfiniteTaskListProps) => {
  const observerRef = useInfiniteScroll({
    hasNextPage,
    isFetching: isFetchingNextPage,
    onLoadMore: fetchNextPage ?? (() => {}),
  });

  // Show initial loading
  if (isLoading) return <TaskListSkeleton />;

  // Show empty state
  if (tasks.length === 0) {
    return variant === "enhanced" ? (
      <EnhancedEmptyTasksState />
    ) : (
      <EmptyTasksState />
    );
  }

  return (
    <div className="relative pb-5">
      {/* While fetching next page */}
      {isFetchingNextPage && <LoadingIndicator />}
      <TaskCardList tasks={tasks} path={path} />
      <div ref={observerRef} className="h-1" />
      {isFetchingNextPage && <TaskListSkeleton />}
    </div>
  );
};

export default InfiniteTaskList;
