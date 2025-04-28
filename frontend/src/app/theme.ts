"use client";
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});
