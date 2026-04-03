import { A } from "@solidjs/router";
import { setDirection } from "~/lib/transitions";

export default function Detail() {
  function goBack() {
    setDirection("back");
  }

  return (
    <div class="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Detail Page</h1>
      <p class="max-w-md text-center text-gray-600 dark:text-gray-400">
        This is a detail page pushed onto the navigation stack.
        Notice the slide-in transition on iOS or fade-scale on Android.
      </p>

      <div class="rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-white shadow-lg">
        <p class="text-lg font-medium">Native transitions, zero native dependencies.</p>
      </div>

      <A
        href="/demo"
        onClick={goBack}
        class="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-100 active:bg-gray-200 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
      >
        &larr; Back to Demo
      </A>
    </div>
  );
}
