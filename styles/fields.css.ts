import { vars } from "../app/theme.css";
import { style } from "@vanilla-extract/css";

/**
 * Shared base for focusable form fields: border, shadow, outline,
 * transition, hover, and focus-within states.
 *
 * Composed by Form/fieldBase, Checkbox, and other interactive field elements.
 */
export const focusableFieldBase = style({
  backgroundColor: vars.surfaces.raised,
  border: `${vars.borderWidth} solid ${vars.colors.borderDefault}`,
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
  },
});
