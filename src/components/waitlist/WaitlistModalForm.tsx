"use client";
import React, { useState } from "react";
import CustomModal from "../reusables/CustomModal";
import CustomTabs from "../reusables/CustomTabs";
import Image from "next/image";
import { Typography } from "@mui/material";
import Icons from "../Icons";
import theme from "@/providers/theme";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toggleWaitlistModal } from "@/store/slices/general";
import PosterWaitListForm from "./PosterWaitListForm";
import TaskerWaitListForm from "./TaskerWaitListForm";
import { ROLE } from "@/constant";

const WaitlistModalForm = () => {
  const [user, setUser] = useState<TRole>(ROLE.poster);
  const { showWaitlistForm } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();
  const [success, setSuccess] = useState(false);

  const handleTabToggle = (value: TRole) => {
    setUser(value);
  };

  const toggleSuccessModal = () => {
    if (showWaitlistForm) dispatch(toggleWaitlistModal());
    setSuccess((prev) => !prev);
  };

  return (
    <>
      <CustomModal
        isOpen={showWaitlistForm}
        onClose={() => dispatch(toggleWaitlistModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        paperStyle={{
          maxWidth: "824px",
          p: "20px",

          [theme.breakpoints.up("sm")]: {
            px: "54px",
            py: "57px",
            borderRadius: "40px",
          },
        }}
      >
        <div className="flex gap-x-2 items-center w-fit mx-auto mb-5 sm:mb-[1.75rem]">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={86}
            height={17}
            className=""
          />
          <span className="inline-block bg-red-500 text-white text-[0.625rem] px-4 py-2 rounded-[1.25rem]">
            Coming soon
          </span>
        </div>
        <div>
          <CustomTabs userType={user} handleTabToggle={handleTabToggle} />
          {user === ROLE.poster ? (
            <PosterWaitListForm toggleSuccessModal={toggleSuccessModal} />
          ) : (
            <TaskerWaitListForm toggleSuccessModal={toggleSuccessModal} />
          )}
        </div>
      </CustomModal>
      <CustomModal
        isOpen={success}
        onClose={toggleSuccessModal}
        paperStyle={{
          maxWidth: "571px",
          minHeight: "300px",
          p: "20px",
          borderRadius: "40px",
          display: "flex",
          alignItems: "center",
          [theme.breakpoints.up("sm")]: {
            px: "48px",
            py: "38px",
            minHeight: "400px",
          },
        }}
      >
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-col gap-5 items-center justify-center">
            <Icons.checkCircleSuccess />
            <Typography className="text-black-2 text-2xl font-semibold my-3 text-center">
              Thank You 🎉
            </Typography>
            <Typography className="text-black-2 font-normal max-w-[400px] mx-auto text-center">
              Your have successfully joined our waitlist, we will be in touch
              with you.
            </Typography>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default WaitlistModalForm;
