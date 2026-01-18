"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

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
}

export default function CustomTab({
  items,
  defaultValue,
  className,
  listClassName,
  triggerClassName,
  contentClassName,
  queryKey = "tab",
}: CustomTabProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedTab =
    searchParams.get(queryKey) ?? defaultValue ?? items[0]?.value;

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams();
    params.set(queryKey, value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  if (!items.length) return null;

  return (
    <Tabs
      value={selectedTab}
      onValueChange={handleTabChange}
      className={cn("flex flex-col h-full w-full", className)}
    >
      {/* Tab Headers - Fixed height */}
      <TabsList
        className={cn(
          "flex w-full rounded-xl p-1 bg-background-tertiary shrink-0",
          listClassName
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
              "max-w-[200px] w-full min-w-[140px]",
              triggerClassName
            )}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tab Content - Scrollable area */}
      {items.map(({ value, render }) => (
        <TabsContent
          key={value}
          value={value}
          className={cn(
            "focus:outline-none bg-white rounded-t-xl",
            "flex-1 min-h-0 overflow-y-auto no-scrollbar sm:py-3",
            contentClassName
          )}
        >
          {render()}
        </TabsContent>
      ))}
    </Tabs>
  );
}
