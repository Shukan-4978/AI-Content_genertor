// ---------------------------------------------------------------------------
// Application entry point (Vite version of the old CRA `src/index.js`)
// ---------------------------------------------------------------------------
// Mounts the React tree into <div id="root"> defined in `index.html`, wraps it
// with all the global providers the app needs:
//   • TanStack React Query  – server state cache
//   • AuthProvider          – user / token state via custom context
//   • Stripe <Elements>     – payment UI context
// ---------------------------------------------------------------------------

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./AuthContext/AuthContext";
import { ThemeProvider } from "./ThemeContext";

// One QueryClient instance shared across the entire app
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
      {/* React Query Devtools – disabled by default, open via floating icon */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
