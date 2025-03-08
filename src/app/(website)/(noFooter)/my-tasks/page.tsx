import { getUserTasks } from "@/actions";
import Map from "@/components/browseTask/Map";
import MyTasksLayout from "@/components/layouts/MyTaskLayout";
import { queryClient } from "@/providers/ServerProvider";
import React from "react";

export default async function page() {
  await queryClient.prefetchQuery({
    queryKey: ["tasks/user"],
    queryFn: getUserTasks,
  });

  return (
    <MyTasksLayout>
      <Map />
    </MyTasksLayout>
  );
}
