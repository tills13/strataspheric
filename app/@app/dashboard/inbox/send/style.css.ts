import { breakpoints, vars } from "../../../../theme.css";
import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  "@media": {
    [breakpoints.tablet]: {
      marginTop: vars.spacing.xl,
    },
  },
});

export const formContainer = style({
  maxWidth: vars.containerWidth.sm,
  margin: "auto",
});
