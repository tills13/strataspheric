import { GLOBAL_HEADER_HEIGHT_PX } from "../components/DashboardNavigation/style.css";
import { keyframes } from "@vanilla-extract/css";

import { HEADER_OFFSET_VAR } from "../theme";

/**
 * Keyframes animation that adjusts --header-offset from the full header height to 0.
 * Apply this with scroll-driven animation timeline to create sticky header effects.
 *
 * @example
 * {
 *   animationName: headerOffsetKeyframes,
 *   animationTimingFunction: "linear",
 *   animationFillMode: "both",
 *   animationTimeline: "scroll()",
 *   animationRange: `0px ${GLOBAL_HEADER_HEIGHT_PX}px`,
 * }
 */
export const headerOffsetKeyframes = keyframes({
  from: {
    vars: {
      [HEADER_OFFSET_VAR]: `${GLOBAL_HEADER_HEIGHT_PX}px`,
    },
  },
  to: {
    vars: {
      [HEADER_OFFSET_VAR]: "0px",
    },
  },
});
