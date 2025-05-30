"use client";

import React, { useState, SyntheticEvent, ReactNode } from "react";
import { Box, SxProps, Tab, Tabs, Theme } from "@mui/material";

interface CustomTabProps {
  tabs: string[];
  defaultIndex?: number;
  children: ReactNode[];
  sx?: SxProps<Theme>;
}

interface TabPanelProps {
  children: ReactNode;
  value: number;
  index: number;
}

const styles: SxProps<Theme> = {
  borderBottom: 1,
  borderColor: "divider",
  mb: 3,
  ".MuiTab-root": {
    py: 1.25,
    px: 2.5,
    textTransform: "none",
    fontSize: 20,
    fontWeight: 600,
    color: "var(--black)",
  },
  ".Mui-selected": {
    color: "var(--primary) !important",
  },
  ".MuiTabs-indicator": {
    bgcolor: "var(--primary)",
  },
};

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return value === index ? (
    <div
      role="tabpanel"
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-${index}`}
      className="h-[calc(100%-48px)] bg-white"
    >
      {children}
    </div>
  ) : null;
};

const CustomTab: React.FC<CustomTabProps> = ({
  tabs,
  defaultIndex = 0,
  children,
  sx = {},
}) => {
  const [value, setValue] = useState(defaultIndex);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="h-full">
      <Box sx={{ ...styles, ...sx }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          {tabs.map((label, index) => (
            <Tab
              key={index}
              label={label}
              id={`tab-${index}`}
              aria-controls={`tab-panel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {children.map((child, index) => (
        <TabPanel key={index} value={value} index={index}>
          {child}
        </TabPanel>
      ))}
    </div>
  );
};

export default CustomTab;
