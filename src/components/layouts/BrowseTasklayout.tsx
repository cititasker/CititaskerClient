import React from "react";
import FilterList from "../browseTask/FilterList";
import Tasklist from "../browseTask/Tasklist";

const BrowseTasklayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh pt-[95px] bg-[#F3F5F6]">
      <div className="container flex flex-row gap-3 relative   overflow-y-auto">
        <div className="basis-1/4 w-fit sticky top-5 pt-3">
          <FilterList />
        </div>
        <div className="flex gap-[14px] w-3/4 h-[calc(100dvh-95px)]">
          <div className="basis-1/3 h-full overflow-y-auto pt-3 hide-scrollbar">
            <Tasklist />
          </div>

          <div className="h-full overflow-y-auto w-2/3 hide-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseTasklayout;
