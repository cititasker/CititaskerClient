"use client";
import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Paper,
} from "@mui/material";
import { HiMiniChevronDown } from "react-icons/hi2";
import { SxProps, Theme } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const styles: Record<string, SxProps<Theme>> = {
  container: {
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "none",
    bgcolor: "transparent !important",

    ".MuiPaper-root": {
      "&.Mui-expanded": {
        my: 0,
      },
      ".MuiAccordionSummary-root": {
        px: "20px",

        ".MuiAccordionSummary-content": {
          my: "20px !important",
        },
      },

      ".MuiAccordionDetails-root": {
        px: "20px",
      },
      "&.MuiAccordion-root": {
        "&::before": {
          bgcolor: "#F3F5F6",
          height: "0.8px",
        },
      },
    },
  },
};

const checkboxStyle = {
  color: "#236F8E",
  "&.Mui-checked": {
    color: "#236F8E",
  },
};

const FilterList = () => {
  return (
    <Paper className="paper rounded-20" sx={styles.container}>
      <Accordion>
        <AccordionSummary
          expandIcon={<HiMiniChevronDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Category{" "}
        </AccordionSummary>
        <AccordionDetails>
          <div className="content">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox sx={checkboxStyle} />}
                label="Assembler & Installer"
              />
              <FormControlLabel
                control={<Checkbox sx={checkboxStyle} />}
                label="Automobile"
              />
              <FormControlLabel
                control={<Checkbox sx={checkboxStyle} />}
                label="Business"
              />
              <FormControlLabel
                control={<Checkbox sx={checkboxStyle} />}
                label="Cleaning"
              />
              <FormControlLabel
                control={<Checkbox sx={checkboxStyle} />}
                label="Event Planning"
              />
            </FormGroup>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<HiMiniChevronDown />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Location{" "}
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<HiMiniChevronDown />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Price
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default FilterList;
