"use client";
import UnderlinedHeader from "@/components/reusables/UnderlinedHeader";
import React from "react";
import TaskerTestimoniesVideos from "./TaskerTestimoniesVideos";
import Image1 from "@/../public/images/vid_1.png";
import Image2 from "@/../public/images/vid_2.png";

// const videoData = [Image1, Image2, Image3];
const videoData = [
  {
    src: "/videos/vid_1.mp4",
    thumbnail: Image1,
  },
  {
    src: "/videos/vid_2.mp4",
    thumbnail: Image2,
  },
  // {
  //   src: getStarted,
  //   thumbnail: Image3,
  // },
];

const Testimonies = () => {
  return (
    <div className="bg-dark-secondary">
      <div className="container pt-[3.5rem] pb-[4.5rem]">
        <h2 className="text-[2.5rem] font-bold leading-normal text-center text-white mb-[3.75rem]">
          Watch our <UnderlinedHeader text="top taskers" /> share their
          testimonies
        </h2>
        <TaskerTestimoniesVideos data={videoData} />
      </div>
    </div>
  );
};

export default Testimonies;
