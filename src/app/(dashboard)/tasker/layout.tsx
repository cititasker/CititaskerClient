import DashboardSidebar from "@/components/dashboard/sidebar/DashboardSidebar";
import { requireRole } from "@/lib/auth-utils";
import React from "react";

export default async function TaskerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["tasker"]);

  return (
    <div className="relative p-top w-full flex-1 flex flex-col md:flex-row gap-3 md:gap-5 overflow-hidden">
      <DashboardSidebar role="tasker" />
      <main className="flex-1 min-w-0 overflow-y-auto no-scrollbar">
        {children}
      </main>
    </div>
  );
}
