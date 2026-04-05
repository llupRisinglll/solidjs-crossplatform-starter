# Changelog

All notable changes to this project are documented here.

## [Unreleased]

### Added

- **Backend integration**: commented Vite proxy example in `app.config.ts`, `src/lib/api.ts` with platform-aware API base URL and `apiFetch()` wrapper
- **Auth pattern**: `src/lib/auth.ts` with token management and `fetchWithAuth()`, `src/components/AuthGuard.tsx` route guard component
- **Store sample**: `src/routes/samples/store.tsx` demonstrating `createStore`, `produce`, nested state, and derived memos
- **SSE utility**: `src/lib/sse.ts` with auto-reconnect and exponential backoff, `src/routes/samples/sse.tsx` demo page
- **Dark mode**: `prefers-color-scheme` support in `app.css`, thin scrollbar CSS, `src/components/ThemeToggle.tsx` (system/light/dark cycle)
- **Tauri plugins**: shell, deep-link, opener, single-instance, window-state, updater (commented) with capabilities configured
- **Desktop dev**: `dev:desktop` script on port 3457 (SSR disabled), `dev:all` with concurrently for parallel web + desktop dev
- **Route groups**: `src/routes/(protected)/` with AuthGuard layout and example dashboard page
- **Router examples**: optional param `[[lang]]` and catch-all `[...path]` route demos
- **CI/CD**: `.github/workflows/ci.yml` with lint, format check, build tests, and Playwright E2E
- **Component tests**: `vitest.config.ts` for jsdom, `@solidjs/testing-library`, sample counter test
- **Documentation**: `CLAUDE.md` (AI coding instructions), `llms.txt` (file index), `docs/architecture.md` (architecture decisions)
- **CSP**: production Content Security Policy in `tauri.conf.json`
- Native dependency stubs changed from throwing to no-op proxy (progressive enhancement)

### Fixed

- `beforeDevCommand` in `tauri.conf.json` now uses `dev:desktop` with `PLATFORM=desktop`
- Desktop dev server uses separate port 3457 to avoid collision with web dev on 3456
- ESLint downgraded to v9 for `eslint-plugin-jsx-a11y` peer dep compatibility
- `@eslint/js` aligned to v9 to match ESLint version
- All files formatted with Prettier
- Test artifacts (`test-results/`, `playwright-report/`) added to `.gitignore`

## [0.1.0] — 2025-04-04

### Added

- **Initial scaffold**: SolidStart + Vinxi + Vite cross-platform project structure
- **Platform detection**: runtime (`detectPlatform()`, `isMobile()`, `isDesktop()`) and build-time (`PLATFORM` env)
- **Three build targets**: web (SSR with Node server), mobile (Capacitor static SPA), desktop (Tauri static SPA)
- **File-based routing**: `src/routes/` with automatic route discovery
- **Page transitions**: iOS slide and Material fade+scale via ssgoi, CSS-only fallback for SSR safety
- **Swipe-back gesture**: iOS-style edge swipe navigation in `src/lib/swipe-back.ts`
- **Sample pages**: counter (signals/memos/effects), todos (stores/For/Show), fetch (createResource/Suspense), forms (validation/derived state)
- **Native features page**: platform-adaptive demo of Capacitor haptics and Tauri dialogs
- **Transitions demo**: visual preview of push/pop animations per design language
- **Tauri desktop**: v2 config with dialog plugin, window settings, icon set
- **Capacitor mobile**: v8 config for iOS and Android
- **Tailwind CSS v4**: utility-first styling with viewport-fit for notches
- **ESLint**: SolidJS, TypeScript, jsx-a11y, and Prettier plugins
- **Prettier**: consistent formatting with `.prettierrc`
- **Vitest build tests**: verifies web/mobile/desktop compilation output
- **Playwright E2E tests**: 18 tests covering meta tags, static builds, transitions, env vars, route precedence
- **@solidjs/meta**: `MetaProvider` with per-route `<Title>` and `<Meta>` tags
- **Static builds**: `build:static` script, `PRESET` env, Cloudflare Pages `_headers`/`_redirects`
- **Platform config**: `platform.config.ts` to enable/disable web, mobile, desktop
- **Community files**: `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `LICENSE` (MIT)
