import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const base = style({
  appearance: "none",
  background: "transparent",
  cursor: "pointer",
  width: vars.sizes.xxl3,

  selectors: {
    "&::-webkit-slider-runnable-track": {
      backgroundColor: vars.colors.grey600,
      borderRadius: vars.borderRadius.md,
      height: vars.spacing.small,
    },
    "&::-webkit-slider-thumb": {
      appearance: "none",
      marginTop: `-${vars.spacing.small}`,
      borderRadius: vars.borderRadius.sm,
      backgroundColor: vars.colors.grey700,
      height: vars.sizes.xs,
      width: vars.sizes.xs,
    },
    "&::placeholder": {
      color: vars.fontColors.placeholder,
    },
    "&:hover": {
      backgroundColor: vars.colors.white,
      color: vars.fontColors.primaryInverse,
      borderColor: vars.colors.borderDefaultHover,
    },
    "&:focus": {
      outline: "none",
    },
    "&:disabled": {
      cursor: "not-allowed",
    },
  },
});
