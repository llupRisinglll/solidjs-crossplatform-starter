/**
 * Optional parameter example.
 *
 * [[lang]] matches both /docs and /docs/en.
 * The param is undefined when omitted.
 *
 * URL examples:
 *   /docs       → lang = undefined (shows default)
 *   /docs/en    → lang = "en"
 *   /docs/ja    → lang = "ja"
 */

import { A, useParams } from "@solidjs/router";
import { setDirection } from "~/lib/transitions";

export default function DocsLang() {
  const params = useParams<{ lang?: string }>();

  return (
    <div class="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Optional Param</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Language: <code class="text-sm font-semibold">{params.lang ?? "(default)"}</code>
      </p>
      <p class="text-xs text-gray-400">
        Try <code>/docs</code>, <code>/docs/en</code>, or <code>/docs/ja</code>
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
