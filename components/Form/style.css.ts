import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

import { padding } from "../../theme";

export const fieldBaseActionContainer = style({
  width: "min-content",
  margin: vars.spacing.xs,
  height: calc("100%").subtract(calc(vars.spacing.xs).multiply(2)).toString(),
  flex: 0,
});

export const fieldLeftActionContainer = style([fieldBaseActionContainer, {}]);
export const fieldRightActionContainer = style([fieldBaseActionContainer, {}]);

export const field = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  color: vars.fontColors.primary,
  background: "none",
  backgroundColor: vars.colors.white,
  border: `${vars.borderWidth} solid ${vars.colors.borderDefault}`,
  borderRadius: vars.borderRadius,
  boxShadow: "none",
  outline: "none",

  selectors: {
    "&:not(:has(textarea))": {
      height: "44px",
      padding: `0 ${vars.spacing.normal}`,
    },
    "&:hover": {
      borderColor: vars.colors.borderDefaultHover,
    },
    [`&:has(${fieldLeftActionContainer})`]: {
      paddingLeft: 0,
    },
    [`&:has(${fieldRightActionContainer})`]: {
      paddingRight: 0,
    },
  },
});

export const fieldLabel = style({
  position: "absolute",
  pointerEvents: "none",
  top: "-11px",
  left: calc(vars.spacing.normal).subtract(vars.spacing.small).toString(),
  padding: padding(0, vars.spacing.small),
  fontWeight: vars.fontWeights.bold,
  color: vars.fontColors.secondary,
  zIndex: 100,

  selectors: {
    "&:before": {
      position: "absolute",
      left: 0,
      right: 0,
      top: 9,
      display: "block",
      backgroundColor: vars.colors.white,
      height: vars.borderWidth,
      content: " ",
      padding: `0 ${vars.spacing.small}`,
      zIndex: -1,
    },
  },
});
