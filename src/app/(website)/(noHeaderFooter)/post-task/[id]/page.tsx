"use client";
import StepFour from "@/components/postTask/StepFour";
import StepOne from "@/components/postTask/StepOne";
import StepThree from "@/components/postTask/StepThree";
import StepTwo from "@/components/postTask/StepTwo";
import Summary from "@/components/postTask/Summary";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function Page() {
  const searchParams = useSearchParams() as any;
  const current = searchParams.get("step");
  const step = current ? +current : 1;

  return (
    <>
      {step == 1 && <StepOne />}
      {step == 2 && <StepTwo />}
      {step == 3 && <StepThree />}
      {step == 4 && <StepFour />}
      {step == 5 && <Summary />}
    </>
  );
}
