import TaskCategoryCard from "@/components/PopularTasks/TaskCategoryCard";
import React from "react";

export default function WeLoveTodos() {
  return (
    <div className="bg-light-primary-1">
      <div className="container-w py-10 sm:mt-[53px] sm:pb-[99px]">
        <h2 className="text-[2rem] sm:text-[2.5rem] font-bold leading-normal text-center text-black mb-[2.5rem] sm:mb-[3.75rem]">
          We love to-dos
        </h2>
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mb-[3.5rem]">
          {Array.from({ length: 8 }).map((_, i) => (
            <TaskCategoryCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
