import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

const platform = process.env.PLATFORM || "web";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.PLATFORM": JSON.stringify(platform),
      "import.meta.env.IS_WEB": JSON.stringify(platform === "web"),
      "import.meta.env.IS_MOBILE": JSON.stringify(platform === "mobile"),
      "import.meta.env.IS_DESKTOP": JSON.stringify(platform === "desktop"),
    },
  },
  server: {
    preset: platform === "web" ? "node-server" : "static",
  },
});
