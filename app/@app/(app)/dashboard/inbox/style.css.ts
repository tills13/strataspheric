import { breakpoints, vars } from "../../../../theme.css";
import { style } from "@vanilla-extract/css";

export const upsellContainer = style({
  padding: vars.spacing.normal,
  marginTop: 100,
  marginBottom: 100,
});

export const upsell = style({
  maxWidth: "600px",
  margin: "auto",
});

export const newMessageContainer = style({
  padding: vars.spacing.normal,

  "@media": {
    [breakpoints.tablet]: {
      margin: "auto",
      // marginTop: 100,
      width: "600px",
    },
  },
});
