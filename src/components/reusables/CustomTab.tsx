import React from "react";
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
}

const CustomTab: React.FC<CustomTabProps> = ({
  items,
  defaultId,
  className,
  listClassName,
  triggerClassName,
  contentClassName,
}) => {
  const tabItems = React.useMemo(
    () =>
      items.map((item) => ({
        ...item,
        id: item.id ?? item.label.toLowerCase().replace(/\s+/g, "-"),
      })),
    [items]
  );

  const [selectedTab, setSelectedTab] = React.useState(
    defaultId ?? tabItems[0]?.id
  );

  React.useEffect(() => {
    if (tabItems.length && !tabItems.find((tab) => tab.id === selectedTab)) {
      setSelectedTab(tabItems[0]?.id);
    }
  }, [tabItems, selectedTab]);

  if (!tabItems.length) return null;

  return (
    <Tabs
      value={selectedTab}
      onValueChange={(val) => setSelectedTab(val)}
      className={cn("pb-10", className)}
      defaultValue={defaultId}
    >
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

      {tabItems.map(({ id, render }) => (
        <TabsContent
          key={id}
          value={id}
          className={cn("overflow-y-auto", contentClassName)}
        >
          {render()}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTab;
