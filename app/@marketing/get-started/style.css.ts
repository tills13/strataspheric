import { style } from "@vanilla-extract/css";
import { breakpoints, vars } from "../../theme.css";

export const pageContainer = style({
  marginTop: 100,
  padding: vars.spacing.normal,
});

export const getStartedForm = style({
  "@media": {
    [breakpoints.tablet]: {
      margin: "0 auto 100px",
      width: "500px",
    },
  },
});
