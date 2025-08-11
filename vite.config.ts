import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/portfolio/", // ⬅ change this to your exact repo name
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
