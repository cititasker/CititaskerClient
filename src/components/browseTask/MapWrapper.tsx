"use client";
import { getUserTasksQuery } from "@/queries/task";
import { useSuspenseQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import React from "react";

const Map = dynamic(() => import("@/components/browseTask/Map"), {
  ssr: false,
});

const MapWrapper = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const { data } = useSuspenseQuery(getUserTasksQuery({ status }));
  const tasks: ITask[] = data.data.data || [];

  return <Map tasks={tasks} />;
};

export default MapWrapper;
