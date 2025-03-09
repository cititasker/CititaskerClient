import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import React from "react";
import Icons from "../Icons";

const style: Record<string, SxProps<Theme>> = {
  container: {
    ".MuiFormControl-root": {
      ".MuiOutlinedInput-root": {
        ".MuiSelect-select": {
          py: "2px",
        },
      },
      ".Mui-focused": {
        outlined: "none",
        border: "none",
      },
      ".MuiSelect-icon": {
        width: "14px",
      },
    },
  },
};

const DashboardCard = () => {
  return (
    <Box
      sx={style.container}
      className="px-[22px] py-[17px] rounded-20 border border-dark-grey h-[144px] flex flex-col justify-between"
    >
      <div className="flex justify-between">
        <Typography className="text-sm text-black">Completed Task</Typography>
        <FormControl sx={{ minWidth: 75 }} variant="outlined" size="small">
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={""}
            onChange={() => {}}
            IconComponent={Icons.dropdown}
          >
            <MenuItem value="">This week</MenuItem>
            <MenuItem value="month">This month</MenuItem>
            <MenuItem value="year">This year</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex w-full justify-between items-center">
        <Typography className="text-[2rem] font-semibold text-black">
          18
        </Typography>
        <div className="w-[92px] px-2.5 py-[5px] flex items-center gap-2">
          <Icons.chartInc />
          <Typography className="text-sm font-lato">90.78%</Typography>
        </div>
      </div>
    </Box>
  );
};

export default DashboardCard;
