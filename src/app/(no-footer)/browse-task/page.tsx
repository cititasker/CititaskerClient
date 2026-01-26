"use client";

import React, { Suspense } from "react";
import NextDynamic from "next/dynamic"; // rename the import to avoid conflict
import CustomSheet from "@/components/reusables/CustomSheet";
import useToggle from "@/hooks/useToggle";
import { ErrorState } from "@/components/browseTask/ErrorState";
import { useSearch } from "@/components/browseTask/hooks/useSearch";
import { useTasksQuery } from "@/components/browseTask/hooks/useTasksQuery";
import { MyTaskHeader } from "@/components/shared/task/MyTaskHeader";
import { ROUTES } from "@/constant";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const MyTaskContent = NextDynamic(
  () =>
    import("@/components/shared/task/MyTaskContent").then((mod) => ({
      default: mod.MyTaskContent,
    })),
  { ssr: false, loading: () => <div>Loading...</div> },
);

const FilterList = NextDynamic(
  () => import("@/components/browseTask/FilterList"),
  { ssr: false },
);

export default function BrowseTasksPage() {
  const showFilter = useToggle();
  const isDesktop = useMediaQuery("(min-width: 768px)");
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
      {!isDesktop && (
        <MyTaskHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isSearching={isSearching}
          onOpenFilter={showFilter.handleOpen}
        />
      )}

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

      {!isDesktop && showFilter.isOpen && (
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
