import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const base = style({
  display: "block",
  padding: `${vars.spacing.small} ${vars.spacing.normal}`,
  color: vars.fontColors.primary,
  background: "none",
  backgroundColor: vars.colors.white,
  border: `2px solid ${vars.colors.borderDefault}`,
  borderRadius: vars.borderRadius,
  boxShadow: "none",
  outline: "none",

  selectors: {
    "&::placeholder": {
      color: vars.fontColors.secondary,
    },
    "&:hover": {
      borderColor: vars.colors.borderDefaultHover,
    },
    "&:disabled": {
      opacity: 0.7,
      cursor: "not-allowed",
    },
  },
});
