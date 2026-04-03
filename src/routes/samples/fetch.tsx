import { A } from "@solidjs/router";
import { createResource, createSignal, For, Show, Suspense, ErrorBoundary } from "solid-js";
import { setDirection } from "~/lib/transitions";

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function UserCard(props: { user: User }) {
  return (
    <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <h3 class="font-medium text-gray-900 dark:text-white">{props.user.name}</h3>
      <p class="text-sm text-gray-500">{props.user.email}</p>
      <p class="text-xs text-gray-400">{props.user.company.name}</p>
    </div>
  );
}

export default function DataFetch() {
  const [enabled, setEnabled] = createSignal(false);
  const [users, { refetch }] = createResource(enabled, fetchUsers);

  function goBack() {
    setDirection("back");
  }

  return (
    <div class="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Data Fetching</h1>
      <p class="text-sm text-gray-500">createResource, Suspense, and ErrorBoundary</p>

      <div class="flex gap-3">
        <button
          onClick={() => setEnabled(true)}
          disabled={enabled()}
          class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50"
        >
          {enabled() ? "Loaded" : "Fetch Users"}
        </button>
        <Show when={enabled()}>
          <button
            onClick={() => refetch()}
            class="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-white"
          >
            Refetch
          </button>
        </Show>
      </div>

      <div class="w-full max-w-sm">
        <ErrorBoundary
          fallback={(err) => (
            <div class="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
              Error: {err.message}
            </div>
          )}
        >
          <Suspense
            fallback={
              <div class="flex items-center justify-center gap-2 p-8 text-gray-500">
                <div class="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                Loading users...
              </div>
            }
          >
            <Show when={users()}>
              {(userList) => (
                <div class="space-y-3">
                  <p class="text-sm text-gray-500">{userList().length} users loaded</p>
                  <For each={userList().slice(0, 5)}>{(user) => <UserCard user={user} />}</For>
                </div>
              )}
            </Show>
          </Suspense>
        </ErrorBoundary>
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
