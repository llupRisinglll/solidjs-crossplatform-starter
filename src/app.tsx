import { Router, HashRouter, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { type JSX, Suspense, createEffect } from "solid-js";
import { isServer } from "solid-js/web";
import { MetaProvider } from "@solidjs/meta";
import { useSwipeBack } from "~/lib/swipe-back";
import "./assets/css/app.css";

function AppLayout(props: { children: JSX.Element }) {
  useSwipeBack();

  const isNative = import.meta.env.IS_MOBILE === "true" || import.meta.env.IS_DESKTOP === "true";

  // Web: CSS-only page transition re-triggered on route change.
  // Native: platform-aware transitions can be added via solid-transition-group
  // when not using SSR (see docs for native transition setup).
  const location = useLocation();
  let pageRef: HTMLDivElement | undefined;

  createEffect(() => {
    void location.pathname; // track route changes
    if (pageRef) {
      pageRef.style.animation = "none";
      void pageRef.offsetHeight; // force reflow
      pageRef.style.animation = "";
    }
  });

  return (
    <div class="page-transition-container relative min-h-screen bg-white dark:bg-gray-950">
      <Suspense>
        <div class={isNative ? "" : "page-enter"} ref={pageRef}>
          {props.children}
        </div>
      </Suspense>
    </div>
  );
}

export default function App() {
  const platform = import.meta.env.PLATFORM || "web";
  const RouterComponent = platform === "web" || isServer ? Router : HashRouter;

  return (
    <MetaProvider>
      <RouterComponent root={AppLayout}>
        <FileRoutes />
      </RouterComponent>
    </MetaProvider>
  );
}
