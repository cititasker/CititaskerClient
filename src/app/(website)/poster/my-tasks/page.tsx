import { getUserTasks } from "@/actions";
import MyTasksLayout from "@/components/layouts/MyTaskLayout";
import MyTask from "@/components/myTasks";
import { queryClient } from "@/providers/ServerProvider";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const query = searchParams.query;

  console.log(query);

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
