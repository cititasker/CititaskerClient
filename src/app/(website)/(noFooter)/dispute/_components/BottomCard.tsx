import React from "react";
import VerticalStepper from "./VerticalStepper";
import Typography from "@mui/material/Typography";

const BottomCard = () => {
  return (
    <div className="rounded-30 bg-white mb-5 py-9 px-5">
      <div className="mb-8">
        <Typography className="text-xl text-black-2 mb-2 font-semibold">
          Refund History
        </Typography>
        <Typography className="text-base text-black-2">
          Please see below for the dispute details and resolution.
        </Typography>
      </div>
      <VerticalStepper />
    </div>
  );
};

export default BottomCard;
