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
          {/* Main Content */}
          <main className="flex-1 min-w-0 overflow-hidden">
            <div className="h-full overflow-y-auto no-scrollbar">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
