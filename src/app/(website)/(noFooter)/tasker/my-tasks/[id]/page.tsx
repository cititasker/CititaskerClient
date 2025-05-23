import TaskDetails from "@/components/browseTask/TaskDetails";
import { getSingleTaskQuery } from "@/queries/task";
import { getSingleTask } from "@/services/task";
import { queryClient } from "@/providers/ServerProvider";
import type { Metadata } from "next";

// This function generates SEO metadata based on the task's details
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const { data: task } = await getSingleTask(id);

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

export default async function Page({ params }: { params: { id: string } }) {
  await queryClient.prefetchQuery(getSingleTaskQuery(params.id));
  return <TaskDetails />;
}
