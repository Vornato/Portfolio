import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // required for GitHub Pages project sites
  base: "/Portfolio/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: { outDir: "dist" }
});
