"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const list = [
  {
    href: "all",
    name: "All Tasks",
  },
  {
    href: "posted",
    name: "Posted Tasks",
  },
  {
    href: "assigned",
    name: "Assigned Tasks",
  },
  {
    href: "pending",
    name: "Pending Offer",
  },
  {
    href: "cancelled",
    name: "Cancelled Offers",
  },
  {
    href: "completed",
    name: "Completed Tasks",
  },
];

const TaskSection = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const router = useRouter();

  useEffect(() => {
    if (!status) {
      router.replace("?status=all");
    }
  }, []);

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
              status == el.href
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
