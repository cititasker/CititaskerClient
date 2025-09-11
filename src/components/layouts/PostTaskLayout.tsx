"use client";
import React, { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
import { setTaskData } from "@/store/slices/task";
import { IState, State } from "country-state-city";
import BackTo from "../BackTo";
import PostTaskHeader from "@/app/post-task/_components/PostTaskHeader";
import { useFetchTaskById } from "@/services/tasks/tasks.hook";

const PostTaskLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const { id } = useParams() as { id?: string };
  const dispatch = useAppDispatch();

  const step = searchParams.get("step") || "1";
  const { data, isLoading } = useFetchTaskById({ id: id ?? "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("step", step);
      replace(currentUrl.toString());
    }
  }, [replace, step]);

  // Populate form data when editing existing task
  useEffect(() => {
    if (!data?.data) return;

    const task = data.data;
    const allStates = State.getStatesOfCountry("NG") as IState[];
    const state = allStates.find((el) => el.name === task.state);

    const payload = {
      name: task.name,
      description: task.description,
      category_id: task.category,
      sub_category_id: task.sub_category,
      location_type: task.location_type,
      state: state ? { id: state.isoCode, name: state.name } : null,
      // Convert string coordinates to numbers
      location: Array.isArray(task.location)
        ? task.location.map((coord) => Number(coord))
        : [],
      address: task.address,
      time_frame: task.time_frame,
      date: task.date,
      time: task.time,
      showTimeOfDay: !!task.date,
      budget: String(task.budget),
      images: task.images?.map((src) => ({ src, new: false })) || [],
    };

    dispatch(setTaskData(payload));
  }, [data, dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with backdrop blur */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border-light">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <BackTo href="/" />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-3xl">
        {Number(step) < 5 && <PostTaskHeader />}
        <div className="bg-background">{children}</div>
      </main>
    </div>
  );
};

export default PostTaskLayout;
