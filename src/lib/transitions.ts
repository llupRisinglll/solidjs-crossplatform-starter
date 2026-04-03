import { createSignal } from "solid-js";
import { getDesignLanguage } from "./platform";

export type TransitionDirection = "forward" | "back";

const [direction, setDirection] = createSignal<TransitionDirection>("forward");

export { direction, setDirection };

/**
 * Get the CSS class names for the current transition based on
 * navigation direction and design language (iOS vs Material).
 */
export function getTransitionName(): string {
  const lang = getDesignLanguage();
  const dir = direction();

  if (lang === "ios") {
    return dir === "forward" ? "slide-right" : "slide-left";
  }

  // Material design uses fade + scale for both directions
  return "fade-scale";
}
