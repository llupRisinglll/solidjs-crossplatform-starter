import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import type { Plugin } from "vite";

// Optional native dependencies that only exist in their respective runtimes.
// This plugin stubs them so both dev server and production builds work
// without installing platform-specific packages.
// Maps native dep -> list of platforms where it should be stubbed.
// Deps not installed at all (haptics) are stubbed everywhere.
// Deps installed (dialog) are only stubbed on platforms where they don't work.
const nativeDeps: Record<string, string[]> = {
  "@capacitor/haptics": ["web", "mobile", "desktop"], // not installed, stub everywhere
  "@tauri-apps/plugin-dialog": ["web", "mobile"], // installed, but only works on desktop
};

function nativeExternals(): Plugin {
  return {
    name: "native-externals",
    enforce: "pre",
    resolveId(id) {
      const stubOn = nativeDeps[id];
      if (stubOn && stubOn.includes(platform)) return `\0native-stub:${id}`;
    },
    load(id) {
      if (id.startsWith("\0native-stub:")) {
        const mod = id.slice("\0native-stub:".length);
        return `throw new Error("${mod} is not available on this platform");`;
      }
    },
  };
}

const platform = process.env.PLATFORM || "web";

const isNative = platform !== "web";

export default defineConfig({
  devOverlay: false,
  // Native platforms use HashRouter (client-only) so SSR must be disabled.
  // Otherwise the prerendered HTML uses Router, causing a hydration mismatch.
  ssr: !isNative,
  vite: {
    plugins: [tailwindcss(), nativeExternals()],
    define: {
      "import.meta.env.PLATFORM": JSON.stringify(platform),
      "import.meta.env.IS_WEB": JSON.stringify(platform === "web"),
      "import.meta.env.IS_MOBILE": JSON.stringify(platform === "mobile"),
      "import.meta.env.IS_DESKTOP": JSON.stringify(platform === "desktop"),
    },
  },
  server: {
    preset: isNative ? "static" : "node-server",
  },
});
