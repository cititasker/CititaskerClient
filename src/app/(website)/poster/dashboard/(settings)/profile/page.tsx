"use client";
import React from "react";
// import Profile from "@/components/shared/dashboard/profile";
import ProfileEditor from "@/components/shared/dashboard/profile/ProfileEditor";
import CustomTab from "@/components/reusables/CustomTab";

const tabs = [
  {
    label: "Profile",
    value: "profile",
    render: () => <ProfileEditor />,
  },
];

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
