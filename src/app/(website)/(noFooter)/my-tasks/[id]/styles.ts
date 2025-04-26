import { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    pt: 12,
    pb: 5,
    height: "100dvh",
    borderRadius: "25px 25px 0 0",
    overflowY: "auto",
    bgcolor: "#f5f7fa",

    ".menu": {
      position: "relative",
      flex: 1,
      ".MuiButton-root": {
        textTransform: "capitalize",
        fontSize: "14px",
        fontWeight: 400,
        color: `theme.black`,
      },
      ".MuiPopper-root": {
        width: "100%",

        ".MuiPaper-root": {
          position: "relative",
          borderRadius: "4px",
          border: "1px solid rgba(0,0,0,0.3)",
          overflow: "inital",
          // "&::after": {
          //   position: "absolute",
          //   content: "''",
          //   borderWidth: "5px",
          //   borderStyle: "solid",
          //   borderColor: " transparent transparent black transparent",
          //   bottom: "100%",
          //   left: "80%",
          //   zIndex: "999999",
          // },

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
  tabs: {
    mb: 0,
    ".tab": {
      fontWeight: 400,
    },
  },
};
