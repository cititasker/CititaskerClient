import DashboardSidebar from "@/components/dashboard/sidebar/DashboardSidebar";
import { requireRole } from "@/lib/auth-utils";
import { generateLayoutMetadata } from "@/lib/metadata-helper";
import React from "react";

export const metadata = generateLayoutMetadata({
  title: "Poster Dashboard",
  noIndex: true,
});

export default async function PosterDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["poster"]);

  return (
    <div className="relative p-top w-full flex-1 flex flex-col md:flex-row gap-3 md:gap-5 overflow-hidden">
      <DashboardSidebar role="poster" />
      <main className="flex-1 min-w-0 overflow-y-auto no-scrollbar">
        {children}
      </main>
    </div>
  );
}
