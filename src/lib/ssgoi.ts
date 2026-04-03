import { slide, fade, scale } from "@ssgoi/solid/transitions";
import type { SsgoiConfig } from "@ssgoi/solid";
import { getDesignLanguage } from "./platform";

/**
 * Build the SSGOI transition config based on the detected design language.
 * - iOS: slide transitions (drill-style push/pop)
 * - Material: fade + scale transitions
 */
export function createSsgoiConfig(): SsgoiConfig {
  const lang = getDesignLanguage();

  const iosTransition = slide({ direction: "left", fade: true });
  const materialTransition = {
    in: (el: HTMLElement) => {
      const fadeIn = fade().in?.(el);
      const scaleIn = scale({ start: 0.95 }).in?.(el);
      if (!fadeIn && !scaleIn) return { tick: () => {} };
      return {
        tick: (p: number) => {
          fadeIn?.tick?.(p);
          scaleIn?.tick?.(p);
        },
      };
    },
    out: (el: HTMLElement) => {
      const fadeOut = fade().out?.(el);
      const scaleOut = scale({ start: 0.95 }).out?.(el);
      if (!fadeOut && !scaleOut) return { tick: () => {} };
      return {
        tick: (p: number) => {
          fadeOut?.tick?.(p);
          scaleOut?.tick?.(p);
        },
      };
    },
  };

  const defaultTransition = lang === "ios" ? iosTransition : materialTransition;

  return {
    defaultTransition,
    skipAnimationOnBack: ["ios"],
  };
}
