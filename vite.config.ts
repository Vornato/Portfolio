// vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  base: "/Portfolio/",                // ✅ required for GitHub Pages
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
