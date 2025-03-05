import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const newEventForm = style({});

export const fullWidth = style({
  width: "100%",
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
