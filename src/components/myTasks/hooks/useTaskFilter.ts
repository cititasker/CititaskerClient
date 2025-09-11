import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { TaskStatus } from "../constants";

export function useTaskFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = (searchParams.get("status") as TaskStatus) || "all";

  const updateStatus = useCallback(
    (status: TaskStatus) => {
      const current = new URLSearchParams(searchParams.toString());

      if (status === "all") {
        current.delete("status");
      } else {
        current.set("status", status);
      }

      router.push(`?${current.toString()}`);
    },
    [router, searchParams]
  );

  const clearFilter = useCallback(() => {
    const current = new URLSearchParams(searchParams.toString());
    current.delete("status");
    router.push(`?${current.toString()}`);
  }, [router, searchParams]);

  return {
    currentStatus,
    updateStatus,
    clearFilter,
  };
}
