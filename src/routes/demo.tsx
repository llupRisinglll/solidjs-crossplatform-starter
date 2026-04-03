import { A } from "@solidjs/router";
import { setDirection } from "~/lib/transitions";

export default function Demo() {
  function goBack() {
    setDirection("back");
  }

  function goForward() {
    setDirection("forward");
  }

  return (
    <div class="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Transitions Demo</h1>
      <p class="max-w-md text-center text-gray-600 dark:text-gray-400">
        Navigate between pages to see native-feeling transitions.
        On iOS devices, you'll get slide transitions.
        On Android, you'll get Material fade + scale.
        Try swiping from the left edge to go back!
      </p>

      <div class="flex flex-col gap-3">
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
