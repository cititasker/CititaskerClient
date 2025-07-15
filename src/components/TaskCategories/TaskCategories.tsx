"use client";
import React, { useState } from "react";
import TaskCategoriesCarousel from "./TaskCategoriesCarousel";
import { IoBriefcaseOutline } from "react-icons/io5";
import { useGetCategories } from "@/services/general/index.hook";
import FormButton from "../forms/FormButton";
import { cn } from "@/lib/utils";
import { capitalize } from "@/utils";

const tabs = [
  {
    id: "1",
    name: "Assembler & Installer",
    icon: "",
  },
  {
    id: "2",
    name: "Automobile",
    icon: "",
  },
  {
    id: "3",
    name: "Fashion & Beauty",
    icon: "",
  },
  {
    id: "4",
    name: "Cleaner",
    icon: "",
  },
  {
    id: "5",
    name: "Party",
    icon: "",
  },
  {
    id: "6",
    name: "Deliverer",
    icon: "",
  },
  {
    id: "7",
    name: "Event Planner",
    icon: "",
  },
  {
    id: "8",
    name: "HandyMan",
    icon: "",
  },
];

const data = [
  {
    img: "/images/taskers/tasker_1.svg",
    name: "Shamtel Dickson",
    occupation: "Plumbing Engineer ",
    ratings: "4.6",
    taskCompleted: 100,
    charges: "N10,000 - above",
  },
  {
    img: "/images/taskers/tasker_2.svg",
    name: "Shamtel Dickson",
    occupation: "Plumbing Engineer ",
    ratings: "4.6",
    taskCompleted: 100,
    charges: "N10,000 - above",
  },
  {
    img: "/images/taskers/tasker_3.svg",
    name: "Shamtel Dickson",
    occupation: "Plumbing Engineer ",
    ratings: "4.6",
    taskCompleted: 100,
    charges: "N10,000 - above",
  },
  {
    img: "/images/taskers/tasker_4.svg",
    name: "Shamtel Dickson",
    occupation: "Plumbing Engineer ",
    ratings: "4.6",
    taskCompleted: 100,
    charges: "N10,000 - above",
  },
  {
    img: "/images/taskers/tasker_1.svg",
    name: "Shamtel Dickson",
    occupation: "Plumbing Engineer ",
    ratings: "4.6",
    taskCompleted: 100,
    charges: "N10,000 - above",
  },
  {
    img: "/images/taskers/tasker_2.svg",
    name: "Shamtel Dickson",
    occupation: "Plumbing Engineer ",
    ratings: "4.6",
    taskCompleted: 100,
    charges: "N10,000 - above",
  },
  {
    img: "/images/taskers/tasker_3.svg",
    name: "Shamtel Dickson",
    occupation: "Plumbing Engineer ",
    ratings: "4.6",
    taskCompleted: 100,
    charges: "N10,000 - above",
  },
  {
    img: "/images/taskers/tasker_4.svg",
    name: "Shamtel Dickson",
    occupation: "Plumbing Engineer ",
    ratings: "4.6",
    taskCompleted: 100,
    charges: "N10,000 - above",
  },
];

const TaskCategories = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const { data: rawCategories = [] } = useGetCategories();

  return (
    <div className="bg-light-primary-1">
      <div className="container-w pt-[4.375rem] pb-20">
        <h2 className="header mb-[3.5rem] max-w-[56.25rem] mx-auto">
          See some of the top rated Taskers
        </h2>
        <div className="w-full overflow-x-auto mb-5 md:mb-[3.875rem] hide-scrollbar py-2">
          <div className="flex items-center gap-2">
            {rawCategories.map((item) => (
              <FormButton
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "px-5 py-3 flex shadow-sm items-center rounded-40 text-base font-normal whitespace-nowrap capitalize",
                  activeTab === item.id
                    ? "bg-primary text-white"
                    : "bg-white text-black-2"
                )}
              >
                <span className="capitalize">{capitalize(item.name)}</span>
              </FormButton>
            ))}
          </div>
        </div>
        <div>
          <TaskCategoriesCarousel data={data} className="mb-5" />
          <TaskCategoriesCarousel data={data} rtl={true} />
        </div>
      </div>
    </div>
  );
};

export default TaskCategories;
