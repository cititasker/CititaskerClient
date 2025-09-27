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
      <CustomTab items={tabs} contentClassName="p-5 sm:p-8 lg:px-12 lg:py-8" />
    </div>
  );
}
