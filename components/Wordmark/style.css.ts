import { createVar, style } from "@vanilla-extract/css";

export const colorVar = createVar();

export const wordmark = style({
  position: "relative",
  textTransform: "uppercase",
  fontWeight: 900,
});

export const wordmarkText = style({
  color: colorVar,
});

export const wordmarkLogo = style({ height: 50, fill: colorVar });
