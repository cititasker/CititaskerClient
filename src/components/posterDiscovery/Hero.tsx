"use client";

import React, { useState } from "react";
import FormButton from "../forms/FormButton";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/store/hook";
import { cn } from "@/lib/utils";
import { useScreenBreakpoints } from "@/hooks/useScreenBreakpoints";

export default function Hero() {
  const { user } = useAppSelector((state) => state.user);
  const [todo, setTodo] = useState("");

  const { isSmallScreen } = useScreenBreakpoints();

  const tags = [
    "Clean my house",
    "Fix my door",
    "Catering for birthday party",
    "Deliver something for me",
    "Mount my TV",
    "Paint my room",
  ];

  return (
    <main className="bg-black-2 p-top w-full text-white pb-10 relative overflow-hidden">
      {/* Background Shapes */}
      <section className="container-w w-full relative">
        {/* Shape 1 */}
        <div className="absolute top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl z-0"></div>
        {/* Shape 2 */}
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl z-0 -translate-x-1/2"></div>
        {/* Shape 3 */}
        <div className="absolute top-1/2 right-0 w-40 h-40 bg-teal-400/10 rounded-full blur-2xl z-0"></div>

        <div className="relative z-10 mx-auto py-10 md:py-20">
          <p className="text-base mb-2">Welcome {user?.first_name}!</p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-2 text-white">
            Post a task. Get it done.
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mb-3">
            Connect with verified taskers in your city.
          </p>

          {/* Search bar */}
          <div className="relative w-full mb-4 sm:h-[70px]">
            <Input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="What task do you need done?"
              className="w-full bg-white text-black px-4 py-4 pr-28 rounded-[20px] h-full"
            />
            <FormButton
              href={`/post-task?todo=${todo}`}
              className="absolute sm:right-4 right-2 top-1/2 bottom-0 !-translate-y-1/2"
              size={isSmallScreen ? "lg" : "default"}
            >
              Post task
            </FormButton>
          </div>

          {/* Suggested tags */}
          <div className="flex flex-wrap justify-start gap-2 text-white/80">
            {tags.map((tag, idx) => {
              const isSelected = todo === tag;
              return (
                <button
                  key={idx}
                  onClick={() => setTodo(isSelected ? "" : tag)}
                  className={cn(
                    "px-5 py-2.5 sm:py-3 bg-transparent rounded-full border border-white transition-all duration-200",
                    isSelected && "bg-white text-black-2"
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
