import { getUserTasks } from "@/actions";
import MapWrapper from "@/components/browseTask/MapWrapper";
import MyTasksLayout from "@/components/layouts/MyTaskLayout";
import { queryClient } from "@/providers/ServerProvider";
import React from "react";

export default async function Page() {
  await queryClient.prefetchQuery({
    queryKey: ["tasks/user"],
    queryFn: getUserTasks,
  });

  return (
    <MyTasksLayout>
      <MapWrapper />
    </MyTasksLayout>
  );
}
