"use client";
import TaskerPayment from "@/components/dashboard/tasker/Payment";
import PosterPayment from "@/components/dashboard/poster/Payment";
import Loader from "@/components/reusables/Loading";
import { useAppSelector } from "@/store/hook";
import React from "react";

const page = () => {
  const { user } = useAppSelector((state) => state.user);

  if (!user.role) return <Loader />;

  if (user.role === "tasker") return <TaskerPayment />;
  else return <PosterPayment />;
};

export default page;
