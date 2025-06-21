"use client";
import React, { useState } from "react";
import CustomModal from "../reusables/CustomModal";
import CustomTabs from "../reusables/CustomTabs";
import Image from "next/image";
import Icons from "../Icons";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toggleWaitlistModal, updateModalState } from "@/store/slices/general";
import PosterWaitListForm from "./PosterWaitListForm";
import TaskerWaitListForm from "./TaskerWaitListForm";
import { ROLE } from "@/constant";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { VisuallyHidden } from "../ui/visually-hidden";

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

  const handleClose = () => {
    dispatch(updateModalState(false));
  };

  return (
    <>
      <Dialog open={showWaitlistForm} onOpenChange={handleClose}>
        <DialogContent className="max-w-[824px] px-[54px] py-[57px] !rounded-[40px]">
          <div>
            <VisuallyHidden asChild>
              <DialogTitle />
            </VisuallyHidden>
            <VisuallyHidden asChild>
              <DialogDescription />
            </VisuallyHidden>
            <div className="flex gap-x-2 items-center w-fit mx-auto mb-5 sm:mb-[1.75rem]">
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={86}
                height={17}
                className=""
              />
              <span className="inline-block bg-light-primary-2 !text-primary text-white text-[0.625rem] px-4 py-2 rounded-[1.25rem]">
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
          </div>
        </DialogContent>
      </Dialog>
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
