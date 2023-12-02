import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const wrapper = style({
  display: "flex",
  gap: vars.spacing.normal,
  flexDirection: "column",

  "@media": {
    [breakpoints.tablet]: {
      flexDirection: "row",
    },
  },
});

export const input = style({
  width: "100%",

  "@media": {
    [breakpoints.tablet]: {
      width: "50%",
    },
  },
});
