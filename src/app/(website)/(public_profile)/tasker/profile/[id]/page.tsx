"use client";
import FAQList from "@/app/(website)/tasker/dashboard/(settings)/profile/_components/FAQList";
import CustomTab from "@/components/reusables/CustomTab";
import { useParams } from "next/navigation";
import Portfolio from "../../../_components/portfolio/Portfolio";
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
    {
      label: "Porfolio",
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
      className=""
      triggerClassName="py-5 px-[30px] font-normal"
      listClassName="mb-5 sm:mb-[30px] sticky top-0 bg-white z-10"
      contentClassName="px-5 sm:px-[30px]"
    />
  );
}
