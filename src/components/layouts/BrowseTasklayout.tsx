// components/browse-task/BrowseTasklayout.tsx
"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import FilterList from "@/components/browseTask/FilterList";
import TaskList from "@/components/browseTask/Tasklist";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface BrowseTasklayoutProps {
  children: React.ReactNode;
}

export function BrowseTasklayout({ children }: BrowseTasklayoutProps) {
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Determine if we're on a detail page
  const isDetailPage = useMemo(() => {
    return pathname !== "/browse-task" && pathname.startsWith("/browse-task/");
  }, [pathname]);

  // Mobile: hide shell on detail pages
  if (!isDesktop && isDetailPage) {
    return (
      <div className="min-h-dvh pt-[90px] bg-[#F3F5F6]">
        <div className="container-w py-0">{children}</div>
      </div>
    );
  }

  // Desktop: always show three-column layout
  return (
    <div className="min-h-dvh pt-[90px] bg-[#F3F5F6]">
      <div className="container-w py-0 flex flex-row gap-3 relative overflow-y-auto">
        {/* Filter Column - Desktop Only, Always Visible */}
        <aside className="basis-1/4 w-fit sticky top-5 md:pt-3 hidden xl:inline-block overflow-auto h-[calc(100dvh-90px)] no-scrollbar">
          <FilterList />
        </aside>

        <main className="flex gap-[14px] w-full xl:w-3/4 h-[calc(100dvh-90px)]">
          {/* Task List Column - Desktop Only, Always Visible */}
          <div className="w-full hidden md:inline-block sm:max-w-[300px] lg:basis-1/3 h-full overflow-y-auto pt-3 hide-scrollbar">
            <TaskList />
          </div>

          {/* Dynamic Content Column - Route-Driven */}
          <div className="h-full flex-1 overflow-y-auto md:pt-3 max-w-full no-scrollbar">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
