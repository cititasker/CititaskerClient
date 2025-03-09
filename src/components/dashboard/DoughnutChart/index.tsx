"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import { valueFormatter } from "./webUsageStats";

const data = [
  { id: 1, value: 20, label: "Pending Payment" },
  { id: 2, value: 5, label: "Completed Payment" },
];

export default function PieAnimation() {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <PieChart
        colors={["#236F8E", "#F2AF42"]}
        height={300}
        // width={100}
        series={[
          {
            data,
            innerRadius: 50,
            outerRadius: 100,
            arcLabelMinAngle: 20,
            valueFormatter,
            cx: "80%",
            // cy: "100%",
            paddingAngle: 2,
            cornerRadius: 6,
          },
        ]}
        skipAnimation={false}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
            padding: 0,
            itemMarkWidth: 9,
            itemMarkHeight: 9,
            labelStyle: {
              fontSize: "12px",
              color: "#021637",
            },
          },
        }}
      />
    </Box>
  );
}
