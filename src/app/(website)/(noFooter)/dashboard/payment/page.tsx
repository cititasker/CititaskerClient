"use client";
import TaskerPayment from "@/components/dashboard/tasker/Payment";
import PosterPayment from "@/components/dashboard/poster/Payment";
import { useAppSelector } from "@/store/hook";
import React from "react";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("@/components/reusables/Loading"), {
  ssr: false,
});

export default function Page() {
  const { user } = useAppSelector((state) => state.user);

  if (!user.role) return <Loader />;

  if (user.role === "tasker") return <TaskerPayment />;
  else return <PosterPayment />;
}
