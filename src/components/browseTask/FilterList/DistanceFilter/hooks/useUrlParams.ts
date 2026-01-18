import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface UseUrlParamsReturn {
  updateUrl: (params: Record<string, string | number>) => void;
  clearUrl: (keys: string[]) => void;
}

export function useUrlParams(setValue: any): UseUrlParamsReturn {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const distance = searchParams.get("distance");

    if (lat && lng) {
      setValue("location", [parseFloat(lat), parseFloat(lng)]);
    }
    if (distance) {
      setValue("distance", parseFloat(distance));
    }
  }, [setValue, searchParams]);

  const updateUrl = (params: Record<string, string | number>) => {
    const current = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      current.set(key, String(value));
    });
    router.push(`?${current.toString()}`);
  };

  const clearUrl = (keys: string[]) => {
    const current = new URLSearchParams(searchParams.toString());
    keys.forEach((key) => current.delete(key));
    router.push(`?${current.toString()}`);
  };

  return { updateUrl, clearUrl };
}
