// hooks/useTableState.ts - Fixed to prevent infinite loops
"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  PaginationState,
  OnChangeFn,
} from "@tanstack/react-table";

export interface TableState {
  search: string;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  pagination: PaginationState;
  rowSelection: Record<string, boolean>;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: "select" | "multiselect" | "range" | "date" | "text";
  options?: Array<{ label: string; value: string }>;
}

export const useTableState = (defaultPageSize = 10) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitializedRef = useRef(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Parse URL params to initial state - only run once on mount
  const initialState = useMemo((): TableState => {
    if (isInitializedRef.current) {
      // Don't recalculate after first initialization
      return {
        search: "",
        sorting: [],
        columnFilters: [],
        columnVisibility: {},
        pagination: { pageIndex: 0, pageSize: defaultPageSize },
        rowSelection: {},
      };
    }

    return {
      search: searchParams.get("search") || "",
      sorting: JSON.parse(searchParams.get("sorting") || "[]"),
      columnFilters: JSON.parse(searchParams.get("filters") || "[]"),
      columnVisibility: JSON.parse(searchParams.get("visibility") || "{}"),
      pagination: {
        pageIndex: parseInt(searchParams.get("page") || "0"),
        pageSize: parseInt(
          searchParams.get("pageSize") || defaultPageSize.toString()
        ),
      },
      rowSelection: {},
    };
  }, [defaultPageSize]); // Remove searchParams from dependencies

  // State management
  const [tableState, setTableState] = useState<TableState>(initialState);

  // Mark as initialized after first render
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
    }
  }, []);

  // Debounced URL update function
  const updateURL = useCallback(
    (newState: Partial<TableState>) => {
      // Clear existing timeout
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      // Debounce URL updates
      updateTimeoutRef.current = setTimeout(() => {
        const params = new URLSearchParams();

        // Build params from current state + new state
        const currentState = { ...tableState, ...newState };

        // Add search param
        if (currentState.search) {
          params.set("search", currentState.search);
        }

        // Add sorting param
        if (currentState.sorting.length > 0) {
          params.set("sorting", JSON.stringify(currentState.sorting));
        }

        // Add filters param
        if (currentState.columnFilters.length > 0) {
          params.set("filters", JSON.stringify(currentState.columnFilters));
        }

        // Add pagination
        if (currentState.pagination.pageIndex > 0) {
          params.set("page", currentState.pagination.pageIndex.toString());
        }
        if (currentState.pagination.pageSize !== defaultPageSize) {
          params.set("pageSize", currentState.pagination.pageSize.toString());
        }

        // Add visibility
        if (Object.keys(currentState.columnVisibility).length > 0) {
          params.set(
            "visibility",
            JSON.stringify(currentState.columnVisibility)
          );
        }

        const newURL = params.toString()
          ? `${pathname}?${params.toString()}`
          : pathname;

        // Only update if URL actually changed
        const currentURL = `${pathname}${window.location.search}`;
        if (newURL !== currentURL) {
          router.replace(newURL, { scroll: false });
        }
      }, 300); // 300ms debounce
    },
    [pathname, router, defaultPageSize]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  // Helper function to handle updater or value pattern
  const handleUpdaterOrValue = <T>(
    updaterOrValue: T | ((old: T) => T),
    currentValue: T
  ): T => {
    return typeof updaterOrValue === "function"
      ? (updaterOrValue as (old: T) => T)(currentValue)
      : updaterOrValue;
  };

  // State updaters that properly implement OnChangeFn pattern
  const setSearch = useCallback(
    (search: string) => {
      const newPagination = { ...tableState.pagination, pageIndex: 0 };
      setTableState((prev) => ({
        ...prev,
        search,
        pagination: newPagination,
      }));
      updateURL({ search, pagination: newPagination });
    },
    [tableState.pagination, updateURL]
  );

  const setSorting: OnChangeFn<SortingState> = useCallback(
    (updaterOrValue) => {
      setTableState((prev) => {
        const newSorting = handleUpdaterOrValue(updaterOrValue, prev.sorting);
        updateURL({ sorting: newSorting });
        return { ...prev, sorting: newSorting };
      });
    },
    [updateURL]
  );

  const setColumnFilters: OnChangeFn<ColumnFiltersState> = useCallback(
    (updaterOrValue) => {
      setTableState((prev) => {
        const newFilters = handleUpdaterOrValue(
          updaterOrValue,
          prev.columnFilters
        );
        const newPagination = { ...prev.pagination, pageIndex: 0 };
        updateURL({ columnFilters: newFilters, pagination: newPagination });
        return {
          ...prev,
          columnFilters: newFilters,
          pagination: newPagination,
        };
      });
    },
    [updateURL]
  );

  const setPagination: OnChangeFn<PaginationState> = useCallback(
    (updaterOrValue) => {
      setTableState((prev) => {
        const newPagination = handleUpdaterOrValue(
          updaterOrValue,
          prev.pagination
        );
        updateURL({ pagination: newPagination });
        return { ...prev, pagination: newPagination };
      });
    },
    [updateURL]
  );

  const setColumnVisibility: OnChangeFn<VisibilityState> = useCallback(
    (updaterOrValue) => {
      setTableState((prev) => {
        const newVisibility = handleUpdaterOrValue(
          updaterOrValue,
          prev.columnVisibility
        );
        updateURL({ columnVisibility: newVisibility });
        return { ...prev, columnVisibility: newVisibility };
      });
    },
    [updateURL]
  );

  const setRowSelection: OnChangeFn<Record<string, boolean>> = useCallback(
    (updaterOrValue) => {
      setTableState((prev) => {
        const newSelection = handleUpdaterOrValue(
          updaterOrValue,
          prev.rowSelection
        );
        // Don't update URL for row selection as it's transient
        return { ...prev, rowSelection: newSelection };
      });
    },
    []
  );

  // Reset functions
  const resetSearch = useCallback(() => setSearch(""), [setSearch]);

  const resetFilters = useCallback(() => {
    const newPagination = { ...tableState.pagination, pageIndex: 0 };
    setTableState((prev) => ({
      ...prev,
      columnFilters: [],
      pagination: newPagination,
    }));
    updateURL({ columnFilters: [], pagination: newPagination });
  }, [tableState.pagination, updateURL]);

  const resetAll = useCallback(() => {
    const resetState = {
      search: "",
      sorting: [],
      columnFilters: [],
      pagination: { pageIndex: 0, pageSize: defaultPageSize },
    };
    setTableState((prev) => ({ ...prev, ...resetState }));
    updateURL(resetState);
  }, [defaultPageSize, updateURL]);

  // Computed values
  const hasActiveFilters = useMemo(
    () => tableState.search.length > 0 || tableState.columnFilters.length > 0,
    [tableState.search, tableState.columnFilters]
  );

  return {
    // State
    tableState,

    // Setters (properly typed for TanStack Table)
    setSearch,
    setSorting,
    setColumnFilters,
    setPagination,
    setColumnVisibility,
    setRowSelection,

    // Reset functions
    resetSearch,
    resetFilters,
    resetAll,

    // Computed
    hasActiveFilters,
  };
};
