import { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    mt: "10px",
    height: "calc(100% - 10px)",
    borderRadius: "25px 25px 0 0",
    overflowY: "auto",

    ".menu": {
      position: "relative",
      ".MuiButton-root": {
        textTransform: "capitalize",
        fontSize: "14px",
        fontWeight: 400,
        color: `theme.black`,
      },
      ".MuiPopper-root": {
        width: "100%",
        top: "3px !important",

        ".MuiPaper-root": {
          position: "relative",
          borderRadius: "4px",
          border: "1px solid rgba(0,0,0,0.3)",
          overflow: "inital",
          "&::after": {
            position: "absolute",
            content: "''",
            borderWidth: "5px",
            borderStyle: "solid",
            borderColor: " transparent transparent black transparent",
            bottom: "100%",
            left: "80%",
            zIndex: "999999",
          },

          ".MuiList-root": {
            ".MuiMenuItem-root": {
              py: "10px",
              fontSize: "14px",
              borderBottom: "1px solid rgba(0,0,0,0.3)",
              "&:last-child": {
                borderBottom: "none",
              },
            },
          },
        },
      },
    },
  },
};
