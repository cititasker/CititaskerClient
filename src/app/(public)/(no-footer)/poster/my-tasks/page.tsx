import { getUserTasks } from "@/actions";
import MyTasksLayout from "@/components/layouts/MyTaskLayout";
import MyTask from "@/components/myTasks";
import { getQueryClient } from "@/constant/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const queryClient = getQueryClient();
  const { status, search } = await searchParams;
  const queryParams: Record<string, any> = {};

  if (status && status !== "all") {
    queryParams.status = status;
  }

  if (search) {
    queryParams.search = search;
  }

  await queryClient.prefetchQuery({
    queryKey: ["tasks/user", queryParams],
    queryFn: () => getUserTasks(queryParams),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MyTasksLayout>
        <MyTask />
      </MyTasksLayout>
    </HydrationBoundary>
  );
}
