"use client";
import Notification from "@/components/dashboard/Notification";
import FAQ from "@/components/profile/FAQ";
import KYC from "@/components/profile/KYC";
import Licenses from "@/components/profile/Licenses";
import PersonalDetails from "@/components/profile/PersonalDetails";
import Portfolio from "@/components/profile/Portfolio";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import Reviews from "@/components/profile/Reviews";
import CustomTab from "@/components/reusables/CustomTab";
import { Box, SxProps, Theme } from "@mui/material";
import React from "react";

const tabs = [
  "Personal Details",
  "Porfolio",
  "Reviews",
  "Licenses",
  "KYC",
  "Notifications",
  "FAQ",
];

const style: Record<string, SxProps<Theme>> = {
  container: {
    mb: "30px",
    ".MuiTab-root": {
      py: "25px",
      px: "30px",
      fontSize: "16px",
      fontWeight: 400,
      textTransform: "none",
    },
  },
};

export default function Page() {
  return (
    <Box className=" p-top bg-light-grey h-dvh relative">
      <div className="container h-full relative overflow-y-auto">
        <div className="w-full h-[calc(100%-14px)] flex gap-5 mt-[14px]">
          <ProfileSidebar />
          <div className="paper h-full overflow-y-auto flex-1 rounded-b-none">
            <div className="w-full pb-10">
              <CustomTab tabs={tabs} sx={style.container}>
                <PersonalDetails />
                <Portfolio />
                <Reviews />
                <Licenses />
                <KYC />
                <Notification />
                <FAQ />
              </CustomTab>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
