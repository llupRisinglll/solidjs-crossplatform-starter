/**
 * Sample component test using @solidjs/testing-library.
 *
 * Run with: npx vitest run --config vitest.config.ts
 */

import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import { createSignal, createMemo } from "solid-js";

// Inline minimal counter for testing (avoids router dependency in unit tests)
function Counter() {
  const [count, setCount] = createSignal(0);
  const doubled = createMemo(() => count() * 2);

  return (
    <div>
      <span data-testid="count">{count()}</span>
      <span data-testid="doubled">{doubled()}</span>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

describe("Counter", () => {
  it("starts at zero", () => {
    render(() => <Counter />);
    expect(screen.getByTestId("count").textContent).toBe("0");
    expect(screen.getByTestId("doubled").textContent).toBe("0");
  });

  it("increments on click", async () => {
    render(() => <Counter />);
    fireEvent.click(screen.getByText("Increment"));
    expect(screen.getByTestId("count").textContent).toBe("1");
    expect(screen.getByTestId("doubled").textContent).toBe("2");
  });

  it("resets to zero", async () => {
    render(() => <Counter />);
    fireEvent.click(screen.getByText("Increment"));
    fireEvent.click(screen.getByText("Increment"));
    fireEvent.click(screen.getByText("Reset"));
    expect(screen.getByTestId("count").textContent).toBe("0");
  });
});
