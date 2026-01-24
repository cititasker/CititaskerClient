import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebounce } from "./useDebounce";

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

interface UsePaginatedTableOptions {
  defaultPageSize?: number;
  debounceMs?: number;
  resetPageOnChange?: boolean;
  persistInUrl?: boolean;
  excludeFilterKeys?: string[];
}

interface QueryParams {
  page: number;
  limit: number;
  search?: string;
  [key: string]: any;
}

export const usePaginatedTable = (options: UsePaginatedTableOptions = {}) => {
  const {
    defaultPageSize = 10,
    debounceMs = 500,
    resetPageOnChange = true,
    persistInUrl = true,
    excludeFilterKeys = [],
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("search") || "",
  );

  const [filters, setFilters] = useState<Record<string, any>>(() => {
    const params: Record<string, any> = {};
    searchParams.forEach((value, key) => {
      if (
        key !== "page" &&
        key !== "limit" &&
        key !== "search" &&
        key !== "tab"
      ) {
        params[key] = value;
      }
    });
    return params;
  });

  const pagination = useMemo<PaginationState>(
    () => ({
      pageIndex: Math.max(0, Number(searchParams.get("page") || 1) - 1),
      pageSize: Number(searchParams.get("limit")) || defaultPageSize,
    }),
    [searchParams, defaultPageSize],
  );

  const debouncedSearch = useDebounce(searchTerm, debounceMs);

  const queryParams = useMemo<QueryParams>(() => {
    const params: QueryParams = {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    };

    if (debouncedSearch) {
      params.search = debouncedSearch;
    }

    const qp = { ...params, ...filters };
    delete qp.tab;
    return qp;
  }, [pagination.pageIndex, pagination.pageSize, debouncedSearch, filters]);

  const updateUrl = useCallback(
    (updates: Record<string, any>) => {
      if (!persistInUrl) return;

      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "" || value === null) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      const newUrl = params.toString();
      const currentUrl = searchParams.toString();

      if (newUrl !== currentUrl) {
        router.replace(newUrl ? `${pathname}?${newUrl}` : pathname, {
          scroll: false,
        });
      }
    },
    [persistInUrl, pathname, router, searchParams],
  );

  const onPaginationChange = useCallback(
    ({ pageIndex, pageSize }: PaginationState) => {
      updateUrl({ page: pageIndex + 1, limit: pageSize });
    },
    [updateUrl],
  );

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleFilters = useCallback(
    (newFilters: Record<string, any>) => {
      setFilters(newFilters);
      if (resetPageOnChange) {
        updateUrl({ ...newFilters, page: 1 });
      } else {
        updateUrl(newFilters);
      }
    },
    [resetPageOnChange, updateUrl],
  );

  const resetAll = useCallback(() => {
    setSearchTerm("");
    setFilters({});
    updateUrl({ search: undefined, page: 1, limit: defaultPageSize }); // ✅ Use defaultPageSize
  }, [updateUrl, defaultPageSize]);

  const resetPage = useCallback(() => {
    updateUrl({ page: 1 });
  }, [updateUrl]);

  const prevSearchRef = useRef(searchParams.get("search") || "");

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";

    if (
      debouncedSearch !== currentSearch &&
      prevSearchRef.current !== debouncedSearch
    ) {
      prevSearchRef.current = debouncedSearch;

      if (resetPageOnChange) {
        updateUrl({ search: debouncedSearch || undefined, page: 1 });
      } else {
        updateUrl({ search: debouncedSearch || undefined });
      }
    }
  }, [debouncedSearch, resetPageOnChange, searchParams, updateUrl]);

  const hasActiveFilters = useMemo(() => {
    const defaultExcludes = ["page", "limit", "search", "tab"];
    const allExcludes = new Set([...defaultExcludes, ...excludeFilterKeys]);

    const activeFilters = Object.entries(filters).some(([key, value]) => {
      if (allExcludes.has(key)) return false;
      if (value === undefined || value === null || value === "") return false;
      return true;
    });

    const hasSearch = Boolean(searchTerm) && !allExcludes.has("search");

    return hasSearch || activeFilters;
  }, [filters, searchTerm, excludeFilterKeys]);

  const appliedFilterCount = useMemo(() => {
    const defaultExcludes = ["page", "limit", "search", "tab"];
    const allExcludes = new Set([...defaultExcludes, ...excludeFilterKeys]);

    let count = 0;

    for (const [key, value] of Object.entries(filters)) {
      if (allExcludes.has(key)) continue;
      if (value === "" || value == null) continue;
      count++;
    }

    if (searchTerm && !allExcludes.has("search")) {
      count++;
    }

    return count;
  }, [filters, searchTerm, excludeFilterKeys]);

  return {
    queryParams,
    pagination,
    searchTerm,
    filters,
    debouncedSearch,
    onPaginationChange,
    handleSearch,
    handleFilters,
    resetAll,
    resetPage,
    hasActiveFilters,
    appliedFilterCount,
  };
};
