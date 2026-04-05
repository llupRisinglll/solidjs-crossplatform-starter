# CLAUDE.md — AI Coding Instructions

This file provides context for AI coding assistants working on apps built from this starter.

## Project overview

Cross-platform SolidJS app: web (SSR), mobile (Capacitor), desktop (Tauri). Single codebase, three build targets controlled by the `PLATFORM` env var.

## Key commands

```bash
npm run dev              # Web dev server (port 3456)
npm run dev:desktop      # Desktop dev server (port 3457, SSR disabled)
npm run dev:all          # Both simultaneously
npm run build:web        # SSR build
npm run build:mobile     # Static SPA + Capacitor sync
npm run build:desktop    # Static SPA + Tauri binary
npm run test:unit        # Component tests (solid-testing-library)
npm run test:build       # Build verification (all platforms)
npm run test:e2e         # Playwright E2E
npm run lint             # ESLint
npm run format:check     # Prettier check
```

## Architecture rules

- **Web = SSR + Router.** Desktop/mobile = SPA + HashRouter. Never use server functions or SSR features in code that runs on native platforms.
- **Native imports must be dynamic** and guarded with `isMobile()` / `isDesktop()`. The `nativeExternals()` plugin stubs them on wrong platforms with a no-op proxy.
- **CSS transitions only on web.** `solid-transition-group` breaks SSR hydration in SolidStart 1.3.x. Use CSS `@keyframes` for web, JS transitions are fine for native.
- **File-based routing.** Drop `.tsx` files in `src/routes/`. Route groups use `(groupName)/` folders. Optional params: `[[param]]`. Catch-all: `[...param]`.

## Code conventions

- TypeScript strict mode, no `any` (warn level)
- Tailwind CSS v4 for styling, always include `dark:` variants
- Unused variables prefixed with `_`
- Path alias: `~/` maps to `src/`
- Commit messages: `type: short description` (conventional commits)

## File organization

| Directory         | Purpose                                           |
| ----------------- | ------------------------------------------------- |
| `src/routes/`     | Pages (file-based routing)                        |
| `src/components/` | Reusable components                               |
| `src/lib/`        | Utilities (platform, api, auth, sse, transitions) |
| `src/assets/css/` | Global styles                                     |
| `src-tauri/`      | Tauri desktop config + Rust backend               |
| `tests/unit/`     | Component tests                                   |
| `tests/build/`    | Build verification                                |
| `e2e/`            | Playwright E2E tests                              |

## Common patterns

### Platform-safe native API call

```tsx
if (isDesktop()) {
  const { message } = await import("@tauri-apps/plugin-dialog");
  await message("Hello!");
}
```

### Auth-guarded route

Place routes inside `src/routes/(protected)/` — the group layout runs AuthGuard automatically.

### API calls

Use `apiFetch("/api/endpoint")` from `~/lib/api` for platform-aware base URL. Use `fetchWithAuth()` from `~/lib/auth` when authentication is needed.

### Adding Tauri capabilities

Edit `src-tauri/capabilities/default.json` to grant permissions. See [Tauri docs](https://v2.tauri.app/security/capabilities/) for the full list.

## Testing

- **Always test against the production build** for web — `npm run build:web && npm run preview`. The Vinxi dev server has known hydration bugs with Dynamic components + CSS modules.
- Component tests use `@solidjs/testing-library` with jsdom.
- E2E tests serve the static build on port 3459.

## Gotchas

- Vinxi dev has broken hydration with `Dynamic` + CSS modules — always verify against production builds
- `solid-transition-group` + SSR = crash. Use CSS transitions for web pages.
- Desktop and web dev servers use different ports (3457 vs 3456) to avoid collisions
- The `PLATFORM` env var is baked in at build time, not runtime. Use `detectPlatform()` for runtime checks.
