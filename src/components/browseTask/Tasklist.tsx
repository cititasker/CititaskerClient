"use client";
import React from "react";
import TaskCard from "../shared/task/TaskCard";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { TaskListSkeleton } from "@/components/skeletons/TaskListSkeleton";
import {
  EmptyTasksState,
  EnhancedEmptyTasksState,
} from "@/components/shared/task/EnhancedEmptyTasksState";
import { LoadingIndicator } from "@/components/shared/task/LoadingIndicator";
import { useTasksQuery } from "./hooks/useTasksQuery";
import TaskCardList from "../shared/task/TaskList";
import { ROUTES } from "@/constant";

export default function TaskList() {
  const { tasks, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useTasksQuery();

  const observerRef = useInfiniteScroll({
    hasNextPage: hasNextPage || false,
    isFetching: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  // Loading state
  if (isLoading) {
    return <TaskListSkeleton />;
  }

  // Empty state
  if (tasks.length === 0) {
    return <EnhancedEmptyTasksState variant="default" />;
  }

  return (
    <div className="relative pb-5">
      {/* Loading indicator for infinite scroll */}
      {isFetchingNextPage && <LoadingIndicator />}

      <TaskCardList tasks={tasks} path={ROUTES.BROWSE_TASK} />

      {/* Intersection observer target */}
      <div ref={observerRef} className="h-1" />

      {/* Loading skeletons for next page */}
      {isFetchingNextPage && <TaskListSkeleton />}
    </div>
  );
}

// Alternative version that receives tasks as props (if using central data fetching)
interface TaskListProps {
  tasks: ITask[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
}

export function TaskListWithProps({
  tasks,
  loading = false,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
}: TaskListProps) {
  const observerRef = useInfiniteScroll({
    hasNextPage: hasMore,
    isFetching: loadingMore,
    onLoadMore: onLoadMore || (() => {}),
  });

  if (loading) {
    return <TaskListSkeleton />;
  }

  if (tasks.length === 0) {
    return <EmptyTasksState />;
  }

  return (
    <div className="relative pb-5">
      {loadingMore && <LoadingIndicator />}

      <TaskCardList tasks={tasks} path={ROUTES.BROWSE_TASK} />

      {onLoadMore && <div ref={observerRef} className="h-1" />}
      {loadingMore && <TaskListSkeleton />}
    </div>
  );
}
