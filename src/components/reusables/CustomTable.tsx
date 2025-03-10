import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SxProps, Theme, Typography } from "@mui/material";

interface IProps {
  rows: any;
  columns: any;
  title: string;
  checkboxSelection?: boolean;
}

const style: Record<string, SxProps<Theme>> = {
  conatiner: {
    borderRadius: "20px",
    ".MuiDataGrid-columnHeader": {
      bgcolor: "var(--light-primary-1)",
      minHeight: "70px",
    },
  },
};

const CustomTable = ({
  title,
  checkboxSelection = false,
  rows = [],
  columns = [],
}: IProps) => {
  return (
    <div>
      <div className="flex items-center justify-between w-full mb-[22px]">
        <Typography className="text-2xl font-semibold text-[#101828]">
          {title}
        </Typography>
        <div>Search filter</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection={checkboxSelection}
          sx={style.conatiner}
        />
      </div>
    </div>
  );
};

export default CustomTable;
