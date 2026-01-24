"use client";
import CustomTab from "@/components/reusables/CustomTab";
import PublicProfile from "@/components/shared/dashboard/profile/public-view/components/PublicProfile";
import { useGetUserProfile } from "@/services/user/user.hook";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading } = useGetUserProfile({ id });

  const tabs = [
    {
      label: "Profile",
      value: "profile",
      render: () => (
        <PublicProfile id={id} data={data?.data} isLoading={isLoading} />
      ),
    },
  ];
  return (
    <div className="w-full h-full">
      <CustomTab
        items={tabs}
        contentClassName="p-5 sm:p-8 bg-white rounded-lg shadow-sm"
      />
    </div>
  );
}
