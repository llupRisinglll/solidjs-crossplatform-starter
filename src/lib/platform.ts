/**
 * Runtime platform detection.
 * Use these for runtime checks (UI adaptation, feature gating).
 * For build-time exclusion, use PLATFORM env var in app.config.ts.
 */

export type Platform = "web" | "mobile" | "desktop";

export function detectPlatform(): Platform {
  // Build-time platform override
  const buildPlatform = import.meta.env.PLATFORM;
  if (buildPlatform && buildPlatform !== "web") {
    return buildPlatform as Platform;
  }

  if (typeof window === "undefined") return "web";

  // Tauri desktop detection
  if ("__TAURI__" in window) return "desktop";

  // Capacitor mobile detection
  if ("Capacitor" in window && (window as any).Capacitor?.isNativePlatform?.()) {
    return "mobile";
  }

  return "web";
}

export function isMobile(): boolean {
  return detectPlatform() === "mobile";
}

export function isDesktop(): boolean {
  return detectPlatform() === "desktop";
}

export function isWeb(): boolean {
  return detectPlatform() === "web";
}

export function isNative(): boolean {
  const p = detectPlatform();
  return p === "mobile" || p === "desktop";
}

/**
 * Detect if the device prefers iOS or Material design language.
 * Useful for adapting transition styles.
 */
export function getDesignLanguage(): "ios" | "material" {
  if (typeof navigator === "undefined") return "material";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("macintosh")) {
    return "ios";
  }
  return "material";
}
