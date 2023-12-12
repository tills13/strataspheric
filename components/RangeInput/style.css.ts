import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const base = style({
  appearance: "none",
  background: "transparent",
  cursor: "pointer",
  width: "15rem",

  selectors: {
    "&::-webkit-slider-runnable-track": {
      backgroundColor: vars.colors.grey600,
      borderRadius: "0.5rem",
      height: "0.5rem",
    },
    "&::-webkit-slider-thumb": {
      appearance: "none",
      marginTop: -8,
      borderRadius: 2,
      backgroundColor: vars.colors.grey700,
      height: vars.sizes.xs,
      width: vars.sizes.xs,
    },
    "&::placeholder": {
      color: vars.fontColors.secondary,
    },
    "&:hover": {
      backgroundColor: vars.colors.white,
      color: vars.fontColors.primaryInverse,
      opacity: 0.9,
      borderColor: vars.colors.borderDefaultHover,
    },
    // "&:hover::placeholder": {
    //     color: vars.fontColors.primaryInverse,
    // },
    "&:focus": {
      outline: "none",
    },
    "&:disabled": {
      opacity: 0.7,
      cursor: "not-allowed",
    },
  },
});
