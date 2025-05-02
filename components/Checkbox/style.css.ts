import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const checkbox = style({
  display: "inline-block",
  position: "relative",

  height: vars.sizes.xs,
  width: vars.sizes.xs,

  flexShrink: 0,

  padding: 0,
  border: `${vars.borderWidth} solid ${vars.colors.borderDefault}`,
  borderRadius: vars.borderRadius,
  boxShadow: "none",
  outline: "none",
  overflow: "hidden",
  cursor: "pointer",

  selectors: {
    "&:has(input[type=checkbox]:checked), &:hover": {
      boxShadow: "inset 0px 0px 0px 2px " + vars.colors.white,
      backgroundColor: vars.colors.borderDefault,
    },

    "&:has(input[type=checkbox]:checked):hover": {
      backgroundColor: vars.colors.red100,
    },

    "&::placeholder": {
      color: vars.fontColors.placeholder,
    },

    "&:hover": {
      color: vars.fontColors.primaryInverse,
      borderColor: vars.colors.borderDefaultHover,
    },

    "&:disabled": {
      opacity: 0.7,
      cursor: "not-allowed",
    },
  },
});

export const checkboxElement = style({
  position: "absolute",
  top: -100,
  width: 1,
  height: 1,
});
