import { useNavigate } from "@solidjs/router";
import { isServer } from "solid-js/web";
import { onCleanup, onMount } from "solid-js";
import { setDirection } from "./transitions";

const EDGE_THRESHOLD = 30; // px from left edge to trigger
const SWIPE_MIN_DISTANCE = 80; // min px to complete swipe
const SWIPE_VELOCITY_THRESHOLD = 0.3; // px/ms

/**
 * Enable iOS-style swipe-back gesture navigation.
 * Call this in a component's setup to attach gesture listeners.
 */
export function useSwipeBack() {
  if (isServer) return;

  const navigate = useNavigate();

  let startX = 0;
  let startY = 0;
  let startTime = 0;
  let tracking = false;

  function onTouchStart(e: TouchEvent) {
    const touch = e.touches[0];
    if (touch.clientX > EDGE_THRESHOLD) return;
    startX = touch.clientX;
    startY = touch.clientY;
    startTime = Date.now();
    tracking = true;
  }

  function onTouchEnd(e: TouchEvent) {
    if (!tracking) return;
    tracking = false;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - startX;
    const dy = Math.abs(touch.clientY - startY);
    const dt = Date.now() - startTime;
    const velocity = dx / dt;

    // Must be mostly horizontal and meet distance or velocity threshold
    if (dx > 0 && dy < dx && (dx > SWIPE_MIN_DISTANCE || velocity > SWIPE_VELOCITY_THRESHOLD)) {
      setDirection("back");
      navigate(-1);
    }
  }

  function onTouchCancel() {
    tracking = false;
  }

  onMount(() => {
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("touchcancel", onTouchCancel, { passive: true });
  });

  onCleanup(() => {
    document.removeEventListener("touchstart", onTouchStart);
    document.removeEventListener("touchend", onTouchEnd);
    document.removeEventListener("touchcancel", onTouchCancel);
  });
}
