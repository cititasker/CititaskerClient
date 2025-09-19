"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
    const params = new URLSearchParams(searchParams.toString());
    params.set(queryKey, value);
    router.replace(`?${params.toString()}`);
  };

  if (!items.length) return null;

  return (
    <Tabs
      value={selectedTab}
      onValueChange={handleTabChange}
      className={cn("w-full h-[calc(100%-45px)]", className)}
    >
      <TabsList
        className={cn(
          " w-full rounded-xl p-1 bg-background-tertiary",
          // `grid-cols-${items.length}`,
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

      {items.map(({ value, render }) => (
        <TabsContent
          key={value}
          value={value}
          className={cn(
            "focus:outline-none bg-white h-full rounded-xl py-5 md:py-8 overflow-y-auto no-scrollbar",
            contentClassName
          )}
        >
          {render()}
        </TabsContent>
      ))}
    </Tabs>
  );
}
