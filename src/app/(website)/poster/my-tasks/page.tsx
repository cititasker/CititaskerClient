import { getUserTasks } from "@/actions";
import MyTasksLayout from "@/components/layouts/MyTaskLayout";
import MyTask from "@/components/myTasks";
import { getQueryClient } from "@/constant/queryClient";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tasks/user"],
    queryFn: getUserTasks,
  });

  return (
    <MyTasksLayout>
      <MyTask />
    </MyTasksLayout>
  );
}
