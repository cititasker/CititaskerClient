"use client";
import React from "react";
import FormButton from "../forms/FormButton";
import { useRouter, useSearchParams } from "next/navigation";

const PostTaskFormActions = ({
  loading,
  type = "submit",
  onClick,
}: {
  loading?: boolean;
  type?: "submit" | "button";
  onClick?: any;
}) => {
  const searchParams = useSearchParams();
  const current = searchParams.get("step");
  const step = current ? +current : 1;
  const { push } = useRouter();

  const prevStep = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("step", `${+step - 1}`);
    currentUrl.searchParams.set("d", "b");
    push(`${currentUrl}`);
  };

  return (
    <div className="flex gap-x-4 sm:gap-x-8 items-center mt-auto pb-5">
      {step > 1 && (
        <FormButton
          text="Back"
          btnStyle="flex-1 border-[1.5px] border-primary bg-white text-primary font-medium"
          handleClick={prevStep}
        />
      )}

      <FormButton
        text={`${step < 4 ? "Next" : step == 4 ? "Preview" : "Submit"}`}
        type={type}
        btnStyle="flex-1 font-medium"
        loading={loading}
        handleClick={onClick}
      />
    </div>
  );
};

export default PostTaskFormActions;
