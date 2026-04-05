# solidjs-crossplatform-starter

Cross-platform SolidJS starter: web (SSR), mobile (Capacitor), desktop (Tauri). Single codebase, three build targets.

## Commands

```bash
npm run dev              # Web dev (port 3456)
npm run dev:desktop      # Desktop dev (port 3457, SSR disabled)
npm run dev:all          # Both simultaneously
npm run build:web        # SSR build
npm run build:mobile     # Static SPA + Capacitor sync
npm run build:desktop    # Tauri binary
npm run lint             # ESLint
npm run format:check     # Prettier check
npm run test:unit        # Component tests (solid-testing-library + jsdom)
npm run test:build       # Build verification (all platforms)
npm run test:e2e         # Playwright E2E (serves static build on :3459)
```

## Conventions

- TypeScript strict mode, `~/*` maps to `src/*`
- Tailwind CSS v4, always include `dark:` variants
- Commit messages: `type: short description` (conventional commits)
- No AI attribution in commits or PRs

## Gotchas

- **SSR is web-only.** Desktop/mobile use static SPA + HashRouter. Never use server functions or SSR features in code that runs on native platforms.
- **Native imports must be dynamic** and guarded with `isMobile()`/`isDesktop()`. The `nativeExternals()` plugin stubs them as no-op proxies on wrong platforms.
- **`solid-transition-group` breaks SSR hydration** in SolidStart 1.3.x. Use CSS `@keyframes` for web. JS transitions are fine on native (SSR disabled).
- **Always test against production build** for web. Vinxi dev has known hydration bugs with `Dynamic` + CSS modules.
- **`PLATFORM` is baked at build time**, not runtime. Use `detectPlatform()` for runtime checks.
- **Ports 3456 (web) and 3457 (desktop) are separate** to avoid collisions. If both use the same port, Vinxi silently falls back to a random port and Tauri gets a blank window.
