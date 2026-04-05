# Architecture Decisions

This document explains the key trade-offs behind this starter. Read it to understand *why* things are set up this way before changing them.

## Why SolidStart (Vinxi) over plain Vite?

Plain Vite gives you a client-only SPA. SolidStart (powered by Vinxi) adds:

- **File-based routing** — drop a `.tsx` in `src/routes/` and it's a page
- **SSR** — server-side rendering for web, disabled for native platforms
- **Server functions** — `"use server"` for backend logic (web only)
- **Prerendering** — static generation for specific routes

The cost is a slightly more complex build pipeline, but you get a production-ready web app from day one. If you only need a SPA (no SSR, no server functions), you can set `PRESET=static` and deploy anywhere.

## Why HashRouter for native platforms?

Tauri and Capacitor load your app from disk (`file://` or `tauri://`), not from a web server. Standard `Router` generates paths like `/dashboard` which need a server to resolve. `HashRouter` uses `#/dashboard` instead, which works with any file-based hosting.

The app switches automatically based on the `PLATFORM` env var:
- Web: `Router` (clean URLs, SSR support)
- Desktop/Mobile: `HashRouter` (works with file:// protocols)

## Why CSS-only page transitions?

`solid-transition-group` breaks SSR hydration in SolidStart 1.3.x (`TypeError: template2 is not a function`). CSS `@keyframes` triggered via JS class toggling avoids this entirely.

On native platforms where SSR is disabled, you can safely use `solid-transition-group` or `ssgoi` — both are included as dependencies.

## Why Vite native-externals plugin?

Native dependencies like `@capacitor/haptics` and `@tauri-apps/plugin-dialog` reference platform-specific APIs that don't exist everywhere. Without stubs, importing them on the wrong platform crashes the build.

The `nativeExternals()` plugin in `app.config.ts` intercepts these imports and returns a no-op proxy, so code like `await import("@capacitor/haptics")` evaluates safely on web/desktop. Guard actual calls with `isMobile()` / `isDesktop()` checks.

## Why separate ports for web and desktop dev?

Web dev runs on port 3456, desktop on 3457. If both use the same port and the web server is already running, Vinxi picks a random fallback port — but Tauri's `devUrl` still points to the original, giving you a blank window.

Separate ports let you run `npm run dev:all` to develop web and desktop simultaneously.

## Why SSR is disabled for native (PLATFORM=desktop/mobile)?

Tauri's webview and Capacitor's webview load pre-built files from disk. There's no Node.js server to execute SSR. If SSR were enabled, the pre-rendered HTML would use `Router` (not `HashRouter`), causing a hydration mismatch and broken routing.

Setting `ssr: false` in `app.config.ts` when `PLATFORM !== "web"` ensures the build produces a client-only SPA that works in any webview.

## Why Content Security Policy matters

The starter ships with a basic CSP in `tauri.conf.json`:

```
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
```

This prevents XSS by restricting what resources the app can load. If your app loads external fonts, images, or API endpoints, extend the CSP:

```
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https://cdn.example.com; connect-src 'self' https://api.example.com
```

For development, you can set `"csp": null` to disable restrictions entirely.

## Why single-instance + deep-link for desktop auth?

Desktop apps can't do OAuth inside a webview (the provider blocks it for security). The standard flow is:

1. Open the system browser for sign-in
2. The OAuth callback redirects to a custom URL scheme (`myapp://auth/callback`)
3. `tauri-plugin-deep-link` catches this and forwards it to the running app
4. `tauri-plugin-single-instance` ensures the URL goes to the existing window, not a new instance

This requires `deep-link`, `opener`, and `single-instance` plugins, all pre-configured in this starter.

## Why no global state management library?

SolidJS signals and stores are the state management. Unlike React, there's no need for Redux/Zustand/Jotai because:

- `createSignal` handles simple reactive values
- `createStore` with `produce` handles complex nested state with surgical updates
- Context providers share state across the component tree

See `src/routes/samples/store.tsx` for a pattern using context + provider for global state.
