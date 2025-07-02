import { breakpoints, vars } from "../theme.css";
import { style } from "@vanilla-extract/css";

export const signInToStrataPageContainer = style({
  display: "flex",
  justifyContent: "center",
  height: "100vh",
  "@media": {
    [breakpoints.tablet]: {
      alignItems: "center",
    },
  },
});

export const signInToStrataPageFormContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
  width: "100%",
  padding: vars.spacing.normal,

  "@media": {
    [breakpoints.tablet]: {
      position: "relative",
      width: 400,
    },
  },
});

export const signInForm = style({});
