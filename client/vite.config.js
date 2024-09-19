import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Your backend server
        secure: false,
        changeOrigin: true, // Helps with CORS issues
        rewrite: (path) => path.replace(/^\/api/, "/api/v1"), // Rewrites `/api` to `/v1/api`
      },
    },
  },
  plugins: [react()],
});
