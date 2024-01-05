import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const newEventForm = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.small,
});

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
