import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const body = style({
  height: "100vh",
  display: "grid",
  gridTemplateRows: "min-content auto",
});

export const landingPageContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export const landingPageFormContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.normal,
  width: 300,
  position: "relative",
  top: "-80px",
});

export const signInForm = style({});

export const viewPublicLinkContainer = style({
  textAlign: "right",
});

export const actionButton = style({
  width: "100%",
});
