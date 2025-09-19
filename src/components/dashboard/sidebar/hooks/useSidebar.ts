import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setSidebarOpen } from "@/store/slices/general";
import { useState, useCallback, useEffect } from "react";

const STORAGE_KEYS = {
  sidebar: "dashboard-sidebar-open",
  expanded: "sidebar-expanded-items",
} as const;

const getStoredValue = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const setStoredValue = (key: string, value: unknown) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const useSidebar = () => {
  const dispatch = useAppDispatch();
  const showSidebar = useAppSelector((state) => state.general.showSidebar);

  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    () => new Set(getStoredValue(STORAGE_KEYS.expanded, []))
  );

  // Sync expanded items to localStorage
  useEffect(() => {
    setStoredValue(STORAGE_KEYS.expanded, [...expandedItems]);
  }, [expandedItems]);

  const toggleSidebar = useCallback(() => {
    const newValue = !showSidebar;
    dispatch(setSidebarOpen(newValue));
    setStoredValue(STORAGE_KEYS.sidebar, newValue);
  }, [dispatch, showSidebar]);

  const setSidebar = useCallback(
    (isOpen: boolean) => {
      if (showSidebar !== isOpen) {
        dispatch(setSidebarOpen(isOpen));
        setStoredValue(STORAGE_KEYS.sidebar, isOpen);
      }
    },
    [dispatch, showSidebar]
  );

  const toggleExpanded = useCallback((key: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }, []);

  return {
    isOpen: showSidebar,
    toggleSidebar,
    setSidebar,
    openSidebar: useCallback(() => setSidebar(true), [setSidebar]),
    closeSidebar: useCallback(() => setSidebar(false), [setSidebar]),
    expandedItems,
    toggleExpanded,
    isExpanded: useCallback(
      (key: string) => expandedItems.has(key),
      [expandedItems]
    ),
    clearExpanded: useCallback(() => setExpandedItems(new Set()), []),
  };
};
