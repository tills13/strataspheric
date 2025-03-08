import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const dateWrapper = style({
  display: "flex",
  gap: vars.spacing.small,
  flexDirection: "column",

  "@media": {
    [breakpoints.tablet]: {
      flexDirection: "row",
    },
  },
});
