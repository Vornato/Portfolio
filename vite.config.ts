import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// vite.config.ts
export default defineConfig({
  base: "/Portfolio/",   // must match your repo name exactly
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
