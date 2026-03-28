import { vars } from "../../app/theme.css";
import { createVar, style } from "@vanilla-extract/css";

export const colorVar = createVar();

export const wordmark = style({
  position: "relative",
  textTransform: "uppercase",
  fontWeight: vars.fontWeights.xbold,
});

export const wordmarkText = style({
  color: colorVar,
});

export const wordmarkLogo = style({ height: vars.sizes.large, fill: colorVar });
