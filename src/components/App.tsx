"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
}
