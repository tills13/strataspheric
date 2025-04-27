import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const actionRow = style({
  borderRadius: vars.borderRadius,
  cursor: "pointer",
  height: vars.sizes.normal,

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.grey100,
    },
  },
});
