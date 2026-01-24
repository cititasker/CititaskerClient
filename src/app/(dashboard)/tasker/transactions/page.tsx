"use client";
import React from "react";
import CustomTab from "@/components/reusables/CustomTab";
import { tabs } from "@/components/dashboard/transactions/tasker/data";

export default function Page() {
  return (
    <div className="max-w-[1400px] mx-auto w-full">
      <CustomTab
        items={tabs}
        mobileAsCards={false}
        contentClassName="p-4 sm:p-6 lg:p-8"
      />
    </div>
  );
}
