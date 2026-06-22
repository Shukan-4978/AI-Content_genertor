// Vite configuration for the MERN AI Content Generator Frontend
// - Uses the official React plugin for Fast Refresh + JSX support
// - Allows JSX syntax inside `.js` files (project was originally CRA, so most
//   components use the `.js` extension instead of `.jsx`)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      // Treat every .js / .jsx file under src/ as a JSX-capable module so we
      // do not have to rename every CRA file to .jsx
      include: "**/*.{js,jsx}",
    }),
  ],
  // CRA used to expose the dev server on port 3000 — keep the same default
  server: {
    port: 3000,
    open: true,
  },
  esbuild: {
    // Allow JSX in plain .js files (CRA convention)
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
});
