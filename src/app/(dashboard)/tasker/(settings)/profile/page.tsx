"use client";
import React from "react";
import CustomTab from "@/components/reusables/CustomTab";
import { tabs } from "./portfolio/data";

export default function Page() {
  return (
    <div className="relative h-full">
      <CustomTab items={tabs} contentClassName="p-5 sm:p-8 lg:px-12 lg:py-8" />
    </div>
  );
}
