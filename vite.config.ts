import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Self-hosted Pretendard subsets (see scripts/gen-pretendard-css.mjs).
      "@pretendard-subset": path.resolve(
        __dirname,
        "./node_modules/pretendard/dist/web/static/woff2-dynamic-subset"
      ),
    },
  },
})
