import { breakpoints, vars } from "../theme.css";
import { style } from "@vanilla-extract/css";

export const signInToStrataPageContainer = style({
  display: "flex",
  justifyContent: "center",
  height: "100vh",
  marginTop: vars.spacing.large,
  "@media": {
    [breakpoints.tablet]: {
      marginTop: 0,
      alignItems: "center",
    },
  },
});

export const signInToStrataPageFormContainer = style({
  width: "100%",
  padding: vars.spacing.normal,

  "@media": {
    [breakpoints.tablet]: {
      position: "relative",
      width: "500px",
    },
  },
});

export const signInForm = style({ width: "100%" });
