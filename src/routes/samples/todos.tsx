import { A } from "@solidjs/router";
import { createSignal, For, Show, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import { setDirection } from "~/lib/transitions";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function Todos() {
  const [todos, setTodos] = createStore<Todo[]>([
    { id: 1, text: "Try the counter sample", done: false },
    { id: 2, text: "Build something with solid-cross", done: false },
    { id: 3, text: "Deploy to all platforms", done: false },
  ]);
  const [input, setInput] = createSignal("");
  let nextId = 4;

  const remaining = createMemo(() => todos.filter((t) => !t.done).length);
  const total = createMemo(() => todos.length);

  function addTodo(e: Event) {
    e.preventDefault();
    const text = input().trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: nextId++, text, done: false }]);
    setInput("");
  }

  function toggleTodo(id: number) {
    setTodos(
      (t) => t.id === id,
      "done",
      (done) => !done,
    );
  }

  function removeTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function goBack() {
    setDirection("back");
  }

  return (
    <div class="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Todo List</h1>
      <p class="text-sm text-gray-500">Stores, For, Show, and event handling</p>

      <div class="w-full max-w-sm space-y-4">
        <form onSubmit={addTodo} class="flex gap-2">
          <input
            type="text"
            value={input()}
            onInput={(e) => setInput(e.currentTarget.value)}
            placeholder="Add a todo..."
            class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
          <button
            type="submit"
            class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
          >
            Add
          </button>
        </form>

        <div class="text-sm text-gray-500">
          {remaining()} of {total()} remaining
        </div>

        <ul class="space-y-2">
          <For each={todos}>
            {(todo) => (
              <li class="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-800">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  class={`h-5 w-5 shrink-0 rounded border-2 transition-colors ${
                    todo.done
                      ? "border-green-500 bg-green-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  aria-label={todo.done ? "Mark incomplete" : "Mark complete"}
                />
                <span
                  class={`flex-1 ${todo.done ? "text-gray-400 line-through" : "text-gray-900 dark:text-white"}`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => removeTodo(todo.id)}
                  class="text-sm text-red-500 transition-colors hover:text-red-700"
                  aria-label="Remove todo"
                >
                  Remove
                </button>
              </li>
            )}
          </For>
        </ul>

        <Show when={total() > 0 && remaining() === 0}>
          <div class="rounded-lg bg-green-50 p-4 text-center text-green-700 dark:bg-green-900/20 dark:text-green-400">
            All done!
          </div>
        </Show>
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
