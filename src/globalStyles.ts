export const globalStyles: any = {
  input: {
    ".MuiFormLabel-root": {
      fontSize: "14px",
      fontWeight: 500,
      textAlign: "left",
      color: "var(--black)",
      mb: "10px",
    },
    ".MuiOutlinedInput-root": {
      border: "none",
      color: "var(--black)",
      pr: 0,
      borderRadius: "8px",
      fontSize: "16px",
      overflow: "hidden",
      py: 0,
      height: "48px",

      ".Mui-disabled": {
        // bgcolor: "rgba(217, 217, 217, 0.46) !important",
      },

      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1px solid",
        borderColor: "var(--primary)",
        boxShadow: "none",
      },

      ".MuiOutlinedInput-input::placeholder": {
        color: "var(--dark-grey-2)",
        // fontSize: "14px",
      },
      ".MuiOutlinedInput-notchedOutline": {
        // border: "1px solid rgba(219, 223, 233, 1)",
      },
      ".MuiOutlinedInput-input": {
        py: 0,
        height: "100%",
        bgcolor: "#fff",
      },
      "&:hover fieldset": {
        borderColor: "var(--black)",
      },
    },
  },
  actionBtns: {
    ".actions": {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      alignItems: "flex-end",

      button: {
        minWidth: "100px",
        height: "31px",
        borderRadius: "4.55px",
        fontSize: "15px",
        fontWeight: 600,
        fontFamily: "Inter",
        color: "#fff",

        "&.approved": {
          bgcolor: "#17C653",
        },
        "&.rejected": {
          bgcolor: "rgba(204, 0, 0, 0.20)",
          color: "#CC0000",
        },
        "&.archive": {
          bgcolor: "rgba(17, 17, 17, 0.70)",
        },
      },
    },
  },
};
