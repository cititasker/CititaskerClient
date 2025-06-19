"use client";
import React from "react";
import { tabs } from "./_components/data";
import CustomTab from "@/components/reusables/CustomTab";

export default function Page() {
  return (
    <div className="relative">
      <CustomTab
        items={tabs}
        className=""
        triggerClassName="py-5 px-[30px] font-normal"
        listClassName="mb-[30px] sticky top-0 bg-white z-10"
        contentClassName="px-[50px]"
      />
    </div>
  );
}
