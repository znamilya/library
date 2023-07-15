import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./ui/shared/App";

const queryClient = new QueryClient();

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "5.653rem",
    },
    h2: {
      fontSize: "3.998rem",
    },
    h3: {
      fontSize: "2.827rem",
    },
    h4: {
      fontSize: "1.999rem",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
