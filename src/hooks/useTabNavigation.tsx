'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo, useEffect, useState } from 'react';

type Tab = {
  value: string;
  label: string | React.JSX.Element;
  content: React.ReactNode;
};

type Options = {
  updateQuery?: boolean;
};

export function useTabNavigation(
  tabs: Tab[],
  defaultTabValue: string,
  options: Options = {},
) {
  const { updateQuery = true } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryTab = searchParams.get('tab') || undefined;
  const [localTab, setLocalTab] = useState(defaultTabValue);

  // Use query param if updateQuery is true, otherwise use local state
  const currentTab = updateQuery ? queryTab : localTab;

  const validTab = useMemo(() => {
    return currentTab && tabs.some((t) => t.value === currentTab)
      ? currentTab
      : defaultTabValue;
  }, [currentTab, tabs, defaultTabValue]);

  useEffect(() => {
    if (!updateQuery) return;
    if (queryTab) return;

    const params = new URLSearchParams(searchParams);
    params.set('tab', defaultTabValue);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [queryTab, defaultTabValue, pathname, router, searchParams, updateQuery]);

  const setTab = useCallback(
    (value: string) => {
      if (updateQuery) {
        const params = new URLSearchParams(searchParams);
        params.set('tab', value);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      } else {
        setLocalTab(value);
      }
    },
    [pathname, router, searchParams, updateQuery],
  );

  return { validTab, setTab };
}
