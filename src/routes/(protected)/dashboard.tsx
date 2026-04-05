/**
 * Example protected route — only accessible when authenticated.
 *
 * This page lives inside the (protected) route group, so it inherits
 * the AuthGuard layout. The URL is /dashboard (group name is excluded).
 */

import { A } from "@solidjs/router";
import { setDirection } from "~/lib/transitions";

export default function Dashboard() {
  return (
    <div class="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400">
        This route is protected by the <code class="text-sm">(protected)</code> route group.
      </p>
      <p class="text-sm text-gray-500">
        To test: call <code>setToken("any-value")</code> from <code>~/lib/auth</code> in the
        browser console, then navigate here.
      </p>
      <A
        href="/"
        onClick={() => setDirection("back")}
        class="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
      >
        &larr; Home
      </A>
    </div>
  );
}
