import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const baseSelect = style({
  padding: `${vars.spacing.small} ${vars.spacing.large} ${vars.spacing.small} ${vars.spacing.normal}`,
  color: vars.fontColors.primary,
  backgroundColor: vars.colors.white,
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: vars.colors.borderDefault,
  borderRadius: vars.borderRadius,
  outline: "none",
  appearance: "none",
  cursor: "pointer",
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundPosition: "right 0.5rem center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "1.5rem 1.5rem",

  selectors: {
    "&:hover": {
      borderColor: vars.colors.borderDefaultHover,
    },
    "&:disabled": {
      opacity: 0.7,
      cursor: "not-allowed",
    },
  },
});
