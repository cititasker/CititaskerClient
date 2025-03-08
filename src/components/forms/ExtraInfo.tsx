import { cn } from "@/utils";
import React from "react";
import Icons from "../Icons";
import { Box } from "@mui/material";

const style = {
  container: {
    ".info": {
      width: "25px",
      height: "25px",
      path: {
        fill: "var(--primary)",
      },
    },
  },
};

const ExtraInfo = ({
  className,
  children,
}: {
  className?: string;
  children: string;
}) => {
  return (
    <Box
      sx={style.container}
      className={cn(
        `px-10 py-[30px] bg-light-primary-1 rounded-[10px]`,
        className
      )}
    >
      <div className="flex gap-5">
        <Icons.info className="info flex-shrink-0" />
        <p className="text-black-2 text-base font-normal">{children}</p>
      </div>
    </Box>
  );
};

export default ExtraInfo;
