import { vars } from "../../app/theme.css";
import { focusableFieldBase } from "../../styles/fields.css";
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

export const fieldBase = style([
  focusableFieldBase,
  {
    position: "relative",

    color: vars.fontColors.primary,
    borderRadius: vars.borderRadius.md,

    selectors: {
      [`&:has(${fieldLeftActionContainer})`]: {
        paddingLeft: 0,
      },
      [`&:has(${fieldRightActionContainer})`]: {
        paddingRight: 0,
      },
    },
  },
]);

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
