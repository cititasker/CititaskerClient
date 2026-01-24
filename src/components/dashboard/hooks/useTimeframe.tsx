import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const DEFAULT_EXPENSE_TIMEFRAME = "last-7-days";

export const useTimeframe = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const timeframe = searchParams.get("timeframe") || DEFAULT_EXPENSE_TIMEFRAME;

  const setTimeframe = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("timeframe", value);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  return { timeframe, setTimeframe };
};
