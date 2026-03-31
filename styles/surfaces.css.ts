import { vars } from "../app/theme.css";
import { style } from "@vanilla-extract/css";

import { colorMix } from "./utils";

/**
 * A frosted-glass surface inspired by the marketing orb aesthetic.
 * Semi-transparent with heavy backdrop blur for an ethereal, nebulous feel.
 * Use on sticky headers, floating panels, overlays, etc.
 */
export const glassSurface = style({
  backgroundColor: colorMix(vars.colors.white, 55),
  backdropFilter: "blur(24px) saturate(1.6)",
  WebkitBackdropFilter: "blur(24px) saturate(1.6)",
  borderBottom: `1px solid ${colorMix(vars.colors.indigo200, 30)}`,
  boxShadow: [
    `0 4px 24px ${colorMix(vars.colors.indigo300, 10)}`,
    `0 1px 8px ${colorMix(vars.colors.indigo400, 6)}`,
    `inset 0 1px 0 ${colorMix(vars.colors.white, 50)}`,
  ].join(", "),
});
