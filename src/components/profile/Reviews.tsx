import { defaultProfile } from "@/constant/images";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import ReplyOffer from "../browseTask/Offer/ReplyOffer";

const data: any = {
  id: 1,
  description: "Hello there",
  created_at: "",
};
const Reviews = () => {
  return (
    <div className="px-10">
      <div className="w-full flex gap-4 mb-6 last:mb-0">
        <Image
          src={defaultProfile}
          alt="taskers profile"
          width={60}
          height={60}
          className="w-[60px] h-[60px] rounded-full object-cover shrink-0"
        />
        <div className="w-full">
          <div className="w-full mb-4 flex justify-between items-center gap-3">
            <Typography className="text-black font-normal text-xl">
              Name
            </Typography>
          </div>
          <ReplyOffer offer={data} />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
