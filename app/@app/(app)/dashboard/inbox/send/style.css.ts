import { breakpoints, vars } from "../../../../../theme.css";
import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  padding: vars.spacing.normal,

  "@media": {
    [breakpoints.tablet]: {
      marginTop: 100,
    },
  },
});

export const formContainer = style({
  maxWidth: "600px",
  margin: "auto",
});
