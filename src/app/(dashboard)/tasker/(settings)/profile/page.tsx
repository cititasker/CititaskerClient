"use client";
import React from "react";
import CustomTab from "@/components/reusables/CustomTab";
import { tabs } from "./portfolio/data";

export default function Page() {
  return (
    <div className="w-full h-full">
      <CustomTab
        items={tabs}
        contentClassName="p-5 sm:p-8 bg-white rounded-lg"
      />
    </div>
  );
}
