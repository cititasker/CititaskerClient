import React from "react";
import Image, { StaticImageData } from "next/image";
import WhyCitiTaskerItem from "./WhyCitiTaskerItem";

interface SectionData {
  title: string;
  list: string[];
}

interface Props {
  data: SectionData;
  shapeBg: StaticImageData;
  mainImage: StaticImageData;
  topLeft?: React.ReactNode;
  bottomRight?: React.ReactNode;
  className?: string;
}

const WhyCitiTaskerSection: React.FC<Props> = ({
  data,
  shapeBg,
  mainImage,
  topLeft,
  bottomRight,
  className,
}) => (
  <WhyCitiTaskerItem extraClass={className} data={data}>
    <div className="relative w-[95%] max-w-[400px] md:max-w-max mx-auto">
      {topLeft}
      <Image
        src={shapeBg}
        alt=""
        width={500}
        height={500}
        className="absolute -top-[8%] w-full -z-10"
        priority
      />
      <Image
        src={mainImage}
        alt=""
        width={500}
        height={500}
        className="w-[90%] max-w-[450px] mx-auto h-full object-cover rounded-[30px]"
        priority
      />
      {bottomRight}
    </div>
  </WhyCitiTaskerItem>
);

export default WhyCitiTaskerSection;
