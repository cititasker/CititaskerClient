import React from "react";
import DashboardSidebar from "../dashboard/DashboardSidebar";

const DashboardLayout = ({ children }: IChildren) => {
  return (
    <div className=" p-top bg-light-grey h-dvh relative">
      <div className="container hide-scrollbar h-full relative overflow-y-auto">
        {/* <VerificationBanner /> */}
        <div className="w-full h-[calc(100%-14px)] flex gap-5 mt-[14px]">
          <DashboardSidebar />
          <div className="paper hide-scrollbar h-full overflow-y-auto flex-1 rounded-b-none">
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
