"use client";

import Loading from "@/app/loading";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TaskDetailSkeleton = () => {
  return (
    <>
      <div className="hidden md:block h-full px-[52px] py-5 rounded-[25px] bg-white">
        {/* Header Row */}
        <div className="w-full h-[48px] flex items-center justify-between mb-8">
          <Skeleton className="w-[92px] h-[20px]" />
          <div className="flex gap-3 items-center">
            <Skeleton className="w-[67px] h-[20px]" />
            <Skeleton className="w-[74px] h-[20px]" />
            <Skeleton className="w-[60px] h-[20px]" />
          </div>
        </div>

        {/* Profile and Details */}
        <div className="flex gap-4 justify-between w-full mb-[48px]">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <Skeleton className="w-[80px] h-[80px] rounded-full mb-2" />
              <Skeleton className="w-[65px] h-[14px] mb-1" />
              <Skeleton className="w-[52px] h-[14px]" />
            </div>
            <div>
              <div className="flex gap-2 mb-5">
                <Skeleton className="w-[54px] h-[20px] rounded-full" />
                <Skeleton className="w-[70px] h-[20px] rounded-full" />
                <Skeleton className="w-[80px] h-[20px] rounded-full" />
              </div>
              <Skeleton className="w-[205px] h-[25px] mb-5" />
              <div className="flex flex-col gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-2">
                    <Skeleton className="w-[20px] h-[20px] rounded-full shrink-0" />
                    <div className="w-full space-y-2">
                      <Skeleton className="w-[106px] h-[14px]" />
                      <Skeleton className="w-[60px] h-[14px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-5 max-w-[180px] w-full">
            <Skeleton className="w-full h-[150px] mb-2 rounded-md" />
            <Skeleton className="w-full h-[40px] mt-2 rounded-[10px]" />
          </div>
        </div>

        {/* Description Section */}
        <div className="w-full mb-6">
          <Skeleton className="w-[109px] h-[20px] mb-3" />
          <div className="space-y-4">
            <Skeleton className="w-full h-[14px]" />
            <Skeleton className="w-full h-[14px]" />
            <Skeleton className="w-[80%] h-[14px]" />
            <Skeleton className="w-[30%] h-[14px]" />
          </div>
        </div>

        {/* Attachments Section */}
        <div className="w-full mb-6">
          <Skeleton className="w-[109px] h-[20px] mb-3" />
          <div className="flex items-center gap-5">
            <Skeleton className="w-[100px] h-[90px] rounded-[10px]" />
            <Skeleton className="w-[100px] h-[90px] rounded-[10px]" />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <Loading />
      </div>
    </>
  );
};

export default TaskDetailSkeleton;
