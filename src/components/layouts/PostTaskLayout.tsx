"use client";
import React, { useEffect } from "react";
import BackTo from "../BackTo";
import PostTaskHeader from "../postTask/PostTaskHeader";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserTaskByIdQuery } from "@/queries/task";
import { useAppDispatch } from "@/store/hook";
import { setTaskData } from "@/store/slices/task";
import { IState, State } from "country-state-city";

const PostTaskLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const step = searchParams.get("step") || 1;
  const { id } = useParams() as any;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("step", `${step}`);
      replace(`${currentUrl}`);
    }
  }, []);

  const { data } = useQuery(getUserTaskByIdQuery(id));
  const task: ITask = data?.data;

  useEffect(() => {
    if (task) {
      const allStates = State.getStatesOfCountry("NG") as IState[];
      const state = allStates.find((el) => el.name == task.state);
      const payload: any = {
        name: task.name,
        description: task.description,
        category_id: task.category,
        sub_category_id: task.sub_category,
        location_type: task.location_type,
        state: {
          id: state?.isoCode,
          name: state?.name,
        },
        location: task.location,
        address: task.address,
        time_frame: task.time_frame,
        date: task.date,
        time: task.time,
        showTimeOfDay: !!task.date,
        budget: `${task.budget}`,
      };
      if (task.images.length) {
        payload.images = task.images.map((src) => ({ src, new: false }));
      }
      dispatch(setTaskData(payload));
    }
  }, [task]);

  return (
    <div>
      <header className="pl-[4.5rem] py-1.5 mb-5">
        <BackTo href="/" />
      </header>
      <div className="max-w-[44.75rem] mx-auto px-5">
        {Number(step) < 5 ? <PostTaskHeader /> : null}
        {children}
      </div>
    </div>
  );
};

export default PostTaskLayout;
