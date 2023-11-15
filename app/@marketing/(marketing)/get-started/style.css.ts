import { style } from "@vanilla-extract/css";
import { breakpoints, vars } from "../../../theme.css";

export const layoutContainer = style({
  marginTop: 100,
  padding: vars.spacing.normal,
});

export const centerColumnContainer = style({
  marginBottom: 100,
  "@media": {
    [breakpoints.tablet]: {
      margin: "0 auto 100px",
      width: "500px",
    },
  },
});

export const getStartedForm = style({});
