"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import CustomSheet from "@/components/reusables/CustomSheet";
import useToggle from "@/hooks/useToggle";
import { ErrorState } from "@/components/browseTask/ErrorState";
import { useSearch } from "@/components/browseTask/hooks/useSearch";
import { useTasksQuery } from "@/components/browseTask/hooks/useTasksQuery";
import { MyTaskHeader } from "@/components/shared/task/MyTaskHeader";
import { ROUTES } from "@/constant";

const MyTaskContent = dynamic(
  () =>
    import("@/components/shared/task/MyTaskContent").then((mod) => ({
      default: mod.MyTaskContent,
    })),
  {
    loading: () => (
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Loading tasks...</p>
        </div>
      </div>
    ),
    ssr: false,
  }
);

const FilterList = dynamic(() => import("@/components/browseTask/FilterList"), {
  loading: () => (
    <div className="p-4 text-center text-muted-foreground">
      Loading filters...
    </div>
  ),
  ssr: false,
});

export default function BrowseTasksPage() {
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
  } = useTasksQuery();

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
      <Suspense
        fallback={
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
          </div>
        }
      >
        <MyTaskContent
          tasks={tasks}
          isLoading={isLoading}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          path={ROUTES.BROWSE_TASK}
        />
      </Suspense>

      {/* Filter Sheet - Only render when open */}
      {showFilter.isOpen && (
        <CustomSheet
          open={showFilter.isOpen}
          onOpenChange={showFilter.setIsOpen}
          title="Filter"
          titleClassName="p-0 text-left"
        >
          <FilterList />
        </CustomSheet>
      )}
    </div>
  );
}
