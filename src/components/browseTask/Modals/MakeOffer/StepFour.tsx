"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/store/hook";
import { initializeName } from "@/utils";

export default function StepFour() {
  const {
    taskDetails: { poster_profile },
  } = useAppSelector((state) => state.task);

  return (
    <div>
      <div className=" mt-[78px] w-full">
        <Image
          src="/icons/check_circle.svg"
          alt="cancel"
          width={80}
          height={80}
          className="mx-auto"
        />
      </div>

      <p className="text-2xl text-center font-semibold text-black-2 mt-5">
        Congratulations!🎉
      </p>

      <p className="text-center text-wrap mt-4 text-base font-normal">
        {`We’ve sent your offer to ${initializeName({
          first_name: poster_profile?.first_name,
          last_name: poster_profile?.last_name,
        })} You’re on your way to earning, there
        are plenty of people who need your help.`}
      </p>

      <Link href="/browse-task">
        <div className="flex gap-5 mt-[148px]">
          <button className=" mt-[58px] border text-white bg-[#236F8E] w-full text-center h-[51px] font-normal text-[16px] rounded-40">
            Browse More Task
          </button>
        </div>
      </Link>
    </div>
  );
}
