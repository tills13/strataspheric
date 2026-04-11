/**
 * Ethereal Design Language
 *
 * A cohesive set of glassy, luminous styles inspired by the hero orbs.
 * Two surface types:
 *   - "frost" — backdrop-blur frosted glass panels
 *   - "glow"  — soft radial light accents
 *
 * Use these as building blocks. Combine a frost surface with a glow accent
 * to create depth. Keep usage restrained — one or two ethereal touches per
 * section is enough to carry the mood without overwhelming content.
 */

import { vars } from "./theme.css";
import { keyframes, style } from "@vanilla-extract/css";

/* ------------------------------------------------------------------ */
/*  Glass / Frost Surfaces                                             */
/* ------------------------------------------------------------------ */

/** Frosted glass panel — semi-transparent white with backdrop blur.
 *  Use on cards, image backdrops, and elevated containers. */
export const glassSurface = style({
  background: "rgba(255, 255, 255, 0.55)",
  backdropFilter: "blur(24px) saturate(1.4)",
  WebkitBackdropFilter: "blur(24px) saturate(1.4)",
  border: `1px solid rgba(255, 255, 255, 0.7)`,
  boxShadow: [
    "0 4px 24px -4px rgba(67, 56, 202, 0.12)",
    "0 8px 40px -8px rgba(67, 56, 202, 0.08)",
    "0 1px 2px rgba(0, 0, 0, 0.03)",
    `inset 0 1px 0 rgba(255, 255, 255, 0.6)`,
  ].join(", "),
});

/** Lighter frost — for subtle containers that sit atop a glass surface. */
export const glassSubtle = style({
  background: "rgba(255, 255, 255, 0.35)",
  backdropFilter: "blur(16px) saturate(1.2)",
  WebkitBackdropFilter: "blur(16px) saturate(1.2)",
  border: `1px solid rgba(255, 255, 255, 0.5)`,
  boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.4)`,
});

/** Glass ring — transparent center with a luminous indigo border,
 *  mimicking the hero ring orbs. Use sparingly as a decorative accent. */
export const glassRing = style({
  background: "transparent",
  border: `1.5px solid ${vars.colors.indigo200}`,
  borderRadius: "50%",
  boxShadow: [
    `inset 0 -3px 8px -3px ${vars.colors.indigo400}`,
    `inset 0 3px 8px -3px ${vars.colors.indigo100}`,
    `0 2px 8px -3px ${vars.colors.indigo300}`,
  ].join(", "),
  opacity: 0.45,
});

/* ------------------------------------------------------------------ */
/*  Glow Accents                                                       */
/* ------------------------------------------------------------------ */

/** Soft ambient glow — a blurred radial gradient orb.
 *  Position with absolute/relative and size via width/height. */
export const glowOrb = style({
  position: "absolute",
  borderRadius: "50%",
  background: `radial-gradient(circle, ${vars.colors.indigo300} 0%, ${vars.colors.indigo100} 35%, transparent 70%)`,
  filter: "blur(30px)",
  opacity: 0.3,
  pointerEvents: "none",
});

/** Lighter glow for use near content — won't overpower text. */
export const glowOrbSubtle = style({
  position: "absolute",
  borderRadius: "50%",
  background: `radial-gradient(circle, ${vars.colors.indigo200} 0%, transparent 70%)`,
  filter: "blur(40px)",
  opacity: 0.2,
  pointerEvents: "none",
});

/* ------------------------------------------------------------------ */
/*  Luminous Highlights                                                */
/* ------------------------------------------------------------------ */

/** A soft indigo glow shadow — apply to featured elements (labels, buttons)
 *  to give them a subtle "lit from within" quality. */
export const luminousGlow = style({
  boxShadow: `0 0 12px -2px rgba(67, 56, 202, 0.15), 0 0 4px -1px rgba(67, 56, 202, 0.1)`,
});

/** Gradient border shimmer — a 1px border that shifts from indigo to
 *  transparent, giving edges a light-catching quality. */
export const shimmerBorder = style({
  borderImage: `linear-gradient(135deg, ${vars.colors.indigo200}, transparent 60%) 1`,
});

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/* ------------------------------------------------------------------ */

export const floatSlow = keyframes({
  "0%": { transform: "translate(0, 0)" },
  "50%": { transform: "translate(8px, -12px)" },
  "100%": { transform: "translate(0, 0)" },
});

export const floatMedium = keyframes({
  "0%": { transform: "translate(0, 0) scale(1)" },
  "33%": { transform: "translate(15px, -20px) scale(1.04)" },
  "66%": { transform: "translate(-10px, 10px) scale(0.96)" },
  "100%": { transform: "translate(0, 0) scale(1)" },
});

export const pulseSoft = keyframes({
  "0%": { opacity: "0.2" },
  "50%": { opacity: "0.35" },
  "100%": { opacity: "0.2" },
});
