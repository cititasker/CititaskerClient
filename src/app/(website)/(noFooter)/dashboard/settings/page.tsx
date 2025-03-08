"use client";
import Account from "@/components/dashboard/Account";
import CustomTab from "@/components/dashboard/CustomTab";
import Notification from "@/components/dashboard/Notification";
import Security from "@/components/dashboard/Security";
import React from "react";

const page = () => {
  const tabs = ["Account", "Notification", "Security"];
  return (
    <CustomTab tabs={tabs}>
      <Account />
      <Notification />
      <Security />
    </CustomTab>
  );
};

export default page;
