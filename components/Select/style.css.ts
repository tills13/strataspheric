import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const baseSelect = style({
  padding: `0 ${vars.spacing.large} 0 ${vars.spacing.normal}`,
  height: vars.sizes.normal,
  color: vars.fontColors.primary,
  backgroundColor: vars.colors.globalBg,
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: vars.colors.white,
  outline: "none",
  appearance: "none",
  cursor: "pointer",
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundPosition: "right 0.5rem center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "1.5rem 1.5rem",

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.white,
      color: vars.colors.globalBg,
    },
    "&:disabled": {
      opacity: 0.7,
      cursor: "not-allowed",
    },
  },
});
