// components/myTasks/TaskList.tsx
"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getUserTasksQuery } from "@/queries/task";
import { useAppSelector } from "@/store/hook";
import TaskCard from "../browseTask/TaskCard";
import FormButton from "../forms/FormButton";

const TaskList = () => {
  const status = useSearchParams().get("status") || "all";
  const { user } = useAppSelector((state) => state.user);
  const { data } = useSuspenseQuery(getUserTasksQuery({ status }));
  const tasks: ITask[] = data?.data?.data || [];

  if (tasks.length === 0) {
    return (
      <div className="relative text-primary text-center px-4 bg-white h-full">
        <div className="absolute left-1/2 -translate-x-1/2 top-[30%] w-full max-w-[284px] px-4">
          <p className="mb-4 text-base font-normal">
            You haven't posted any tasks yet on Cititasker. Get started by
            posting a task.
          </p>
          <FormButton
            text="Post a task"
            btnStyle="min-h-[39px] min-w-40 text-sm font-normal"
            href="/post-task"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-3 overflow-y-auto">
      {tasks.map((task) => (
        <TaskCard key={task.id} item={task} path={`/${user.role}/my-tasks`} />
      ))}
    </div>
  );
};

export default TaskList;
