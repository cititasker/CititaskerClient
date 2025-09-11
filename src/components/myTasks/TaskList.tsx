"use client";

import { useAppSelector } from "@/store/hook";
import { ROUTES } from "@/constant";
import { useMyTasksQuery } from "./hooks/useMyTasksQuery";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { TaskListSkeleton } from "../skeletons/TaskListSkeleton";
import { LoadingIndicator } from "../shared/task/LoadingIndicator";
import TaskCardList from "../shared/task/TaskList";
import { EnhancedEmptyTasksState } from "../shared/task/EnhancedEmptyTasksState";

const TaskList = () => {
  const { user } = useAppSelector((state) => state.user);

  const { tasks, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMyTasksQuery();

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
    return <EnhancedEmptyTasksState />;
  }

  return (
    <div className="relative pb-5">
      {/* Loading indicator for infinite scroll */}
      {isFetchingNextPage && <LoadingIndicator />}

      <TaskCardList tasks={tasks} path={`/${user.role}${ROUTES.MY_TASKS}`} />

      {/* Intersection observer target */}
      <div ref={observerRef} className="h-1" />

      {/* Loading skeletons for next page */}
      {isFetchingNextPage && <TaskListSkeleton />}
    </div>
  );
};

export default TaskList;
