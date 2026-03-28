import { vars } from "../../app/theme.css";
import { createVar, style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

export const activeVar = createVar();

export const slider = style({
  position: "relative",
  overflow: "hidden",
});

export const slideContainer = style({
  //   height: activeVar,
  marginBottom: vars.spacing.normal,
});

export const slide = style({
  position: "absolute",
  left: calc(vars.spacing.normal).negate().toString(),
  top: 0,
  opacity: 0,
  overflow: "hidden",
  pointerEvents: "none",

  transition: `left ${vars.transitions.normal}, opacity ${vars.transitions.normal}`,
});

export const activeSlide = style([
  slide,
  {
    position: "relative",
    pointerEvents: "all",
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
  height: vars.spacing.xs,
  width: vars.spacing.large,
  borderRadius: vars.borderRadius.sm,
  backgroundColor: vars.colors.grey500,
  cursor: "pointer",
});

export const activeSlideIndicator = style([
  slideIndicator,
  {
    backgroundColor: vars.colors.grey800,
  },
]);
