"use client";
// import PosterPayment from "@/components/dashboard/poster/Payment";
import React from "react";
import CustomTab from "@/components/reusables/CustomTab";
import { tabs } from "./_components/data";

export default function Page() {
  return (
    <CustomTab
      items={tabs}
      listClassName="sticky top-0"
      contentClassName="px-5 sm:px-[30px] md:px-[50px] pb-5 sm:pb-[30px] h-full"
    />
  );
}
