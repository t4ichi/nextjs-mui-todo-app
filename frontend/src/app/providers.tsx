"use client";

import { MSWClientProvider } from "@/libs/msw/providers/msw-client-provider";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { lightTheme } from "./theme";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MSWClientProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </MSWClientProvider>
  );
}
