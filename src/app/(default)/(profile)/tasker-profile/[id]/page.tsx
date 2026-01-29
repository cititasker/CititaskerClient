"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import CustomTab from "@/components/reusables/CustomTab";
import { useGetUserProfile } from "@/services/user/user.hook";

import PublicProfile from "@/components/shared/dashboard/profile/public-view/components/PublicProfile";
import Portfolio from "@/components/shared/public-profile/portfolio/Portfolio";
import FAQList from "@/app/(dashboard)/tasker/(settings)/profile/faq/FAQList";

export default function PublicProfilePage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetUserProfile({ id });

  const user = useMemo(() => data?.data, [data]);

  const tabs = useMemo(
    () => [
      {
        label: "Profile",
        value: "profile",
        render: () => (
          <PublicProfile id={id} data={user} isLoading={isLoading} />
        ),
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
    ],
    [id, user, isLoading],
  );

  return (
    <div className="w-full h-full">
      <CustomTab
        items={tabs}
        contentClassName="p-5 sm:p-8 bg-white rounded-lg"
      />
    </div>
  );
}
