import { style } from "@vanilla-extract/css";
import { breakpoints, vars } from "../theme.css";

export const pageContainer = style({
  padding: vars.spacing.normal,
});

export const getStartedForm = style({
  width: "500px",
  margin: "0 auto 100px",
  "@media": {
    [breakpoints.tablet]: {},
  },
});
