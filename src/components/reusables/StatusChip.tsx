import { Chip, SxProps, Theme } from "@mui/material";
import React from "react";

interface IProps {
  status: string;
}
const styles: Record<string, SxProps<Theme>> = {
  container: {
    height: "22px",
    border: "0.8px solid var(--primary)",

    bgcolor: "var(--primary)",

    ".MuiChip-label": {
      color: "white",
      fontSize: "10px",
      px: "12px",
      textTransform: "capitalize",
    },
  },
};

const StatusChip = ({ status }: IProps) => {
  return <Chip label={status} variant="outlined" sx={styles.container} />;
};

export default StatusChip;
