import { A } from "@solidjs/router";
import { Title, Meta } from "@solidjs/meta";
import { createSignal, onMount } from "solid-js";
import { detectPlatform, getDesignLanguage } from "~/lib/platform";
import { setDirection } from "~/lib/transitions";

export default function Home() {
  const [platform, setPlatform] = createSignal("detecting...");
  const [design, setDesign] = createSignal("detecting...");

  onMount(() => {
    setPlatform(detectPlatform());
    setDesign(getDesignLanguage());
  });

  function navigateForward() {
    setDirection("forward");
  }

  return (
    <div class="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      {/* Per-route SEO — MetaProvider in app.tsx makes these work during SSR/SSG */}
      <Title>solid-cross — Cross-platform SolidJS Boilerplate</Title>
      <Meta name="description" content="Cross-platform boilerplate with SolidJS, SolidStart, Capacitor, and Tauri." />

      <h1 class="text-4xl font-bold text-gray-900 dark:text-white">solid-cross</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        Cross-platform boilerplate with SolidJS
      </p>

      <div class="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Platform Info
        </h2>
        <dl class="grid grid-cols-2 gap-2 text-sm">
          <dt class="text-gray-500">Runtime</dt>
          <dd class="font-mono text-gray-900 dark:text-white">{platform()}</dd>
          <dt class="text-gray-500">Design</dt>
          <dd class="font-mono text-gray-900 dark:text-white">{design()}</dd>
          <dt class="text-gray-500">Build target</dt>
          <dd class="font-mono text-gray-900 dark:text-white">
            {import.meta.env.PLATFORM || "web"}
          </dd>
        </dl>
      </div>

      <nav class="flex flex-col gap-3">
        <A
          href="/demo"
          onClick={navigateForward}
          class="rounded-lg bg-blue-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
        >
          Transitions Demo &rarr;
        </A>
        <A
          href="/samples"
          onClick={navigateForward}
          class="rounded-lg bg-green-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-green-700 active:bg-green-800"
        >
          Sample Components &rarr;
        </A>
        <A
          href="/native"
          onClick={navigateForward}
          class="rounded-lg border border-gray-300 px-6 py-3 text-center font-medium text-gray-900 transition-colors hover:bg-gray-100 active:bg-gray-200 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
        >
          Native Features &rarr;
        </A>
      </nav>
    </div>
  );
}
