"use client";
// import PosterPayment from "@/components/dashboard/poster/Payment";
import React from "react";
import CustomTab from "@/components/reusables/CustomTab";
import { tabs } from "./_components/data";

export default function Page() {
  return (
    <div className="bg-white h-full overflow-auto no-scrollbar">
      <CustomTab
        items={tabs}
        className=""
        triggerClassName="py-5 px-[30px] font-normal"
        listClassName="mb-[30px] sticky top-0 bg-white z-10"
        contentClassName="px-[30px]"
      />
    </div>
  );
}
