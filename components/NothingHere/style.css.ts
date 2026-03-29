import { vars } from "../../app/theme.css";
import { keyframes, style } from "@vanilla-extract/css";

const drift1 = keyframes({
  "0%": { transform: "translate(0, 0) scale(1)" },
  "33%": { transform: "translate(12px, -18px) scale(1.06)" },
  "66%": { transform: "translate(-8px, -6px) scale(0.97)" },
  "100%": { transform: "translate(0, 0) scale(1)" },
});

const drift2 = keyframes({
  "0%": { transform: "translate(0, 0) scale(1)" },
  "50%": { transform: "translate(-15px, 10px) scale(1.08)" },
  "100%": { transform: "translate(0, 0) scale(1)" },
});

const drift3 = keyframes({
  "0%": { transform: "translate(0, 0)" },
  "40%": { transform: "translate(8px, 14px)" },
  "80%": { transform: "translate(-10px, 4px)" },
  "100%": { transform: "translate(0, 0)" },
});

const glow = keyframes({
  "0%": { opacity: "0.3" },
  "50%": { opacity: "0.55" },
  "100%": { opacity: "0.3" },
});

const fadeIn = keyframes({
  "0%": { opacity: "0" },
  "100%": { opacity: "1" },
});

export const container = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: `${vars.spacing.xl} ${vars.spacing.normal}`,
  minHeight: "220px",
  overflow: "hidden",
  animation: `${fadeIn} 0.6s ease both`,
});

export const orbField = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
});

const orbBase = style({
  position: "absolute",
  borderRadius: vars.borderRadius.full,
});

export const orb1 = style([
  orbBase,
  {
    width: "140px",
    height: "140px",
    top: "10%",
    left: "calc(50% - 120px)",
    background: `radial-gradient(circle, ${vars.colors.indigo300} 0%, ${vars.colors.indigo200} 40%, transparent 70%)`,
    opacity: 0.4,
    filter: "blur(28px)",
    animation: `${drift1} 16s ease-in-out infinite, ${glow} 5s ease-in-out infinite`,
  },
]);

export const orb2 = style([
  orbBase,
  {
    width: "80px",
    height: "80px",
    top: "30%",
    left: "calc(50% + 60px)",
    background: `radial-gradient(circle, ${vars.colors.indigo400} 0%, ${vars.colors.indigo300} 30%, transparent 70%)`,
    opacity: 0.35,
    filter: "blur(16px)",
    animation: `${drift2} 13s ease-in-out infinite, ${glow} 4s ease-in-out infinite 1s`,
  },
]);

export const orb3 = style([
  orbBase,
  {
    width: "50px",
    height: "50px",
    bottom: "20%",
    left: "calc(50% - 30px)",
    border: `2px solid ${vars.colors.indigo300}`,
    background: "transparent",
    opacity: 0.35,
    animation: `${drift3} 11s ease-in-out infinite reverse`,
    boxShadow: [
      `inset 0 -2px 6px -2px ${vars.colors.indigo500}`,
      `inset 0 2px 6px -2px ${vars.colors.indigo100}`,
      `0 2px 8px -3px ${vars.colors.indigo400}`,
    ].join(", "),
  },
]);

export const orb4 = style([
  orbBase,
  {
    width: "24px",
    height: "24px",
    top: "25%",
    left: "calc(50% - 60px)",
    background: vars.colors.indigo400,
    opacity: 0.25,
    filter: "blur(4px)",
    animation: `${glow} 3.5s ease-in-out infinite 0.5s, ${drift3} 9s ease-in-out infinite`,
  },
]);

export const orb5 = style([
  orbBase,
  {
    width: "100px",
    height: "100px",
    bottom: "8%",
    left: "calc(50% + 40px)",
    background: `radial-gradient(circle, ${vars.colors.indigo200} 0%, ${vars.colors.indigo100} 30%, transparent 70%)`,
    opacity: 0.3,
    filter: "blur(22px)",
    animation: `${drift1} 19s ease-in-out infinite reverse, ${glow} 6s ease-in-out infinite 2s`,
  },
]);

export const text = style({
  position: "relative",
  color: vars.fontColors.secondary,
  fontSize: vars.fontSizes.large,
  fontFamily: vars.fontFamilies.secondaryHeader,
  letterSpacing: vars.letterSpacing.wide,
  textAlign: "center",
  animation: `${fadeIn} 0.8s ease both 0.2s`,
  opacity: 0,
});
