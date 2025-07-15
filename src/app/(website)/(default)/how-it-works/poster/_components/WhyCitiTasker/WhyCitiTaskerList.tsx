// components/WhyCitiTaskerList.tsx

"use client";
import React, { useEffect, useRef, useState } from "react";
import Section1Main from "@/assets/images/how_it_works/section_1_main_poster.svg?url";
import Section1MainBR from "@/assets/images/how_it_works/section_1_main_poster_br.svg?url";

import Section2Main from "@/assets/images/how_it_works/section_2_main_poster.svg?url";
import Section2MainBR from "@/assets/images/how_it_works/section_2_main_br.svg?url";

import Section3Main from "@/assets/images/how_it_works/section_3_main_poster.svg?url";
import Section3MainBR from "@/assets/images/how_it_works/section_3_main_poster_br.svg?url";

import ShapeBg1 from "@/../public/images/shape_bg/bg_shape_1.png";
import ShapeBg2 from "@/../public/images/shape_bg/bg_shape_2.png";
import ShapeBg3 from "@/../public/images/shape_bg/bg_shape_3.png";
import WhyCitiTaskerSection from "../../../_components/WhyCitiTaskerSection";
import Image from "next/image";

const sectionData1 = {
  title: "Earn More on Your Terms",
  list: [
    "With CitiTasker, you’re the boss of your work life. You have the freedom to take control of your income. Choose the tasks that match your skills, set your own rates, and work on your own schedule.",
  ],
};

const sectionData2 = {
  title: "Private messaging",
  list: [
    "Have a seamless and productive interactions with Posters via private message. Communicate directly with Posters to ensure clarity and smooth collaboration from start to finish.",
  ],
};

const sectionData3 = {
  title: "Secure payments",
  list: [
    "You can focus on delivering great work knowing your payments are safe and secure. No need to worry about chasing payments. Our platform ensures a smooth and worry-free payment process from start to finish.",
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
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="relative flex flex-col gap-y-[5.125rem]" ref={sectionRef}>
      <WhyCitiTaskerSection
        data={sectionData1}
        shapeBg={ShapeBg1}
        mainImage={Section1Main}
        bottomRight={
          <Image
            src={Section1MainBR}
            alt=""
            className="absolute bottom-5 -right-5 h-auto max-w-[50%]"
          />
        }
      />

      <WhyCitiTaskerSection
        data={sectionData2}
        shapeBg={ShapeBg2}
        mainImage={Section2Main}
        bottomRight={
          <Image
            src={Section2MainBR}
            alt=""
            className="absolute bottom-5 -right-5 max-w-[50%]"
          />
        }
      />

      <WhyCitiTaskerSection
        data={sectionData3}
        shapeBg={ShapeBg3}
        mainImage={Section3Main}
        bottomRight={
          <Image
            src={Section3MainBR}
            alt=""
            className="absolute bottom-5 -right-5 max-w-[50%]"
          />
        }
      />

      <div className="hidden bg-light-primary-1 w-[3px] md:flex justify-center absolute top-0 left-1/2 -translate-x-[50%] h-full">
        <div
          className="absolute top-0 h-[11.875rem] w-0.5 bg-primary transition-all duration-500"
          style={{ top: `${activeSection * (sectionHeight + 105)}px` }}
        ></div>
      </div>
    </div>
  );
};

export default WhyCitiTaskerList;
