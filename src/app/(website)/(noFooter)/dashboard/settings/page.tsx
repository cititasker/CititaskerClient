"use client";
import Account from "@/components/dashboard/Account";
import CustomTab from "@/components/dashboard/CustomTab";
import Notification from "@/components/dashboard/Notification";
import Security from "@/components/dashboard/Security";
import Verifications from "@/components/dashboard/Verifications";
import React from "react";

export default function Page() {
  const tabs = ["Account", "Notification", "Security", "Verification"];
  return (
    <CustomTab tabs={tabs}>
      <Account />
      <Notification />
      <Security />
      <Verifications />
    </CustomTab>
  );
}
