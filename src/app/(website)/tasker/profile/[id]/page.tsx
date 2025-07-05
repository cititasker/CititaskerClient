"use client";
import CustomTab from "@/components/reusables/CustomTab";
import ProfileSidebar from "../_components/ProfileSidebar";
import PersonalDetailsPreview from "@/components/tasker/ProfileView/PersonalDetailsPreview";
import { useMemo } from "react";
import Portfolio from "../_components/portfolio/Portfolio";

export default function page() {
  const previewData = useMemo(() => {
    return {
      bio: "",
      skills: [],
      certificates: [],
    };
  }, []);

  const tabs = [
    {
      label: "Profile",
      value: "profile",
      render: () => <PersonalDetailsPreview data={previewData} />,
    },
    {
      label: "Porfolio",
      value: "portfolio",
      render: () => <Portfolio />,
    },
  ];
  return (
    <div className=" p-top bg-light-grey h-dvh relative">
      <div className="container h-full relative overflow-y-auto">
        <div className="w-full h-[calc(100%-14px)] flex gap-5 mt-[14px]">
          <ProfileSidebar />
          <div className="paper h-full overflow-y-auto flex-1 rounded-b-none">
            <div className="w-full pb-10">
              <div className="relative w-full">
                <CustomTab
                  items={tabs}
                  className=""
                  triggerClassName="py-5 px-[30px] font-normal"
                  listClassName="mb-[30px] sticky top-0 bg-white z-10"
                  contentClassName="p-5 sm:px-[30px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
