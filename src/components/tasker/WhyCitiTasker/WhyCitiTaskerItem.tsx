"use client";
import React from "react";
import FormButton from "@/components/forms/FormButton";
import { cn } from "@/utils";
import Icons from "@/components/Icons";
import { ROUTES } from "@/constant";

interface IProps {
  extraClass?: string;
  children: React.ReactNode;
  data: {
    title: string;
    list: string[];
  };
}
const WhyCitiTaskerItem = ({
  children,
  extraClass,
  data: { title, list },
}: IProps) => {
  return (
    <div
      className={cn(
        "tasker_section flex items-stretch even:flex-row-reverse mb-[5.125rem] last:mb-0 gap-x-[3.5rem]",
        extraClass
      )}
    >
      <div className="flex-1 h-fit">{children}</div>
      <div className="bg-white py-2.5 z-10 h-fit">
        <span className="w-[1.875rem] h-[1.875rem] rounded-full bg-light-primary-1 flex justify-center items-center">
          <span className="w-5 h-5 rounded-full bg-light-primary-2 flex justify-center items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
          </span>
        </span>
      </div>
      <div className="flex-1">
        <div className="h-fit my-auto">
          <h2 className="text-[2.5rem] text-dark-secondary font-bold mb-10">
            {title}
          </h2>
          <ul className="mb-10">
            {list.map((el, i) => (
              <li key={i} className="mb-6 flex items-start">
                <Icons.bullet className="mr-7" />
                <p className="text-dark-secondary text-base font-normal">
                  {el}
                </p>
              </li>
            ))}
          </ul>
          <FormButton text="Earn more as a Tasker" href={ROUTES.TASKER} />
        </div>
      </div>
    </div>
  );
};

export default WhyCitiTaskerItem;
