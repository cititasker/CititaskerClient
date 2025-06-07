"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabItem {
  label: string;
  id?: string; // Optional key to avoid using label directly
  content: React.ReactNode;
}

interface CustomTabProps {
  items: TabItem[];
  defaultId?: string;
  className?: string;
  listClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

const CustomTab: React.FC<CustomTabProps> = ({
  items,
  defaultId,
  className,
  listClassName,
  triggerClassName,
  contentClassName,
}) => {
  const tabItems = items.map((item) => ({
    ...item,
    id: item.id ?? item.label.toLowerCase().replace(/\s+/g, "-"),
  }));

  const defaultValue = defaultId ?? tabItems[0]?.id;

  return (
    <Tabs defaultValue={defaultValue} className={cn("pb-10", className)}>
      <TabsList
        className={cn(
          "bg-transparent p-0 gap-4 border-b border-border rounded-none shadow-none",
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

      {tabItems.map(({ id, content }) => (
        <TabsContent
          key={id}
          value={id}
          className={cn("overflow-y-auto", contentClassName)}
        >
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTab;
