"use client";
import FormButton from "@/components/forms/FormButton";
import { ROUTES } from "@/constant";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full min-h-[247px] bg-[rgba(2,22,55,0.60)] px-5 py-[45px] flex items-center justify-center">
      <div className="max-w-[580px] w-full text-center">
        <p className="text-white text-[2.5rem] font-bold mb-1.5">
          Can’t find the task you want?
        </p>
        <p className="mb-6 text-base text-white">
          No worries! There are many task that deserve you skills on CitiTasker
        </p>
        <FormButton
          href={ROUTES.BROWSE_TASK}
          text="Browse Task"
          className="!bg-white text-primary mx-auto"
        />
      </div>
    </div>
  );
};

export default NotFound;
