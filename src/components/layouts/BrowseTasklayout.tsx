import React from "react";
import FilterList from "../browseTask/FilterList";
import TaskList from "../browseTask/Tasklist";

export default function BrowseTasklayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh pt-[90px] bg-[#F3F5F6]">
      <div className="container-w py-0 flex flex-row gap-3 relative overflow-y-auto">
        <aside className="basis-1/4 w-fit sticky top-5 md:pt-3 hidden xl:inline-block overflow-auto h-[calc(100dvh-90px)] no-scrollbar">
          <FilterList />
        </aside>
        <main className="flex gap-[14px] w-full xl:w-3/4 h-[calc(100dvh-90px)]">
          <div className="w-full hidden md:inline-block sm:max-w-[300px] lg:basis-1/3 h-full overflow-y-auto pt-3 hide-scrollbar">
            <TaskList />
          </div>
          <div className="h-full flex-1 overflow-y-auto md:pt-3 max-w-full no-scrollbar">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
