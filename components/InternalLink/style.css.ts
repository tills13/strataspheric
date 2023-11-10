import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const internalLink = style({
  color: vars.fontColors.primary,
  selectors: {
    "&:active": {
      color: vars.fontColors.primary,
    },
    "&:visited": {
      color: vars.fontColors.primary,
    },
  },
});
