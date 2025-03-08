import React from "react";
import TaskCategoryCard from "./TaskCategoryCard";
import FormButton from "../forms/FormButton";

const PopularTasks = () => {
  return (
    <div className="bg-light-grey">
      <div className="container pt-[3.625rem] pb-[5.125rem]">
        <div className="max-w-[43.5rem] mx-auto w-full mb-[3.25rem]">
          <h1 className="header mb-5">Explore popular tasks on citiTasker</h1>
          <p className="max-w-[32.5rem] mx-auto text-dark-secondary font-base text-center">
            Borem ipsum dolor sit amet, consectetur adipiscing elit. Borem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mb-[3.5rem]">
          {Array.from({ length: 8 }).map((_, i) => (
            <TaskCategoryCard key={i} />
          ))}
        </div>
        <FormButton
          text="Explore more on citiTasker"
          btnStyle="w-fit mx-auto !bg-secondary !px-5"
        />
      </div>
    </div>
  );
};

export default PopularTasks;
