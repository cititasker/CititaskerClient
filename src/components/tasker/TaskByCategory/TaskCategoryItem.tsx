import React from "react";
import { FaStar } from "react-icons/fa6";
import { IoBriefcaseOutline } from "react-icons/io5";

const TaskCategoryItem = ({ category }: { category: ICategory }) => {
  return (
    <div className="bg-white p-4 rounded-20 hover:bg-dark-secondary duration-300 group">
      <p className="text-[1.25rem] font-semibold mb-[2.75rem] text-dark-secondary group-hover:text-white">
        {category.name}
      </p>
      <div className="w-full flex justify-between items-center group-hover:text-white">
        <div className="flex items-center">
          <IoBriefcaseOutline className="mr-2.5 text-lg" />
          <p>110 Task Available</p>
        </div>
        <div className="flex items-center">
          <FaStar className="text-[#F2AF42] text-sm mr-1" />
          <p>4.6 (150)</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCategoryItem;
