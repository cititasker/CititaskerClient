"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IArrowDown } from "@/constant/icons";
import Plumbering from "@/assets/images/discovery/plumbering.svg?url";
import Electrician from "@/assets/images/discovery/electrician.svg?url";
import ACInstaller from "@/assets/images/discovery/acman.svg?url";
import Catering from "@/assets/images/discovery/catering.svg?url";

export const popularTasks = [
  {
    label: "AC Installation",
    icon: ACInstaller,
  },
  {
    label: "Catering",
    icon: Catering,
  },
  {
    label: "Plumbing",
    icon: Plumbering,
  },
  {
    label: "Electrical",
    icon: Electrician,
  },
];

export default function PopularTasksCarousel() {
  return (
    <div className="container-w relative mx-auto">
      <h3 className="text-[20px] md:text-[24px] font-semibold mb-3">
        Popular tasks
      </h3>
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        className="relative w-full mx-auto"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {popularTasks.map((task, index) => (
            <CarouselItem
              key={index}
              className="lg:basis-1/4 md:basis-1/3 sm:basis-1/2 basis-full pl-4 md:pl-6"
            >
              <div className="px-2.5 pb-2.5 w-full h-full bg-primary flex flex-col rounded-2xl border border-gray-200 overflow-hidden">
                <p className=" text-white text-xl md:text-2xl font-semibold text-left py-4">
                  {task.label}
                </p>

                <div className="relative w-full h-[250px] sm:h-[300px] aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={task.icon}
                    alt={task.label}
                    fill
                    className="object-center object-cover"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        <CarouselPrevious
          icon={<IArrowDown className="-rotate-90 !w-fit !h-fit" />}
          className="-left-3 xl:-left-8 top-1/2 -translate-y-1/2 w-[50px] md:w-[76px] h-[50px] md:h-[76px] bg-white p-0"
        />
        <CarouselNext
          icon={<IArrowDown className="rotate-90 !w-fit !h-fit" />}
          className="-right-3 xl:-right-8 top-1/2 -translate-y-1/2 w-[50px] md:w-[76px] h-[50px] md:h-[76px] bg-white p-0"
        />
      </Carousel>
    </div>
  );
}
