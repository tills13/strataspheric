import { vars } from "../../theme.css";
import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  margin: "0 auto",
  maxWidth: 600,
  padding: vars.spacing.normal,
  overflow: "auto",
});

export const description = style({
  color: vars.fontColors.secondary,
});

export const attachBylawsFieldBylawsAttachedContainer = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.normal,
});
