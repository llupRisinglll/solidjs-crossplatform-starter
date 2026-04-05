import { A } from "@solidjs/router";
import { createSignal, For, onCleanup } from "solid-js";
// import { createSSE } from "~/lib/sse"; // uncomment for real SSE
import { setDirection } from "~/lib/transitions";

export default function SSEDemo() {
  const [messages, setMessages] = createSignal<{ time: string; data: string }[]>([]);
  const [connected, setConnected] = createSignal(false);

  // --- Mock SSE for demo (replace with real endpoint) ---
  let interval: ReturnType<typeof setInterval> | null = null;

  function startMock() {
    setConnected(true);
    interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      setMessages((prev) => [{ time: now, data: `Event at ${now}` }, ...prev].slice(0, 20));
    }, 2000);
  }

  function stopMock() {
    if (interval) clearInterval(interval);
    interval = null;
    setConnected(false);
  }

  onCleanup(stopMock);

  // --- Real SSE usage (uncomment when you have a backend) ---
  // const sse = createSSE("/api/events");
  //
  // onMount(() => {
  //   sse.on("message", (data) => {
  //     const now = new Date().toLocaleTimeString();
  //     setMessages((prev) => [{ time: now, data }, ...prev].slice(0, 50));
  //   });
  //   sse.connect();
  //   setConnected(true);
  // });
  //
  // onCleanup(() => sse.close());

  function goBack() {
    setDirection("back");
  }

  return (
    <div class="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Server-Sent Events</h1>
      <p class="text-sm text-gray-500">Real-time updates with auto-reconnect</p>

      <div class="w-full max-w-sm space-y-4">
        <div class="flex items-center gap-3">
          <div
            class={`h-3 w-3 rounded-full ${connected() ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`}
          />
          <span class="text-sm text-gray-600 dark:text-gray-400">
            {connected() ? "Connected" : "Disconnected"}
          </span>
          <button
            onClick={() => (connected() ? stopMock() : startMock())}
            class="ml-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
          >
            {connected() ? "Disconnect" : "Connect"}
          </button>
        </div>

        <div class="max-h-64 space-y-1 overflow-y-auto rounded-lg border border-gray-200 p-3 dark:border-gray-800">
          <For
            each={messages()}
            fallback={
              <p class="py-4 text-center text-sm text-gray-400">
                No events yet. Click Connect to start.
              </p>
            }
          >
            {(msg) => (
              <div class="flex gap-2 text-sm">
                <span class="shrink-0 text-gray-400">{msg.time}</span>
                <span class="text-gray-900 dark:text-white">{msg.data}</span>
              </div>
            )}
          </For>
        </div>

        <p class="text-xs text-gray-400">
          This demo uses a mock timer. Replace with <code class="text-gray-500">createSSE()</code>{" "}
          from <code class="text-gray-500">~/lib/sse</code> to connect to a real SSE endpoint. See
          the commented code in this file.
        </p>
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
