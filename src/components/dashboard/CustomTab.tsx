import { Box, SxProps, Tab, Tabs, Theme } from "@mui/material";
import React from "react";

interface IProps {
  tabs: string[];
  defaultIndex?: number;
  children: any;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const style: Record<string, SxProps<Theme>> = {
  container: {
    ".MuiTabs-root": {
      borderBottom: 1,
      borderColor: "divider",
    },
    ".MuiTab-root": {
      py: "25px",
      px: "40px",
      textTransform: "none",
      fontSize: "16px",
      color: "var(--black)",
    },
    ".Mui-selected": {
      color: "var(--primary)",
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CustomTab = ({ tabs, defaultIndex = 0, children }: IProps) => {
  const [value, setValue] = React.useState(defaultIndex);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={style.container} className="relative">
      <div className="sticky top-0 z-10 bg-white">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((el, i) => (
            <Tab key={i} label={el} {...a11yProps(i)} />
          ))}
        </Tabs>
      </div>
      {React.Children.map(children, (child, i) => {
        return (
          <CustomTabPanel value={value} index={i} key={i}>
            {child}
          </CustomTabPanel>
        );
      })}
    </Box>
  );
};

export default CustomTab;
