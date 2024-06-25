import { vars } from "../../app/theme.css";
import { style } from "@vanilla-extract/css";

export const header2 = style({
  marginBottom: vars.spacing.normal,
});

export const header3 = style({
  marginBottom: vars.spacing.normal,
});

export const input = style({
  marginBottom: vars.spacing.normal,
  width: "100%",
});

export const signInFormCheckboxWrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontFamily: vars.fontFamilies.secondaryHeader,
});
