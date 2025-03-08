"use client";
import { getUserTasksQuery } from "@/queries/task";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import TaskCard from "../browseTask/TaskCard";

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
        <div className="text-center">No Task</div>
      )}
    </div>
  );
}
