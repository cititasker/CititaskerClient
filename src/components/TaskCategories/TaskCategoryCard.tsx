import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";

const TaskCategoryCard = ({
  data,
  rtl,
}: {
  data: ITaskerProfile;
  rtl?: boolean;
}) => {
  return (
    <div
      className={`w-full rounded-20 bg-white overflow-hidden p-3 xl:p-[1.125rem] flex items-stretch ${
        rtl ? "flex-row-reverse" : ""
      }`}
    >
      <Image
        src={data.img}
        alt="tasker_img"
        width={100}
        height={100}
        className="w-[64px] lg:w-[6.25rem] h-full object-cover rounded-[0.625rem] mr-3 xl:mr-5"
      />
      <div className="w-full">
        <div className="mb-[1.375rem] lg:mb-[2.25rem]">
          <p className="font-semibold text-base lg:text-[1.25rem] mb-0.5 leading-normal text-left">
            {data.name}
          </p>
          <span className="block text-xs lg:text-sm font-normal leading-normal text-left">
            {data.occupation}
          </span>
        </div>
        <div
          className={`w-full flex justify-between items-center gap-3 text-xs ${
            rtl ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`w-fit flex items-center text-xs lg:text-sm ${
              rtl && "flex-row-reverse"
            }`}
          >
            <FaStar className="text-xs lg:text-sm text-[#f2af41] mr-1" />
            {`${data.ratings} (${data.taskCompleted})`}
          </div>
          <button className="bg-primary px-1.5 xl:px-2.5 py-0.5 xl:py-1 rounded-30 text-white text-xs sm:text-xs lg:text-sm whitespace-nowrap">
            {data.charges}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCategoryCard;
