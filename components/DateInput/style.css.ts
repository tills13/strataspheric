import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const dateInput = style({
  display: "flex",
  gap: vars.spacing.small,
});

export const inputFieldsWrapper = style({
  display: "flex",
  gap: vars.spacing.small,
  flexDirection: "column",
  flex: 1,

  "@media": {
    [breakpoints.tablet]: {
      flexDirection: "row",
    },
  },
});
