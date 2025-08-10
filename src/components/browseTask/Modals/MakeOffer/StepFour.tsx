"use client";
import * as React from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/hook";
import { initializeName } from "@/utils";
import { ROUTES } from "@/constant";
import Success from "@/components/reusables/Success";

export default function StepFour() {
  const {
    taskDetails: { poster_profile },
  } = useAppSelector((state) => state.task);

  return (
    <div className="flex flex-col space-y-6 h-full">
      <Success
        title="Congratulations! 🎉"
        desc={`We’ve sent your offer to ${initializeName({
          first_name: poster_profile?.first_name,
          last_name: poster_profile?.last_name,
        })} You’re on your way to earning, there are plenty of people who need your help.`}
        action={<Action />}
      />
    </div>
  );
}

const Action = () => (
  <Link href={ROUTES.BROWSE_TASK} className="mt-auto">
    <div className="flex gap-5">
      <button className="border text-white bg-[#236F8E] w-full text-center h-[51px] font-normal text-[16px] rounded-40">
        Browse More Task
      </button>
    </div>
  </Link>
);
