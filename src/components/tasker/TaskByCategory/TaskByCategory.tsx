import React from "react";
import TaskCategoryItem from "./TaskCategoryItem";
import { taskCategories } from "../../../../data";
import FormButton from "@/components/forms/FormButton";

const TaskByCategory = () => {
  return (
    <div className="bg-light-primary-1">
      <div className="container pt-[4.25rem] pb-[2.875rem]">
        <h2 className="max-w-[40.125rem] mx-auto text-[2.5rem] font-bold leading-normal text-dark-secondary mb-[2.25rem] text-center">
          Browse tasks by categories on CitiTasker
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(18.125rem,1fr))] gap-6 mb-[2.75rem]">
          {taskCategories.map((el, i) => (
            <TaskCategoryItem key={i} category={el} />
          ))}
        </div>
        <FormButton text="Start earning on CitiTasker" btnStyle="mx-auto" />
      </div>
    </div>
  );
};

export default TaskByCategory;
