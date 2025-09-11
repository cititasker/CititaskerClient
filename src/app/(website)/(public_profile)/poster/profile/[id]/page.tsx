"use client";
import CustomTab from "@/components/reusables/CustomTab";
import PublicProfile from "@/components/shared/dashboard/profile/public-view/PublicProfile";
import { useParams } from "next/navigation";

export default function page() {
  const params = useParams();
  const id = params.id as string;

  const tabs = [
    {
      label: "Profile",
      value: "profile",
      render: () => <PublicProfile id={id} />,
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
