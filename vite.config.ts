import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "./",
  server: {
    host: "0.0.0.0",
    port: 4179,
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 4179,
    strictPort: true,
  },
});
