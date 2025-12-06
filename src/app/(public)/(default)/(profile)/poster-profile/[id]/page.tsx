"use client";
import CustomTab from "@/components/reusables/CustomTab";
import PublicProfile from "@/components/shared/dashboard/profile/public-view/components/PublicProfile";
import { useParams } from "next/navigation";

export default function Page() {
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
      contentClassName="p-5 sm:p-8 lg:px-12 lg:py-8 h-full"
    />
  );
}
