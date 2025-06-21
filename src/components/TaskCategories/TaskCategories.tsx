"use client";
import React, { useState } from "react";
import TaskCategoriesCarousel from "./TaskCategoriesCarousel";
import { IoBriefcaseOutline } from "react-icons/io5";

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
  const [activeTab, setActiveTab] = useState("Assembler & Installer");
  return (
    <div className="bg-light-primary-1">
      <div className="container pt-[4.375rem] pb-20">
        <h2 className="header mb-[3.5rem] max-w-[56.25rem] mx-auto">
        See some of the top rated Taskers</h2>
        <div className="w-full overflow-x-auto mb-5 md:mb-[3.875rem] hide-scrollbar">
          <div className="flex items-center">
            {tabs.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(item.name)}
                className={`px-5 py-3 flex items-center rounded-40 text-base font-normal whitespace-nowrap ${
                  activeTab === item.name ? "bg-primary text-white" : "bg-none"
                }`}
              >
                <IoBriefcaseOutline className="mr-2 text-2xl" />
                {item.name}
              </button>
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
