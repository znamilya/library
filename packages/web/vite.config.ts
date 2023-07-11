import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "./docs/stats.html",
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    port: 8888,
  },
});
