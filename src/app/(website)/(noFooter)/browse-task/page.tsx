"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllTasksQuery } from "@/queries/task";
import TaskList from "@/components/browseTask/Tasklist";
import { Input } from "@/components/ui/input";
import FormButton from "@/components/forms/FormButton";
import { IFilterLines, ISearch } from "@/constant/icons";
import CustomSheet from "@/components/reusables/CustomSheet";
import useToggle from "@/hooks/useToggle";
import FilterList from "@/components/browseTask/FilterList";

const Map = dynamic(() => import("@/components/browseTask/Map"), {
  ssr: false,
});

export default function Page() {
  const { data } = useSuspenseQuery(getAllTasksQuery());
  const tasks: ITask[] = data.data.data || [];
  const showFilter = useToggle();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="flex items-center mb-3 gap-2 justify-between md:hidden">
        <div className="relative flex-1">
          <ISearch className="absolute top-0 bottom-0 my-auto ml-3 shrink-0" />
          <Input
            className="pl-10 bg-white w-full"
            placeholder="search for a task..."
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <FormButton
          icon={<IFilterLines />}
          className="px-4 rounded-[6.7px] bg-white text-gray-700 font-semibold text-sm"
          onClick={showFilter.handleOpen}
          // size="lg"
        >
          Filters
        </FormButton>
      </div>
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
      <CustomSheet
        open={showFilter.isOpen}
        onOpenChange={showFilter.setIsOpen}
        title="Filter"
        titleClassName="text-left"
      >
        <div>
          <FilterList />
        </div>
      </CustomSheet>
    </>
  );
}
