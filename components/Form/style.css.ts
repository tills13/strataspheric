import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";

export const fieldBaseActionContainer = style({
  width: "min-content",
  margin: vars.spacing.xs,
  height: calc("100%").subtract(calc(vars.spacing.xs).multiply(2)).toString(),
  flex: 0,
});

export const fieldLeftActionContainer = style([fieldBaseActionContainer, {}]);
export const fieldRightActionContainer = style([fieldBaseActionContainer, {}]);

export const fieldBase = style({
  position: "relative",

  color: vars.fontColors.primary,
  background: "none",
  backgroundColor: vars.surfaces.raised,
  border: `${vars.borderWidth} solid ${vars.colors.borderDefault}`,
  borderRadius: vars.borderRadius.md,
  boxShadow: "none",
  outline: "none",
  transition: `border-color ${vars.transitions.fast}, box-shadow ${vars.transitions.fast}`,

  selectors: {
    "&:hover": {
      borderColor: vars.colors.borderDefaultHover,
    },
    "&:focus-within": {
      borderColor: vars.colors.blue600,
      boxShadow: vars.focusRing,
    },
    [`&:has(${fieldLeftActionContainer})`]: {
      paddingLeft: 0,
    },
    [`&:has(${fieldRightActionContainer})`]: {
      paddingRight: 0,
    },
  },
});

export const field = style([
  fieldBase,
  {
    display: "flex",
    alignItems: "center",
    selectors: {
      "&:not(:has(textarea))": {
        height: vars.sizes.normal,
        padding: `0 ${vars.spacing.normal}`,
      },
    },
  },
]);
