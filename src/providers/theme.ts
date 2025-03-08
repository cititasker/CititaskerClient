"use client";
import { createTheme, Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    darkGrey1: Palette["primary"];
  }
  interface PaletteOptions {
    darkGrey1: PaletteOptions["primary"];
  }
  interface PaletteOptions {
    black: PaletteOptions["primary"];
  }
}

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#236F8E",
    },
    darkGrey1: {
      main: "#CAD7DC",
    },
    black: {
      main: "#021637",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

export default theme;
