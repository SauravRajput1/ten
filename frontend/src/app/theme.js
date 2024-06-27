"use client";
import { Open_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const openSans = Open_Sans({ subsets: ["latin"] });

const theme = createTheme({
  typography: {
    fontFamily: openSans.style.fontFamily,
  },
});

export default theme;
