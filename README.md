<div align="center">
  <h1>solidjs-crossplatform-starter</h1>
  <p><strong>One codebase. Three platforms. Ship everywhere.</strong></p>
  <p>
    A production-ready starter for building <strong>web</strong>, <strong>mobile</strong>, and <strong>desktop</strong> apps<br/>
    with SolidStart, Capacitor, and Tauri.
  </p>

  <p>
    <a href="https://github.com/llupRisinglll/solidjs-crossplatform-starter/blob/main/LICENSE"><img src="https://img.shields.io/github/license/llupRisinglll/solidjs-crossplatform-starter?style=flat-square" alt="MIT License"></a>
    <a href="https://github.com/llupRisinglll/solidjs-crossplatform-starter/stargazers"><img src="https://img.shields.io/github/stars/llupRisinglll/solidjs-crossplatform-starter?style=flat-square" alt="Stars"></a>
    <a href="https://github.com/llupRisinglll/solidjs-crossplatform-starter/issues"><img src="https://img.shields.io/github/issues/llupRisinglll/solidjs-crossplatform-starter?style=flat-square" alt="Issues"></a>
    <a href="https://github.com/llupRisinglll/solidjs-crossplatform-starter/pulls"><img src="https://img.shields.io/github/issues-pr/llupRisinglll/solidjs-crossplatform-starter?style=flat-square" alt="Pull Requests"></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/SolidJS-335d92?style=flat-square&logo=solid&logoColor=white" alt="SolidJS">
    <img src="https://img.shields.io/badge/Tauri_v2-24C8D8?style=flat-square&logo=tauri&logoColor=white" alt="Tauri v2">
    <img src="https://img.shields.io/badge/Capacitor_8-119EFF?style=flat-square&logo=capacitor&logoColor=white" alt="Capacitor 8">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4">
    <img src="https://img.shields.io/badge/ssgoi-8B5CF6?style=flat-square&logoColor=white" alt="ssgoi">
  </p>

  <p>
    <a href="https://github.com/new?template_name=solidjs-crossplatform-starter&template_owner=llupRisinglll">
      <img src="https://img.shields.io/badge/Use_this_template-2ea44f?style=for-the-badge&logo=github&logoColor=white" alt="Use this template">
    </a>
  </p>

  <p>
    <a href="#prerequisites">Prerequisites</a> &bull;
    <a href="#getting-started">Getting Started</a> &bull;
    <a href="#platform-builds">Build for Any Platform</a> &bull;
    <a href="#examples">Examples</a> &bull;
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## Why this starter?

Most cross-platform solutions force you to pick one: Electron for desktop, React Native for mobile, or SSR for web. This starter gives you **all three from a single SolidJS codebase**:

- **Web** — SSR with SolidStart, deployed as a Node server
- **Mobile** — Native iOS & Android via [Capacitor](https://capacitorjs.com) (real native APIs, not a webview wrapper)
- **Desktop** — Lightweight native apps via [Tauri v2](https://v2.tauri.app) (~10MB binary, not 200MB Electron)

No code duplication. No framework lock-in. Just SolidJS everywhere.

The project runs on **SolidStart** (Vinxi + Vite) for file-based routing and SSR, styled with **Tailwind CSS v4**. Mobile targets iOS and Android via **Capacitor 8** — real native APIs, not a webview wrapper. Desktop targets macOS, Linux, and Windows via **Tauri v2**, producing a ~10MB binary instead of Electron's 200MB. Page transitions are powered by **ssgoi** — iOS-style slide and Material fade+scale work out of the box. The whole thing is written in strict **TypeScript**, with ESLint, Prettier, and Vitest build tests preconfigured.

## Prerequisites

| Requirement | Needed for | Install |
|-------------|-----------|---------|
| Node.js ≥ 18 | All platforms | [nodejs.org](https://nodejs.org) |
| Rust + Cargo | Desktop builds only | [rustup.rs](https://rustup.rs) |
| Xcode | iOS builds only | Mac App Store |
| Android Studio | Android builds only | [developer.android.com](https://developer.android.com/studio) |

> **Just exploring?** Web development works with Node.js alone — no Rust, Xcode, or Android Studio needed. Add them later when you're ready to target desktop or mobile.

## Getting Started

```bash
# Clone and install
git clone https://github.com/llupRisinglll/solidjs-crossplatform-starter.git
cd solidjs-crossplatform-starter
npm install

# Start developing
npm run dev
```

Open [http://localhost:3456](http://localhost:3456) — you'll see a fully working demo app with interactive samples covering SolidJS reactivity patterns and a native features page that adapts to your current platform.

## Platform Builds

### Web

```bash
npm run build:web     # SSR build (Node server)
npm run preview       # Preview the production build
```

### Mobile (iOS & Android)

First time? Generate the native projects:

```bash
npx cap add ios       # creates ios/ directory
npx cap add android   # creates android/ directory
```

Then build and open:

```bash
npm run build:mobile  # Static build + Capacitor sync
npm run cap:ios       # Open in Xcode
npm run cap:android   # Open in Android Studio
```

### Desktop (macOS, Linux, Windows)

Desktop builds require system libraries. Install once:

<details>
<summary><strong>Arch Linux</strong></summary>

```bash
sudo pacman -S webkit2gtk-4.1
```
</details>

<details>
<summary><strong>Ubuntu / Debian</strong></summary>

```bash
sudo apt install libwebkit2gtk-4.1-dev build-essential libssl-dev libayatana-appindicator3-dev librsvg2-dev
```
</details>

<details>
<summary><strong>Fedora</strong></summary>

```bash
sudo dnf install webkit2gtk4.1-devel openssl-devel
```
</details>

<details>
<summary><strong>macOS / Windows</strong></summary>

See the [Tauri prerequisites guide](https://v2.tauri.app/start/prerequisites/).
</details>

Then build:

```bash
npm run build:desktop   # Production binary + installer
npm run tauri:dev       # Dev with hot reload
```

## How It Works

The same SolidJS code runs everywhere. The build system handles the differences:

| | Web | Mobile | Desktop |
|---|---|---|---|
| **Rendering** | SSR (Node server) | Client-side SPA | Client-side SPA |
| **Routing** | Standard Router | HashRouter | HashRouter |
| **Native APIs** | Web APIs | Capacitor plugins | Tauri plugins |
| **Output** | `.output/server/` | `.output/public/` | Binary + installer |

### Platform Build Modes

Web uses **SSR** (server-side rendering) with `Router` for full SEO and streaming. Native platforms (desktop, mobile) use **static SPA** mode with `HashRouter` because there's no server to render HTML — Tauri and Capacitor load files directly from disk.

This means server functions, streaming, and other SSR features are **web-only**. Code that runs on native platforms must work entirely on the client. The build system handles this automatically via the `PLATFORM` env var.

### Backend Integration

Most apps talk to a backend. The starter provides:

- **Vite proxy** — Uncomment the proxy config in `app.config.ts` to forward `/api` calls to your backend during development (avoids CORS)
- **`src/lib/api.ts`** — Platform-aware API base URL resolution. Web uses relative paths (works with proxy in dev, same-origin in prod). Desktop defaults to `http://localhost:4000` for a sidecar backend. Set `VITE_API_URL` in `.env` to override.
- **`src/lib/auth.ts`** — Token management and `fetchWithAuth()` wrapper that attaches Bearer tokens and redirects on 401

### Auth Guard

The starter includes a provider-agnostic auth pattern:

```tsx
// Wrap individual components
<AuthGuard fallback={<p>Redirecting...</p>}>
  <ProtectedContent />
</AuthGuard>

// Or use route groups — see src/routes/(protected)/
// All routes in (protected)/ are automatically guarded
```

Replace `isAuthenticated()` in `src/lib/auth.ts` with your auth provider's check (Supabase, Better Auth, Firebase, etc.).

### Dark Mode & Theming

The starter respects `prefers-color-scheme` out of the box. All sample components use Tailwind's `dark:` variants. For manual control, use the `ThemeToggle` component:

```tsx
import ThemeToggle from "~/components/ThemeToggle";
// renders a system/light/dark cycle button
```

### Platform Detection

```tsx
import { detectPlatform, isMobile, isDesktop } from "~/lib/platform";

// Runtime — adapts UI at runtime
const platform = detectPlatform(); // "web" | "mobile" | "desktop"

// Build-time — tree-shakes platform-specific code
if (import.meta.env.IS_DESKTOP) {
  // Only included in desktop builds
}
```

### Native Features

Use dynamic imports so all platforms compile cleanly:

```tsx
async function triggerHaptic() {
  if (detectPlatform() === "mobile") {
    const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
    await Haptics.impact({ style: ImpactStyle.Medium });
  } else if (detectPlatform() === "desktop") {
    const { message } = await import("@tauri-apps/plugin-dialog");
    await message("Hello from Tauri!", { title: "Native Dialog" });
  }
}
```

### Transitions

Pages transition automatically based on the detected design language:

- **iOS** — Slide push/pop (swipe-back gesture from left edge)
- **Material** — Fade + scale

Customize in `src/assets/css/transitions.css`.

## Examples

The starter includes interactive samples that compile on all platforms. Run the app and visit `/samples`, or read the source in `src/routes/samples/`.

| Sample | Route | Concepts |
|--------|-------|----------|
| **Counter** | `/samples/counter` | `createSignal`, `createMemo`, `createEffect`, `onCleanup` |
| **Todo List** | `/samples/todos` | `createStore`, `<For>`, `<Show>`, event handling |
| **Data Fetching** | `/samples/fetch` | `createResource`, `<Suspense>`, `<ErrorBoundary>` |
| **Form Handling** | `/samples/forms` | Controlled inputs, validation, derived state |
| **Store & Produce** | `/samples/store` | `createStore`, `produce`, nested state, derived |
| **Server-Sent Events** | `/samples/sse` | `createSSE`, real-time updates, auto-reconnect |

<details>
<summary><strong>Counter — Signals & Reactivity</strong></summary>

```tsx
const [count, setCount] = createSignal(0);
const doubled = createMemo(() => count() * 2);

createEffect(() => {
  if (!autoIncrement()) return;
  const id = setInterval(() => setCount((c) => c + 1), 1000);
  onCleanup(() => clearInterval(id));
});
```
</details>

<details>
<summary><strong>Todo List — Stores & Fine-Grained Updates</strong></summary>

```tsx
const [todos, setTodos] = createStore<Todo[]>([]);

// Surgically update one property on one item — no re-render of the list
setTodos((t) => t.id === id, "done", (done) => !done);
```
</details>

<details>
<summary><strong>Data Fetching — Resources & Suspense</strong></summary>

```tsx
const [users, { refetch }] = createResource(enabled, fetchUsers);

<ErrorBoundary fallback={(err) => <div>Error: {err.message}</div>}>
  <Suspense fallback={<Spinner />}>
    <For each={users()}>{(user) => <UserCard user={user} />}</For>
  </Suspense>
</ErrorBoundary>
```
</details>

<details>
<summary><strong>Form Handling — Validation as Derived State</strong></summary>

```tsx
const [email, setEmail] = createSignal("");
const emailError = createMemo(() =>
  email().length > 0 && !email().includes("@") ? "Invalid email" : "",
);
const isValid = createMemo(() => email().includes("@") && !emailError());
```
</details>

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start web dev server on port 3456 |
| `npm run dev:desktop` | Start desktop dev server on port 3457 (SSR disabled) |
| `npm run dev:all` | Run web + desktop dev servers simultaneously |
| `npm run build:web` | Build for web (SSR) |
| `npm run build:mobile` | Build for mobile (static + Capacitor) |
| `npm run build:desktop` | Build for desktop (static + Tauri) |
| `npm run tauri:dev` | Desktop dev server with hot reload |
| `npm run cap:ios` | Open iOS project in Xcode |
| `npm run cap:android` | Open Android project in Android Studio |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier |
| `npm run test:unit` | Component tests (solid-testing-library) |
| `npm run test:build` | E2E build tests for all platforms |
| `npm run test:e2e` | Playwright E2E tests |

## Project Structure

```
solidjs-crossplatform-starter/
├── src/
│   ├── routes/                  # File-based routing
│   │   ├── index.tsx            # Home page
│   │   ├── native.tsx           # Native features showcase
│   │   ├── (protected).tsx      # Auth-guarded route group layout
│   │   ├── (protected)/
│   │   │   └── dashboard.tsx    # Example protected route → /dashboard
│   │   ├── demo/
│   │   │   ├── index.tsx        # Transitions demo
│   │   │   └── detail.tsx       # Detail page (push transition)
│   │   ├── docs/
│   │   │   └── [[lang]].tsx     # Optional param → /docs, /docs/en
│   │   ├── files/
│   │   │   └── [...path].tsx    # Catch-all param → /files/any/path
│   │   └── samples/
│   │       ├── index.tsx        # Samples index with inline demo
│   │       ├── counter.tsx      # Signals, memos, effects
│   │       ├── todos.tsx        # Stores, For, Show
│   │       ├── fetch.tsx        # createResource, Suspense
│   │       ├── forms.tsx        # Inputs, validation
│   │       ├── store.tsx        # createStore, produce, nested state
│   │       └── sse.tsx          # Server-Sent Events demo
│   ├── components/
│   │   ├── AuthGuard.tsx        # Route guard (redirect if unauthenticated)
│   │   └── ThemeToggle.tsx      # Dark/light/system theme switcher
│   ├── lib/
│   │   ├── platform.ts          # Runtime platform detection
│   │   ├── api.ts               # Platform-aware API base URL + fetch
│   │   ├── auth.ts              # Token management + fetchWithAuth
│   │   ├── sse.ts               # SSE client with auto-reconnect
│   │   ├── transitions.ts       # Transition direction & CSS
│   │   └── swipe-back.ts        # iOS-style swipe gesture
│   ├── assets/css/
│   │   ├── app.css              # Tailwind, dark mode, scrollbars
│   │   └── transitions.css      # iOS slide / Material fade+scale
│   ├── app.tsx                  # Root layout with router + transitions
│   ├── entry-client.tsx         # Client entry point
│   └── entry-server.tsx         # Server entry point
├── src-tauri/                   # Tauri config + Rust backend
├── tests/
│   ├── build/                   # Build verification tests
│   └── unit/                    # Component tests (solid-testing-library)
├── e2e/                         # Playwright E2E tests
├── .github/workflows/ci.yml    # CI: lint, test, E2E
├── docs/                        # Architecture decisions & guides
├── app.config.ts                # SolidStart + Vite + devtools config
├── capacitor.config.ts          # Capacitor config
├── platform.config.ts           # Enable/disable platforms
├── eslint.config.js             # ESLint config
└── .prettierrc                  # Prettier config
```

## Making It Your Own

Everything in `src/routes/samples/` and `src/routes/demo/` is demo content — safe to delete once you start building your app.

### 1. Choose your platforms

Edit `platform.config.ts` to disable platforms you don't need:

```ts
export const platformConfig = {
  web: true,
  mobile: false,  // disables Capacitor
  desktop: true,
};
```

This prevents unused native dependencies from being bundled into other platform builds.

### 2. Add your own routes

Drop `.tsx` files into `src/routes/` — SolidStart picks them up automatically via file-based routing:

```
src/routes/
├── index.tsx        # → /
├── about.tsx        # → /about
└── dashboard/
    └── index.tsx    # → /dashboard
```

> **Route precedence:** Static routes always take priority over dynamic `[param]` routes. If you have both `src/routes/admin.tsx` and `src/routes/[slug].tsx`, visiting `/admin` will always render the static route. No need for a `reserved-routes.ts` guard.

### 3. Call native APIs safely

Use dynamic imports so all platforms compile cleanly, regardless of which native SDKs are installed:

```tsx
const platform = detectPlatform(); // "web" | "mobile" | "desktop"

if (platform === "mobile") {
  const { Camera } = await import("@capacitor/camera");
  // iOS/Android only
} else if (platform === "desktop") {
  const { open } = await import("@tauri-apps/plugin-dialog");
  // macOS/Linux/Windows only
}
```

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) before submitting a pull request.

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE)
