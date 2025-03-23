import { Chip, SxProps, Theme } from "@mui/material";
import React from "react";

interface IProps {
  status: string;
  isActive:boolean;
}
const styles = (isActive:boolean): Record<string, SxProps<Theme>> => ({
  container: {
    height: "22px",
    border: "0.8px solid var(--primary)",

    bgcolor: isActive ? "var(--primary)" : "var(--light-primary)",

    ".MuiChip-label": {
       color: isActive ? "white" : "var(--primary)",
      fontSize: "10px",
      px: "12px",
      textTransform: "capitalize",
    },
  },
});

const StatusChip = ({ status, isActive }: IProps) => {
  return <Chip label={status} variant="outlined" sx={styles(isActive).container} />;
};

export default StatusChip;
