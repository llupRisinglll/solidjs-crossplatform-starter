/**
 * Catch-all parameter example.
 *
 * [...path] matches any depth of URL segments after /files/.
 *
 * URL examples:
 *   /files/readme.md          → path = "readme.md"
 *   /files/src/lib/api.ts     → path = "src/lib/api.ts"
 *   /files/a/b/c/d            → path = "a/b/c/d"
 */

import { A, useParams } from "@solidjs/router";
import { setDirection } from "~/lib/transitions";

export default function FilesPath() {
  const params = useParams<{ path: string }>();

  return (
    <div class="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Catch-All Param</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Path: <code class="text-sm font-semibold">{params.path}</code>
      </p>
      <p class="text-xs text-gray-400">
        Try <code>/files/any/nested/path</code>
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
