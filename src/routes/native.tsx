import { A } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { detectPlatform, isMobile, isDesktop, isNative } from "~/lib/platform";
import { setDirection } from "~/lib/transitions";

export default function NativeFeatures() {
  const [result, setResult] = createSignal("");

  function goBack() {
    setDirection("back");
  }

  async function testNativeFeature() {
    const platform = detectPlatform();

    if (platform === "mobile") {
      try {
        // Example: Capacitor Haptics
        const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
        await Haptics.impact({ style: ImpactStyle.Medium });
        setResult("Haptic feedback triggered!");
      } catch {
        setResult("Capacitor Haptics not installed. Run: npm install @capacitor/haptics");
      }
    } else if (platform === "desktop") {
      try {
        // Example: Tauri dialog
        const { message } = await import("@tauri-apps/plugin-dialog");
        await message("Hello from Tauri!", { title: "Native Dialog" });
        setResult("Tauri dialog shown!");
      } catch {
        setResult("Tauri dialog plugin not installed. Run: cargo tauri plugin add dialog");
      }
    } else {
      setResult("Native features are only available on mobile (Capacitor) and desktop (Tauri).");
    }
  }

  return (
    <div class="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Native Features</h1>
      <p class="max-w-md text-center text-gray-600 dark:text-gray-400">
        Mobile uses Capacitor plugins for native APIs.
        Desktop uses Tauri plugins for native APIs.
        Web gracefully degrades.
      </p>

      <button
        onClick={testNativeFeature}
        class="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700 active:bg-purple-800"
      >
        Test Native Feature
      </button>

      <Show when={result()}>
        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm dark:border-gray-800 dark:bg-gray-900 dark:text-white">
          {result()}
        </div>
      </Show>

      <div class="max-w-md space-y-2 text-sm text-gray-500">
        <p><strong>Mobile (Capacitor):</strong> Haptics, Camera, Push Notifications, Filesystem, Biometrics</p>
        <p><strong>Desktop (Tauri):</strong> Dialogs, System Tray, File System, Shell Commands, Notifications</p>
        <p><strong>Web:</strong> Standard Web APIs, Service Workers, Web Push</p>
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
