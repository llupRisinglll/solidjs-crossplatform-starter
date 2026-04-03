import { A } from "@solidjs/router";
import { createSignal, createEffect, createMemo, onCleanup } from "solid-js";
import { setDirection } from "~/lib/transitions";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const [autoIncrement, setAutoIncrement] = createSignal(false);
  const doubled = createMemo(() => count() * 2);
  const isEven = createMemo(() => count() % 2 === 0);

  createEffect(() => {
    if (!autoIncrement()) return;
    const id = setInterval(() => setCount((c) => c + 1), 1000);
    onCleanup(() => clearInterval(id));
  });

  function goBack() {
    setDirection("back");
  }

  return (
    <div class="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Counter</h1>
      <p class="text-sm text-gray-500">Signals, memos, effects, and cleanup</p>

      <div class="flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-900">
        <span class="text-6xl font-bold tabular-nums text-gray-900 dark:text-white">{count()}</span>

        <div class="flex gap-3">
          <button
            onClick={() => setCount((c) => c - 1)}
            class="rounded-lg bg-red-100 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-200 active:bg-red-300"
          >
            -1
          </button>
          <button
            onClick={() => setCount(0)}
            class="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-300 active:bg-gray-400"
          >
            Reset
          </button>
          <button
            onClick={() => setCount((c) => c + 1)}
            class="rounded-lg bg-green-100 px-4 py-2 font-medium text-green-700 transition-colors hover:bg-green-200 active:bg-green-300"
          >
            +1
          </button>
        </div>

        <button
          onClick={() => setAutoIncrement((v) => !v)}
          class={`rounded-lg px-4 py-2 font-medium transition-colors ${
            autoIncrement()
              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          {autoIncrement() ? "Stop Auto" : "Auto +1/sec"}
        </button>

        <dl class="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
          <dt class="text-gray-500">Doubled</dt>
          <dd class="font-mono text-gray-900 dark:text-white">{doubled()}</dd>
          <dt class="text-gray-500">Parity</dt>
          <dd class="font-mono text-gray-900 dark:text-white">{isEven() ? "even" : "odd"}</dd>
        </dl>
      </div>

      <A
        href="/samples"
        onClick={goBack}
        class="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-100 active:bg-gray-200 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
      >
        &larr; Back to Samples
      </A>
    </div>
  );
}
