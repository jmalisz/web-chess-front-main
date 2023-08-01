import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

dotenv.config({ path: ".env.buildtime" });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  root: "src",
  publicDir: "../public",
  server: {
    port: 3000,
  },
  build: {
    outDir: "../dist",
  },
});
