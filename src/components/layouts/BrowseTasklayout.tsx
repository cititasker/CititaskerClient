import React from "react";
import FilterList from "../browseTask/FilterList";
import Tasklist from "../browseTask/Tasklist";

const BrowseTasklayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh pt-[90px] bg-[#F3F5F6]">
      <div className="container flex flex-row gap-3 relative   overflow-y-auto">
        <div className="basis-1/4 w-fit sticky top-5 md:pt-3 hidden xl:inline-block">
          <FilterList />
        </div>
        <div className="flex gap-[14px] w-full xl:w-3/4 h-[calc(100dvh-90px)]">
          <div className="w-full hidden md:inline-block sm:max-w-[300px] lg:basis-1/3 h-full overflow-y-auto pt-3 hide-scrollbar">
            <Tasklist />
          </div>
          <div className="h-full flex-1 overflow-y-auto md:pt-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseTasklayout;
