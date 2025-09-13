"use client";
import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";

export function useTaskCardUrl(path: string, taskId: number) {
  const params = useParams();
  const searchParams = useSearchParams();

  const isActive = taskId === Number(params?.id);

  const href = useMemo(() => {
    const sp = new URLSearchParams();

    // Preserve existing search params
    searchParams.forEach((value, key) => {
      sp.set(key, value);
    });

    return `${path}/${taskId}?${sp.toString()}`;
  }, [path, taskId, searchParams]);

  return { href, isActive };
}
