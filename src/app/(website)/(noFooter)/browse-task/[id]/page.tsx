import TaskDetails from "@/components/browseTask/TaskDetails";
import { queryClient } from "@/providers/ServerProvider";
import { getSingleTaskQuery } from "@/queries/task";
import { getSingleTask } from "@/services/task";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const data = await getSingleTask(id);
  const task = data.data;

  return {
    title: task.name,
    description: task.description,
    openGraph: {
      title: task.name,
      description: task.description,
      images: task.image,
    },
  };
}

const page = async ({ params }: Props) => {
  const id = (await params).id;

  await queryClient.prefetchQuery(getSingleTaskQuery(id));
  return <TaskDetails />;
};

export default page;
