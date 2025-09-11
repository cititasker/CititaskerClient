import TaskDetails from "@/components/browseTask/TaskDetails";
import { API_ROUTES, ROUTES } from "@/constant";
import { queryClient } from "@/providers/ServerProvider";
import { getSingleTask } from "@/services/task";
import { getUserTaskById } from "@/services/tasks/tasks.api";
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

export default async function Page({ params }: Props) {
  const id = (await params).id;

  await queryClient.prefetchQuery({
    queryKey: [API_ROUTES.GET_TASK_BY_ID, id],
    queryFn: () => getUserTaskById(id),
  });
  return <TaskDetails back={ROUTES.BROWSE_TASK} />;
}
