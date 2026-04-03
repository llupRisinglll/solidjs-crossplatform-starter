import { A } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { getDesignLanguage } from "~/lib/platform";
import { setDirection } from "~/lib/transitions";

export default function Demo() {
  const [design, setDesign] = createSignal<"ios" | "material">("material");
  const [swiped, setSwiped] = createSignal(false);

  onMount(() => {
    setDesign(getDesignLanguage());
  });

  function goBack() {
    setDirection("back");
  }

  function goForward() {
    setDirection("forward");
  }

  function simulateSwipe() {
    setSwiped(true);
    setTimeout(() => setSwiped(false), 600);
  }

  return (
    <div class="flex min-h-screen flex-col items-center gap-8 p-6 pt-12">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Transitions Demo</h1>
      <p class="max-w-md text-center text-gray-600 dark:text-gray-400">
        Navigate between pages to see native-feeling transitions. Try swiping from the left edge to
        go back!
      </p>

      {/* Active transition info */}
      <div class="w-full max-w-sm rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
        <p class="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Active configuration
        </p>
        <dl class="grid grid-cols-2 gap-y-3 text-sm">
          <dt class="text-gray-500">Design language</dt>
          <dd class="font-mono font-medium text-gray-900 dark:text-white">{design()}</dd>
          <dt class="text-gray-500">Push transition</dt>
          <dd class="font-mono text-gray-900 dark:text-white">
            {design() === "ios" ? "slide-right" : "fade-scale"}
          </dd>
          <dt class="text-gray-500">Pop transition</dt>
          <dd class="font-mono text-gray-900 dark:text-white">
            {design() === "ios" ? "slide-left" : "fade-scale"}
          </dd>
          <dt class="text-gray-500">Swipe back</dt>
          <dd class="font-mono text-gray-900 dark:text-white">left edge, 30px threshold</dd>
        </dl>
      </div>

      {/* Visual transition preview */}
      <div class="w-full max-w-sm">
        <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Transition preview
        </p>
        <div class="relative h-40 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
          {/* Simulated "page" layers */}
          <div
            class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 transition-transform duration-300 dark:from-blue-950 dark:to-blue-900"
            style={{
              transform: swiped() ? "translateX(-30%)" : "translateX(0)",
              opacity: swiped() ? 0.6 : 1,
            }}
          >
            <span class="text-sm font-medium text-blue-600 dark:text-blue-300">Current Page</span>
          </div>
          <div
            class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 transition-transform duration-300 dark:from-green-950 dark:to-green-900"
            style={{
              transform: swiped() ? "translateX(0)" : "translateX(100%)",
            }}
          >
            <span class="text-sm font-medium text-green-600 dark:text-green-300">Next Page</span>
          </div>

          {/* Swipe hint */}
          <button
            onClick={simulateSwipe}
            class="absolute inset-0 flex items-end justify-center pb-3"
          >
            <span class="rounded-full bg-black/5 px-3 py-1 text-xs text-gray-500 dark:bg-white/10 dark:text-gray-400">
              Tap to preview transition
            </span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div class="flex w-full max-w-sm flex-col gap-3">
        <A
          href="/demo/detail"
          onClick={goForward}
          class="rounded-lg bg-green-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-green-700 active:bg-green-800"
        >
          Push Detail Page &rarr;
        </A>
        <A
          href="/"
          onClick={goBack}
          class="rounded-lg border border-gray-300 px-6 py-3 text-center font-medium text-gray-900 transition-colors hover:bg-gray-100 active:bg-gray-200 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
        >
          &larr; Back to Home
        </A>
      </div>
    </div>
  );
}
