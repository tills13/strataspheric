import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const linkBase = style({
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

export const linkNoUnderline = style([
  linkBase,
  {
    textDecoration: "none",
  },
]);
