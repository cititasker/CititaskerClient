"use client";
import React from "react";
import FormButton from "@/components/forms/FormButton";
import { cn } from "@/utils";
import { ROUTES } from "@/constant";

interface SectionData {
  title: string;
  list: string[];
}

interface IProps {
  extraClass?: string;
  children: React.ReactNode;
  data: SectionData;
  showButton?: boolean;
  buttonText?: string;
  buttonHref?: string;
}

const WhyCitiTaskerItem: React.FC<IProps> = ({
  children,
  extraClass = "",
  data: { title, list },
  showButton = true,
  buttonText = "Earn more as a Tasker",
  buttonHref = ROUTES.TASKER,
}) => (
  <section
    className={cn(
      "tasker_section flex flex-col-reverse md:flex-row items-stretch md:even:flex-row-reverse gap-x-[3.5rem] gap-y-20",
      extraClass
    )}
  >
    <div className="flex-1 h-fit">{children}</div>

    <div className="bg-white py-2.5 z-10 h-fit hidden md:inline-block">
      <span className="w-[1.875rem] h-[1.875rem] rounded-full bg-light-primary-1 flex justify-center items-center">
        <span className="w-5 h-5 rounded-full bg-light-primary-2 flex justify-center items-center">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
        </span>
      </span>
    </div>

    <div className="flex-1">
      <div className="my-auto w-fit max-w-[450px] mx-auto flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="mb-3 md:mb-5 text-[2rem] md:text-[2.5rem] font-bold text-dark-secondary">
          {title}
        </h2>
        <ul className="mb-10 space-y-2">
          {list.map((item, index) => (
            <li
              key={index}
              className="text-base font-normal text-dark-secondary"
            >
              {item}
            </li>
          ))}
        </ul>

        {showButton && (
          <FormButton
            variant="outline"
            text={buttonText}
            href={buttonHref}
            className="border-primary text-primary"
          />
        )}
      </div>
    </div>
  </section>
);

export default WhyCitiTaskerItem;
