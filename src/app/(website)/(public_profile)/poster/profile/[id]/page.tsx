"use client";
import CustomTab from "@/components/reusables/CustomTab";
import { useParams } from "next/navigation";
import Profile from "../../../_components/profile";

export default function page() {
  const params = useParams();
  const id = params.id;

  const tabs = [
    {
      label: "Profile",
      value: "profile",
      render: () => <Profile id={id} />,
    },
  ];
  return (
    <CustomTab
      items={tabs}
      triggerClassName="py-5 px-[30px] font-normal"
      listClassName="mb-5 sm:mb-[30px] sticky top-0 bg-white z-10"
      contentClassName="px-5 sm:px-[30px]"
    />
  );
}
