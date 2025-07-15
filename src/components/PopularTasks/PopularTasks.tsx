import React from "react";
import TaskCategoryCard from "./TaskCategoryCard";
import FormButton from "../forms/FormButton";

const PopularTasks = () => {
  return (
    <div className="bg-light-grey">
      <div className="container-w pt-[33px] md:pt-[3.625rem] pb-[46px] md:pb-[5.125rem]">
        <div className="max-w-[43.5rem] mx-auto w-full mb-[3.25rem]">
          <h1 className="header mb-5">Explore popular tasks on citiTasker</h1>
          <p className="max-w-[32.5rem] text-[14px] sm:text-base mx-auto text-dark-secondary font-base text-center">
            Discover a world of possibilities with CitiTasker. Connect with
            skilled professionals ready to tackle your to-dos.
          </p>
        </div>
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mb-[3.5rem]">
          {Array.from({ length: 8 }).map((_, i) => (
            <TaskCategoryCard key={i} />
          ))}
        </div>
        <FormButton
          text="Explore more on citiTasker"
          className="w-fit mx-auto !px-5"
        />
      </div>
    </div>
  );
};

export default PopularTasks;
