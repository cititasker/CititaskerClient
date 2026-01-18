import { useGetMyTasks } from "@/services/tasks/tasks.hook";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function useMyTasksQuery() {
  const searchParams = useSearchParams();

  const queryParams = useMemo(() => {
    const params: Record<string, any> = {};

    // Get status filter
    const status = searchParams.get("status");
    if (status && status !== "all") {
      params.status = status;
    }

    // Get search term
    const search = searchParams.get("search");
    if (search) {
      params.search = search;
    }

    return params;
  }, [searchParams]);

  const query = useGetMyTasks(queryParams);

  const tasks = useMemo(
    () => query.data?.pages.flatMap((page) => page.data?.data || []) || [],
    [query.data]
  );

  return { ...query, tasks };
}
