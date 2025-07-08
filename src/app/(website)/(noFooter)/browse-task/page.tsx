"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllTasksQuery } from "@/queries/task";
import TaskList from "@/components/browseTask/Tasklist";

const Map = dynamic(() => import("@/components/browseTask/Map"), {
  ssr: false,
});

export default function Page() {
  const { data } = useSuspenseQuery(getAllTasksQuery());
  const tasks: ITask[] = data.data.data || [];

  return (
    <>
      <div className="w-full md:hidden lg:basis-1/3 h-full overflow-y-auto pt-3 hide-scrollbar">
        <TaskList />
      </div>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full h-full hidden md:inline-block"
      >
        <Map tasks={tasks} />
      </motion.div>
    </>
  );
}
