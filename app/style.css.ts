import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const globalHeader = style({});

export const landingPageHeader = style({
  marginBottom: vars.spacing.normal,
});

export const landingPageContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});
export const landingPageFormContainer = style({
  width: 300,
});
export const loginForm = style({});
