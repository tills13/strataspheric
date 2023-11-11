import { style } from "@vanilla-extract/css";
import { breakpoints, vars } from "./theme.css";

export const body = style({
  height: "100vh",
  display: "grid",
  gridTemplateRows: "min-content auto",
});

export const landingPageContainer = style({
  display: "flex",
  justifyContent: "center",
  height: "100%",
  "@media": {
    [breakpoints.tablet]: {
      alignItems: "center",
    },
  },
});

export const landingPageFormContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
  width: "100%",
  padding: vars.spacing.normal,
  "@media": {
    [breakpoints.tablet]: {
      position: "relative",
      top: "-80px",
      width: 300,
    },
  },
});

export const signInForm = style({});

export const viewPublicLinkContainer = style({
  textAlign: "right",
});

export const actionButton = style({
  width: "100%",
});
