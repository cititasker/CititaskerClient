"use client";

import React, { useRef, useEffect, useState } from "react";
import WhyCitiTaskerSection from "./WhyCitiTaskerSection";
import { useActiveOnScroll } from "./hooks/useActiveOnScroll";

interface IProps {
  sections: any[];
}
const WhyCitiTaskerList = ({ sections }: IProps) => {
  const activeSection = useActiveOnScroll(".tasker_section", 100);

  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionHeights, setSectionHeights] = useState<number[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      const heights = Array.from(
        containerRef.current.querySelectorAll(".tasker_section")
      ).map((el) => el.scrollHeight);
      setSectionHeights(heights);
    }
  }, []);

  const getIndicatorTop = () => {
    if (!sectionHeights.length) return 0;
    // Sum heights + gap (105 is approx margin between sections)
    const gap = 105;
    return sectionHeights
      .slice(0, activeSection)
      .reduce((acc, h) => acc + h + gap, 0);
  };

  return (
    <div className="relative flex flex-col gap-y-[5.125rem]" ref={containerRef}>
      {sections.map(
        ({ id, data, shapeBg, mainImage, topLeft, bottomRight }) => (
          <WhyCitiTaskerSection
            key={id}
            data={data}
            shapeBg={shapeBg}
            mainImage={mainImage}
            topLeft={topLeft}
            bottomRight={bottomRight}
          />
        )
      )}

      {/* Vertical indicator line */}
      <div className="hidden md:flex justify-center absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-full bg-light-primary-1">
        <div
          className="absolute w-0.5 bg-primary transition-all duration-500"
          style={{
            top: `${getIndicatorTop()}px`,
            height: sectionHeights[activeSection] || 0,
          }}
        />
      </div>
    </div>
  );
};

export default WhyCitiTaskerList;
