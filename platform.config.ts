/**
 * Platform compilation config.
 * Set platforms to `false` to exclude them from builds.
 */
export const platformConfig = {
  web: true,
  mobile: true,
  desktop: true,
} as const;

export type Platform = keyof typeof platformConfig;

/**
 * Check if a platform is enabled at build time.
 * Usage: if (isPlatformEnabled("mobile")) { ... }
 */
export function isPlatformEnabled(platform: Platform): boolean {
  return platformConfig[platform];
}
