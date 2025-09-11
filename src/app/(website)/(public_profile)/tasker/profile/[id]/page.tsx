"use client";
import React from "react";
import CustomTab from "@/components/reusables/CustomTab";
import { useParams } from "next/navigation";
import Portfolio from "../../../_components/portfolio/Portfolio";
import PublicProfile from "@/components/shared/dashboard/profile/public-view/PublicProfile";
import FAQList from "@/app/(website)/tasker/dashboard/(settings)/profile/faq/FAQList";

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
      contentClassName="px-5 sm:px-[30px] pb-5 sm:pb-[30px] h-full"
    />
  );
}
