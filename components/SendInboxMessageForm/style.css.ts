import { breakpoints, vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const form = style({});

export const formActionsContainer = style({
  display: "flex",
  gap: vars.spacing.small,
  flexDirection: "column",

  "@media": {
    [breakpoints.tablet]: {
      flexDirection: "row",
    },
  },
});

export const formHeader = style({
  marginBottom: vars.spacing.normal,
});

export const formInput = style({
  marginBottom: vars.spacing.small,
  width: "100%",
});

export const formTextArea = style({
  marginBottom: vars.spacing.small,
  width: "100%",
});
