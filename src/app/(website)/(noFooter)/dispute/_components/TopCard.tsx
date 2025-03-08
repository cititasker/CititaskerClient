import { Box, Slider, SxProps, Theme, Typography } from "@mui/material";
import React from "react";

const marks = [
  {
    value: 0,
    label: "Start",
  },
  {
    value: 33,
    label: "In Negotiation",
  },
  {
    value: 66,
    label: "CitiTasker steps in",
  },
  {
    value: 100,
    label: "Finished",
  },
];
const style: Record<string, SxProps<Theme>> = {
  container: {
    ".MuiSlider-root": {
      color: "var(--green-state-color)",
      height: "8px",

      ".MuiSlider-rail": {
        bgcolor: "#F3F5F6",
      },
      ".MuiSlider-markLabel": {
        color: "var(--dark-grey-2)",
        fontSize: "16px",
        fontWeight: 400,
      },
      ".MuiSlider-thumb": {
        width: "15px",
        height: "15px",
      },
      ".MuiSlider-markLabelActive": {
        color: "var(--green-state-color)",
      },
      "&.Mui-disabled": {
        color: "var(--green-state-color)",
      },
    },
  },
};

const TopCard = () => {
  return (
    <Box sx={style.container} className="rounded-30 bg-white mb-5">
      <div className="bg-primary h-[70px] px-[30px] flex items-center text-white"></div>
      <div className="p-5">
        <div className="w-[90%] mx-auto">
          <Slider
            defaultValue={66}
            step={33}
            marks={marks}
            size="medium"
            valueLabelDisplay="off"
            disabled
          />
          <div className="flex justify-between mt-8 mb-[30px] gap-3 flex-wrap">
            <div>
              <Typography className="text-base mb-1 text-dark-grey-2">
                Dispute ID
              </Typography>
              <Typography className="text-black-2">3NH592FKE</Typography>
            </div>
            <div>
              <Typography className="text-base mb-1 text-dark-grey-2">
                Proposal
              </Typography>
              <Typography className="text-black-2">3NH592FKE</Typography>
            </div>
            <div>
              <Typography className="text-base mb-1 text-dark-grey-2">
                Date Submitted
              </Typography>
              <Typography className="text-black-2">12 July 2024</Typography>
            </div>
            <div>
              <Typography className="text-base mb-1 text-dark-grey-2">
                Amount
              </Typography>
              <Typography className="text-black-2">N30,000.00</Typography>
            </div>
            <div>
              <Typography className="text-base mb-1 text-dark-grey-2">
                Resolution Status
              </Typography>
              <Typography className="text-black-2">N30,000.00</Typography>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default TopCard;
