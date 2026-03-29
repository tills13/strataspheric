import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const radioButton = style({
  position: "relative",
  display: "flex",
  alignItems: "stretch",
  gap: vars.spacing.xxs,
  minHeight: vars.sizes.normal,
  padding: vars.spacing.xxs,
  borderRadius: vars.borderRadius.md,
  border: `${vars.borderWidth} solid ${vars.colors.borderDefault}`,
});

export const radioButtonChip = style({
  position: "absolute",
  top: vars.spacing.xxs,
  borderRadius: vars.borderRadius.md,
  backgroundColor: vars.colors.primary,
  transition: `left ${vars.transitions.slow}, width ${vars.transitions.slow}, opacity ${vars.transitions.slow}`,
  pointerEvents: "none",
  zIndex: 0,
});

export const radioButtonButton = style({
  position: "relative",
  flex: 1,
  zIndex: 1,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  color: vars.fontColors.primary,
  borderRadius: vars.borderRadius.md,
  transition: `color ${vars.transitions.normal}`,

  selectors: {
    "&:hover": {
      backgroundColor: vars.surfaces.interactiveHover,
    },
    "&:not(:disabled):hover": {
      cursor: "pointer",
    },
  },
});

export const radioButtonButtonSelected = style({
  color: vars.fontColors.primaryInverse,

  selectors: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

export const radioButtonHiddenRadioInput = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: 0,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});
