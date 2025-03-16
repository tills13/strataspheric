import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const strataChip = style({
  padding: vars.spacing.normal,
  backgroundColor: vars.colors.grey50,
  borderRadius: vars.borderRadius,
  border: `2px solid ${vars.colors.grey50}`,
  textDecoration: "none",

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
      borderColor: vars.colors.borderDefaultHover,
    },
  },
});
