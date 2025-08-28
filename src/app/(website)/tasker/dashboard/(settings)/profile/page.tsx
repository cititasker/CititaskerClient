"use client";
import React from "react";
import CustomTab from "@/components/reusables/CustomTab";
import { tabs } from "./_components/data";

export default function Page() {
  return (
    <div className="relative bg-white h-full overflow-auto no-scrollbar">
      <CustomTab
        items={tabs}
        triggerClassName="py-5 px-[30px] font-normal"
        listClassName="sticky top-0 bg-white z-10"
        contentClassName="px-5 pt-[30px] sm:px-[30px] lg:px-[50px] h-full"
      />
    </div>
  );
}
