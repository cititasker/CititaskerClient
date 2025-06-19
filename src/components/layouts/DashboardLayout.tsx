import { auth } from "@/auth";
import DashboardSidebar from "@/components/dashboard/sidebar/DashboardSidebar";
import React from "react";

const DashboardLayout = async ({ children }: IChildren) => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="bg-light-grey relative">
      <div className="container relative">
        <div className="h-dvh relative p-top w-full flex gap-5 overflow-y-auto hide-scrollbar">
          <DashboardSidebar role={user?.role} />
          <div className="paper h-full w-full flex-1 rounded-b-none overflow-auto no-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
