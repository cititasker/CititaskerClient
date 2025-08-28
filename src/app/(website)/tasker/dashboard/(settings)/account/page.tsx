"use client";
import React from "react";
import { tabs } from "./_components/data";
import CustomTab from "@/components/reusables/CustomTab";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  return (
    <div className="relative bg-white h-full overflow-auto no-scrollbar">
      <CustomTab
        items={tabs}
        defaultId={activeTab ?? undefined}
        triggerClassName="py-5 px-[30px] font-normal"
        listClassName="mb-[30px] sticky top-0 bg-white z-10"
        contentClassName="px-5 sm:px-[30px] lg:px-[50px]"
      />
    </div>
  );
}
