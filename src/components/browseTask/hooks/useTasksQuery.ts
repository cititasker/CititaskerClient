import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useGetAllTasks } from "@/services/tasks/tasks.hook";

export function useTasksQuery() {
  const searchParams = useSearchParams();

  const queryParams = useMemo(() => {
    const paramMap: Record<string, string> = {
      min: "min_amount",
      max: "max_amount",
      lat: "latitude",
      lng: "longitude",
      category_id: "categories",
      sub_category_id: "sub_categories",
    };

    const params: Record<string, any> = {};

    searchParams.forEach((value, key) => {
      const mappedKey = paramMap[key] || key;
      // Handle category_id and sub_category_id as arrays
      if (key === "category_id" || key === "sub_category_id") {
        const ids = value.split(",").map(Number).filter(Boolean);
        if (ids.length > 0) {
          params[mappedKey] = ids;
        }
      } else {
        // Convert distance from km to meters
        if (key === "distance") {
          params[mappedKey] = parseFloat(value) * 1000;
        }
        // Parse min/max as numbers
        else if (key === "min" || key === "max") {
          params[mappedKey] = parseFloat(value);
        }
        // Keep other params as-is
        else {
          params[mappedKey] = value;
        }
      }
    });

    return params;
  }, [searchParams]);

  const query = useGetAllTasks(queryParams);

  const tasks = useMemo(
    () => query.data?.pages.flatMap((page) => page.data?.data || []) || [],
    [query.data]
  );

  return {
    ...query,
    tasks,
    queryParams,
  };
}
