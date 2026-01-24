"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabItem {
  label: string;
  value: string;
  render: () => React.ReactNode;
}

interface CustomTabProps {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
  listClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  queryKey?: string;
  syncWithQuery?: boolean;
  mobileAsCards?: boolean; // New prop to control mobile rendering
}

const MobileCardSection = memo(
  ({
    label,
    children,
    contentClassName,
  }: {
    label: string;
    children: React.ReactNode;
    contentClassName?: string;
  }) => (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <header className="px-4 py-3 border-b border-gray-100 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-900">{label}</h3>
      </header>
      <div className={cn("p-4", contentClassName)}>{children}</div>
    </section>
  ),
);

MobileCardSection.displayName = "MobileCardSection";

export default function CustomTab({
  items,
  defaultValue,
  className,
  listClassName,
  triggerClassName,
  contentClassName,
  queryKey = "tab",
  syncWithQuery = true,
  mobileAsCards = true,
}: CustomTabProps) {
  const searchParams = useSearchParams();

  const initialTab = useMemo(() => {
    return (
      (syncWithQuery && searchParams.get(queryKey)) ||
      defaultValue ||
      items[0]?.value
    );
  }, [syncWithQuery, searchParams, queryKey, defaultValue, items]);

  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = useCallback(
    (value: string) => {
      setActiveTab(value);

      if (!syncWithQuery) return;

      const params = new URLSearchParams(window.location.search);
      params.set(queryKey, value);

      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${params.toString()}`,
      );
    },
    [syncWithQuery, queryKey],
  );

  if (!items.length) {
    return null;
  }

  return (
    <div className={cn("h-full w-full", className)}>
      {/* ================= DESKTOP / TABLET TABS ================= */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className={cn(
          "flex-col h-full",
          mobileAsCards ? "hidden sm:flex" : "flex",
        )}
      >
        <TabsList
          className={cn(
            "w-fit flex rounded-xl p-1 bg-background-tertiary shrink-0",
            listClassName,
          )}
        >
          {items.map(({ label, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className={cn(
                "data-[state=active]:bg-background data-[state=active]:text-primary",
                "data-[state=active]:shadow-sm transition-all duration-200",
                "text-text-muted hover:text-text-primary font-medium",
                "px-4 py-2.5 rounded-lg min-w-[160px]",
                triggerClassName,
              )}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {items.map(({ value, render }) => (
          <TabsContent
            key={value}
            value={value}
            className={cn(
              "focus:outline-none bg-white rounded-xl mt-0",
              "flex-1 min-h-0 overflow-y-auto no-scrollbar",
              contentClassName,
            )}
          >
            {render()}
          </TabsContent>
        ))}
      </Tabs>

      {/* ================= MOBILE RENDERING ================= */}
      {mobileAsCards ? (
        // Render as stacked cards on mobile
        <div className="flex flex-col gap-5 sm:hidden">
          {items.map(({ label, value, render }) => (
            <MobileCardSection
              key={value}
              label={label}
              contentClassName={contentClassName}
            >
              {render()}
            </MobileCardSection>
          ))}
        </div>
      ) : null}
    </div>
  );
}
