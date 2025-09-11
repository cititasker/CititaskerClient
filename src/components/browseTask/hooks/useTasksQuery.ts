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
      subcategories: "sub_category_id",
    };

    const params: Record<string, any> = {};

    searchParams.forEach((value, key) => {
      const mappedKey = paramMap[key] || key;
      // Convert distance from km to meters, parse numbers appropriately
      if (key === "distance") {
        params[mappedKey] = parseFloat(value) * 1000;
      } else if (key === "min" || key === "max") {
        params[mappedKey] = parseFloat(value);
      } else {
        params[mappedKey] = value;
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
