"use client";
import { getAllTasksQuery } from "@/queries/task";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import TaskCard from "./TaskCard";

export default function Tasklist() {
  const { data } = useSuspenseQuery(getAllTasksQuery());
  const tasks: ITask[] = data.data.data || [];
  return (
    <div className="grid overflow-y-auto gap-3 pb-5">
      {tasks.map((task) => (
        <TaskCard key={task.id} path="browse-task" item={task} />
      ))}
    </div>
  );
}
