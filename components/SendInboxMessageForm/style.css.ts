import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const form = style({});

export const formActionsContainer = style({
  display: "flex",
  gap: vars.spacing.normal,
  flexDirection: "column",

  "@media": {
    [breakpoints.tablet]: {
      flexDirection: "row",
    },
  },
});

export const formHeader = style({});

export const formInput = style({
  // width: "100%",
});

export const formTextArea = style({
  // width: "100%",
});
