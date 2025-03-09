import { Chip, SxProps, Theme } from "@mui/material";
import React from "react";

interface IProps {
  status: string;
  name: string;
}

const style: Record<string, SxProps<Theme>> = {
  container: {
    height: "20px",
    px: "1px",
    borderRadius: "13px",
    "&.successful": {
      bgcolor: "#ECFDF3",
      color: "#12B76A",
    },
    "&.on_hold": {
      bgcolor: "#FCEFD9",
      color: "#F2AF42",
    },
    "&.failed": {
      bgcolor: "#FBDDE1",
      color: "#EC514B",
    },
    ".MuiChip-label": {
      ml: "2px",
      fontSize: "11px",
      fontWeight: 500,
    },
    ".MuiChip-icon": {
      "&.successful": {
        bgcolor: "#12B76A",
      },
      "&.on_hold": {
        bgcolor: "#F2AF42",
      },
      "&.failed": {
        bgcolor: "#EC514B",
      },
    },
  },
};

const PaymentStatus = ({ status, name }: IProps) => {
  return (
    <Chip
      sx={style.container}
      className={status}
      icon={<div className={`w-[6px] h-[6px] rounded-full ${status}`} />}
      label={name}
    />
  );
};

export default PaymentStatus;
