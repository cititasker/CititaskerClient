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
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("search") || ""
  );

  const [filters, setFilters] = useState<Record<string, any>>(() => {
    const params: Record<string, any> = {};
    searchParams.forEach((value, key) => {
      if (key !== "page" && key !== "limit" && key !== "search") {
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
    [searchParams, defaultPageSize]
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

    return { ...params, ...filters };
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

      // Only update if URL actually changed
      if (newUrl !== currentUrl) {
        router.replace(newUrl ? `${pathname}?${newUrl}` : pathname, {
          scroll: false,
        });
      }
    },
    [persistInUrl, pathname, router, searchParams]
  );

  const onPaginationChange = useCallback(
    ({ pageIndex, pageSize }: PaginationState) => {
      updateUrl({ page: pageIndex + 1, limit: pageSize });
    },
    [updateUrl]
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
    [resetPageOnChange, updateUrl]
  );

  const resetAll = useCallback(() => {
    setSearchTerm("");
    setFilters({});
    updateUrl({ search: undefined, page: 1, limit: pagination.pageSize });
  }, [updateUrl, pagination.pageSize]);

  const resetPage = useCallback(() => {
    updateUrl({ page: 1 });
  }, [updateUrl]);

  // Track previous search to avoid infinite loops
  const prevSearchRef = useRef(searchParams.get("search") || "");

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";

    // Only update if debounced search changed AND it's different from URL
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
    return Boolean(searchTerm) || Object.keys(filters).length > 0;
  }, [searchTerm, filters]);

  const appliedFilterCount = useMemo(() => {
    return Object.keys(filters).length + (searchTerm ? 1 : 0);
  }, [filters, searchTerm]);

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
