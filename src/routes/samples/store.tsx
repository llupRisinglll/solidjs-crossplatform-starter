import { A } from "@solidjs/router";
import { createMemo, For, Show } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { setDirection } from "~/lib/transitions";

interface Contact {
  id: number;
  name: string;
  email: string;
  tags: string[];
}

interface AppState {
  contacts: Contact[];
  selectedId: number | null;
}

export default function StoreDemo() {
  const [state, setState] = createStore<AppState>({
    contacts: [
      { id: 1, name: "Alice", email: "alice@example.com", tags: ["friend"] },
      { id: 2, name: "Bob", email: "bob@example.com", tags: ["work", "dev"] },
      { id: 3, name: "Carol", email: "carol@example.com", tags: ["work"] },
    ],
    selectedId: null,
  });

  let nextId = 4;

  const selected = createMemo(() => state.contacts.find((c) => c.id === state.selectedId) ?? null);
  const tagCounts = createMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of state.contacts) {
      for (const t of c.tags) counts[t] = (counts[t] ?? 0) + 1;
    }
    return counts;
  });

  function addContact() {
    const id = nextId++;
    setState(
      produce((s) => {
        s.contacts.push({ id, name: `Contact ${id}`, email: `c${id}@example.com`, tags: [] });
      }),
    );
  }

  function addTag(contactId: number, tag: string) {
    setState(
      "contacts",
      (c) => c.id === contactId,
      produce((c) => {
        if (!c.tags.includes(tag)) c.tags.push(tag);
      }),
    );
  }

  function removeContact(id: number) {
    setState("contacts", (prev) => prev.filter((c) => c.id !== id));
    if (state.selectedId === id) setState("selectedId", null);
  }

  function goBack() {
    setDirection("back");
  }

  return (
    <div class="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Store & Produce</h1>
      <p class="text-sm text-gray-500">createStore, produce, nested updates, derived state</p>

      <div class="w-full max-w-sm space-y-4">
        {/* Tag summary */}
        <div class="flex flex-wrap gap-2 text-xs">
          <For each={Object.entries(tagCounts())}>
            {([tag, count]) => (
              <span class="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {tag}: {count as number}
              </span>
            )}
          </For>
          <Show when={Object.keys(tagCounts()).length === 0}>
            <span class="text-gray-400">No tags yet</span>
          </Show>
        </div>

        {/* Contact list */}
        <ul role="listbox" class="space-y-2">
          <For each={state.contacts}>
            {(contact) => (
              <li
                role="option"
                aria-selected={state.selectedId === contact.id}
                tabIndex={0}
                class={`cursor-pointer rounded-lg border px-4 py-3 transition-colors ${
                  state.selectedId === contact.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
                }`}
                onClick={() => setState("selectedId", contact.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setState("selectedId", contact.id);
                }}
              >
                <div class="flex items-center justify-between">
                  <div>
                    <span class="font-medium text-gray-900 dark:text-white">{contact.name}</span>
                    <p class="text-xs text-gray-500">{contact.email}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeContact(contact.id);
                    }}
                    class="text-sm text-red-500 hover:text-red-700"
                    aria-label="Remove contact"
                  >
                    Remove
                  </button>
                </div>
                <div class="mt-2 flex flex-wrap gap-1">
                  <For each={contact.tags}>
                    {(tag) => (
                      <span class="rounded bg-gray-200 px-1.5 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {tag}
                      </span>
                    )}
                  </For>
                </div>
              </li>
            )}
          </For>
        </ul>

        {/* Actions */}
        <div class="flex gap-2">
          <button
            onClick={addContact}
            class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
          >
            Add Contact
          </button>
          <Show when={selected()}>
            {(sel) => (
              <button
                onClick={() => addTag(sel().id, "starred")}
                class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-white"
              >
                Tag "{sel().name}" as starred
              </button>
            )}
          </Show>
        </div>
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
