"use client";
import React, { useEffect, useRef, useState } from "react";
import WhyCitiTaskerItem from "./WhyCitiTaskerItem";
import Image from "next/image";
import Chef from "@/../public/images/hiw-4.svg";
import Cleaner from "@/../public/images/tasker_cleaner.svg";
import MakeUpArtist from "@/../public/images/makeup_artist.svg";
import ShapeBg1 from "@/../public/images/shape_bg/bg_shape_1.png";
import ShapeBg2 from "@/../public/images/shape_bg/bg_shape_2.png";
import ShapeBg3 from "@/../public/images/shape_bg/bg_shape_3.png";
import TaskerStats from "@/components/TaskerStats";

const sectionData1 = {
  title: "Sign up for free",
  list: [
    "Both parties must agree to decrease the price via CitiTasker private messages and explicitly state the new amount.",
    "Contact CitiTasker once both parties have written that they agree to a decrease in the task price and stated what the new amount should be.",
    "CitiTasker will adjust the price on the system accordingly and return the extra amount to the Poster.",
  ],
};

const sectionData2 = {
  title: "Set your own price",
  list: [
    "Both parties must agree to decrease the price via CitiTasker private messages and explicitly state the new amount.",
    "Contact CitiTasker once both parties have written that they agree to a decrease in the task price and stated what the new amount should be.",
    "CitiTasker will adjust the price on the system accordingly and return the extra amount to the Poster.",
  ],
};

const sectionData3 = {
  title: "Complete task, Get paid",
  list: [
    "Both parties must agree to decrease the price via CitiTasker private messages and explicitly state the new amount.",
    "Contact CitiTasker once both parties have written that they agree to a decrease in the task price and stated what the new amount should be.",
    "CitiTasker will adjust the price on the system accordingly and return the extra amount to the Poster.",
  ],
};

const WhyCitiTaskerList = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(500);

  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const sections: any = document.querySelectorAll(".tasker_section");
        const currentSection = Array.from(sections).findIndex(
          (section: any) => {
            const rect = section.getBoundingClientRect();
            return (
              rect.top >= 0 &&
              rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight)
            );
          }
        );
        if (currentSection > -1) {
          setSectionHeight(sections[currentSection].scrollHeight);
          setActiveSection(currentSection);
        }
      };
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="relative" ref={sectionRef}>
      <WhyCitiTaskerItem data={sectionData1}>
        <div className="relative  w-[95%] mx-auto">
          <Image
            src={ShapeBg1}
            width={500}
            height={500}
            alt=""
            className="absolute -top-[8%] w-[100%] -z-[1]"
          />
          <Image
            src={Chef}
            width={500}
            height={500}
            alt=""
            className="w-[90%] max-w-[450px] mx-auto h-full object-cover rounded-30"
          />
        </div>
      </WhyCitiTaskerItem>
      <WhyCitiTaskerItem data={sectionData2}>
        <div className="relative  w-[95%] mx-auto">
          <Image
            src={ShapeBg2}
            width={500}
            height={500}
            alt=""
            className="absolute -top-[8%] w-[100%] -z-[1]"
          />
          <Image
            src={Cleaner}
            width={500}
            height={500}
            alt=""
            className="w-[90%] max-w-[450px] mx-auto h-full object-cover rounded-30"
          />
        </div>
      </WhyCitiTaskerItem>
      <WhyCitiTaskerItem data={sectionData3}>
        <div className="relative  w-[95%] mx-auto">
          <Image
            src={ShapeBg3}
            width={500}
            height={500}
            alt=""
            className="absolute -top-[8%] w-[100%] -z-[1]"
          />
          <Image
            src={MakeUpArtist}
            width={500}
            height={500}
            alt=""
            className="w-[90%] max-w-[450px] mx-auto h-full object-cover rounded-30"
          />
          <TaskerStats extraClass="absolute top-[10%] -left-[3%]" />
          <TaskerStats extraClass="absolute bottom-[10%] -right-0" />
        </div>
      </WhyCitiTaskerItem>

      <div className=" bg-light-primary-1 w-[3px] flex justify-center absolute top-0 left-1/2 -translate-x-[50%] h-full">
        <div
          className={`absolute top-0 h-[11.875rem] w-0.5 bg-primary transition-all duration-500`}
          style={{ top: `${activeSection * (sectionHeight + 105)}px` }}
        ></div>
      </div>
    </div>
  );
};

export default WhyCitiTaskerList;
