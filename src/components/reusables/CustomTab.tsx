"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabItem {
  label: string;
  id?: string;
  render: () => React.ReactNode;
}

interface CustomTabProps {
  items: TabItem[];
  defaultId?: string;
  className?: string;
  listClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  queryKey?: string;
}

const CustomTab: React.FC<CustomTabProps> = ({
  items,
  defaultId,
  className,
  listClassName,
  triggerClassName,
  contentClassName,
  queryKey = "tab",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabItems = React.useMemo(
    () =>
      items.map((item) => ({
        ...item,
        id: item.id ?? item.label.toLowerCase().replace(/\s+/g, "-"),
      })),
    [items]
  );

  const rawSelected = searchParams.get(queryKey);
  const selectedFromQuery = rawSelected ?? undefined;
  const fallbackId = defaultId ?? tabItems[0]?.id;
  const selectedTab = tabItems.some(({ id }) => id === selectedFromQuery)
    ? selectedFromQuery
    : fallbackId;

  const handleTabChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(queryKey, val);
    router.replace(`?${params.toString()}`);
  };

  if (!tabItems.length) return null;

  return (
    <Tabs
      value={selectedTab}
      onValueChange={handleTabChange}
      className={cn("pb-10", className)}
    >
      <TabsList
        className={cn(
          "bg-transparent p-0 gap-4 border-b border-border rounded-none shadow-none w-full max-w-full",
          listClassName
        )}
      >
        {tabItems.map(({ label, id }) => (
          <TabsTrigger
            key={id}
            value={id}
            className={cn(
              "py-2 px-4 text-sm sm:text-base font-semibold text-muted-foreground border-b-2 border-transparent data-[state=active]:text-primary data-[state=active]:border-primary rounded-none",
              triggerClassName
            )}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabItems.map(({ id, render }) => (
        <TabsContent
          key={id}
          value={id}
          className={cn("relative", contentClassName)}
        >
          {render()}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTab;
