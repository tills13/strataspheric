import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const actionRow = style({
  borderRadius: vars.borderRadius.md,
  transition: `background-color ${vars.transitions.fast}`,
  cursor: "pointer",
  height: vars.sizes.normal,

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
    },
  },
});
