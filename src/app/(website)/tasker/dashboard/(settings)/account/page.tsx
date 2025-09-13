"use client";
import React from "react";
import { tabs } from "./_components/data";
import CustomTab from "@/components/reusables/CustomTab";

export default function Page() {
  return (
    <div className="relative h-full">
      <CustomTab
        items={tabs}
        contentClassName="px-5 sm:px-[30px] lg:px-[50px]"
      />
    </div>
  );
}
