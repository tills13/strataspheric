import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const base = style({
  display: "block",
  height: vars.sizes.normal,
  padding: `0 ${vars.spacing.small}`,
  color: vars.fontColors.primary,
  background: "none",
  border: `2px solid ${vars.colors.grey700}`,
  borderRadius: vars.borderRadius,
  boxShadow: "none",
  outline: "none",

  selectors: {
    "&::placeholder": {
      color: vars.fontColors.secondary,
    },
    "&:hover": {
      backgroundColor: vars.colors.white,
      color: vars.fontColors.primaryInverse,
      opacity: 0.9,
    },
    // "&:hover::placeholder": {
    //     color: vars.fontColors.primaryInverse,
    // },
    "&:focus": {
      backgroundColor: vars.colors.white,
      color: vars.fontColors.primaryInverse,
      opacity: 1,
    },
    "&:disabled": {
      opacity: 0.7,
      cursor: "not-allowed",
    },
  },
});

export const textarea = style([
  base,
  {
    padding: `${vars.spacing.small} ${vars.spacing.normal}`,
    height: "auto",
  },
]);

export const compact = style([
  base,
  {
    height: vars.sizes.small,
    padding: `0 ${vars.spacing.small}`,
  },
]);
