"use client";
import { getUserTasksQuery } from "@/queries/task";
import { useSuspenseQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import React from "react";
import TaskList from "../myTasks/TaskList";
import { motion } from "framer-motion";

const Map = dynamic(() => import("@/components/browseTask/Map"), {
  ssr: false,
});

const MapWrapper = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const { data } = useSuspenseQuery(getUserTasksQuery({ status }));
  const tasks: ITask[] = data.data.data || [];

  return (
    <>
      <div className="w-full md:hidden lg:basis-1/3 h-full overflow-y-auto md:pt-3 hide-scrollbar">
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
};

export default MapWrapper;
