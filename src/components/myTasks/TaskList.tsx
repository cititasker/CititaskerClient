"use client";
import { getUserTasksQuery } from "@/queries/task";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import TaskCard from "../browseTask/TaskCard";
import FormButton from "../forms/FormButton";

export default function TaskList() {
  const { data } = useSuspenseQuery(getUserTasksQuery());
  const tasks: ITask[] = data.data.data || [];
  return (
    <div className="grid overflow-y-auto gap-3">
      {tasks.length ? (
        tasks.map((task) => (
          <TaskCard key={task.id} path="my-tasks" item={task} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center text-primary text-center px-4 mt-32">
        <p className="mb-4 text-[16px] font-normal">
          You haven't posted any tasks yet on Cititasker Get started  by posting a task..
        </p>

        <FormButton text="Post a task" btnStyle="min-h-[39px] min-w-40 text-[16px] font-normal text-sm" href="/post-task" />
      </div>
      )}
    </div>
  );
}
