import { Router, HashRouter } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Transition } from "solid-transition-group";
import { getTransitionName } from "~/lib/transitions";
import { useSwipeBack } from "~/lib/swipe-back";
import "./assets/css/app.css";

function AppLayout(props: { children: any }) {
  useSwipeBack();

  return (
    <div class="page-transition-container min-h-screen bg-white dark:bg-gray-950">
      <Transition name={getTransitionName()}>
        <Suspense>{props.children}</Suspense>
      </Transition>
    </div>
  );
}

export default function App() {
  // Web uses standard Router (supports SSR).
  // Mobile/Desktop use HashRouter (works in native webviews without a server).
  const platform = import.meta.env.PLATFORM || "web";
  const RouterComponent = platform === "web" ? Router : HashRouter;

  return (
    <RouterComponent root={AppLayout}>
      <FileRoutes />
    </RouterComponent>
  );
}
