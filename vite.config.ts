import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // Custom domain deploy (GitHub Pages) should use root base
  base: "/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: { outDir: "dist" }
});
