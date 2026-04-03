# solid-cross

Cross-platform app boilerplate: **Web + Mobile + Desktop** using SolidJS.

## Stack

| Layer       | Technology                     | Purpose                                              |
| ----------- | ------------------------------ | ---------------------------------------------------- |
| Framework   | SolidStart (Vinxi + Vite)      | SSR, routing, API routes                             |
| Styling     | Tailwind CSS v4                | Utility-first CSS                                    |
| Transitions | SSGOI + solid-transition-group | Spring-physics page transitions (slide, fade, scale) |
| Mobile      | Capacitor                      | Native APIs (camera, haptics, push, etc.)            |
| Desktop     | Tauri v2                       | Lightweight native desktop wrapper                   |
| Routing     | @solidjs/router                | Hash routing (native) / standard (web)               |
| Linting     | ESLint + Prettier              | Code quality + consistent formatting                 |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3456](http://localhost:3456) to see the app.

## Platform Builds

### Prerequisites

Desktop builds (Tauri) require system libraries:

**Arch Linux:**

```bash
sudo pacman -S webkit2gtk-4.1
```

**Ubuntu/Debian:**

```bash
sudo apt install libwebkit2gtk-4.1-dev build-essential libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

**Fedora:**

```bash
sudo dnf install webkit2gtk4.1-devel openssl-devel
```

See the [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) for other platforms.

### Build commands

```bash
# Web (SSR with Node server)
npm run build:web

# Mobile (static + Capacitor)
npm run build:mobile
npm run cap:android    # Open in Android Studio
npm run cap:ios        # Open in Xcode

# Desktop (static + Tauri)
npm run tauri:dev      # Dev with hot reload
npm run build:desktop  # Production build
```

## Examples

The project ships with interactive sample components that demonstrate core SolidJS patterns. Each one compiles and runs on all three platforms. Browse them at `/samples` in the running app, or read the source in `src/routes/samples/`.

### Counter (`/samples/counter`)

**Concepts:** `createSignal`, `createMemo`, `createEffect`, `onCleanup`

A reactive counter with increment/decrement buttons, auto-increment mode, and derived values.

```tsx
// Signals hold reactive state
const [count, setCount] = createSignal(0);

// Memos derive computed values that update automatically
const doubled = createMemo(() => count() * 2);
const isEven = createMemo(() => count() % 2 === 0);

// Effects run side effects and clean up automatically
createEffect(() => {
  if (!autoIncrement()) return;
  const id = setInterval(() => setCount((c) => c + 1), 1000);
  onCleanup(() => clearInterval(id));
});
```

Key takeaways:

- Signals are getter functions: call `count()` to read, `setCount()` to write
- Memos re-compute only when their dependencies change
- Effects track dependencies automatically and clean up via `onCleanup`

### Todo List (`/samples/todos`)

**Concepts:** `createStore`, `<For>`, `<Show>`, event handling

A fully functional todo list with add, toggle, and remove operations.

```tsx
// Stores provide fine-grained reactivity for complex state
const [todos, setTodos] = createStore<Todo[]>([...]);

// Granular store updates — only the changed todo re-renders
function toggleTodo(id: number) {
  setTodos(
    (t) => t.id === id,  // find the item
    "done",              // target the property
    (done) => !done,     // toggle it
  );
}
```

```tsx
// <For> efficiently renders lists — items are keyed, not recreated
<For each={todos}>
  {(todo) => <li>{todo.text}</li>}
</For>

// <Show> conditionally renders content
<Show when={total() > 0 && remaining() === 0}>
  <div>All done!</div>
</Show>
```

Key takeaways:

- Use `createStore` for arrays/objects — it updates surgically, not by replacement
- `<For>` is mandatory for lists in SolidJS (not `.map()`) — ESLint enforces this
- `<Show>` is the idiomatic way to do conditional rendering

### Data Fetching (`/samples/fetch`)

**Concepts:** `createResource`, `<Suspense>`, `<ErrorBoundary>`

Fetches users from an API with loading states and error handling.

```tsx
// createResource manages async data with built-in loading/error states
const [users, { refetch }] = createResource(enabled, fetchUsers);
```

```tsx
// ErrorBoundary catches errors thrown during rendering
<ErrorBoundary fallback={(err) => <div>Error: {err.message}</div>}>
  {/* Suspense shows a fallback while resources are loading */}
  <Suspense fallback={<Spinner />}>
    <Show when={users()}>
      {(userList) => <For each={userList().slice(0, 5)}>{(user) => <UserCard user={user} />}</For>}
    </Show>
  </Suspense>
</ErrorBoundary>
```

Key takeaways:

- `createResource` takes a source signal and a fetcher — it refetches when the source changes
- Wrap async UI in `<Suspense>` for loading states and `<ErrorBoundary>` for errors
- The callback form of `<Show>` (`{(data) => ...}`) narrows the type and avoids null checks

### Form Handling (`/samples/forms`)

**Concepts:** controlled inputs, validation with `createMemo`, derived state

A contact form with real-time validation and submission preview.

```tsx
const [name, setName] = createSignal("");
const [email, setEmail] = createSignal("");

// Validation is just derived state
const nameError = createMemo(() => {
  if (name().length > 0 && name().trim().length < 2) return "Name must be at least 2 characters";
  return "";
});

// Aggregate validity from individual checks
const isValid = createMemo(
  () => name().trim().length >= 2 && email().includes("@") && !nameError(),
);
```

```tsx
// Controlled inputs bind value + onInput
<input
  value={name()}
  onInput={(e) => setName(e.currentTarget.value)}
/>

// Disable submit until valid
<button type="submit" disabled={!isValid()}>Submit</button>
```

Key takeaways:

- Validation is just memos — no special form library needed
- SolidJS uses `onInput` (fires on every keystroke) rather than `onChange` (fires on blur)
- Use `e.currentTarget.value` in SolidJS, not `e.target.value`

## Platform Config

Toggle platforms on/off in `platform.config.ts`:

```ts
export const platformConfig = {
  web: true,
  mobile: true,
  desktop: true,
};
```

Build-time platform detection via env var:

```bash
PLATFORM=mobile npm run build   # Build for mobile only
PLATFORM=desktop npm run build  # Build for desktop only
```

Runtime platform detection:

```ts
import { detectPlatform, isMobile, isDesktop } from "~/lib/platform";
```

## Transitions

Page transitions use [SSGOI](https://ssgoi.dev) (`@ssgoi/solid`) for spring-physics animations, with `solid-transition-group` as a CSS fallback. Both systems run together — SSGOI handles element-level transitions via `<PageTransition>`, while `solid-transition-group` handles route-level CSS transitions.

- **iOS**: Slide transitions (push right / pop left)
- **Material**: Fade + scale transitions
- **Swipe back**: Left-edge gesture on touch devices (30px threshold)

SSGOI is loaded client-only (it requires SolidJS 2.0 APIs internally), so SSR prerendering works without issues.

```tsx
// Wrap each route page with PageTransition
import { PageTransition } from "~/lib/ssgoi-client";

export default function MyPage() {
  return (
    <PageTransition id="/my-page">
      <div>Page content</div>
    </PageTransition>
  );
}
```

The SSGOI config is in `src/lib/ssgoi.ts`. CSS fallback transitions are in `src/assets/css/transitions.css`.

## Native Features

- **Mobile**: Install Capacitor plugins (`@capacitor/camera`, `@capacitor/haptics`, etc.)
- **Desktop**: Add Tauri plugins (`cargo tauri plugin add dialog`, etc.)
- **Web**: Standard Web APIs

Use dynamic imports with try/catch for native deps so all platforms compile:

```tsx
async function useNativeFeature() {
  if (detectPlatform() === "mobile") {
    const { Haptics } = await import("@capacitor/haptics");
    await Haptics.impact({ style: ImpactStyle.Medium });
  }
}
```

## Linting & Formatting

The project uses ESLint with TypeScript, SolidJS, and accessibility plugins, plus Prettier for formatting.

```bash
npm run lint          # Check for lint errors
npm run lint:fix      # Auto-fix lint errors
npm run format        # Format all files with Prettier
npm run format:check  # Check formatting without writing
```

The ESLint config (`eslint.config.js`) includes:

- **typescript-eslint** — TypeScript-aware rules
- **eslint-plugin-solid** — SolidJS-specific rules (e.g., prefer `<For>` over `.map()`)
- **eslint-plugin-jsx-a11y** — Accessibility checks
- **eslint-config-prettier** — Disables rules that conflict with Prettier

## Testing

```bash
npm run test:build    # E2E build tests for all platforms
```

The build tests (`tests/build/platforms.test.ts`) verify that `vinxi build` succeeds for web, mobile, and desktop targets, and that the expected output files are produced.

## Project Structure

```
solid-cross/
├── src/
│   ├── routes/              # File-based routing
│   │   ├── index.tsx        # Home page
│   │   ├── demo.tsx         # Transitions demo
│   │   ├── demo/detail.tsx  # Nested detail page
│   │   ├── native.tsx       # Native features showcase
│   │   ├── samples.tsx      # Samples index
│   │   └── samples/
│   │       ├── counter.tsx  # Signals, memos, effects
│   │       ├── todos.tsx    # Stores, For, Show
│   │       ├── fetch.tsx    # createResource, Suspense
│   │       └── forms.tsx    # Inputs, validation
│   ├── lib/
│   │   ├── platform.ts      # Runtime platform detection
│   │   ├── transitions.ts   # Transition direction & CSS
│   │   ├── swipe-back.ts    # iOS-style swipe gesture
│   │   ├── ssgoi.ts         # SSGOI transition config
│   │   ├── ssgoi-client.ts  # Client-only SSGOI exports
│   │   ├── ssgoi-provider.tsx # SSGOI provider wrapper
│   │   └── ssgoi-transition.tsx # PageTransition wrapper
│   ├── assets/css/
│   │   ├── app.css          # Tailwind + transition imports
│   │   └── transitions.css  # Platform-specific animations
│   ├── app.tsx              # Root app with router + transitions
│   ├── entry-client.tsx     # Client entry point
│   └── entry-server.tsx     # Server entry point
├── src-tauri/               # Tauri desktop config + Rust
├── tests/
│   └── build/
│       └── platforms.test.ts # E2E build verification
├── platform.config.ts       # Enable/disable platforms
├── app.config.ts            # SolidStart + Vite config
├── capacitor.config.ts      # Capacitor mobile config
├── eslint.config.js         # ESLint configuration
└── .prettierrc              # Prettier configuration
```
