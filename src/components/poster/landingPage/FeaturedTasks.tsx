import React from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
// import TaskCard from "./TaskCard";
import Link from "next/link";
// import { tasks } from "../../../../data";

const FeaturedTasks = () => {
  return (
    <div className="container">
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-2xl font-semibold leading-normal">
          Featured tasks
        </h2>
        <Link href="#" className="text-primary text-base flex items-center">
          See All
          <HiOutlineChevronRight className="ml-1.5 text-primary text-lg" />
        </Link>
      </div>
      {/* <div className="w-full overflow-x-auto flex gap-8 pb-10 hide-scrollbar">
        {tasks.map((el, i) => (
          <TaskCard key={i} data={el} />
        ))}
      </div> */}
    </div>
  );
};

export default FeaturedTasks;
