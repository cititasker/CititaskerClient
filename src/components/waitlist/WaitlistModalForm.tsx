"use client";
import React, { useState } from "react";
import CustomModal from "../reusables/CustomModal";
import Image from "next/image";
import Icons from "../Icons";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toggleWaitlistModal } from "@/store/slices/general";
import PosterWaitListForm from "./PosterWaitListForm";
import TaskerWaitListForm from "./TaskerWaitListForm";
import { CITITASKER } from "@/constant/images";
import CustomTab from "../reusables/CustomTab";

const WaitlistModalForm = () => {
  const { showWaitlistForm } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();
  const [success, setSuccess] = useState(false);

  const toggleSuccessModal = () => {
    if (showWaitlistForm) dispatch(toggleWaitlistModal());
    setSuccess((prev) => !prev);
  };

  const handleClose = () => {
    dispatch(toggleWaitlistModal());
  };

  const tabs = [
    {
      label: "Poster",
      value: "poster",
      render: () => (
        <PosterWaitListForm toggleSuccessModal={toggleSuccessModal} />
      ),
    },
    {
      label: "Tasker",
      value: "tasker",
      render: () => (
        <TaskerWaitListForm toggleSuccessModal={toggleSuccessModal} />
      ),
    },
  ];

  return (
    <>
      <CustomModal
        isOpen={showWaitlistForm}
        onClose={handleClose}
        contentClassName="h-fit max-w-[824px] md:p-[50px] sm:p-8 p-5"
      >
        <div className="flex gap-x-2 items-center w-fit mx-auto mb-5 sm:mb-[1.75rem]">
          <Image src={CITITASKER} alt="logo" width={86} height={17} />
          <span className="inline-block bg-light-primary-2 !text-primary text-white text-[0.625rem] px-4 py-2 rounded-[1.25rem]">
            Coming soon
          </span>
        </div>
        <CustomTab
          items={tabs}
          className="pb-0"
          listClassName="flex justify-center border border-primary p-0.5 rounded-[40px] max-w-[444px] mx-auto"
          triggerClassName="text-primary data-[state=active]:bg-primary data-[state=active]:text-white w-full max-w-[222px] rounded-[40px]"
        />
      </CustomModal>
      <CustomModal
        isOpen={success}
        onClose={toggleSuccessModal}
        contentClassName="max-w-[571px] flex items-center min-h-[300px] sm:min-h-[400px] p-5 sm:px-[48px] sm:py-[38px]"
      >
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-col gap-5 items-center justify-center">
            <Icons.checkCircleSuccess />
            <p className="text-black-2 text-2xl font-semibold my-3 text-center">
              Thank You 🎉
            </p>
            <p className="text-black-2 font-normal max-w-[400px] mx-auto text-center">
              Your have successfully joined our waitlist, we will be in touch
              with you.
            </p>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default WaitlistModalForm;
