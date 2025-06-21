"use client";
import FormButton from "@/components/forms/FormButton";
import { useAppDispatch } from "@/store/hook";
import { toggleWaitlistModal } from "@/store/slices/general";
import React from "react";

const HeroButton = () => {
  const dispatch = useAppDispatch();
  return (
    <FormButton
      text="Join waitlist"
      className="mx-auto xl:ml-0 mt-[3.375rem] sm:mt-16"
      handleClick={() => dispatch(toggleWaitlistModal())}
    />
  );
};

export default HeroButton;
