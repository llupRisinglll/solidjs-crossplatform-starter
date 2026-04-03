import { Router, HashRouter } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { type JSX, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Transition } from "solid-transition-group";
import { getTransitionName } from "~/lib/transitions";
import { useSwipeBack } from "~/lib/swipe-back";
import "./assets/css/app.css";

function AppLayout(props: { children: JSX.Element }) {
  useSwipeBack();

  return (
    <div class="page-transition-container relative min-h-screen bg-white dark:bg-gray-950">
      <Transition name={getTransitionName()}>
        <Suspense>{props.children}</Suspense>
      </Transition>
    </div>
  );
}

export default function App() {
  const platform = import.meta.env.PLATFORM || "web";
  const RouterComponent = platform === "web" || isServer ? Router : HashRouter;

  return (
    <RouterComponent root={AppLayout}>
      <FileRoutes />
    </RouterComponent>
  );
}
