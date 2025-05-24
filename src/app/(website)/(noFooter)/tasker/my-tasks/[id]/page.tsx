import TaskDetails from "@/components/browseTask/TaskDetails";
import { getSingleTaskQuery } from "@/queries/task";
import { getSingleTask } from "@/services/task";
import { queryClient } from "@/providers/ServerProvider";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
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

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  await queryClient.prefetchQuery(getSingleTaskQuery(id));
  return <TaskDetails />;
}
