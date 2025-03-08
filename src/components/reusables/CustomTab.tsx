import { Box, SxProps, Tab, Tabs, Theme } from "@mui/material";
import React from "react";

interface IProps {
  tabs: string[];
  defaultIndex?: number;
  children: any;
  sx?: any;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const style: Record<string, SxProps<Theme>> = {
  container: {
    borderBottom: 1,
    borderColor: "divider",
    mb: "24px",

    ".MuiTab-root": {
      py: "10px",
      px: "20px",
      textTransform: "none",
      fontSize: "20px",
      fontWeight: 600,
      color: "var(--black)",
    },
    ".Mui-selected": {
      color: "var(--primary) !important",
    },
    ".MuiTabs-indicator": {
      bgcolor: "var(--primary)",
    },
  },
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CustomTab = ({ tabs, defaultIndex = 0, children, sx = {} }: IProps) => {
  const [value, setValue] = React.useState(defaultIndex);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ ...style.container, ...sx }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((el, i) => (
            <Tab key={i} label={el} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>
      {React.Children.map(children, (child, i) => {
        return (
          <CustomTabPanel value={value} index={i} key={i}>
            {child}
          </CustomTabPanel>
        );
      })}
    </div>
  );
};

export default CustomTab;
