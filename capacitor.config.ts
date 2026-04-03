import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.solidcross.app",
  appName: "solid-cross",
  webDir: ".output/public",
  server: {
    // During development, point to the Vite dev server
    // url: "http://YOUR_IP:3456",
    // cleartext: true,
  },
};

export default config;
