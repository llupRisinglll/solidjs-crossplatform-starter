import { A } from "@solidjs/router";
import { createSignal, Show, createMemo } from "solid-js";
import { setDirection } from "~/lib/transitions";

export default function Forms() {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [submitted, setSubmitted] = createSignal(false);

  const nameError = createMemo(() => {
    if (name().length > 0 && name().trim().length < 2) return "Name must be at least 2 characters";
    return "";
  });

  const emailError = createMemo(() => {
    if (email().length > 0 && !email().includes("@")) return "Must be a valid email";
    return "";
  });

  const isValid = createMemo(
    () =>
      name().trim().length >= 2 &&
      email().includes("@") &&
      message().trim().length > 0 &&
      !nameError() &&
      !emailError(),
  );

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (!isValid()) return;
    setSubmitted(true);
  }

  function reset() {
    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(false);
  }

  function goBack() {
    setDirection("back");
  }

  return (
    <div class="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Form Handling</h1>
      <p class="text-sm text-gray-500">Inputs, validation, and derived state</p>

      <Show
        when={!submitted()}
        fallback={
          <div class="w-full max-w-sm space-y-4">
            <div class="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
              <h2 class="text-lg font-medium text-green-700 dark:text-green-400">
                Form Submitted!
              </h2>
              <dl class="mt-3 space-y-1 text-sm">
                <dt class="text-gray-500">Name</dt>
                <dd class="text-gray-900 dark:text-white">{name()}</dd>
                <dt class="mt-2 text-gray-500">Email</dt>
                <dd class="text-gray-900 dark:text-white">{email()}</dd>
                <dt class="mt-2 text-gray-500">Message</dt>
                <dd class="text-gray-900 dark:text-white">{message()}</dd>
              </dl>
            </div>
            <button
              onClick={reset}
              class="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Reset Form
            </button>
          </div>
        }
      >
        <form onSubmit={handleSubmit} class="w-full max-w-sm space-y-4">
          <div>
            <label
              for="name"
              class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name()}
              onInput={(e) => setName(e.currentTarget.value)}
              placeholder="Your name"
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
            <Show when={nameError()}>
              <p class="mt-1 text-sm text-red-500">{nameError()}</p>
            </Show>
          </div>

          <div>
            <label
              for="email"
              class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              placeholder="you@example.com"
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
            <Show when={emailError()}>
              <p class="mt-1 text-sm text-red-500">{emailError()}</p>
            </Show>
          </div>

          <div>
            <label
              for="message"
              class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message()}
              onInput={(e) => setMessage(e.currentTarget.value)}
              placeholder="Your message..."
              rows={4}
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid()}
            class="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50"
          >
            Submit
          </button>
        </form>
      </Show>

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
