import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const strataChip = style({
  padding: vars.spacing.normal,
  backgroundColor: vars.surfaces.sunken,
  borderRadius: vars.borderRadius.lg,
  transition: `background-color ${vars.transitions.fast}, border-color ${vars.transitions.fast}`,
  border: `${vars.borderWidth} solid ${vars.surfaces.sunken}`,
  textDecoration: "none",

  selectors: {
    "&:hover": {
      backgroundColor: vars.surfaces.interactiveHover,
      borderColor: vars.colors.borderDefaultHover,
    },
  },
});
