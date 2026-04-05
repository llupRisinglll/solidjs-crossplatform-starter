/**
 * Platform-aware API base URL resolution.
 *
 * Reads from VITE_API_URL env var with sensible defaults:
 * - Web (dev):     Vite proxy handles /api → backend (no origin needed)
 * - Web (prod):    Relative path (same origin) or set VITE_API_URL
 * - Desktop:       Sidecar backend on localhost, e.g. http://localhost:4000
 * - Mobile:        Remote server URL (set VITE_API_URL)
 */

const DEFAULTS: Record<string, string> = {
  web: "", // relative path — works with Vite proxy in dev, same-origin in prod
  desktop: "http://localhost:4000", // sidecar backend
  mobile: "", // must be set via VITE_API_URL for mobile
};

export function getApiBaseUrl(): string {
  const env = import.meta.env.VITE_API_URL;
  if (env) return env.replace(/\/+$/, ""); // strip trailing slash

  const platform = import.meta.env.PLATFORM || "web";
  return DEFAULTS[platform] ?? "";
}

/**
 * Convenience wrapper around fetch with the API base URL prepended.
 *
 * Usage:
 *   const res = await apiFetch("/api/users");
 *   const data = await res.json();
 */
export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  const base = getApiBaseUrl();
  return fetch(`${base}${path}`, init);
}
