"use client";

import { useEffect } from "react";
import Image from "next/image";
import CustomModal from "../reusables/CustomModal";
import useModal from "@/hooks/useModal";
import FormButton from "../forms/FormButton";
import WaitlistModal from "./WaitlistModal";

export const WelcomeModal = () => {
  const showModal = useModal();
  const showWaitList = useModal();

  useEffect(() => {
    const wasClosed = localStorage.getItem("welcomeModalClosed");
    if (!wasClosed) {
      showModal.openModal();
    }
  }, []);

  const handleClose = () => {
    showModal.closeModal();
    localStorage.setItem("welcomeModalClosed", "true");
  };

  const handleJoinWaitList = () => {
    showModal.closeModal();
    showWaitList.openModal();
  };

  return (
    <>
      <CustomModal
        isOpen={showModal.isOpen}
        onClose={handleClose}
        contentClassName="max-w-3xl"
        bodyClassName="p-0"
        footerClassName="border-none flex"
        customFooter={
          <FormButton
            onClick={handleJoinWaitList}
            variant="default"
            className="w-full sm:w-auto mx-auto"
          >
            Join Waitlist
          </FormButton>
        }
      >
        {/* Hero Image */}
        <div className="relative w-full h-64 sm:h-80 md:h-96">
          <Image
            src="/images/hero.png"
            alt="CitiTasker Hero"
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Modal Text Content */}
        <div className="p-6 sm:p-8 !pb-0 space-y-3 md:space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold">
            Simplifying Life’s To-Do List — One Task at a Time
          </h3>
          <p className=" text-gray-700 dark:text-gray-300">
            In today’s fast-paced world, managing daily responsibilities can be
            overwhelming. From home repairs and cleaning to professional
            services and personal errands, people often have multiple tasks but
            struggle to find reliable and skilled individuals to get them done.
          </p>
          <p className=" text-gray-700 dark:text-gray-300">
            CitiTasker Technologies Limited is building a smart, trusted
            solution that connects people who need help with verified Taskers
            ready to work. Our platform makes it easy to post tasks, receive
            offers, compare profiles, and securely manage payments — all in one
            place.
          </p>
          <p className=" text-gray-700 dark:text-gray-300">
            Whether you’re a busy professional, a business owner, or someone
            simply looking to reclaim your time, CitiTasker is designed to help
            you get more done with confidence and ease.
          </p>
        </div>
      </CustomModal>
      <WaitlistModal
        open={showWaitList.isOpen}
        onOpenChange={showWaitList.closeModal}
      />
    </>
  );
};
