// components/myTasks/TaskSection.tsx
"use client";

import { updateQueryParams } from "@/utils";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const list = [
  { href: "all", name: "All Tasks" },
  { href: "open", name: "Open Tasks" },
  { href: "assigned", name: "Assigned Tasks" },
  { href: "cancelled", name: "Cancelled Offers" },
  { href: "completed", name: "Completed Tasks" },
  { href: "expired", name: "Expired Tasks" },
];

const TaskSection = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";
  const router = useRouter();

  useEffect(() => {
    const params = updateQueryParams(searchParams, "status", status);
    router.replace(`?${params}`);
  }, [status, searchParams, router]);

  return (
    <div className="w-full rounded-[20px] bg-white py-[24.5px]">
      <div className="px-[22.5px] pb-4">
        <input
          className="w-full h-[44px] focus:outline-none"
          placeholder="Search for a task"
        />
      </div>
      <div className="flex flex-col">
        {list.map((el, i) => (
          <Link
            key={i}
            href={`?status=${el.href}`}
            className={`py-5 px-6 w-full text-base ${
              status === el.href
                ? "bg-light-primary-1 border-r-2 border-primary text-primary"
                : "text-black-2"
            }`}
          >
            {el.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TaskSection;
