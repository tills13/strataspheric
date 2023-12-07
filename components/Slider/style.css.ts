import { vars } from "../../app/theme.css";
import { createVar, style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

export const activeVar = createVar();

export const slider = style({
  position: "relative",
  overflow: "hidden",
});

export const slideContainer = style({
  height: activeVar,
  marginBottom: vars.spacing.normal,
});

export const slide = style({
  position: "absolute",
  left: calc(vars.spacing.normal).negate().toString(),
  opacity: 0,
  overflow: "hidden",

  transition: "left 0.25s ease, opacity 0.25s ease",
});

export const activeSlide = style([
  slide,
  {
    left: 0,
    opacity: 1,
  },
]);

export const slideIndicatorContainer = style({
  display: "flex",
  gap: vars.spacing.small,
  justifyContent: "center",
});

export const slideIndicator = style({
  display: "block",
  height: 4,
  width: 30,
  borderRadius: vars.borderRadius,
  backgroundColor: vars.colors.grey500,
  cursor: "pointer",
});

export const activeSlideIndicator = style([
  slideIndicator,
  {
    backgroundColor: vars.colors.grey800,
  },
]);
