import { auth } from "@/auth";
import DashboardSidebar from "@/components/dashboard/sidebar/DashboardSidebar";
import React from "react";

const DashboardLayout = async ({ children }: IChildren) => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="bg-light-grey relative h-full">
      <div className="container-w py-0 relative h-full">
        <div className="relative p-top w-full h-full flex gap-3 md:gap-5 overflow-y-auto">
          <DashboardSidebar role={user?.role} />
          <div className="h-full w-full flex-1 rounded-b-none overflow-auto no-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
