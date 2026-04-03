import { A } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import { setDirection } from "~/lib/transitions";

export default function Samples() {
  const [count, setCount] = createSignal(0);

  function goBack() {
    setDirection("back");
  }

  function goForward() {
    setDirection("forward");
  }

  const links = [
    {
      href: "/samples/counter",
      label: "Counter",
      concepts: "createSignal, createMemo, createEffect",
      color: "bg-blue-500",
    },
    {
      href: "/samples/todos",
      label: "Todo List",
      concepts: "createStore, <For>, <Show>",
      color: "bg-green-500",
    },
    {
      href: "/samples/fetch",
      label: "Data Fetching",
      concepts: "createResource, <Suspense>, <ErrorBoundary>",
      color: "bg-purple-500",
    },
    {
      href: "/samples/forms",
      label: "Form Handling",
      concepts: "Controlled inputs, validation, derived state",
      color: "bg-orange-500",
    },
  ];

  return (
    <div class="flex min-h-screen flex-col items-center gap-8 p-6 pt-12">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Sample Components</h1>
      <p class="max-w-md text-center text-gray-600 dark:text-gray-400">
        Interactive examples showcasing SolidJS patterns. Each compiles and runs on web, mobile, and
        desktop.
      </p>

      {/* Inline mini-demo */}
      <div class="w-full max-w-sm rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
        <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Quick taste — reactivity in action
        </p>
        <div class="flex items-center gap-4">
          <button
            onClick={() => setCount((c) => c - 1)}
            class="rounded-lg bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-200 active:bg-red-300"
          >
            -
          </button>
          <span class="min-w-[3ch] text-center text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
            {count()}
          </span>
          <button
            onClick={() => setCount((c) => c + 1)}
            class="rounded-lg bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-200 active:bg-green-300"
          >
            +
          </button>
        </div>
        <p class="mt-3 text-xs text-gray-400">
          This is a live <code class="text-gray-500">createSignal</code> — tap the buttons. Dive
          deeper in the samples below.
        </p>
      </div>

      {/* Sample links */}
      <div class="grid w-full max-w-sm gap-3">
        <For each={links}>
          {(link) => (
            <A
              href={link.href}
              onClick={goForward}
              class="flex items-center gap-4 rounded-lg border border-gray-200 px-5 py-4 transition-colors hover:bg-gray-50 active:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-900 dark:active:bg-gray-800"
            >
              <div class={`h-3 w-3 shrink-0 rounded-full ${link.color}`} />
              <div class="flex-1">
                <span class="font-medium text-gray-900 dark:text-white">{link.label}</span>
                <p class="text-xs text-gray-500">{link.concepts}</p>
              </div>
              <span class="text-gray-400">&rarr;</span>
            </A>
          )}
        </For>
      </div>

      <A
        href="/"
        onClick={goBack}
        class="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-100 active:bg-gray-200 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
      >
        &larr; Back to Home
      </A>
    </div>
  );
}
