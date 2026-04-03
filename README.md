# solid-cross

Cross-platform app boilerplate: **Web + Mobile + Desktop** using SolidJS.

## Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | SolidStart (Vinxi + Vite) | SSR, routing, API routes |
| Styling | Tailwind CSS v4 | Utility-first CSS |
| Transitions | solid-transition-group + CSS | iOS/Material native-feel page transitions |
| Mobile | Capacitor | Native APIs (camera, haptics, push, etc.) |
| Desktop | Tauri v2 | Lightweight native desktop wrapper |
| Routing | @solidjs/router | Hash routing (native) / standard (web) |

## Getting Started

```bash
npm install
npm run dev
```

## Platform Builds

```bash
# Web (SSR)
npm run build:web

# Mobile (static + Capacitor)
npm run build:mobile
npm run cap:android    # Open in Android Studio
npm run cap:ios        # Open in Xcode

# Desktop (static + Tauri)
npm run tauri:dev      # Dev with hot reload
npm run build:desktop  # Production build
```

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

iOS devices get slide push/pop transitions. Android gets Material fade+scale. Swipe-back gesture is enabled on touch devices (swipe from left edge).

Customize in `src/assets/css/transitions.css`.

## Native Features

- **Mobile**: Install Capacitor plugins (`@capacitor/camera`, `@capacitor/haptics`, etc.)
- **Desktop**: Add Tauri plugins (`cargo tauri plugin add dialog`, etc.)
- **Web**: Standard Web APIs

## Project Structure

```
solid-cross/
├── src/
│   ├── routes/          # File-based routing
│   ├── components/      # Shared components
│   ├── lib/
│   │   ├── platform.ts  # Runtime platform detection
│   │   ├── transitions.ts
│   │   └── swipe-back.ts
│   ├── assets/css/
│   │   ├── app.css
│   │   └── transitions.css
│   ├── app.tsx          # Root app with router + transitions
│   ├── entry-client.tsx
│   └── entry-server.tsx
├── src-tauri/           # Tauri desktop config + Rust
├── platform.config.ts   # Enable/disable platforms
├── app.config.ts        # SolidStart + Vite config
└── capacitor.config.ts  # Capacitor mobile config
```
