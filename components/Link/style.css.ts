import { style } from "@vanilla-extract/css";
import { vars } from "../../app/theme.css";

export const linkBase = style({
  color: "inherit",
  selectors: {
    "&:active": {
      color: "inherit",
    },
    "&:visited": {
      color: "inherit",
    },
  },
});

export const linkNoUnderline = style([
  linkBase,
  {
    textDecoration: "none",
  },
]);
