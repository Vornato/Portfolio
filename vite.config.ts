<<<<<<< HEAD
// vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  base: "/Portfolio/",                // ✅ required for GitHub Pages
=======
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
