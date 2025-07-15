import Image, { StaticImageData } from "next/image";
import React from "react";
import WhyCitiTaskerItem from "./WhyCitiTaskerItem";

interface SectionData {
  title: string;
  list: string[];
}

interface Props {
  data: SectionData;
  shapeBg: StaticImageData;
  mainImage: StaticImageData;
  showStats?: boolean;
  topLeft?: React.ReactNode;
  bottomRight?: React.ReactNode;
}

const WhyCitiTaskerSection: React.FC<Props> = ({
  data,
  shapeBg,
  mainImage,
  topLeft,
  bottomRight,
}) => {
  return (
    <WhyCitiTaskerItem data={data}>
      <div className="relative w-[95%] max-w-[400px] md:max-w-max mx-auto">
        {topLeft}
        <Image
          src={shapeBg}
          width={500}
          height={500}
          alt=""
          className="absolute -top-[8%] w-[100%] -z-[1]"
        />
        <Image
          src={mainImage}
          width={500}
          height={500}
          alt=""
          className="w-[90%] max-w-[450px] mx-auto h-full object-cover rounded-30"
        />
        {bottomRight}
      </div>
    </WhyCitiTaskerItem>
  );
};

export default WhyCitiTaskerSection;
