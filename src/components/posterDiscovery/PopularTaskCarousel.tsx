"use client";

import Image from "next/image";
import { popularTasks } from "../../../data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";

export default function PopularTasksCarousel() {
  return (
    <div className="relative max-w-6xl mx-auto px-4">
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        className="relative"
      >
        <CarouselContent>
          {popularTasks.map((task, index) => (
            <CarouselItem
              key={index}
              className="lg:basis-1/4 md:basis-1/3 basis-full pt-4"
            >
              <div className="w-full h-full bg-primary flex flex-col rounded-2xl border border-gray-200 overflow-hidden">
                {/* Label Above Image */}
                <div className=" text-white text-[24px] md:text-[32px] font-semibold text-center py-2">
                  {task.label}
                </div>

                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden pt-4 ">
                  <Image
                    src={task.icon}
                    alt={task.label}
                    fill
                    className="object-center pb-2"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselNext className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
}
