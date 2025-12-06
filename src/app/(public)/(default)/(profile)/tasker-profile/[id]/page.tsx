"use client";
import React from "react";
import CustomTab from "@/components/reusables/CustomTab";
import { useParams } from "next/navigation";
import PublicProfile from "@/components/shared/dashboard/profile/public-view/components/PublicProfile";
import Portfolio from "@/components/shared/public-profile/portfolio/Portfolio";
import FAQList from "@/app/(protected)/(dashboard)/tasker/(settings)/profile/faq/FAQList";

export default function PublicProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const tabs = [
    {
      label: "Profile",
      value: "profile",
      render: () => <PublicProfile id={id} />,
    },
    {
      label: "Portfolio",
      value: "portfolio",
      render: () => <Portfolio id={id} />,
    },
    {
      label: "FAQ",
      value: "faq",
      render: () => <FAQList id={id} isEdit={false} />,
    },
  ];

  return (
    <CustomTab
      items={tabs}
      listClassName="sticky top-0"
      contentClassName="p-5 sm:p-8 lg:px-12 lg:py-8 h-full"
    />
  );
}
