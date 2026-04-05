/**
 * Server-Sent Events (SSE) utility with automatic reconnect.
 *
 * Usage:
 *   const sse = createSSE("/api/events");
 *   sse.on("message", (data) => console.log(data));
 *   sse.connect();
 *   // later: sse.close();
 *
 * For WebSocket instead, replace EventSource with WebSocket and adjust
 * the message handling — the reconnect pattern is the same.
 */

import { getApiBaseUrl } from "~/lib/api";

export interface SSEOptions {
  /** Max reconnect attempts before giving up. Default: Infinity */
  maxRetries?: number;
  /** Base delay in ms between retries (doubles each attempt). Default: 1000 */
  retryDelay?: number;
  /** Max delay cap in ms. Default: 30000 */
  maxDelay?: number;
}

type SSEHandler = (data: string, event: MessageEvent) => void;

export function createSSE(path: string, options: SSEOptions = {}) {
  const { maxRetries = Infinity, retryDelay = 1000, maxDelay = 30_000 } = options;

  const listeners = new Map<string, Set<SSEHandler>>();
  let source: EventSource | null = null;
  let retries = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;

  function connect() {
    close();
    const url = `${getApiBaseUrl()}${path}`;
    source = new EventSource(url);

    source.onopen = () => {
      retries = 0;
    };

    source.onmessage = (event) => {
      dispatch("message", event);
    };

    source.onerror = () => {
      source?.close();
      source = null;
      if (retries < maxRetries) {
        const delay = Math.min(retryDelay * 2 ** retries, maxDelay);
        retries++;
        timer = setTimeout(connect, delay);
      }
    };

    // Register named event listeners
    for (const [type] of listeners) {
      if (type !== "message") {
        source.addEventListener(type, ((e: MessageEvent) => dispatch(type, e)) as EventListener);
      }
    }
  }

  function dispatch(type: string, event: MessageEvent) {
    listeners.get(type)?.forEach((fn) => fn(event.data, event));
  }

  function on(type: string, handler: SSEHandler) {
    if (!listeners.has(type)) listeners.set(type, new Set());
    listeners.get(type)!.add(handler);
    // If already connected, add to the live source
    if (source && type !== "message") {
      source.addEventListener(type, ((e: MessageEvent) => handler(e.data, e)) as EventListener);
    }
  }

  function off(type: string, handler: SSEHandler) {
    listeners.get(type)?.delete(handler);
  }

  function close() {
    if (timer) clearTimeout(timer);
    timer = null;
    source?.close();
    source = null;
  }

  return { connect, close, on, off };
}
