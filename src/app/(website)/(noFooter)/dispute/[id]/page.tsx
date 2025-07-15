import React from "react";
import Sidebar from "../_components/Sidebar";
import TopCard from "../_components/TopCard";
import BottomCard from "../_components/BottomCard";

export default function Page() {
  return (
    <div className="bg-light-grey min-h-dvh">
      <div className="container-w p-top w-full min-h-[calc(100%-14px)] flex gap-5 flex-col lg:flex-row">
        <Sidebar />
        <div className="h-full overflow-y-auto w-ful flex-1 rounded-t-30">
          <TopCard />
          <BottomCard />
        </div>
      </div>
    </div>
  );
}
