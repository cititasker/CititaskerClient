"use client";
import React from "react";
import CustomSheet from "@/components/reusables/CustomSheet";
import useToggle from "@/hooks/useToggle";
import FilterList from "@/components/browseTask/FilterList";
import { ErrorState } from "@/components/browseTask/ErrorState";
import { useSearch } from "@/components/browseTask/hooks/useSearch";
import { useTasksQuery } from "@/components/browseTask/hooks/useTasksQuery";
import { MyTaskHeader } from "@/components/shared/task/MyTaskHeader";
import { MyTaskContent } from "@/components/shared/task/MyTaskContent";

export default function BrowseTasksPage() {
  const showFilter = useToggle();
  const { searchTerm, setSearchTerm, isSearching } = useSearch();
  const { tasks, isLoading, error, refetch } = useTasksQuery();

  if (error) {
    return <ErrorState message="Failed to load tasks" onRetry={refetch} />;
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
        <MyTaskContent tasks={tasks} isLoading={isLoading} />
      </div>

      {/* Filter Sheet */}
      <CustomSheet
        open={showFilter.isOpen}
        onOpenChange={showFilter.setIsOpen}
        title="Filter"
        titleClassName="text-left"
      >
        <FilterList />
      </CustomSheet>
    </div>
  );
}
