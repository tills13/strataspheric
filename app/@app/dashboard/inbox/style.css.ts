import { breakpoints, vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

export const inboxPageHeader = style({
  "@media": {
    [breakpoints.tablet]: {
      paddingLeft: vars.spacing.normal,
    },
  },
});

export const upsell = style({
  maxWidth: "600px",
  margin: "auto",
});
