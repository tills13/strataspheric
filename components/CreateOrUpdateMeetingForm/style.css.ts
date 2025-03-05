import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const withBottomMargin = style({
  marginBottom: vars.spacing.small,
});

export const fullWidth = style({
  width: "100%",
});

export const dateWrapper = style({
  display: "flex",
  gap: vars.spacing.normal,
  flexDirection: "column",

  "@media": {
    [breakpoints.tablet]: {
      flexDirection: "row",
    },
  },
});
