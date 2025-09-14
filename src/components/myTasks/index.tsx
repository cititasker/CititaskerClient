"use client";
import React from "react";
import CustomSheet from "../reusables/CustomSheet";
import useToggle from "@/hooks/useToggle";
import { TaskFilter } from "./TaskFilter";
import { useSearch } from "../browseTask/hooks/useSearch";
import { useMyTasksQuery } from "./hooks/useMyTasksQuery";
import { ErrorState } from "../browseTask/ErrorState";
import { MyTaskHeader } from "../shared/task/MyTaskHeader";
import { MyTaskContent } from "../shared/task/MyTaskContent";
import { useAppSelector } from "@/store/hook";
import { ROUTES } from "@/constant";

export default function MyTask() {
  const { user } = useAppSelector((state) => state.user);
  const showFilter = useToggle();
  const { searchTerm, setSearchTerm, isSearching } = useSearch();
  const {
    tasks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useMyTasksQuery();

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <ErrorState message="Failed to load your tasks" onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="space-y-2 h-full flex flex-col">
      {/* Header */}
      <MyTaskHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isSearching={isSearching}
        onOpenFilter={showFilter.handleOpen}
      />

      {/* Content */}
      <div className="flex-1 min-h-0">
        <MyTaskContent
          tasks={tasks}
          isLoading={isLoading}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          path={`/${user.role}/${ROUTES.MY_TASKS}`}
        />
      </div>

      {/* Filter Sheet */}
      <CustomSheet
        open={showFilter.isOpen}
        onOpenChange={showFilter.setIsOpen}
        title="Filter Tasks"
        titleClassName="text-left mb-4"
      >
        <TaskFilter onClose={showFilter.handleClose} />
      </CustomSheet>
    </div>
  );
}
