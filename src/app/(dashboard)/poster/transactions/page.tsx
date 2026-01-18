"use client";
import React from "react";
import CustomTab from "@/components/reusables/CustomTab";
import { tabs } from "@/components/dashboard/transactions/poster/data";

export default function Page() {
  return <CustomTab items={tabs} contentClassName="p-5 sm:p-8 h-full" />;
}
