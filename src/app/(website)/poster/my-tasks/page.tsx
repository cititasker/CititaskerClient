import { getUserTasks } from "@/actions";
import MyTasksLayout from "@/components/layouts/MyTaskLayout";
import MyTask from "@/components/myTasks";
import { ROUTES } from "@/constant";
import { getQueryClient } from "@/constant/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

interface PageProps {
  searchParams: {
    status?: string;
    search?: string;
    [key: string]: string | undefined;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const queryClient = getQueryClient();

  const queryParams: Record<string, any> = {};

  const status = searchParams.status;
  if (status && status !== "all") {
    queryParams.status = status;
  }

  const search = searchParams.search;
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
        <MyTask path={ROUTES.MY_TASKS} />
      </MyTasksLayout>
    </HydrationBoundary>
  );
}
