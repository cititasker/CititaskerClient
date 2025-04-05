"use client";
import { Box, SxProps, Theme } from "@mui/material";
import React from "react";
// import Icons from "../../Icons";
import BankVerification from "../Verifications/BankVerification";
import BVNVerification from "./BVNVerification";

const style: Record<string, SxProps<Theme>> = {
  container: {
    ".MuiAccordion-root": {
      boxShadow: "0px 13px 13px 0px rgba(0, 0, 0, 0.05)",
      border: "1px solid var(--F5F5F5)",
      borderRadius: "20px !important",
      mb: "20px",
      overflow: "hidden",
      bgcolor: "white",

      "&:last-of-type": {
        mb: 0,
      },

      "&:before": {
        display: "none",
      },

      ".MuiAccordion-heading": {
        border: "none",
      },

      ".MuiAccordionSummary-root": {
        height: "80px",
        px: "40px",
        ".MuiAccordionSummary-content": {
          my: 0,
        },
      },
      ".MuiAccordionDetails-root": {
        px: "40px",
      },
      ".Mui-expanded": {
        minHeight: "auto",
      },
      "&.Mui-expanded": {
        minHeight: "auto",
      },
    },
  },
};

const Verifications = () => {
  // const [expanded, setExpanded] = React.useState<string | false>(false);

  // const handleChange =
  //   (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
  //     setExpanded(isExpanded ? panel : false);
  //   };

  // const expandedIcon = (panel: string, status: string) => {
  //   if (expanded === panel) {
  //     if (status == "completed") return null;
  //     else return <Icons.dropdown />;
  //   } else {
  //     if (status == "completed") return <Icons.greenTick />;
  //     else return <Icons.dropdown />;
  //   }
  // };
  return (
    <Box sx={style.container} className="px-0">
      <BVNVerification />
      <BankVerification />
    </Box>
  );
};

export default Verifications;
