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
      contentClassName="p-5 sm:p-8 lg:px-12 lg:py-8"
    />
  );
}

// <PosterPayment />
