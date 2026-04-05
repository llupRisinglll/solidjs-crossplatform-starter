import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
// import devtools from "solid-devtools/vite"; // uncomment when solid-devtools supports your Vite version
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
  "@tauri-apps/plugin-deep-link": ["web", "mobile"],
  "@tauri-apps/plugin-opener": ["web", "mobile"],
  "@tauri-apps/plugin-shell": ["web", "mobile"],
  "@tauri-apps/plugin-updater": ["web", "mobile"],
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
        // Return a no-op proxy so imports don't crash at evaluation time.
        // Code using native APIs should guard with isMobile()/isDesktop() checks.
        return `export default new Proxy({}, { get: () => () => {} });`;
      }
    },
  };
}

const platform = process.env.PLATFORM || "web";
const preset = process.env.PRESET || (platform !== "web" ? "static" : "node-server");

const isNative = platform !== "web";

export default defineConfig({
  devOverlay: false,
  // Native platforms use HashRouter (client-only) so SSR must be disabled.
  // Otherwise the prerendered HTML uses Router, causing a hydration mismatch.
  ssr: !isNative,
  vite: {
    plugins: [
      // solid-devtools: click-to-source, component tree, signal inspector (dev only)
      // devtools({ autoname: true }), // uncomment after installing solid-devtools
      tailwindcss(),
      nativeExternals(),
    ],

    // Proxy API calls to your backend during development.
    // Avoids CORS issues when your backend runs on a different port.
    // server: {
    //   proxy: {
    //     "/api": {
    //       target: "http://localhost:4000",
    //       changeOrigin: true,
    //     },
    //   },
    // },

    define: {
      "import.meta.env.PLATFORM": JSON.stringify(platform),
      "import.meta.env.IS_WEB": JSON.stringify(platform === "web"),
      "import.meta.env.IS_MOBILE": JSON.stringify(platform === "mobile"),
      "import.meta.env.IS_DESKTOP": JSON.stringify(platform === "desktop"),
    },
  },
  server: {
    // Use PRESET env to override. Examples:
    //   PRESET=static  → SSG for Cloudflare Pages, Netlify, etc.
    //   PRESET=cloudflare-pages → Cloudflare Pages with edge functions
    //   (default) node-server for web, static for native
    preset,

    // Uncomment to prerender specific routes during static builds:
    // prerender: {
    //   routes: ["/", "/about", "/pricing"],
    //   crawlLinks: true, // auto-discover linked pages from the routes above
    // },
  },
});
