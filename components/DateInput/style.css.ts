import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const dateInput = style({});

export const inputFieldsWrapper = style({
  display: "flex",
  gap: vars.spacing.normal,
  flexDirection: "column",

  flex: 1,

  "@media": {
    [breakpoints.tablet]: {
      flexDirection: "row",
    },
  },
});

export const dateInputInput = style({
  marginTop: 0,
});
