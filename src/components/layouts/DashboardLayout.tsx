import { auth } from "@/auth";
import DashboardSidebar from "@/components/dashboard/sidebar/DashboardSidebar";
import React from "react";

const DashboardLayout = async ({ children }: IChildren) => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="p-top bg-light-grey min-h-screen relative">
      <div className="container-w py-0 relative min-h-screen flex flex-col md:flex-row gap-3 md:gap-5">
        <DashboardSidebar role={user?.role} />

        <main className="flex-1 min-w-0">
          <div className="h-full min-h-screen overflow-y-auto no-scrollbar">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
